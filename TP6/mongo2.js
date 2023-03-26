var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/world'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function() {
    console.log("Conexão ao MongoDB realizada com sucesso...")
    var pessoaSchema = new mongoose.Schema({
        nome: String,
        idade: Number
    });
    var pessoaModel = mongoose.model('pessoa', pessoaSchema)
    
    var pessoas = [
        {
            "nome": "Laurinda Freitas",
            "idade": 24
        }
    ]
    
    pessoaModel.create(pessoas)
    
    console.log("That's all, folks...")
});

