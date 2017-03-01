var request = require('supertest');
var should = require('should');
var assert = require('assert');
var config = require('../config.json');
var url = config.url;
var jwt = config.jwt;
var exports = module.exports = {};

/**
 * Test listing all apps
 */
exports.listAllApps = function(done){
	request(url)
		.get('api/app')
		.set({})
		.end(function (err, res) {
        if (err) {
          throw err;
        }

        res.status.should.equal(200);
        done();
      });
};

/**
 * Test posting an invalid app
 */
exports.createInvalidApp = function(done){
	var blankApp = {
		name: '',
		devInfo: ''
	};

	request(url)
		.post('api/app/add')
		.set('x-access-token', jwt)
		.send(blankApp)
		.end(function (err, res) {
            if (err) {
                throw err;
            }
            res.status.should.equal(500);
            done();
        });
};

/**
 * Test posting a valid app
 */
exports.createValidApp = function(done){
	var testApp = {
		name: config.newAppProfile.name,
		devInfo: config.newAppProfile.devInfo
	};

	request(url)
	.post('api/app/add')
	.set('x-access-token', jwt)
	.send(testApp)
	.end(function (err, res) {
        if (err) {
            throw err;
        }
        res.status.should.equal(200);
        done();
    });
};