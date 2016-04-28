'use strict';
module.exports = function(sequelize, DataTypes) {
  var Inspection = sequelize.define('Inspection', {
    inspector_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null},
    accepted: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null},
    active: {type: DataTypes.BOOLEAN,  allowNull: false, defaultValue: true}
  }, {
    classMethods: {
      associate: function(models) {
        Inspection.belongsTo(models.User);
        Inspection.belongsTo(models.Field);
      }
    },
    instanceMethods: {
      toPublicJSON: function() {
        /*var resource = this.dataValues;
         delete resource.password;
         return resource;*/
      }
    }
  });
  return Inspection;
};