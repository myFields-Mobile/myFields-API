const express = require('express');
var config = require('../../config/config');
var request = require('request');
var qs = require('querystring');
var router = express.Router({mergeParams:true});

// TODO: get help storing oauth for individual users
var user_oauth;

'use strict';

// Note the oauth consumer key and secret must be provided here
// or set as environment variables
const oauth_consumer_key = process.env.OAUTH_KEY;
const oauth_consumer_secret = process.env.OAUTH_SECRET;

// TODO: this is a non-production endpoint and will need to be changed when the app is ready for production
var host = 'https://svcs.ext.solotandem.com:32768';
var request_path = '/oauth/request_token/';
var token_path = '/oauth/access_token/';
var authorize_path= '/oauth/authorize/';

/**
 * @api {post} api/authenticate Request authentication token.
 * @apiName Authenticate
 * @apiGroup Authentication
 *
 * @apiSuccess redirected to callback
 */
router.get('/', (req, res) => {
  // Tutorial used is here: https://www.npmjs.com/package/request#oauth-signing
  var oauth = {
    // TODO: this callback is not yet working, we are working with
    // the myFields developer to configure the Oauth endpoint
    // correctly on his end
    callback: '/callback',
    consumer_key: oauth_consumer_key,
    consumer_secret:  oauth_consumer_secret
  }

  // TODO: This rejectUnauthorized: false flag is insecure - the myFields API endpoint
  //       needs to get a valid certificate. Once a new certificate is acquired by the myFields 
  //       developer, remove the rejectUnauthorized flag
  // TODO: this may need to be changed to request.post if the myFields API endpoint changes
  // makes an http request to authorize the oauth key and secret
  request.get({url:host+request_path, oauth:oauth, rejectUnauthorized: false}, function(err, response, body)
  {
    // Parse response to retrieve token
    var req_data = qs.parse(body)
	  // Redirect user to authorize uri
    var uri = host + authorize_path + '?' + qs.stringify({oauth_token: req_data.oauth_token})
    res.redirect(uri);

    // consumer key and secret authorized
	  var auth_data = qs.parse(body),
        oauth =
        {
        	consumer_key: oauth_consumer_key,
        	consumer_secret: oauth_consumer_secret,
        	token: auth_data.oauth_token,
        	token_secret: req_data.oauth_token_secret,
        	verifier: auth_data.oauth_verifier
        },
        url = host + token_path;

    // authorize token
		request.get({url:url, oauth:oauth}, function (e, r, body) {
			var perm_data = qs.parse(body),
        oauth =
				{
          consumer_key: oauth_consumer_key,
          consumer_secret: oauth_consumer_secret,
          token: perm_data.oauth_token,
          token_secret: perm_data.oauth_token_secret
				};
	  })
    // TODO: This is a bad hack! This needs to be a session variable!
    user_oauth = oauth;
	})
});

/**
* @api {GET} api/authenticate/callback callback after oauth process is complete
* @apiName Authenticate Callback
* @apiGroup Authentication
*
* @apiSuccess {object} user_oauth signed in user's oauth credentials
*/
router.get('/callback', (req, res) => {
  if(user_oauth.token == req.query.oauth_token)
  {
    req.get({url:host+"/user/me", oauth:user_oauth}, function(e, r, body){
      console.log(e);
      console.log("body: " + body);
    });
    // TODO: will also need to request their user id and send it with their oauth token
    res.status(200).send(user_oauth)
  }
  else 
  {
    res.status(403).send("Must log in using /api/authenticate")
  }
});

module.exports = router;
