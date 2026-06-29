# 📚 Índice de Documentação

Guia completo para navegar pela documentação do GastroFactor.

## 🗂️ Estrutura de Documentação

```text
GastroFactor/
├── README.md                    # Visão geral e início rápido
├── CONTRIBUTING.md              # Como contribuir
├── docs/
│   ├── INDEX.md                 # Este arquivo
│   ├── QUICKSTART.md            # Começar em 5 minutos
│   ├── ARCHITECTURE.md          # Estrutura do projeto
│   ├── COMPONENTS.md            # Guia de componentes
│   ├── API.md                   # Serviços e endpoints
│   ├── DATA_MODELS.md           # Modelos de dados
│   ├── ANALISE_MELHORIAS_CHECKLIST.md # Análise técnica e checklist de melhorias
│   ├── SEGURANCA_AUTH_HTTPONLY.md # Migração de autenticação para cookie HttpOnly
│   ├── AMBIENTES.md             # Guia de ambientes e baseAddress
│   ├── GUIA_CONTRIBUICAO.md     # Guia prático de commits, naming e revisão
│   ├── RELEASE_CHECKLIST.md     # Checklist mínimo antes de deploy
│   ├── performance/
│   │   └── BUNDLE_MONITORING.md # Monitoramento de regressão de tamanho de bundles
│   └── TROUBLESHOOTING.md       # Problemas e soluções
```

---

## 📖 Documentos por Tema

### 🚀 **Começar do Zero**

1. **[README.md](../README.md)** (5 min)
   - O que é GastroFactor
   - Recursos principais
   - Instalação básica
   - Execução rápida

2. **[QUICKSTART.md](./QUICKSTART.md)** (5 min)
   - Setup em 5 minutos
   - Comandos essenciais
   - Estrutura de pastas
   - Dicas iniciais

### 🏗️ **Entender a Arquitetura**

3. **[ARCHITECTURE.md](./ARCHITECTURE.md)** (15 min)
   - Estrutura de pastas detalhada
   - Padrões de design (Smart/Dumb)
   - Camadas de abstração
   - Fluxo de dados
   - Princípios SOLID

### 🧩 **Trabalhar com Componentes**

4. **[COMPONENTS.md](./COMPONENTS.md)** (20 min)
   - Guia de cada componente
   - Props e eventos
   - Exemplos de uso
   - Como criar novos componentes
   - Padrões de integração

### 🔌 **Integrar com Backend**

5. **[API.md](./API.md)** (25 min)
   - RecipeService completo
   - PdfExportService
   - Todos os endpoints necessários
   - Exemplos de requisições
   - Tratamento de erros
   - Autenticação JWT

### 📊 **Estrutura de Dados**

6. **[DATA_MODELS.md](./DATA_MODELS.md)** (15 min)
   - Interfaces TypeScript
   - Validações
   - Transformações de dados
   - Enumerações e constantes
   - Exemplos completos

7. **[ANALISE_MELHORIAS_CHECKLIST.md](./ANALISE_MELHORIAS_CHECKLIST.md)** (20 min)
   - Diagnóstico técnico atual
   - Lista priorizada de melhorias
   - Checklist por área (P0 a P3)
   - Plano sugerido por sprint

8. **[SEGURANCA_AUTH_HTTPONLY.md](./SEGURANCA_AUTH_HTTPONLY.md)** (20 min)
   - Plano de migração para cookie HttpOnly
   - Mudanças frontend e backend
   - Política de expiração e logout global
   - Checklist de rollout seguro

9. **[AMBIENTES.md](./AMBIENTES.md)** (10 min)
   - Mapeamento de ambientes e fileReplacements
   - Exemplos de baseAddress
   - Boas práticas de configuração

10. **[GUIA_CONTRIBUICAO.md](./GUIA_CONTRIBUICAO.md)** (10 min)
   - Padrão de branch e commits
   - Checklist de PR
   - Critérios de revisão

11. **[RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md)** (5 min)
   - Validações mínimas de release
   - Itens de qualidade, regressão e rollback

12. **[performance/BUNDLE_MONITORING.md](./performance/BUNDLE_MONITORING.md)** (10 min)
   - Budgets de bundles monitorados
   - Scripts de relatório e validação
   - Baseline versionada e política de regressão

### 🤝 **Contribuir com Código**

13. **[CONTRIBUTING.md](../CONTRIBUTING.md)** (10 min)
   - Código de Conduta
   - Como reportar bugs
   - Padrões de código
   - Processo de PR
   - Checklist de qualidade

### 🔧 **Resolver Problemas**

14. **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** (20 min)
   - Problemas comuns e soluções
   - Perguntas frequentes
   - Debugging
   - Otimização
   - Testes

---

## 🎯 Guias por Perfil

### 👨‍💼 **Para Product Managers**

Leia nesta ordem:

1. [README.md](../README.md) - Visão geral
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - Estrutura técnica
3. [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Problemas

**Tempo**: ~20 minutos

---

### 👨‍💻 **Para Desenvolvedores Frontend (Novos)**

Leia nesta ordem:

1. [QUICKSTART.md](./QUICKSTART.md) - Setup rápido
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - Estrutura
3. [COMPONENTS.md](./COMPONENTS.md) - Componentes
4. [CONTRIBUTING.md](../CONTRIBUTING.md) - Como contribuir
5. [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Quando travar

**Tempo**: ~1 hora

---

### 👨‍💻 **Para Desenvolvedores Frontend (Experientes)**

Leia:

1. [ARCHITECTURE.md](./ARCHITECTURE.md) - Contexto rápido
2. [COMPONENTS.md](./COMPONENTS.md) - Referência
3. [DATA_MODELS.md](./DATA_MODELS.md) - Estrutura
4. [CONTRIBUTING.md](../CONTRIBUTING.md) - Padrões

**Tempo**: ~30 minutos

---

### 🛠️ **Para Desenvolvedores Backend**

Leia nesta ordem:

1. [README.md](../README.md) - Visão geral
2. [API.md](./API.md) - Endpoints necessários
3. [DATA_MODELS.md](./DATA_MODELS.md) - Estrutura de dados
4. [ARCHITECTURE.md](./ARCHITECTURE.md) - Fluxo geral

**Tempo**: ~40 minutos

---

### 🧪 **Para QA/Testers**

Leia:

1. [QUICKSTART.md](./QUICKSTART.md) - Como rodar localmente
2. [COMPONENTS.md](./COMPONENTS.md) - O que testar
3. [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Problemas esperados
4. [README.md](../README.md) - Features principais

**Tempo**: ~30 minutos

---

### 📚 **Para Documentadores**

Leia:

1. [CONTRIBUTING.md](../CONTRIBUTING.md) - Padrões
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - Estrutura técnica
3. [README.md](../README.md) - Exemplo de boa documentação

**Tempo**: ~20 minutos

---

## 🔗 Relacionamentos entre Documentos

```text
README.md (visão geral)
    ↓
    ├─→ QUICKSTART.md (setup rápido)
    ├─→ ARCHITECTURE.md (estrutura detalhada)
    └─→ CONTRIBUTING.md (como contribuir)

ARCHITECTURE.md (estrutura)
    ↓
    ├─→ COMPONENTS.md (componentes específicos)
    ├─→ DATA_MODELS.md (estrutura de dados)
    └─→ TROUBLESHOOTING.md (problemas comuns)

COMPONENTS.md (componentes)
    ↓
    ├─→ API.md (como usar serviços)
    └─→ DATA_MODELS.md (tipos de dados)

API.md (serviços)
    ↓
    └─→ DATA_MODELS.md (estrutura esperada)

CONTRIBUTING.md (padrões)
    ↓
    ├─→ ARCHITECTURE.md (padrões de código)
    ├─→ COMPONENTS.md (padrões de componentes)
    └─→ DATA_MODELS.md (padrões de tipos)

TROUBLESHOOTING.md (problemas)
    ↓
    └─→ Qualquer documento específico
```

---

## 📋 Checklist de Leitura

### Antes de Começar

- [ ] Ler [README.md](../README.md)
- [ ] Ler [QUICKSTART.md](./QUICKSTART.md)
- [ ] Instalar dependências: `npm install`
- [ ] Rodar localmente: `npm start`

### Antes de Modificar Código

- [ ] Entender [ARCHITECTURE.md](./ARCHITECTURE.md)
- [ ] Conhecer o componente em [COMPONENTS.md](./COMPONENTS.md)
- [ ] Verificar tipos em [DATA_MODELS.md](./DATA_MODELS.md)
- [ ] Rever padrões em [CONTRIBUTING.md](../CONTRIBUTING.md)

### Antes de Submeter PR

- [ ] Code review contra [CONTRIBUTING.md](../CONTRIBUTING.md)
- [ ] Testes passando: `npm test`
- [ ] Build funciona: `npm run build`
- [ ] Documentação atualizada
- [ ] Sem conflitos com `main`

### Se Tiver Problema

- [ ] Buscar em [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- [ ] Verificar console do navegador (F12)
- [ ] Ler logs: `ng serve --verbose`
- [ ] Abrir Issue no GitHub

---

## 🎓 Exemplos Rápidos

### Exemplo 1: Criar um novo componente

```bash
# 1. Ler estrutura
# Consulte: ARCHITECTURE.md (onde colocar)
# Consulte: COMPONENTS.md (como estruturar)

# 2. Gerar componente
ng generate component component/meu-botao

# 3. Implementar
# Consulte: CONTRIBUTING.md (padrões de código)
# Consulte: DATA_MODELS.md (tipos de dados)

# 4. Testar
npm test

# 5. Documentar
# Consulte: COMPONENTS.md (adicionar seção)
```

---

### Exemplo 2: Adicionar funcionalidade de backend

```bash
# 1. Entender fluxo
# Consulte: ARCHITECTURE.md (camadas de dados)
# Consulte: API.md (endpoints necessários)

# 2. Criar serviço
ng generate service core/services/meu-servico

# 3. Implementar
# Consulte: DATA_MODELS.md (interfaces)
# Consulte: CONTRIBUTING.md (padrões)

# 4. Adicionar em componente
# Consulte: COMPONENTS.md (como injetar)

# 5. Testar e documentar
# Consulte: API.md (adicionar documentação)
```

---

### Exemplo 3: Debugar um problema

```bash
# 1. Procurar solução
# Consulte: TROUBLESHOOTING.md

# 2. Se não encontrar
# - Verificar console (F12)
# - Ler logs: ng serve --verbose

# 3. Procurar em documentação específica
# - ARCHITECTURE.md (entendimento geral)
# - COMPONENTS.md (se é componente)
# - API.md (se é serviço/HTTP)

# 4. Se ainda não resolver
# - Abrir Issue no GitHub
```

---

## 🔄 Fluxo de Desenvolvimento Recomendado

```text
1. QUICKSTART.md (5 min)
   ↓
2. ARCHITECTURE.md (15 min)
   ↓
3. Escolher tipo de trabalho:
   ├─→ Componente? → COMPONENTS.md
   ├─→ Serviço? → API.md
   ├─→ Dados? → DATA_MODELS.md
   └─→ Contribuir? → CONTRIBUTING.md
   ↓
4. Implementar
   ↓
5. Problema? → TROUBLESHOOTING.md
   ↓
6. Submeter PR
   ↓
7. Code Review contra CONTRIBUTING.md
```

---

## 📞 Quando Consultar Cada Documento

| Pergunta                      | Documento          |
| ----------------------------- | ------------------ |
| "Como começo?"                | QUICKSTART.md      |
| "Qual é a estrutura?"         | ARCHITECTURE.md    |
| "Como usar este componente?"  | COMPONENTS.md      |
| "Como fazer requisição HTTP?" | API.md             |
| "Qual tipo usar?"             | DATA_MODELS.md     |
| "Como contribuir?"            | CONTRIBUTING.md    |
| "Algo não funciona"           | TROUBLESHOOTING.md |
| "Qual é a visão geral?"       | README.md          |

---

## 🎯 Objetivos de Aprendizado

**Após ler todos os documentos, você será capaz de:**

- ✅ Executar o projeto localmente
- ✅ Entender a arquitetura
- ✅ Criar novos componentes
- ✅ Integrar com backend
- ✅ Resolver problemas comuns
- ✅ Seguir padrões do projeto
- ✅ Contribuir com código
- ✅ Debugar issues
- ✅ Escrever testes
- ✅ Documentar mudanças

---

## 📈 Roadmap de Documentação

- [ ] Documento de Deployment (em breve)
- [ ] Guia de Performance (em breve)
- [ ] Guia de Segurança (em breve)
- [ ] Exemplos de Código Avançados (em breve)
- [ ] Vídeos tutoriais (em breve)

---

## 🤝 Contribuindo com Documentação

Encontrou erro ou quer melhorar?

1. Fork o repositório
2. Editar documento
3. Submeter PR
4. Aguardar review

Obrigado! 🙏

---

**Versão**: 1.0.0  
**Última Atualização**: Junho 2026  
**Status**: ✅ Documentação Completa

---

## 📍 Você está aqui

Agora que conhece toda a documentação, escolha seu caminho:

- 👨‍💻 [Começar a Desenvolver →](./QUICKSTART.md)
- 🏗️ [Entender Arquitetura →](./ARCHITECTURE.md)
- 🧩 [Explorar Componentes →](./COMPONENTS.md)
- 🤝 [Contribuir com Código →](../CONTRIBUTING.md)
- 🔧 [Resolver Problemas →](./TROUBLESHOOTING.md)

**Bem-vindo ao GastroFactor!**
