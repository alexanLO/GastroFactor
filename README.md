# GastroFactor

Aplicacao web Angular para criacao e gerenciamento de fichas tecnicas de receitas.

## Stack

- Angular 21 (standalone components)
- TypeScript 5
- RxJS 7
- NGX Logger
- jsPDF + html2canvas (carregamento dinamico)

## Requisitos

- Node.js 22.12.x (LTS) (veja `.nvmrc`)
- npm 10+

## Inicio rapido

```bash
git clone https://github.com/alexanLO/GastroFactor.git
cd GastroFactor
npm ci
npm start
```

Aplicacao local: `http://localhost:4200`

## Scripts disponiveis

- `npm start`: servidor local (dev)
- `npm run build`: build de producao
- `npm run build:stats`: build com `stats.json` para analise de bundles
- `npm test`: testes unitarios (modo padrao)
- `npm run test:ci`: testes headless com cobertura
- `npm run quality:ci`: gate local de qualidade (build + cobertura)
- `npm run perf:bundle:report`: relatorio de bundles vs baseline
- `npm run perf:bundle:check`: falha se houver regressao de tamanho acima do limite
- `npm run serve:ssr:GastroFactor`: executa artefato SSR em `dist/GastroFactor/server/server.mjs`

## Ambientes

Arquivos em `src/environments/`:

- `environment.ts`
- `environment.local.ts`
- `environment.hom.ts`
- `environment.prod.ts`

Configuracoes no `angular.json`:

- `build:production`
- `build:homologation`
- `build:local`

Consulte o guia de ambientes em [docs/AMBIENTES.md](docs/AMBIENTES.md).

## Estrutura atual do projeto

```text
src/
  app/
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
      services/
      utils/
    features/
      auth/
        guard/
        pages/
        services/
    pages/
      main-screen/
      my-collection/
      technical-specification/
    shared/
      components/
      models/
      styles/
  environments/
```

## Rotas principais

Definidas em `src/app/app.routes.ts`:

- `/gastrofactor`
- `/meu-acervo` (protegida por `authGuard`)
- `/sobre` (placeholder)

## Qualidade e CI

- Budgets de bundle de producao configurados em `angular.json`
- Monitoramento de regressao de bundle em `tools/perf/`
- Gate de cobertura em `karma.conf.cjs`
- Workflow de CI em `.github/workflows/ci-quality-gate.yml`

## Documentacao

Indice completo: [docs/INDEX.md](docs/INDEX.md)

Documentos principais:

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/API.md](docs/API.md)
- [docs/DATA_MODELS.md](docs/DATA_MODELS.md)
- [docs/AMBIENTES.md](docs/AMBIENTES.md)
- [docs/GUIA_CONTRIBUICAO.md](docs/GUIA_CONTRIBUICAO.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)

## Licenca

MIT. Veja [LICENSE](LICENSE).
