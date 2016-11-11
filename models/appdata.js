'use strict';
module.exports = function(sequelize, DataTypes) {
    var AppData = sequelize.define('AppData', {
        username: { type: DataTypes.STRING, allowNull: false },
        jsondata: { type: DataTypes.TEXT, allowNull: true },
        image: { type: DataTypes.BLOB, allowNull: true },
        location: { type: DataTypes.GEOGRAPHY, allowNull: true },
        active: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
        classMethods: {
            associate: function(models) {
	        AppData.belongsTo(models.AppModel);
            }
      },
        instanceMethods: {
            toPublicJSON: function() {
            }
        }
    });

    return AppData;
};