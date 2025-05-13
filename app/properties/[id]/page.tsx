"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share,
  MapPin,
  BedDouble,
  Bath,
  Square,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { allProperties } from "@/data/properties"

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = allProperties.find((p) => p.id === params.id)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  if (!property) {
    notFound()
  }

  const images = property.images || [
    property.image,
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ]

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container px-4 md:px-6">
        <div className="mb-6">
          <Link href="/properties" className="text-muted-foreground hover:text-foreground flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Properties
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Images */}
            <div className="relative rounded-lg overflow-hidden mb-8">
              <div className="aspect-[16/9] relative">
                <Image
                  src={images[activeImageIndex] || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>

              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={() => {}}
              >
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to favorites</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-16 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={() => {}}
              >
                <Share className="h-4 w-4" />
                <span className="sr-only">Share property</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous image</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next image</span>
              </Button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className={`h-2 w-2 rounded-full p-0 ${
                      index === activeImageIndex ? "bg-primary" : "bg-background/80 backdrop-blur-sm"
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <span className="sr-only">Image {index + 1}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-[4/3] relative rounded-md overflow-hidden cursor-pointer ${
                    index === activeImageIndex ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${property.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Property Details */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={property.type === "For Sale" ? "default" : "secondary"}>{property.type}</Badge>
                  <Badge variant="outline">{property.category}</Badge>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{property.title}</h1>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location}</span>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <BedDouble className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{property.beds} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{property.baths} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{property.size}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>Built in 2020</span>
                  </div>
                </div>

                <div className="flex items-center text-2xl font-bold text-primary mb-4">
                  {property.price}
                  {property.type === "For Rent" && (
                    <span className="text-sm font-normal text-muted-foreground ml-1">/month</span>
                  )}
                </div>
              </div>

              <Tabs defaultValue="description">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="pt-4">
                  <p className="text-muted-foreground whitespace-pre-line">{property.description}</p>
                </TabsContent>

                <TabsContent value="features" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(
                      property.features || [
                        "Luxury Finishes",
                        "Smart Home System",
                        "Gourmet Kitchen",
                        "Walk-in Closets",
                        "Hardwood Floors",
                        "Central Air Conditioning",
                        "High Ceilings",
                        "Private Balcony",
                        "Fitness Center Access",
                        "24/7 Security",
                      ]
                    ).map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="location" className="pt-4">
                  <div className="aspect-[16/9] bg-muted rounded-md overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=800"
                      alt="Map"
                      width={800}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Located in {property.location}, this property offers convenient access to shopping, dining, and
                    entertainment options. The neighborhood is known for its excellent schools and parks.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
                <CardDescription>Get in touch with our real estate expert</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <Image
                      src={property.agent?.image || "/placeholder.svg?height=100&width=100"}
                      alt={property.agent?.name || "Agent"}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{property.agent?.name || "Jennifer Parker"}</h4>
                    <p className="text-sm text-muted-foreground">Luxury Property Specialist</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{property.agent?.phone || "+1 (555) 123-4567"}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{property.agent?.email || "jennifer@luxuryhomes.com"}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full">Schedule Viewing</Button>
                <Button variant="outline" className="w-full">
                  Request Info
                </Button>
              </CardFooter>
            </Card>

            {/* Mortgage Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Mortgage Calculator</CardTitle>
                <CardDescription>Estimate your monthly payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Loan Amount</span>
                      <span className="text-sm font-medium">$4,200,000</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-2 w-4/5 bg-primary rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Interest Rate</span>
                      <span className="text-sm font-medium">4.5%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-2 w-1/2 bg-primary rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Loan Term</span>
                      <span className="text-sm font-medium">30 years</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-2 w-full bg-primary rounded-full" />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Monthly Payment:</span>
                      <span className="text-xl font-bold text-primary">$21,275</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Get Pre-Approved
                </Button>
              </CardFooter>
            </Card>

            {/* Similar Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Properties</CardTitle>
                <CardDescription>You might also like these</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {allProperties
                  .filter((p) => p.id !== property.id && p.category === property.category)
                  .slice(0, 3)
                  .map((similarProperty) => (
                    <Link href={`/properties/${similarProperty.id}`} key={similarProperty.id}>
                      <div className="flex items-start space-x-4 group">
                        <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={similarProperty.image || "/placeholder.svg"}
                            alt={similarProperty.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                            {similarProperty.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">{similarProperty.location}</p>
                          <p className="text-sm font-medium">{similarProperty.price}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </CardContent>
              <CardFooter>
                <Link href="/properties" className="w-full">
                  <Button variant="outline" className="w-full group">
                    View More Properties
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
