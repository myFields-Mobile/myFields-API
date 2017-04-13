var express = require('express');
var models  = require('../../models');
var router = express.Router({mergeParams:true});
var isAuthenticated = require('../Authentication/authenticationMiddlewear').isAuthenticated;
var isTypes = require('../Authentication/authenticationMiddlewear').isTypes;

/**
 * @api {post} api/inspection/create Create
 * @apiName CreateInspection
 * @apiGroup Inspection
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @spiParam {Integer} fieldId The ID of the field being inspected
 *
 * @apiSuccess {Object} field The newly created inspection.
 */
router.post('/create', isAuthenticated, function(req, res, next) {

  if(!req.body.FieldId) {
    res.status(500).send({ message: "Missing post parameters." })
  }
  else {
    models.Inspection.create({
          FieldId: req.body.FieldId,
          UserId: req.decoded,
          Active: true
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
 * @api {get} api/inspection/{id}/activate Activate
 * @apiName ActivateInspection
 * @apiGroup Inspection
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {string} message Inspection successfully activated.
 */
router.get('/:id/activate', isAuthenticated, function(req, res, next) {
  models.Inspection.find({
    where: {
      id: req.params.id
    }
  }).then(function(matchingInspection) {
    matchingInspection.updateAttributes({
          active: true
        })
        .then(function(updatedInspection) {
          res.send(updatedInspection);
        })
        .error(function(err) {
          req.status(500).send(err);
        });
  }).error(function(err) {
    req.status(500).send(err);
  });
});
/**
 * @api {get} api/inspection/{id}/deactivate Deactivate
 * @apiName DeactivateInspection
 * @apiGroup Inspection
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {string} message Inspection successfully deactivated.
 */
router.get('/:id/deactivate', isAuthenticated, function(req, res, next) {
  models.Inspection.find({
    where: {
      id: req.params.id
    }
  }).then(function(matchingInspection) {
    matchingInspection.updateAttributes({
          active: false
        })
        .then(function(updatedInspection) {
          res.send(updatedInspection);
        })
        .error(function(err) {
          req.status(500).send(err);
        });
  }).error(function(err) {
    req.status(500).send(err);
  });
});

/**
 * @api {get} api/inspection/{id}/accept Accept
 * @apiName AcceptInspection
 * @apiGroup Inspection
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {string} message Inspection successfully accepted.
 */
router.get('/:id/accept', isAuthenticated,isTypes(['Admin']), function(req, res, next) {
  models.Inspection.find({
    where: {
      id: req.params.id
    }
  }).then(function(matchingInspection) {
    matchingInspection.updateAttributes({
          accepted: true
        })
        .then(function(updatedInspection) {
          res.send(updatedInspection);
        })
        .error(function(err) {
          req.status(500).send(err);
        });
  }).error(function(err) {
    req.status(500).send(err);
  });
});
/**
 * @api {get} api/inspection/{id}/decline Decline
 * @apiName DeclineInspection
 * @apiGroup Inspection
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {string} message Inspection successfully declined.
 */
router.get('/:id/decline', isAuthenticated,isTypes(['Admin']), function(req, res, next) {
  models.Inspection.find({
    where: {
      id: req.params.id
    }
  }).then(function(matchingInspection) {
    matchingInspection.updateAttributes({
          accepted: false
        })
        .then(function(updatedInspection) {
          res.send(updatedInspection);
        })
        .error(function(err) {
          req.status(500).send(err);
        });
  }).error(function(err) {
    req.status(500).send(err);
  });
});

/**
 * @api {get} api/inspection/{id}/assign Assign
 * @apiName UpdateInspection
 * @apiGroup Inspection
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiPermission Admin
 * @apiParam {String} inspector_id The id of the inspector being assigned.
 *
 * @apiSuccess {object} object Updated inspection type object.
 */
router.post('/:id/assign', isAuthenticated, isTypes(['Admin']),function(req, res, next) {
  if(!req.body.inspector_id && req.body.inspector_id.length == 0) {
    res.status(500).send({ message: "Missing post parameters." });
  } else
      models.User.findOne({
          where:{
              id: req.body.inspector_id
          }
      }).then(function(matchingInspector) {
              if (typeof matchingInspector !== 'undefined' && matchingInspector) {
                  matchingInspector.getUserTypes({
                      where:{
                          title: "Inspector"
                      }
                  }).then(function (matchingUserType){
                      if(typeof matchingUserType !== 'undefined' && !isEmpty(matchingUserType)){
                          models.Inspection.findOne({
                              where: {
                                  id: req.params.id
                              }
                          })
                              .then(function (matchingInspection) {
                                  if (typeof matchingInspection !== 'undefined' && matchingInspection) {
                                      matchingInspection.updateAttributes({inspector_id: req.body.inspector_id})
                                          .then(function (updatedInspection) {
                                              res.send(updatedInspection);
                                          })
                                          .error(function (err) {
                                              res.status(500).send(err);
                                          });
                                  } else {
                                      res.status(500).send({message: "No inspection found with the provided id"});
                                  }
                              })
                              .error(function (err) {
                                  res.status(500).send(err);
                              });
                      } else {
                          res.status(500).send({message: "User is not an inspector"});
                      }
                  })
              } else {
                  res.status(500).send({message: "No inspector found with the provided id"});
              }
        })
        .error(function(err) {
            res.status(500).send(err);
        });
});

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

/**
 * @api {get} api/inspection List all active inspections
 * @apiName ListInspection
 * @apiGroup Inspection
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object inspection types.
 */
router.get('/', isAuthenticated,isTypes(['Inspector']), function(req, res, next) {
    models.Inspection.findAll({
        where: {
            active:true,
            inspector_id: req.decoded
        },
        include: [{ all: true, nested: true }]
    })
        .then(function (result) {
            res.send(result);
        })
        .error(function (err) {
            res.status(500).send(err);
        });
});

/**
 * @api {get} api/inspection/me List all assigned inspections for the user
 * @apiName ListAllInspection
 * @apiGroup Inspection
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object inspection types.
 */
router.get('/me', isAuthenticated, function(req, res, next) {
    console.log(req.decoded);
    models.Inspection.findAll({
        where: {
            inspector_id: req.decoded
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
 * @api {get} api/inspection/requested List all active inspections requested by the user
 * @apiName ListInspection
 * @apiGroup Inspection
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object inspection types.
 */
router.get('/requested', isAuthenticated, isTypes(['farmer']), function(req, res, next) {
  models.Inspection.findAll({
        where: {
            UserID: req.decoded,
            active:true
        },
        include: [models.Field, models.User]
      })
      .then(function (result) {
        res.send(result);
      })
      .error(function (err) {
        res.status(500).send(err);
      });
});

/**
 * @api {get} api/inspection/requested/all List all assigned inspections requested by the user
 * @apiName ListAllInspection
 * @apiGroup Inspection
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object inspection types.
 */
router.get('/requested/all', isAuthenticated, isTypes(['farmer']), function(req, res, next) {
  console.log(req.decoded);
  models.Inspection.findAll({
        where: {
            UserID: req.decoded
        },
        include: [models.Field, models.User]
      })
      .then(function (result) {
        res.send(result);
      })
      .error(function (err) {
        res.status(500).send(err);
      });
});

/**
 * @api {get} api/inspection/all List all inspections
 * @apiName ListAllUsersInspection
 * @apiGroup Inspection
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object All inspection types.
 */
router.get('/all',isAuthenticated, isTypes(['Admin']), function(req, res, next) {
  models.Inspection.findAll({
      include: [{ all: true, nested: true }]
  })
      .then(function (result) {
        res.send(result);
      })
      .error(function (err) {
        res.status(500).send(err);
      });
});

module.exports = router;
