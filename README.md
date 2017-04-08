MyFields-API

A node.js and express based API for authentication and data control of all Kansas State 
Research and Extension applications. This API is designed to be a general purpose API 
for any myFields application. 

PLEASE NOTE THIS API IS UNDER ACTIVE DEVELOPMENT AND IS NOT YET READY FOR GENERAL USE.
We are currently resolving issues with the Oauth authentication. Once these issues are
resolved, all of the signed requests that are currently using JsonWebToken will need
to be modified to use Oauth.

The usage model is as follows:

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
		myFields.info developer.

Detailed documentation on API methods can be found in the code, or you can view it by 
opening documentation/index.html in your browser. This documentation is auto-generated
from documentation in the code using APIdocs, and it can be updated using that utility.
You can also find brief instructions on setting up an environment to run this API in
the documentation folder.

Links:
Azure Blob Storage Documentation: https://docs.microsoft.com/en-us/azure/storage/storage-nodejs-how-to-use-blob-storage
Request Library Oauth Process: https://www.npmjs.com/package/request#oauth-signing