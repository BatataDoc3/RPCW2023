var axios = require('axios')
var Student = require('../models/aluno')

// Student list
module.exports.list = () => {
    return Student.find().sort({nome:1})
        .then(docs => {
            return docs
        })
        .catch(error => {
            return error
        })
}

module.exports.getAluno = id => {
    return Student.findOne({id: id})
            .then(student => {
                return student
            })
            .catch(error => {
                return error
            })
}

module.exports.addAluno = a => {
    return Student.create(a)
            .then(student => {
                return student
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateAluno = a => {
    return Student.updateOne({id: a.id}, a)
            .then(student => {
                return student
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteAluno = id => {
    return Student.deleteOne({id: id})
            .then(student => {
                return student
            })
            .catch(erro => {
                return erro
            })
}