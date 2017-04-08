var express = require('express')
  , session = require('express-session')
var Grant = require('grant-express')
  , grant = new Grant
  		({
			"server": {
				"protocol": "http",
				"host": "localhost:3000",
				"callback": "/callback",
				"transport": "session",
				"state": true
			},
			"myfields_mock": {
				"request_url": 'http://localhost/oauth/request_token',
				"authorize_url": 'http://localhost/oauth/authorize',
				"access_url": 'http://localhost/oauth/access_token',
				"oauth": 1,
				"key": "key",
				"secret": "secret",
				"scope": ["read", "write"],
				"callback": "/provider1/callback"
			}
		})

var app = express()
// REQUIRED: (any session store - see ./examples/express-session)
app.use(session({secret: 'grant'}))
// mount grant
app.use(grant)