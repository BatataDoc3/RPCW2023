var express = require('express');
var router = express.Router();
var People = require('../controllers/people')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  People.list()
    .then(people => {
      res.render('index', { slist: people, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
    })
});

router.get('/person/:idPerson', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  People.getPerson(req.params.idPerson)
    .then(person => {
      //console.dir(person)
      res.render('person', {a: person, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
    })

})

router.get('/addPerson', function(req, res, next) {
  res.render('addPerson')

})

router.get('/deletePerson/:idPerson', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  People.getPerson(req.params.idPerson)
    .then(person => {
      //console.dir(person)
      res.render('deletePerson', {a: person, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
    })
}) 

router.get('/editPerson/:idPerson', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  People.getPerson(req.params.idPerson)
    .then(person => {
      //console.dir(person)
      res.render('updatePerson', {a: person, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
    })
})



router.post('/addPerson', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  People.addPerson(req.body)
    .then(person => {
      res.render('person', {a: person, d:data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
    })
})

router.post('/deletePerson/:idPerson', function(req, res, next) {
  People.deletePerson(req.params.idPerson)
    .then(person => {
      res.redirect('/')
    })
})

router.post('/editPerson/:idPerson', function(req, res, next) {
  People.updatePerson(req.body)
    .then(person => {
      res.redirect('/')
    })
})


module.exports = router;
