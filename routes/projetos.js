var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const projetos = [
    {
      name: 'Portfolio',
      desc: 'Repositório com o código do Portfólio atual',
      link: 'https://github.com/Caio-Almeida4/Portfolio---AtvFatec'
    },
    {
      name: 'Newe',
      desc: 'API com objetivo passado pela empresa Newe',
      link: 'https://github.com/PatoJosefo/API-Synch'
    },
    {
      name: 'Análise de dados para jornalistas',
      desc: 'API com objetivo de reunir dados sobre COVID-19 para jornalistas',
      link: 'https://github.com/Equipe-CodeLand/API-2023.1'
    }
  ];
  res.render('projetos', { projetos });
});

module.exports = router;
