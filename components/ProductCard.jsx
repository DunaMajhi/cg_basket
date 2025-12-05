import Link from 'next/link';

// Assuming you are using Lucide React for icons (standard in Next.js)
// npm install lucide-react
import { ShoppingBag, Leaf, AlertCircle } from 'lucide-react';

const ProductCard = ({ product }) => {
  // Destructure for cleaner code
  const { 
    slug, 
    name, 
    price, 
    unit, 
    weightValue, 
    images, 
    farmerDetails, 
    category,
    stock 
  } = product;

  return (
    <div className="group relative flex flex-col justify-between h-full card-elevated">
      
      {/* 1. IMAGE "WINDOW" SECTION */}
      {/* This mimics the "transparent window" on the packaging */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-kraft-100 to-kraft-200 border-b border-kraft-800/10">
        <Link href={`/product/${slug}`} className="block w-full h-full">
          <img
            src={images?.[0]?.url || '/images/placeholder.png'}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </Link>
        
        {/* Category Tag - Absolute positioning for style */}
        <span className="absolute top-3 left-3 product-badge shadow-md">
          {category}
        </span>

        {/* Stock Status Badge */}
        {stock <= 5 && stock > 0 && (
          <div className="absolute top-3 right-3 bg-tribal-turmeric/90 text-tribal-charcoal px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
            <AlertCircle size={12} />
            Low Stock
          </div>
        )}
      </div>

      {/* 2. PRODUCT DETAILS */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Farmer Info - CRITICAL for Branding */}
        <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-kraft-800/10">
          <Leaf size={14} className="text-tribal-forest flex-shrink-0" />
          <p className="text-xs text-tribal-forest font-medium line-clamp-1">
            {farmerDetails?.name || 'Unknown Farmer'} · {farmerDetails?.location || 'Unknown'}
          </p>
        </div>

        {/* Title */}
        <Link href={`/product/${slug}`}>
          <h3 className="font-heading text-lg font-semibold text-tribal-charcoal leading-snug mb-2 group-hover:text-tribal-mahua transition-colors duration-200 line-clamp-2">
            {name}
          </h3>
        </Link>

        {/* Unit/Weight */}
        <p className="text-sm text-stone-500 mb-4 font-medium">
          {weightValue}{unit}
        </p>

        {/* 3. PRICE & ACTION FOOTER */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-kraft-800/10 gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-stone-500 font-medium">Price</span>
            <span className="font-heading text-2xl font-bold text-tribal-clay">
              ₹{price}
            </span>
          </div>

          {/* Logic: If out of stock, disable button */}
          {stock > 0 ? (
            <button 
              className="inline-flex items-center justify-center gap-2 bg-green-700 text-white font-semibold py-2 px-3 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition-all duration-200"
              onClick={() => alert(`Added ${name} to cart`)}
            >
              <ShoppingBag size={16} />
              <span>Add</span>
            </button>
          ) : (
            <div className="bg-red-50 border border-red-200 text-red-600 font-bold text-xs px-3 py-2 rounded-lg flex items-center gap-1">
              <AlertCircle size={14} />
              Sold Out
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;