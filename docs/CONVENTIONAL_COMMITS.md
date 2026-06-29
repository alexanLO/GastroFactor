# Guia de Conventional Commits

Este documento padroniza mensagens de commit no projeto.

## Objetivo

- deixar o historico claro
- facilitar code review
- permitir changelog e release notes consistentes
- reduzir ruido de commits genericos

## Formato padrao

Use este formato:

`tipo(escopo-opcional): descricao curta no imperativo`

Exemplos:

- `feat(auth): adiciona refresh automatico de token`
- `fix(recipe): corrige mapeamento de preparationMethods`
- `refactor(notification): simplifica fluxo de render de toast`
- `docs(api): atualiza contrato de logout e refresh`

## Tipos de commit

### feat

Quando usar:

- nova funcionalidade para usuario
- novo endpoint consumido pelo front
- nova tela/componente com comportamento novo

Exemplos:

- `feat(ui): adiciona toast com acao de tentar novamente`
- `feat(auth): implementa envio de bearer token via interceptor`

### fix

Quando usar:

- bug corrigido
- regressao funcional
- problema de contrato entre front e back

Exemplos:

- `fix(auth): corrige logout com Authorization header`
- `fix(recipe): ajusta parse numerico no payload de ingredientes`

### refactor

Quando usar:

- melhora de estrutura interna sem mudar comportamento funcional
- extracao de metodos e limpeza de codigo

Exemplos:

- `refactor(notification): separa classificacao de erro por tipo`
- `refactor(recipe): centraliza funcoes de mapeamento ui-api`

### docs

Quando usar:

- alteracao de README/docs/guias
- exemplos de uso e contrato

Exemplos:

- `docs(api): documenta retorno UUID no POST /v1/recipes`
- `docs(contrib): adiciona guia de conventional commits`

### test

Quando usar:

- novos testes
- ajuste de testes por mudanca de contrato

Exemplos:

- `test(auth): valida logout chamando endpoint do backend`
- `test(recipe): atualiza expectativas do mapeamento de resposta`

### chore

Quando usar:

- tarefas tecnicas sem mudanca de regra de negocio
- ajustes de tooling e manutencao geral

Exemplos:

- `chore(deps): atualiza dependencias de desenvolvimento`
- `chore(scripts): organiza comandos de qualidade`

### ci

Quando usar:

- mudancas em pipelines, workflows e gates

Exemplos:

- `ci(workflow): adiciona execucao de testes no pull request`

## Escopo (opcional, recomendado)

Escopos comuns neste projeto:

- `auth`
- `recipe`
- `calculator`
- `notification`
- `api`
- `docs`
- `ci`

## Regras praticas

- mensagem curta e objetiva (ideal ate 72 caracteres na linha de titulo)
- use verbo no imperativo: adiciona, corrige, remove, atualiza
- evite commit misturando front e back no mesmo repositorio
- prefira commits pequenos e revisaveis

## Breaking changes

Quando houver quebra de contrato, use `!` apos o tipo/escopo:

- `feat(api)!: altera payload de refresh token`

No corpo do commit, detalhe o impacto e migracao.

## Modelo rapido

Titulo:

`tipo(escopo): descricao`

Corpo (opcional):

- contexto
- o que mudou
- impacto/risco

Rodape (opcional):

- issue/PR relacionada (`Refs #123`)
