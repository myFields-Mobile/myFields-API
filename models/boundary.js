'use strict';
module.exports = function(sequelize, DataTypes) {
    var Boundary = sequelize.define('Boundary', {
      name: { type: DataTypes.STRING, allowNull: false },
      boundary: { type: "POLYGON", allowNull: false },
       // boundary: { type: "geometry", allowNull: false },
      //cutouts: {type: "MULTIPOLYGON", allowNull: true},
      active: {type: DataTypes.BOOLEAN,  allowNull: false, defaultValue: true}
    }, {
        classMethods: {
            associate: function(models) {
                Boundary.belongsTo(models.User);
            }
        },
        instanceMethods: {
        }
    });
    return Boundary;
};
