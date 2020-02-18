// Importação do express
const express = require("express");
const server = express();

// Configurar servidor para apresentar arquivos estáticos
server.use(express.static('public'));

// Configurando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true
});

// Lista dos doadores: Array
const donors = [
    {
        name: "Alexandre Ferreira",
        blood: "B+"
    },
    {
        name: "Diego Fernandes",
        blood: "AB+"
    },
    {
        name: "Robson Marques",
        blood: "A+"
    },
    {
        name: "Mayk Brito",
        blood: "O+"
    }
];

// Caminho com uma funcionalidade de request e response
server.get("/", (req, res) => {
    return res.render("index.html", { donors })
});

// Abre porta 3000 para criar servidor
server.listen(3000, () => {
    console.log("Servidor iniciado.");
});