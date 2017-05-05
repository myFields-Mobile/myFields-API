# MyFields-API

A node.js and express based API for authentication and data control of all Kansas State 
Research and Extension applications. This API is designed to be a general purpose API 
for any myFields application. For information about myFields itself, see the myFields
section of this readme, at the bottom.

The myFields team uses Microsoft Azure for this project. Contact Brian McCornack
(mccornac AT ksu.edu) for access.

**PLEASE NOTE THIS API IS UNDER ACTIVE DEVELOPMENT AND IS NOT YET READY FOR GENERAL USE.**
We are currently resolving issues with the Oauth authentication. Once these issues are
resolved, all of the signed requests that are currently using JsonWebToken will need
to be modified to use Oauth. **Currently, the master branch is usable, but the authentication
is not using Oauth and thus will not interact with myFields.info. The dev-master branch
contains the Oauth implementation, but it is not completely functional.** See the continuing 
work section and the in-code comments for details.**

## Usage Model:

You can find brief instructions on setting up an environment to run this API in
the documentation folder, in EnvironmentSetup.txt. During the setup, several SQL 
tables will be created. The important tables are the App and AppData table. The
App table will be used to register applications using the API, and the AppData
table will be used to store information submitted by an application. You can see
more details about the database schema in the models folder. Note that some tables
were created by a previous team and may not be used.

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
from documentation in the code using APIdocs, and it can be updated by installing apidoc
and running `apidoc -i /routes -o /documentation`.

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
See comments in routes/Authentication/authentication.js for details.

Once the Oauth works correctly, we should replace all usages of the JSONWebToken with the Oauth
token and secret, and replace all usages of the authentication middleware with calls to the
myFields.info API.

Once authentication is completely done, the next step will be to implement uploading
data from this database to the myFields.info database using the myFields.info API.

Finally, once the API is ready to be moved to production, you will need to contact
the myFields.info developer and get a production endpoint and oauth credentials.

## Reference Links:
* Azure Blob Storage Documentation: https://docs.microsoft.com/en-us/azure/storage/storage-nodejs-how-to-use-blob-storage
* Request Library Oauth Process: https://www.npmjs.com/package/request#oauth-signing
* Oauth 1a Standard: https://oauth.net/core/1.0a/
* Multiparty (Used for image uploading): https://www.npmjs.com/package/multiparty

## myFields

The myFields program is being developed as a multi-disciplinary, online approach to Extension Agriculture that can be customized to a farmer's cropping system. This program is part of a Coordinated Extension Integrated Program primarily funded by the USDA, along with support from crop Commissions, other grants, and local organizations. Although Kansas State University is leading this effort, the myFields.info platform is designed for use by other collaborative states or regions. The existence of an online network for Extension personnel and their stakeholders will help reach new audiences and enhance the relevancy of Extension services in the era of online information.
 
We offer Extension resources, interactive tools, and push technology to give our farmers the latest cropping information for decision-making. Our current projects include those that provide email alerts to users when pests have been detected near them by experts, help with pest management strategies such as chemical and varietal recommendations, and diagnostic tools for identifying and learning about crop pests. While site visitors can access Extension materials, users that create an account get access to pest sampling tools, customized field guides, and localized alerts for invasive pest species based on farmer interests.