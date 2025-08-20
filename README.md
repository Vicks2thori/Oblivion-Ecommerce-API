# 📂 API de Produtos - TCC Oblivion

> **Branch:** `docs/Product-API` | **Status:** 🚧 Em Desenvolvimento

Documentação completa da API de gestão de produtos do e-commerce.

## 🔗 Outras Branchs
- [🏠 **Voltar ao Main**](https://github.com/Vicks2thori/Oblivion-Ecommerce-API/tree/main)
- [📩 **Category API**](https://github.com/Vicks2thori/Oblivion-Ecommerce-API/tree/docs/Category-API)

## 🧭 Navegação
- [📊 **Estrutura do Banco de Dados**](#-estrutura-do-banco-de-dados)
- [📋 **Endpoints Disponíveis**](#-endpoints-disponíveis)
- [🔒 **Endpoints Privados**](#-endpoints-privados-admin)
  - [_**POST** `/api/private/products ✅`_](#post-apiprivateproducts)
  - [_**GET** `/api/private/products/:id 🚧`_](#get-apiprivateproductid-)
  - [_**PUT** `/api/private/products/:id ✅`_](#put-apiprivateproductid-)
  - [_**PUT** `/api/private/products/:id/delete 🚧`_](#put-apiprivateproductsiddelete-)
- [🔄 **Como Funciona o Relacionamento**](#-como-funciona-o-relacionamento)

## **📊 Estrutura do Banco de Dados:**
```json
// Product Schema:
{
  _id: ObjectId,
  name: String,
  imageUrl: String,
  code: String,
  description: String,
  categoryId: ObjectId,
  price: Number,
  quantity: Number,
  status: Boolean,
  deleted: Boolean,
  createdAt: Date,
  updatedAt: Date
  createdAt: Date,
  updatedAt: Date
}
```


## 📋 **Endpoints Disponíveis**

### 🔒 **Privado (Admin)**
| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| `POST` | `/api/private/products` | Criar produtos | ✅ |
| `GET` | `/api/private/products/:id` | Buscar produto por ID | 🚧 |
| `PUT` | `/api/private/products/:id` | Atualizar produto | ✅ |
| `PUT` | `/api/private/products/:id/delete` | Arquivar produto (soft delete) | 🚧 |

---
**📱 Diferenças dos endpoint:**
- **🔓 Público:** Produtos são mostrados através dos endpoints de categoria (ex: `/api/public/categories/active`)
- **🔒 Privado:** Produtos são organizados por categoria para facilitar gestão e ordenação (ex: `/api/private/categories`)
- **🎯 Vantagem:** Usuário sempre vê produtos organizados por categoria, não produtos soltos

## 🌐 Base URLs
- **Produção:** `https://tcc-oblivion.onrender.com`
- **Desenvolvimento:** `http://localhost:3001`

## 🔒 **Endpoints Privados**

### **POST** `/api/private/products`
Cria um novo produto no sistema.

### **💭 Request:**
```http
POST /api/private/products
Content-Type: application/json
Authorization: Bearer {token}
```

**Headers:**
- `Content-Type: application/json` *(obrigatório)*
- `Authorization: Bearer {token}` *(futuro - quando implementar auth)*

**Body Parameters:**
```json
{
  "name": "string",        // Obrigatório: 3-50 caracteres
  "imageUrl": "string",    // Opcional: 1-255 caracteres (implementação futura)
  "code": "string",        // Opcional: 0-9999999999999999999 (implementação futura), default = gerado pelo sistema
  "description": "string", // Opcional: 1-255 caracteres
  "categoryId": "string",  // Obrigatório: Chave estrangeira, 24 caracteres, hexadecimal
  "price": "number",       // Obrigatório: 0.01-9999999.99 numeros
  "quantity": "number",    // Opcional: default = 0
  "status": "boolean"      // Opcional: default = true
}
```

#### **Exemplos de Request:**

**Exemplo 1 - Produto simples (sem campos opcionais):**
```json
{
  "name": "Smartphone Galaxy",
  "categoryId": "66b8f2222333344445555666",
  "price": 899.99
}
```

**Exemplo 2 - Produto completo (com dados opcionais):**
```json
{
  "name": "Smartphone Galaxy",
  "imageUrl": "https://exemplo.com/smartphone.jpg",
  "code": "123456",
  "description": "Smartphone com 128GB",
  "categoryId": "66b8f1111222233334444555",
  "price": 899.99,
  "quantity": 15,
  "status": true
}
```
---
### **💬 Responses:**
#### **✔️ Response 200 - Sucesso:**
```json
//Produto simples
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": {
    "_id": "66b8f1234567890123456789",
    "name": "Smartphone Galaxy",
    "code": "98765", // Gerado pelo sistema
    "categoryId": "66b8f1111222233334444555",
    "price": 899.99, 
    "quantity": 0,   // Default = 0
    "status": true,  // Default = true
    "deleted": false,
    "createdAt": "2024-08-15T10:30:00.000Z",
    "updatedAt": "2024-08-15T10:30:00.000Z"
  }
}

//Produto completo
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": {
    "name": "Smartphone Galaxy",
    "imageUrl": "https://exemplo.com/smartphone.jpg",
    "code": "123456",
    "description": "Smartphone com 128GB",
    "categoryId": "66b8f1111222233334444555",
    "price": 899.99,
    "quantity": 15,
    "status": true,
    "deleted": false,
    "createdAt": "2024-08-15T10:30:00.000Z",
    "updatedAt": "2024-08-15T10:30:00.000Z"
  }
}
```

#### **❓ Response 400 - Dados Inválidos:**
```json
{
  "success": false,
  "message": "Dados inválidos",
  "errors": [
    "name: é obrigatório, minimo 3 caracteres, maximo 5o caracteres", "imageUrl: minimo 1 caracter, maximo 255", "code: maior que 0, menor que 9999999999999999999", "description: minimo 1 caracter, maximo 255", "categoryId: é obrigatório, tamanho 24 caracteres, hexadecimal", "price: é obrigatório, minimo 0.01, maximo 999999.99", "quantity: menor que 99999"
  ]
}
```

#### **❌ Response 500 - Erro Interno:**
```json
{
  "success": false,
  "message": "Erro ao criar produto: [detalhes do erro]"
}
```

#### **Validações:**
- 📝 **name:** Obrigatório, string, 3-50 caracteres
- 📝 **imageUrl:** Opcional, string, 1-255 caracteres
- 📝 **code:** Opcional, string, 1-99999 intervalo de valores, default = `generatorCodeProduct`
- 📝 **description:** Opcional, string, 1-255 caracteres
- 📝 **categoryId:** Obrigatório, string, 24 caracteres, hexadecimal
- 📝 **price:** Obrigatório, number, 0.01-999999.99 intervalo de valores
- 📝 **quantity:** Opcional, number, 0-99999 intervalo de valores, default = `0`
- 📝 **status:** Opcional, boolean, default = `true`
---

### **GET** `/api/private/product/:id` 🚧
Busca um produto específico por ID para edição/visualização.

#### **💭 Request:**
```http
GET /api/private/product/{productId}
Authorization: Bearer {token}
```

**Headers:**
- `Authorization: Bearer {token}` *(futuro)*

**Path Parameters:**
- `productId` *(obrigatório)*: ObjectId do produto (24 caracteres hexadecimais)

**Body:** Não aplicável

#### **Exemplo:**
```http
GET /api/private/product/66b8f1234567890123456789
```
---
### **💬 Response:**

#### **✔️ Response 200 - Sucesso:**
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": {
    "name": "Smartphone Galaxy",
    "imageUrl": "https://exemplo.com/smartphone.jpg",
    "code": "123456",
    "description": "Smartphone com 128GB",
    "categoryId": "66b8f1111222233334444555",
    "price": 899.99,
    "quantity": 15,
    "status": true,
    "deleted": false,
    "createdAt": "2024-08-15T10:30:00.000Z",
    "updatedAt": "2024-08-15T10:30:00.000Z"
  }
}
```

#### **❓ Response 400 - ID Inválido:**
```json
{
  "success": false,
  "message": "ID inválido"
}
```

#### **⁉️ Response 404 - Não Encontrada:**
```json
{
  "success": false,
  "message": "Produto não encontrada"
}
```

#### **❌ Response 500 - Erro:**
```json
{
  "success": false,
  "message": "Erro ao buscar produto: [detalhes do erro]"
}
```

---

### **PUT** `/api/private/product/:id` ✅
Atualiza um produto existente (nome, imagem, código, descrição, categoria, preço, quantidade, status).

### **💭 Request:**
```http
PUT /api/private/products/{productId}
Content-Type: application/json
Authorization: Bearer {token}
```

**Headers:**
- `Content-Type: application/json` *(obrigatório)*
- `Authorization: Bearer {token}` *(futuro)*

**Path Parameters:**
- `productId` *(obrigatório)*: ObjectId do produto

**Body Parameters:**
```json
{
  "name": "string",        // Obrigatório: 3-50 caracteres
  "imageUrl": "string",    // Opcional: 1-255 caracteres (implementação futura)
  "code": "string",        // Opcional: 0-9999999999999999999 (implementação futura), default = gerado pelo sistema
  "description": "string", // Opcional: 1-255 caracteres
  "categoryId": "string",  // Obrigatório: Chave estrangeira, 24 caracteres, hexadecimal
  "price": "number",       // Obrigatório: 0.01-9999999.99 numeros
  "quantity": "number",    // Opcional: default = 0
  "status": "boolean"      // Opcional: default = true
}
```

#### **Exemplos de Request:**

**Exemplo 1 - Atualizar nome:**
```json
{
  "name": "Notebook Dell"
}
```

**Exemplo 2 - Desativar produto:**
```json
{
  "status": false
}
```

**Exemplo 3 - Adicionar produtos a uma nova categoria:**
```json
{
  "categoryId": "66b8f2222333344445555666"
}
```

**Exemplo 4 - Atualização completa:**
```json
{
  "name": "Notebook Dell",
  "imageUrl": "https://exemplo.com/notebook.jpg",
  "code": "98765",
  "description": "Processardor i7 3 geração",
  "categoryId": "66b8f2222333344445555666",
  "price": 1500.99,
  "quantity": 2,
  "status": false
}
```
---
### **💬 Response:**
#### **✔️ Response 200 - Sucesso:**
```json
{
  "success": true,
  "data": {
    "id": "66b8f1234567890123456789",
    "name": "Smartphone Galaxy",
    "imageUrl": "https://exemplo.com/smartphone.jpg",
    "code": "123456",
    "description": "Smartphone com 128GB",
    "categoryId": "66b8f1111222233334444555",
    "price": 899.99,
    "quantity": 15,
    "status": true,
    "deleted": false,
    "createdAt": "2024-08-10T08:00:00.000Z",
    "updatedAt": "2024-08-15T15:45:00.000Z"
  }
}
```

#### **❓ Response 400 - Dados Inválidos:**
```json
{
  "success": false,
  "errors": [
    "name: é obrigatório, minimo 3 caracteres, maximo 5o caracteres", "imageUrl: minimo 1 caracter, maximo 255", "code: maior que 0, menor que 9999999999999999999", "description: minimo 1 caracter, maximo 255", "categoryId: é obrigatório, tamanho 24 caracteres, hexadecimal", "price: é obrigatório, minimo 0.01, maximo 999999.99", "quantity: menor que 99999"
  ]
}
```

#### **⁉️ Response 404 - Não Encontrada:**
```json
{
  "success": false,
  "message": "Erro ao atualizar produto: Produto não encontrada"
}
```

#### **❌ Response 500 - Erro:**
```json
{
  "success": false,
  "message": "Erro ao atualizar produto: [detalhes do erro]"
}
```

#### **Validações:**
- 📝 **name:** Obrigatório, string, 3-50 caracteres
- 📝 **imageUrl:** Opcional, string, 1-255 caracteres
- 📝 **code:** Opcional, string, 1-99999 intervalo de valores, default = `generatorCodeProduct`
- 📝 **description:** Opcional, string, 1-255 caracteres
- 📝 **categoryId:** Obrigatório, string, 24 caracteres, hexadecimal
- 📝 **price:** Obrigatório, number, 0.01-999999.99 intervalo de valores
- 📝 **quantity:** Opcional, number, 0-99999 intervalo de valores, default = `0`
- 📝 **status:** Opcional, boolean, default = `true`
- 📝 **Mínimo 1 campo** obrigatório para atualização
- 📝 **Máximo 8 campos** por request
---

### **PUT** `/api/private/products/:id/delete` 🚧
Arquiva um produto (soft delete) removendo-a das consultas de endpoints.

### **💭 Request:**
```http
PUT /api/private/products/{productId}/delete
Authorization: Bearer {token}
```

**Headers:**
- `Authorization: Bearer {token}` *(futuro)*

**Path Parameters:**
- `productId` *(obrigatório)*:

### **💬 Response:**
#### **✔️ Response 200 - Sucesso:**
```json
{
  "success": true,
  "data": {
    "id": "66b8f1234567890123456789",
    "name": "Smartphone Galaxy",
    "imageUrl": "https://exemplo.com/smartphone.jpg",
    "code": "123456",
    "description": "Smartphone com 128GB",
    "categoryId": "66b8f1111222233334444555",
    "price": 899.99,
    "quantity": 15,
    "status": true,
    "deleted": true,
    "createdAt": "2024-08-10T08:00:00.000Z",
    "updatedAt": "2024-08-15T15:45:00.000Z"
  }
}
```

## **🔄 Como Funciona o Relacionamento:**
1. **Categoria tem array** `products: [{ productId: ObjectId }]` - Referência para produtos
2. **Produto é inserido no array** quando criado/atualizado via `CategoryService`


### **💡 Vantagens desta Abordagem:**
- 📝 **Performance:** Busca eficiente com índices MongoDB e relacionamentos otimizados
- 📝 **Manutenibilidade:** Separação clara entre produtos e categorias, facilitando atualizações
- 📝 **Integração:** Relacionamento bidirecional com categorias para consultas eficientes
- 📝 **UX:** Usuário sempre vê produtos organizados logicamente por categoria

---
**Estrutura de dados interna:**
```json
// Como está no banco (Category):
{
  _id: "66b8f1111222233334444555",
  name: "Eletrônicos",
  status: true,
  products: [
    { _id: false, productId: "66b8f1234567890123456789" }, // ← ObjectId ref
    { _id: false, productId: "66b8f9876543210987654321" }  // ← ObjectId ref
  ]
}

// Após populate (dados completos):
{
  name: "Eletrônicos",
  products: [
    {
      _id: "66b8f1234567890123456789",  // ← Dados completos do produto
      name: "Notebook Dell",
      imageUrl: "https://...",
      price: 1500.99,
      // ... outros campos selecionados
    }
  ]
}
```