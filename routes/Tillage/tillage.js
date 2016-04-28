var express = require('express');
var models  = require('../../models');
var router = express.Router({mergeParams:true});
var isAuthenticated = require('../Authentication/authenticationMiddlewear').isAuthenticated;
var isTypes = require('../Authentication/authenticationMiddlewear').isTypes;

/**
 * @apiIgnore Not finished Method
 * @api {post} api/tillage/create Create
 * @apiName CreateTillage
 * @apiGroup Tillage
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiPermission Admin
 * @apiParam {String} name The name of the new tillage type.
 *
 * @apiSuccess {Object} field The newly created tillage type.
 */
//router.post('/create', isAuthenticated, isTypes(['Admin']), function(req, res, next) {
//  if(!req.body.name && req.body.name.length == 0) {
//    res.status(500).send({ message: "Missing post parameters." });
//  } else {
//    models.Tillage.create({
//      name: req.body.name
//    })
//    .then(function(result) {
//      res.send(result);
//    })
//    .error(function(err) {
//      res.status(500).send(err);
//    });
//  }
//});

/**
 * @apiIgnore Not finished Method
 * @api {get} api/tillage/{id}/activate Activate
 * @apiName ActivateTillage
 * @apiGroup Tillage
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiPermission Admin
 *
 * @apiSuccess {string} message Tillage type successfully activated.
 */
//router.get('/:id/activate', isAuthenticated, function(req, res, next) {
//    models.Tillage.find({
//        where: {
//            id: req.params.id
//        }
//    }).then(function(matchingTillage) {
//        matchingTillage.updateAttributes({
//            active: true
//        })
//        .then(function(updatedTillage) {
//            res.send(updatedTillage);
//        })
//        .error(function(err) {
//            req.status(500).send(err);
//        });
//    }).error(function(err) {
//        req.status(500).send(err);
//    });
//});

/**
 * @apiIgnore Not finished Method
 * @api {get} api/tillage/{id}/deactivate Deactivate
 * @apiName DeactiveTillage
 * @apiGroup Tillage
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiPermission Admin
 *
 * @apiSuccess {string} message Tillage successfully deactivated.
 */
//router.get('/:id/deactivate', isAuthenticated, function(req, res, next) {
//    models.Tillage.find({
//        where: {
//            id: req.params.id
//        }
//    }).then(function(matchingTillage) {
//        matchingTillage.updateAttributes({
//            active: false
//        })
//            .then(function(updatedTillage) {
//                res.send(updatedTillage);
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
 * @api {get} api/tillage/{id}/update Update
 * @apiName UpdateTillage
 * @apiGroup Tillage
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiPermission Admin
 * @apiParam {String} name The name of the new crop type.
 *
 * @apiSuccess {object} object Updated tillage type object.
 */
//router.post('/:id/update', isAuthenticated, isTypes(['Admin']),function(req, res, next) {
//  if(!req.body.name && req.body.name.length == 0) {
//    res.status(500).send({ message: "Missing post parameters." });
//  } else {
//    models.Tillage.findOne({
//      where: {
//        id: req.params.id
//      }
//    })
//    .then(function(matchingTillage) {
//          if (typeof matchingTillage !== 'undefined' && matchingTillage) {
//            matchingTillage.updateAttributes({name: req.body.name})
//                .then(function(updatedTillage) {
//                  res.send(updatedTillage);
//                })
//                .error(function(err) {
//                  res.status(500).send(err);
//                });
//          } else {
//            res.status(500).send({message: "No tillage found with the provided id"});
//          }
//    })
//    .error(function(err) {
//      res.status(500).send(err);
//    });
//  }
//});

/**
 * @api {get} api/tillage/{id} Get
 * @apiName ListTillage
 * @apiGroup Tillage
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {object} object Tillage type with provided id.
 */
router.get('/:id(\\d+)/', function(req, res, next) {
  models.Tillage.find({
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
 * @api {get} api/tillage/ List
 * @apiName ListAllTillage
 * @apiGroup Tillage
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object All tillage types.
 */
router.get('/', function(req, res, next) {
  models.Tillage.findAll({
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
 * @api {get} api/tillage/all List deactive tillage
 * @apiName ListDeactiveTillage
 * @apiGroup Tillage
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object All tillage types.
 */
router.get('/all', function(req, res, next) {
  models.Tillage.findAll()
      .then(function (result) {
        res.send(result);
      })
      .error(function (err) {
        res.status(500).send(err);
      });
});


module.exports = router;