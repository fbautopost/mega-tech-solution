import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Truck, Headphones } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over Rs. 2000",
  },
  {
    icon: Shield,
    title: "2 Year Warranty",
    description: "Full coverage included",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert assistance",
  },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary/30">
      <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              New Arrivals - Gaming PCs 2026
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Technology shouldn't be{" "}
              <span className="text-primary">complicated.</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
              Discover premium computer accessories, high-performance gaming PCs, and professional laptops. Built for gamers, creators, and professionals who demand the best.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="gap-2">
                <Link href="#products">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
            
            {/* Trust badges */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col gap-1">
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">{feature.title}</span>
                  <span className="text-xs text-muted-foreground">{feature.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted lg:aspect-[4/3]">
              <Image
                src="/images/hero-gaming-pc.jpg"
                alt="Gaming PC Setup with RGB lighting"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-card p-4 shadow-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <span className="text-2xl font-bold text-primary">5K+</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Happy Customers</p>
                  <p className="text-xs text-muted-foreground">Trusted worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
