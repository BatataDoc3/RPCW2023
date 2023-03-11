// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require('http')
var axios = require('axios')
var aux = require('./aux')
var static = require('./static.js')

const { parse } = require('querystring');

// Server creation

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


var toDoList = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    console.log(req.method + " " + req.url + " ")

    // Handling request

    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                axios.all([
                    axios.get("http://localhost:3000/pending_tasks"),
                    axios.get("http://localhost:3000/done_tasks")
                ]).then(axios.spread((resp1, resp2) =>{
                    var pending_tasks =  resp1.data
                    var done_tasks = resp2.data
                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(aux.taskForm(pending_tasks, done_tasks))
                    res.end()
                }))
                .catch(function(erro){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>Não foi possível obter a lista de alunos... Erro: " + erro)
                    res.end()
                })
                break
            case "POST":
                if (req.url == "/") {
                    console.dir(req)
                    collectRequestBodyData(req, result => {
                        if(result){

                            axios.post("http://localhost:3000/pending_tasks", result)
                            .then(function (response) {
                                window.location.reload()
                                console.log(response);
                            }).catch(function (error) {
                                  console.log("ola");
                            });        
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else if(req.url == "/delete_pending") {
                    collectRequestBodyData(req, result => { 
                        console.dir(result)
                        axios.delete('http://localhost:3000/pending_tasks/' + result.task_id)
                        .then(function (response) {
                            //res.redirect("/")

                            window.location.reload()
                            console.log(response);
                      }).catch(function (error) {
                            console.log("delete_pending");
                      });  
                    })
  
                }
                else if(req.url == "/delete_done") {
                    collectRequestBodyData(req, result => { 
                        console.dir(result)
                        axios.delete('http://localhost:3000/done_tasks/' + result.task_id)
                        .then(function (response) {
                            res.redirect("/")
                            console.log(response);
                      }).catch(function (error) {
                            console.log("delete_done");
                      });  
                    })
  
                }
                else if(req.url == "/change_list"){
                    collectRequestBodyData(req, result => { 
                        console.dir(result)
                        axios.get('http://localhost:3000/pending_tasks?id=' + result.task_id)
                        .then(function (response) {
                            axios.get('http://localhost:3000/pending_tasks')
                            .then(pt => {
                                var new_id = pt.data[pt.data.length-1] + 1
                                response.data[0].id = new_id
                                axios.post("http://localhost:3000/done_tasks", response.data[0])
                                    .then(function (response) {
                                    console.log(response);
                                    axios.delete('http://localhost:3000/pending_tasks/' + result.task_id)
                                    res.redirect("/")
                                    console.log(response);
                                }).catch(function (error) {
                                    console.log("ola");
                            });     
                            })
                            
                      }).catch(function (error) {
                            console.log("ola");
                      });  
                    })
                }

                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

toDoList.listen(7778, ()=>{
    console.log("Servidor à escuta na porta 7778...")
})



