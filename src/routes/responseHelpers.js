//responseHelpers.js

const { response } = require("express");

//Respostas http OK - (2xx)
//200 - Sucesso geral
const success200 = (res, data, message = '200 - Operação realizada com sucesso') => {
  return res.status(200).json({
    success: true,
    message,
    data
  });
};

//201 - Criado com sucesso
const created201 = (res, data, message = '201 - Criado com sucesso') => {
  return res.status(201).json({
    success: true,
    message,
    data
  });
};


//Respostas http ERROR (4xx/5xx)
//400 - Dadod inválidos
const badRequest400 = (res, error, message = '400 - Dados inválidos') => {
  return res.status(400).json({
    success: false,
    message,
    errors: error.details.map(d => d.message) //extrai só as mensagens
  });
};

//401 - Não autenticado (TEMPORÁRIO até a criação do middleware)
const unauthorized401 = (res, message = '401 - Não autenticado') => {
  return res.status(401).json({
    success: false,
    message
  });
};

//403 - Não autorizado (TEMPORÁRIO até a criação do middleware)
const forbidden403 = (res, message = '403 - Não autorizado') => {
  return res.status(403).json({
    success: false,
    message
  });
};

//404 - Não encontrado
const notFound404 = (res, message = '404 - Recurso não encontrado') => {
  return res.status(404).json({
    success: false,
    message
  });
};

//409 - Conflito
const conflict409 = (res, message = '409 - Conflito com recurso existente') => {
  return res.status(409).json({
    success: false,
    message
  });
};

//422 - Entidade não processavel
const unprocessable422 = (res, message = '422 - Não foi possível processar a requisição') => {
  return res.status(422).json({
    success: false,
    message
  });
};

//500 - Erro interno do servidor
const serverError500 = (res, message = '500 - Erro interno do servidor') => {
  return res.status(500).json({
    success: false,
    message
  });
};

//Função que agrupa as respostas OK
const responseHelpersOk = (res, statusCode, data, message) => {
  switch (statusCode) {
    case 200:
      return success200(res, data, message);
    case 201:
      return created201(res, data, message);
    default:
      return success200(res, data, message); // padrão 200
  }
};

//Função que agrupa as respostas ERROR
const responseHelpersError = (res, statusCode, data, message) => {
  switch (statusCode) {
    case 400:
      return badRequest400(res, data, message);
    case 401:
      return unauthorized401(res, message);
    case 403:
      return forbidden403(res, message);
    case 404:
      return notFound404(res, message);
    case 409:
      return conflict409(res, message);
    case 422:
      return unprocessable422(res, message);
    case 500:
      return serverError500(res, message);
    default:
      return serverError500(res, message); // padrão 500
  }
};

module.exports = {
    responseHelpersOk,
    responseHelpersError
};