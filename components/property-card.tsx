"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, MapPin, BedDouble, Bath, Square, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Property } from "@/types/property"

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative">
          <Link href={`/properties/${property.id}`}>
            <div className="overflow-hidden aspect-[4/3]">
              <Image
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                width={400}
                height={300}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
              />
            </div>
          </Link>
          <Badge variant={property.type === "For Sale" ? "default" : "secondary"} className="absolute top-3 left-3">
            {property.type}
          </Badge>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to favorites</span>
          </Button>
          <Badge variant="outline" className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm">
            {property.category}
          </Badge>
        </div>

        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold line-clamp-1">{property.title}</h3>
              <div className="flex items-center text-muted-foreground text-sm mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span className="line-clamp-1">{property.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">{property.price}</div>
              {property.type === "For Rent" && <div className="text-xs text-muted-foreground">/month</div>}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-2 pb-2 flex-grow">
          <div className="grid grid-cols-3 gap-2 py-2">
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <BedDouble className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-xs">{property.beds} Beds</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <Bath className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-xs">{property.baths} Baths</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <Square className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-xs">{property.size}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-2 mt-auto">
          <Link href={`/properties/${property.id}`} className="w-full">
            <Button variant="outline" className="w-full group">
              View Details
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
