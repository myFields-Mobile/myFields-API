var express = require('express');
var models  = require('../../models');
var router = express.Router({mergeParams:true});
var isAuthenticated = require('../Authentication/authenticationMiddlewear').isAuthenticated;
var isTypes = require('../Authentication/authenticationMiddlewear').isTypes;


/**
 * @api {post} api/boundary/create Create
 * @apiName CreateBoundary
 * @apiGroup Boundary
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiParam {String} name The name of the new boundary.
 * @apiParam {Object[]} points The boundary points of the new boundary.
 *
 * @apiSuccess {Object} field The newly created boundary.
 */

router.post('/create', isAuthenticated, isTypes(['Farmer']), function(req, res, next) {
    if(!req.body.name || req.body.name.length == 0 || !req.body.points || req.body.points.length < 3) {
        res.status(500).send({ message: "Missing post parameters." });
    } else {
        var queryString;
        //if doesn't have cutouts
        if(!req.body.cutoutPoints || req.body.cutoutPoints.length == 0) {
            var queryString = "INSERT INTO Boundaries (name, boundary, createdAt, updatedAt, UserId)"
                + "VALUES ('" + req.body.name + "', "
                + "PolyFromText('POLYGON(" + CreatePolygonText(req.body.points) + ")'),"
                + "now(), now(), " + req.decoded + ")";
        }
        else
        {
            var cutouts = req.body.cutoutPoints.map(function(cutout){
                return CreatePolygonText(cutout);
            }).join(",")

            queryString = "INSERT INTO Boundaries (name, boundary, createdAt, updatedAt, UserId)"
                + "VALUES ('" + req.body.name + "', "
                +"PolyFromText('POLYGON (" + CreatePolygonText(req.body.points) +","
                + cutouts+ ")')"
                +", now(), now(), " + req.decoded + ")";

        }
        models.sequelize.query(queryString).then(function(myTableRows) {
          res.send("done");
        });
    }
});

function CreatePolygonText(points) {
  var outputText = "(";

  for(var x = 0; x < points.length; x++) {
    if(x != 0)
      outputText += ","

    outputText += points[x][0] + " " + points[x][1];
  }

  outputText += "," + points[0][0] + " " + points[0][1]+")";
  return outputText;
}

/**
 * @api {get} api/boundary/ List
 * @apiName ListBoundary
 * @apiGroup Boundary
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object All active boundaries.
 */
router.get('/', isAuthenticated,isTypes(['Farmer']), function(req, res, next) {
    models.Boundary.findAll({
        where: {
            active: true,
            UserId: req.decoded
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


/**
 * @api {get} api/boundary/all ListAll
 * @apiName ListAllBoundary
 * @apiGroup Boundary
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {array} object All boundaries.
 */
router.get('/all', isAuthenticated,isTypes(['Farmer']), function(req, res, next) {
    models.Boundary.findAll({
        where: {
            UserId: req.decoded
        },
        order: 'id DESC'
    })
        .then(function (result) {
            //console.log.writeln(result);
            res.send(result);
        })
        .error(function (err) {
            res.status(500).send(err);
        });
});

/**
 * @api {post} api/boundary/{id}/update Update
 * @apiName UpdateBoundary
 * @apiGroup Boundary
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 * @apiParam{boolean} active Aconsole.log("get");ctive state of boundary.
 *
 * @apiSuccess {object} object Tillage type with provided id.
 */
router.post('/:id(\\d+)/update', isAuthenticated,isTypes(['Farmer']), function(req, res, next) {

  if(typeof req.body.active != 'undefined') {
      req.decodedTypes.forEach(function(currentType) {
          models.Boundary.find({
              where: {
                  UserId: req.decoded,
                  id: req.params.id
              }
          }).then(function(boundary) {
              if(!boundary) {
                  res.status(500).send({message: "No matching boundary found"});
              } else {
                  boundary.active = req.body.active;
                  boundary.save().then(function(newBoundary) {
                      res.send(newBoundary);
                  });
              }
          });
      })

  } else {
    res.status(500).send({message: "Missing post parameters"});
  }
});

module.exports = router;