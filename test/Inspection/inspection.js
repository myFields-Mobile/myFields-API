var fs = require('fs');
var request = require('supertest');
var should = require('should');
var assert = require('assert');
var config = require('../config.json');
var exports = module.exports = {};

exports.createInspection = function(done) {
  request(config.url)
      .post('/api/inspection/create')
      .set('x-access-token', config.jwt)
      .send(config.newInspection)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.status.should.equal(200);
        done();
      });
};

exports.createInspectionWithoutParams = function(done) {
  request(config.url)
      .post('/api/inspection/create')
      .set('x-access-token', config.jwt)
      .send({})
      .end(function(err, res) {
        if (err) {
          throw err;
        }

        res.status.should.equal(500);
        done();
      });
};

exports.assignInspection = function(done) {
  request(config.url)
      .post('/api/inspection/1/assign')
      .set('x-access-token', config.jwt)
      .send(config.addInspector)
      .end(function(err, res){
        if(err) throw err;

        res.status.should.equal(200);
        res.body.inspector_id.should.equal(1);
        done();
      });
};

exports.listActiveInspection = function(done){
  request(config.url)
      .get('/api/inspection/')
      .set('x-access-token', config.jwt)
      .end(function(err, res) {
        if(err) throw err;

        res.status.should.equal(200);
        res.body.length.should.equal(1);
        done();
      });
};

exports.gradeInspection = function(done){
  request(config.url)
      .get('/api/inspection/1/accept')
      .set('x-access-token', config.jwt)
      .end(function(err, res){
        if(err) throw err;

        res.status.should.equal(200);
        res.body.accepted.should.equal(true);
        done();
      });
};

exports.deactivateInspection = function(done) {
  request(config.url)
      .get('/api/inspection/1/deactivate')
      .set('x-access-token', config.jwt)
      .end(function(err, res) {
        if (err) {
          throw err;
        }

        res.status.should.equal(200);
        res.body.active.should.equal(false);
        done();
      });
};

exports.listDeactiveInspections = function(done) {
  request(config.url)
      .get('/api/inspection/me')
      .set('x-access-token', config.jwt)
      .end(function(err, res) {
        if(err) throw err;

        res.status.should.equal(200);
        res.body.length.should.equal(1);
        done();
      });
};