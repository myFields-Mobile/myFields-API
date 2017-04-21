const express = require('express');
var config = require('../../config/config');
var request = require('request');
var qs = require('querystring');
var router = express.Router({mergeParams:true});

'use strict';

// Note the oauth consumer key and secret must be provided here
// or set as environment variables
var oauth_consumer_key = process.env.OAUTH_KEY;
var oauth_consumer_secret = process.env.OAUTH_SECRET;

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
 * @apiSuccess {String} message A welcome message to the api.
 * @apiSuccess {String} oauth The Oauth object containing the tokens used to sign requests
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
      console.log("line 66 body: " + body)
			var perm_data = qs.parse(body),
        oauth =
				{
          consumer_key: oauth_consumer_key,
          consumer_secret: oauth_consumer_secret,
          token: perm_data.oauth_token,
          token_secret: perm_data.oauth_token_secret
				},
        url = host + "/node.json?";
	  })
    console.log("line 78 oauth token secret: " oauth.token_secret)
	})
});

router.get('/callback', (req, res) => {
  res.send(200).message("in callback")
});

/*
const express = require('express');
var jwt    = require('jsonwebtoken');
var models  = require('../../models');
var config = require('../../config/config');
var router = express.Router({mergeParams:true});

/**
 * @api {post} api/authenticate Request authentication token.
 * @apiName Authenticate
 * @apiGroup Authentication
 *
 * @apiParam {String} email The users email address.
 * @apiParam {String} password The users password.
 *
 * @apiSuccess {String} message A welcome message to the api.
 * @apiSuccess {String} token The valid Json Web Token needed for authentication.
 */
 /*
router.post('/', function(req, res, next) {
  if(!req.body.email || !req.body.password) {
    res.status(500).send({
      "message": "No user with the following email found"
    })
  } else {
    // Find first user with matching email
    models.User.findOne({
      where: {
        email: req.body.email
      },
      include: [models.UserType]
    }).then(function(matchingUser) {
      if(!matchingUser) {
        res.status(500).send({
          "message": "No user with the following email found"
        });
      } else if(!matchingUser.validPassword(req.body.password)){
        res.status(500).send({
          "message": "Password is incorrect"
        })
      } else {
        var userTypes = [];
        matchingUser.UserTypes.forEach(function(userType) {
          userTypes.push(userType.title);
        });
        var token = jwt.sign({
          id: matchingUser.id,
          types: userTypes
        }, config.secret, {
          expiresInMinutes: 40320 // expires in 24 hours
        });
        res.status(200).send({
          message: "Authentication successful",
          token: token,
          user: matchingUser.toPublicJSON()
        });
      }
    });
  }
});
*/
module.exports = router;
