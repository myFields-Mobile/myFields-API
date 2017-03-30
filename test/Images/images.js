var request = require('supertest');
var should = require('should');
var assert = require('assert');
// var config = require('../config.json');
var newBlob = require('../config.json').newBlob;
var url = config.url;
var jwt = config.jwt;
var exports = module.exports = {};

/**
 * Test listing all blob info
 */
exports.listBlobs = function (done)
{
    request(url)
        .get('api/images/listBlobs')
        .set('x-access-token', jwt)
        .end(function (err, res)
        {
            if(err)
            {
                throw err;
            }

            res.status.should.equal(200);
            done();
        });
};

/**
 * Invalid test adding a blob
 */
exports.addBlobFail = function (done)
{
    var blankBlob =
    {
        container: '',
        filename: ''
    };
    request(url)
        .get('api/images/addBlob')
        .set('x-access-token', jwt)
        .send(blankBlob)
        .end(function (err, res)
        {
            if(err)
            {
                throw (err);
            }

            res.status.should.equal(500);
            done();
        });
};

/**
 * Valid test adding a blob
 */
exports.addBlobSuccess = function (done)
{
    // This is not valid yet
    var blankBlob =
        {
            container: newBlob.container, // TODO: get this stuff into config.json
            filename: newBlob.filename
        };
    request(url)
        .get('api/images/addBlob')
        .set('x-access-token', jwt)
        .send(blankBlob)
        .end(function (err, res)
        {
            if(err)
            {
                throw (err);
            }

            res.status.should.equal(200);
            done();
        });
};

/**
 * Invalid test reading blob stream
 */
exports.readBlobFail = function (done)
{
    var blankBlobInfo =
        {
            container: '',
            blob: '',
            output: ''
        };
    request(url)
        .get('api/images/downloadBlob')
        .set('x-access-token', jwt)
        .send(blankBlobInfo)
        .end(function (err, res)
        {
            if(err)
            {
                throw (err);
            }

            res.status.should.equal(500);
            done();
        });
};

/**
 * Valid test reading blob stream
 */
exports.readBlobSuccess = function (done)
{
    // This is not valid yet
    var blobToRead = new File(newBlob.blob); // File is a sub-class of blob, so this should work
    var blobInfo =
        {
            container: newBlob.container, // TODO: Get this stuff in config.json
            blob: blobToRead
        };
    request(url)
        .get('api/images/downloadBlob')
        .set('x-access-token', jwt)
        .send(blobInfo)
        .end(function (err, res)
        {
            if(err)
            {
                throw (err);
            }

            res.status.should.equal(200);
            done();
        });
};

/**
 * Invalid test deleting a blob
 */
exports.deleteBlobFail = function (done)
{
    var blankBlobToDelete =
        {
            container: '',
            blob: ''
        };
    request(url)
        .get('api/images/deleteBlob')
        .set('x-access-token', jwt)
        .send(blankBlobToDelete)
        .end(function (err, res)
        {
            if(err)
            {
                throw(err);
            }
            res.status.should.equal(500);
            done();
        });
};

/**
 * Valid test deleting a blob
 */
exports.deleteBlobSuccess = function (done)
{
    // This is not yet valid
    var blobFile = new File(newBlob.blob);
    var blobToDelete =
        {
            container: newBlob.container,  // TODO: get this stuff in config.json
            blob: blobFile
        };
    request(url)
        .get('api/images/deleteBlob')
        .set('x-access-token', jwt)
        .send(blobToDelete)
        .end(function (err, res)
        {
            if(err)
            {
                throw(err);
            }
            res.status.should.equal(200);
            done();
        });
};