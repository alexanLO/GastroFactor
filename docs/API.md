# 🔌 Documentação de API e Serviços

Guia técnico para integração com backend e uso dos serviços.

## RecipeService (`core/services/recipe.service.ts`)

**Responsabilidade**: Gerenciar todas as operações CRUD de receitas

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = '/api/recipes';
  
  constructor(private http: HttpClient) {}
  
  // CRUD Operations
  saveRecipe(recipe: RecipeData): Observable<any>
  getRecipe(id: string): Observable<RecipeData>
  updateRecipe(id: string, recipe: RecipeData): Observable<any>
  deleteRecipe(id: string): Observable<any>
}
```

### Métodos

#### 1. saveRecipe()

**Descrição**: Cria uma nova receita no backend

**Assinatura**:

```typescript
saveRecipe(recipe: RecipeData): Observable<any>
```

**Request**:

```http
POST /api/recipes
Content-Type: application/json

{
  "details": {
    "name": "Costela 48h Braseada",
    "servings": 12,
    "category": "Prato Principal"
  },
  "ingredients": [...],
  "nutritional": {...},
  "preparationMethod": [...]
}
```

**Response (Success - 201)**:

```json
{
  "id": "recipe_12345",
  "created_at": "2024-06-15T10:30:00Z",
  "message": "Receita criada com sucesso"
}
```

**Response (Error - 400)**:

```json
{
  "error": "Validation failed",
  "details": ["Campo 'name' é obrigatório"]
}
```

**Exemplo de Uso**:

```typescript
export class TechnicalSpecification {
  constructor(private recipeService: RecipeService) {}
  
  saveRecipe() {
    const recipe: RecipeData = {
      details: this.detailsComponent.getDetails(),
      ingredients: this.ingredientsComponent.ingredients,
      nutritional: this.nutritionalComponent.getNutritional(),
      preparationMethod: this.preparationComponent.steps
    };
    
    this.recipeService.saveRecipe(recipe).subscribe(
      response => {
        console.log('Receita salva:', response);
        alert('Receita salva com sucesso!');
      },
      error => {
        console.error('Erro ao salvar:', error);
        alert('Erro ao salvar receita');
      }
    );
  }
}
```

---

#### 2. getRecipe()

**Descrição**: Obtém uma receita específica

**Assinatura**:

```typescript
getRecipe(id: string): Observable<RecipeData>
```

**Request**:

```http
GET /api/recipes/{id}
```

**Response (200)**:

```json
{
  "id": "recipe_12345",
  "details": {...},
  "ingredients": [...],
  "nutritional": {...},
  "preparationMethod": [...]
}
```

**Exemplo**:

```typescript
this.recipeService.getRecipe('recipe_12345').subscribe(recipe => {
  console.log('Receita carregada:', recipe);
});
```

---

#### 3. updateRecipe()

**Descrição**: Atualiza uma receita existente

**Assinatura**:

```typescript
updateRecipe(id: string, recipe: RecipeData): Observable<any>
```

**Request**:

```http
PUT /api/recipes/{id}
Content-Type: application/json

{ ... receita completa ... }
```

**Response (200)**:

```json
{
  "id": "recipe_12345",
  "updated_at": "2024-06-15T11:00:00Z",
  "message": "Receita atualizada com sucesso"
}
```

---

#### 4. deleteRecipe()

**Descrição**: Deleta uma receita

**Assinatura**:

```typescript
deleteRecipe(id: string): Observable<any>
```

**Request**:

```http
DELETE /api/recipes/{id}
```

**Response (200)**:

```json
{
  "message": "Receita deletada com sucesso"
}
```

---

## PdfExportService (`core/services/pdf-export.service.ts`)

**Responsabilidade**: Gerar PDFs a partir de dados de receita

```typescript
@Injectable({
  providedIn: 'root'
})
export class PdfExportService {
  generateRecipePdf(recipe: RecipeData): void
}
```

### Método: generateRecipePdf()

**Descrição**: Gera PDF profissional e permite download

**Assinatura**:

```typescript
generateRecipePdf(recipe: RecipeData): void
```

**Funcionamento**:

1. Cria elemento HTML temporário
2. Gera conteúdo em HTML com estilos inline
3. Renderiza com `html2canvas`
4. Converte para PDF com `jsPDF`
5. Descarrega automaticamente

**Exemplo de Uso**:

```typescript
export class TechnicalSpecification {
  constructor(private pdfService: PdfExportService) {}
  
  exportPdf() {
    const recipe: RecipeData = {
      details: this.detailsComponent.getDetails(),
      ingredients: this.ingredientsComponent.ingredients,
      nutritional: this.nutritionalComponent.getNutritional(),
      preparationMethod: this.preparationComponent.steps
    };
    
    // Gera e baixa PDF automaticamente
    this.pdfService.generateRecipePdf(recipe);
  }
}
```

**Estrutura do PDF Gerado**:

```text
┌─────────────────────────────────┐
│       FICHA TÉCNICA DE RECEITA  │
│         [Nome da Receita]       │
└─────────────────────────────────┘

INFORMAÇÕES BÁSICAS
├─ Receita: Costela 48h
├─ Rendimento: 12 porções
└─ Categoria: Prato Principal

INGREDIENTES
┌──────────────────────────────────┐
│ Ingrediente    | PL  | FC | PB  │
├──────────────────────────────────┤
│ Costela        | 2kg | 1.2| 2.4kg
└──────────────────────────────────┘

VALORES NUTRICIONAIS
├─ Calorias: 642 kcal
├─ Proteínas: 42g
├─ Gordura: 38g
└─ Carboidratos: 12g

MODO DE PREPARO
1. Título do Passo 1
   Descrição detalhada do primeiro passo...

2. Título do Passo 2
   Descrição detalhada do segundo passo...
```

---

## Estrutura de Dados

### RecipeData Interface

```typescript
interface RecipeData {
  details: RecipeDetails;
  ingredients: Ingredient[];
  nutritional: NutritionalInfo;
  preparationMethod: PreparationStep[];
}

interface RecipeDetails {
  name: string;           // "Costela 48h Braseada"
  servings: number;       // 12
  category: string;       // "Prato Principal"
}

interface Ingredient {
  name: string;           // "Costela Prime Rib"
  netWeight: string;      // "2000g"
  correctionFactor: string;  // "1.2"
  grossWeight: string;    // "2400g"
  cookingFactor: string;  // "0.85"
  totalQuantity: string;  // "20400g"
}

interface NutritionalInfo {
  calories: string;       // "642 kcal"
  protein: string;        // "42g"
  totalFat: string;       // "38g"
  carbs: string;          // "12g"
}

interface PreparationStep {
  id: string;             // "01", "02", etc
  title: string;          // "Preparação da Costela"
  description: string;    // "Limpar a costela..."
}
```

---

## Endpoints do Backend Necessários

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|   
| POST | `/api/recipes` | Criar receita | 🔴 Backend |
| GET | `/api/recipes` | Listar todas | 🔴 Backend |
| GET | `/api/recipes/:id` | Obter uma | 🔴 Backend |
| PUT | `/api/recipes/:id` | Atualizar | 🔴 Backend |
| DELETE | `/api/recipes/:id` | Deletar | 🔴 Backend |

### Exemplo de Implementação Backend (Node/Express)

```javascript
// Backend Example (Express.js)

// POST /api/recipes
app.post('/api/recipes', async (req, res) => {
  const recipe = req.body;
  
  // Validar dados
  if (!recipe.details.name) {
    return res.status(400).json({
      error: 'Campo name é obrigatório'
    });
  }
  
  try {
    // Salvar no banco
    const saved = await Recipe.create(recipe);
    
    return res.status(201).json({
      id: saved._id,
      created_at: new Date(),
      message: 'Receita criada'
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GET /api/recipes
app.get('/api/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// GET /api/recipes/:id
app.get('/api/recipes/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ error: 'Not found' });
  res.json(recipe);
});

// PUT /api/recipes/:id
app.put('/api/recipes/:id', async (req, res) => {
  const updated = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE /api/recipes/:id
app.delete('/api/recipes/:id', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deletado' });
});
```

---

## Tratamento de Erros

### Interceptor de Erros

```typescript
// core/interceptors/api-error.interceptor.ts
@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        // Tratamento por status
        switch (error.status) {
          case 400:
            console.error('Erro de validação:', error.error);
            break;
          case 401:
            console.error('Não autenticado');
            // Redirecionar para login
            break;
          case 404:
            console.error('Recurso não encontrado');
            break;
          case 500:
            console.error('Erro do servidor');
            break;
        }
        
        return throwError(() => error);
      })
    );
  }
}
```

### Tratamento em Componente

```typescript
this.recipeService.saveRecipe(recipe).subscribe({
  next: (response) => {
    // Sucesso
    console.log('Salvo:', response);
  },
  error: (error) => {
    // Erro
    const message = error.error?.message || 'Erro desconhecido';
    console.error(message);
    this.showErrorAlert(message);
  },
  complete: () => {
    // Completo
    console.log('Requisição finalizada');
  }
});
```

---

## Autenticação (JWT)

### Fluxo de Autenticação

```typescript
// Exemplo: Login
this.authService.login(email, password).subscribe(response => {
  // Salvar token
  localStorage.setItem('token', response.token);
  
  // Próximas requisições incluem: Authorization: Bearer <token>
});
```

### Adicionando Token às Requisições

```typescript
// Modificar interceptor para incluir token
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(req);
  }
}
```

---

## Variáveis de Ambiente

### environment.ts (Development)

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

### environment.prod.ts (Production)

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.gastrofactor.com'
};
```

### Uso no Serviço

```typescript
import { environment } from '../env/environment';

export class RecipeService {
  private apiUrl = `${environment.apiUrl}/recipes`;
}
```

---

## Performance e Caching

```typescript
// Caching com RxJS
export class RecipeService {
  private recipeCache = new Map<string, Observable<RecipeData>>();
  
  getRecipe(id: string): Observable<RecipeData> {
    if (this.recipeCache.has(id)) {
      return this.recipeCache.get(id)!;
    }
    
    const recipe$ = this.http.get<RecipeData>(`${this.apiUrl}/${id}`).pipe(
      shareReplay(1)  // Cachear
    );
    
    this.recipeCache.set(id, recipe$);
    return recipe$;
  }
}
```

---

## Testes

```typescript
describe('RecipeService', () => {
  let service: RecipeService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecipeService]
    });
    
    service = TestBed.inject(RecipeService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
  
  it('should save recipe', () => {
    const recipe: RecipeData = { /* ... */ };
    
    service.saveRecipe(recipe).subscribe(response => {
      expect(response.id).toBeDefined();
    });
    
    const req = httpMock.expectOne('/api/recipes');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 'recipe_123' });
  });
});
```

---

**Versão**: 1.0.0  
**Última Atualização**: Junho 2026
