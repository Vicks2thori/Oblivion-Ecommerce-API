const express = require("express");
const { pool } = require('../model/conection_db');

const router = express.Router() //instanciando
const path = require("path");
const { fileURLToPath } = require("url");
const { dirname } = require("path");

/*
C - CREATE
R - READ
U - UPDATE
D - DELETE

post - adciona no bd
get - solicitação ao banco de dados
put - modifica a tabela inteira
patch - modifica de forma parcial
delete - deleta alguma informação
*/

//pagina do ecommerce
//Mostrar categorias
router.get(`/ecommerce/category`, (req, res) => {
    res.send("getCategory")
})
//Mostrar produtos
router.get(`/ecommerce/category/product`, (req, res) => {
    res.send("getProduct") //Criar o byCategory?
})

//pagina de login
router.get(`/ecommerce/login`, (req, res) => {
    const login = path.resolve(__dirname, '../view/ecommerce/login.html'); //pagina estatica só para testes
    res.sendFile(login);
    res.sendFile("Middleware?")
})
router.post("/ecommerce/login", (req, res) => { //não entendi muito bem a esquematica dessa parte
    res.send("Postou!!! login")

    const typeUser = client;

    if (typeUser == client) {
        res.redirect("/")
    }
    else if (typeUserr == admin) {
        res.redirect("/retaguarda/ordermanegement")
    }


})

//pagina de cadastro
router.get("/ecommerce/register", (req, res) => {
    const register = path.resolve(__dirname, '../view/users/client.html'); //pagina estatica só para testes
    res.sendFile(register);
    //assim que confirmar redireciona
})
//posta o usuário client
router.post("/ecommerce/register", (req, res) => {
    res.send("Postou!!! cadastro")
    const {names, emails, passwords, cpfs, cells} = req.body;
    type = "client";
});

router.patch("/ecommerce/client", (req, res) => {
    res.send("updateClient")
    const {names, emails, passwords, cpfs, cells} = req.body;
    type = "client";
});

//pedidos que vai puxar (produto, forma de pagamento e respectivas condições...)
router.post("/ecommerce/order", (req, res) => {
    res.send("createOrder")
});

module.exports = router;
