var axios = require('axios')

module.exports.list = () => {
    return axios.get('http://localhost:3000/alunos?_sort=nome')
        .then(resp => {
            return resp.data
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getAluno = id => {
    return axios.get('http://localhost:3000/alunos/' + id)
    .then(resp => {
        return resp.data
    })
    .catch(erro => {
        return erro
    })
}


module.exports.addAluno = a => {
    return axios.post('http://localhost:3000/alunos/', a)
    .then(resp => {
        return resp.data
    })
    .catch(erro => {
        return erro
    })
}


module.exports.editAluno = a => {
    return axios.put('http://localhost:3000/alunos/' + a.id, a)
    .then(resp => {
        return resp.data
    })
    .catch(erro => {
        return erro
    })
}


module.exports.deleteAluno = id => {
    return axios.put('http://localhost:3000/alunos/' + id)
    .then(resp => {
        return resp.data
    })
    .catch(erro => {
        return erro
    })
}
