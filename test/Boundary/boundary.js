var fs = require('fs');
var request = require('supertest');
var should = require('should');
var assert = require('assert');
var config = require('../config.json');
var exports = module.exports = {};

exports.createBoundary = function(done) {
    request(config.url)
        .post('/api/boundary/create')
        .set('x-access-token', config.jwt)
        .send(config.newBoundary)
        .end(function(err, res) {
            if (err) {
                throw err;
            }

            res.status.should.equal(200);
            done();
        });
};

exports.createBoundaryWithoutParams = function(done) {
    request(config.url)
        .post('/api/boundary/create')
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


exports.listActiveBoundaries = function(done) {
    request(config.url)
        .get('/api/boundary/')
        .set('x-access-token', config.jwt)
        .end(function(err, res) {
            if(err) throw err;

            res.status.should.equal(200);
            res.body.length.should.equal(1);
            done();
        });
};

exports.deactivateBoundary = function(done) {
    request(config.url)
        .post('/api/boundary/1/update')
        .set('x-access-token', config.jwt)
        .send({
            active: false
        })
        .end(function(err, res) {
            if (err) {
                throw err;
            }

            res.status.should.equal(200);
            res.body.active.should.equal(false);
            done();
        });
};

exports.listDeactiveBoundaries = function(done) {
    request(config.url)
        .get('/api/boundary/all')
        .set('x-access-token', config.jwt)
        .end(function(err, res) {
            if(err) throw err;

            res.status.should.equal(200);
            res.body.length.should.equal(1);
            done();
        });
};