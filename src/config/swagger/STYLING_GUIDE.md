# 🎨 Guia de Estilização do Swagger UI

Este guia explica como personalizar e estilizar o Swagger UI para sua API.

## 🏗️ Estrutura Modular

```
src/config/swagger/
├── swagger.json              # Arquivo principal
├── schemas/                  # Schemas por módulo
│   ├── user.json
│   ├── category.json
│   └── product.json
├── paths/                    # Endpoints por módulo
│   ├── userPaths.json
│   ├── categoryPaths.json
│   └── productPaths.json
├── responses/                # Respostas comuns
│   └── commonResponses.json
├── swagger-custom.css        # Estilos personalizados
└── STYLING_GUIDE.md         # Este arquivo
```

## 🎨 Como Estilizar

### 1. **Cores da Marca**
Edite as variáveis CSS no arquivo `swagger-custom.css`:

```css
:root {
  --primary-color: #6366f1;      /* Cor principal */
  --secondary-color: #8b5cf6;    /* Cor secundária */
  --success-color: #10b981;      /* Sucesso */
  --warning-color: #f59e0b;      /* Aviso */
  --error-color: #ef4444;        /* Erro */
}
```

### 2. **Personalizar Header**
```css
.swagger-ui .topbar {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  padding: 20px 0;
}
```

### 3. **Estilizar Endpoints**
```css
.swagger-ui .opblock {
  border-radius: 12px;
  margin: 15px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.swagger-ui .opblock:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}
```

### 4. **Cores por Método HTTP**
```css
.swagger-ui .opblock.opblock-get {
  border-color: var(--success-color);
}

.swagger-ui .opblock.opblock-post {
  border-color: var(--primary-color);
}

.swagger-ui .opblock.opblock-put {
  border-color: var(--warning-color);
}

.swagger-ui .opblock.opblock-delete {
  border-color: var(--error-color);
}
```

## 🚀 Funcionalidades Avançadas

### 1. **Animações**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.swagger-ui .opblock {
  animation: fadeIn 0.5s ease-out;
}
```

### 2. **Hover Effects**
```css
.swagger-ui .opblock:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}
```

### 3. **Responsividade**
```css
@media (max-width: 768px) {
  .swagger-ui .info .title {
    font-size: 2em;
  }
}
```

## 🎯 Como Adicionar Novos Módulos

### 1. **Criar Schema**
```bash
# Criar arquivo de schema
touch src/config/swagger/schemas/product.json
```

### 2. **Criar Paths**
```bash
# Criar arquivo de paths
touch src/config/swagger/paths/productPaths.json
```

### 3. **Atualizar Arquivo Principal**
```json
{
  "components": {
    "schemas": {
      "$ref": "./schemas/user.json",
      "$ref": "./schemas/product.json"
    }
  },
  "paths": {
    "$ref": "./paths/userPaths.json",
    "$ref": "./paths/productPaths.json"
  }
}
```

## 🔧 Configurações do Servidor

### 1. **Importar CSS**
```javascript
const fs = require('fs');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: fs.readFileSync('./src/config/swagger/swagger-custom.css', 'utf8'),
  // outras opções...
}));
```

### 2. **Opções do Swagger**
```javascript
swaggerOptions: {
  docExpansion: 'list',        // Expandir todos os endpoints
  filter: true,                // Habilitar filtro
  showRequestHeaders: true,    // Mostrar headers
  tryItOutEnabled: true        // Habilitar teste
}
```

## 🎨 Temas Disponíveis

### 1. **Tema Claro (Padrão)**
- Fundo branco
- Cores vibrantes
- Sombras suaves

### 2. **Tema Escuro**
```css
.swagger-ui.dark-theme {
  background: var(--dark-bg);
  color: white;
}
```

## 📱 Responsividade

O CSS já inclui:
- Breakpoints para mobile
- Ajustes de tamanho
- Layout adaptativo
- Scrollbars personalizadas

## 🚀 Dicas de Performance

1. **Minificar CSS** em produção
2. **Usar variáveis CSS** para consistência
3. **Lazy loading** para módulos grandes
4. **Cache** para arquivos estáticos

## 🔍 Debugging

### 1. **Verificar Console**
- Abrir DevTools
- Verificar erros CSS
- Testar responsividade

### 2. **Testar Diferentes Navegadores**
- Chrome/Edge
- Firefox
- Safari

## 📚 Recursos Adicionais

- [Swagger UI CSS Classes](https://swagger.io/docs/open-source-tools/swagger-ui/customization/theme/)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

## 🎯 Próximos Passos

1. **Personalizar cores** da sua marca
2. **Adicionar logo** no header
3. **Criar temas** específicos
4. **Implementar modo escuro**
5. **Adicionar animações** personalizadas



