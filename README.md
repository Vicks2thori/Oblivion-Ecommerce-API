# 📂 API de Categorias - TCC Oblivion

> **Branch:** `docs/Category-API` | **Status:** 🚧 Em Desenvolvimento

Documentação completa da API de gestão de categorias do e-commerce.

## 🔗 Outras Branchs
- [🏠 **Voltar ao Main**](https://github.com/Vicks2thori/Oblivion-Ecommerce-API/tree/main)
- [🛍️ **Products API**](https://github.com/Vicks2thori/Oblivion-Ecommerce-API/tree/docs/Product-API)
- [🏢 **Enterprise API**](https://github.com/Vicks2thori/Oblivion-Ecommerce-API/tree/docs/Enterprise-API)

## 🧭 Navegação
- [📋 **Endpoints Disponíveis**](#-endpoints-disponíveis)
- [🔓 **Endpoints Públicos**](#-endpoints-publicos)
  - [_**GET** `/api/public/categories/active ✅`_](#get-apipubliccategoriesactive)
- [🔒 **Endpoints Privados**](#-endpoints-privados-admin)
  - [_**POST** `/api/private/categories ✅`_](#post-apiprivatecategories)
  - [_**GET** `/api/private/categories ✅`_](#get-apiprivatecategories)
  - [_**GET** `/api/private/categories/:id ✅`_](#get-apiprivatecategoriesid-)
  - [_**PUT** `/api/private/categories/:id ✅`_](#put-apiprivatecategoriesid-)
  - [_**PUT** `/api/private/categories/:id/delete ✅`_](#put-apiprivatecategoriesiddelete-)
- [📊 **Estrutura do Banco de Dados**](#-estrutura-do-banco-de-dados)

## 📋 **Endpoints Disponíveis**

### 🔓 **Público (E-commerce)**
| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| `GET` | `/api/public/categories/active` | Listar categorias e seus produtos ativos | ✅ |

### 🔒 **Privado (Admin)**
| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| `POST` | `/api/private/categories` | Criar categoria | ✅ |
| `GET` | `/api/private/categories` | Listar todas as categorias | ✅ |
| `GET` | `/api/private/categories/:id` | Buscar categoria por ID | ✅ |
| `PUT` | `/api/private/categories/:id` | Atualizar categoria | ✅ |
| `PUT` | `/api/private/categories/:id/delete` | Arquivar categoria (soft delete) | ✅ |

---
**Diferenças dos endpoint:**
- 🔓 **Público:** Só categorias ativas + produtos ativos
- 🔒 **Privado:** Todas categorias + todos produtos (para gestão)
- 📊 **Admin vê:** Categorias ativas/inativas e produtos vinculados ativos/inativos, timestamps
- 🎯 **Público vê:** Apenas itens disponíveis para compra

## 🌐 Base URLs
- **Produção:** `https://tcc-oblivion.onrender.com`
- **Desenvolvimento:** `http://localhost:3001`


## 🔓 **Endpoints Públicos**

### **GET** `/api/public/categories/ active` ✅
Lista todas as categorias ativas com seus produtos ativos para exibição no e-commerce.

### **💭 Request:**
```http
GET /api/public/categories/active
```

**Headers:** Nenhum necessário

**Query Parameters:** Nenhum

**Body:** Não aplicável

### **💬 Response:**
#### **✔️ Response 200 - Sucesso:**
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": [
    {
      "name": "Eletrônicos",
      "products": [
        {
          "_id": "66b8f1234567890123456789",
          "name": "Smartphone Galaxy",
          "imageUrl": "https://exemplo.com/smartphone.jpg",
          "description": "Smartphone com 128GB de armazenamento",
          "price": 899.99,
          "code": 123456,
          "quantity": 15
        },
        {
          "_id": "66b8f9876543210987654321",
          "name": "Notebook Gamer",
          "imageUrl": "https://exemplo.com/notebook.jpg",
          "description": "Notebook para jogos",
          "price": 2599.99,
          "code": 789456,
          "quantity": 8
        }
      ]
    },
  ]
}
```

#### **❌ Response 500 - Erro:**
```json
{
  "success": false,
  "message": "Erro ao buscar categorias ativas: [detalhes do erro]"
}
```

#### **Observações:**
- 📝 **Apenas categorias ativas não deletadas** (`status: true, deleted: false`)
- 📝 **Apenas produtos ativos e não deletados** (`status: true, deleted: false`)
- 📝 **Não requer autenticação**

## 🔒 **Endpoints Privados**

### **POST** `/api/private/categories`
Cria uma nova categoria no sistema.

### **💭 Request:**
```http
POST /api/private/categories
Content-Type: application/json
Authorization: Bearer {token}
```

**Headers:**
- `Content-Type: application/json` *(obrigatório)*
- `Authorization: Bearer {token}` *(futuro - quando implementar auth)*

**Body Parameters:**
```json
{
  "name": "string",     // Obrigatório: 3-50 caracteres
  "status": "boolean"   // Opcional: default = true
}
```

#### **Exemplos de Request:**

**Exemplo 1 - Categoria ativa (status omitido):**
```json
{
  "name": "Brincos Dourados"
}
```

**Exemplo 2 - Categoria inativa:**
```json
{
  "name": "Categoria Sazonal",
  "status": false
}
```

**Exemplo 3 - Categoria ativa (status explícito):**
```json
{
  "name": "Novidades 2024",
  "status": true
}
```
---
### **💬 Responses:**
#### **✔️ Response 200 - Sucesso:**
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": {
    "_id": "66b8f1111222233334444555",
    "name": "Brincos Dourados",
    "status": true,
    "products": [],
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
    "Nome é obrigatório",
    "Nome deve ter um mínimo de 3 caracteres"
  ]
}
```

#### **❌ Response 500 - Erro Interno:**
```json
{
  "success": false,
  "message": "Erro ao criar categoria: [detalhes do erro]"
}
```

#### **Validações:**
- 📝 **name:** Obrigatório, string, 3-50 caracteres
- 📝 **status:** Opcional, boolean, default = `true`
---

### **GET** `/api/private/categories` ✅
Lista todas as categorias (ativas/inativas) com seus produtos (ativos/inativos) para administração.

### **💭 Request:**
```http
GET /api/private/categories
Authorization: Bearer {token}
```

**Headers:**
- `Authorization: Bearer {token}` *(futuro)*

**Query Parameters:** Nenhum

**Body:** Não aplicável

---
### **💬 Response:**
#### **✔️ Response 200 - Sucesso:**
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": [
    {
      "_id": "66b8f1111222233334444555",
      "name": "Eletrônicos",
      "status": true,
      "products": [
        {
          "_id": "66b8f1234567890123456789",
          "name": "Smartphone Galaxy",
          "imageUrl": "https://exemplo.com/smartphone.jpg",
          "description": "Smartphone com 128GB",
          "price": 899.99,
          "code": 123456,
          "quantity": 15,
          "status": true
        },
        {
          "_id": "66b8f9999888877776666555",
          "name": "Tablet Antigo",
          "imageUrl": "https://exemplo.com/tablet.jpg", 
          "description": "Tablet descontinuado",
          "price": 299.99,
          "code": 111222,
          "quantity": 2,
          "status": false
        }
      ],
      "createdAt": "2024-08-10T08:00:00.000Z",
      "updatedAt": "2024-08-15T14:30:00.000Z"
    },
    {
      "_id": "66b8f2222333344445555666",
      "name": "Categoria Desativada",
      "status": false,
      "products": [],
      "createdAt": "2024-08-12T10:00:00.000Z",
      "updatedAt": "2024-08-14T16:20:00.000Z"
    }
  ]
}
```

#### **❌ Response 500 - Erro:**
```json
{
  "success": false,
  "message": "Erro ao buscar todas as categorias: [detalhes do erro]"
}
```

#### **Observações:**
- 📝 **Todas as categorias** (ativas e inativas, não deletadas)
- 📝 **Todos os produtos** (ativos e inativos, não deletados)
- 📝 **Ordenado por nome** da categoria
- 📝 **Inclui timestamps** de criação e atualização
- 📝 **Dados completos** para administração
---

### **GET** `/api/private/categories/:id` ✅
Busca uma categoria específica por ID para edição/visualização.

#### **💭 Request:**
```http
GET /api/private/categories/{categoryId}
Authorization: Bearer {token}
```

**Headers:**
- `Authorization: Bearer {token}` *(futuro)*

**Path Parameters:**
- `categoryId` *(obrigatório)*: ObjectId da categoria (24 caracteres hexadecimais)

**Body:** Não aplicável

#### **Exemplo:**
```http
GET /api/private/categories/66b8f1111222233334444555
```
---
### **💬 Response:**

#### **✔️ Response 200 - Sucesso:**
```json
{
  "success": true,
  "message": "Categoria encontrada",
  "data": {
    "_id": "66b8f1111222233334444555",
    "name": "Eletrônicos",
    "status": true,
    "products": [
      {
        "_id": "66b8f1234567890123456789",
        "name": "Smartphone Galaxy",
        "price": 899.99,
        "quantity": 15,
        "status": true
      }
    ],
    "deleted": false,
    "createdAt": "2024-08-10T08:00:00.000Z",
    "updatedAt": "2024-08-15T14:30:00.000Z"
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
  "message": "Categoria não encontrada"
}
```

#### **❌ Response 500 - Erro:**
```json
{
  "success": false,
  "message": "Erro ao buscar categoria: [detalhes do erro]"
}
```

---

### **PUT** `/api/private/categories/:id` ✅
Atualiza uma categoria existente (nome, status, produtos vinculados).

### **💭 Request:**
```http
PUT /api/private/categories/{categoryId}
Content-Type: application/json
Authorization: Bearer {token}
```

**Headers:**
- `Content-Type: application/json` *(obrigatório)*
- `Authorization: Bearer {token}` *(futuro)*

**Path Parameters:**
- `categoryId` *(obrigatório)*: ObjectId da categoria

**Body Parameters:**
```json
{
  "name": "string",        // Opcional: 3-50 caracteres
  "status": "boolean",     // Opcional: true/false
  "products": [            // Opcional: array de produtos
    {
      "productId": "string"  // ObjectId do produto (24 chars hex)
    }
  ],
  "deleted": "boolean"     // Opcional: soft delete (use archive endpoint)
}
```

#### **Exemplos de Request:**

**Exemplo 1 - Atualizar apenas nome:**
```json
{
  "name": "Eletrônicos Premium"
}
```

**Exemplo 2 - Desativar categoria:**
```json
{
  "status": false
}
```

**Exemplo 3 - Adicionar produtos à categoria:**
```json
{
  "products": [
    { "productId": "66b8f1234567890123456789" },
    { "productId": "66b8f9876543210987654321" }
  ]
}
```

**Exemplo 4 - Atualização completa:**
```json
{
  "name": "Tecnologia Avançada",
  "status": true,
  "products": [
    { "productId": "66b8f1234567890123456789" }
  ]
}
```
---
### **💬 Response:**
#### **✔️ Response 200 - Sucesso:**
```json
{
  "success": true,
  "data": {
    "_id": "66b8f1111222233334444555",
    "name": "Eletrônicos Premium",
    "status": true,
    "products": [
      {
        "_id": "66b8f1234567890123456789",
        "productId": "66b8f1234567890123456789"
      }
    ],
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
    "Nome deve ter um mínimo de 3 caracteres",
    "productId deve ser um ObjectId válido"
  ]
}
```

#### **⁉️ Response 404 - Não Encontrada:**
```json
{
  "success": false,
  "message": "Erro ao atualizar categoria: Categoria não encontrada"
}
```

#### **❌ Response 500 - Erro:**
```json
{
  "success": false,
  "message": "Erro ao atualizar categoria: [detalhes do erro]"
}
```

#### **Validações:**
- 📝 **name:** Opcional, 3-50 caracteres, único se fornecido
- 📝 **status:** Opcional, boolean
- 📝 **products:** Opcional, array de ObjectIds válidos
- 📝 **Mínimo 1 campo** obrigatório para atualização
- 📝 **Máximo 4 campos** por request
---

### **PUT** `/api/private/categories/:id/delete` ✅
Arquiva uma categoria (soft delete) removendo-a das consultas de endpoints.

### **💭 Request:**
```http
PUT /api/private/categories/{categoryId}/delete
Authorization: Bearer {token}
```

**Headers:**
- `Authorization: Bearer {token}` *(futuro)*

**Path Parameters:**
- `categoryId` *(obrigatório)*:

### **💬 Response:**
#### **✔️ Response 200 - Sucesso:**
```json
{
  "success": true,
  "data": {
    "_id": "66b8f1111222233334444555",
    "name": "Eletrônicos Premium",
    "status": true,
    "deleted": true,
    "createdAt": "2024-08-10T08:00:00.000Z",
    "updatedAt": "2024-08-15T15:45:00.000Z"
  }
}
```

## **📊 Estrutura do Banco de Dados:**
```json
// Category Schema:
{
  _id: ObjectId,
  name: String,
  status: Boolean,
  products: [
    {
      _id: false,                    // ← Desabilitado para subdocument
      productId: ObjectId           // ← Referência para Product
    }
  ],
  deleted: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### **🔄 Como Funciona o Populate:**
1. **Categoria tem array** `products: [{ productId: ObjectId }]`
2. **Populate busca** dados completos em `Product` collection
3. **Mongoose substitui** ObjectId pelos dados do produto
4. **Match filtra** produtos conforme regras (ativo/inativo)
5. **Select escolhe** quais campos retornar

### **💡 Vantagens desta Abordagem:**
- 📝 **Performance:** Busca eficiente com índices
- 📝 **Flexibilidade:** Diferentes views (público/admin)
- 📝 **Consistência:** Relacionamento bidirecional
- 📝 **Manutenibilidade:** Fácil adicionar/remover produtos

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

// Após populate:
{
  name: "Eletrônicos",
  products: [
    {
      _id: "66b8f1234567890123456789",  // ← Dados completos do produto
      name: "Smartphone Galaxy",
      imageUrl: "https://...",
      price: 899.99,
      // ... outros campos selecionados
    }
  ]
}
```