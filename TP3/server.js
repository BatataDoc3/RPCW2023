var http = require('http')
var url = require('url')
var axios = require('axios')
var mypages = require('./mypages')
var fs = require('fs')

http.createServer(function(req, res){
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    
    var dicURL = url.parse(req.url, true)

    if(dicURL.pathname == "/"){
        if(req.url == "/"){
            axios.get("http://localhost:3000/pessoas")
                .then( function(resp){
                    var pessoas = resp.data
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(mypages.pessoasPage(pessoas))
                })
                .catch( erro => {
                    console.log("Erro axios: " + erro)
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end("ERRO axios: " + erro)
                })
        }
        else {
            let ref = req.url.replaceAll(' ', '%20')
            axios.get(`http://localhost:3000/pessoas${req.url}`)
                .then(function(resp){
                    var pessoa = resp.data
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(mypages.personInfo(pessoa))
                })
                .catch( erro => {
                    console.log("Erro axios: " + erro)
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end("ERRO axios: " + erro)
                })
        }
    }

    else if(dicURL.pathname == "/w3.css" || dicURL.pathname == "/sexo/w3.css" || dicURL.pathname == "/desportos/w3.css" || dicURL.pathname == "/profissoes/w3.css"){
        fs.readFile('w3.css', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            if(err){
                console.log("Erro na leitura da stylesheet.")
                res.write("Erro: " + err)
            }
            else
                res.write(data)
            res.end()
        })
    }


    else if(dicURL.pathname == "/sexo"){
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
        res.end(mypages.sexo())
    }
    
    else if(dicURL.pathname == "/sexo/masculino"){
        axios.get("http://localhost:3000/pessoas?sexo=masculino")
        .then( function(resp){
            var pessoas = resp.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.sexoList(pessoas))
        })
        .catch( erro => {
            console.log("Erro axios: " + erro)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end("ERRO axios: " + erro)
        })
    }

    else if(dicURL.pathname == "/sexo/feminino"){
        axios.get("http://localhost:3000/pessoas?sexo=feminino")
        .then( function(resp){
            var pessoas = resp.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.sexoList(pessoas))
        })
        .catch( erro => {
            console.log("Erro axios: " + erro)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end("ERRO axios: " + erro)
        })
    }

    else if(dicURL.pathname == "/sexo/outro"){
        axios.get("http://localhost:3000/pessoas?sexo=outro")
        .then( function(resp){
            var pessoas = resp.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.sexoList(pessoas))
        })
        .catch( erro => {
            console.log("Erro axios: " + erro)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end("ERRO axios: " + erro)
        })
    }

    else if(dicURL.pathname == "/desportos"){
        axios.get(`http://localhost:3000/pessoas`)
        .then( function(resp){
            var pessoas = resp.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            sports = mypages.getSports(pessoas)
            res.end(mypages.sports(sports))
        })
        .catch( erro => {
            console.log("Erro axios: " + erro)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end("ERRO axios: " + erro)
        })
    }

    else if(dicURL.pathname.startsWith("/desportos")){
        axios.get(`http://localhost:3000/pessoas?q=${dicURL.pathname.substring(11)}`)
        .then( function(resp){
            var pessoas = resp.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.pessoasPage(pessoas))
        })
        .catch( erro => {
            console.log("Erro axios: " + erro)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end("ERRO axios: " + erro)
        })
    }

    else if(dicURL.pathname == ("/profissoes")) {
        axios.get(`http://localhost:3000/pessoas`)
        .then( function(resp){
            var pessoas = resp.data
            top10 = mypages.top10(pessoas)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.profissoes(top10))
        })
        .catch( erro => {
            console.log("Erro axios: " + erro)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end("ERRO axios: " + erro)
        })
    }

    else if(dicURL.pathname.startsWith("/profissoes")) {
        axios.get(`http://localhost:3000/pessoas?q=${dicURL.pathname.substring(12)}`)
        .then( function(resp){
            var pessoas = resp.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.pessoasPage(pessoas))
        })
        .catch( erro => {
            console.log("Erro axios: " + erro)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end("ERRO axios: " + erro)
        })
    }
    
    else if(dicURL.pathname == "/ordenada" ){
        axios.get("http://localhost:3000/pessoas?_sort=nome&order=asc")
            .then( function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            })
    }
    else if(dicURL.pathname == "/ordenadav2" ){
        axios.get("http://localhost:3000/pessoas")
            .then( function(resp){
                var pessoas = resp.data
                let pessoasOrdenadas = pessoas.sort(
                    (p1, p2) => (p1.nome < p2.nome) ? -1 : 1
                    // function(p1,p2){ return (p1.nome < p2.nome) ? -1 : 1 }
                )
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoasOrdenadas))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            })
    }
    
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end("Erro: Operação não suportada")
    }
}).listen(7777)

console.log("Servidor à escuta na porta 7777...")