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

module.exports = router;