var fs = require('fs')
var request = require('supertest');
var should = require('should');
var assert = require('assert');
var config = require('../config.json');
var exports = module.exports = {};

exports.createUser = function(done) {
  request(config.url)
      .post('/api/user/create')
      .send(config.newUserProfile)
      .end(function(err, res) {
        if (err) {
          throw err;
        }

        res.status.should.equal(200);
        res.body.email.should.equal(config.newUserProfile.email);
        done();
      });
};

exports.createDuplicateUser = function(done) {
  request(config.url)
      .post('/api/user/create')
      .send(config.newUserProfile)
      .end(function(err, res) {
        if (err) {
          throw err;
        }

        res.status.should.equal(500);
        done();
      });
};

exports.getCurrentUserRequiresJWT = function(done) {
  request(config.url)
      .get('/api/user/me')
      .end(function(err, res) {
        if(err) throw err;

        res.status.should.equal(403);
        done();
      });
};

exports.getCurrentUser = function(done) {
  request(config.url)
      .get('/api/user/me')
      .set('x-access-token', config.jwt)
      .end(function(err, res) {
        if(err) throw err;

        res.status.should.equal(200);
        done();
      });
};

