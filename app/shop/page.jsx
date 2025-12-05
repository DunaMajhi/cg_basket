import ProductGridClient from '@/components/ProductGridClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function ShopPage() {
  // Server-side fetch for SEO — fetch products from internal API
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${base}/api/products`, { cache: 'no-store' });
  let products = [];
  try {
    if (res.ok) products = await res.json();
  } catch (e) { products = []; }

  return (
    <div className="min-h-screen bg-kraft-200">
      
      {/* 1. PAGE HEADER */}
      <div className="bg-kraft-100 border-b border-kraft-800/10 py-6 px-4">
        <div className="container">
          <Link href="/" className="inline-flex items-center gap-2 text-tribal-clay font-bold hover:underline mb-4">
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </div>
      </div>

      <div className="bg-tribal-mahua text-kraft-100 py-12 px-6 shadow-md">
          <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">
            The Chhattisgarh Basket
          </h1>
          <p className="text-kraft-200 text-lg font-body max-w-2xl">
            Authentic tribal produce directly from the farmers of Bastar and Surguja.
          </p>
        </div>
      </div>
      {/* Render client-side grid with initial server data for SEO */}
      <ProductGridClient initialProducts={products} />
    </div>
  );
}