import json
import urllib.request
import ssl
from urllib.error import URLError, HTTPError
import base64

#---[inputs]-----
user = "infra"
password = "Avancer@123"
ip = "10.55.37.39"
username = str("sushil" + "@" + "ntnxlab.local")
VERSIONING_FEATURE="VERSIONING"
enable_versioning = False
non_current_version_expiration = 0#days
expiration =  0#days

ssl._create_default_https_context = ssl._create_unverified_context
#----[variables]----
base_url = "https://" + ip + ":9440/oss/api/nutanix/v3/"

#--[Functions]--
def setconfig(api_url, payload, username, password, method='POST'):
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

        # Encode credentials for basic authentication
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

def CreateBucket():
  '''
  This function creates a Bucket in specified Object store
  '''
  payload = {
          "api_version": "3.0",
        "metadata": {
            "kind": "bucket"
        },
        "spec": {
            "description": "",
            "name": "test12",
            "resources": {
                "features": [
                ]
            }
        }
            }
  hostname = "infra"
  hostpwd = "Avancer@123"
  url = base_url+"objectstores/f3b3968d-c8e6-49a7-4ff7-409d93c17a06/buckets"
  payload = setconfig(api_url=url, payload=payload, username=hostname, password=hostpwd, method='POST')
  if enable_versioning:
      payload["spec"]["resources"]["features"].append(VERSIONING_FEATURE)
  if non_current_version_expiration or expiration:
      payload["spec"]["resources"]["lifecycle_configuration"] = {
            "Rule": [
                {
                    "Filter": {
                    },
                    "ID": "ntnx-frontend-emptyprefix-rule",
                    "Status": "Enabled"
                }
            ]
        }
  if non_current_version_expiration:
            payload["spec"]["resources"]["lifecycle_configuration"]["Rule"][0]["NoncurrentVersionExpiration"] = {"NoncurrentDays": non_current_version_expiration}
  if expiration:
            payload["spec"]["resources"]["lifecycle_configuration"]["Rule"][0]["Expiration"] = {"Days": expiration}
  #print(payload)
  print("bucket created successfully")

CreateBucket()

    