import { Card } from '@apex-providers/ui-components';

export default function PreArrival() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Pre-Arrival Experience</h1>
        <p className="text-gray-600 mt-2">Complete your registration and preferences</p>
      </div>

      <Card>
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-charcoal-gray mb-4">Digital Check-in</h2>
            <p className="text-gray-600 mb-4">
              Complete your registration before arrival to streamline your check-in process.
            </p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">
              Start Check-in
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-charcoal-gray mb-4">Preference Submission</h2>
            <p className="text-gray-600 mb-4">
              Let us know your preferences for room setup, amenities, and special requests.
            </p>
            <button className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-lg">
              Submit Preferences
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-charcoal-gray mb-4">Service Pre-booking</h2>
            <p className="text-gray-600 mb-4">
              Reserve spa treatments, dining experiences, and other services in advance.
            </p>
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg">
              Browse Services
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-charcoal-gray mb-4">Visitor Pre-approval</h2>
            <p className="text-gray-600 mb-4">
              Pre-approve visitors before your arrival to ensure smooth access for your guests.
            </p>
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg">
              Manage Visitors
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

