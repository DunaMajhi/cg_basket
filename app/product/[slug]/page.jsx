import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductDetailClient from '@/components/ProductDetailClient';

export default async function ProductDetailPage({ params }) {
  const slug = params.slug;
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  let product = null;
  try {
    const res = await fetch(`${base}/api/products`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      product = data.find(p => p.slug === slug) || null;
    }
  } catch (e) {
    product = null;
  }

  return (
    <div className="min-h-screen bg-kraft-200">
      <div className="bg-kraft-100 border-b border-kraft-800/10 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/shop" className="inline-flex items-center gap-2 text-tribal-clay font-bold hover:underline">
            <ArrowLeft size={18} /> Back to Shop
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-96 rounded-lg flex items-center justify-center mb-6">
              {product ? (
                <img src={product.images?.[0]?.url || '/images/placeholder.png'} alt={product.name} className="max-h-80 object-contain" />
              ) : (
                <span className="text-gray-400 text-lg">Product image</span>
              )}
            </div>
          </div>

          <div>
            <ProductDetailClient product={product} />
          </div>
        </div>
      </div>

      <section className="py-16 bg-tribal-charcoal text-kraft-100">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="font-heading text-3xl mb-4">Support Tribal Communities</h2>
          <p className="text-lg text-stone-300 mb-8">Every purchase directly supports the livelihoods of tribal farmers and their families in Chhattisgarh.</p>
          <Link href="/shop" className="inline-block bg-tribal-turmeric text-tribal-charcoal font-bold py-4 px-8 rounded-lg hover:bg-yellow-400 transition-all">
            Explore More Products
          </Link>
        </div>
      </section>
    </div>
  );
}
