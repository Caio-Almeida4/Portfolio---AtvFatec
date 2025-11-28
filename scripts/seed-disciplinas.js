const { Sequelize } = require('sequelize');
const dbConfig = require('../config/dbConfig');

(async () => {
  // Ensure database exists (connect to default 'mysql' db)
  const tmp = new Sequelize('mysql', dbConfig.DB_USER, dbConfig.DB_PASS, {
    host: dbConfig.DB_HOST,
    dialect: dbConfig.DIALECT || 'mysql',
    logging: false,
  });

  try {
    await tmp.authenticate();
    await tmp.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`Ensured database '${dbConfig.DB_NAME}' exists.`);
  } catch (err) {
    console.error('Error ensuring database exists:', err.message || err);
    await tmp.close();
    process.exit(1);
  }
  await tmp.close();

  // Now load models and seed
  const db = require('../models');
  try {
    await db.sequelize.authenticate();
    console.log('DB connected');

    // ensure tables exist (safe for dev)
    await db.sequelize.sync();

    const itens = [
      { nome: 'Algoritmos e Lógica de Programação', Situacao: 'Concluída' },
      { nome: 'Matemática', Situacao: 'Pendente' },
      { nome: 'Estruturas de Dados', Situacao: 'Pendente' },
      { nome: 'Banco de Dados', Situacao: 'Concluída' },
      { nome: 'Engenharia de Software', Situacao: 'Concluída' },
    ];

    await db.Disciplinas.bulkCreate(itens, { ignoreDuplicates: true });
    console.log('Seeded disciplinas:', itens.length);
  } catch (err) {
    console.error('Seeding error:', err.message || err);
  } finally {
    await db.sequelize.close();
  }
})();
