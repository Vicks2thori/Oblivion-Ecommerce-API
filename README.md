# 📂 API de Usuários - TCC Oblivion

> **Branch:** `docs/Users-API` | **Status:** 🚧 Em Desenvolvimento

Documentação completa da API de gestão de produtos do e-commerce.

## 🔗 Outras Branchs
- [🏠 **Voltar ao Main**](https://github.com/Vicks2thori/Oblivion-Ecommerce-API/tree/main)
- [📩 **Category API**](https://github.com/Vicks2thori/Oblivion-Ecommerce-API/tree/docs/Category-API)
- [📩 **Product API**](https://github.com/Vicks2thori/Oblivion-Ecommerce-API/tree/docs/Product-API)

## 🧭 Navegação
- [📊 **Estrutura do Banco de Dados**](#-estrutura-do-banco-de-dados)
- [📋 **Endpoints Disponíveis**](#-endpoints-disponíveis)
- [🔒 **Endpoints Publicos**](#-endpoints-publicos)
  - [_**POST** `/api/private/products 🚧`_](#post-apiprivateproducts)
  - [_**GET** `/api/private/products/:id 🚧`_](#get-apiprivateproductid-)
  - [_**PUT** `/api/private/products/:id 🚧`_](#put-apiprivateproductid-)
  - [_**PUT** `/api/private/products/:id/delete 🚧`_](#put-apiprivateproductsiddelete-)
- [🔒 **Endpoints Privados**](#-endpoints-privados-admin)
  - [_**POST** `/api/private/products 🚧`_](#post-apiprivateproducts)
  - [_**GET** `/api/private/products/:id 🚧`_](#get-apiprivateproductid-)
  - [_**PUT** `/api/private/products/:id 🚧`_](#put-apiprivateproductid-)
  - [_**PUT** `/api/private/products/:id/delete 🚧`_](#put-apiprivateproductsiddelete-)
- [🔄 **Como Funciona o Relacionamento**](#-como-funciona-o-relacionamento)

## **📊 Estrutura do Banco de Dados:**
```json
// Product Schema:
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  //Embending (admin/client)
  adminDetails: {
    status: Boolean
  }
  clientDetails: {
    cpf: String
    cell: String
  }
}
```


## 📋 **Endpoints Disponíveis**

### 🔓 **Publico (Client)**
| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| `POST` | `/api/public/clients` | Criar clientes | 🚧 |
| `GET` | `/api/private/clients/:id` | Buscar cliente por ID | 🚧 |
| `PUT` | `/api/private/clients/:id` | Atualizar cliente | 🚧 |
| `PUT` | `/api/private/clients/:id/delete` | Arquivar cliente (soft delete) | 🚧 |

### 🔒 **Privado (Admin)**
| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| `POST` | `/api/private/admins` | Criar administradores | ✅ |
| `GET` | `/api/private/admins/` | Buscar todos os admins | ✅ |
| `GET` | `/api/private/admins/:id` | Buscar admin por ID | ✅ |
| `PUT` | `/api/private/admins/:id` | Atualizar admin | ✅ |
| `PUT` | `/api/private/admins/:id/delete` | Arquivar admin (soft delete) | ✅ |

---
**📱 Diferenças dos endpoint:**
- **🔓 Público:** Só é possivel CRUD de client (cada cliente é responsavel por seu gerenciamento) (ex: `/api/public/client/:id`)
- **🔒 Privado:** Só é possivel CRUD de admins (modifica e visualiza todos) (ex: `/api/private/admins`)
- **🎯 Vantagem:** Usuários são separados por role em uma mesma entidade, mas compartilham rotas completamente diferentes (publicas e privadas)

## 🌐 Base URLs
- **Produção:** `https://tcc-oblivion.onrender.com`
- **Desenvolvimento:** `http://localhost:3001`

## 🔒 **Endpoints Publicos**

### **POST** `/api/public/client` 🚧
Cria um novo cliente no sistema.

### **💭 Request:**
```http
POST /api/private/client
Content-Type: application/json
Authorization: Bearer {token}
```

**Headers:**
- `Content-Type: application/json` *(obrigatório)*
- `Authorization: Bearer {token}` *(futuro - quando implementar auth)*

**Body Parameters:**
```json
{
  "name": "string",       // Obrigatório: 5-80 caracteres
  "email": "string",      // Obrigatório: 6-50 caracteres, unico
  "password": "string",   // Obrigatório: 8-255 caracteres, o sistema irá gerar um hash (implementação futura)
  "clientDetails": {
    "cpf": "string",      // Obrigatório: 11 caracteres, unico
    "cell": "string"      // Obrigatório: 11 caracteres, unico
  },
}
```

#### **Exemplos de Request:**

**Exemplo 1 - Cliente:**
```json
{
  "name": "João Silva",       
  "email": "joao.silva@gmail.com",      
  "password": "12345678",   
  "clientDetails": {
    "cpf": "12345678900",     
    "cell": "10987654321"     
  }
}
```

**Exemplo 2 - Cliente com dados duplicados**
```json
{
  "name": "João Silva da Rosa",       
  "email": "joao.silva@gmail.com",  //Igual o exemplo 1      
  "password": "12345678",   
  "clientDetails": {
    "cpf": "12345678900",           //Igual o exemplo 1  
    "cell": "10987654321"           //Igual o exemplo 1  
  }
}
```
---
### **💬 Responses:**
#### **✔️ Response 200 - Sucesso:**
```json
//Cliente
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": {
    "_id": "66b8f1234567890123456789",
    "name": "João Silva",       
    "email": "joao.silva@gmail.com",      
    "password": "12345678",   
    "clientDetails": {
      "cpf": "12345678900",     
      "cell": "10987654321"     
  },
    "deleted": false,
    "createdAt": "2024-08-15T10:30:00.000Z",
    "updatedAt": "2024-08-15T10:30:00.000Z"
  }
}
```


#### **❓ Response 400 - Dados Inválidos:**
```json
//Cliente
{
  "success": false,
  "message": "Dados inválidos",
  "errors": [
    "name: é obrigatório, minimo 5 caracteres, maximo 80 caracteres", "email: minimo 6 caracteres, maximo 50", "password: minimo de 8 caracteres, maximo 255", "clientDetails: é obrigatório", "clientDetails.cpf: é obrigatório, tamanho de 11 caracteres", "clientDetails.cell: é obrigatório, tamanho de 11 caracteres"
  ]
}

//Cliente com dados duplicados
{
  "success": false,
  "message": "Dados inválidos",
  "errors": [
    "email: dados duplicados tente login", "clientDetails.cpf: dados duplicados tente login", "clientDetails.cell: dados duplicados tente login"
  ]
}
```

#### **❌ Response 500 - Erro Interno:**
```json
{
  "success": false,
  "message": "Erro ao criar cliente: [detalhes do erro]"
}
```

#### **Validações:**
- 📝 **name:** Obrigatório, string, 3-50 caracteres
- 📝 **email:** obrigatório, string, 6-50 caracteres, unico
- 📝 **password:** obrigatório, string, 8-255 caracteres, default = `generatorHashPassword`
- 📝 **clientDetails:** obrigatório
- 📝 **clientDetails.cpf:** Obrigatório, string, 11 caracteres, unico
- 📝 **clientDetails.cell:** Obrigatório, string, 11 caracteres, unico
---

### **GET** `/api/public/client/:id` 🚧
Busca um cliente específico por ID para edição/visualização.

#### **💭 Request:**
```http
GET /api/public/client/{userId}
Authorization: Bearer {token}
```

**Headers:**
- `Authorization: Bearer {token}` *(futuro)*

**Path Parameters:**
- `userId` *(obrigatório)*: ObjectId do usuário (24 caracteres hexadecimais)

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