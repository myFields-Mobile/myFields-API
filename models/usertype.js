'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserType = sequelize.define('UserType', {
    title: DataTypes.STRING,
    active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    classMethods: {
      associate: function(models) {
        UserType.belongsToMany(models.User, {through: 'UserTypeRelation'});
      }
    },
    instanceMethods: {
      toJSON: function() {
        var resource = this.dataValues;
        delete resource.UserTypeRelation;
        return resource;
      }
    }
  });
  return UserType;
};
