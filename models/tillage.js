'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tillage = sequelize.define('Tillage', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    classMethods: {
    },
    instanceMethods: {
      toPublicJSON: function() {
        /*var resource = this.dataValues;
         delete resource.password;
         return resource;*/
      }
    }
  });

  return Tillage;
};