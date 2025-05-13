export interface Property {
  id: string
  title: string
  description: string
  price: string
  type: "For Sale" | "For Rent"
  category: string
  location: string
  beds: number
  baths: number
  size: string
  image: string
  images?: string[]
  features?: string[]
  agent?: {
    name: string
    image: string
    phone: string
    email: string
  }
}
