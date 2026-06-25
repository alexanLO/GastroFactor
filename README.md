# 🍽️ GastroFactor - Ficha Técnica de Receitas

[![Angular](https://img.shields.io/badge/Angular-21-dd0031?style=flat-square&logo=angular)](https://angular.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=flat-square)](https://github.com/alexanLO/GastroFactor/tree/feature/desen-atividas)

Aplicação web moderna para criação, edição e gerenciamento de fichas técnicas de receitas culinárias. Desenvolvida com **Angular 21** e **TypeScript**, oferece uma interface intuitiva e responsiva para chefs e cozinheiros profissionais.

## 📋 Sumário

- [Visão Geral](#-visão-geral)
- [Recursos Principais](#-recursos-principais)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Execução](#-execução)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Documentação](#-documentação)
- [Integração com Backend](#-integração-com-backend)
- [Design System](#-design-system)
- [Contribuição](#-contribuição)

## 🎯 Visão Geral

**GastroFactor** é uma plataforma para padronização de receitas profissionais. Permite que cozinheiros criem fichas técnicas detalhadas com dados completos sobre ingredientes, informações nutricionais e modo de preparo. O projeto também funciona como portfólio profissional da desenvolvedora.

**Status**: 🚧 Em Desenvolvimento (Branch: `feature/desen-atividas`)

## 🚀 Recursos Principais

### 1. **Dashboard de Coleção** (`my-collection`)

- ✅ Visualização de todas as receitas salvas
- ✅ Cards com preview de receitas
- ✅ Status da conta (plano, armazenamento utilizado)
- ✅ Filtro e busca rápida
- ✅ Acesso rápido às receitas favoritas

### 2. **Editor de Fichas Técnicas** (`technical-specification`)

- ✅ Interface intuitiva em modal (não redireciona)
- ✅ Preenchimento de dados básicos (nome, categoria, rendimento)
- ✅ Tabela interativa de ingredientes
- ✅ Campo de valores nutricionais editáveis
- ✅ Método de preparo com passos numerados

### 3. **Funcionalidades de Dados**

- ✅ **Salvar**: Envia todos os dados para o backend
- ✅ **Exportar PDF**: Gera PDF profissional com formatação elegante
- ✅ Suporte a múltiplas páginas automáticas
- ✅ Download automático com nome da receita

### 4. **Autenticação e Segurança**

- 🔐 Sistema de login/registro
- 🔐 Guards de rota para proteção
- 🔐 Interceptadores para tratamento de erros
- 🔐 Token baseado em JWT (para implementar)

## 📦 Pré-requisitos

- **Node.js**: v18 ou superior
- **npm**: v9 ou superior
- **Angular CLI**: v21 (`npm install -g @angular/cli@21`)
- **Git**: Para versionamento

## 🔧 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/alexanLO/GastroFactor.git
cd GastroFactor
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Instalar dependências para PDF (já incluídas)

```bash
npm install jspdf html2canvas
```

## 🎮 Execução

### Desenvolvimento Local

```bash
npm start
# ou
ng serve
```

Acesse: http://localhost:4200

O aplicativo recarrega automaticamente ao modificar arquivos.

### Build para Produção

```bash
npm run build
# ou
ng build --configuration production
```

Arquivos gerados em: `dist/GastroFactor`

### Testes Unitários

```bash
npm test
```

### Server-Side Rendering (SSR)

```bash
npm run build:ssr
npm run serve:ssr:GastroFactor
```

## 📁 Estrutura do Projeto

```text
src/app/
├── core/                          # Serviços e lógica global (singleton)
│   ├── interceptors/
│   │   └── api-error.interceptor.ts
│   └── services/
│       ├── recipe.service.ts      # CRUD de receitas
│       ├── pdf-export.service.ts  # Exportação de PDF
│       └── calculation.service.ts
│
├── shared/                        # Reutilizáveis em todo o app
│   ├── components/
│   ├── models/                    # Interfaces TypeScript
│   ├── styles/                    # SCSS global (variáveis, mixins)
│   └── directives/
│
├── features/                      # Módulos por funcionalidade
│   └── auth/                      # Autenticação
│       ├── pages/
│       ├── services/
│       └── guards/
│
├── pages/                         # Páginas principais
│   ├── my-collection/             # Dashboard de receitas
│   ├── technical-specification/   # Editor de fichas
│   └── main-screen/
│
├── component/                     # Componentes de layout global
│   ├── navbar/
│   ├── footer/
│   ├── table-ingredients/         # Tabela de ingredientes
│   ├── card-details-component/    # Dados básicos da receita
│   ├── card-nutritional/          # Valores nutricionais
│   ├── preparation-method-component/  # Modo de preparo
│   └── ...
│
├── env/                           # Configurações por ambiente
│   ├── environment.ts
│   ├── environment.prod.ts
│   ├── environment.hom.ts
│   └── environment.local.ts
│
├── app.routes.ts                  # Rotas principais
├── app.config.ts                  # Configuração da aplicação
├── main.ts                        # Ponto de entrada
└── main.server.ts                 # SSR Entry
```

## 🏗️ Arquitetura

### Padrões Implementados

1. **Standalone Components**: Sem NgModules
2. **Signals**: (em preparação)
3. **Lazy Loading**: Rotas com carregamento tardio
4. **Smart/Dumb Components**: Separação clara de responsabilidades
5. **RxJS**: Reactive programming com Observables

### Fluxo de Dados

```text
User Interaction
      ↓
Component Method
      ↓
Service (RecipeService)
      ↓
HTTP Call / API
      ↓
Backend
      ↓
Response
      ↓
State Update
      ↓
Template Change
```

## 🔌 Integração com Backend

### Endpoints Necessários

Seu backend deve fornecer os seguintes endpoints:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/recipes` | Criar nova receita |
| GET | `/api/recipes` | Listar todas as receitas |
| GET | `/api/recipes/:id` | Obter uma receita |
| PUT | `/api/recipes/:id` | Atualizar receita |
| DELETE | `/api/recipes/:id` | Deletar receita |

### Formato de Dados Esperado

```typescript
interface RecipeData {
  details: {
    name: string;              // Ex: "Costela 48h Braseada"
    servings: number;          // Ex: 12
    category: string;          // "Entrada", "Prato Principal", "Sobremesa"
  };
  ingredients: Array<{
    name: string;
    netWeight: string;         // Peso líquido
    correctionFactor: string;  // Fator de correção
    grossWeight: string;       // Peso bruto
    cookingFactor: string;     // Fator de cocção
    totalQuantity: string;     // Quantidade total
  }>;
  nutritional: {
    calories: string;          // Ex: "642 kcal"
    protein: string;           // Ex: "42g"
    totalFat: string;          // Ex: "38g"
    carbs: string;             // Ex: "12g"
  };
  preparationMethod: Array<{
    id: string;                // Número do passo
    title: string;             // Título do passo
    description: string;       // Descrição detalhada
  }>;
}
```

### Exemplo de Requisição

```typescript
// recipe.service.ts
saveRecipe(recipe: RecipeData): Observable<any> {
  return this.http.post(`${this.apiUrl}`, recipe);
}
```

## 🎨 Design System

### Cores Principais

```scss
$primary: #ff6b35;              // Laranja (principal)
$primary-container: #ffdcc8;    // Laranja claro
$secondary: #d0bcff;            // Roxo
$surface: #1a1a1a;              // Fundo escuro
$surface-container: #2d2d2d;    // Cinza escuro
$on-surface: #ffffff;           // Texto branco
$on-surface-variant: #c4c7c5;   // Texto cinza
```

### Tipografia

- **Serif Font**: Para títulos e destaques (`font-serif`)
- **Sans Font**: Para corpo de texto (`font-sans`)

Consulte `src/app/shared/styles/_variables.scss` para referência completa.

## 📱 Responsividade

Otimizado para múltiplos dispositivos:

- 📱 **Mobile**: 320px - 768px
- 💻 **Tablet**: 768px - 1024px
- 🖥️ **Desktop**: 1024px+

Utiliza CSS Grid e Flexbox para layouts adaptativos.

## 📚 Documentação

### Documentos Principais

1. **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Estrutura detalhada e padrões
2. **[COMPONENTS.md](./docs/COMPONENTS.md)** - Guia de componentes
3. **[API.md](./docs/API.md)** - Documentação de serviços
4. **[DATA_MODELS.md](./docs/DATA_MODELS.md)** - Estrutura de dados
5. **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Como contribuir

## 🔐 Autenticação

Sistema baseado em JWT:

```typescript
// Fluxo
1. Usuário faz login
2. Backend retorna token
3. Token armazenado em localStorage
4. Requisições incluem: Authorization: Bearer <token>
```

## 🧪 Testes

```bash
# Executar testes
npm test

# Cobertura de testes
npm test -- --code-coverage
```

## 🤝 Contribuição

### Como Contribuir

1. **Fork** o projeto
2. **Clone** seu fork: `git clone https://github.com/seu-usuario/GastroFactor.git`
3. **Crie uma branch**: `git checkout -b feature/sua-feature`
4. **Commit**: `git commit -m 'Descreve a mudança'`
5. **Push**: `git push origin feature/sua-feature`
6. **Abra um Pull Request**

### Padrões de Código

- ✅ TypeScript Strict Mode
- ✅ Formatter: Prettier
- ✅ Linter: ESLint
- ✅ Idioma: Português

## 🐛 Reportar Bugs

Abra uma [Issue](https://github.com/alexanLO/GastroFactor/issues) com:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Ambiente (SO, navegador, versões)

## 💡 Sugestões

Ideias são bem-vindas! Abra uma issue com o label `enhancement`.

## 📄 Licença

MIT License - veja [LICENSE](./LICENSE)

## 👨‍💻 Autor

**Alexandra** - [@alexanLO](https://github.com/alexanLO)

## 🙏 Agradecimentos

- Angular Team
- Comunidade Angular Brasil
- Contribuidores

---

**Versão**: 0.0.0  
**Última Atualização**: Junho 2026  
**Status**: 🚧 Em Desenvolvimento
