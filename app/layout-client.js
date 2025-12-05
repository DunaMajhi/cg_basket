'use client';

import { CartProvider } from '@/context/CartContext';
import { AdminProvider } from '@/context/AdminContext';
import CartSidebar from '@/components/CartSidebar';
import Navbar from '@/components/Navbar';
import FloatingCheckout from '@/components/FloatingCheckout';
import { usePathname } from 'next/navigation';

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // Don't render store components on admin pages
  if (isAdmin) {
    return (
      <AdminProvider>
        {children}
      </AdminProvider>
    );
  }

  return (
    <AdminProvider>
      <CartProvider>
        <Navbar />
        {children}
        <CartSidebar />
        <FloatingCheckout />
      </CartProvider>
    </AdminProvider>
  );
}
