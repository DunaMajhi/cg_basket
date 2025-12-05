'use client';

import { useAdmin } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, ShoppingCart, Settings, LogOut, Menu } from 'lucide-react';

export default function AdminDashboardLayout({ children }) {
  const { isAdmin, isLoading, logout } = useAdmin();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-kraft-200 flex items-center justify-center">
        <p className="text-lg text-tribal-charcoal">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-kraft-100 flex">
      {/* Sidebar */}
      <div className={`fixed lg:static w-64 bg-tribal-charcoal text-kraft-100 h-screen overflow-y-auto transition-transform duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6">
          <h2 className="font-heading text-2xl mb-8">Tribal Admin</h2>
          
          <nav className="space-y-3">
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-tribal-forest transition-all">
              <Package size={20} />
              <span>Dashboard</span>
            </Link>

            <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-tribal-forest transition-all">
              <Package size={20} />
              <span>Products</span>
            </Link>

            <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-tribal-forest transition-all">
              <ShoppingCart size={20} />
              <span>Orders</span>
            </Link>

            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-tribal-forest transition-all">
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </nav>

          <div className="mt-12 pt-6 border-t border-kraft-100/20">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-all text-left"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-white border-b border-kraft-800/10 px-6 py-4 flex items-center justify-between lg:hidden">
          <h1 className="font-heading text-xl text-tribal-charcoal">Admin</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-kraft-100 text-tribal-charcoal"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6 lg:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
