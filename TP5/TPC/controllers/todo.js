var axios = require('axios')

module.exports.getPending = () => {
    return axios.get('http://localhost:3000/pending_tasks')
        .then(resp => {
            return resp.data
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getDone = () => {
    return axios.get('http://localhost:3000/done_tasks')
        .then(resp => {
            return resp.data
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deletePending = id => {
    return axios.delete('http://localhost:3000/pending_tasks/' + id)
        .then(resp => {
            return resp.data
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deleteDone = id => {
    return axios.delete('http://localhost:3000/done_tasks/' + id)
        .then(resp => {
            return resp.data
        })
        .catch(erro => {
            return erro
        })
}

module.exports.editTask = t => {
    return axios.put('http://localhost:3000/pending_tasks/' + t.id, t)
        .then(resp => {
            return resp.data
        })
        .catch(erro => {
            return erro
        })
}

module.exports.moveTask = id => {
    return axios.get('http://localhost:3000/pending_tasks/' + id)
        .then(resp => {
            var t = resp.data
            console.dir(resp.data)
            axios.get('http://localhost:3000/done_tasks')
                .then(response => {
                    var dt = response.data
                    var lastId = dt[dt.length - 1].id
                    var newId =  lastId + 1
                    t.id = newId
                    axios.post('http://localhost:3000/done_tasks', t)
                    .then(response => {
                        axios.delete('http://localhost:3000/pending_tasks/' + id)
                            .then(final => {
                                return final
                            })
                            .catch(error => {
                                return error
                            })
                    })
                    .catch(error => {
                        return error
                    })
                })
                .catch(error => {
                    return error
                })

        })
        .catch(error => {
            return error
        })
}