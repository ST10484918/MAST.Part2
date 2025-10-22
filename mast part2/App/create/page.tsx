"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, DollarSign, Users } from "lucide-react"
import type { Ingredient, Meal } from "@/types"

export default function CreateMealPage() {
  const [mealName, setMealName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [servings, setServings] = useState(4)
  const [prepTime, setPrepTime] = useState(0)
  const [cookTime, setCookTime] = useState(0)
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: "1", name: "", quantity: 0, unit: "g", pricePerUnit: 0 },
  ])

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: "",
      quantity: 0,
      unit: "g",
      pricePerUnit: 0,
    }
    setIngredients([...ingredients, newIngredient])
  }

  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((ing) => ing.id !== id))
    }
  }

  const updateIngredient = (id: string, field: keyof Ingredient, value: string | number) => {
    setIngredients(ingredients.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing)))
  }

  const calculateTotalCost = () => {
    return ingredients.reduce((total, ing) => {
      return total + ing.quantity * ing.pricePerUnit
    }, 0)
  }

  const calculateCostPerServing = () => {
    const total = calculateTotalCost()
    return servings > 0 ? total / servings : 0
  }

  const saveMeal = () => {
    const meal: Meal = {
      id: Date.now().toString(),
      name: mealName,
      description,
      ingredients,
      servings,
      totalCost: calculateTotalCost(),
      costPerServing: calculateCostPerServing(),
      category,
      prepTime,
      cookTime,
    }

    // Get existing meals from localStorage
    const existingMeals = JSON.parse(localStorage.getItem("meals") || "[]")
    localStorage.setItem("meals", JSON.stringify([...existingMeals, meal]))

    // Reset form
    setMealName("")
    setDescription("")
    setCategory("")
    setServings(4)
    setPrepTime(0)
    setCookTime(0)
    setIngredients([{ id: "1", name: "", quantity: 0, unit: "g", pricePerUnit: 0 }])

    alert("Meal saved successfully!")
  }

  const totalCost = calculateTotalCost()
  const costPerServing = calculateCostPerServing()

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Create New Meal</h1>
          <p className="text-muted-foreground">Design your custom recipe with precise cost calculations</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the core details of your meal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meal-name">Meal Name</Label>
                  <Input
                    id="meal-name"
                    placeholder="e.g., Grilled Salmon with Vegetables"
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your meal..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="appetizer">Appetizer</SelectItem>
                        <SelectItem value="main">Main Course</SelectItem>
                        <SelectItem value="dessert">Dessert</SelectItem>
                        <SelectItem value="side">Side Dish</SelectItem>
                        <SelectItem value="beverage">Beverage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="servings">Servings</Label>
                    <Input
                      id="servings"
                      type="number"
                      min="1"
                      value={servings}
                      onChange={(e) => setServings(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prep-time">Prep Time (minutes)</Label>
                    <Input
                      id="prep-time"
                      type="number"
                      min="0"
                      value={prepTime}
                      onChange={(e) => setPrepTime(Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cook-time">Cook Time (minutes)</Label>
                    <Input
                      id="cook-time"
                      type="number"
                      min="0"
                      value={cookTime}
                      onChange={(e) => setCookTime(Number(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Ingredients</CardTitle>
                    <CardDescription>Add ingredients with quantities and costs</CardDescription>
                  </div>
                  <Button onClick={addIngredient} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {ingredients.map((ingredient, index) => (
                  <div key={ingredient.id} className="flex gap-2 items-start">
                    <div className="flex-1 grid sm:grid-cols-4 gap-2">
                      <Input
                        placeholder="Ingredient"
                        value={ingredient.name}
                        onChange={(e) => updateIngredient(ingredient.id, "name", e.target.value)}
                        className="sm:col-span-2"
                      />
                      <Input
                        type="number"
                        placeholder="Qty"
                        value={ingredient.quantity || ""}
                        onChange={(e) => updateIngredient(ingredient.id, "quantity", Number(e.target.value))}
                      />
                      <div className="flex gap-2">
                        <Select
                          value={ingredient.unit}
                          onValueChange={(value) => updateIngredient(ingredient.id, "unit", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="g">g</SelectItem>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="ml">ml</SelectItem>
                            <SelectItem value="l">l</SelectItem>
                            <SelectItem value="pcs">pcs</SelectItem>
                            <SelectItem value="tbsp">tbsp</SelectItem>
                            <SelectItem value="tsp">tsp</SelectItem>
                            <SelectItem value="cup">cup</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Price/unit"
                          value={ingredient.pricePerUnit || ""}
                          onChange={(e) => updateIngredient(ingredient.id, "pricePerUnit", Number(e.target.value))}
                          className="pl-7 w-28"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIngredient(ingredient.id)}
                        disabled={ingredients.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Cost Summary */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Cost Summary</CardTitle>
                <CardDescription>Real-time cost calculations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="font-medium">Total Cost</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">${totalCost.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-accent/10 border border-accent/20">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-accent" />
                      <span className="font-medium">Per Serving</span>
                    </div>
                    <span className="text-2xl font-bold text-accent">${costPerServing.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Servings</span>
                    <span className="font-medium">{servings}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ingredients</span>
                    <span className="font-medium">{ingredients.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Time</span>
                    <span className="font-medium">{prepTime + cookTime} min</span>
                  </div>
                </div>

                <Button
                  onClick={saveMeal}
                  className="w-full"
                  size="lg"
                  disabled={!mealName || ingredients.length === 0}
                >
                  Save Meal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
