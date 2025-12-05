'use client';

import Link from 'next/link';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const { setIsCartOpen } = useCart();

  useEffect(() => {
    setIsClient(true);
    const savedCart = localStorage.getItem('tribal_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    }
    // when visiting /cart route, open the sidebar too
    try { setIsCartOpen(true); } catch (e) {}
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const updated = cart.map(item =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updated);
    localStorage.setItem('tribal_cart', JSON.stringify(updated));
  };

  const removeFromCart = (productId) => {
    const updated = cart.filter(item => item._id !== productId);
    setCart(updated);
    localStorage.setItem('tribal_cart', JSON.stringify(updated));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (!isClient) {
    return <div className="min-h-screen bg-kraft-200 flex items-center justify-center"><span>Loading...</span></div>;
  }

  return (
    <div className="min-h-screen bg-kraft-200">
      
      {/* Header */}
      <div className="bg-kraft-100 border-b border-kraft-800/10 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/shop" className="inline-flex items-center gap-2 text-tribal-clay font-bold hover:underline mb-4">
            <ArrowLeft size={18} /> Back to Shop
          </Link>
          <h1 className="font-heading text-4xl text-tribal-charcoal">Your Cart</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="font-heading text-3xl text-stone-500 mb-6">Your cart is empty</h2>
            <Link href="/shop" className="inline-block bg-tribal-turmeric text-tribal-charcoal font-bold py-4 px-8 rounded-lg hover:bg-yellow-500 transition-all">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cart.map(item => (
                  <div key={item._id} className="bg-white p-6 rounded-lg border border-kraft-800/10 flex gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400 text-xs">Image</span>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-heading text-lg text-tribal-charcoal">{item.name}</h3>
                      <p className="text-stone-600 text-sm mb-4">{item.weightValue}{item.unit}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-kraft-100 rounded px-3 py-2">
                          <button 
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1 hover:text-tribal-clay disabled:opacity-30"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-bold min-w-[1.5rem] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="p-1 hover:text-tribal-forest"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <span className="font-heading text-xl text-tribal-clay font-bold">
                          ₹{item.price * item.quantity}
                        </span>
                        
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="p-2 hover:bg-red-50 rounded text-red-500 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-lg border border-kraft-800/10 sticky top-6">
                <h2 className="font-heading text-2xl text-tribal-charcoal mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-kraft-800/10">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Subtotal</span>
                    <span className="font-bold">₹{getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Shipping</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Tax (est.)</span>
                    <span className="font-bold">₹{Math.round(getCartTotal() * 0.05)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-8">
                  <span className="font-heading text-lg">Total</span>
                  <span className="font-heading text-2xl text-tribal-clay font-bold">
                    ₹{getCartTotal() + Math.round(getCartTotal() * 0.05)}
                  </span>
                </div>

                <Link href="/checkout" className="w-full block text-center bg-tribal-turmeric hover:bg-yellow-500 text-tribal-charcoal font-bold py-4 rounded-lg transition-all">
                  Proceed to Checkout
                </Link>

                <button 
                  onClick={() => setCart([])}
                  className="w-full mt-3 border border-stone-300 text-stone-600 font-bold py-3 rounded-lg hover:bg-stone-50 transition-all"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
