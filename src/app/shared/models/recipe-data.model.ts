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
