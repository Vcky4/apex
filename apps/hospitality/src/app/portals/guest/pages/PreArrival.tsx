import { useState } from 'react';
import { Card } from '@apex-providers/ui-components';

export default function PreArrival() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idUploaded: false,
    paymentMethod: '',
    specialRequests: '',
    preferences: {
      roomType: '',
      floor: '',
      smoking: false,
      accessibility: false,
    },
  });

  const handleSubmit = () => {
    // Handle form submission
    setStep(3);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Pre-Arrival Check-in</h1>
        <p className="text-gray-600 mt-2">Complete your registration before arrival</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? 'bg-gold-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`w-20 h-1 ${step > s ? 'bg-gold-500' : 'bg-gray-200'}`}
              />
            )}
          </div>
        ))}
      </div>

      <Card>
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-charcoal-gray mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Document</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-600 mb-2">Upload ID document</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Choose File
                </button>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-lg"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-charcoal-gray mb-4">Preferences & Requests</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Preferences</label>
              <select
                value={formData.preferences.roomType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferences: { ...formData.preferences, roomType: e.target.value },
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select room type</option>
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Any special requests or preferences..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="smoking"
                checked={formData.preferences.smoking}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferences: { ...formData.preferences, smoking: e.target.checked },
                  })
                }
                className="w-4 h-4"
              />
              <label htmlFor="smoking" className="text-sm font-medium text-gray-700">
                Smoking room preferred
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="accessibility"
                checked={formData.preferences.accessibility}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferences: { ...formData.preferences, accessibility: e.target.checked },
                  })
                }
                className="w-4 h-4"
              />
              <label htmlFor="accessibility" className="text-sm font-medium text-gray-700">
                Accessibility requirements
              </label>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-lg"
              >
                Complete Registration
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-8">
            <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
              <span className="text-4xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-charcoal-gray mb-2">Registration Complete!</h2>
            <p className="text-gray-600 mb-6">
              Your pre-arrival check-in is complete. You can now pre-approve visitors and access your digital key.
            </p>
            <button className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-lg">
              Continue to Dashboard
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}

