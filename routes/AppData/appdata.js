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
 * @apiSuccess {array} object App Appdata
 */
router.get('/', function(req, res, next) {
    models.AppData.findAll()
        .then(function (result) {
            res.send(result);
        })
        .error(function (err) {
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
 * @apiParam {Double} lattitude the GPS lattitude (optional)
 */
router.post('/create', isAuthenticated, function(req, res, next) {
    if(!req.body.username) 
    {
        req.status(500).send({message: "Missing username parameter."})
    }
    else {
        var geolocation;
        if (req.body.longitude != 'undefined' && req.body.lattitude != 'undefined'){
            geolocation = point(req.body.longitude, req.body.lattitude);
        }
        models.AppData.create({
            username: req.decoded,
            jsondata: req.body.jsondata,
            image: req.body.image,
            geo: geolocation,
            active: false
        })
    }
});

module.exports = router;