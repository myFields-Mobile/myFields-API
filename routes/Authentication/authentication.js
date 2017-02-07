const express = require('express');
var jwt    = require('jsonwebtoken');
var models  = require('../../models');
var config = require('../../config/config');
var router = express.Router({mergeParams:true});

'use strict';

const simpleOauthModule = require('simple-oauth2');

const app = express();
const oauth2 = simpleOauthModule.create({
  client: {
    //id: process.env.OAUTH_KEY,
    //secret: process.env.OAUTH_SECRET,
    id: 'gE73dGnozdQp8Xgj3PEf4dgxez8pa7EN',
    secret: 'j8Cagf3oG2v9ssX27QkKj4beb9A5UMLS'
    // Github Testing
    //id: 'c3ef8c23e04510bc59b3',
    //secret: '851d07cb1724cd94224e3f5ff4fc19a5594ace18'
  },
  auth: {
    tokenHost: 'https://svcs.ext.solotandem.com:32768',
    //tokenHost: 'https://github.com',
    tokenPath: '/oauth/access_token',
    //tokenPath: '/login/oauth/access_token',
    authorizePath: '/oauth/authorize'
    //authorizePath: '/login/oauth/authorize'
  },
});

// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  // redirect_uri: 'oob'
  redirect_uri: 'http://10.131.231.41/callback'
});

// Initial page redirecting to myFields
app.get('/auth', (req, res) => {
  console.log(authorizationUri);
  res.redirect(authorizationUri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', (req, res) => {
  const code = req.query.code;
  const options = {
    code,
  };

  oauth2.authorizationCode.getToken(options, (error, result) => {
    if (error) {
      console.error('Access Token Error', error.message);
      return res.json('Authentication failed');
    }

    console.log('The resulting token: ', result);
    const token = oauth2.accessToken.create(result);

    return res
      .status(200)
      .json(token);
  });
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


// Credits for the above to [@lazybean](https://github.com/lazybean)

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