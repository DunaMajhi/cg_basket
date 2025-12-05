import Link from 'next/link';
import { Heart, Users, Sprout, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-kraft-200">
      
      {/* Header */}
      <div className="bg-kraft-100 border-b border-kraft-800/10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-5xl text-tribal-charcoal mb-4">About Chhattisgarh Basket</h1>
          <p className="text-stone-600 text-lg">Bridging tribal farmers with conscious consumers</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-heading text-3xl text-tribal-charcoal mb-6">Our Mission</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Chhattisgarh Basket is dedicated to empowering tribal communities in Chhattisgarh by connecting them directly with consumers who value authentic, organic, and sustainably produced goods.
            </p>
            <p className="text-stone-600 leading-relaxed">
              We believe in fair trade practices, transparent pricing, and building long-term relationships with our farmer partners. Every purchase supports families, preserves traditional knowledge, and promotes sustainable farming practices.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg border border-kraft-800/10">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-64 rounded flex items-center justify-center">
              <span className="text-gray-400">Mission Image</span>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="font-heading text-3xl text-tribal-charcoal mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="bg-white p-6 rounded-lg border border-kraft-800/10 text-center hover:shadow-lg transition-shadow">
              <Heart size={40} className="text-red-500 mx-auto mb-4" />
              <h3 className="font-heading text-lg text-tribal-charcoal mb-3">Fair Trade</h3>
              <p className="text-stone-600 text-sm">We ensure tribal farmers receive fair prices for their work and dedication.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-kraft-800/10 text-center hover:shadow-lg transition-shadow">
              <Sprout size={40} className="text-tribal-forest mx-auto mb-4" />
              <h3 className="font-heading text-lg text-tribal-charcoal mb-3">Sustainability</h3>
              <p className="text-stone-600 text-sm">Our products are grown organically, respecting nature and preserving ecosystems.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-kraft-800/10 text-center hover:shadow-lg transition-shadow">
              <Users size={40} className="text-tribal-clay mx-auto mb-4" />
              <h3 className="font-heading text-lg text-tribal-charcoal mb-3">Community</h3>
              <p className="text-stone-600 text-sm">We invest in education, health, and cultural preservation for tribal communities.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-kraft-800/10 text-center hover:shadow-lg transition-shadow">
              <Award size={40} className="text-tribal-turmeric mx-auto mb-4" />
              <h3 className="font-heading text-lg text-tribal-charcoal mb-3">Quality</h3>
              <p className="text-stone-600 text-sm">Every product meets strict quality standards and is handled with care.</p>
            </div>

          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-white rounded-lg border border-kraft-800/10 p-12 mb-16">
          <h2 className="font-heading text-3xl text-tribal-charcoal mb-12 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-heading text-4xl text-tribal-clay mb-2">500+</p>
              <p className="text-stone-600">Tribal Farmers Supported</p>
            </div>
            <div>
              <p className="font-heading text-4xl text-tribal-clay mb-2">10,000+</p>
              <p className="text-stone-600">Happy Customers Worldwide</p>
            </div>
            <div>
              <p className="font-heading text-4xl text-tribal-clay mb-2">₹5 Cr+</p>
              <p className="text-stone-600">Direct Income to Farmers</p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-80 rounded flex items-center justify-center order-2 md:order-1">
            <span className="text-gray-400">Founder Story Image</span>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-heading text-3xl text-tribal-charcoal mb-6">Our Story</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Chhattisgarh Basket was founded with a simple dream: to create a platform where tribal farmers could share their heritage and products with the world, without intermediaries taking unfair cuts.
            </p>
            <p className="text-stone-600 leading-relaxed mb-4">
              Starting from a small village cooperative in Bilaspur, we've grown to partner with farming communities across Chhattisgarh. Today, we represent over 500 farmers and their families.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Every grain of rice, every drop of honey, every spice in our collection tells a story of resilience, tradition, and passion for the land.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-tribal-turmeric rounded-lg p-12 text-center mb-16">
          <h2 className="font-heading text-3xl text-tribal-charcoal mb-4">Join Our Mission</h2>
          <p className="text-tribal-charcoal mb-8 max-w-2xl mx-auto">
            Every purchase you make supports sustainable farming, preserves cultural heritage, and improves the lives of tribal families.
          </p>
          <Link href="/shop" className="inline-block bg-tribal-charcoal text-white font-bold py-4 px-8 rounded-lg hover:bg-tribal-forest transition-all">
            Start Supporting Farmers
          </Link>
        </div>

      </div>
    </div>
  );
}
