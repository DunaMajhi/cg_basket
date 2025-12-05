'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit-card'
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTax = () => Math.round(getCartTotal() * 0.05);
  const getFinalTotal = () => getCartTotal() + getTax();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order processing
    setOrderPlaced(true);
    setTimeout(() => {
      localStorage.setItem('tribal_cart', JSON.stringify([]));
      setCart([]);
    }, 1000);
  };

  if (!isClient) {
    return <div className="min-h-screen bg-kraft-200 flex items-center justify-center"><span>Loading...</span></div>;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-kraft-200 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg p-12 text-center max-w-lg shadow-lg">
          <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
          <h1 className="font-heading text-4xl text-tribal-charcoal mb-4">Order Confirmed!</h1>
          <p className="text-stone-600 mb-8">
            Thank you for your order. Your tribal basket has been carefully prepared and will be shipped within 2-3 business days.
          </p>
          <p className="text-sm text-stone-500 mb-8">
            A confirmation email has been sent to <strong>{formData.email}</strong>
          </p>
          <Link href="/shop" className="inline-block bg-tribal-turmeric hover:bg-yellow-500 text-tribal-charcoal font-bold py-4 px-8 rounded-lg transition-all">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-kraft-200">
        <div className="bg-kraft-100 border-b border-kraft-800/10 py-6 px-4">
          <div className="max-w-6xl mx-auto">
            <Link href="/shop" className="inline-flex items-center gap-2 text-tribal-clay font-bold hover:underline mb-4">
              <ArrowLeft size={18} /> Back to Shop
            </Link>
            <h1 className="font-heading text-4xl text-tribal-charcoal">Checkout</h1>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <p className="text-stone-600 mb-6">Your cart is empty. Add items before checking out.</p>
          <Link href="/shop" className="inline-block bg-tribal-turmeric text-tribal-charcoal font-bold py-4 px-8 rounded-lg hover:bg-yellow-500 transition-all">
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kraft-200">
      
      {/* Header */}
      <div className="bg-kraft-100 border-b border-kraft-800/10 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/cart" className="inline-flex items-center gap-2 text-tribal-clay font-bold hover:underline mb-4">
            <ArrowLeft size={18} /> Back to Cart
          </Link>
          <h1 className="font-heading text-4xl text-tribal-charcoal">Checkout</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Shipping Information */}
              <div className="bg-white p-8 rounded-lg border border-kraft-800/10">
                <h2 className="font-heading text-2xl text-tribal-charcoal mb-6">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="col-span-2 md:col-span-1 px-4 py-3 border border-kraft-800/10 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="col-span-2 md:col-span-1 px-4 py-3 border border-kraft-800/10 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="col-span-2 px-4 py-3 border border-kraft-800/10 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="col-span-2 px-4 py-3 border border-kraft-800/10 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="col-span-2 px-4 py-3 border border-kraft-800/10 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="col-span-2 md:col-span-1 px-4 py-3 border border-kraft-800/10 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State/Province"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="col-span-2 md:col-span-1 px-4 py-3 border border-kraft-800/10 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP/Postal Code"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="col-span-2 px-4 py-3 border border-kraft-800/10 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white p-8 rounded-lg border border-kraft-800/10">
                <h2 className="font-heading text-2xl text-tribal-charcoal mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 border border-kraft-800/10 rounded cursor-pointer hover:bg-kraft-100">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <span className="font-bold text-tribal-charcoal">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-kraft-800/10 rounded cursor-pointer hover:bg-kraft-100">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <span className="font-bold text-tribal-charcoal">UPI</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-kraft-800/10 rounded cursor-pointer hover:bg-kraft-100">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={formData.paymentMethod === 'bank-transfer'}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <span className="font-bold text-tribal-charcoal">Bank Transfer</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-tribal-turmeric hover:bg-yellow-500 text-tribal-charcoal font-heading text-lg font-bold py-4 rounded-lg transition-all"
              >
                Place Order • ₹{getFinalTotal()}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-lg border border-kraft-800/10 sticky top-6">
              <h2 className="font-heading text-2xl text-tribal-charcoal mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-kraft-800/10">
                {cart.map(item => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-stone-600">{item.name} x{item.quantity}</span>
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

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
                  <span className="text-stone-600">Tax</span>
                  <span className="font-bold">₹{getTax()}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-heading text-lg">Total</span>
                <span className="font-heading text-2xl text-tribal-clay font-bold">₹{getFinalTotal()}</span>
              </div>

              <div className="bg-kraft-100 p-4 rounded text-xs text-stone-600">
                <p className="mb-2 font-bold text-tribal-charcoal">Support Indigenous Farmers</p>
                <p>Every purchase directly supports Chhattisgarh's tribal farmers and their families.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}