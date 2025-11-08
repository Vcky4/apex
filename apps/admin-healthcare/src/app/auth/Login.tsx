import { useState } from 'react';
import { Button } from '@apex-providers/ui-components';

interface LoginProps {
  onLogin: (credentials: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('HEALTHCARE_HR_EXECUTIVE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password, role });
  };

  const quickLogin = (userRole: string, userEmail: string) => {
    onLogin({ email: userEmail, password: 'password', role: userRole });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-healthcare-red to-apex-deep-blue flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <span className="text-healthcare-red font-bold text-4xl">H</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Healthcare Admin</h1>
          <p className="text-white/80">Healthcare Management System</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-charcoal-gray mb-6">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-red placeholder:text-gray-400"
                placeholder="you@hospital.com"
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
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-red placeholder:text-gray-400"
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
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-red"
              >
                <option value="HEALTHCARE_HR_EXECUTIVE">Healthcare HR Executive</option>
                <option value="HEALTHCARE_FINANCE_EXECUTIVE">Healthcare Finance Executive</option>
                <option value="CLINICAL_OPERATIONS_EXECUTIVE">Clinical Operations Executive</option>
                <option value="QUALITY_COMPLIANCE_EXECUTIVE">Quality & Compliance Executive</option>
                <option value="HEALTHCARE_IT_EXECUTIVE">Healthcare IT Executive</option>
              </select>
            </div>

            <Button type="submit" fullWidth size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600 mb-4">Quick Demo Login:</p>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => quickLogin('HEALTHCARE_HR_EXECUTIVE', 'hr@hospital.com')}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium text-left"
                >
                  👥 HR Executive
                </button>
                <button
                  onClick={() => quickLogin('HEALTHCARE_FINANCE_EXECUTIVE', 'finance@hospital.com')}
                  className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium text-left"
                >
                  💰 Finance Executive
                </button>
                <button
                  onClick={() => quickLogin('CLINICAL_OPERATIONS_EXECUTIVE', 'clinical@hospital.com')}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium text-left"
                >
                  🏥 Clinical Operations
                </button>
                <button
                  onClick={() => quickLogin('QUALITY_COMPLIANCE_EXECUTIVE', 'quality@hospital.com')}
                  className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium text-left"
                >
                  ✅ Quality & Compliance
                </button>
                <button
                  onClick={() => quickLogin('HEALTHCARE_IT_EXECUTIVE', 'it@hospital.com')}
                  className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm font-medium text-left col-span-2"
                >
                  💻 Healthcare IT Executive
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-white/60 text-sm mt-6">
          © 2025 Apex Providers. All rights reserved.
        </p>
      </div>
    </div>
  );
}

