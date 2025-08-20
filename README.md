# 📂 API de Empresa - TCC Oblivion

> **Branch:** `docs/Enterprise-API` | **Status:** 📑 Em Revisão

Documentação completa da API de gestão de configurações das informações da empresa do e-commerce.

## 🔗 Outras Branchs
- [🏠 **Voltar ao Main**](https://github.com/Vicks2thori/Oblivion-Ecommerce-API/tree/main)
- [📩 **Category API**](https://github.com/Vicks2thori/Oblivion-Ecommerce-API/tree/docs/Category-API)
- [🛍️ **Product API**](https://github.com/Vicks2thori/Oblivion-Ecommerce-API/tree/docs/Product-API)

## 🧭 Navegação
- [📊 **Estrutura do Banco de Dados**](#-estrutura-do-banco-de-dados)
- [📋 **Endpoints Disponíveis**](#-endpoints-disponíveis)
- [🔓 **Endpoints Públicos**](#-endpoints-publicos)
  - [_**GET** `/api/public/enterprise ✅`_](#get-apipubliccategoriesactive)
- [🔒 **Endpoints Privados**](#-endpoints-privados-admin)
  - [_**GET** `/api/private/enterprise ✅`_](#get-apiprivatecategories)
  - [_**PUT** `/api/private/enterprise ✅`_](#put-apiprivatecategoriesiddelete-)
- [🔧 **Unicidade da empresa**](#-unicidade-da-empresa)

## **📊 Estrutura do Banco de Dados:**
```json
// Category Schema:
{
  _id: ObjectId,
  singleton: String, // Obrigatório
  name: String,      // Obrigatório
  logoUrl: Boolean,  // Obrigatório
  phone: String,     // Obrigatório
  instagram: String, // Opcional
  facebook: String,  // Opcional
  email: String,     // Opcional
  createdAt: Date,   
  updatedAt: Date    
}
```

## 📋 **Endpoints Disponíveis**

### 🔓 **Público (E-commerce)**
| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| `GET` | `/api/public/enterprise` | Lista informações da empresa | 📑 |

### 🔒 **Privado (Admin)**
| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| `GET` | `/api/private/enterprise` | Lista todas as informações da empresa | 📑 |
| `PUT` | `/api/private/enterprise` | Atualizar informações da empresa | 📑 |

---
**Diferenças dos endpoint:**
- 🔓 **Público:** Apenas lista informações da empresa
- 🔒 **Privado:** Lista e edita informações da empresa
- 📊 **Admin vê:** Informações da empresa, timestamps
- 🎯 **Público vê:** Apenas informações da empresa

## 🌐 Base URLs
- **Produção:** `https://tcc-oblivion.onrender.com`
- **Desenvolvimento:** `http://localhost:3001`


## 🔓 **Endpoints Públicos**

### **GET** `/api/public/enterprise` ✅
Lista todas as informações da empresa.

### **💭 Request:**
```http
GET /api/public/enterprise
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
      "name": "Oblivion",
      "logoUrl": "https://www.oblivion.com.br/logo.png",
      "phone": "10987654321",
      "instagram": "https://www.instagram.com/oblivion",
      "facebook": "https://www.facebook.com/oblivion",
      "email": "obvlivion@gmail.com"
    }
  ]
}
```

#### **❌ Response 500 - Erro:**
```json
{
  "success": false,
  "message": "Erro ao buscar empresa: [detalhes do erro]"
}
```

#### **Observações:**
- 📝 **Não requer autenticação**

## 🔒 **Endpoints Privados**

### **GET** `/api/private/enterprise` ✅
Lista a informação da empresa.

### **💭 Request:**
```http
GET /api/private/enterprise
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
      "name": "Oblivion",
      "logoUrl": "https://www.oblivion.com.br/logo.png",
      "phone": "10987654321",
      "instagram": "https://www.instagram.com/oblivion",
      "facebook": "https://www.facebook.com/oblivion",
      "email": "obvlivion@gmail.com"
    }
  ]
}
```

#### **❌ Response 500 - Erro:**
```json
{
  "success": false,
  "message": "Erro ao buscar empresa: [detalhes do erro]"
}
```

#### **Observações:**
- 📝 **Inclui timestamps** de criação e atualização

### **PUT** `/api/private/enterprise` ✅
Atualiza as informações da empresa.

### **💭 Request:**
```http
PUT /api/private/enterprise
Content-Type: application/json
Authorization: Bearer {token}
```

**Headers:**
- `Content-Type: application/json` *(obrigatório)*
- `Authorization: Bearer {token}` *(futuro)*

**Body Parameters:**
```json
{
  "name": "string",        // Opcional: 3-50 caracteres
  "logoUrl": "string",     // Opcional: 5-255 caracteres
  "phone": "sring",        // Opcional: 11 caracteres numéricos
  "instagram": "string",   // Opcional: 1-30 caracteres (será adcionado o link)
  "facebook": "string",    // Opcional: 5-50 caracteres (será adicionado o link)
  "email": "string"        // Opcional: 6-50 caracteres
}
```

#### **Exemplos de Request:**

**Exemplo 1 - Atualizar apenas nome e logo:**
```json
{
  "name": "Atelie da Josi",
  "logoUrl": "https://www.oblivion.com.br/logoatelie.png"
}
```

**Exemplo 2 - Atualizar apenas informações de contato:**
```json
{
  "phone": "11999999999",
  "email": "ateliedajosi@hotmail.com"
}
```

**Exemplo 3 - Atualizar apenas redes sociais:**
```json
{
  "instagram": "ateliedadonajosi",
  "facebook": "ateliedadonajosi"
}
```

**Exemplo 4 - Atualização completa:**
```json
{
  "name": "Atelie da Josi",
  "logoUrl": "https://www.oblivion.com.br/logoatelie.png",
  "phone": "11999999999",
  "instagram": "ateliedadonajosi",
  "facebook": "ateliedadonajosi",
  "email": "ateliedajosi@hotmail.com"
}
```
---
### **💬 Response:**
#### **✔️ Response 200 - Sucesso:**
```json
{
  "success": true,
  "data": {
    "singleton": "8c2b018b50142069da87094e",
    "name": "Atelie da Josi",
    "logoUrl": "https://www.oblivion.com.br/logoatelie.png",
    "phone": "11999999999",
    "instagram": "https://www.instagram.com/ateliedadonajosi",
    "facebook": "https://www.facebook.com/ateliedadonajosi",
    "email": "ateliedajosi@hotmail.com",
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
    "name: obrigatório, minimo 2 caracteres, maximo 50 caracteres", "logoUrl: obrigatório, minimo 2 caracteres, maximo 255 caracteres", "phone: obrigatório, tamanho de 11 caracteres", "instagram: minimo 1 caracter, maximo 30 caracteres", "facebook: minimo de 5 caracteres, maximo 50 caracteres", "email: minimo 6 caracteres, maximo 50 caracteres"
  ]
}
```

#### **❌ Response 500 - Erro:**
```json
{
  "success": false,
  "message": "Erro ao atualizar empresa: [detalhes do erro]"
}
```

#### **Validações:**
- 📝 **singleton:** Obrigatório, unico, imutavel, string
- 📝 **name:** Obrigatório, 3-50 caracteres, único se fornecido
- 📝 **logoUrl:** Obrigatório, 2-255 caracteres
- 📝 **phone:** Obrigatório, 11 caracteres numéricos
- 📝 **instagram:** Opcional, 1-30 caracteres
- 📝 **facebook:** Opcional, 5-50 caracteres
- 📝 **email:** Opcional, 6-50 caracteres
- 📝 **Mínimo 1 campo** obrigatório para atualização
- 📝 **Máximo 6 campos** por request
---


### **💡 Vantagens desta Abordagem:**
- 📝 **Performance:** Busca eficiente com índices
- 📝 **Flexibilidade:** Diferentes views (público/admin)
- 📝 **Consistência:** Relacionamento bidirecional
- 📝 **Manutenibilidade:** Fácil adicionar/remover produtos

## **🔧 Unicidade da empresa:**

### **🗳️ Criação Automática:**
- **Sistema cria automaticamente** uma única instância da empresa na primeira inicialização
- **Campo `singleton`** garante que existe apenas um registro de empresa
- **Não é possível criar** múltiplas empresas no sistema

### **🎯 Uso do Singleton:**
- **Identificador único** para a empresa (ex: `8c2b018b50142069da87094e`)
- **Imutável** - não pode ser alterado após criação
- **Referência estável** para todas as operações de empresa

### **💡 Vantagens do Singleton:**
- **📊 Consistência:** Sempre uma única fonte de verdade para dados da empresa
- **🔒 Segurança:** Evita duplicação e inconsistências de dados
- **⚡ Performance:** Busca direta sem necessidade de filtros complexos
- **🛠️ Simplicidade:** Lógica simples para gerenciar configurações da empresa