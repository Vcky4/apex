import { useState } from 'react';
import { Button } from '@apex-providers/ui-components';

interface LoginProps {
  onLogin: (credentials: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('DOCTOR');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password, role });
  };

  const quickLogin = (userRole: string, userEmail: string) => {
    onLogin({ email: userEmail, password: 'password', role: userRole });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-doctor-blue to-patient-green flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <span className="text-doctor-blue font-bold text-4xl">⚕</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Healthcare Portal</h1>
          <p className="text-white/80">Access your healthcare services</p>
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
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doctor-blue placeholder:text-gray-400"
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
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doctor-blue placeholder:text-gray-400"
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
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doctor-blue"
              >
                <option value="DOCTOR">Doctor/Physician</option>
                <option value="NURSE">Nurse</option>
                <option value="LAB_ASSISTANT">Lab Assistant</option>
                <option value="PATIENT">Patient</option>
                <option value="PHARMACIST">Pharmacist</option>
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
                onClick={() => quickLogin('DOCTOR', 'doctor@hospital.com')}
                className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium text-left"
              >
                👨‍⚕️ Doctor
              </button>
              <button
                onClick={() => quickLogin('NURSE', 'nurse@hospital.com')}
                className="w-full px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm font-medium text-left"
              >
                👩‍⚕️ Nurse
              </button>
              <button
                onClick={() => quickLogin('LAB_ASSISTANT', 'lab@hospital.com')}
                className="w-full px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 text-sm font-medium text-left"
              >
                🔬 Lab Assistant
              </button>
              <button
                onClick={() => quickLogin('PATIENT', 'patient@example.com')}
                className="w-full px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium text-left"
              >
                👤 Patient
              </button>
              <button
                onClick={() => quickLogin('PHARMACIST', 'pharmacist@hospital.com')}
                className="w-full px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 text-sm font-medium text-left"
              >
                💊 Pharmacist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

