//INSTALAR DEPENDÊNCIAS NO BACK-END
/*  npm init-y (gerenciador de pacotes do Node)
    npm install express (ajuda a construir o servidor)
    npm instal -D nodemon(reinicia o servidor automatícamente (é preciso mudar o nome no package.json, para 'nodemon') )
*/

const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const data = require("./data")


//CHAMANDO ARQUIVOS ESTÁTICOS(css/ img/ js)
server.use(express.static('public'))

//CONFIGURANDO NUNJUCKS
server.set("view engine", "njk")
nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})


server.get("/", function (req, res) { //CRIANDO ROTAS DAS PAGINAS 
    return res.render("index", {items: data})
})
server.get("/sobre", function (req, res) { //CRIANDO ROTAS DAS PAGINAS
    return res.render("sobre", { data });
})
server.get("/receitas", function (req, res) { //CRIANDO ROTAS DAS PAGINAS
    return res.render("receitas", { recipes: data });
})
server.get("/recipes/:index", function (req, res) {
    const recipes = data // Array de receitas carregadas do data.js
    const recipeIndex = req.params.index;
    return res.render("recipes", { recipe: recipes[recipeIndex] })

    console.log(recipes[recipeIndex]);

  
})


//INICIANDO SERVIDOR
server.listen(5000, function () {
    console.log("server start")
})