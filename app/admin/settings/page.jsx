'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    contactEmail: 'dunamajhi@gmail.com',
    contactPhone: '+918962835124',
    businessName: 'Chhattisgarh Basket',
    address: 'Bilaspur, Chhattisgarh, India 495001',
    description: 'Authentic tribal produce from Bastar',
    shippingCost: 50,
    freeShippingThreshold: 500
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('site_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load settings');
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('site_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-tribal-charcoal mb-2">Settings</h1>
        <p className="text-stone-600">Manage your site configuration</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg border border-kraft-800/10 max-w-2xl">
        <h2 className="font-heading text-2xl text-tribal-charcoal mb-6">Business Information</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={settings.businessName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-kraft-800/20 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={settings.contactEmail}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-kraft-800/20 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Contact Phone (WhatsApp)</label>
            <input
              type="text"
              name="contactPhone"
              value={settings.contactPhone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-kraft-800/20 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Business Address</label>
            <textarea
              name="address"
              value={settings.address}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-kraft-800/20 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Business Description</label>
            <textarea
              name="description"
              value={settings.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-kraft-800/20 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric resize-none"
            />
          </div>

          <hr className="my-8" />

          <h2 className="font-heading text-2xl text-tribal-charcoal mb-6">Shipping Settings</h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Shipping Cost (₹)</label>
              <input
                type="number"
                name="shippingCost"
                value={settings.shippingCost}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-kraft-800/20 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Free Shipping Threshold (₹)</label>
              <input
                type="number"
                name="freeShippingThreshold"
                value={settings.freeShippingThreshold}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-kraft-800/20 rounded focus:outline-none focus:ring-2 focus:ring-tribal-turmeric"
              />
            </div>
          </div>

          <div className="pt-6 flex items-center gap-4">
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all"
            >
              <Save size={20} />
              Save Settings
            </button>
            {saved && (
              <p className="text-green-600 font-bold">✓ Settings saved successfully</p>
            )}
          </div>
        </div>
      </form>

      <div className="mt-12 bg-blue-50 border border-blue-200 p-6 rounded-lg max-w-2xl">
        <h3 className="font-bold text-blue-900 mb-2">💡 Tip</h3>
        <p className="text-blue-800 text-sm">
          These settings are used across your website. Changes will appear immediately on the live site.
        </p>
      </div>
    </div>
  );
}
