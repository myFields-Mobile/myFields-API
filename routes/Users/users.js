var express = require('express');
var models  = require('../../models');
var router = express.Router({mergeParams:true});
var mailing = require('../Mailing/mailing');
var isAuthenticated = require('../Authentication/authenticationMiddlewear').isAuthenticated;

/**
 * @api {get} api/user/me Get Current User
 * @apiName GetCurrentUser
 * @apiGroup User
 *
 * @apiHeader {String} x-access-token Valid authentication JWT.
 *
 * @apiSuccess {Object} user The user object for the associated JWT.
 */
router.get('/me', isAuthenticated, function(req, res, next) {
  // Finds user id with matching id found in decoded JWT
  models.User.findOne({
    where: {
      id: req.decoded
    },
    include: [models.UserType]
  }).then(function(user) {
    res.send(user.toPublicJSON());
  }).error(function(error) {
    res.status(500).send(error);
  });
});

/**
 * @api {post} api/user/reset-password Reset Password
 * @apiName ResetPassword
 * @apiGroup User
 *
 * @apiParam {String} originalPassword The users original password.
 * @apiParam {String} newPassword The new password.
 * @apiParam {String} repeatedNewPassword The new password repeated.
 *
 * @apiSuccess {String} message A success message.
 */
router.post('/password-reset', isAuthenticated, function(req, res, next) {
  var originalPassword = req.body.originalPassword;
  var newPassword = req.body.newPassword;
  var repeatedNewPassword = req.body.repeatedNewPassword;
  var currentUserId = req.decoded;

  if(!originalPassword || !newPassword || !repeatedNewPassword) {
    res.status(500).send('A parameter is missing');
  } else if(newPassword !== repeatedNewPassword) {
    res.status(500).send('New passwords do not match')
  } else {

    models.User.findOne({
      where: {
        id: currentUserId
      }
    }).then(function(matchingUser) {
      if(!matchingUser.validPassword(originalPassword)){
        res.status(500).send({
          "message": "Original password is incorrect"
        });
      } else {
        matchingUser.password = models.User.generateHash(newPassword);
        matchingUser.save().then(function(updatedUser) {
          res.send({
            message: 'Password has been updated successfully.'
          })
        });
      }
    }).error(function(error) {
      res.status(500).send(error);
    })
  }
});

/**
 * @api {post} api/user/create Create
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiParam {String} email The users email address.
 * @apiParam {String} password The users password.
 * @apiParam {String} firstName The users first name.
 * @apiParam {String} lastName The users last name.
 * @apiParam {String} phone The users phone number.
 *
 * @apiSuccess {Object} user The new user object.
 */
router.post('/create', function(req, res, next) {
  // Check post params for validity
  if(!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.phone) {
    res.status(500).send({ message: "Missing post parameters." })
  }
  else {
    models.User.create({
      email: req.body.email,
      password: models.User.generateHash(req.body.password),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone
    })
        .then(function(newUser) {
          if(!process.env.OPENSHIFT_NODEJS_PORT) {
            if(newUser) {
              mailing.sendMail({
                from: "myfields.test@gmail.com",
                to: newUser.firstName + " " + newUser.lastName + " <" + newUser.email + ">",
                subject: "Welcome to MyFields",
                text: "Welcome to MyFields! You have created an account with us.  You can login here: " +
                "http://inspection-locationfinder.rhcloud.com",
                html: "<p>Welcome to MyFields! You have created an account with us.  You can login here: " +
                "<a href='http://inspection-locationfinder.rhcloud.com'>http://inspection-locationfinder.rhcloud.com</a></p>"
              });
              res.send(newUser.toPublicJSON());
            }
          } else {
            res.send(newUser.toPublicJSON());
          }
        })
        .error(function(err) {
          console.log(err);
          res.status(500).send(err);
        });
  }
});



module.exports = router;