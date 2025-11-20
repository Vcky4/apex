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
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple placeholder:text-gray-400"
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
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple placeholder:text-gray-400"
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
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
              >
                <option value="HR_EXECUTIVE">HR Executive</option>
                <option value="FINANCE_EXECUTIVE">Finance Executive</option>
                <option value="ACADEMIC_EXECUTIVE">Academic Executive</option>
                <option value="STUDENT_AFFAIRS_EXECUTIVE">Student Affairs Executive</option>
                <option value="OPERATIONS_EXECUTIVE">Operations Executive</option>
                <option value="OWNER">School Owner</option>
                <option value="DEPARTMENT_HEAD">Department Head</option>
                <option value="PRINCIPAL">Principal</option>
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
            <div className="space-y-2">
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Administrative Portals</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => quickLogin('HR_EXECUTIVE', 'hr@school.edu')}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium text-left"
                  >
                    👥 HR Executive
                  </button>
                  <button
                    onClick={() => quickLogin('FINANCE_EXECUTIVE', 'finance@school.edu')}
                    className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium text-left"
                  >
                    💰 Finance Executive
                  </button>
                  <button
                    onClick={() => quickLogin('ACADEMIC_EXECUTIVE', 'academic@school.edu')}
                    className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 text-sm font-medium text-left"
                  >
                    📖 Academic Executive
                  </button>
                  <button
                    onClick={() => quickLogin('STUDENT_AFFAIRS_EXECUTIVE', 'studentaffairs@school.edu')}
                    className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium text-left"
                  >
                    🎓 Student Affairs
                  </button>
                  <button
                    onClick={() => quickLogin('OPERATIONS_EXECUTIVE', 'operations@school.edu')}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium text-left"
                  >
                    🏗️ Operations Executive
                  </button>
                  <button
                    onClick={() => quickLogin('OWNER', 'owner@school.edu')}
                    className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 text-sm font-medium text-left"
                  >
                    👑 Owner
                  </button>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Other Roles</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => quickLogin('DEPARTMENT_HEAD', 'depthead@school.edu')}
                    className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 text-sm font-medium text-left"
                  >
                    📚 Dept Head
                  </button>
                  <button
                    onClick={() => quickLogin('TEACHER', 'teacher@school.edu')}
                    className="px-4 py-2 bg-cyan-50 text-cyan-700 rounded-lg hover:bg-cyan-100 text-sm font-medium text-left"
                  >
                    👨‍🏫 Teacher
                  </button>
                  <button
                    onClick={() => quickLogin('STUDENT', 'student@school.edu')}
                    className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 text-sm font-medium text-left"
                  >
                    🎒 Student
                  </button>
                  <button
                    onClick={() => quickLogin('PARENT', 'parent@school.edu')}
                    className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 text-sm font-medium text-left"
                  >
                    👨‍👩‍👧 Parent
                  </button>
                  <button
                    onClick={() => quickLogin('PRINCIPAL', 'principal@school.edu')}
                    className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm font-medium text-left"
                  >
                    🎓 Principal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-white/60 text-sm mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-white underline font-medium">
            Sign up here
          </a>
        </p>
        <p className="text-center text-white/40 text-xs mt-2">
          © 2025 Apex Providers. All rights reserved.
        </p>
      </div>
    </div>
  );
}
