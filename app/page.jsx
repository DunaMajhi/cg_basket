'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

// 1. STATIC DATA (No Fetching = No Crashing)
const INITIAL_PRODUCTS = [
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
    _id: '2',
    slug: 'red-rice-1kg',
    name: 'Red Rice',
    price: 120,
    unit: 'kg',
    weightValue: 1,
    category: 'Grains',
    stock: 50,
    images: [{ url: '/images/red-rice.jpg' }],
    farmerDetails: { name: 'Sunita Devi', location: 'Dantewada' }
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
    _id: '4',
    slug: 'chironjee-250g',
    name: 'Chironjee Seeds',
    price: 260,
    unit: 'g',
    weightValue: 250,
    category: 'Forest Produce',
    stock: 10,
    images: [{ url: '/images/chironjee.jpg' }],
    farmerDetails: { name: 'Village SHG', location: 'Surguja' }
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
  },
  {
    _id: '6',
    slug: 'papad-packet-200g',
    name: 'Handmade Papad',
    price: 60,
    unit: 'g',
    weightValue: 200,
    category: 'Snacks',
    stock: 40,
    images: [{ url: '/images/papad.jpg' }],
    farmerDetails: { name: 'Mahila Samiti', location: 'Bilaspur' }
  }
];

const CATEGORIES = ['All', 'Grains', 'Forest Produce', 'Spices', 'Snacks'];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Filtering logic
  const filteredProducts = activeCategory === 'All' 
    ? INITIAL_PRODUCTS 
    : INITIAL_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-kraft-200">
      
      {/* HEADER */}
      <div className="bg-tribal-mahua text-kraft-100 py-12 px-6 shadow-md relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">
            The Chhattisgarh Basket
          </h1>
          <p className="text-kraft-200 text-lg font-body max-w-2xl">
            Authentic tribal produce directly from the farmers of Bastar and Surguja.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-kraft-100 p-6 rounded-lg shadow-pouch border border-kraft-800/10 sticky top-4">
            <div className="flex items-center gap-2 mb-4 text-tribal-mahua">
              <Filter size={20} />
              <h2 className="font-heading text-xl font-bold">Filters</h2>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-stone-600 text-sm uppercase tracking-wider mb-2">Categories</h3>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors text-sm font-medium ${
                    activeCategory === cat 
                      ? 'bg-tribal-turmeric text-tribal-charcoal shadow-sm' 
                      : 'text-stone-600 hover:bg-kraft-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* GRID */}
        <main className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <p className="text-stone-500 text-sm">
              Showing <span className="font-bold text-tribal-charcoal">{filteredProducts.length}</span> products
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-heading text-stone-500">No products found.</h3>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}