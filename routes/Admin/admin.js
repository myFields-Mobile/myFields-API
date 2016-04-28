/**
 * Created by gannonhuiting on 2/2/16.
 */
var express = require('express');
var models  = require('../../models');
var router = express.Router({mergeParams:true});
var isAuthenticated = require('../Authentication/authenticationMiddlewear').isAuthenticated;
var isTypes = require('../Authentication/authenticationMiddlewear').isTypes;

/**
 * Gets all the users.
 */
router.get('/users', isAuthenticated, isTypes(['Admin']), function(req, res, next) {
    models.User.findAll({
            where: {
                active: true,
            },
            order: 'id DESC',
            include: [models.UserType]
        })
        .then(function (result) {
            res.send(result);
        })
        .error(function (err) {
            res.status(500).send(err);
        });
});

/**
 * Gets all the types
 */
router.get('/types', function(req, res, next) {
    models.UserType.findAll({
            where: {
                active: true,
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
 * adds a type to the user
 */

router.post('/:id/add', isAuthenticated, isTypes(['Admin']), function(req,res,next) {
    if(req.body.title === 'undefined')
    {
        res.status(500).send({message: "No title was given to remove."});
    }
    else {
        models.User.findOne(
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(function (user) {
                    if (typeof user !== 'undefined' && user) {
                        models.UserType.findOne(
                            {
                                where: {
                                    title: req.body.title
                                }
                            }).then(function (userType){

                                // add to user association
                                user.addUserType(userType).then(function (newUser) {
                                    //made it!
                                    res.send(200).send(newUser);
                                }).error(function (err) {
                                    res.status(500).send(err);
                                });
                            });

                }
                else {
                    res.status(500).send({message: "No user found with provided id."});
                }
            });
    }
});


/**
 * removes a type from a user
 */

router.post('/:id/remove', isAuthenticated, isTypes(['Admin']),function(req, res, next) {
    if(req.body.title === 'undefined')
    {
        res.status(500).send({message: "No title was given to remove."});
    }
    else {
        models.User.findOne(
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(function (user) {
                if (typeof user !== 'undefined' && user) {
                    models.UserType.findOne(
                        {
                            where: {
                                title: req.body.title
                            }
                        }).then(function (userType) {

                            // add to user association
                            user.removeUserType(userType).then(function (newUser) {
                                //made it!
                                res.send(200).send(newUser);
                            }).error(function (err) {
                                res.status(500).send(err);
                            });
                        });
                }
                else {
                    res.status(500).send({message: "No user found with provided id."});
                }
            });
    }
});


module.exports = router;
