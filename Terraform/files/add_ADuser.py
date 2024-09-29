import requests
from requests.auth import HTTPBasicAuth

# Prism Central IP and API URL
PC_IP = "10.55.37.39"  # Replace with your Prism Central IP
API_URL = f"https://{PC_IP}:9440/api/nutanix/v3/directory_services/list"

# Prism Central credentials
PC_USER = "admin"      # Replace with your PC username
PC_PASSWD = "nx2Tech564!"  # Replace with your PC password
username = "sushil@ntnxlab.local"  # Full username with domain
domain = "ntnxlab.local"
AD_username = "sushil"

# Disable SSL warnings (Optional)
requests.packages.urllib3.disable_warnings()

# Function to make API call
def setconfig(api_url, payload, method='POST'):
    headers = {'Content-Type': 'application/json'}
    response = requests.request(method, api_url, auth=HTTPBasicAuth(PC_USER, PC_PASSWD), json=payload, verify=False)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return {}

# Fetch Active Directory domain names and UUIDs
def fetch_active_directory():
    response = requests.post(API_URL, auth=HTTPBasicAuth(PC_USER, PC_PASSWD), json={}, verify=False)
    if response.status_code == 200:
        directories = response.json().get("entities", [])
        if directories:
            print("Active Directory Services Found:")
            for directory in directories:
                if directory["spec"]["resources"]["directory_type"] == "ACTIVE_DIRECTORY" and \
                   directory["spec"]["resources"]["domain_name"] == domain:
                    domain_name = directory["spec"]["resources"]["domain_name"]
                    uuid = directory["metadata"]["uuid"]
                    print(f"Domain: {domain_name}, UUID: {uuid}")
                    return uuid
        else:
            print("No Active Directory services found.")
    else:
        print(f"Error: {response.status_code}, {response.text}")
    return None

# Function to check if AD user exists
def getADuser(idpuuid):
    '''
    This function searches for a user in AD by UUID.
    '''
    payload = {"query": AD_username}
    url = f"https://{PC_IP}:9440/oss/pc_proxy/directory_services/{idpuuid}/search"
    
    # Use setconfig to make the request
    payload = setconfig(api_url=url, payload=payload, method='POST')

    # Check if the user exists
    if not payload.get('search_result_list'):
        print("User Not Found!!")
    else:
        print("User Exists in AD")

# Function to add AD user to the objects
def AddADuser(idpuuid):
    '''
    This function adds the AD user to the object store.
    '''
    payload = {
        "users": [
            {
                "type": "ldap",
                "username": username,
                "idp_id": idpuuid,
                "display_name": username,
            }
        ]
    }
    
    url = f"https://{PC_IP}:9440/oss/iam_proxy/buckets_access_keys"
    
    # Use setconfig to make the request
    payload = setconfig(api_url=url, payload=payload, method='POST')
    
    # Print success message
    print(f"User {username} successfully added to the objects.")

# Main function
def main():
    # Fetch Active Directory UUID
    idpuuid = fetch_active_directory()
    
    if idpuuid:
        # Check if user exists in Active Directory
        getADuser(idpuuid)
        
        # Add the user to the object store
        AddADuser(idpuuid)

# Run the main function
if __name__ == "__main__":
    main()
