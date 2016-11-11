var express = require('express');
var models  = require('../../models');
var router = express.Router({mergeParams:true});
var isAuthenticated = require('../Authentication/authenticationMiddlewear').isAuthenticated;
var isTypes = require('../Authentication/authenticationMiddlewear').isTypes;

/**
 * @api {get} api/app/ List
 * @apiName List All App
 * @apiGroup App
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object App
 */
router.get('/', function(req, res, next) {
    models.AppModel.findAll()
        .then(function (result) {
            res.send(result);
        })
        .error(function (err) {
            res.status(500).send(err);
        });
});

/**
 * @api {post} api/app/add
 * @apiName Add App
 * @apiGroup App
 * 
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiParam {String} name The name of the application
 * @apiParam {String} devInfo The developer informtion for the app, including version
 */
router.post('/app/add', isAuthenticated, isTypes(['Admin']), function(req, res, next){
    if(!req.body.name || !req.body.devInfo)
    {
        res.status(500).send({message: "Missing post parameters."});
    }
    else {
        models.App.create({
            name: req.body.name,
            devInfo: req.body.devInfo
        })
            .then(function(result) {
                res.send(result);
            })
            .error(function(err){
                res.status(500).send(err);
            })
    }
});

module.exports = router;