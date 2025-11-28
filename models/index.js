const sequelize = require('../config/database');
const Sequelize = require('sequelize');

const Disciplinas = require('./disciplinas');

const db = {
  sequelize,
  Sequelize,
  Disciplinas,
};

module.exports = db;
