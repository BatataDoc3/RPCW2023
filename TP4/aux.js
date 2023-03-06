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
                            <th>Id</th><th>Nome</th><th>Gitlink</th><th>Operações</th>
                        </tr>
                `
    for(let i=0; i < lista.length ; i++){
        ref = lista[i].nome.replaceAll(' ', '%20')
        pagHTML += `
                <tr>
                    <td>${lista[i].id}</td><td><a href=/?nome=${ref}>${lista[i].nome}</a></td><td>${lista[i].gitlink}</td>
                    <td>Editar ou Remover</td>
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