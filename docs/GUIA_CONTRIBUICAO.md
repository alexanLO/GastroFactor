# Guia de Contribuicao

Este guia complementa o `CONTRIBUTING.md` com padroes praticos de commit, naming e revisao.

## Fluxo recomendado

1. Sincronizar branch local com `develop` (ou branch alvo do time).
2. Criar branch de trabalho seguindo o padrao de nome.
3. Implementar mudancas pequenas e incrementais.
4. Validar localmente (`npm run quality:ci`).
5. Abrir PR com descricao objetiva e checklist.

## Padrao de nomes de branch

Formato:

`<tipo>/<escopo>-<descricao-curta>`

Exemplos:

- `feat/pdf-layout-export`
- `fix/auth-token-expiration`
- `refactor/recipe-service-refresh-flow`
- `docs/readme-architecture-sync`
- `test/technical-spec-save-flow`

## Padrao de commit

Formato recomendado (Conventional Commits):

`tipo(escopo): descricao`

Tipos:

- `feat`
- `fix`
- `refactor`
- `docs`
- `test`
- `chore`
- `ci`

Exemplos:

- `feat(auth): adiciona validacao de expiracao de JWT`
- `fix(pdf): evita erro ao exportar com nome vazio`
- `test(recipe): cobre cenarios de erro no save e refresh`
- `ci(quality): adiciona gate de cobertura minima`

## Naming de codigo

- Componentes e classes: `PascalCase`
- Metodos e variaveis: `camelCase`
- Arquivos de componente: `nome-componente.component.ts`
- Páginas standalone: manter nome da pasta com arquivo principal (`main-screen.ts`, `my-collection.ts`)
- Evitar sufixos duplicados e nomes ambiguos

## Checklist de PR

Antes de abrir PR:

- Build passa (`npm run build`)
- Testes passam (`npm run test:ci`)
- Sem arquivos temporarios/artefatos indevidos
- Mudancas documentadas quando alteram comportamento
- Checklist do escopo atualizado (quando aplicavel)

Ao abrir PR:

- Objetivo claro em 1-2 paragrafos
- Lista de mudancas principais
- Evidencias (logs, screenshots, cobertura) quando util
- Riscos e pontos de atencao para reviewer

## Revisao de codigo

Criticos para revisar:

- Regressao funcional
- Seguranca (auth, dados sensiveis)
- Tratamento de erro e mensagens para usuario
- Impacto em performance (bundle/SSR)
- Testes cobrindo fluxo feliz e erro

## Politica de merge

- Nao fazer merge com pipeline vermelho
- Nao ignorar gate de qualidade sem justificativa tecnica
- Preferir squash merge para historico limpo (quando alinhado ao time)
