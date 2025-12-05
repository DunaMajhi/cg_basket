'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-kraft-200">
      
      {/* Header */}
      <div className="bg-kraft-100 border-b border-kraft-800/10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-5xl text-tribal-charcoal mb-4">Get In Touch</h1>
          <p className="text-stone-600 text-lg">We'd love to hear from you</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-white p-8 rounded-lg border border-kraft-800/10 text-center">
            <Mail size={40} className="text-tribal-clay mx-auto mb-4" />
            <h3 className="font-heading text-lg text-tribal-charcoal mb-2">Email</h3>
            <p className="text-stone-600 mb-4">dunamajhi@gmail.com</p>
            <p className="text-sm text-stone-500">We respond within 24 hours</p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-kraft-800/10 text-center">
            <Phone size={40} className="text-tribal-forest mx-auto mb-4" />
            <h3 className="font-heading text-lg text-tribal-charcoal mb-2">WhatsApp</h3>
            <p className="text-stone-600 mb-4">+918962835124</p>
            <p className="text-sm text-stone-500">Monday - Saturday, 10 AM - 6 PM</p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-kraft-800/10 text-center">
            <MapPin size={40} className="text-red-500 mx-auto mb-4" />
            <h3 className="font-heading text-lg text-tribal-charcoal mb-2">Address</h3>
            <p className="text-stone-600 mb-4">Bilaspur, Chhattisgarh</p>
            <p className="text-sm text-stone-500">India 495001</p>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <div className="bg-white p-10 rounded-lg border border-kraft-800/10">
            <h2 className="font-heading text-2xl text-tribal-charcoal mb-8">Send us a Message</h2>
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="mb-4 text-4xl">✓</div>
                <h3 className="font-heading text-2xl text-green-600 mb-2">Message Sent!</h3>
                <p className="text-stone-600">Thank you for reaching out. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-stone-600 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 border border-kraft-800/10 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-600 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 border border-kraft-800/10 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-600 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    className="w-full px-4 py-3 border border-kraft-800/10 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-600 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you think..."
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-kraft-800/10 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-tribal-turmeric hover:bg-yellow-500 text-tribal-charcoal font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="font-heading text-2xl text-tribal-charcoal mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-lg border border-kraft-800/10">
                <h3 className="font-bold text-tribal-charcoal mb-2 flex items-center gap-2">
                  <MessageSquare size={18} className="text-tribal-clay" />
                  How are your products sourced?
                </h3>
                <p className="text-stone-600 text-sm mt-3">
                  We work directly with tribal farmers and producer cooperatives in Chhattisgarh. All products are organically grown and sustainably harvested.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-kraft-800/10">
                <h3 className="font-bold text-tribal-charcoal mb-2 flex items-center gap-2">
                  <MessageSquare size={18} className="text-tribal-clay" />
                  What is your return policy?
                </h3>
                <p className="text-stone-600 text-sm mt-3">
                  We offer a 7-day money-back guarantee if you're not satisfied with your purchase. Please contact us with photos of the product.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-kraft-800/10">
                <h3 className="font-bold text-tribal-charcoal mb-2 flex items-center gap-2">
                  <MessageSquare size={18} className="text-tribal-clay" />
                  How long does delivery take?
                </h3>
                <p className="text-stone-600 text-sm mt-3">
                  Standard delivery takes 5-7 business days. We offer express delivery to major cities within 2-3 business days.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-kraft-800/10">
                <h3 className="font-bold text-tribal-charcoal mb-2 flex items-center gap-2">
                  <MessageSquare size={18} className="text-tribal-clay" />
                  Can I become a farmer partner?
                </h3>
                <p className="text-stone-600 text-sm mt-3">
                  Yes! We're always looking to partner with more farmers. Please fill out our partnership form or contact us directly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-kraft-800/10">
                <h3 className="font-bold text-tribal-charcoal mb-2 flex items-center gap-2">
                  <MessageSquare size={18} className="text-tribal-clay" />
                  Do you ship internationally?
                </h3>
                <p className="text-stone-600 text-sm mt-3">
                  Currently, we ship within India. International shipping is coming soon! Subscribe to our newsletter for updates.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
