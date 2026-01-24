import { Badge } from "@/components/ui/badge"
import { 
  Cpu, 
  Shield, 
  Zap, 
  Headphones,
  RefreshCcw,
  Award
} from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "Latest Technology",
    description: "We stock only the newest components and devices from top brands like Intel, AMD, NVIDIA, and more.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Every product undergoes rigorous testing. We stand behind our products with extended warranties.",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Orders ship within 24 hours. Express delivery available for urgent needs.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Our tech experts are available 24/7 to help you choose the perfect setup for your needs.",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns. Not satisfied? We'll make it right, no questions asked.",
  },
  {
    icon: Award,
    title: "Best Price Match",
    description: "Found it cheaper elsewhere? We'll match the price and give you an additional 5% off.",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-secondary/30 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            The MegaTech Advantage
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            We're not just another tech store. Here's why thousands of customers trust us with their tech needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
