"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, Users, Clock, TrendingUp, Trash2, Search, ChevronDown, ChevronUp, Calculator } from "lucide-react"
import type { Meal } from "@/types"

export default function CalculatorPage() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null)
  const [adjustedServings, setAdjustedServings] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const savedMeals = JSON.parse(localStorage.getItem("meals") || "[]")
    setMeals(savedMeals)
  }, [])

  const deleteMeal = (id: string) => {
    const updatedMeals = meals.filter((meal) => meal.id !== id)
    setMeals(updatedMeals)
    localStorage.setItem("meals", JSON.stringify(updatedMeals))
  }

  const filteredMeals = meals.filter(
    (meal) =>
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const calculateAdjustedCost = (meal: Meal, newServings: number) => {
    const ratio = newServings / meal.servings
    return {
      totalCost: meal.totalCost * ratio,
      costPerServing: meal.totalCost / newServings,
    }
  }

  const getServings = (mealId: string, originalServings: number) => {
    return adjustedServings[mealId] || originalServings
  }

  const updateServings = (mealId: string, servings: number) => {
    setAdjustedServings({ ...adjustedServings, [mealId]: servings })
  }

  const totalMealsCost = meals.reduce((sum, meal) => sum + meal.totalCost, 0)
  const averageCostPerMeal = meals.length > 0 ? totalMealsCost / meals.length : 0

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Cost Calculator</h1>
          <p className="text-muted-foreground">Analyze and manage your meal costs</p>
        </div>

        {/* Stats Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Meals</p>
                  <p className="text-2xl font-bold">{meals.length}</p>
                </div>
                <Calculator className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Cost</p>
                  <p className="text-2xl font-bold">${totalMealsCost.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Cost/Meal</p>
                  <p className="text-2xl font-bold">${averageCostPerMeal.toFixed(2)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Servings</p>
                  <p className="text-2xl font-bold">{meals.reduce((sum, meal) => sum + meal.servings, 0)}</p>
                </div>
                <Users className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your meals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Meals List */}
        {filteredMeals.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground mb-2">No meals found</p>
              <p className="text-sm text-muted-foreground">
                {meals.length === 0 ? "Create your first meal to get started" : "Try a different search term"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredMeals.map((meal) => {
              const currentServings = getServings(meal.id, meal.servings)
              const adjusted = calculateAdjustedCost(meal, currentServings)
              const isExpanded = expandedMeal === meal.id

              return (
                <Card key={meal.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{meal.name}</CardTitle>
                          {meal.category && (
                            <Badge variant="outline" className="capitalize">
                              {meal.category}
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{meal.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setExpandedMeal(isExpanded ? null : meal.id)}
                        >
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteMeal(meal.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Cost Display */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Total Cost</p>
                          <p className="text-lg font-bold text-primary">${adjusted.totalCost.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
                        <Users className="h-5 w-5 text-accent" />
                        <div>
                          <p className="text-xs text-muted-foreground">Per Serving</p>
                          <p className="text-lg font-bold text-accent">${adjusted.costPerServing.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                        <Clock className="h-5 w-5 text-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Total Time</p>
                          <p className="text-lg font-bold">{meal.prepTime + meal.cookTime} min</p>
                        </div>
                      </div>
                    </div>

                    {/* Servings Adjuster */}
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                      <Label htmlFor={`servings-${meal.id}`} className="text-sm font-medium whitespace-nowrap">
                        Adjust Servings:
                      </Label>
                      <div className="flex items-center gap-2 flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateServings(meal.id, Math.max(1, currentServings - 1))}
                        >
                          -
                        </Button>
                        <Input
                          id={`servings-${meal.id}`}
                          type="number"
                          min="1"
                          value={currentServings}
                          onChange={(e) => updateServings(meal.id, Number(e.target.value))}
                          className="w-20 text-center"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateServings(meal.id, currentServings + 1)}
                        >
                          +
                        </Button>
                        {currentServings !== meal.servings && (
                          <Button variant="ghost" size="sm" onClick={() => updateServings(meal.id, meal.servings)}>
                            Reset
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Expanded Ingredients */}
                    {isExpanded && (
                      <div className="pt-4 border-t space-y-3">
                        <h4 className="font-semibold">Ingredients ({meal.ingredients.length})</h4>
                        <div className="space-y-2">
                          {meal.ingredients.map((ingredient) => {
                            const adjustedQty = (ingredient.quantity * currentServings) / meal.servings
                            const ingredientCost = adjustedQty * ingredient.pricePerUnit

                            return (
                              <div
                                key={ingredient.id}
                                className="flex items-center justify-between p-3 rounded-lg bg-muted text-sm"
                              >
                                <div className="flex-1">
                                  <span className="font-medium">{ingredient.name}</span>
                                  <span className="text-muted-foreground ml-2">
                                    {adjustedQty.toFixed(2)} {ingredient.unit}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">${ingredientCost.toFixed(2)}</div>
                                  <div className="text-xs text-muted-foreground">
                                    ${ingredient.pricePerUnit.toFixed(2)}/{ingredient.unit}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
