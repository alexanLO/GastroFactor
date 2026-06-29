# Arquitetura do GastroFactor

## Visao geral

O frontend segue arquitetura baseada em componentes standalone, com separacao por camadas:

1. Camada de apresentacao: paginas e componentes
2. Camada de aplicacao: servicos de negocio e orquestracao de fluxo
3. Camada de integracao: HttpClient + interceptors

Fluxo tipico:

```text
UI -> Component -> Service -> HTTP -> API
```

## Estrutura real de codigo

```text
src/app/
  app.config.ts
  app.routes.ts
  component/
    calcular-dialog/
    card-details/
    card-nutritional/
    footer/
    navbar/
    preparation-method/
    recipe-card/
    table-ingredients/
  core/
    interceptors/
      api-error.interceptor.ts
    services/
      calculation.service.ts
      notification.service.ts
      pdf-export.service.ts
      recipe.service.ts
    utils/
      api-error-message.util.ts
  features/
    auth/
      guard/
        auth-guard.ts
      pages/
        login/
        register/
      services/
        auth.service.ts
  pages/
    main-screen/
    my-collection/
    technical-specification/
  shared/
    components/
    models/
    styles/
```

## Configuracao da aplicacao

Arquivo: `src/app/app.config.ts`

Pontos principais:

- `provideHttpClient(withInterceptorsFromDi())`
- interceptor global `ApiErrorInterceptor`
- `provideRouter(routes, withViewTransitions())`
- logger via `LoggerModule.forRoot(...)` com nivel por ambiente

## Roteamento

Arquivo: `src/app/app.routes.ts`

- `/gastrofactor`: tela principal
- `/meu-acervo`: colecao (rota protegida por `authGuard`)
- `/sobre`: mesma tela principal (placeholder)

## Servicos centrais

### RecipeService

Responsavel por CRUD e sincronizacao de receitas em memoria.

- `loadRecipes()`
- `refreshRecipes()`
- `getRecipe(id)`
- `saveRecipe(recipe)`
- `saveRecipeAndRefresh(recipe)`
- `updateRecipe(id, recipe)`
- `deleteRecipe(id)`

### AuthService

Responsavel por autenticacao e sessao.

- login e registro
- persistencia de tokens
- validacao de expiracao JWT
- logout e redirecionamentos

### PdfExportService

Responsavel por exportacao de ficha tecnica em PDF.

- import dinamico de `jspdf` e `html2canvas`
- memoizacao de dependencias para evitar overhead repetido
- geracao visual em layout customizado

## Tratamento de erro e observabilidade

- interceptor HTTP com tratamento centralizado de erro
- mensagens amigaveis via utilitario de resolucao de erro
- notificacao visual via `NotificationService`
- logs via `NGXLogger`

## Build e qualidade

### Build

- builder: `@angular/build:application`
- budgets de producao para bundles inicial e lazy
- configuracoes por ambiente em `angular.json`

### Testes

- runner: Karma + Jasmine
- configuracao de cobertura: `karma.conf.cjs`
- script de gate: `npm run quality:ci`

### CI

- workflow: `.github/workflows/ci-quality-gate.yml`
- etapas: install, build, test com cobertura e upload de artefato

## Convencoes atuais

- componentes standalone
- estilo SCSS com include path em `src/app/shared/styles`
- nomenclatura de pastas por contexto funcional
- separacao entre componentes de pagina (`pages/`) e componentes reutilizaveis (`component/` e `shared/components/`)
