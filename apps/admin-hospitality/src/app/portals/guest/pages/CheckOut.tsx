import React, { useState } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

// Rating Star Component
const StarRating = ({ rating, setRating }: { rating: number; setRating?: (r: number) => void }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating && setRating(star)}
          className={`text-2xl focus:outline-none ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } ${!setRating ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'}`}
          disabled={!setRating}
        >
          ★
        </button>
      ))}
    </div>
  );
};

// Toast Notification
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300 z-50">
      {message}
    </div>
  );
};

export default function CheckOut() {
  const [step, setStep] = useState<'review' | 'payment' | 'feedback' | 'confirmation'>('review');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  // Mock Folio Data
  const folioItems = [
    { id: 1, date: 'Oct 10', description: 'Room Charge', amount: 350.00 },
    { id: 2, date: 'Oct 10', description: 'In-Room Dining', amount: 85.00 },
    { id: 3, date: 'Oct 11', description: 'Room Charge', amount: 350.00 },
    { id: 4, date: 'Oct 11', description: 'Spa Treatment', amount: 180.00 },
    { id: 5, date: 'Oct 11', description: 'Mini Bar', amount: 25.00 },
  ];

  const totalAmount = folioItems.reduce((sum, item) => sum + item.amount, 0);
  const taxes = totalAmount * 0.15; // 15% tax
  const finalTotal = totalAmount + taxes;

  const handleConfirmBill = () => {
    setStep('payment');
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setStep('feedback');
    }, 1000);
  };

  const handleSubmitFeedback = () => {
    // Simulate feedback submission
    setStep('confirmation');
    setToast('Thank you for your feedback!');
  };

  const handleDownloadInvoice = () => {
    setToast('Invoice downloaded to your device.');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 relative pb-12">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className="text-center">
        <h1 className="text-3xl font-bold text-charcoal-gray">Express Check-out</h1>
        <p className="text-gray-600 mt-2">Review your bill and complete your stay</p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between items-center px-12">
        {['Bill Review', 'Payment', 'Feedback', 'Done'].map((s, idx) => {
          const stepIdx = ['review', 'payment', 'feedback', 'confirmation'].indexOf(step);
          return (
            <div key={s} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                idx <= stepIdx ? 'bg-navy-900 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {idx + 1}
              </div>
              <span className={`text-xs ${idx <= stepIdx ? 'text-navy-900 font-medium' : 'text-gray-400'}`}>{s}</span>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <Card className="p-8">
        {step === 'review' && (
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-gray-200 pb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Folio Summary</h3>
                <p className="text-sm text-gray-500">Room 801 • John Wick</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Due</p>
                <p className="text-2xl font-bold text-navy-900">${finalTotal.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-3">
              {folioItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <span className="text-gray-500 w-20 inline-block">{item.date}</span>
                    <span className="text-gray-900">{item.description}</span>
                  </div>
                  <span className="text-gray-900 font-medium">${item.amount.toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Taxes & Fees (15%)</span>
                  <span className="text-gray-900">${taxes.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end space-x-4">
              <button className="text-red-600 text-sm hover:underline">Dispute a Charge</button>
              <Button onClick={handleConfirmBill}>Confirm & Pay</Button>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">💳</div>
                <div>
                  <p className="font-bold text-gray-900">Visa ending in 4242</p>
                  <p className="text-sm text-gray-500">Expires 12/28</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Primary</span>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total to Charge</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
              <Button fullWidth onClick={handlePayment}>Pay Now</Button>
              <button 
                onClick={() => setStep('review')}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
              >
                Back to Review
              </button>
            </div>
          </div>
        )}

        {step === 'feedback' && (
          <div className="space-y-6 text-center">
            <h3 className="text-xl font-bold text-gray-900">How was your stay?</h3>
            <p className="text-gray-600">Please rate your experience with us.</p>
            
            <div className="flex justify-center py-4">
              <StarRating rating={rating} setRating={setRating} />
            </div>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you liked or how we can improve..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900 h-32"
            />

            <div className="pt-4 flex justify-end space-x-4">
              <button 
                onClick={() => setStep('confirmation')}
                className="text-gray-500 hover:text-gray-700 px-4 py-2"
              >
                Skip
              </button>
              <Button onClick={handleSubmitFeedback} disabled={rating === 0}>Submit Feedback</Button>
            </div>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">
              ✓
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Check-out Complete!</h2>
              <p className="text-gray-600 mt-2">We hope to welcome you back soon.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg max-w-sm mx-auto text-left">
              <p className="text-sm text-gray-500 mb-1">Receipt sent to:</p>
              <p className="font-medium text-gray-900">john.wick@example.com</p>
            </div>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={handleDownloadInvoice}>Download Invoice</Button>
              <Button onClick={() => window.location.href = '/hospitality/guest/dashboard'}>Back to Home</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

