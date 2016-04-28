var express = require('express');
var models  = require('../../models');
var router = express.Router({mergeParams:true});
var isAuthenticated = require('../Authentication/authenticationMiddlewear').isAuthenticated;
var isTypes = require('../Authentication/authenticationMiddlewear').isTypes;

/**
 * @apiIgnore Not finished Method
 * @api {post} api/irrigation/create Create
 * @apiName CreateIrrigation
 * @apiGroup Irrigation
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiPermission Admin
 * @apiParam {String} name The name of the new irrigation type.
 *
 * @apiSuccess {Object} field The newly created irrigation type.
 */
//router.post('/create', isAuthenticated, isTypes(['Admin']), function(req, res, next) {
//    if(!req.body.name && req.body.name.length == 0) {
//        res.status(500).send({ message: "Missing post parameters." });
//    } else {
//        models.Irrigation.create({
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
 * @api {get} api/irrigation/{id}/activate Activate
 * @apiName ActivateIrrigation
 * @apiGroup Irrigation
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiPermission Admin
 *
 * @apiSuccess {string} message Irrigation type successfully activated.
 */
//router.get('/:id/activate', isAuthenticated, function(req, res, next) {
//    models.Irrigation.find({
//        where: {
//            id: req.params.id
//        }
//    }).then(function(matchingIrrigation) {
//        matchingIrrigation.updateAttributes({
//            active: true
//        })
//            .then(function(updatedIrrigation) {
//                res.send(updatedIrrigation);
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
 * @api {get} api/irrigation/{id}/deactivate Deactivate
 * @apiName DeactiveIrrigation
 * @apiGroup Irrigation
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiPermission Admin
 *
 * @apiSuccess {string} message Irrigation successfully deactivated.
 */
//router.get('/:id/deactivate', isAuthenticated, function(req, res, next) {
//    models.Irrigation.find({
//        where: {
//            id: req.params.id
//        }
//    }).then(function(matchingIrrigation) {
//        matchingIrrigation.updateAttributes({
//            active: false
//        })
//            .then(function(updatedIrrigation) {
//                res.send(updatedIrrigation);
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
 * @api {get} api/irrigation/{id}/update Update
 * @apiName UpdateIrrigation
 * @apiGroup Irrigation
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiPermission Admin
 * @apiParam {String} name The name of the new crop type.
 *
 * @apiSuccess {object} object Updated irrigation type object.
 */
//router.post('/:id/update', isAuthenticated, isTypes(['Admin']),function(req, res, next) {
//    if(!req.body.name && req.body.name.length == 0) {
//        res.status(500).send({ message: "Missing post parameters." });
//    } else {
//        models.Irrigation.findOne({
//            where: {
//                id: req.params.id
//            }
//        })
//            .then(function(matchingIrrigation) {
//                if (typeof matchingIrrigation !== 'undefined' && matchingIrrigation) {
//                    matchingIrrigation.updateAttributes({name: req.body.name})
//                        .then(function(updatedIrrigation) {
//                            res.send(updatedIrrigation);
//                        })
//                        .error(function(err) {
//                            res.status(500).send(err);
//                        });
//                } else {
//                    res.status(500).send({message: "No irrigation found with the provided id"});
//                }
//            })
//            .error(function(err) {
//                res.status(500).send(err);
//            });
//    }
//});

/**
 * @api {get} api/irrigation/{id} Get
 * @apiName ListIrrigation
 * @apiGroup Irrigation
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {object} object Irrigation type with provided id.
 */
router.get('/:id', function(req, res, next) {
    models.Irrigation.find({
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
 * @api {get} api/irrigation/ List
 * @apiName ListAllIrrigation
 * @apiGroup Irrigation
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object All irrigation types.
 */
router.get('/', function(req, res, next) {
    models.Irrigation.findAll({
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
 * @api {get} api/irrigation/all List deactive irrigation
 * @apiName ListDeactiveIrrigation
 * @apiGroup Irrigation
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object All irrigation types.
 */
router.get('/all', function(req, res, next) {
    models.Irrigation.findAll()
        .then(function (result) {
            res.send(result);
        })
        .error(function (err) {
            res.status(500).send(err);
        });
});

module.exports = router;