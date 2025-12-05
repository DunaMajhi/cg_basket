'use client';

import { useState, useEffect } from 'react';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    cartItems: 0
  });

  useEffect(() => {
    // Load data from localStorage
    const savedCart = localStorage.getItem('tribal_cart');
    const savedOrders = localStorage.getItem('tribal_orders') || '[]';
    const allProducts = localStorage.getItem('all_products');

    let cart = [];
    let orders = [];

    try {
      cart = savedCart ? JSON.parse(savedCart) : [];
      orders = JSON.parse(savedOrders);
    } catch (e) {
      console.error('Failed to parse data');
    }

    // Calculate stats
    const cartTotal = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const ordersCount = orders.length;
    const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    setStats({
      totalProducts: 8, // From our hardcoded products
      totalOrders: ordersCount,
      totalRevenue: revenue,
      cartItems: cartTotal
    });
  }, []);

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-lg border border-kraft-800/10 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-stone-600 text-sm mb-2">{label}</p>
          <p className={`font-heading text-3xl ${color}`}>{value}</p>
        </div>
        <div className={`p-4 rounded-full ${color.replace('text-', 'bg-').replace('600', '100')}`}>
          <Icon size={32} className={color} />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-tribal-charcoal mb-2">Dashboard</h1>
        <p className="text-stone-600">Welcome to the Tribal Roots admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Package}
          label="Total Products"
          value={stats.totalProducts}
          color="text-tribal-forest"
        />
        <StatCard
          icon={ShoppingCart}
          label="Items in Cart"
          value={stats.cartItems}
          color="text-tribal-turmeric"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Orders"
          value={stats.totalOrders}
          color="text-tribal-clay"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Revenue"
          value={`₹${stats.totalRevenue}`}
          color="text-green-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-8 rounded-lg border border-kraft-800/10">
        <h2 className="font-heading text-2xl text-tribal-charcoal mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/admin/products" className="p-6 border border-kraft-800/10 rounded-lg hover:bg-kraft-100 transition-all text-center">
            <Package size={32} className="mx-auto mb-2 text-tribal-forest" />
            <p className="font-bold text-tribal-charcoal">Manage Products</p>
          </a>
          <a href="/admin/orders" className="p-6 border border-kraft-800/10 rounded-lg hover:bg-kraft-100 transition-all text-center">
            <ShoppingCart size={32} className="mx-auto mb-2 text-tribal-turmeric" />
            <p className="font-bold text-tribal-charcoal">View Orders</p>
          </a>
          <a href="/admin/settings" className="p-6 border border-kraft-800/10 rounded-lg hover:bg-kraft-100 transition-all text-center">
            <Users size={32} className="mx-auto mb-2 text-tribal-clay" />
            <p className="font-bold text-tribal-charcoal">Settings</p>
          </a>
          <a href="/" className="p-6 border border-kraft-800/10 rounded-lg hover:bg-kraft-100 transition-all text-center">
            <TrendingUp size={32} className="mx-auto mb-2 text-green-600" />
            <p className="font-bold text-tribal-charcoal">View Store</p>
          </a>
        </div>
      </div>
    </div>
  );
}
