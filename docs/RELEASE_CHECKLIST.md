# Checklist de Release

Checklist minimo para aprovar deploy com risco controlado.

## 1. Qualidade de codigo

- [ ] `npm ci` executado sem erros
- [ ] `npm run format:check` sem divergencias
- [ ] `npm run lint` sem erros bloqueantes
- [ ] `npm run build` com sucesso
- [ ] `npm run test:ci` com sucesso e cobertura acima do threshold

## 2. Regressao funcional

- [ ] Fluxo de login validado
- [ ] Fluxo de cadastro validado
- [ ] Fluxo de salvar receita validado
- [ ] Fluxo de exportar PDF validado
- [ ] Tela de colecao carregando receitas normalmente

## 3. Performance e bundle

- [ ] `npm run build:stats` executado
- [ ] `npm run perf:bundle:check` sem regressao acima do limite
- [ ] Budgets de producao sem violacoes

## 4. Ambientes e configuracao

- [ ] `baseAddress` correto para ambiente alvo
- [ ] Variaveis/segredos conferidos no ambiente de deploy
- [ ] Versao Node alinhada ao `.nvmrc`

## 5. Governanca de release

- [ ] PR revisado e aprovado
- [ ] CI principal verde
- [ ] Notas de release atualizadas
- [ ] Plano de rollback definido
