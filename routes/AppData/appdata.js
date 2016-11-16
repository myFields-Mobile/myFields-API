var express = require('express');
var models  = require('../../models');
var router = express.Router({mergeParams:true});
var isAuthenticated = require('../Authentication/authenticationMiddlewear').isAuthenticated;
var isTypes = require('../Authentication/authenticationMiddlewear').isTypes;

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
 * @api {delete} api/user/reset-password Reset Password
 * @apiName DeleteReport
 * @apiGroup AppData
 *
 * @apiParam {String} id The id of the report in the table
 *
 * @apiSuccess {String} message A success message.
 */
router.delete('/remove', isAuthenticated, isTypes(["Admin", "Inspector"]), function(req, res){
	// I am not sure about the 'entries' part
	Entry.findById(req.params.id)
		.exec(function(err, entries){
			if(err || !entries){
				res.status(400).send(err);
			}
			else{
				entries.remove(function(err){
					if (err){
						res.status(403).send(err);
					}
					else{
						res.send({
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
 * @apiParam {String} userID The id of the user
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
	models.AppData.findAll({ geoloc: req.params.geoloc })
	.then(function (result) {
		res.send(result);
        })
        .error(function (err) {
            res.status(500).send(err);
        });
});

module.exports = router;