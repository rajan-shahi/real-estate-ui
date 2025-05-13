"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Users, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-16 mb-16">
        <div className="absolute inset-0 z-0">
          <Image src="/placeholder.svg?height=600&width=1200" alt="About LuxuryHomes" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            className="max-w-2xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-2 border-white/50 text-white">
              About Us
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Luxury Real Estate <span className="text-secondary">Redefined</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 text-white/90">
              For over two decades, LuxuryHomes has been the premier destination for those seeking exceptional
              properties and unparalleled service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-2">
                Our Story
              </Badge>
              <h2 className="text-3xl font-bold mb-4">A Legacy of Excellence in Luxury Real Estate</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2000, LuxuryHomes began with a simple vision: to connect discerning clients with
                  extraordinary properties that reflect their lifestyle and aspirations.
                </p>
                <p>
                  What started as a boutique agency in Beverly Hills has grown into a global network of luxury real
                  estate professionals, serving clients across the world's most prestigious locations.
                </p>
                <p>
                  Our success is built on a foundation of trust, discretion, and an unwavering commitment to exceeding
                  our clients' expectations. We don't just sell properties – we curate lifestyles.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>20+ Years Experience</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Global Network</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Exclusive Listings</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Personalized Service</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Our Story"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-lg shadow-lg">
                <div className="text-4xl font-bold text-primary">2000</div>
                <div className="text-sm text-muted-foreground">Year Founded</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { value: "5,000+", label: "Properties Sold", icon: <TrendingUp className="h-8 w-8 text-primary" /> },
              { value: "98%", label: "Client Satisfaction", icon: <Users className="h-8 w-8 text-primary" /> },
              { value: "20+", label: "Years of Experience", icon: <Award className="h-8 w-8 text-primary" /> },
              { value: "15", label: "Global Locations", icon: <CheckCircle className="h-8 w-8 text-primary" /> },
            ].map((stat, index) => (
              <motion.div key={index} className="text-center" variants={itemVariants}>
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-2">
              Our Team
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Meet Our Luxury Real Estate Experts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team of experienced professionals is dedicated to providing exceptional service and finding the
              perfect property for your lifestyle.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: "Jennifer Parker", role: "Founder & CEO", image: "/placeholder.svg?height=300&width=300" },
              {
                name: "Michael Rodriguez",
                role: "Chief Operating Officer",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Sarah Johnson",
                role: "Luxury Property Specialist",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "David Chen",
                role: "International Sales Director",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <motion.div key={index} className="group" variants={itemVariants} whileHover={{ y: -5 }}>
                <Card className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="text-center p-4">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-2">
              Our Values
            </Badge>
            <h2 className="text-3xl font-bold mb-4">The Principles That Guide Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our core values shape every interaction and decision we make as we help our clients find their dream
              properties.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description: "We strive for excellence in everything we do, from property selection to client service.",
                icon: <Award className="h-10 w-10 text-primary" />,
              },
              {
                title: "Integrity",
                description:
                  "We operate with complete transparency and honesty, building trust with every client relationship.",
                icon: <CheckCircle className="h-10 w-10 text-primary" />,
              },
              {
                title: "Innovation",
                description:
                  "We embrace new technologies and approaches to provide the best possible experience for our clients.",
                icon: <TrendingUp className="h-10 w-10 text-primary" />,
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-background rounded-lg p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
            <p className="text-white/90 mb-8">
              Contact our team of luxury real estate experts today and take the first step towards your new lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/properties">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Browse Properties
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
