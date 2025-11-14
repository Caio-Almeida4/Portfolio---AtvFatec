var express = require('express');
var path = require('path');
var indexRouter = require('./routes/index');
var contatoRouter = require('./routes/contato');
var dashboardRouter = require('./routes/dashboard');
var disciplinasRouter = require('./routes/disciplinas');
var projetosRouter = require('./routes/projetos');
var sobreRouter = require('./routes/sobre');

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
app.use('/dashboard', dashboardRouter)
app.use('/disciplinas', disciplinasRouter)
app.use('/projetos', projetosRouter)



app.listen(3000, err =>{
  if (err) throw err
})