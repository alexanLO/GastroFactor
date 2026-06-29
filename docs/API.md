# API e Servicos

Este documento descreve os servicos frontend e o contrato esperado com o backend no estado atual do projeto.

## Base de integracao

Os servicos usam `environment.baseAddress` como base e, no fluxo atual, esperam endpoints versionados em `/v1`.

## CalculationService

Arquivo: `src/app/core/services/calculation.service.ts`

Responsabilidade:

- enviar dados de calculo culinario para o backend
- receber pesos bruto, liquido e cozido calculados

Endpoint esperado:

- `POST /v1/calculator`

Payload:

```json
{
  "foodName": "Batata",
  "foodWeight": 1000,
  "typeWeight": "GROSS"
}
```

Resposta esperada:

```json
{
  "foodName": "Batata",
  "grossWeight": 1000,
  "netWeight": 850,
  "cookedWeight": 780
}
```

## RecipeService

Arquivo: `src/app/core/services/recipe.service.ts`

Responsabilidade:

- carregar receitas da API
- consultar receita por id
- salvar, atualizar e remover receitas
- sincronizar a lista em memoria apos mutacoes

Base:

- `GET /v1/recipes`
- `GET /v1/recipes/:id`
- `POST /v1/recipes`
- `PUT /v1/recipes/:id`
- `DELETE /v1/recipes/:id`

Comportamento relevante:

- `loadRecipes()` atualiza o estado interno (`BehaviorSubject`)
- `saveRecipeAndRefresh()` salva e depois recarrega a lista
- `updateRecipe()` e `deleteRecipe()` tambem sincronizam a lista apos a operacao

## AuthService

Arquivo: `src/app/features/auth/services/auth.service.ts`

Responsabilidade:

- login e cadastro
- persistencia local de tokens
- verificacao de expiracao do access token
- logout e abertura/fechamento do modal de login

Endpoints esperados:

- `POST /v1/auth/login`
- `POST /v1/auth/register`

Resposta esperada:

```json
{
  "accessToken": "jwt-access-token",
  "refreshToken": "refresh-token"
}
```

Observacao:

- o projeto ainda utiliza persistencia em `localStorage`
- ha documentacao separada para migracao futura para cookie HttpOnly em [SEGURANCA_AUTH_HTTPONLY.md](./SEGURANCA_AUTH_HTTPONLY.md)

## PdfExportService

Arquivo: `src/app/core/services/pdf-export.service.ts`

Responsabilidade:

- montar uma representacao visual da ficha tecnica
- carregar `jspdf` e `html2canvas` sob demanda
- gerar e baixar o PDF no navegador

Comportamento atual:

- carregamento dinamico e memoizado das dependencias
- notificacao visual em caso de falha
- nome do arquivo baseado no nome da receita

## NotificationService

Arquivo: `src/app/core/services/notification.service.ts`

Responsabilidade:

- exibir toasts simples de sucesso e erro
- padronizar feedback ao usuario sem `alert`

## Tratamento de erro

Arquivo: `src/app/core/interceptors/api-error.interceptor.ts`
Arquivo: `src/app/core/utils/api-error-message.util.ts`

Comportamento:

- erros HTTP passam por interceptor global
- mensagens sao traduzidas para um texto amigavel quando possivel
- logs sao enviados via `NGXLogger`

## Observacoes de contrato

- os exemplos antigos com `/api/recipes`, `alert(...)` e `console.log(...)` nao representam mais o fluxo atual
- o frontend hoje usa `/v1/...`, `NotificationService` e `NGXLogger`
