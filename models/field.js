'use strict';
module.exports = function(sequelize, DataTypes) {
    var Field = sequelize.define('Field', {
    name: { type: DataTypes.STRING, allowNull: false },
    active: {type: DataTypes.BOOLEAN,  allowNull: false, defaultValue: true}
  }, {
    classMethods: {
      associate: function(models) {
	      Field.belongsTo(models.User);
          Field.belongsTo(models.Boundary);
          Field.belongsTo(models.Irrigation);
          Field.belongsTo(models.Tillage);
          Field.belongsTo(models.Crop);
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
  return Field;
};
