import { useState } from 'react';
import { Card } from '@apex-providers/ui-components';

export default function CheckOut() {
  const [feedback, setFeedback] = useState({
    rating: 0,
    comments: '',
    wouldReturn: true,
  });

  const folioItems = [
    { description: 'Room Charges (2 nights)', amount: 800.0 },
    { description: 'Room Service', amount: 125.5 },
    { description: 'Spa Services', amount: 240.0 },
    { description: 'Visitor Fees', amount: 150.0 },
    { description: 'Taxes & Fees', amount: 134.5 },
  ];

  const subtotal = folioItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Express Check-out</h1>
        <p className="text-gray-600 mt-2">Review your final bill and complete checkout</p>
      </div>

      {/* Final Folio */}
      <Card>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Final Folio</h2>
        <div className="space-y-3 mb-4">
          {folioItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700">{item.description}</span>
              <span className="font-medium">${item.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
          <span className="text-lg font-bold text-charcoal-gray">Total</span>
          <span className="text-2xl font-bold text-gold-600">${subtotal.toFixed(2)}</span>
        </div>
      </Card>

      {/* Visitor Charges Reconciliation */}
      <Card>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Visitor Charges</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Jane Doe (2 visits)</span>
            <span className="font-medium">$75.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">John Smith (1 visit)</span>
            <span className="font-medium">$75.00</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="font-bold">Total Visitor Revenue</span>
            <span className="font-bold text-green-600">$150.00</span>
          </div>
        </div>
      </Card>

      {/* Payment Method */}
      <Card>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Payment Method</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Visa •••• 4242</p>
              <p className="text-sm text-gray-600">Expires 12/2025</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Change
            </button>
          </div>
        </div>
      </Card>

      {/* Feedback */}
      <Card>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Share Your Experience</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setFeedback({ ...feedback, rating: star })}
                  className={`text-3xl ${
                    star <= feedback.rating ? 'text-gold-500' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
            <textarea
              value={feedback.comments}
              onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="Tell us about your stay..."
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="wouldReturn"
              checked={feedback.wouldReturn}
              onChange={(e) => setFeedback({ ...feedback, wouldReturn: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="wouldReturn" className="text-sm font-medium text-gray-700">
              I would stay here again
            </label>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex space-x-4">
        <button className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg">
          Download Invoice
        </button>
        <button className="flex-1 py-3 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-lg">
          Complete Check-out
        </button>
      </div>
    </div>
  );
}

