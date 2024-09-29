import paramiko
import threading
import time
import json
import urllib.request
import base64
from urllib.error import HTTPError, URLError
solution = "/home/avancer/Instream_backend/Final/Terraform/port_check/" + "FSVMPORTS"
api_url = "http://172.16.4.202:8000/update/var/ports"
###########################################################################
def setconfig(api_url, payload, method='POST', auth_required=False, username=None, password=None):
    try:
        # Encode the payload into JSON if it's a POST/PUT request
        json_data = None
        if payload and method in ['POST', 'PUT']:
            json_data = json.dumps(payload).encode('utf-8')

        # Create the request object with the specified method
        request = urllib.request.Request(api_url, data=json_data, method=method)

        # Add headers
        request.add_header('Content-Type', 'application/json')
        request.add_header('Accept', 'application/json')

        # Add Authorization header if authentication is required
        if auth_required and username and password:
            credentials = ('%s:%s' % (username, password))
            encoded_credentials = base64.b64encode(credentials.encode('ascii')).decode('ascii')
            request.add_header('Authorization', 'Basic %s' % encoded_credentials)

        # Make the request and get the response
        with urllib.request.urlopen(request) as response:
            resp = response.read().decode('utf-8')
            return json.loads(resp)

    except HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.reason}")
        print(e.read().decode())  # To see the error details returned by the server
        return None
    except URLError as e:
        print(f"URL Error: {e.reason}")
        return None
#################################################################################
def getdata():
    url = api_url
    payload ={}
    data = setconfig(api_url=url, payload=payload, method='GET')
    source_name = data['Source_user_name ']
    source_password = data['Source_password']
    datasolution = data['solution']
    source_port = data['ports of source VM']
    source_ip = data['CVM_src_ip']
    destination_ip = data['FSVMS_dst_ip']
    return source_name,source_password,datasolution,source_port,source_ip,destination_ip
###################################################################################
def run_command_with_timeout(ssh_client, command, timeout=10):
    """Run a command on the SSH server with a timeout."""
    try:
        stdin, stdout, stderr = ssh_client.exec_command(command, timeout=timeout)

        # Create a thread to handle the command output
        def read_output(stream, output):
            output.append(stream.read().decode())

        # Capture stdout and stderr
        stdout_output = []
        stderr_output = []

        stdout_thread = threading.Thread(target=read_output, args=(stdout, stdout_output))
        stderr_thread = threading.Thread(target=read_output, args=(stderr, stderr_output))

        stdout_thread.start()
        stderr_thread.start()

        # Wait for the threads to finish or timeout
        stdout_thread.join(timeout)
        stderr_thread.join(timeout)

        if stdout_thread.is_alive() or stderr_thread.is_alive():
            raise TimeoutError(f"Command '{command}' timed out after {timeout} seconds")

        # Return both stdout and stderr
        return ''.join(stdout_output), ''.join(stderr_output)

    except TimeoutError as te:
        print(f"Timeout occurred: {te}")
    except Exception as e:
        print(f"An error occurred: {e}")
    return None, None

def ssh_run_multiple_commands(hostname, port, username, password, commands, timeout=10, delay_between_commands=5):
    try:
        # Create an SSH client
        ssh_client = paramiko.SSHClient()

        # Automatically add the host key if it's not in known_hosts
        ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        # Connect to the host
        ssh_client.connect(hostname=hostname, port=port, username=username, password=password)

        # Loop through the list of commands and run each one with a delay
        for command in commands:
            #print(f"Running command: {command}")
            stdout_output, stderr_output = run_command_with_timeout(ssh_client, command, timeout)
            if stdout_output:
                print(f"STDOUT of '{command}':\n{stdout_output}\n")

            if stderr_output:
                contest = str(stderr_output)
                fail = "Connection timed out"
                if fail in contest:
                    print("Port not opened for:", command.split(" ")[-1],"Between Source:",Source_Ip,"Destination:",command.split(" ")[-2],"!!!")
                else:
                    print("Ports are opened for:", command.split(" ")[-1],"Between Source:",Source_Ip,"Destination:",command.split(" ")[-2])

            # Adding a delay between the execution of commands
            time.sleep(delay_between_commands)

        # Close the connection
        ssh_client.close()

    except Exception as e:
        print(f"An error occurred: {e}")

####################################################################################################
# Function to read data from a text file
def read_file(file_path):
    try:
        with open(file_path, 'r') as file:
            data = file.read()
            return data
    except FileNotFoundError:
        return "File not found."

# Specify the path to your text file
file_path = solution

# Fetch the data from the text file
file_data = read_file(file_path)

# Print the data
dictionary = json.loads(file_data)
print(dictionary)
source_env = "FSVMVCL"
destination_env = "DNS"

def veriports():
    for i in dictionary:
        if i == source_env:
            for j in dictionary[i]:
                if j == destination_env:
                    testports = dictionary[i][j]
                    return testports

if veriports():
    dataports = veriports()
    print(dataports)
else:
    print("Please recheck the entered data!!")

####################################################################################################
Source_Ip = '10.55.37.37'  # FD
port = 22  # FD
Source_name = 'nutanix'  # FD
Source_password = 'nx2Tech564!'  # FD

Destinationip = '10.55.37.42'  # FD
desport = dataports  # Port file

# Create the list of nc commands to check each port
commands = [f'nc -zv {Destinationip} {p}' for p in desport]

# Run the SSH command execution with a 10-second delay between commands
ssh_run_multiple_commands(Source_Ip, port, Source_name, Source_password, commands, timeout=20, delay_between_commands=10)
