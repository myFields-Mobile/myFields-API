var express = require('express');
var models  = require('../../models');
var router = express.Router({mergeParams:true});
var isAuthenticated = require('../Authentication/authenticationMiddlewear').isAuthenticated;
var isTypes = require('../Authentication/authenticationMiddlewear').isTypes;

/**
 * @api {post} api/field/create Create
 * @apiName CreateField
 * @apiGroup Field
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiParam {String} name The name of the new field type.
 * @apiParam {String} boundary_id The ID of the associated boundary.
 * @apiParam {String} irrigation_id The ID of the associated irrigation.
 * @apiParam {String} tillage_id The ID of the associated tillage.
 * @apiParam {String} crop_id The ID of the associated crop.
 *
 * @apiSuccess {Object} field The newly created field.
 */
router.post('/create',isAuthenticated,isTypes(['Farmer']), function(req, res, next) {
    if(!req.body.name ||
        !req.body.BoundaryId ||
        !req.body.IrrigationId ||
        !req.body.TillageId ||
        !req.body.CropId) {
        res.status(400).send({ message: "Missing post parameters." })
    }
    else {
        models.Field.create({
            name: req.body.name,
            BoundaryId: req.body.BoundaryId,
            IrrigationId: req.body.IrrigationId,
            TillageId: req.body.TillageId,
            CropId: req.body.CropId,
            UserId: req.decoded
        })
            .then(function(result) {
                res.send(result);
            })
            .error(function(err) {
                res.status(500).send(err);
            });
    }
});

/**
 * @api {get} api/field/{id}/activate Activate
 * @apiName ActivateField
 * @apiGroup Field
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {string} message Field successfully activated.
 */
router.get('/:id/activate', isAuthenticated, function(req, res, next) {
    models.Field.find({
        where: {
            UserID: req.decoded,
            id: req.params.id
        }
    }).then(function(matchingField) {
        matchingField.updateAttributes({
            active: true
        })
            .then(function(updatedField) {
                res.send(updatedField);
            })
            .error(function(err) {
                req.status(500).send(err);
            });
    }).error(function(err) {
        req.status(500).send(err);
    });
});

/**
 * @api {get} api/field/{id}/deactivate Deactivate
 * @apiName DeactiveField
 * @apiGroup Field
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {string} message Field successfully deactivated.
 */
router.get('/:id/deactivate', isAuthenticated, function(req, res, next) {
    models.Field.find({
        where: {
            UserID: req.decoded,
            id: req.params.id
        }
    }).then(function(matchingField) {
        matchingField.updateAttributes({
            active: false
        })
        .then(function(updatedField) {
            res.send(updatedField);
        })
        .error(function(err) {
            req.status(500).send(err);
        });
    }).error(function(err) {
        req.status(500).send(err);
    });
});

/**
 * @api {get} api/field/me List current user fields
 * @apiName ListFields
 * @apiGroup Field
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object All activate and deactive fields associated with the current user.
 */

router.get('/me', isAuthenticated,isTypes(["Farmer"]), function(req, res, next) {
    models.Field.findAll({
      where: {
        UserID: req.decoded,
        active:true
      },
      include: [models.Boundary],
      order: 'id DESC'
    })
    .then(function (result) {
      res.send(result);
    })
    .error(function (err) {
      res.status(500).send(err);
    });
});

/**
 * @api {get} api/field List
 * @apiName ListAllActiveFields
 * @apiGroup Field
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object Returns all active fields.
 */
router.get('/', isAuthenticated, isTypes(["Farmer"]), function(req, res, next) {
    models.Field.findAll({
        where: {
            UserID: req.decoded,
            active:true
        },
        include: [models.Boundary],
        order: 'id DESC'
    })
        .then(function (result) {
            res.send(result);
        })
        .error(function (err) {
            res.status(500).send(err);
        });

});

/**
 * @api {get} api/field/admin List
 * @apiName ListAllActiveFields
 * @apiGroup Field
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object Returns all active fields.
 */
router.get('/admin', isAuthenticated, isTypes(["Admin"]), function(req, res, next) {
    models.Field.findAll({
        where: {
            active:true
        },
        include: [models.Boundary],
        order: 'id DESC'
    })
        .then(function (result) {
            res.send(result);
        })
        .error(function (err) {
            res.status(500).send(err);
        });
});

/**
 * @api {get} api/field/all ListAll
 * @apiName ListAllField
 * @apiGroup Field
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object Returns all active and deactive fields.
 */
router.get('/all', isAuthenticated, function(req, res, next) {
    models.Field.findAll({
        where: {
            UserID: req.decoded
        },
        order: 'id DESC'
    })
        .then(function (result) {
            res.send(result);
        })
        .error(function (err) {
            res.status(500).send(err);
        });

});

module.exports = router;