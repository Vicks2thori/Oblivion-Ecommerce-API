const express = require('express');
const { pool } = require('../model/conection_db');
const path = require('path');
const { fileURLToPath } = require('url');
const { dirname } = require('path');

const router = express.Router(); // instanciando

//pagina de gestor de pedidos
//preciso entender como que o pedido vai se relacionar
router.patch("/retaguarda/ordermanegement", (req, res) => {
    res.send("updateOrder") //pending, in converse, cancel, aproved
});

//pagina de cardápio
//CATEGORY
router.get("/retaguarda/menulist/category", (req, res) => {
    res.send("getCategory")
    //depois pesquisar como que integra o frontend (react)
    const category = path.resolve(__dirname, '../view/menu/category.html'); //pagina estatica só para testes
    res.sendFile(category);
});
router.post("/retaguarda/menulist/category", (req, res) => {
    res.send("createCategory")
});
router.patch("/retaguarda/menulist/category", (req, res) => {
    res.send("updateCategory")
});

//PRODUCT
router.get("/retaguarda/menulist/product", (req, res) => {
    res.send("getProduct")
    const product = path.resolve(__dirname, '../view/menu/porduct.html'); //pagina estatica só para testes
    res.sendFile(product);
});
router.post("/retaguarda/menulist/product", (req, res) => {
    res.send("createProduct")
});
router.patch("/retaguarda/menulist/product", (req, res) => {
    res.send("updateProduct")
});
router.delete("/retaguarda/menulist/product", (req, res) => {
    res.send("deleteProduct") //validando
});

//IMAGE
router.get("/retaguarda/menulist/product/image", (req, res) => {
    res.send("getImage") //esta no cadastro do produto
    //possoter varias ações em varias entidades na mesma rota?
});
router.post("/retaguarda/menulist/product/image", (req, res) => {
    res.send("createImage")
});
router.patch("/retaguarda/menulist/product/image", (req, res) => {
    res.send("updateImage")
});
router.delete("/retaguarda/menulist/product/image", (req, res) => {
    res.send("deleteImage")
});

//pagina de estoque
//STOCK_CATEGORY
router.get("/retaguarda/stock/stockcategory", (req, res) => {
    res.send("getStockCategory")
});
router.post("/retaguarda/stock/stockcategory", (req, res) => {
    res.send("createStockCategory")
});
router.patch("/retaguarda/stock/stockcategory", (req, res) => {
    res.send("updateStockCategory")
});
//se o produto oficializar o delete esse tambem pode ter

//STOCK_MOVEMENT
router.get("/retaguarda/stock/stockmovement", (req, res) => {
    res.send("getStockMovement")
});
router.post("/retaguarda/stock/stockmovement", (req, res) => {
    res.send("createStockMovement")
});
router.patch("/retaguarda/stock/stockmovement", (req, res) => {
    res.send("updateStockMovement")
});

//STOCK_MOVEMENT_ITEM
router.get("/retaguarda/stock/stockmovement/stockmovementitem", (req, res) => {
    res.send("getStockMovementItem")
});
router.post("/retaguarda/stock/stockmovement/stockmovementitem", (req, res) => {
    res.send("createStockMovementItem")
});

//pagina de pagamento
//PAYMENT_CONDITION
router.get("/retaguarda/finance/paymentcondition", (req, res) => {
    res.send("getPaymentCondition")
});
router.post("/retaguarda/finance/paymentcondition", (req, res) => {
    res.send("postPaymentCondition")
});
router.patch("/retaguarda/finance/paymentcondition", (req, res) => {
    res.send("updatePaymentCondition")
});
//mesmo esquema do produto, se puder deletar esse tambem pode (criar snapchot de pedido)

//PAYMENT
router.get("/retaguarda/finance/payment", (req, res) => {
    res.send("getPayment")
});
router.post("/retaguarda/finance/payment", (req, res) => {
    res.send("postPayment")
});
router.patch("/retaguarda/finance/payment", (req, res) => {
    res.send("updatePayment")
});

//IMG_PAYMENT
router.get("/retaguarda/finance/payment/imgpayment", (req, res) => {
    res.send("getImgPayment")
});
router.post("/retaguarda/finance/payment/imgpayment", (req, res) => {
    res.send("defaultImgPayment") //??post??
});

//PAYMENT_HAS_CONDITION
//vou separar por enquanto para seguir
router.get("/retaguarda/finance/payment/paymenthascondition", (req, res) => {
    res.send("getPaymentHasCondition")
});
router.post("/retaguarda/finance/payment/paymenthascondition", (req, res) => {
    res.send("postPaymentHasCondition")
});
router.patch("/retaguarda/finance/payment/paymenthascondition", (req, res) => {
    res.send("updatePaymentHasCondition")
});
router.delete("/retaguarda/finance/payment/paymenthascondition", (req, res) => {
    res.send("deletePaymentHasCondition")
});

//pagina do site
//SITE
router.get("/retaguarda/site", (req, res) => {
    res.send("getSite")
});
router.patch("/retaguarda/site", (req, res) => {
    res.send("updateSite")
});

//pagina de configuração
//ENTERPRISE
router.get("/retaguarda/config/enterprise", (req, res) => {
    res.send("getEnterprise")
});
router.patch("/retaguarda/config/enterprise", (req, res) => {
    res.send("updateEnterprise")
});

//USER
//vou fazer a mesma coisa de payment_has_condition pois não sei como fazer
router.get("/retaguarda/config/user", (req, res) => {
    res.send("getUser('admin')")
});
router.post("/retaguarda/config/user", (req, res) => {
    res.send("postUser")
});
router.patch("/retaguarda/config/user", (req, res) => {
    res.send("updateUser")
});

//nn entendi como posso criar user/admin ou admin/user

//ADMIN
router.get("/retaguarda/config/admin", (req, res) => {
    res.send("getUser('admin')")
});
router.post("/retaguarda/config/admin", (req, res) => {
    res.send("postAdmin")
});
router.patch("/retaguarda/config/admin", (req, res) => {
    res.send("updateAdmin")
});
//se for possivel o delete

module.exports = { router };