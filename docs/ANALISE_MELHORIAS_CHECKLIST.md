# Analise Tecnica e Checklist de Melhorias - GastroFactor

Este documento consolida os principais pontos de melhoria identificados no projeto, com foco em confiabilidade, manutencao, seguranca e experiencia do usuario.

## Resumo Executivo

- Build principal gera com sucesso em producao.
- Existem riscos funcionais importantes no fluxo HTTP e tratamento de erro.
- Ha inconsistencias de configuracao/documentacao que aumentam custo de manutencao.
- A base esta evoluindo bem, mas precisa de reforco em testes e tipagem estrita para escalar com seguranca.

## Evidencias Principais

- Interceptor de erro existe, mas nao esta integrado ao pipeline do HttpClient: src/app/core/interceptors/api-error.interceptor.ts e src/app/app.config.ts
- Erro de interpolacao de string no interceptor: src/app/core/interceptors/api-error.interceptor.ts
- Configuracao homologation referencia arquivo inexistente: angular.json aponta para src/environments/environment.hom.ts
- README menciona scripts/estrutura desatualizados em alguns pontos: README.md
- Uso recorrente de any em servicos/componentes: src/app/core/services/pdf-export.service.ts, src/app/component/preparation-method-component/preparation-method-component.ts
- Especificacao de teste inicial desatualizada para titulo da aplicacao: src/app/app.spec.ts
- Warnings de dependencia CommonJS no build (canvg/jspdf/html2canvas)

## Checklist de Melhorias

### Prioridade P0 - Corrigir risco funcional imediato

- [x] Conectar interceptor de erro ao HttpClient em src/app/app.config.ts (com withInterceptors ou withInterceptorsFromDi).
- [x] Corrigir mensagem de erro no interceptor em src/app/core/interceptors/api-error.interceptor.ts (template string invalida).
- [x] Remover ou ajustar configuracao homologation em angular.json para nao apontar para src/environments/environment.hom.ts inexistente.
- [x] Revisar fluxo de erro com feedback para usuario sem uso de alert em producao.

### Prioridade P1 - Qualidade de codigo e arquitetura

- [x] Eliminar tipos any em src/app/core/services/pdf-export.service.ts.
- [x] Eliminar tipos any em src/app/component/preparation-method-component/preparation-method-component.ts.
- [x] Tipar erros de subscribe em login/registro ao inves de any.
- [x] Substituir nested subscribe por operadores RxJS (switchMap, concatMap, finalize) em src/app/pages/technical-specification/technical-specification.ts.
- [x] Evitar subscribe sem tratamento de ciclo de vida em src/app/core/services/recipe.service.ts (refreshRecipes).
- [x] Revisar imports nao utilizados em src/app/features/auth/pages/login/login-page.component/login-page.component.ts.
- [x] Padronizar nomenclatura de componentes/pastas para evitar sufixos duplicados e inconsistentes.
- [ ] Revisar separacao de responsabilidades entre pagina e servico no fluxo de salvar receita.

### Prioridade P1 - Seguranca

- [ ] Revisar estrategia de armazenamento de token (localStorage) em src/app/features/auth/services/auth.service.ts.
- [ ] Planejar migracao para cookie HttpOnly + refresh token seguro (backend + frontend).
- [ ] Incluir redacao de politica de expiracao/renovacao de sessao e logout global.
- [ ] Avaliar sanitizacao de HTML no fluxo de exportacao PDF.

### Prioridade P2 - UX e observabilidade

- [ ] Trocar console.log e console.error por logger configuravel por ambiente.
- [ ] Substituir alerts por componente de notificacao/toast consistente.
- [ ] Definir padrao de mensagens de erro de API centralizado e amigavel.
- [ ] Melhorar estado de carregamento/sucesso/erro em formularios de login, registro e salvar receita.

### Prioridade P2 - Performance e build

- [ ] Mitigar warnings CommonJS (canvg/rgbcolor/html2canvas) avaliando alternativas ESM ou configuracao apropriada.
- [ ] Definir budget de bundles por rota lazy e monitoramento de regressao de tamanho.
- [ ] Revisar carregamento dinamico de bibliotecas de PDF para reduzir impacto inicial.
- [ ] Definir versao LTS de Node em engines do package.json e adicionar arquivo .nvmrc (ou equivalente).

### Prioridade P2 - Testes e confiabilidade

- [ ] Atualizar teste base em src/app/app.spec.ts para refletir o comportamento real da UI.
- [ ] Criar testes unitarios para src/app/core/services/recipe.service.ts (sucesso e erro).
- [ ] Criar testes unitarios para src/app/features/auth/services/auth.service.ts (login, logout, token).
- [ ] Criar testes para fluxo de salvar receita em src/app/pages/technical-specification/technical-specification.ts.
- [ ] Adicionar metas de cobertura minima e gate de qualidade em CI.

### Prioridade P3 - Documentacao e governanca

- [ ] Atualizar README.md para remover referencias desatualizadas (branch de status, scripts e estrutura).
- [ ] Garantir consistencia entre README.md, docs/ARCHITECTURE.md e estrutura real do src.
- [ ] Criar guia de ambientes (local, homologation, production) com exemplos de baseAddress.
- [ ] Criar guia de contribuicao para padrao de commits, naming e revisao.

### Prioridade P3 - Pipeline e automacao

- [ ] Adicionar script de lint e configuracao ESLint (Angular + TypeScript).
- [ ] Adicionar format check automatizado no CI usando Prettier.
- [ ] Configurar pipeline CI com etapas: install, build, test, lint e cobertura.
- [ ] Publicar checklist de release com validacoes minimas antes de deploy.

## Plano de Execucao Sugerido

- Sprint 1: itens P0 (estabilidade basica e configuracao).
- Sprint 2: itens P1 (tipagem, RxJS, seguranca de autenticacao).
- Sprint 3: itens P2 (UX, observabilidade, performance).
- Sprint 4: itens P3 (documentacao, pipeline e governanca).

## Criterios de Conclusao

- Build sem warnings criticos conhecidos.
- Interceptor global funcionando e erros padronizados.
- Sem uso de any em fluxos core (auth, recipes, pdf).
- Testes cobrindo fluxos de autenticacao e receitas.
- Documentacao consistente com o estado atual do projeto.
