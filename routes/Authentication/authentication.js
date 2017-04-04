const express = require('express');
var config = require('../../config/config');
var request = require('request');
var qs = require('querystring');
var router = express.Router({mergeParams:true});

'use strict';

var oauth_consumer_key = 'key';//process.env.OAUTH_KEY;
var oauth_consumer_secret = 'secret';//process.env.OAUTH_SECRET;

// TODO: this might be a non-production endpoint
var host = 'https://svcs.ext.solotandem.com:32768';
var request_path = '/oauth/request_token/';
var token_path = '/oauth/access_token/';
var authorize_path= '/oauth/authorize/';

// Initial page redirecting to myFields
router.get('/', (req, res) => {
  console.log("FOOBAR")
  // Tutorial used is here: https://www.npmjs.com/package/request#oauth-signing
  var oauth = {
    // TODO: pretty sure to use myFields as SSO for the app we need
    //       this to not be 'oob'
    callback: 'oob',
    consumer_key: oauth_consumer_key,
    consumer_secret:  oauth_consumer_secret
  }

  // TODO: This is insecure - the myFields API endpoint needs to get a valid certificate
  //       once a new certificate is acquired, remove the rejectUnauthorized flag
  // TODO: this may need to be changed to request.post if the myFields API endpoint changes
  request.get({url:host+request_path, oauth:oauth, rejectUnauthorized: false}, function(err, response, body)
  {
    // Parse response to retrieve token
    var req_data = qs.parse(body)
	  // Redirect user to authorize uri
    var uri = host + authorize_path + '?' + qs.stringify({oauth_token: req_data.oauth_token})
    res.redirect(uri);

    // After token is authorized
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

		request.get({url:url, oauth:oauth}, function (e, r, body) {
			// ready to make signed requests on behalf of the user
			var perm_data = qs.parse(body),
        oauth =
				{
          consumer_key: oauth_consumer_key,
          consumer_secret: oauth_consumer_secret,
          token: perm_data.oauth_token,
          token_secret: perm_data.oauth_token_secret
				},
        url = host + '/node.json?';
      request.get({url:url, oauth:oauth, json:true}, function(e, r, body)
      {
        console.log(body)
      })        
	  })
	})
});

router.get('/callback', (req, res) => {
  res.send("Success")
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
