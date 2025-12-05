'use client';

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductDetailClient({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  if (!product) return <div className="p-8">Product not found</div>;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <div>
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-96 rounded-lg flex items-center justify-center mb-6">
        <img src={product.images?.[0]?.url || '/images/placeholder.png'} alt={product.name} className="max-h-80 object-contain" />
      </div>

      <div className="mb-4">
        <span className="text-xs font-bold text-tribal-mahua uppercase bg-kraft-100 px-3 py-1 rounded">{product.category}</span>
      </div>

      <h1 className="font-heading text-4xl text-tribal-charcoal mb-2">{product.name}</h1>

      <div className="flex items-center gap-2 mb-6 text-stone-600">
        <p className="text-sm">Grown by {product.farmerDetails?.name} in {product.farmerDetails?.location}</p>
      </div>

      <div className="mb-6">
        <p className="text-3xl font-heading text-tribal-clay font-bold">₹{product.price}</p>
        <p className="text-stone-600 text-sm mt-1">For {product.weightValue}{product.unit}</p>
      </div>

      <div className="mb-8 p-4 bg-white rounded border border-kraft-800/10">
        <p className="text-stone-700">{product.fullDescription}</p>
      </div>

      {product.stock > 0 ? (
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full flex items-center justify-center gap-2 bg-tribal-turmeric hover:bg-yellow-500 disabled:bg-yellow-400 text-tribal-charcoal font-bold py-4 rounded-lg transition-all text-lg"
        >
          <ShoppingBag size={24} /> {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      ) : (
        <button disabled className="w-full bg-gray-300 text-gray-500 font-bold py-4 rounded-lg cursor-not-allowed">
          Out of Stock
        </button>
      )}
    </div>
  );
}
