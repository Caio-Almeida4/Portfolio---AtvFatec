const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Disciplinas extends Model {}

Disciplinas.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Situacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize, modelName: 'Disciplinas' });


module.exports = Disciplinas;
