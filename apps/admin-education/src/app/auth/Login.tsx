import { useState } from 'react';
import { Button } from '@apex-providers/ui-components';

interface LoginProps {
  onLogin: (credentials: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMIN');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password, role });
  };

  const quickLogin = (userRole: string, userEmail: string) => {
    onLogin({ email: userEmail, password: 'password', role: userRole });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-authority-purple to-apex-deep-blue flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <span className="text-authority-purple font-bold text-4xl">E</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Springfield Elementary</h1>
          <p className="text-white/80">Education Management System</p>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                placeholder="you@school.edu"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
              >
                <option value="ADMIN">Administrator</option>
                <option value="TEACHER">Teacher</option>
                <option value="STUDENT">Student</option>
                <option value="PARENT">Parent</option>
              </select>
            </div>

            <Button type="submit" fullWidth size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600 mb-4">Quick Demo Login:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => quickLogin('ADMIN', 'principal@school.edu')}
                className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm font-medium"
              >
                👨‍💼 Admin
              </button>
              <button
                onClick={() => quickLogin('TEACHER', 'teacher@school.edu')}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium"
              >
                👨‍🏫 Teacher
              </button>
              <button
                onClick={() => quickLogin('STUDENT', 'student@school.edu')}
                className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium"
              >
                🎓 Student
              </button>
              <button
                onClick={() => quickLogin('PARENT', 'parent@school.edu')}
                className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 text-sm font-medium"
              >
                👨‍👩‍👧 Parent
              </button>
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
