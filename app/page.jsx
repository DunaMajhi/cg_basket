'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, Users, Truck, Star, ShoppingBag, Check } from 'lucide-react';

// MOCK DATA FOR FEATURED PRODUCTS
const FEATURED_PRODUCTS = [
  {
    _id: '1',
    slug: 'black-rice-1kg',
    name: 'Black Rice (Karhani)',
    price: 180,
    unit: 'kg',
    weightValue: 1,
    category: 'Grains',
    stock: 20,
    images: [{ url: '/images/black-rice.jpg' }],
    farmerDetails: { name: 'Ramesh Netam', location: 'Bastar' }
  },
  {
    _id: '3',
    slug: 'mahua-honey-500g',
    name: 'Mahua Honey',
    price: 220,
    unit: 'g',
    weightValue: 500,
    category: 'Forest Produce',
    stock: 15,
    images: [{ url: '/images/honey.jpg' }],
    farmerDetails: { name: 'Tribal Co-op', location: 'Narayanpur' }
  },
  {
    _id: '5',
    slug: 'turmeric-powder-500g',
    name: 'Turmeric Powder',
    price: 90,
    unit: 'g',
    weightValue: 500,
    category: 'Spices',
    stock: 100,
    images: [{ url: '/images/turmeric.jpg' }],
    farmerDetails: { name: 'Anjali Farm', location: 'Raipur' }
  }
];

function SimpleProductCard({ product }) {
  const { slug, name, price, unit, weightValue, category, stock } = product;
  const emojis = {
    'Grains': '🍚',
    'Forest Produce': '🍯',
    'Spices': '🌿',
    'Snacks': '🥔'
  };
  
  return (
    <Link href={`/product/${slug}`}>
      <div className="group bg-white rounded-xl border-2 border-kraft-800/10 overflow-hidden hover:border-tribal-turmeric hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col card-elevated">
        <div className="bg-gradient-to-br from-tribal-turmeric/20 via-tribal-mahua/10 to-tribal-forest/10 h-56 flex items-center justify-center group-hover:from-tribal-turmeric/30 transition-all duration-300">
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{emojis[category] || '📦'}</span>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-bold text-tribal-charcoal uppercase tracking-wider bg-tribal-turmeric/20 px-3 py-1.5 rounded-full border border-tribal-turmeric/30">{category}</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-tribal-turmeric text-tribal-turmeric" />
              ))}
            </div>
          </div>
          <h3 className="font-heading text-lg font-bold text-tribal-charcoal mb-2 line-clamp-2 group-hover:text-tribal-mahua transition-colors duration-200">{name}</h3>
          <p className="text-sm text-stone-500 mb-4 font-medium">{weightValue}{unit}</p>
          
          <div className="flex items-center justify-between pt-4 border-t border-kraft-800/10 mt-auto">
            <span className="font-heading text-2xl font-bold text-tribal-clay">₹{price}</span>
            {stock > 0 ? (
              <button className="inline-flex items-center justify-center gap-2 bg-green-700 text-white font-semibold py-2 px-3 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition-all duration-200">
                <ShoppingBag size={18} />
              </button>
            ) : (
              <span className="text-red-500 font-bold text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200">Sold Out</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-kraft-200">
      
      {/* ENHANCED HERO SECTION */}
      <section className="site-hero relative overflow-hidden py-20">
        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-tribal-turmeric rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-tribal-forest rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="container text-center relative z-10">
          <div className="mb-6 inline-block text-6xl animate-bounce">🧺</div>
          <h1 className="hero-title">
            Support Tribal <span className="text-tribal-turmeric">Farmers</span>
          </h1>
          <p className="text-xl md:text-2xl text-tribal-charcoal mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            Authentic, organic products directly from the tribal communities of Chhattisgarh. Every purchase supports fair wages and cultural preservation.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <Link href="/shop" className="inline-flex items-center justify-center gap-2 px-8 py-3 text-lg bg-green-700 text-white font-bold rounded-lg hover:bg-green-600">
              <ShoppingBag size={20} />
              <span>Shop Now</span>
            </Link>
            <Link href="/about" className="inline-flex items-center justify-center gap-2 px-8 py-3 text-lg border-2 border-green-700 text-green-700 font-bold rounded-lg hover:bg-green-50">
              Learn Our Story
            </Link>
          </div>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur">
              <Check size={18} className="text-tribal-turmeric" />
              <span>100% Organic</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur">
              <Check size={18} className="text-tribal-turmeric" />
              <span>Fair Trade</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur">
              <Check size={18} className="text-tribal-turmeric" />
              <span>Free Shipping</span>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITIONS */}
      <section className="py-20 px-4 bg-kraft-100">
        <div className="container">
          <h2 className="font-heading text-4xl text-tribal-charcoal mb-16 text-center font-bold">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-compact p-8">
              <div className="bg-gradient-to-br from-tribal-forest/20 to-tribal-forest/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Leaf size={32} className="text-tribal-forest" />
              </div>
              <h3 className="font-heading text-2xl text-tribal-charcoal mb-3 font-bold">100% Organic</h3>
              <p className="text-stone-600 leading-relaxed">Pesticide-free, naturally grown products from sustainable tribal farms</p>
            </div>
            <div className="bg-white p-8 rounded-xl border-2 border-kraft-800/10 hover:border-tribal-turmeric hover:shadow-lg transition-all duration-300 text-center group">
              <div className="bg-gradient-to-br from-tribal-clay/20 to-tribal-clay/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users size={32} className="text-tribal-clay" />
              </div>
              <h3 className="font-heading text-2xl text-tribal-charcoal mb-3 font-bold">Fair Trade</h3>
              <p className="text-stone-600 leading-relaxed">Direct support to farmers with guaranteed fair prices and respect</p>
            </div>
            <div className="bg-white p-8 rounded-xl border-2 border-kraft-800/10 hover:border-tribal-turmeric hover:shadow-lg transition-all duration-300 text-center group">
              <div className="bg-gradient-to-br from-tribal-turmeric/20 to-tribal-turmeric/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Truck size={32} className="text-tribal-turmeric-dark" />
              </div>
              <h3 className="font-heading text-2xl text-tribal-charcoal mb-3 font-bold">Free Shipping</h3>
              <p className="text-stone-600 leading-relaxed">Fast delivery on all orders over ₹500 across India</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-tribal-charcoal mb-4 font-bold">Featured Products</h2>
            <p className="text-lg text-stone-600">Handpicked favorites from our tribal partners</p>
            <div className="w-24 h-1 bg-gradient-to-r from-tribal-mahua via-tribal-turmeric to-tribal-forest rounded-full mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_PRODUCTS.map(product => (
              <SimpleProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop" className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 px-10 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* FARMER STORY */}
      <section className="py-20 px-4 bg-gradient-to-br from-kraft-100 to-tribal-mahua/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-tribal-mahua to-tribal-turmeric rounded-2xl opacity-20 blur-lg"></div>
            <div className="relative bg-gradient-to-br from-tribal-turmeric/30 via-tribal-mahua/20 to-tribal-forest/20 h-96 rounded-2xl flex items-center justify-center border-2 border-tribal-mahua/30">
              <div className="text-center">
                <span className="text-8xl mb-4 block">👨‍🌾</span>
                <p className="text-tribal-charcoal font-bold text-lg">Meet Our Farmers</p>
              </div>
            </div>
          </div>
          <div>
            <span className="text-tribal-turmeric font-bold uppercase tracking-wider text-sm">Our Story</span>
            <h2 className="font-heading text-4xl md:text-5xl text-tribal-charcoal mb-6 font-bold mt-2">Supporting Tribal Communities</h2>
            <p className="text-stone-700 mb-4 leading-relaxed text-lg">
              For generations, the tribal communities of Chhattisgarh have cultivated the land sustainably, preserving ancient farming techniques and respecting nature.
            </p>
            <p className="text-stone-700 mb-8 leading-relaxed text-lg">
              Through Chhattisgarh Basket, these hardworking farmers can now share their authentic products with conscious consumers worldwide, ensuring fair compensation and cultural preservation.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-tribal-turmeric flex items-center justify-center">
                  <Check size={18} className="text-white" />
                </div>
                <span className="text-stone-700 font-medium">Direct support to over 500 tribal farmers</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-tribal-turmeric flex items-center justify-center">
                  <Check size={18} className="text-white" />
                </div>
                <span className="text-stone-700 font-medium">₹5 Crore+ directed to tribal communities</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-tribal-turmeric flex items-center justify-center">
                  <Check size={18} className="text-white" />
                </div>
                <span className="text-stone-700 font-medium">Sustainable practices and cultural preservation</span>
              </div>
            </div>
            <Link href="/about" className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4 bg-gradient-to-r from-tribal-charcoal to-tribal-mahua text-kraft-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl mb-6 font-bold">Ready to Support Tribal Farmers?</h2>
          <p className="text-xl text-kraft-200 mb-8">Start your journey with authentic, organic tribal products</p>
          <Link href="/shop" className="inline-flex items-center justify-center gap-2 bg-tribal-turmeric hover:bg-tribal-turmeric/90 text-tribal-charcoal font-bold py-4 px-12 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-md text-lg">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}