const express = require('express');
const { pool } = require('../model/conection_db');
const path = require('path');
const { fileURLToPath } = require('url');
const { dirname } = require('path');

const router = express.Router(); // instanciando

//pagina de gestor de pedidos
router.get("/retaguarda/ordermanegement", (req, res) => {
    res.send("A pagina de central de pedidos")
})
router.post("/retaguarda/ordermanegement", (req, res) => {
    res.send("posta os pedidos")
})

//pagina de cardápio
router.get("/retaguarda/menulist", (req, res) => {
    res.send("A pagina de cardápio")
})
router.post("/retaguarda/menulist", (req, res) => {
    res.send("POSTOU pagina de cardápio")
})
router.patch("/retaguarda/menulist", (req, res) => {
    res.send("MODIFICOU pagina de cardápio")
})

//pagina de estoque
router.get("/retaguarda/stock", (req, res) => {
    res.send("A pagina de estoque")
})
router.post("/retaguarda/stock", (req, res) => {
    res.send("Postou estoque")
})
router.patch("/retaguarda/stock", (req, res) => {
    res.send("modifica o estoque")
})

//pagina de formas de pagamento
router.get("/retaguarda/payment", (req, res) => {
    res.send("A pagina de pagamentos")
})
router.post("/retaguarda/payment", (req, res) => {
    res.send("POSTOU pagina de pagamentos")
})
router.patch("/retaguarda/payment", (req, res) => {
    res.send("Modifica pagamento")
})

//pagina de editar site
router.get("/retaguarda/editsite", (req, res) => {
    const editsite = path.resolve(__dirname, '../view/enterprise/site'); //pagina estatica só para testes
    res.sendFile(editsite);
})
router.post("/retaguarda/editsite", (req, res) => {
    res.send("posta Edita o site")
})
router.patch("/retaguarda/editsite", (req, res) => {
    res.send("Edita o site")
})

//pagina de configurações
router.get("/retaguarda/config", (req, res) => {
    res.send("A pagina de configurações")
})
router.post("/retaguarda/config", (req, res) => {
    res.send("postou pagina de configurações")
})

export default router;