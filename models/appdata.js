'use strict';
module.exports = function(sequelize, DataTypes) {
    var Crop = sequelize.define('AppData', {
        username: { type: DataTypes.STRING, allowNull: false },
        jsondata: { type: DataTypes.TEXT, allowNull: true },
        image: { type: DataTypes.BLOB, allowNull: true },
        location: { type: DataTypes.GEOGRAPHY, allowNull: true },
        active: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
        classMethods: {
            AppData.belongsTo(models.App);
            
        },
        instanceMethods: {
            toPublicJSON: function() {
            }
        }
    });

    return AppData;
};