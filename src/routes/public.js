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
router.get(`/ecommerce`, (req, res) => {
    res.send("pagina do ecommerce do cliente")
})
router.post(`/ecommerce/`, (req, res) => {
    res.send("enviar pedido")
})
router.patch(`/ecommerce/`, (req, res) => {
    res.send("Mudar opções de cadastros")
})

//pagina de login
router.get(`/ecommerce/login`, (req, res) => {
    const login = path.resolve(__dirname, '../view/ecommerce/login.html'); //pagina estatica só para testes
    res.sendFile(login);
})
router.post("/ecommerce/login", (req, res) => {
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

    /*const scrr = false;

    if (scrr == true) {
        res.redirect("/login")
    }*/
})

router.post("/ecommerce/register", (req, res) => {
    res.send("Postou!!! cadastro")
    const {names, emails, passwords, cpfs, cells} = req.body;
    type = "client";

});

module.exports = router;
