"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { 
  Monitor, 
  Keyboard, 
  HardDrive, 
  Cpu, 
  Laptop,
  ShoppingCart,
  Star,
  Filter,
  CheckCircle2,
  Truck,
  Shield,
  RefreshCw,
  Headphones
} from "lucide-react"
import { products, categories as baseCategories } from "@/lib/products-data"

const categoryIcons = {
  "all": Filter,
  "gaming-pc": Monitor,
  "laptop": Laptop,
  "peripheral": Keyboard,
  "storage": HardDrive,
  "components": Cpu,
}

const categories = baseCategories.map(cat => ({
  ...cat,
  icon: categoryIcons[cat.id] || Filter
}))

const benefits = [
  { icon: Truck, title: "Free Shipping", description: "On orders over Rs. 50" },
  { icon: Shield, title: "2-Year Warranty", description: "Extended protection" },
  { icon: RefreshCw, title: "30-Day Returns", description: "Hassle-free returns" },
  { icon: Headphones, title: "24/7 Support", description: "Expert assistance" },
]

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <Badge variant="secondary" className="mb-4">Premium Products</Badge>
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl text-balance">
                Top-Quality Tech{" "}
                <span className="text-primary">For Everyone</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Discover our extensive collection of gaming PCs, laptops, peripherals, and components. Premium quality at competitive prices with expert support.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Bar */}
        <section className="border-b border-border bg-card py-6">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{benefit.title}</p>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="gap-2"
                >
                  <category.icon className="h-4 w-4" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden border-border transition-all hover:border-primary/50 hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden bg-secondary/30">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.badge && (
                      <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-foreground">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground line-clamp-1">{product.name}</h3>
                  </CardHeader>
                  <CardContent>
                    <ul className="mb-4 space-y-1">
                      {product.specs.slice(0, 3).map((spec) => (
                        <li key={spec} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-foreground">Rs. {product.price}</span>
                        {product.originalPrice && (
                          <span className="ml-2 text-sm text-muted-foreground line-through">
                            Rs. {product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button className="mt-4 w-full gap-2" size="sm">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="rounded-2xl bg-primary px-6 py-12 text-center sm:px-12">
              <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl text-balance">
                Can't Find What You Need?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
                Contact us for custom builds, bulk orders, or special requests. Our team is ready to help you find the perfect tech solution.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent" asChild>
                  <Link href="/services">View Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
