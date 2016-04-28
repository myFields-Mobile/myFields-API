'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};


if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  if(process.env.OPENSHIFT_MYSQL_DB_HOST){
    config.host = process.env.OPENSHIFT_MYSQL_DB_HOST;
    config.port = process.env.OPENSHIFT_MYSQL_DB_PORT;
    config.username = process.env.OPENSHIFT_MYSQL_DB_USERNAME;
    config.password = process.env.OPENSHIFT_MYSQL_DB_PASSWORD;

    var sequelize = new Sequelize(config.database, config.username, config.password, config);
  } else if (process.argv.indexOf('test') != -1){
    config = require(__dirname + '/../config/config.json')['test'];
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
  } else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    if (file.slice(-3) !== '.js') return;
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
