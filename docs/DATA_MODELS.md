# Modelos de Dados

Este documento resume os modelos TypeScript realmente usados pelo projeto hoje.

## RecipeData

Arquivo: `src/app/shared/models/recipe-data.model.ts`

```ts
export interface RecipeData {
  details: {
    name: string;
    image: string;
    servings: number;
    category: string;
  };
  ingredients: Array<{
    name: string;
    netWeight: string;
    correctionFactor: string;
    grossWeight: string;
    cookingFactor: string;
    totalQuantity: string;
  }>;
  nutritional: {
    calories: string;
    protein: string;
    totalFat: string;
    carbs: string;
  };
  preparationMethod: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}
```

Observacoes:

- `details.image` faz parte do contrato atual
- `ingredients` nao possuem `id` no modelo compartilhado, embora o componente mantenha ids internamente para controle de UI
- `preparationMethod` tambem nao possui `editing` no modelo compartilhado; isso fica apenas no estado do componente

## Auth Models

Arquivo: `src/app/shared/models/auth.model.ts`

Modelos usados:

- `LoginRequest`
- `RegisterRequest`
- `AuthResponse`

Resposta esperada:

```ts
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}
```

Observacao:

- o arquivo ainda usa `String` em vez de `string` em alguns requests; isso funciona, mas `string` e a forma recomendada em TypeScript

## Calculation Models

Arquivo: `src/app/shared/models/calculation.model.ts`

```ts
export interface CalculationRequest {
  foodName: string;
  foodWeight: number;
  typeWeight: 'GROSS' | 'NET' | 'COOKED';
}

export interface CalculationResponse {
  foodName: string;
  grossWeight: number;
  netWeight: number;
  cookedWeight: number;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
```

## Modelos de estado interno de componente

Alguns componentes mantem campos extras que nao fazem parte do contrato de API, por exemplo:

- `TableIngredientsComponent`: `id` local por linha
- `PreparationMethodComponent`: `editing` por passo
- `AuthService`: estado de modal e validacao de expiracao do JWT

Esses campos existem apenas para controle de interface e nao substituem os modelos compartilhados em `shared/models`.
