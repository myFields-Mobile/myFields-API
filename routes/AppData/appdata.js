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
router.delete('/remove', function(req, res){
	Entry.findById(req.params.id)
	// I am not sure about the 'entries' part
		.exec(function(err, entries){
			if(err || !entries){
				res.status(400).send('Error: Could not delete report');
			}
			else{
				entries.remove(function(err){
					if (err){
						res.status.send('Error: COuld not delete report');
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

module.exports = router;