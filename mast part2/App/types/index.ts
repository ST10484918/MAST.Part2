export interface Ingredient {
    id: string
    name: string
    quantity: number
    unit: string
    pricePerUnit: number
  }
  
  export interface Meal {
    id: string
    name: string
    description: string
    ingredients: Ingredient[]
    servings: number
    totalCost: number
    costPerServing: number
    category: string
    prepTime: number
    cookTime: number
  }
  
  export interface FamousDish {
    id: string
    name: string
    origin: string
    description: string
    image: string
    ingredients: string[]
    difficulty: "Easy" | "Medium" | "Hard"
  }
  