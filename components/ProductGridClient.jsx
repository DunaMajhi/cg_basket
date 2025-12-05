'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';

export default function ProductGridClient({ initialProducts }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const CATEGORIES = ['All', 'Grains', 'Forest Produce', 'Spices', 'Snacks'];

  const filteredProducts = activeCategory === 'All'
    ? initialProducts
    : initialProducts.filter(p => p.category === activeCategory);

  return (
    <div>
      <div className="container px-4 py-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="p-6 rounded-lg shadow-pouch border border-kraft-800/10 sticky top-4 bg-kraft-100">
            <div className="flex items-center gap-2 mb-4 text-tribal-mahua">
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

            <div className="mt-8 pt-6 border-t border-stone-200">
              <div className="flex items-center gap-2 mb-2 text-tribal-mahua">
                <h3 className="font-bold text-sm">Price Range</h3>
              </div>
              <input type="range" className="w-full accent-tribal-forest" disabled />
              <div className="flex justify-between text-xs text-stone-500 mt-1">
                <span>₹50</span>
                <span>₹500</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <p className="text-stone-500 text-sm">
              Showing <span className="font-bold text-tribal-charcoal">{filteredProducts.length}</span> products
            </p>
            <select className="bg-kraft-100 border-none text-sm text-tribal-charcoal font-medium focus:ring-0 cursor-pointer">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-heading text-stone-500">No products found in this category.</h3>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
