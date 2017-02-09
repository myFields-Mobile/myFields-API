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
  var oauth = {
    oauth_callback: 'oob',
    oauth_consumer_key: 'gE73dGnozdQp8Xgj3PEf4dgxez8pa7EN',//process.env.OAUTH_KEY,
    oauth_consumer_secret: 'j8Cagf3oG2v9ssX27QkKj4beb9A5UMLS', //process.env.OAUTH_SECRET
    oauth_signature_method: 'HMAC-SHA1'
  }

  // TODO: This is insecure - we need to get a valid certificiate
  request.post({url:host+token_path, oauth:oauth, rejectUnauthorized: false}, function(err, response, body)
  {
    console.log(err)
    console.log(body)
    var req_data = qs.parse(body)
    console.log(req_data)
    res.end()
  })
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', (req, res) => {
  const code = req.query.code;
  const options = {
    code,
  }
});

app.get('/success', (req, res) => {
  res.send('Horaay!');
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
