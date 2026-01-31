"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  MessageSquare
} from "lucide-react"
import { toast } from "sonner"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+92 0306-9293923"],
    description: "Mon-Fri from 8am to 8pm",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["megatechsolution1348@hotmail.com"],
    description: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["office No 3 Ameer Mall New City Phase 2 , Wah, Pakistan, 47010"],
    description: "Visit our showroom",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 9:00 AM - 7:00 PM", "Sat: 10:00 AM - 5:00 PM"],
    description: "Sunday: Closed",
  },
]

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for an additional fee.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day hassle-free return policy for all products in original condition with receipt.",
  },
  {
    question: "Do you offer warranty on products?",
    answer: "Yes, all products come with manufacturer warranty. We also offer extended warranty plans for additional coverage.",
  },
  {
    question: "Can I get a custom PC built?",
    answer: "Absolutely! Visit our Services page or contact us to discuss your requirements. We'll build a PC tailored to your needs.",
  },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        setFormState({ name: "", email: "", phone: "", subject: "", message: "" })
        toast.success("Message sent successfully!")
      } else {
        toast.error(result.message || "Failed to send message")
      }
    } catch (error) {
      console.error("Contact form error:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <Badge variant="secondary" className="mb-4">Contact Us</Badge>
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl text-balance">
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Have questions about our products or services? We're here to help. Reach out to us and our team will get back to you within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((item) => (
                <Card key={item.title} className="border-border text-center">
                  <CardContent className="pt-6">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
                    <div className="mt-2 space-y-1">
                      {item.details.map((detail) => (
                        <p key={detail} className="text-sm text-foreground">{detail}</p>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Contact Form */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="flex flex-col items-center py-12 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-foreground">Message Sent!</h3>
                      <p className="mt-2 text-muted-foreground">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                      <Button 
                        className="mt-6 bg-transparent" 
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Ali"
                            value={formState.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="ali@example.com"
                            value={formState.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+92 (306) 00000000"
                            value={formState.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            name="subject"
                            placeholder="Product inquiry"
                            value={formState.subject}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us how we can help you..."
                          rows={5}
                          value={formState.message}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Map / FAQ Section */}
              <div className="space-y-6">
                {/* https://www.google.com/maps/place/Ameer+Mall/@33.7519976,72.7404517,17z/data=!3m1!4b1!4m6!3m5!1s0x38dfa70033d64fa3:0xa478892c183bf65e!8m2!3d33.7519976!4d72.7404517!16s%2Fg%2F11xh9qtvsv?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D" */}
                <Card className="border-border overflow-hidden">
                  <div className="relative h-[250px] bg-muted">
                    <iframe
                      src="https://www.google.com/maps/place/Ameer+Mall/@33.7519976,72.7404517,17z/data=!3m1!4b1!4m6!3m5!1s0x38dfa70033d64fa3:0xa478892c183bf65e!8m2!3d33.7519976!4d72.7404517!16s%2Fg%2F11xh9qtvsv?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="MegaTech Solution Location"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <p className="text-sm text-foreground font-medium">office No 3 Ameer Mall New City Phase 2 , Wah, Pakistan, 47010</p>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {faqs.map((faq) => (
                      <div key={faq.question} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <h4 className="font-medium text-foreground">{faq.question}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
