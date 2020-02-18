const express = require("express");
const server = express();

// Caminho com uma funcionalidade de request e response
server.get("/", (req, res) => {
    return res.send("Ok!")
});

// Abre porta 3000 para criar servidor
server.listen(3000, () => {
    console.log("Servidor iniciado.");
});