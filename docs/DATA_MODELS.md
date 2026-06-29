# 📊 Documentação de Modelos de Dados

Definições TypeScript de todas as estruturas de dados do projeto.

## Modelos Principais

### RecipeData

**Descrição**: Estrutura completa de uma receita

```typescript
interface RecipeData {
  details: RecipeDetails;
  ingredients: Ingredient[];
  nutritional: NutritionalInfo;
  preparationMethod: PreparationStep[];
}
```

---

### RecipeDetails

**Descrição**: Informações básicas da receita

```typescript
interface RecipeDetails {
  name: string; // Nome da receita
  servings: number; // Número de porções
  category: string; // Categoria (Entrada, Prato Principal, Sobremesa)
}
```

**Exemplo**:

```typescript
const details: RecipeDetails = {
  name: 'Costela 48h Braseada',
  servings: 12,
  category: 'Prato Principal',
};
```

**Validação**:

```typescript
// Backend deve validar
- name: string não vazio, máx 255 chars
- servings: number > 0
- category: string deve estar na lista pré-definida
```

---

### Ingredient

**Descrição**: Item individual da tabela de ingredientes

```typescript
interface Ingredient {
  name: string; // Nome do ingrediente
  netWeight: string; // Peso Líquido (PL)
  correctionFactor: string; // Fator de Correção (FC)
  grossWeight: string; // Peso Bruto (PB)
  cookingFactor: string; // Fator de Cocção (FCY)
  totalQuantity: string; // Quantidade Total
}
```

**Exemplo**:

```typescript
const ingredient: Ingredient = {
  name: 'Costela Prime Rib',
  netWeight: '2000g',
  correctionFactor: '1.2',
  grossWeight: '2400g',
  cookingFactor: '0.85',
  totalQuantity: '20400g',
};
```

**Fórmulas de Cálculo**:

- **Peso Bruto** = Peso Líquido ÷ Fator de Correção
- **Peso Cocção** = Peso Bruto × Fator de Cocção
- **Quantidade Total** = Peso Cocção × Rendimento

**Validação**:

```typescript
- name: string não vazio
- Campos numéricos devem ser > 0
- Formato: número + unidade (ex: "2000g", "1.2kg")
```

---

### NutritionalInfo

**Descrição**: Valores nutricionais por porção

```typescript
interface NutritionalInfo {
  calories: string; // Quilocalorias (kcal)
  protein: string; // Proteínas (g)
  totalFat: string; // Gordura Total (g)
  carbs: string; // Carboidratos (g)
}
```

**Exemplo**:

```typescript
const nutritional: NutritionalInfo = {
  calories: '642 kcal',
  protein: '42g',
  totalFat: '38g',
  carbs: '12g',
};
```

**Faixa de Valores Esperados**:

```text
Refeição Normal:
- Calorias: 400-800 kcal
- Proteína: 25-45g
- Gordura: 15-50g
- Carboidratos: 30-100g
```

**Validação**:

```typescript
- Formato: número + unidade (ex: "42g", "600 kcal")
- Valores não devem ser negativos
```

---

### PreparationStep

**Descrição**: Um passo individual do modo de preparo

```typescript
interface PreparationStep {
  id: string; // ID único (01, 02, 03...)
  title: string; // Título do passo
  description: string; // Descrição detalhada
  editing?: boolean; // Flag de edição (apenas frontend)
}
```

**Exemplo**:

```typescript
const step: PreparationStep = {
  id: '01',
  title: 'Preparação da Costela',
  description:
    'Limpar a costela removendo o excesso de gordura. Temperar com sal e pimenta. Deixar repousar 30 minutos em temperatura ambiente.',
  editing: false,
};
```

**Validação**:

```typescript
- id: formato "01", "02", etc
- title: string não vazio, máx 100 chars
- description: string não vazio, máx 1000 chars
```

---

## Modelos de Componentes (Frontend)

### CardDetailsComponentState

```typescript
class CardDetailsComponent {
  recipeName: string = '';
  servings: number = 0;
  category: string = 'Entrada';

  getDetails(): RecipeDetails {
    return {
      name: this.recipeName,
      servings: this.servings,
      category: this.category,
    };
  }
}
```

---

### TableIngredientsComponentState

```typescript
class TableIngredientsComponent {
  ingredients: Ingredient[] = [];

  // Métodos
  addIngredient(): void {
    this.ingredients.push({
      name: '',
      netWeight: '',
      correctionFactor: '',
      grossWeight: '',
      cookingFactor: '',
      totalQuantity: '',
    });
  }

  removeIngredient(index: number): void {
    this.ingredients.splice(index, 1);
  }
}
```

---

### CardNutritionalComponentState

```typescript
class CardNutritionalComponent {
  calories: string = '';
  protein: string = '';
  totalFat: string = '';
  carbs: string = '';

  getNutritional(): NutritionalInfo {
    return {
      calories: this.calories,
      protein: this.protein,
      totalFat: this.totalFat,
      carbs: this.carbs,
    };
  }
}
```

---

### PreparationMethodComponentState

```typescript
class PreparationMethodComponent {
  steps: PreparationStep[] = [];

  addStep(): void {
    const newId = String(this.steps.length + 1).padStart(2, '0');
    this.steps.push({
      id: newId,
      title: '',
      description: '',
      editing: false,
    });
  }

  removeStep(index: number): void {
    this.steps.splice(index, 1);
    // Renumerar steps
    this.steps.forEach((step, i) => {
      step.id = String(i + 1).padStart(2, '0');
    });
  }
}
```

---

## Modelos de Resposta de API

### SuccessResponse

```typescript
interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
}

// Exemplo
const response: SuccessResponse<RecipeData> = {
  success: true,
  data: {/* receita */},
  message: 'Receita criada com sucesso',
  timestamp: '2024-06-15T10:30:00Z',
};
```

---

### ErrorResponse

```typescript
interface ErrorResponse {
  success: false;
  error: string;
  details?: string[];
  timestamp: string;
  path?: string;
}

// Exemplo
const error: ErrorResponse = {
  success: false,
  error: 'Validation failed',
  details: ["Campo 'name' é obrigatório", "Campo 'servings' deve ser > 0"],
  timestamp: '2024-06-15T10:30:00Z',
  path: '/api/recipes',
};
```

---

### PaginatedResponse

```typescript
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Exemplo
const response: PaginatedResponse<RecipeData> = {
  data: [/* recipes */],
  pagination: {
    page: 1,
    limit: 10,
    total: 45,
    pages: 5,
  },
};
```

---

## Enumerações

### RecipeCategory

```typescript
enum RecipeCategory {
  ENTRADA = 'Entrada',
  PRATO_PRINCIPAL = 'Prato Principal',
  ACOMPANHAMENTO = 'Acompanhamento',
  SOBREMESA = 'Sobremesa',
  BEBIDA = 'Bebida',
}

// Uso
const category: RecipeCategory = RecipeCategory.PRATO_PRINCIPAL;
```

---

## Constantes

### Limites de Validação

```typescript
const RECIPE_LIMITS = {
  NAME_MIN: 3,
  NAME_MAX: 255,
  SERVINGS_MIN: 1,
  SERVINGS_MAX: 500,
  INGREDIENTS_MIN: 1,
  INGREDIENTS_MAX: 100,
  STEPS_MIN: 1,
  STEPS_MAX: 50,
  DESCRIPTION_MAX: 1000,
};
```

---

## Tipos Utilitários

### Partial Recipe (para updates)

```typescript
type PartialRecipeData = Partial<RecipeData>;

// Permite enviar apenas campos que mudaram
const update: PartialRecipeData = {
  details: { name: 'Novo Nome' },
  // Sem ingredients, nutritional, preparationMethod
};
```

### Recipe ID

```typescript
type RecipeId = string & { readonly brand: unique symbol };

function createRecipeId(id: string): RecipeId {
  return id as RecipeId;
}
```

---

## Validações Customizadas

```typescript
// Validar RecipeData completa
function validateRecipeData(recipe: RecipeData): string[] {
  const errors: string[] = [];

  // Validar details
  if (!recipe.details.name || recipe.details.name.trim() === '') {
    errors.push('Nome da receita é obrigatório');
  }

  if (recipe.details.servings <= 0) {
    errors.push('Rendimento deve ser maior que 0');
  }

  // Validar ingredientes
  if (recipe.ingredients.length === 0) {
    errors.push('Mínimo 1 ingrediente é obrigatório');
  }

  recipe.ingredients.forEach((ing, i) => {
    if (!ing.name) {
      errors.push(`Ingrediente ${i + 1}: Nome é obrigatório`);
    }
  });

  // Validar passos
  if (recipe.preparationMethod.length === 0) {
    errors.push('Mínimo 1 passo de preparo é obrigatório');
  }

  return errors;
}

// Uso
const errors = validateRecipeData(recipe);
if (errors.length > 0) {
  console.error('Validação falhou:', errors);
}
```

---

## Transformações de Dados

```typescript
// De formato de formulário para RecipeData
function formToRecipeData(formData: any): RecipeData {
  return {
    details: {
      name: formData.recipeName?.trim(),
      servings: Number(formData.servings),
      category: formData.category,
    },
    ingredients:
      formData.ingredients?.map((ing) => ({
        name: ing.name?.trim(),
        netWeight: ing.netWeight?.trim(),
        correctionFactor: ing.correctionFactor?.trim(),
        grossWeight: ing.grossWeight?.trim(),
        cookingFactor: ing.cookingFactor?.trim(),
        totalQuantity: ing.totalQuantity?.trim(),
      })) || [],
    nutritional: {
      calories: formData.calories?.trim(),
      protein: formData.protein?.trim(),
      totalFat: formData.totalFat?.trim(),
      carbs: formData.carbs?.trim(),
    },
    preparationMethod:
      formData.steps?.map((step) => ({
        id: step.id,
        title: step.title?.trim(),
        description: step.description?.trim(),
      })) || [],
  };
}
```

---

## Exemplo Completo

```typescript
// Criar receita do zero
const completeRecipe: RecipeData = {
  details: {
    name: 'Bife Ancho com Batata Fondant',
    servings: 4,
    category: 'Prato Principal',
  },

  ingredients: [
    {
      name: 'Bife Ancho',
      netWeight: '800g',
      correctionFactor: '1.1',
      grossWeight: '880g',
      cookingFactor: '0.75',
      totalQuantity: '2640g',
    },
    {
      name: 'Batata Inglesa',
      netWeight: '400g',
      correctionFactor: '1.15',
      grossWeight: '460g',
      cookingFactor: '0.9',
      totalQuantity: '1656g',
    },
  ],

  nutritional: {
    calories: '850 kcal',
    protein: '52g',
    totalFat: '58g',
    carbs: '28g',
  },

  preparationMethod: [
    {
      id: '01',
      title: 'Preparação do Bife',
      description: 'Retirar do refrigerador 30 min antes. Temperar com sal e pimenta.',
    },
    {
      id: '02',
      title: 'Cocção do Bife',
      description: 'Selar na frigideira bem quente por 4 min de cada lado (ponto roso).',
    },
  ],
};

// Validar
const errors = validateRecipeData(completeRecipe);

// Salvar
if (errors.length === 0) {
  recipeService.saveRecipe(completeRecipe).subscribe((response) => {
    console.log('Salvo:', response);
  });
}
```

---

**Versão**: 1.0.0  
**Última Atualização**: Junho 2026
