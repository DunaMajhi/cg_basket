import Link from 'next/link';
import { ArrowRight, ShoppingBag, Heart, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-kraft-200">
      
      {/* HERO SECTION */}
      <div className="bg-tribal-mahua text-kraft-100 py-20 px-6 shadow-md relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              Welcome to Chhattisgarh Basket 🧺
            </h1>
            <p className="text-kraft-200 text-xl font-body mb-8 leading-relaxed">
              Authentic tribal produce directly from the farmers of Bastar and Surguja. 
              Support local communities while enjoying nature's finest products.
            </p>
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 bg-tribal-turmeric text-tribal-charcoal px-8 py-4 rounded-lg font-bold text-lg hover:bg-tribal-clay hover:text-kraft-100 transition-all duration-200 shadow-lg"
            >
              Shop Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-kraft-100 p-8 rounded-lg shadow-pouch border border-kraft-800/10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-tribal-turmeric rounded-full mb-4">
              <ShoppingBag size={32} className="text-tribal-charcoal" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-tribal-mahua mb-3">
              Authentic Products
            </h3>
            <p className="text-stone-600 font-body">
              100% genuine tribal produce sourced directly from local farmers and artisans.
            </p>
          </div>

          <div className="bg-kraft-100 p-8 rounded-lg shadow-pouch border border-kraft-800/10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-tribal-clay rounded-full mb-4">
              <Heart size={32} className="text-kraft-100" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-tribal-mahua mb-3">
              Support Communities
            </h3>
            <p className="text-stone-600 font-body">
              Your purchase directly supports tribal communities and preserves traditional practices.
            </p>
          </div>

          <div className="bg-kraft-100 p-8 rounded-lg shadow-pouch border border-kraft-800/10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-tribal-mahua rounded-full mb-4">
              <Users size={32} className="text-kraft-100" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-tribal-mahua mb-3">
              Fair Trade
            </h3>
            <p className="text-stone-600 font-body">
              Fair prices ensure farmers receive just compensation for their hard work.
            </p>
          </div>

        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <div className="bg-kraft-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-tribal-mahua text-center mb-12">
            Explore Our Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <Link href="/shop" className="bg-kraft-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-center border border-kraft-800/10 hover:border-tribal-clay group">
              <div className="text-4xl mb-3">🌾</div>
              <h3 className="font-heading text-xl font-bold text-tribal-mahua group-hover:text-tribal-clay">
                Grains
              </h3>
            </Link>

            <Link href="/shop" className="bg-kraft-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-center border border-kraft-800/10 hover:border-tribal-clay group">
              <div className="text-4xl mb-3">🍯</div>
              <h3 className="font-heading text-xl font-bold text-tribal-mahua group-hover:text-tribal-clay">
                Forest Produce
              </h3>
            </Link>

            <Link href="/shop" className="bg-kraft-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-center border border-kraft-800/10 hover:border-tribal-clay group">
              <div className="text-4xl mb-3">🌶️</div>
              <h3 className="font-heading text-xl font-bold text-tribal-mahua group-hover:text-tribal-clay">
                Spices
              </h3>
            </Link>

            <Link href="/shop" className="bg-kraft-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-center border border-kraft-800/10 hover:border-tribal-clay group">
              <div className="text-4xl mb-3">🥘</div>
              <h3 className="font-heading text-xl font-bold text-tribal-mahua group-hover:text-tribal-clay">
                Snacks
              </h3>
            </Link>

          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-tribal-mahua text-kraft-100 p-12 rounded-lg shadow-xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Authentic Tribal Products?
          </h2>
          <p className="text-kraft-200 text-lg mb-8 max-w-2xl mx-auto">
            Browse our collection of handpicked products and bring home the essence of Chhattisgarh.
          </p>
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 bg-tribal-turmeric text-tribal-charcoal px-8 py-4 rounded-lg font-bold text-lg hover:bg-kraft-100 transition-all duration-200 shadow-lg"
          >
            Start Shopping <ArrowRight size={20} />
          </Link>
        </div>
      </div>

    </div>
  );
}