'use client';

import { useState, useEffect } from 'react';
import { Eye, Trash2 } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { adminToken } = useAdmin();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/orders');
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        if (mounted) setOrders(data);
      } catch (e) {
        setOrders([]);
      }
    })();
    return () => { mounted = false };
  }, []);

  const handleDelete = (id) => {
    if (!confirm('Delete this order?')) return;
    (async () => {
      try {
        const token = adminToken || localStorage.getItem('admin_token') || 'devtoken';
        const res = await fetch(`/api/orders?id=${encodeURIComponent(id)}`, { method: 'DELETE', headers: { 'x-admin-token': token } });
        if (!res.ok) throw new Error('Failed');
        setOrders(prev => prev.filter(o => o.id !== id));
      } catch (e) {
        alert('Failed to delete order');
      }
    })();
  };

  if (selectedOrder) {
    return (
      <div>
        <button onClick={() => setSelectedOrder(null)} className="mb-6 text-tribal-turmeric hover:underline">
          ← Back to Orders
        </button>

        <div className="bg-white p-8 rounded-lg border border-kraft-800/10">
          <h2 className="font-heading text-2xl text-tribal-charcoal mb-6">Order #{selectedOrder.id}</h2>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-stone-600 text-sm mb-1">Customer Name</p>
              <p className="font-bold text-tribal-charcoal">{selectedOrder.customerName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-stone-600 text-sm mb-1">Order Date</p>
              <p className="font-bold text-tribal-charcoal">{new Date(selectedOrder.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-stone-600 text-sm mb-1">Total Amount</p>
              <p className="font-bold text-tribal-turmeric text-xl">₹{selectedOrder.total}</p>
            </div>
            <div>
              <p className="text-stone-600 text-sm mb-1">Status</p>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-700">
                Pending
              </span>
            </div>
          </div>

          <h3 className="font-heading text-lg text-tribal-charcoal mb-4">Items</h3>
          <div className="border border-kraft-800/10 rounded-lg overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-kraft-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Qty</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-kraft-800/10">
                {(selectedOrder.items || []).map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-3">{item.name}</td>
                    <td className="px-6 py-3">{item.quantity}</td>
                    <td className="px-6 py-3">₹{item.price}</td>
                    <td className="px-6 py-3 font-bold">₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-tribal-charcoal mb-2">Orders</h1>
        <p className="text-stone-600">Manage customer orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded-lg border border-kraft-800/10 text-center">
          <p className="text-stone-600">No orders yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-kraft-800/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-kraft-100 border-b border-kraft-800/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-kraft-800/10">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-kraft-50 transition-colors">
                    <td className="px-6 py-4 font-bold">#{order.id}</td>
                    <td className="px-6 py-4">{order.customerName || 'Guest'}</td>
                    <td className="px-6 py-4 text-sm">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-bold text-tribal-turmeric">₹{order.total}</td>
                    <td className="px-6 py-4 text-sm">{(order.items || []).length} items</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 rounded text-tribal-turmeric hover:bg-kraft-100 transition-all"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="p-2 rounded text-red-600 hover:bg-red-50 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
