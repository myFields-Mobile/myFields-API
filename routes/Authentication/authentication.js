const express = require('express');
var jwt    = require('jsonwebtoken');
var models  = require('../../models');
var config = require('../../config/config');
var request = require('request');
var qs = require('querystring');
var router = express.Router({mergeParams:true});

'use strict';

// oauth_consumer_key: process.env.OAUTH_KEY,
// secret: process.env.OAUTH_SECRET

const app = express();

var host = 'https://svcs.ext.solotandem.com:32768';
var token_path = '/oauth/access_token';
var authorizePath= '/oauth/authorize';

/*
app.get('/login', (req, res) => {

  // Step 1: Build a request url to send to Oauth site to request token

  // Step 2: Submit request, and get results

  // Step 3: Redirect user to redirect url supplied with the Oauth results

});
*/

// Initial page redirecting to myFields
app.get('/auth', (req, res) => {
  var qs = require('querystring')
  
  var oauth_consumer_key: process.env.OAUTH_KEY,
  var oauth_consumer_secret:  process.env.OAUTH_SECRET
  
  var oauth = {
    oauth_callback: 'oob',
    oauth_consumer_key: oauth_consumer_key,
    oauth_consumer_secret:  oauth_consumer_secret
    oauth_signature_method: 'HMAC-SHA1'
  }

  // TODO: This is insecure - we need to get a valid certificiate
  request.post({url:host+token_path, oauth:oauth, rejectUnauthorized: false}, function(err, response, body)
  {
    console.log(err)
    console.log(body)
	// TODO: for some reason this body is empty
    var req_data = qs.parse(body)
    console.log(req_data)
	// Redirect user to authorize uri
    var uri = host + authorizePath + '?' + qs.stringify({oauth_token: req_data.oauth_token})
	// After token is authorized
	var auth_data = qs.parse(body),
		oauth = 
		{
			consumer_key: consumer_key,
			consumer_secret: oauth_consumer_secret,
			token: auth_data.oauth_token,
			token_secret: req_data.oauth_token_secret,
			verifier: auth_data.oauth_verifier
		},
		url = host + token_path;
		// TODO: left off here
		request.post({url:url, oauth:oauth}, function (e, r, body) {
			// ready to make signed requests on behalf of the user 
			var perm_data = qs.parse(body)
			  , oauth =
				{ consumer_key: CONSUMER_KEY
				, consumer_secret: CONSUMER_SECRET
				, token: perm_data.oauth_token
				, token_secret: perm_data.oauth_token_secret
				}
			  , url = 'https://api.twitter.com/1.1/users/show.json'
			  , qs =
				{ screen_name: perm_data.screen_name
				, user_id: perm_data.user_id
				}
			  ;
			request.get({url:url, oauth:oauth, qs:qs, json:true}, function (e, r, user) {
			  console.log(user)
			})
	  })
  })
});

app.get('/', (req, res) => {
  res.send('Hello<br><a href="/auth">Log in with myFields</a>');
});

app.listen(80, () => {
  console.log('Express server started on port 80');
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
