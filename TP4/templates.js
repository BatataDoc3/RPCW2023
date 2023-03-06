exports.studentsListPage = function(slist, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Student Management</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Students List</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Name</th><th>GitLink</th>
                            <th>Operações</th>
                        </tr>
                `
    for(let i=0; i < slist.length ; i++){
        pagHTML += `
                <tr>
                    <td><a href = /alunos/${slist[i].id}> ${slist[i].id}</a> </td><td><a href = /pessoas/${slist[i].id}>${slist[i].nome}</a></td><td><a href="${slist[i].gitlink}"> GitHub link </a></td>
                    <td><a href = "#">Edit</a> <a href="#"> Delete</a></td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated by RPCW2023 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

// ---------------Student's Page--------------------------------
// Change and adapt to current dataset...
exports.studentPage= function( aluno, d ){
    return `
    <html>
    <head>
        <title>Aluno: ${aluno.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Aluno ${aluno.id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome: </b> ${aluno.nome}</li>
                    <li><b>Número: </b> ${aluno.id}</li>
                    <li><b>Git (link): </b> <a href="${aluno.gitlink}">${aluno.gitlink}</a></li>
                </ul>
            </div>

            <div class="w3-container">
                <table class="w3-table-all">
                    <tr>
                        <th>TPC1</th><th>TPC2</th><th>TPC3</th>
                        <th>TPC4</th><th>TPC5</th><th>TPC6</th><th>TPC7</th><th>TPC8</th>
                    </tr>
                    <tr>
                        <td>${aluno.tpc1 ? 1 : 0}</td>
                        <td>${aluno.tpc2 ? 1 : 0}</td>
                        <td>${aluno.tpc3 ? 1 : 0}</td>
                        <td>${aluno.tpc4 ? 1 : 0}</td>
                        <td>${aluno.tpc5 ? 1 : 0}</td>
                        <td>${aluno.tpc6 ? 1 : 0}</td>
                        <td>${aluno.tpc7 ? 1 : 0}</td>
                        <td>${aluno.tpc8 ? 1 : 0}</td>
                    </tr>
                </table>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}