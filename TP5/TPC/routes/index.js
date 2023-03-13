var express = require('express');
var router = express.Router();
var ToDo = require('../controllers/todo')



/* GET home page. */
router.get('/', function(req, res, next) {
	ToDo.getPending() 
		.then(resp => {
		  	var pendingTasks = resp
			ToDo.getDone()
				.then(done => {
					console.log(pendingTasks)
					res.render('index', {pendingTasks: pendingTasks, doneTasks: done})
				})
				.catch(erro => {
					res.render('error', {error: erro})
				})

		})
		.catch(erro => {
		  	res.render('error', {error: erro})
		})

});


router.post('/change_list/:idTask', function(req, res, next) {
	ToDo.moveTask(req.params.idTask)
		.then()
		.catch(erro => {
			res.render('error', {error: erro})
		})
})

router.post('/delete_pending/:idTask', function(req, res, next) {

	ToDo.deletePending(req.params.idTask)
		.then()
		.catch(erro => {
			res.render('error', {error: erro})
		})
})

router.post('/delete_done/:idTask', function(req, res, next) {
	ToDo.deleteDone(req.params.idTask)
		.then()
		.catch(erro => {
			res.render('error',  {error: erro})
		})
})



module.exports = router;
