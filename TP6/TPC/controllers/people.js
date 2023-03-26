var axios = require('axios')
var People = require('../models/people')
var ObjectId = require('mongodb').ObjectId; 


module.exports.list = () => {
    return People.find().sort({nome:1})
        .then(docs => {
            console.log(docs)
            return docs
        })
        .catch(error => {
            return error
        })
}

module.exports.getPerson = id => {
    console.log(id)
    return People.findOne({nome: id})
            .then(person => {
                console.dir(person.model)
                return person
            })
            .catch(error => {
                return error
            })
}

module.exports.addPerson = a => {
    console.dir(a)
    var morada = {cidade: a.cidade, distrito: a.distrito}
    var partido_politico = {party_abbr: a.party_abbr, party_name: a.party_name}
    if(!Array.isArray(a.desporto)) a.desporto = [a.desporto]
    if(!Array.isArray(a.animais)) a.animais = [a.animais]
    if(!Array.isArray(a.fppt)) a.fppt = [a.fppt]
    if(!Array.isArray(a.destinos)) a.destinos = [a.destinos]
    var atributos = {
        fumador: false,
        gosta_cinema: false,
        gosta_viajar: false,
        acorda_cedo: false,
        gosta_ler: false,
        gosta_musica: false,
        gosta_comer: false,
        gosta_animais_estimacao: false,
        gosta_dancar: false,
        comida_favorita: a.comida
    }
    if (a.fumador) atributos["fumador"] = true
    if (a.gosta_cinema) atributos["gosta_cinema"] = true
    if (a.gosta_viajar) atributos["gosta_viajar"] = true
    if (a.acorda_cedo) atributos["acorda_cedo"] = true
    if (a.gosta_ler) atributos["gosta_ler"] = true
    if (a.gosta_musica) atributos["gosta_musica"] = true
    if (a.gosta_comer) atributos["gosta_comer"] = true
    if (a.gosta_animais_estimacao) atributos["gosta_animais_estimacao"] = true
    if (a.gosta_dancar) atributos["gosta_dancar"] = true

    var pessoa = {
        nome: a.nome,
        idade: a.idade,
        sexo: a.sexo,
        morada: morada,
        cc: a.CC,
        profissao: a.profissao,
        partido_politico: partido_politico,
        religiao: a.religiao,
        desportos: a.desporto,
        animais: a.animais,
        figura_publica_pt: a.fppt,
        marca_carro: a.marca,
        destinos_favoritos: a.destinos,
        atributos: atributos
    }

    console.dir(pessoa)
    return People.create(pessoa)
            .then(student => {
                console.log("Olllla")
                return student
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updatePerson = a => {
    return People.updateOne({nome: a.nome}, a)
            .then(student => {
                return student
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deletePerson = id => {
    return People.deleteOne({nome: id})
            .then(person => {
                return person
            })
            .catch(erro => {
                return erro
            })
}