var fs = require('fs');
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config.json');
var url = config.url;
var jwt = config.jwt;
var newIrrigation = config.newIrrigation;

exports.createIrrigation = function (done) {
    request(url)
        .post('/api/irrigation/create')
        .set('x-access-token', jwt)
        .send(newIrrigation)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            res.status.should.equal(200);
            done();
        });
};

exports.createDuplicateIrrigation = function (done) {
    var duplicateIrrigation = {
        name: "Test Irrigation"
    };
    request(url)
        .post('/api/irrigation/create')
        .set('x-access-token', jwt)
        .send(duplicateIrrigation)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            res.status.should.equal(500);
            done();
        });
};

exports.listTestIrrigation = function (done) {
    request(url)
        .get('/api/irrigation/1')
        .set('x-access-token', jwt)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            res.status.should.equal(200);
            //res.body.length.should.be.above(0);
            done();
        });
};

exports.listActiveIrrigations = function (done) {
    request(url)
        .get('/api/irrigation')
        .set('x-access-token', jwt)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            res.status.should.equal(200);
            res.body.length.should.be.above(0);
            done();
        });
};

exports.deactivateIrrigation = function (done) {
    request(url)
        .get('/api/irrigation/1/deactivate')
        .set('x-access-token', jwt)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            res.status.should.equal(200);
            res.body.active.should.equal(false);
            done();
        });
};

exports.activateIrrigation = function (done) {
    request(url)
        .get('/api/irrigation/1/activate')
        .set('x-access-token', jwt)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            res.status.should.equal(200);
            res.body.active.should.equal(true);
            done();
        });
};