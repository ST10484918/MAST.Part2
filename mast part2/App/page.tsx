import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Calculator, BookOpen, Plus, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <ChefHat className="h-4 w-4" />
            Professional Chef Tools
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
            Master Your{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Culinary Costs
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Create custom meals, calculate precise costs, and explore world-famous dishes. Built for professional chefs
            who demand precision.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/create">
                <Plus className="h-5 w-5" />
                Create Meal
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 bg-transparent">
              <Link href="/dishes">
                <BookOpen className="h-5 w-5" />
                Browse Dishes
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-2 hover:border-primary transition-colors duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Create Custom Meals</CardTitle>
              <CardDescription>Build your own recipes with detailed ingredient lists and serving sizes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/create">Get Started →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Cost Calculator</CardTitle>
              <CardDescription>
                Calculate precise meal costs and cost per serving with real-time updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/calculator">Calculate →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Famous Dishes</CardTitle>
              <CardDescription>
                Explore iconic recipes from Europe, Italy, Japan, America, and South Africa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/dishes">Explore →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Famous Dishes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">5</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Accurate Costs</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-3xl font-bold text-primary mb-1">
                  <TrendingUp className="h-6 w-6" />
                  Pro
                </div>
                <div className="text-sm text-muted-foreground">Chef Tools</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
