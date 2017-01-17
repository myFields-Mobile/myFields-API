var request = require('supertest');
var should = require('should');
var assert = require('assert');
var config = require('../config.json');
var url = config.url;
var jwt = config.jwt;
var exports = module.exports = {};

// Test getting all the users who are admin
// Not sure if need more after 'res.status.should.equal(200)'
exports.findAllAdmin = function(done) {
	request(config.url)
	.get('api/admin/users')
	.send('x-access-token', jwt)
	.end(function(err, res) {
        if (err) {
          throw err;
        }
        res.status.should.equal(200);
        done();
    });
};

// TODO: test getting all the types

// TODO: test adding type to a user

// TODO: test removing a type from a user