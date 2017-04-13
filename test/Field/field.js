var fs = require('fs');
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config.json');
var url = config.url;
var jwt = config.jwt;
var newField = config.newField;

exports.createField = function (done) {
    request(url)
        .post('/api/field/create')
        .set('x-access-token', jwt)
        .send(newField)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            res.status.should.equal(200);
            done();
        });
};
