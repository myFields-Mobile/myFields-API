var config = require('../config/config');
var bcrypt   = require('bcrypt-nodejs');

'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    password: { type: DataTypes.STRING, allowNull: false},
    firstName: { type: DataTypes.STRING, allowNull: false},
    lastName: { type: DataTypes.STRING, allowNull: false},
    phone: { type: DataTypes.STRING, allowNull: false},
    active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    classMethods: {
      associate: function(models) {
          User.belongsToMany(models.UserType, {through: 'UserTypeRelation'});
      },
        generateHash : function(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(config.saltWorkFactor), null);
        },
    },
      instanceMethods: {
        validPassword: function (comparePassword) {
          return bcrypt.compareSync(comparePassword, this.password);
        },
        toPublicJSON: function() {
          var resource = this.dataValues;
          delete resource.password;
          return resource;
        }
      }
  });
  return User;
};