'use strict';
module.exports = function(sequelize, DataTypes) {
    var AppModel = sequelize.define('AppModel', {
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        active: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
        classMethods: {
        },
        instanceMethods: {
            toPublicJSON: function() {
            }
        }
    });

    return AppModel;
};