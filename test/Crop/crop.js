var fs = require('fs');
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config.json');
var url = config.url;
var jwt = config.jwt;
var newCrop = config.newCrop;

exports.createCrop = function (done) {
    request(url)
        .post('/api/crop/create')
        .set()
        .send(newCrop)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            res.status.should.equal(200);
            done();
        });
};

exports.createDuplicateCrop = function (done) {
    var duplicateCrop = {
        name: "Test Crop"
    };
    request(url)
        .post('/api/crop/create')
        .set('x-access-token', jwt)
        .send(duplicateCrop)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            res.status.should.equal(500);
            done();
        });
};

exports.listTestCrop = function (done) {
    request(url)
        .get('/api/crop/1')
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

exports.listActiveCrops = function (done) {
    request(url)
        .get('/api/crop')
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

exports.deactivateCrop = function (done) {
    request(url)
        .get('/api/crop/1/deactivate')
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

exports.activateCrop = function (done) {
    request(url)
        .get('/api/crop/1/activate')
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