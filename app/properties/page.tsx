"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import PropertyCard from "@/components/property-card"
import { allProperties } from "@/data/properties"
import type { Property } from "@/types/property"

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [propertyType, setPropertyType] = useState("all")
  const [listingType, setListingType] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [bedrooms, setBedrooms] = useState("any")
  const [bathrooms, setBathrooms] = useState("any")
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    let filtered = allProperties

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Property type filter
    if (propertyType !== "all") {
      filtered = filtered.filter((property) => property.category.toLowerCase() === propertyType.toLowerCase())
    }

    // Listing type filter
    if (listingType !== "all") {
      filtered = filtered.filter((property) =>
        listingType === "sale" ? property.type === "For Sale" : property.type === "For Rent",
      )
    }

    // Price range filter
    filtered = filtered.filter((property) => {
      const price = Number.parseInt(property.price.replace(/[^0-9]/g, ""))
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Bedrooms filter
    if (bedrooms !== "any") {
      filtered = filtered.filter((property) => {
        if (bedrooms === "4+") {
          return property.beds >= 4
        }
        return property.beds === Number.parseInt(bedrooms)
      })
    }

    // Bathrooms filter
    if (bathrooms !== "any") {
      filtered = filtered.filter((property) => {
        if (bathrooms === "4+") {
          return property.baths >= 4
        }
        return property.baths === Number.parseInt(bathrooms)
      })
    }

    setFilteredProperties(filtered)

    // Update active filters
    const newActiveFilters = []
    if (propertyType !== "all") newActiveFilters.push(`Type: ${propertyType}`)
    if (listingType !== "all") newActiveFilters.push(`For: ${listingType === "sale" ? "Sale" : "Rent"}`)
    if (bedrooms !== "any") newActiveFilters.push(`Beds: ${bedrooms}`)
    if (bathrooms !== "any") newActiveFilters.push(`Baths: ${bathrooms}`)
    if (priceRange[0] > 0 || priceRange[1] < 10000000) {
      newActiveFilters.push(`Price: $${priceRange[0].toLocaleString()} - $${priceRange[1].toLocaleString()}`)
    }

    setActiveFilters(newActiveFilters)
  }, [searchTerm, propertyType, listingType, priceRange, bedrooms, bathrooms])

  const resetFilters = () => {
    setSearchTerm("")
    setPropertyType("all")
    setListingType("all")
    setPriceRange([0, 10000000])
    setBedrooms("any")
    setBathrooms("any")
  }

  const removeFilter = (filter: string) => {
    const filterType = filter.split(":")[0].trim()

    switch (filterType) {
      case "Type":
        setPropertyType("all")
        break
      case "For":
        setListingType("all")
        break
      case "Beds":
        setBedrooms("any")
        break
      case "Baths":
        setBathrooms("any")
        break
      case "Price":
        setPriceRange([0, 10000000])
        break
      default:
        break
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
      <section className="relative py-16 mb-8 search-container">
        <div className="container px-4 md:px-6 text-center">
          <motion.div
            className="max-w-3xl mx-auto text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Property</h1>
            <p className="text-white/90 mb-8">Browse our exclusive collection of luxury properties</p>

            <div className="flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground  text-black" />
                <Input
                  className="pl-9 bg-background/95 backdrop-blur-sm  text-black"
                  placeholder="Search by location, property name... "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="bg-background/95 backdrop-blur-sm text-black">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filter Properties</SheetTitle>
                    <SheetDescription>Refine your search with our property filters</SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Property Type</h3>
                      <Select value={propertyType} onValueChange={setPropertyType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="penthouse">Penthouse</SelectItem>
                          <SelectItem value="estate">Estate</SelectItem>
                          <SelectItem value="mansion">Mansion</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="loft">Loft</SelectItem>
                          <SelectItem value="chalet">Chalet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Listing Type</h3>
                      <Select value={listingType} onValueChange={setListingType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select listing type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Listings</SelectItem>
                          <SelectItem value="sale">For Sale</SelectItem>
                          <SelectItem value="rent">For Rent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Price Range</h3>
                        <span className="text-xs text-muted-foreground">
                          ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                        </span>
                      </div>
                      <Slider
                        defaultValue={[0, 10000000]}
                        max={10000000}
                        step={100000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Bedrooms</h3>
                      <Select value={bedrooms} onValueChange={setBedrooms}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4+">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Bathrooms</h3>
                      <Select value={bathrooms} onValueChange={setBathrooms}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4+">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <Button variant="outline" onClick={resetFilters}>
                        Reset Filters
                      </Button>
                      <Button onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container px-4 md:px-6">
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium">Active Filters:</span>
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                {filter}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeFilter(filter)}>
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove filter</span>
                </Button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" className="text-xs" onClick={resetFilters}>
              Clear All
            </Button>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {filteredProperties.length} {filteredProperties.length === 1 ? "Property" : "Properties"} Found
          </h2>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="beds-desc">Most Bedrooms</SelectItem>
              <SelectItem value="size-desc">Largest Size</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProperties.map((property) => (
              <motion.div key={property.id} variants={itemVariants}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search filters</p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        )}
      </div>
    </div>
  )
}
