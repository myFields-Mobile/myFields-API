var express = require('express');
var models  = require('../../models');
var router = express.Router({mergeParams:true});
var isAuthenticated = require('../Authentication/authenticationMiddlewear').isAuthenticated;
var isTypes = require('../Authentication/authenticationMiddlewear').isTypes;

/**
 * @apiIgnore Not finished Method
 * @api {post} api/crop/create Create
 * @apiName CreateCrop
 * @apiGroup Crop
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiPermission Admin
 * @apiParam {String} name The name of the new crop type.
 *
 * @apiSuccess {Object} field The newly created crop type.
 */
//router.post('/create', isAuthenticated, isTypes(['Admin']), function(req, res, next) {
//    if(!req.body.name && req.body.name.length == 0) {
//        res.status(500).send({ message: "Missing post parameters." });
//    } else {
//        models.Crop.create({
//            name: req.body.name
//        })
//            .then(function(result) {
//                res.send(result);
//            })
//            .error(function(err) {
//                res.status(500).send(err);
//            });
//    }
//});

/**
 * @apiIgnore Not finished Method
 * @api {get} api/crop/{id}/activate Activate
 * @apiName ActivateCrop
 * @apiGroup Crop
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiPermission Admin
 *
 * @apiSuccess {string} message Crop type successfully activated.
 */
//router.get('/:id/activate', isAuthenticated, function(req, res, next) {
//    models.Crop.find({
//        where: {
//            id: req.params.id
//        }
//    }).then(function(matchingCrop) {
//        matchingCrop.updateAttributes({
//            active: true
//        })
//            .then(function(updatedCrop) {
//                res.send(updatedCrop);
//            })
//            .error(function(err) {
//                req.status(500).send(err);
//            });
//    }).error(function(err) {
//        req.status(500).send(err);
//    });
//});

/**
 * @apiIgnore Not finished Method
 * @api {get} api/crop/{id}/deactivate Deactivate
 * @apiName DeactiveCrop
 * @apiGroup Crop
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiPermission Admin
 *
 * @apiSuccess {string} message Crop successfully deactivated.
 */
//router.get('/:id/deactivate', isAuthenticated, function(req, res, next) {
//    models.Crop.find({
//        where: {
//            id: req.params.id
//        }
//    }).then(function(matchingCrop) {
//        matchingCrop.updateAttributes({
//            active: false
//        })
//            .then(function(updatedCrop) {
//                res.send(updatedCrop);
//            })
//            .error(function(err) {
//                req.status(500).send(err);
//            });
//    }).error(function(err) {
//        req.status(500).send(err);
//    });
//});

/**
 * @apiIgnore Not finished Method
 * @api {get} api/crop/{id}/update Update
 * @apiName UpdateCrop
 * @apiGroup Crop
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiPermission Admin
 * @apiParam {String} name The name of the new crop type.
 *
 * @apiSuccess {object} object Updated crop type object.
 */
//router.post('/:id/update', isAuthenticated, isTypes(['Admin']),function(req, res, next) {
//    if(!req.body.name && req.body.name.length == 0) {
//        res.status(500).send({ message: "Missing post parameters." });
//    } else {
//        models.Crop.findOne({
//            where: {
//                id: req.params.id
//            }
//        })
//            .then(function(matchingCrop) {
//                if (typeof matchingCrop !== 'undefined' && matchingCrop) {
//                    matchingCrop.updateAttributes({name: req.body.name})
//                        .then(function(updatedCrop) {
//                            res.send(updatedCrop);
//                        })
//                        .error(function(err) {
//                            res.status(500).send(err);
//                        });
//                } else {
//                    res.status(500).send({message: "No crop found with the provided id"});
//                }
//            })
//            .error(function(err) {
//                res.status(500).send(err);
//            });
//    }
//});

/**
 * @api {get} api/crop/{id} Get
 * @apiName ListCrop
 * @apiGroup Crop
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {object} object Crop type with provided id.
 */
router.get('/:id', function(req, res, next) {
    models.Crop.find({
        where: {
            id:req.params.id
        }
    })
        .then(function(result) {
            res.send(result);
        })
        .error(function(err) {
            res.status(500).send(err);
        });
});

/**
 * @api {get} api/crop/ List
 * @apiName ListAllCrop
 * @apiGroup Crop
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object All crop types.
 */
router.get('/', function(req, res, next) {
    models.Crop.findAll({
        where: {
            active:true
        }
    })
        .then(function (result) {
            res.send(result);
        })
        .error(function (err) {
            res.status(500).send(err);
        });
});

/**
 * @api {get} api/crop/all List deactive crop
 * @apiName ListDeactiveCrop
 * @apiGroup Crop
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object All crop types.
 */
router.get('/all', function(req, res, next) {
    models.Crop.findAll()
        .then(function (result) {
            res.send(result);
        })
        .error(function (err) {
            res.status(500).send(err);
        });
});

module.exports = router;