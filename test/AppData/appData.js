var request = require('supertest');
var should = require('should');
var assert = require('assert');
var config = require('../config.json');
var url = config.url;
var jwt = config.jwt;
var models  = require('../../models');
var exports = module.exports = {};

// TODO: test listing all app data
exports.listAllAppData = function(done){
	request(url)
		.get('api/appData')
		.set('x-access-token', jwt)
		.end(function (err, res) {
        if (err) {
          throw err;
        }

        res.status.should.equal(200);
        done();
      });
};

// TODO: test getting all json data from app data
exports.listAllAppDataJSON = function(done){
	request(url)
		.get('api/appData/getJSON')
		.set('x-access-token', jwt)
		.end(function (err, res) {
        if (err) {
          throw err;
        }

        res.status.should.equal(200);
        done();
      });
};

// Test creating new invalid AppData
exports.createInvalidAppData = function(done){
	var blankAppData = {
	    jsondata: '',
	    image: '',
	    geoloc: '',
	    active: false
	};
	request(url)
		.post('api/appData/create')
		.set('x-access-token', jwt)
		.send(blankAppData)
		.end(function (err, res) {
        if (err) {
          throw err;
        }

        res.status.should.equal(400); //since there is no username
        done();
      });
};

// TODO: test creating new valid AppData
exports.createValidAppData = function(done){
	var testAppData = {
		username: config.newAppData.username,
	    jsondata: config.newAppData.jsondata,
	    image: config.newAppData.image,
	    geoloc: config.newAppData.geoloc,
	    active: config.newAppData.active
	};
	request(url)
		.post('api/appData/create')
		.set('x-access-token', jwt)
		.send(testAppData)
		.end(function (err, res) {
        if (err) {
          throw err;
        }

        res.status.should.equal(200); //since there is no username
        done();
      });
};

// Test removing an entry from AppData (that fails)
exports.removeAppDataFail = function(done){
	request(url)
	.delete('api/appData/remove')
	.set('x-access-token', jwt)
	.send('test')
	.end(function (err, res){
		if(err){
			throw err;
		}

		res.status.should.equal(500);
		done();
	});

};

// Test removing an entry from AppData (that succeeds)
exports.removeAppDataSuccess = function(done){
	// So need to figure out a good ID we can use for deletion purposes
	var idToRemove = models.AppData.findAll({where: "select id from models.AppData where username = 'test'"}); // Help
	var entryToRemove = {id: idToRemove};
	request(url)
		.delete('api/appData/remove')
		.set('x-access-token', jwt)
		.send(entryToRemove)
		.end(function(err, res){
			if(err){
				throw err;
			}

			res.status.should.equal(200);
			done();
		});
};

// TODO: test filtering by user
exports.filterAppDataByUser = function(done){
	var user = {id: 1};
	request(url)
		.get('api/appData/filter/user')
		.set('x-access-token', jwt)
		.send(user)
		.end(function (err, res) {
        if (err) {
          throw err;
        }

        res.status.should.equal(200);
        done();
      });
};

// TODO: test filtering by location
exports.filterAppDataByLocation = function(done){
	var location = {geoloc: []}; // TBD
	request(url)
		.get('api/appData/filter/user')
		.set('x-access-token', jwt)
		.send(location)
		.end(function (err, res) {
        if (err) {
          throw err;
        }

        res.status.should.equal(200);
        done();
      });
};

// TODO: test filtering by app
exports.filterAppDataByApp = function(done){
	var application = {app: ""}; // TBD
	request(url)
		.get('api/appData/filter/user')
		.set('x-access-token', jwt)
		.send(application)
		.end(function (err, res) {
        if (err) {
          throw err;
        }

        res.status.should.equal(200);
        done();
      });
};

// TODO: test getting images
exports.getAllImages = function(done){
	request(url)
		.get('api/appData/filter/user')
		.set('x-access-token', jwt)
		.end(function (err, res) {
        if (err) {
          throw err;
        }

        res.status.should.equal(200);
        done();
      });
};