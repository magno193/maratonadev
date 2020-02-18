// Importação do express
const express = require("express");
const server = express();

// Configurando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server
});

// Caminho com uma funcionalidade de request e response
server.get("/", (req, res) => {
    return res.render("index.html")
});

// Abre porta 3000 para criar servidor
server.listen(3000, () => {
    console.log("Servidor iniciado.");
});