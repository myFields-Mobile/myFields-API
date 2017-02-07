// Comment up here?
// Check styling for brackets & stuff

var express = require('express');
var models  = require('../../models');
var router = express.Router({mergeParams:true});
var isAuthenticated = require('../Authentication/authenticationMiddlewear').isAuthenticated;
var isTypes = require('../Authentication/authenticationMiddlewear').isTypes;

/**
 * @api {get} api/appdata/ List
 * @apiName List All AppData
 * @apiGroup AppData
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {Array} object Entire AppData table
 */
router.get('/', isAuthenticated, isTypes(["Admin", "Inspector"]), function(req, res, next) {
    models.AppData.findAll()
        .then(function (result) {
            res.send(result);
        })
        .error(function (err) {
            res.status(500).send(err);
        });
});

/**
 * @api {get} api/appdata/getJSON List
 * @apiName List All AppData
 * @apiGroup AppData
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object all JSON data from appdata table
 */
router.get('/getJSON', isAuthenticated, isTypes(["Admin", "Inspector"]), function(req, res, next) {
    models.AppData.findAll({where: "select jsondata from models.AppData", raw: true})
        .then(function (result) {
            res.send(result);
        })
        .error(function(err) {
            res.status(500).send(err);
        });
});

/**
 * @api {post} api/appdata/create
 * @apiName CreateAppData
 * @apiGroup AppData
 * 
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiParam {String} jsondata The json string containing the data to submit (optional)
 * @apiParam {String} image The URL to the location where the image is stored (S3, Azure, etc)
 * @apiParam {Double} longitude The GPS longitude (optional)
 * @apiParam {Double} latitude the GPS latitude (optional)
 */
router.post('/create', isAuthenticated, function(req, res, next) {
    if(!req.body.username) 
    {
        req.status(400).send({message: "Missing username parameter."})
    }
    else {
        var geolocation;
        if (req.body.longitude != 'undefined' && req.body.latitude != 'undefined'){
            geolocation = point(req.body.longitude, req.body.latitude);
        }
        models.AppData.create({
            username: req.decoded,
            jsondata: req.body.jsondata,
            image: req.body.image,
            geoloc: geolocation,
            active: false
        })
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send({
                message: "Report created."
            })
        }
    }
});

/**
 * @api {delete} api/appdata/remove Remove an entry
 * @apiName DeleteReport
 * @apiGroup AppData
 *
 * @apiParam {String} id The id of the report in the table
 *
 * @apiSuccess {String} message A success message.
 */
router.delete('/remove', isAuthenticated, isTypes(["Admin", "Inspector"]), function(req, res){
	// Unsure about the 'entries' part
	Entry.findById(req.body.id)
		.exec(function(err, entries){
			if(err || !entries){
				res.status(500).send(err);
			}
			else{
				entries.remove(function(err){
					if (err){
						res.status(500).send(err);
					}
					else{
						res.status(200).send({
							message: 'Report has been successfully deleted.'
						});
					}
				});
			}
		});
});

/**
 * @api {get} api/filter/user Filter by User
 * @apiName FilterByUser
 * @apiGroup AppData
 *
 * @apiParam {String} userID The id of the user to filter by
 */
router.get('/filter/user', isAuthenticated, isTypes(["Admin", "Inspector"]), function(req, res, next){
	models.AppData.findAll({ userID: req.body.userID })
	.then(function (result) {
		res.send(result);
        })
        .error(function (err) {
            res.status(500).send(err);
        });
});

/**
 * @api {get} api/filter/location Filter by location
 * @apiName FilterByLocation
 * @apiGroup AppData
 *
 * @apiParam {String} geoloc The location to filter by
 */
router.get('/filter/location', isAuthenticated, isTypes(["Admin", "Inspector"]), function(req, res, next){
	models.AppData.findAll({ geoloc: req.body.geoloc })
	.then(function (result) {
		res.send(result);
    })
    .error(function (err) {
        res.status(500).send(err);
    });
});

/**
 * @api {get} api/filter/app Filter by app
 * @apiName FilterByApp
 * @apiGroup AppData
 *
 * @apiParam {String} app The App to filter by
 */
router.get('/filter/app', isAuthenticated, isTypes(["Admin", "Inspector"]), function(req, res, next){
	models.AppData.findAll({ app: req.body.app })
	.then(function (result) {
		res.send(result);
	})
	.err(function (err) {
		res.status(500).send(err);
	});
});

/*
// Get images
router.get('/get/images', isAuthenticated, isTypes(["Admin", "Inspector"]), function(req, res, next){
	models.AppData.findAll({ where: "select images from models.AppData", raw: true})
	.then(function (result){
		// TODO: something with the image urls here
	})
	.err(function (err) {
		res.status(500).send(err);
	});
});
*/
module.exports = router;