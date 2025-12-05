'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function FloatingCheckout() {
  const { cart, getCartTotal, setIsCartOpen, isCartOpen } = useCart();
  const count = (cart || []).reduce((s, i) => s + (i.quantity || 0), 0);

  // Hide floating CTA when cart is empty or the cart sidebar is already open
  if (!count || isCartOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsCartOpen(true)}
          className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-200"
        >
          <span className="font-semibold">View Basket ({count})</span>
          <span className="font-bold">₹{getCartTotal()}</span>
        </button>
      </div>
    </div>
  );
}
