# 🚀 Guia de Início Rápido

Comece a desenvolver em 5 minutos.

## 1️⃣ Instalação

```bash
# Clonar repositório
git clone https://github.com/alexanLO/GastroFactor.git
cd GastroFactor

# Instalar dependências
npm install

# Instalar Angular CLI (opcional, se não tiver)
npm install -g @angular/cli@21
```

## 2️⃣ Executar Desenvolvimento

```bash
npm start
```

Acesse: **http://localhost:4200**

O aplicativo recarrega automaticamente ao salvar arquivos.

## 3️⃣ Estrutura de Pastas Essenciais

```text
src/app/
├── pages/
│   ├── my-collection/      ← Dashboard (início)
│   └── technical-specification/  ← Editor de receita
├── component/              ← Componentes reutilizáveis
├── core/services/          ← Lógica de negócio
└── shared/                 ← Compartilhados
```

## 4️⃣ Primeiros Passos

### Editar um Componente

```typescript
// 📁 src/app/component/card-details-component/card-details-component.ts

export class CardDetailsComponent {
  recipeName: string = '';

  getDetails() {
    return { name: this.recipeName };
  }
}
```

### Editar Template

```html
<!-- 📁 src/app/component/card-details-component/card-details-component.html -->

<input [(ngModel)]="recipeName" placeholder="Nome da receita" />
```

### Executar Testes

```bash
npm test
```

## 5️⃣ Criar Novo Componente

```bash
ng generate component component/meu-componente
```

Ou manualmente:

```text
src/app/component/meu-componente/
├── meu-componente.component.ts
├── meu-componente.component.html
├── meu-componente.component.scss
└── meu-componente.component.spec.ts
```

## 🛠️ Comando Mais Comuns

| Comando                 | Descrição                    |
| ----------------------- | ---------------------------- |
| `npm start`             | Inicia dev server            |
| `npm test`              | Executa testes               |
| `npm run build`         | Build de produção            |
| `ng serve`              | Alternativa para `npm start` |
| `ng generate component` | Cria novo componente         |
| `ng generate service`   | Cria novo serviço            |

## 🐛 Troubleshooting

### Port 4200 já está em uso?

```bash
# Usar porta diferente
ng serve --port 4300
```

### Erro: "Cannot find module"?

```bash
# Limpar cache
rm -rf node_modules package-lock.json
npm install
```

### SCSS não compila?

```bash
# SCSS já é suportado por padrão no Angular
# Se tiver erro, verificar imports
```

## 📖 Documentação Completa

- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Estrutura detalhada
- **[COMPONENTS.md](./docs/COMPONENTS.md)** - Guia de componentes
- **[API.md](./docs/API.md)** - Serviços e endpoints
- **[DATA_MODELS.md](./docs/DATA_MODELS.md)** - Estrutura de dados
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Como contribuir

## 🎯 Próximas Tarefas

1. Implementar backend em Node/Express
2. Conectar banco de dados (MongoDB/PostgreSQL)
3. Implementar autenticação
4. Testes e2e
5. Deploy

## 💡 Dicas

- Use `ng generate` para scaffolding rápido
- Escreva testes enquanto desenvolve
- Mantenha componentes pequenos e focados
- Reutilize componentes do `shared/`

## 🆘 Precisa de Ajuda?

- Abra uma [Issue](https://github.com/alexanLO/GastroFactor/issues)
- Leia [CONTRIBUTING.md](./CONTRIBUTING.md)
- Consulte [ARCHITECTURE.md](./docs/ARCHITECTURE.md)

---

**Feliz Desenvolvimento!**
