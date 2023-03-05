let baseHTML =
`<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/
            <title>About People...</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Lista de Pessoas</h1>
                </header>
                <div class="w3-container">
                    <p>
                    <a href=/ class="w3-btn w3-teal w3-xlarge">Pessoas</button></a>
                    <a href=/sexo class="w3-btn w3-teal w3-xlarge">Distribuição por sexo</button></a>
                    <a href=/desportos class="w3-btn w3-teal w3-xlarge">Distribuição por desporto</button></a>
                    <a href=/profissoes class="w3-btn w3-teal w3-xlarge">Top 10 profissões</button></a>
                    
                    </p>
                </div>
            </div>`



exports.pessoasPage = function(lista){
    let pagHTML = baseHTML

    pagHTML += `

                <div class="w3-container">
                    <table class="w3-table-all w3-hoverable">
                        <tr>
                            <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th>
                        </tr>
                `
    for(let i=0; i < lista.length ; i++){
        ref = lista[i].nome.replaceAll(' ', '%20')
        pagHTML += `
                <tr>
                    <td>${lista[i].id}</td><td><a href=/?nome=${ref}>${lista[i].nome}</a></td><td>${lista[i].idade}</td>
                    <td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td>
                </tr>
        `
    }

    pagHTML += `
                    </table>
                </div>
                <footer class="w3-container w3-teal">
                    <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}


exports.sexo = function(){
    var pagHTML = baseHTML
    pagHTML += `
                <div class="w3-dropdown-hover">
                    <button class="w3-button w3-white w3-border w3-large"> Escolha o sexo </button>
                    <div class="w3-dropdown-content w3-bar-block w3-border">
                        <a href="/sexo/masculino" class="w3-bar-item w3-button">Homem</a>
                        <a href="/sexo/feminino" class="w3-bar-item w3-button">Mulher</a>
                        <a href="/sexo/outro" class="w3-bar-item w3-button">Outro</a>
                    </div>
                </div>
            </div>
        </body>
    </html>
    `
    return pagHTML
}


exports.sexoList = function(lista){
    var pagHTML = baseHTML
    pagHTML += `
                <div class="w3-dropdown-hover">
                    <button class="w3-button w3-white w3-border w3-large"> Escolha o sexo </button>
                    <div class="w3-dropdown-content w3-bar-block w3-border">
                        <a href="/sexo/masculino" class="w3-bar-item w3-button">Masculino</a>
                        <a href="/sexo/feminino" class="w3-bar-item w3-button">Feminino</a>
                        <a href="/sexo/outro" class="w3-bar-item w3-button">Outro</a>
                     </div>
                </div>
                <div class="w3-panel w3-teal">
                    <p>Total de ${lista.length} resultados</p>
                </div> 
                <div class="w3-container">
                    <table class="w3-table-all w3-hoverable">
                        <tr>
                            <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th>
                        </tr>
                `
    for(let i=0; i < lista.length ; i++){        
        ref = lista[i].nome.replaceAll(' ', '%20')
        pagHTML += `
                <tr>
                    <td>${lista[i].id}</td><td><a href=/?nome=${ref}>${lista[i].nome}</a></td><td>${lista[i].idade}</td>
                    <td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td>
                </tr>
        `
    }

    pagHTML += `
                    </table>
                </div>
                <footer class="w3-container w3-teal">
                    <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
    
}


exports.getSports = function(lista){
    const sports = {}
    for(let i = 0; i < lista.length; i++){
        let desportos = lista[i].desportos
        for(let j = 0; j < desportos.length; j++){
                if(!(desportos[j] in sports)) {
                sports[desportos[j]] = 1
            }
            else {
                sports[desportos[j]] = sports[desportos[j]] + 1
            }
        }
    }

    var items = Object.keys(sports).map(
        (key) => { return [key, sports[key]] });
    
    items.sort(
        (first, second) => { return second[1] - first[1] }
    );

    return items
}

exports.sports = function(sports){
    pagHTML = baseHTML
    pagHTML += `
<div class="w3-container">
    <h2>Lista de desportos</h2>
    <ul class="w3-ul w3-card-4">
    `
    for (let sport in sports){
        pagHTML += `
    <li class="w3-bar">
        <class="w3-bar-item w3-button w3-white w3-large w3-right">
        <div class="w3-bar-item">
          <span class="w3-large"><a href = /desportos/${sports[sport][0]}> ${sports[sport][0]}</a></span><br>
          <span>${sports[sport][1]} resultados </span>
        </div>
    </li>
        `
    }

    pagHTML += `
    </ul>
</div>
    `

    return pagHTML
}


exports.top10 = function(lista){
    final = {}
    for(let i = 0; i < lista.length; i++){
        if(!(lista[i].profissao in final)) {
            final[lista[i].profissao] = 1
        }
        else {
            final[lista[i].profissao] = final[lista[i].profissao] + 1
        }
    }
    var items = Object.keys(final).map(
        (key) => { return [key, final[key]] });
    
    items.sort(
        (first, second) => { return second[1] - first[1] }
    );

    top10 = items.slice(0,10)
    return top10
}


exports.profissoes = function(lista){
    pagHTML = baseHTML

    pagHTML += `
    <div class="w3-container">
    <h2>TOP10 profissões</h2>
    <ul class="w3-ul w3-card-4">
    `
    for (let prof in lista){
        ref = lista[prof][0].replaceAll(' ', '%20')
        pagHTML += `
    <li class="w3-bar">
        <class="w3-bar-item w3-button w3-white w3-large w3-right">
        <div class="w3-bar-item">
          <span class="w3-large"><a href = /profissoes/${ref}> ${lista[prof][0]}</a></span><br>
          <span>${lista[prof][1]} resultados </span>
        </div>
    </li>
        `
    }

    pagHTML += `
    </ul>
</div>
    `
    return pagHTML
}

exports.personInfo = function(pessoa){
    pessoa=pessoa[0]
    pagHTML = baseHTML
    pagHTML += `
    <div class="w3-card4">
        <header class="w3-container w3-teal">
            <h2>${pessoa.nome}</h2>
        </header>
        <div class="w3-container w3-cyan w3-border-top w3-border-teal">
            <p><h3><b>idade:</b> ${pessoa.idade}</h3></p>
        </div>
        <div class="w3-container w3-cyan w3-border-top w3-border-teal">
            <p><h3><b>sexo:</b> ${pessoa.sexo}</h3></p>
        </div>
        <div class="w3-container w3-cyan w3-border-top w3-border-teal">
            <p><h3><b>morada:</b> ${pessoa.morada.cidade}, ${pessoa.morada.distrito}</h3></p>
        </div>
        <div class="w3-container w3-cyan w3-border-top w3-border-teal">
            <p><h3><b>BI:</b> ${pessoa.BI}</h3></p>
        </div>
        <div class="w3-container w3-cyan w3-border-top w3-border-teal">
            <p><h3><b>profissão:</b> ${pessoa.profissao}</h3></p>
        </div>
        <div class="w3-container w3-cyan w3-border-top w3-border-teal">
            <p><h3><b>partido político:</b> ${pessoa.partido_politico.party_abbr} - ${pessoa.partido_politico.party_name}</h3></p>
        </div>
        `
        if(pessoa.religiao != null){
            pagHTML +=`
            <div class="w3-container w3-cyan w3-border-top w3-border-teal">
                <p><h3><b>religião:</b> ${pessoa.religiao}</h3></p>
            </div>
            `
        }
        pagHTML += `
        <button onclick="myFunction('desportos')" class="w3-btn w3-block w3-cyan w3-left-align w3-border-top w3-border-teal"><h3><b>Desportos</b></h3></button>
        <div id="desportos" class="w3-container w3-hide">
        `
        for(sport in pessoa.desportos){
            pagHTML += `
            <div class="w3-container w3-aqua w3-border-top w3-border-teal">
            <h4>${pessoa.desportos[sport]}</h4>
            </div>
            `
        }
        pagHTML += `
        </div>
        `

        pagHTML += `
        <button onclick="myFunction('animais')" class="w3-btn w3-block w3-cyan w3-left-align w3-border-top w3-border-teal"><h3><b>Animais</b></h3></button>
        <div id="animais" class="w3-container w3-hide">
        `
        for(animal in pessoa.animais){
            pagHTML += `
            <div class="w3-container w3-aqua w3-border-top w3-border-teal">
            <h4>${pessoa.animais[animal]}</h4>
            </div>
            `
        }

        pagHTML += "</div>"

        pagHTML += `
        <button onclick="myFunction('pppt')" class="w3-btn w3-block w3-cyan w3-left-align w3-border-top w3-border-teal"><h3><b>Figuras públicas portuguesas</b></h3></button>
        <div id="pppt" class="w3-container w3-hide">
        `
        for(pppt in pessoa.figura_publica_pt){
            pagHTML += `
            <div class="w3-container w3-aqua w3-border-top w3-border-teal">
            <h4>${pessoa.figura_publica_pt[pppt]}</h4>
            </div>
            `
        }

        pagHTML += "</div>"

        

        pagHTML += `
        <div class="w3-container w3-cyan w3-border-top w3-border-teal">
            <p><h3><b>marca do carro:</b> ${pessoa.marca_carro}</h3></p>
        </div> `

        pagHTML += `
        <button onclick="myFunction('df')" class="w3-btn w3-block w3-cyan w3-left-align w3-border-top w3-border-teal"><h3><b>Destinos favoritos</b></h3></button>
        <div id="df" class="w3-container w3-hide">
        `
        for(df in pessoa.destinos_favoritos){
            pagHTML += `
            <div class="w3-container w3-aqua w3-border-top w3-border-teal">
            <h4>${pessoa.destinos_favoritos[df]}</h4>
            </div>
            `
        }

        pagHTML += "</div>"

        var atributos = pessoa.atributos
        var final = []
        for(a in atributos){
            if(atributos[a] == true){
                final.push(a)
            }
        }

        pagHTML += `
        <button onclick="myFunction('atr')" class="w3-btn w3-block w3-cyan w3-left-align w3-border-top w3-border-teal"><h3><b>Atributos</b></h3></button>
        <div id="atr" class="w3-container w3-hide">
        `
        for(atr in final){
            pagHTML += `
            <div class="w3-container w3-aqua w3-border-top w3-border-teal">
            <h4>${final[atr]}</h4>
            </div>
            `
        }

        pagHTML += `
            <div class="w3-container w3-aqua w3-border-top w3-border-teal">
            <h4>comida favorita: ${pessoa.atributos['comida_favorita']}</h4>
            </div>
            `

        pagHTML += "</div>"

        pagHTML += `
        
    </div>
    <script>
    function myFunction(id) {
      var x = document.getElementById(id);
      if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
      } else { 
        x.className = x.className.replace(" w3-show", "");
      }
    }
    </script>
    </body>
</html>
    `

    return pagHTML

}

