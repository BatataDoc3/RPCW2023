const express = require('express')
const app = express()
const port = 7777

app.get('/', (req, res) => {
    res.send("Olá Turma de 2023!")
})

app.listen(port, () => {
    console.log(`Servidor à escuta na porta ${port}`)
})