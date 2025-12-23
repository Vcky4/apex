import { useState } from 'react';

interface LoginProps {
  onLogin: (credentials: { email: string; role: string }) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('GUEST');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, role });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-blue-900 to-navy-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gold-500 rounded-full mb-4">
            <span className="text-4xl">🏨</span>
          </div>
          <h1 className="text-3xl font-bold text-charcoal-gray mb-2">Apex Hospitality</h1>
          <p className="text-gray-600">Portal Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Portal Type
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            >
              <option value="GUEST">Guest Portal</option>
              <option value="STAFF">Staff Portal</option>
              <option value="ESTATES_GUEST">Estates Guest Portal</option>
              <option value="EVENT_PLANNER">Event Planner Portal</option>
              <option value="OWNER">Property Owner Portal</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo Portal - Select your role to continue</p>
        </div>
      </div>
    </div>
  );
}

