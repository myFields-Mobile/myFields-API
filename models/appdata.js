'use strict';
module.exports = function(sequelize, DataTypes) {
    var AppData = sequelize.define('AppData', {
        username: { type: DataTypes.STRING, allowNull: false },
        jsondata: { type: DataTypes.TEXT('long'), allowNull: true },
        image: { type: DataTypes.STRING, allowNull: true },
        image: { type: DataTypes.GEOMETRY('POINT'), allowNull: true },
        active: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
        classMethods: {
            associate: function(models) {
	        AppData.belongsTo(models.App);
            }
      },
        instanceMethods: {
            toPublicJSON: function() {
            }
        }
    });

    return AppData;
};