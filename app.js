var express = require('express');
var path = require('path');
var indexRouter = require('./routes/index');
var contatoRouter = require('./routes/contato');
var disciplinasRouter = require('./routes/disciplinas');
var projetosRouter = require('./routes/projetos');
var sobreRouter = require('./routes/sobre');
const { Sequelize } = require('sequelize');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/sobre', sobreRouter)
app.use('/contato', contatoRouter)
app.use('/disciplinas', disciplinasRouter)
app.use('/projetos', projetosRouter)

const PORT = 3000;

const dbConfig = require('./config/dbConfig');
const DB_NAME = dbConfig.DB_NAME;
const DB_USER = dbConfig.DB_USER;
const DB_PASS = dbConfig.DB_PASS;
const DB_HOST = dbConfig.DB_HOST;
const DB_DIALECT = dbConfig.DIALECT;

async function ensureDatabaseExists() {
  const tmp = new Sequelize('mysql', DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_DIALECT || 'mysql',
    logging: false,
  });

  try {
    await tmp.authenticate();

    await tmp.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`Criando banco de dados'${DB_NAME}' .`);
  } finally {
    await tmp.close();
  }
}

async function start() {
  try {
    await ensureDatabaseExists();

    const db = require('./models');

    await db.sequelize.authenticate();
    console.log('Banco conectado!');

    await db.sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Rodando em: ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
}

start();