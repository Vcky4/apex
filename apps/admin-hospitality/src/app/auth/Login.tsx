import { useState } from 'react';
import { Button } from '@apex-providers/ui-components';

interface LoginProps {
  onLogin: (credentials: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('OPERATIONS_ADMIN');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password, role });
  };

  const quickLogin = (userRole: string, userEmail: string) => {
    onLogin({ email: userEmail, password: 'password', role: userRole });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-gold-500 flex items-center justify-center p-4" style={{ background: 'linear-gradient(to bottom right, #000080, #DAA520)' }}>
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 border-4 border-gold-500">
            <span className="text-navy-900 font-bold text-4xl">H</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Hospitality Management</h1>
          <p className="text-white/80">Apex Hospitality Admin System</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder:text-gray-400"
                placeholder="admin@hotel.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder:text-gray-400"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Login As
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="HR_ADMIN">HR Administrator</option>
                <option value="FINANCE_ADMIN">Finance Administrator</option>
                <option value="OPERATIONS_ADMIN">Operations Administrator</option>
              </select>
            </div>

            <Button type="submit" fullWidth size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600 mb-4">Quick Demo Login:</p>
            <div className="space-y-2">
              <button
                onClick={() => quickLogin('HR_ADMIN', 'hr@hotel.com')}
                className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium text-left"
              >
                👥 HR Administrator
              </button>
              <button
                onClick={() => quickLogin('FINANCE_ADMIN', 'finance@hotel.com')}
                className="w-full px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium text-left"
              >
                💰 Finance Administrator
              </button>
              <button
                onClick={() => quickLogin('OPERATIONS_ADMIN', 'ops@hotel.com')}
                className="w-full px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 text-sm font-medium text-left"
              >
                🏨 Operations Administrator
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-center text-white/40 text-xs mt-6">
          © 2025 Apex Providers. All rights reserved.
        </p>
      </div>
    </div>
  );
}

