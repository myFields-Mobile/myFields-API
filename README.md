# MyFields-API

A node.js and express based API for authentication and data control of all Kansas State 
Research and Extension applications. This API is designed to be a general purpose API 
for any myFields application.

The myFields team uses Microsoft Azure for this project. Contact Brian McCornack
(mccornac AT ksu.edu) for access.

**PLEASE NOTE THIS API IS UNDER ACTIVE DEVELOPMENT AND IS NOT YET READY FOR GENERAL USE.**
We are currently resolving issues with the Oauth authentication. Once these issues are
resolved, all of the signed requests that are currently using JsonWebToken will need
to be modified to use Oauth.

## Usage Model:

	0. Before using the application, an entry for the app should be created in the App 
		table. This table wil store the app's name, which must be unique, and if the app
		is active in the database.
	1. Application authenticates with myFields using Oauth via /api/authenticate
	2. Any data the app uploads will be stored in the AppData table. The data must 
		include the username of the person submitting, the ID of the app the data came
		from, and jsondata. The jsondata field should be used for any data to be stored, 
		except images. The table includes an optional image field, which should store 
		the URL of an image (if there is one). The image itself will be stored 
		separately, on a Microsoft Azure Blob Storage table. The image can be uploaded 
		using /api/images routes. The AppData table also includes an optional 
		geolocation field for GPS data and a field to indicate if the entry is active.
	3. If the data is to be published to myFields, you should use the myFields.info API
		to do so. The myFields.info API is not under the same developer as the myFields
		mobile API - speak to the myFields team if you will be working with the
		myFields.info API.

	Note that the 'active' field in AppData is intended to be a general purpose
	flag to indicate a boolean state of that data. For the purpose of the reporting
	app, for example, the active field indicates if the data has been verified as
	correct by an agent.

Detailed documentation on API methods can be found in the code, or you can view it by 
opening documentation/index.html in your browser. This documentation is auto-generated
from documentation in the code using APIdocs, and it can be updated using that utility.
You can also find brief instructions on setting up an environment to run this API in
the documentation folder.

## Testing:

This API is tested using Mocha. To run the tests, make sure you have the npm Mocha package
installed, then run Mocha from the root directory. **The API must be running and accessible
from the URL in test/config.json**. 

[comment]: # (TODO: remove this once authentication works)
At this time most of these tests will fail, because
authentication is not complete.

## Continuing Work:

First priority should be completing authentication. At this time, we believe our authentication
code is correct, but there is an issue with the configuration of the myFields.info Oauth provider.
We are currently working to fix these issues.

Once the Oauth works correctly, we should replace all usages of the JSONWebToken with the Oauth
token and secret, and replace all usages of the authentication middleware with calls to the
myFields.info API.

Other than authentication, the API is currently usable. Further improvement should include
the ability to upload data from this API to the myFields database.

## Reference Links:
* Azure Blob Storage Documentation: https://docs.microsoft.com/en-us/azure/storage/storage-nodejs-how-to-use-blob-storage
* Request Library Oauth Process: https://www.npmjs.com/package/request#oauth-signing
* Multiparty (Used for image uploading): https://www.npmjs.com/package/multiparty