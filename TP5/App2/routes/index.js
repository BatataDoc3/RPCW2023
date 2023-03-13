var express = require('express');
const { response } = require('../app');
var router = express.Router();
var Aluno = require('../controllers/aluno')

/* GET home page. */
router.get('/', function(req, res, next) {
  	var data = new Date().toISOString().substring(0,16)
  	Aluno.list()
		.then(alunos => {
			res.render('index', {slist: alunos, d: data})
		})
		.catch(erro => {
			res.render('error', {error: erro})
		})
});

//form to add student
router.get('/alunos/registo', function(req, res, next) {
	var data = new Date().toISOString().substring(0,16)
	res.render('addAlunoForm', {d: data})
})

//Student page
router.get('/alunos/:idAluno', function(req, res, next) {
	var data = new Date().toISOString().substring(0,16)
	Aluno.getAluno(req.params.idAluno)
	  .then(aluno => {
		  res.render('aluno', {a: aluno, d: data})
	  })
	  .catch(erro => {
		  res.render('error', {error: erro})
	  })

});

//Student update page
router.get('/alunos/edit/:idAluno', function(req, res, next) {
	var data = new Date().toISOString().substring(0,16)
	Aluno.getAluno(req.params.idAluno)
	  .then(aluno => {
		  res.render('editAlunoForm', {a: aluno, d: data})
	  })
	  .catch(erro => {
		  res.render('error', {error: erro})
	  })

});

//Student delete page
router.get('/alunos/delete/:idAluno', function(req, res, next) {
	var data = new Date().toISOString().substring(0,16)
	Aluno.deleteAluno(req.params.idAluno)
	  .then(aluno => {
		  res.render('deletedAluno', {id: req.params.idAluno, d: data})
	  })
	  .catch(erro => {
		  res.render('error', {error: erro})
	  })

});


/*POST Add Student Form Data */
router.post('/alunos/registo', function(req, res) {
	var data = new Date().toISOString().substring(0,16)
	Aluno.addAluno(req.body)
		.then(aluno => {
			res.render('confirmAddAluno', {a: aluno, d: data})
		})
		.catch(erro => {
			res.render('error', {error: erro})
		})
})


//edit aluno
router.post('/alunos/edit/:idAluno', function(req, res) {
	var data = new Date().toISOString().substring(0,16)
	Aluno.editAluno(req.body)
		.then(aluno => {
			res.render('confirmUpdateAluno', {a: aluno, d: data})
		})
		.catch(erro => {
			res.render('error', {error: erro})
		})
})

module.exports = router;
