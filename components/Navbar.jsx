'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart = [], setIsCartOpen } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <nav className="bg-kraft-100 border-b border-kraft-800/20 sticky top-0 z-50 shadow-md">
      <div className="container py-4 flex justify-between items-center">
        <Link href="/" className="font-heading text-2xl md:text-3xl text-tribal-mahua font-bold hover:text-tribal-clay transition-colors duration-200 flex items-center gap-2">
          <span className="text-3xl">🧺</span>
          <span className="hidden sm:inline">Chhattisgarh Basket</span>
          <span className="sm:hidden text-xs">CB</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-stone-600 hover:text-tribal-clay font-medium transition-colors duration-200 relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tribal-clay group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/shop" className="text-stone-600 hover:text-tribal-clay font-medium transition-colors duration-200 relative group">
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tribal-clay group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/about" className="text-stone-600 hover:text-tribal-clay font-medium transition-colors duration-200 relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tribal-clay group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/contact" className="text-stone-600 hover:text-tribal-clay font-medium transition-colors duration-200 relative group">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tribal-clay group-hover:w-full transition-all duration-300"></span>
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-transparent text-gray-700 py-2 px-3 rounded-lg hover:bg-orange-100 transition-all duration-200 cursor-pointer"
              aria-label="Open cart sidebar"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-stone-600 hover:text-tribal-clay transition-colors duration-200 p-2 hover:bg-kraft-800/10 rounded-lg"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-kraft-200 border-t border-kraft-800/20 px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          <Link href="/" className="block text-stone-600 hover:text-tribal-clay font-medium px-3 py-2 rounded-lg hover:bg-kraft-100 transition-all duration-200">Home</Link>
          <Link href="/shop" className="block text-stone-600 hover:text-tribal-clay font-medium px-3 py-2 rounded-lg hover:bg-kraft-100 transition-all duration-200">Shop</Link>
          <Link href="/about" className="block text-stone-600 hover:text-tribal-clay font-medium px-3 py-2 rounded-lg hover:bg-kraft-100 transition-all duration-200">About</Link>
          <Link href="/contact" className="block text-stone-600 hover:text-tribal-clay font-medium px-3 py-2 rounded-lg hover:bg-kraft-100 transition-all duration-200">Contact</Link>
          <Link href="/cart" className="flex items-center gap-2 text-stone-600 hover:text-tribal-clay font-medium px-3 py-2 rounded-lg hover:bg-kraft-100 transition-all duration-200">
            <ShoppingBag size={20} />
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
        </div>
      )}
    </nav>
  );
}
