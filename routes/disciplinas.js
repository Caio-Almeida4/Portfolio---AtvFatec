var express = require('express');
var router = express.Router();
const { Disciplinas } = require('../models');

router.get('/', async function(req, res, next) {
  try {
    const list = await Disciplinas.findAll({ order: [['nome', 'ASC']] });
    res.render('disciplinas', { disciplinas: list });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
