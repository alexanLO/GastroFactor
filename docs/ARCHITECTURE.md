# 🏗️ Arquitetura do GastroFactor

## Visão Geral

O GastroFactor segue uma arquitetura modular baseada em **domain-driven design**, organizado em camadas bem definidas:

```text
Presentation (Components)
    ↓
Service Layer (BusinessLogic)
    ↓
Data Layer (HTTP/API)
    ↓
Backend API
```

## 📐 Estrutura de Pastas

### Core (`src/app/core/`)

**Responsabilidade**: Lógica global e serviços singleton

```text
core/
├── interceptors/
│   └── api-error.interceptor.ts    # Tratamento de erros HTTP
├── services/
│   ├── recipe.service.ts           # CRUD de receitas
│   ├── pdf-export.service.ts       # Exportação de PDF
│   └── calculation.service.ts      # Cálculos de receita
└── guards/
    └── auth.guard.ts               # Proteção de rotas
```

**Serviços Principais:**

#### `recipe.service.ts`

```typescript
interface RecipeData {
  details: { name, servings, category };
  ingredients: Ingredient[];
  nutritional: { calories, protein, totalFat, carbs };
  preparationMethod: Step[];
}

class RecipeService {
  saveRecipe(recipe): Observable<any>
  getRecipe(id): Observable<RecipeData>
  updateRecipe(id, recipe): Observable<any>
  deleteRecipe(id): Observable<any>
}
```

#### `pdf-export.service.ts`

```typescript
class PdfExportService {
  generateRecipePdf(recipe: RecipeData): void
  // - Cria HTML dinamicamente
  // - Renderiza com html2canvas
  // - Gera PDF com jsPDF
  // - Permite download automático
}
```

### Shared (`src/app/shared/`)

**Responsabilidade**: Componentes, modelos e estilos reutilizáveis

```text
shared/
├── components/        # Componentes genéricos (botões, inputs)
├── models/            # Interfaces TypeScript globais
├── styles/            # SCSS global (variáveis, mixins, temas)
└── directives/        # Pipes e diretivas reutilizáveis
```

**Arquivo de Variáveis:**

```scss
// _variables.scss
$primary: #ff6b35;
$surface: #1a1a1a;
$on-surface: #ffffff;

$font-serif: 'Georgia', serif;
$font-sans: 'Arial', sans-serif;

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Features (`src/app/features/`)

**Responsabilidade**: Módulos por funcionalidade (domínio)

```text
features/
└── auth/              # Autenticação
    ├── pages/         # Páginas de login/registro
    ├── components/    # Componentes específicos do módulo
    ├── modals/        # Modais específicos
    └── services/      # Serviços da feature
```

**Padrão**: Cada feature é independente e lazy-loadable

### Pages (`src/app/pages/`)

**Responsabilidade**: Páginas principais da aplicação

```text
pages/
├── my-collection/                 # Dashboard de receitas
│   ├── my-collection.ts           # Component
│   ├── my-collection.html         # Template
│   ├── my-collection.scss         # Estilos
│   └── my-collection.spec.ts      # Testes
├── technical-specification/       # Editor de fichas
│   ├── technical-specification.ts
│   ├── technical-specification.html
│   ├── technical-specification.scss
│   └── technical-specification.spec.ts
└── main-screen/                   # Tela inicial
```

### Component (`src/app/component/`)

**Responsabilidade**: Componentes de layout global (navbar, footer)

```text
component/
├── navbar/
│   ├── navbar.component.ts
│   ├── navbar.component.html
│   └── navbar.component.scss
├── footer/
├── table-ingredients/             # Tabela reutilizável
├── card-details-component/        # Detalhes da receita
├── card-nutritional/              # Valores nutricionais
└── preparation-method-component/  # Modo de preparo
```

## 🔄 Padrões de Design

### 1. Smart/Dumb Components

**Smart Component** (Container):

```typescript
// my-collection.ts - Gerencia lógica e estado
export class MyCollection {
  recipes: Recipe[];
  isModalOpen = false;
  
  constructor(private recipeService: RecipeService) {}
  
  openModal() { this.isModalOpen = true; }
  closeModal() { this.isModalOpen = false; }
}
```

**Dumb Component** (Presentation):

```typescript
// card-details-component.ts - Apenas apresenta dados
export class CardDetailsComponent {
  @Input() recipe: Recipe;
  @Output() updated = new EventEmitter<Recipe>();
  
  onUpdate() {
    this.updated.emit(this.recipe);
  }
}
```

### 2. Services para Lógica de Negócio

```typescript
// Implementar lógica em serviços, não em componentes
export class RecipeService {
  private apiUrl = '/api/recipes';
  
  constructor(private http: HttpClient) {}
  
  saveRecipe(recipe: RecipeData) {
    return this.http.post(this.apiUrl, recipe);
  }
}
```

### 3. Two-Way Binding para Formulários

```html
<!-- Template -->
<input [(ngModel)]="recipe.name" />
<input [(ngModel)]="recipe.servings" />
```

```typescript
// Component
export class CardDetailsComponent {
  recipeName: string = '';
  servings: number = 0;
  
  getDetails() {
    return {
      name: this.recipeName,
      servings: this.servings
    };
  }
}
```

### 4. ViewChild para Acesso a Componentes Filhos

```typescript
export class TechnicalSpecification {
  @ViewChild(CardDetailsComponent) detailsComponent!: CardDetailsComponent;
  @ViewChild(TableIngredientsComponent) ingredientsComponent!: TableIngredientsComponent;
  
  saveRecipe() {
    const data = this.detailsComponent.getDetails();
    // ...
  }
}
```

## 🌊 Fluxo de Dados

### Fluxo de Salvar Receita

```text
User clicks "Salvar"
        ↓
technical-specification.saveRecipe()
        ↓
Collect data from child components:
  - detailsComponent.getDetails()
  - ingredientsComponent.ingredients
  - nutritionalComponent.getNutritional()
  - preparationComponent.steps
        ↓
Create RecipeData object
        ↓
recipeService.saveRecipe(data)
        ↓
HTTP POST /api/recipes
        ↓
Backend validates and saves
        ↓
Response received
        ↓
Show success/error alert
        ↓
Update local state
```

### Fluxo de Exportar PDF

```text
User clicks "Exportar PDF"
        ↓
technical-specification.exportPdf()
        ↓
Collect recipe data (mesmo que salvar)
        ↓
pdfExportService.generateRecipePdf(data)
        ↓
Create HTML dynamically
        ↓
html2canvas renders content
        ↓
jsPDF generates PDF
        ↓
Browser download automatically
        ↓
Show success message
```

## 🔐 Camada de Autenticação

```typescript
// auth.guard.ts
export const AuthGuard = () => {
  // Verificar se usuário está autenticado
  // Se não, redirecionar para login
  // Se sim, permitir acesso
};

// api-error.interceptor.ts
export class ApiErrorInterceptor {
  intercept(req, next) {
    return next.handle(req).pipe(
      catchError(error => {
        // Tratar erros HTTP
        // Se 401, redirecionar para login
        // Se 500, mostrar mensagem de erro
      })
    );
  }
}
```

## 📦 Dependências Principais

```json
{
  "@angular/core": "^21.2.13",
  "@angular/common": "^21.2.13",
  "@angular/forms": "^21.2.13",
  "@angular/router": "^21.2.13",
  "jspdf": "^2.x",
  "html2canvas": "^1.x",
  "rxjs": "^7.x"
}
```

## 🎯 Princípios de Design

### SOLID Principles

1. **Single Responsibility**: Cada classe tem uma responsabilidade
2. **Open/Closed**: Aberto para extensão, fechado para modificação
3. **Liskov Substitution**: Subclasses substituem base classes
4. **Interface Segregation**: Interfaces específicas
5. **Dependency Inversion**: Depender de abstrações, não de implementações

### DRY (Don't Repeat Yourself)

- Reutilizar componentes (Shared)
- Reutilizar serviços (Core)
- Reutilizar estilos (SCSS mixins)

### KISS (Keep It Simple, Stupid)

- Componentes focados e pequenos
- Métodos com uma única responsabilidade
- Nomes descritivos

## 🚀 Performance

### Otimizações Implementadas

1. **OnPush Change Detection**

```typescript
@Component({
  selector: 'app-card-details',
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

2. **Lazy Loading de Rotas**

```typescript
const routes = [
  { path: 'auth', loadChildren: () => import('./features/auth/...') }
];
```

3. **Tree Shaking** - Remover código não utilizado
4. **AOT Compilation** - Compilação antecipada

### Métricas Alvo

- FCP (First Contentful Paint): < 1.5s
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1

## 🧪 Testabilidade

### Estrutura para Testes

```typescript
describe('RecipeService', () => {
  let service: RecipeService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeService]
    });
    service = TestBed.inject(RecipeService);
  });
  
  it('should save recipe', () => {
    // Test implementation
  });
});
```

## 🔄 Versioning e Deployment

### Branches

- `main` - Produção
- `develop` - Desenvolvimento
- `feature/nome-feature` - Novas features
- `bugfix/nome-bug` - Correções

### Deploy Strategy

1. Feature em branch dedicada
2. Pull Request + Review
3. Merge para develop
4. Testes em staging
5. Merge para main
6. Deploy em produção

## 📚 Referências

- [Angular Architecture Guide](https://angular.io/guide/styleguide)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev)

---

**Versão**: 1.0.0  
**Última Atualização**: Junho 2026
