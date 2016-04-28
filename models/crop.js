'use strict';
module.exports = function(sequelize, DataTypes) {
    var Crop = sequelize.define('Crop', {
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

    return Crop;
};