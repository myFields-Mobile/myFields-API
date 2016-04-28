var request = require('supertest');
var should = require('should');
var assert = require('assert');
var config = require('../config.json');
var exports = module.exports = {};

exports.authenticateEmptyUser = function(done) {
  request(config.url)
      .post('/api/authenticate')
      .send({})
      .end(function (err, res) {
        if (err) {
          throw err;
        }

        res.status.should.equal(500);
        done();
      });
};

exports.authenticateExistingUser = function(done) {
  var existingUserProfile = {
    email: config.newUserProfile.email,
    password: config.newUserProfile.password
  };

  request(config.url)
      .post('/api/authenticate')
      .send(existingUserProfile)
      .end(function(err, res) {
        if (err) {
          throw err;
        }

        res.status.should.equal(200);
        res.body.should.have.property('token');
        config.jwt = res.body.token;
        res.body.token.should.equal(config.jwt);

        done();
      });
};

exports.authenticateInvalidPassword = function(done) {
  var invalidUserProfile = {
    email: config.newUserProfile.email,
    password: "invalidpassword"
  };

  request(config.url)
      .post('/api/authenticate')
      .send(invalidUserProfile)
      .end(function(err, res) {
        if (err) {
          throw err;
        }

        res.status.should.equal(500);
        done();
      });
};
