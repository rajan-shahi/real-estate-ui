"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, Mail, MapPin, Home, Building, Info, Contact, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="h-4 w-4 mr-1" /> },
    { name: "Properties", href: "/properties", icon: <Building className="h-4 w-4 mr-1" /> },
    { name: "About", href: "/about", icon: <Info className="h-4 w-4 mr-1" /> },
    { name: "Contact", href: "/contact", icon: <Contact className="h-4 w-4 mr-1" /> },
  ]

  return (
    <header className="fixed w-full z-50">
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            className="bg-primary text-primary-foreground py-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container flex justify-between items-center">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Phone className="h-3 w-3 mr-1" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="hidden md:flex items-center">
                  <Mail className="h-3 w-3 mr-1" />
                  <span>info@luxuryhomes.com</span>
                </div>
                <div className="hidden lg:flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>123 Luxury Ave, Beverly Hills, CA</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <ModeToggle />
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary-foreground hover:text-primary-foreground/80"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-white text-white hover:bg-white/10"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        className={`py-4 ${isScrolled ? "bg-background/95 backdrop-blur-sm shadow-md" : "bg-transparent"} transition-all duration-300`}
        animate={{
          y: isScrolled ? -0 : 0,
        }}
      >
        <div className="container flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <motion.div
              className="text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="gradient-text">Luxury</span>
              <span>Homes</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <Button
                  variant={pathname === link.href ? "default" : "ghost"}
                  className={`flex items-center ${pathname === link.href ? "bg-primary text-primary-foreground" : "  bg-gray-200 "}`}
                >
                  {link.icon}
                  {link.name}
                </Button>
              </Link>
            ))}
            <Link href="/properties">
              <Button variant="outline" className="ml-2 flex items-center">
                <Search className="h-4 w-4 mr-1" />
                Find Properties
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-background shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container py-4 flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <Button
                      variant={pathname === link.href ? "default" : "ghost"}
                      className={`w-full justify-start ${pathname === link.href ? "bg-primary text-primary-foreground" : ""}`}
                    >
                      {link.icon}
                      {link.name}
                    </Button>
                  </Link>
                ))}
                <Link href="/properties">
                  <Button variant="outline" className="w-full justify-start mt-2">
                    <Search className="h-4 w-4 mr-1" />
                    Find Properties
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  )
}
