"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="Logo RK Surakarta"
              className="w-6"
            />
            <span className="text-xl font-bold">RK Surakarta</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/#tentang-kami" className="text-sm font-medium transition-colors hover:text-primary">
            Tentang Kami
          </Link>
          <Link href="/awardees" className="text-sm font-medium transition-colors hover:text-primary">
            Awardees
          </Link>
          <Link href="/berita" className="text-sm font-medium transition-colors hover:text-primary">
            Berita
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
              Al-Matsurat <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/pagi-sughro" className="w-full">
                  Pagi Sughro
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/pagi-kubro" className="w-full">
                  Pagi Kubro
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/sore-sughro" className="w-full">
                  Sore Sughro
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/sore-kubro" className="w-full">
                  Sore Kubro
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button className="p-2" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden absolute w-full bg-background border-b transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-screen py-4" : "max-h-0 py-0 overflow-hidden",
        )}
      >
        <div className="container flex flex-col space-y-4">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/#tentang-kami"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Tentang Kami
          </Link>
          <Link
            href="/awardees"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Awardees
          </Link>
          <Link
            href="/berita"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Berita
          </Link>

          <div className="space-y-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium">Al-Matsurat</h3>
            <Link
              href="/pagi-kubro"
              className="block text-sm text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Al-Matsurat Pagi
            </Link>
            <Link
              href="/sore-kubro"
              className="block text-sm text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Al-Matsurat Sore
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}
