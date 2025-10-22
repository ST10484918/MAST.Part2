"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { famousDishes } from "@/lib/famous-dishes"
import { Search, Globe, Clock } from "lucide-react"
import Image from "next/image"

export default function DishesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null)

  const origins = Array.from(new Set(famousDishes.map((dish) => dish.origin)))

  const filteredDishes = famousDishes.filter((dish) => {
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesOrigin = !selectedOrigin || dish.origin === selectedOrigin
    return matchesSearch && matchesOrigin
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "Hard":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Famous Dishes</h1>
          <p className="text-muted-foreground">Explore iconic recipes from around the world</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedOrigin === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedOrigin(null)}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              All Countries
            </Button>
            {origins.map((origin) => (
              <Button
                key={origin}
                variant={selectedOrigin === origin ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedOrigin(origin)}
              >
                {origin}
              </Button>
            ))}
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => (
            <Card key={dish.id} className="overflow-hidden hover:border-primary transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden bg-muted">
                <Image
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={getDifficultyColor(dish.difficulty)}>{dish.difficulty}</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-xl">{dish.name}</CardTitle>
                  <Badge variant="outline" className="shrink-0">
                    {dish.origin}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">{dish.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Key Ingredients
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {dish.ingredients.slice(0, 4).map((ingredient, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                      {dish.ingredients.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{dish.ingredients.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDishes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No dishes found matching your criteria</p>
          </div>
        )}
      </main>
    </div>
  )
}
