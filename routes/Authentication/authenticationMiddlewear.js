var jwt    = require('jsonwebtoken');
var config = require('../../config/config');

/**
 * Authentication MiddleWear for Express
 */
var isAuthenticated = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status(500).send({message: "Failed to authenticate token"});
      } else {
        req.decoded = decoded.id;
        req.decodedTypes = decoded.types;
        next();
      }
    });
  } else {
    return res.status(403).send({
      message: 'No token provided.'
    });
  }
};


/**
 * IsAdmin
 */
var isTypes = function(requiredTypes) {
  return function(req, res, next) {
    if(!requiredTypes || requiredTypes.count == 0) {
      next();
    } else {
      var currentUserTypes = req.decodedTypes;
      var isValidUser = true;
      var isInUser = false;

      requiredTypes.forEach(function(requiredType) {
        currentUserTypes.forEach(function(currentType) {
          if(requiredType.toLowerCase() == currentType.toLowerCase()) {
            isInUser = true;
          }
        });
      });
      if(!isInUser) {
        isValidUser = false;
      }
      if(!isValidUser) {
        return res.status(403).send({
          message: 'You do not have the correct permissions for this operation.',
          requiredPermissions: requiredTypes
        });
      } else {
        next();
      }
    }
  }
};

module.exports = {
  isAuthenticated: isAuthenticated,
  isTypes: isTypes
};