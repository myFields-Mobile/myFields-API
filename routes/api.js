var express = require('express');
var router = express.Router({mergeParams:true});

/*
Third party modules
*/
var azure = require('azure-storage');

/*
Our routes
*/
var authenticationRoutes = require('./Authentication/authentication');
var userRoutes = require('./Users/users');
var tillageRoutes = require('./Tillage/tillage');
var irrigationRoutes = require('./Irrigation/irrigation');
var boundaryRoutes = require('./Boundary/boundary');
var cropRoutes = require('./Crop/crop');
var fieldRoutes = require('./Field/field');
var inspectionRoutes = require('./Inspection/inspection');
var adminRoutes = require('./Admin/admin');
var appRoutes = require('./App/app');
var appdataRoutes = require('./AppData/appdata');

/**
 * API Routes
 */
router.use('/authenticate', authenticationRoutes);
router.use('/user', userRoutes);
router.use('/tillage', tillageRoutes);
router.use('/irrigation', irrigationRoutes);
router.use('/boundary', boundaryRoutes);
router.use('/crop', cropRoutes);
router.use('/field', fieldRoutes);
router.use('/inspection', inspectionRoutes);
router.use('/admin', adminRoutes);
router.use('/app', appRoutes);
router.use('/appdata', appdataRoutes);
/**
 * End API Routes
 */

/**
 * @api {get} api/ Request root of MyFields API
 * @apiName GetRoot
 * @apiGroup Authentication
 *
 * @apiSuccess {String} message A welcome message to the api.
 */
router.get('/', function(req, res, next) {
  res.send({
    message: "Welcome to the MyFields API"
  });
});

module.exports = router;
