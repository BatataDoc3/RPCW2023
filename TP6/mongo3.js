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
    
    pessoaModel.find()
        .then(docs => {
            console.log(docs)
        })
        .catch(erro => {
            console.log('Error retrieving pessoas records: ' + erro)
        })
    
    console.log("That's all, folks...")
});

