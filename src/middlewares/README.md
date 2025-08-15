# Middlewares da Aplicação

## Estrutura de Middlewares

### 1. **Middlewares Express** (`validationMiddleware.js`)
- **`validateBody(schema)`** - Valida o corpo da requisição
- **`validateParams(schema)`** - Valida parâmetros da URL
- **`validateQuery(schema)`** - Valida query strings

### 2. **Middlewares de Autenticação** (`authMiddleware.js`)
- **`requireAuth`** - Verifica se o usuário está autenticado
- **`requireAdmin`** - Verifica se o usuário é administrador
- **`requirePermission(permission)`** - Verifica permissão específica

### 3. **Middlewares de Tratamento de Erro** (`errorMiddleware.js`)
- **`mongooseErrorHandler`** - Trata erros do Mongoose
- **`customValidationErrorHandler`** - Trata erros de validação customizados
- **`joiErrorHandler`** - Trata erros de validação Joi
- **`globalErrorHandler`** - Trata todos os outros erros
- **`notFoundHandler`** - Trata rotas não encontradas

## Como Usar

### No Router:
```javascript
const { validateBody, validateParams } = require('../../middlewares/validationMiddleware');
const { requireAuth, requireAdmin } = require('../../middlewares/authMiddleware');

// Middleware de autenticação para todas as rotas
privateRouter.use(requireAuth);
privateRouter.use(requireAdmin);

// Validação específica para cada rota
privateRouter.post('/', validateBody(createSchema), controller.create);
privateRouter.put('/:id', validateBody(updateSchema), controller.update);
```

### No Controller:
```javascript
// Dados já validados pelos middlewares
async function create(req, res, next) {
  try {
    const product = await Product.createProduct(req.body);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error); // Erro será tratado pelo middleware de erro
  }
}
```

## Ordem dos Middlewares

1. **Middlewares globais** (express.json, morgan)
2. **Rotas** (publicRoutes, privateRoutes)
3. **Middlewares de erro** (mongooseErrorHandler, globalErrorHandler)

## Vantagens desta Arquitetura

✅ **Separação de responsabilidades**
✅ **Reutilização de código**
✅ **Tratamento centralizado de erros**
✅ **Validação automática**
✅ **Fácil manutenção**
✅ **Testes isolados**
