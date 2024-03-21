'use strict';

//const fs = require('fs');
//const path = require('path');
const process = require('process');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'prod';
//const basename = path.basename(__filename);

const config = require('../config/config')[env];
const db = {};
const sequelize = new Sequelize(config.database,config.username,config.password,config);

//모델 import
const User = require('./user');
const Comment = require('./comment.js');

//시퀄라이즈 인스턴스
db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);
 
// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });


module.exports = db;
