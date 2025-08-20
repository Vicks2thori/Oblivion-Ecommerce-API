# 🛒 E-commerce Backend - Sistema de Gestão

> **Projeto de TCC** - Backend para sistema de e-commerce com retaguarda para gerenciar pedidos.

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.7+-blue.svg)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.18+-black.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Índice

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [🏗️ Arquitetura do Sistema](#️-arquitetura-do-sistema)
- [🚀 Como Executar](#-como-executar)
- [📚 Documentação da API](#-documentação-da-api)
- [🗂️ Estrutura de Pastas](#️-estrutura-de-pastas)
- [🔧 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📊 Engenharia de Requisitos Funcionais](#-engenharia-de-requisitos-funcionais)
- [📈 Histórico de Commits](#-histórico-de-commits)
- [📌 Boas Práticas](#-boas-práticas-do-projeto)
- [🤝 Contribuição](#-contribuição)
- [🎯 Diferencial do Projeto](#-diferencial-do-projeto)
- [👨‍💻 Autor](#-autor)

## 📋 Documentação APIs

- [📩 **Category API**](https://github.com/Vicks2thori/Oblivion-Ecommerce-API/tree/docs/Category-API)
- [🗳️ **Product API**](https://github.com/Vicks2thori/Oblivion-Ecommerce-API/tree/docs/Product-API)

## 🎯 Sobre o Projeto

Este é um **sistema de vitrine digital** desenvolvido como projeto de TCC, focado em **pequenas lojas** que desejam ingressar no mercado digital. O sistema oferece uma **API robusta** para criar sites de demonstração de produtos onde clientes podem visualizar catálogos e solicitar pedidos. A retaguarda permite gestão simples de produtos, estoque e personalização básica do site, com um **gerenciador de pedidos estilo Kanban** para controle eficiente das vendas.

### 🎯 **Público-Alvo**
- **Pequenas lojas** que querem presença digital
- **Empreendedores** iniciando no e-commerce
- **Negócios locais** buscando expandir vendas
- **Lojistas** que preferem gestão simples e direta

### ✨ Características Principais

- **🛍️ Vitrine Digital** - Site de demonstração de produtos para clientes
- **📋 Gerenciador Kanban** - Sistema de pedidos estilo Kanban para controle de vendas
- **⚙️ Retaguarda Simples** - Painel administrativo intuitivo para pequenas lojas
- **💳 Configuração de Pagamentos** - Definição de métodos e condições (sem integração)
- **📦 Gestão de Estoque** - Controle simples de produtos e movimentações
- **🏢 Personalização Básica** - Configurações da empresa e customização do site

## 🏗️ Arquitetura do Sistema

### 🎨 Padrão Arquitetural

O projeto segue uma **arquitetura modular** bem estruturada:

```
┌────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                     │
├────────────────────────────────────────────────────────────┤
│   Routes (Public/Private) │  Controllers  │  Middlewares   │
├────────────────────────────────────────────────────────────┤
│                       BUSINESS LAYER                       │
├────────────────────────────────────────────────────────────┤
│      Services  │  DTOs  │  Utils  │  Validation (Joi)      │
├────────────────────────────────────────────────────────────┤
│                         DATA LAYER                         │
├────────────────────────────────────────────────────────────┤
│        Entities (Mongoose)  │  Database Connection         │
└────────────────────────────────────────────────────────────┘
```

### 🔄 Fluxo de Dados

1. **Request** → Routes → Controllers
2. **Controllers** → Services (lógica de negócio)
3. **Services** → Dtos → Entities (persistência)
4. **Response** ← Controllers ← Services

## 🚀 Como Executar

### 📋 Pré-requisitos

- **Node.js** 16.0.0 ou superior
- **MongoDB** local ou MongoDB Atlas
- **Git** para clonar o repositório

### 🛠️ Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/Vicks2thori/Oblivion-Ecommerce-API
cd Oblivion-Ecommerce-API

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações

# 4. Executar o projeto
npm run dev    # Desenvolvimento
npm start      # Produção
```

### ⚙️ Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/database

# Servidor
PORT=3000
NODE_ENV=development

# Segurança
JWT_SECRET=sua_chave_secreta_muito_segura
JWT_EXPIRES_IN=7d

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_app
```

## 📚 Documentação da API

### 🔗 Endpoints Disponíveis

- **🌐 Público**: `http://localhost:3000/api/public`
- **🔒 Privado**: `http://localhost:3000/api/private`
- **📖 Swagger**: `http://localhost:3000/api-docs`

### 📖 Swagger UI

A documentação interativa da API está disponível através do Swagger, permitindo:
- Visualizar todos os endpoints
- Testar requisições diretamente
- Ver schemas de dados
- Entender parâmetros e respostas

## 🗂️ Estrutura de Pastas

```
src/
├── 📁 config/                
│   └── swagger.js            # Configuração do Swagger
│
├── 📁 model/                 
│   └── database.js           # Conexão com MongoDB
│
├── 📁 modules/               # Módulos da aplicação
│   ├── 📁 order/             # Gestão de pedidos
│   ├── 📁 category/          # Categorias de produtos
│   ├── 📁 product/           # Produtos
│   ├── 📁 payment/           # Métodos de pagamento
│   ├── 📁 payment_condition/ # Condições de pagamento
│   ├── 📁 stock_category/    # Categorias de estoque
│   ├── 📁 stock_movement/    # Movimentações de estoque
│   ├── 📁 enterprise/        # Gestão da empresa
│   ├── 📁 site/              # Configurações de estilo do site
│   └── 📁 user/              # Gestão de usuários (admins/clients)
│
├── 📁 routes/                 # Definição de rotas
│   ├── publicRoutes.js        # Rotas públicas (clients)
│   ├── privateRoutes.js       # Rotas privadas (admins)
│   └── responseHelpers.js     # Helpers de resposta
│
└── server.js                  # Ponto de entrada da aplicação
```

### 🎯 Padrão de Módulos

```
│   ├── 📁 entity/            # Nome da Entidade
│   │   ├── entityController.js
│   │   ├── entityDto.js
│   │   ├── entityEntity.js
│   │   ├── entityRouter.js
│   │   ├── entityService.js
│   │   └── entityUtils.js     # Arquivo esporádico
```

*Para uma melhor análise das entidades recomenda-se seguir esta **ordem de inspeção de arquivos**:
`Entity` → `DTO` → `Utils` → `Service` → `Controller` → `Router`.*

Cada módulo segue uma estrutura consistente:
- **Entity**: Modelo de dados (Mongoose)
- **DTO**: Transferência de dados entre camadas (Joi)
- **Utils**: Funções auxiliares normalmente ligadas a relacionamentos
- **Service**: Contém a lógica de negócio
- **Controller**: Recebe requisições e retorna respostas (Express)
- **Router**: Definição das rotas clients e admins do módulo

## 🔧 Tecnologias Utilizadas

### 🚀 **Backend**
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB

### 🛡️ **Segurança & Validação**
- **Joi** - Validação de dados

### 📊 **Monitoramento & Logs**
- **Morgan** - Logs de requisições HTTP

### 🔧 **Desenvolvimento**
- **Nodemon** - Reinicialização automática em desenvolvimento
- **Git** - Controle de versão
- **npm** - Gerenciador de pacotes
- **Swagger** - Documentação da API

## 📊 Engenharia de Requisitos Funcionais

### 🛍️ **Vitrine Digital**
- [x] Catálogo de produtos
- [x] Sistema de categorias
- [x] Site de demonstração
- [x] Aba de pedidos

### ⚙️ **Retaguarda**
- [x] Painel administrativo simples
- [x] Gestão de produtos e categorias
- [x] Controle de estoque básico
- [x] Configurações da empresa
- [x] Personalização do site

### 💳 **Pagamentos**
- [x] Configuração de métodos
- [x] Definição de condições
- [x] **Sem integração real** (apenas configuração)

### 📦 **Estoque**
- [x] Categorias de estoque
- [x] Movimentações de entrada/saída/definição

### 📋 **Pedidos**
- [x] Gerenciador estilo Kanban
- [x] Controle de status de vendas

## 📈 Histórico de Commits

### 🎯 **Estrutura de Commits**
O projeto segue uma convenção de commits bem definida:

```
feat: ✨ Nova funcionalidade
fix: 🐛 Correção de bug
docs: 📚 Documentação
style: 🎨 Formatação de código
refactor: ♻️ Refatoração
test: 🧪 Testes
chore: 🔧 Configurações e dependências
```

### 🌿 **Branches Temáticas**
Cada situação possui uma branch dedicada:
- `feat/Entity(module)`: Definições gerais da estrutura
- `feat/Referecing-Entity&Entity`: Relacionamento entre as entidades
- `feat/Entity/Function`: Novas funcionalidades (Ex: `feat/Product/zero-stock-block`)

> **💡 Dica**: Branches são mescladas em `main` após conclusão e mantidas como **histórico de evolução**.

## 📌 **Boas Práticas do Projeto**

### ✏️ **Padrão de Commits**
- **Formato**: `tipo(escopo): descrição`
- **Exemplos**:
  - `feat(productDto): Adicionado min/max requisições no Schema`
  - `fix(orderUtills): Corrige cálculo de total do pedido`
  - `docs(main:README): Atualiza instruções de instalação`
  - `style(Category): Implementação Clean Code`

### 🌿 **Estratégia de Branches**
- **`main`**: Código estável e testado
- **`feat/Entity`**: Novas entidades ou módulos
- **`feat/Entity/Function`**: Funcionalidades específicas
- **`fix/Entity`**: Correções de bugs
- **`docs/Entity`**: Documentação específica

### 🔄 **Fluxo de Desenvolvimento**
1. **Criar branch** temática para a feature
2. **Desenvolver** seguindo padrões estabelecidos
3. **Testar** funcionalidade implementada
4. **Commit** com mensagem clara
5. **Pull Request** para `main`
6. **Code Review** e aprovação
7. **Merge** e manutenção da branch

## 🤝 Contribuição

### 📝 **Como Contribuir**

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feat/Entity/Function`)
3. **Commit** suas mudanças (`git commit -m 'feat(escopo): Descrição'`)
4. **Push** para a branch (`git push origin feat/Entity/Function`)
5. **Abra** um Pull Request

### 📋 **Padrões de Código**

- Siga o padrão de **commits** estabelecido
- Mantenha a **arquitetura modular**
- Documente novas funcionalidades

## 🎯 **Diferencial do Projeto**

### 🚀 **Por que uma Vitrine Digital?**
- **Simplicidade**: Sem complexidade de integrações de pagamento
- **Acessibilidade**: Ideal para pequenas lojas iniciantes no comércio digital
- **Controle**: Gestão direta via WhatsApp (mais pessoal)
- **Custo**: Solução econômica para presença digital
- **Flexibilidade**: Personalização básica sem complicações

### 📱 **Fluxo de Venda**
1. **Cliente** visualiza produtos na vitrine
2. **Interesse** em produto específico
3. **Solicita** via plataforma o pedido
4. **Lojista** gerencia pedido no Kanban e acerta com o cliente (via numero disponivel no pedido)
5. **Acompanhamento** do status da venda

## 👨‍💻 Autor

**Victoria Riso** - Desenvolvedora 

- 📧 Email: devvicrisosan@gmail.com
- 🔗 LinkedIn: https://www.linkedin.com/in/victoria-riso-santana-441b0a337/
- 🐙 GitHub: https://github.com/Vicks2thori

### 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.