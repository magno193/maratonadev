// Importação do express
const express = require("express");
const server = express();

// Configurar servidor para apresentar arquivos estáticos
server.use(express.static('public'));

// Habilitar req.body do formulário
server.use(express.urlencoded( { extended: true } ))

// Configurar a conexão com o banco de dados
const Pool = require('pg').Pool;

const db = new Pool({
    user: 'postgres',
    password:'admin',
    port: 5432,
    database: 'doesangue'
});

// Configurando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true
});

// Caminho com uma funcionalidade de request e response
server.get("/", (req, res) => {

    db.query("SELECT * FROM donors", (err, result) => {
        if (err) res.send("Erro de banco de dados.");

        const donors = result.rows;
        console.log(donors);
        return res.render("index.html", { donors });
    });
});

// Recebe os dados do formulário
server.post("/", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    // Se houver dado vazio
    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigatórios!")
    }

    // Coloca novo doador dentro do banco de dados
    const query = `
        INSERT INTO donors ("donor_name", "donor_email", "donor_blood")
        VALUES ($1, $2, $3)
    `
    const values = [name, email, blood]

    db.query(query, values, function(err) {
        // Fluxo de erro
        if (err) return res.send("Erro no banco de dados.")

        // Fluxo ideal
        return res.redirect("/")
    })
})

// Abre porta 3000 para criar servidor
server.listen(3000, () => {
    console.log("Servidor iniciado.");
});