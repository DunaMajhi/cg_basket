'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartSidebar() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal 
  } = useCart();

  // If closed, don't render anything (or render hidden for animation)
  // For simplicity, we use a transform class logic below
  
  return (
    <>
      {/* 1. BACKDROP OVERLAY (Darkens the rest of the site) */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* 2. SIDEBAR PANEL */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-kraft-100 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-kraft-800/20 bg-gradient-to-r from-kraft-100 to-kraft-200">
          <h2 className="font-heading text-2xl md:text-3xl text-tribal-mahua font-bold">Your Basket</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-kraft-800/20 rounded-full transition-all duration-200 text-stone-600 hover:text-stone-800"
          >
            <X size={24} />
          </button>
        </div>

        {/* CART ITEMS LIST */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-tribal-turmeric/20 p-6 rounded-full mb-4">
                <ArrowRight size={40} className="text-tribal-turmeric rotate-180" />
              </div>
              <p className="font-heading text-xl text-tribal-charcoal mb-2 font-semibold">Your basket is empty</p>
              <p className="text-sm text-stone-500 mb-4">Browse our collection and add items to get started</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center justify-center gap-2 bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition-all duration-200 cursor-pointer text-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex gap-4 items-start bg-white p-4 rounded-lg shadow-sm border border-kraft-800/10 hover:shadow-md hover:border-kraft-800/20 transition-all duration-200">
                {/* Product Image */}
                <div className="relative w-20 h-20 flex-shrink-0 bg-gradient-to-br from-kraft-100 to-kraft-200 rounded-lg overflow-hidden border border-kraft-800/10">
                  <Image 
                    src={item.images[0]?.url || '/placeholder.png'} 
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="font-heading text-tribal-charcoal font-semibold leading-tight line-clamp-2">
                      {item.name}
                    </h3>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-stone-400 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-all duration-200 flex-shrink-0"
                      title="Remove from cart"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <p className="text-xs text-stone-500 mb-3">
                    {item.weightValue}{item.unit}
                  </p>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 bg-kraft-200 rounded-lg px-2 py-1.5 border border-kraft-800/10">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="p-1 hover:bg-white rounded transition-colors text-stone-600 hover:text-tribal-forest disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1}
                        title="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded transition-colors text-stone-600 hover:text-tribal-forest"
                        title="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price Calculation */}
                    <span className="font-heading font-bold text-tribal-clay text-lg">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER (Subtotal & Checkout) */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-kraft-800/20 bg-gradient-to-t from-kraft-200 to-kraft-100">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-kraft-800/10">
              <span className="text-stone-600 font-semibold">Subtotal</span>
              <span className="font-heading text-3xl text-tribal-charcoal font-bold">
                ₹{getCartTotal()}
              </span>
            </div>
            
            <p className="text-xs text-stone-500 mb-4 text-center">
              Shipping & taxes calculated at checkout.
            </p>

            <Link 
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}