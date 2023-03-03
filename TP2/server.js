var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer(function (req, res) {
    var q2 = url.parse(req.url, true)
    console.log(q2)
    var txt = ""
    if (q2.pathname == "/") {
        fs.readFile('index.html', 'utf-8', function(err, data) {
            res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8"});
            if (err)
                res.write("Erro: " + err);
            else
                res.write(data);
            res.end()
        })
    }
    else {
        let components = q2.pathname.split("/")
        console.log(components)
        if(components.length != 3){
            console.log("Pedido inválido")
        }

        let pathname = components[2]
        if(isNaN(pathname)) {
            txt = "O valor tem de ser um inteiro"
        }
        else {
            let value = parseInt(pathname)
            console.log(value)
            if(value > 121 || value < 0) {
                txt = "O valor tem de ser um inteiro entre 0 e 121"
            }
            else {
                if (components[1] == "HTML") {
                    fs.readFile('out/html/arq' + value +'.html', 'utf-8', function(err, data) {
                        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                        if (err)
                            res.write("Erro: " + err);
                        else
                            res.write(data);
                        res.end()
                }) 
            }
                else if (components[1] == "XML"){
                    fs.readFile('out/xml/arq' + value +'.xml', 'utf-8', function(err, data) {
                        res.writeHead(200, { "Content-Type": "text/xml; charset=utf-8" });
                        if (err)
                            res.write("Erro: " + err);
                        else
                            res.write(data);
                        res.end()
                }) 
                }
                else {
                    res.write("Pedido inválido")
                    req.end
                }
            }
        }
    }
}).listen(7777)