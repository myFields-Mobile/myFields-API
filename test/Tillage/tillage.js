var fs = require('fs');
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config.json');
var url = config.url;
var jwt = config.jwt;
var newTillage = config.newTillage;

exports.createTillage = function (done) {
    request(url)
        .post('/api/tillage/create')
        .set('x-access-token', jwt)
        .send(newTillage)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            res.status.should.equal(200);
            done();
        });
};

exports.createDuplicateTillage = function (done) {
    var duplicateTillage = {
        name: "Test Tillage"
    };
    request(url)
        .post('/api/tillage/create')
        .set('x-access-token', jwt)
        .send(duplicateTillage)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            res.status.should.equal(500);
            done();
        });
};

exports.listTestTillage = function (done) {
    request(url)
        .get('/api/tillage/1')
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

exports.listActiveTillages = function (done) {
    request(url)
        .get('/api/tillage')
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

exports.deactivateTillage = function (done) {
    request(url)
        .get('/api/tillage/1/deactivate')
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

exports.activateTillage = function (done) {
    request(url)
        .get('/api/tillage/1/activate')
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