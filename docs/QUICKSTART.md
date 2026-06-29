# 🚀 Guia de Início Rápido

Comece a desenvolver em 5 minutos.

## 1️⃣ Instalação

```bash
git clone https://github.com/alexanLO/GastroFactor.git
cd GastroFactor
npm ci
```

Opcional:

```bash
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
│   ├── main-screen/              ← Tela pública inicial
│   ├── my-collection/            ← Área autenticada de receitas
│   └── technical-specification/  ← Editor de ficha técnica
├── component/                    ← Componentes reutilizáveis
├── core/services/                ← Serviços de negócio
├── features/auth/                ← Login, cadastro e guarda de rota
└── shared/                       ← Models, estilos e componentes compartilhados
```

## 4️⃣ Primeiros Passos

### Editar um Componente

```typescript
// src/app/component/card-details/card-details.component.ts

export class CardDetailsComponent {
  recipeName: string = '';

  getDetails() {
    return { name: this.recipeName };
  }
}
```

### Editar Template

```html
<!-- src/app/component/card-details/card-details.component.html -->

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

| Comando                 | Descrição                         |
| ----------------------- | --------------------------------- |
| `npm start`             | Inicia dev server                 |
| `npm test`              | Executa testes                    |
| `npm run lint`          | Executa lint                      |
| `npm run format:check`  | Verifica formatação               |
| `npm run build`         | Build de produção                 |
| `npm run quality:ci`    | Roda format, lint, build e testes |
| `ng serve`              | Alternativa para `npm start`      |
| `ng generate component` | Cria novo componente              |
| `ng generate service`   | Cria novo serviço                 |

## 🐛 Troubleshooting

### Port 4200 já está em uso?

```bash
# Usar porta diferente
ng serve --port 4300
```

### Erro: "Cannot find module"?

```bash
npm ci
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

## 🎯 Próximos Passos Naturais

1. Configurar `environment.local.ts` com sua `baseAddress`
2. Validar `npm run quality:ci`
3. Integrar com backend `/v1/auth`, `/v1/recipes` e `/v1/calculator`
4. Acompanhar budgets e cobertura antes de abrir PR

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
