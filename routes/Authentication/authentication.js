/*
var express = require('express');
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
 *
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

module.exports = router;
*/

'use strict';

const express = require('express');
const simpleOauthModule = require('./../');

const app = express();
const oauth2 = simpleOauthModule.create({
  client: {
    id: process.env.OAUTH_KEY,
    secret: process.env.OAUTH_SECRET,
  },
  auth: {
    tokenHost: 'https://svcs.ext.solotandem.com:32768',
    tokenPath: '/oauth/access_token',
    authorizePath: '/oauth/authorize',
  },
});

// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: 'http://localhost:3000/callback',
  scope: 'notifications',
  state: '3(#0/!~',
});

// Initial page redirecting to Github
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
  res.send('');
});

app.get('/', (req, res) => {
  res.send('Hello<br><a href="/auth">Log in with myFields</a>');
});

app.listen(3000, () => {
  console.log('Express server started on port 3000'); // eslint-disable-line
});


// Credits to [@lazybean](https://github.com/lazybean)