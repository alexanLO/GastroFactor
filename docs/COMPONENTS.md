# Componentes

Resumo dos componentes relevantes no estado atual do projeto.

## Layout global

### NavbarComponent

Arquivo: `src/app/component/navbar/navbar.component.ts`

Responsabilidade:

- navegacao principal
- acao de abrir login
- acao de logout

Observacoes:

- usa `AuthService`
- emite eventos para login e registro
- utiliza `RouterLink` e `RouterLinkActive`

### FooterComponent

Arquivo: `src/app/component/footer/footer.component.ts`

Responsabilidade:

- rodape visual da aplicacao

## Componentes de ficha tecnica

### CardDetailsComponent

Arquivo: `src/app/component/card-details/card-details.component.ts`

Responsabilidade:

- capturar nome, imagem, rendimento e categoria
- expor esses dados via `getDetails()`

### TableIngredientsComponent

Arquivo: `src/app/component/table-ingredients/table-ingredients.component.ts`

Responsabilidade:

- manter lista editavel de ingredientes
- adicionar/remover linhas
- reindexar ids apos remocoes

Observacao:

- o estado inicial possui tres linhas vazias com ids sequenciais

### CardNutritionalComponent

Arquivo: `src/app/component/card-nutritional/card-nutritional.component.ts`

Responsabilidade:

- capturar calorias, proteina, gordura total e carboidratos
- expor valores via `getNutritional()`

### PreparationMethodComponent

Arquivo: `src/app/component/preparation-method/preparation-method.component.ts`

Responsabilidade:

- manter lista editavel de passos
- adicionar, editar, confirmar e remover passos
- renumerar ids automaticamente

### CalcularDialog

Arquivo: `src/app/component/calcular-dialog/calcular-dialog.ts`

Responsabilidade:

- exibir resultado do calculo culinario em modal
- emitir evento de fechamento

### RecipeCardComponent

Arquivo: `src/app/component/recipe-card/recipe-card.component.ts`

Responsabilidade:

- renderizar receitas a partir do estado de `RecipeService`
- consumir a lista reativa convertida em signal

## Paginas

### MainScreen

Arquivo: `src/app/pages/main-screen/main-screen.ts`

Responsabilidade:

- tela publica inicial
- envio do calculo culinario
- orquestracao dos modais de login e registro

### MyCollection

Arquivo: `src/app/pages/my-collection/my-collection.ts`

Responsabilidade:

- carregar receitas ao iniciar
- abrir/fechar modal de nova ficha tecnica
- manter signal de horario atual

### TechnicalSpecification

Arquivo: `src/app/pages/technical-specification/technical-specification.ts`

Responsabilidade:

- orquestrar os componentes filhos da ficha tecnica
- salvar receita com `RecipeService`
- exportar PDF com `PdfExportService`
- importar imagem via `FileReader`

Observacoes:

- evita duplo submit com `isSaving`
- mostra sucesso/erro com `NotificationService`

## Autenticacao

### LoginPageComponent

Arquivo: `src/app/features/auth/pages/login/login-page.component/login-page.component.ts`

Responsabilidade:

- login reativo
- validacao de formulario
- feedback visual de sucesso/erro

### RegisterComponent

Arquivo: `src/app/features/auth/pages/register/register.component.ts`

Responsabilidade:

- cadastro reativo
- validacao de senha e confirmacao
- feedback visual de sucesso/erro
