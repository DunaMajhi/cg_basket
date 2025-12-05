'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { LogIn } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login, isAdmin } = useAdmin();

  // Redirect if already logged in
  if (isAdmin) {
    router.push('/admin/dashboard');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (login(username, password)) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tribal-charcoal to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="flex justify-center mb-8">
            <div className="bg-tribal-turmeric p-4 rounded-full">
              <LogIn size={32} className="text-tribal-charcoal" />
            </div>
          </div>

          <h1 className="font-heading text-3xl text-tribal-charcoal text-center mb-2">Admin Panel</h1>
          <p className="text-center text-stone-600 mb-8">Manage your tribal products</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="w-full px-4 py-3 border border-kraft-800/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-tribal-turmeric transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full px-4 py-3 border border-kraft-800/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-tribal-turmeric transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-tribal-turmeric hover:bg-yellow-500 disabled:bg-yellow-400 text-tribal-charcoal font-bold py-3 rounded-lg transition-all"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-stone-500 text-xs mt-8">
            🔐 Default: username: <code className="bg-gray-100 px-2 py-1 rounded">admin</code> | password: <code className="bg-gray-100 px-2 py-1 rounded">tribal@2024</code>
          </p>
        </div>
      </div>
    </div>
  );
}
