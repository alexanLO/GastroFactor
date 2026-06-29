# Monitoramento de Bundle Size

Este documento define como monitorar regressao de tamanho de bundles no build de producao.

## Scripts

- `npm run build:stats`: gera build de producao com arquivo `dist/GastroFactor/stats.json`.
- `npm run perf:bundle:report`: imprime o comparativo atual vs baseline.
- `npm run perf:bundle:check`: falha com exit code 1 quando algum bundle cresce acima do limite permitido.

## Baseline versionada

Arquivo: `tools/perf/bundle-size-baseline.json`

Campos principais:

- `maxRegressionPercent`: percentual maximo de crescimento permitido (atual: 10%).
- `bundles`: tamanhos base (em bytes) dos bundles monitorados.

## Bundles monitorados

- `main`
- `jspdf-es-min`
- `html2canvas`
- `index`
- `purify-es-mjs`

## Fluxo recomendado (local/CI)

1. Executar `npm run build:stats`.
2. Executar `npm run perf:bundle:check`.
3. Se falhar por crescimento esperado, revisar impacto e atualizar baseline com criterio tecnico.

## Observacao

Os budgets de producao em `angular.json` tambem foram reforcados para `main`, `jspdf-es-min`, `html2canvas` e `index`, complementando o check de regressao.

## Otimizacao aplicada no PDF

O servico `PdfExportService` foi ajustado para:

- Carregar `jspdf` e `html2canvas` em paralelo com `Promise.all`.
- Reutilizar uma promise memoizada entre exportacoes para evitar overhead repetido de resolucao de modulos.
- Manter as bibliotecas fora do bundle inicial, preservando o carregamento lazy.
