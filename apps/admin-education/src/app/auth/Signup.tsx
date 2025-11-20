import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@apex-providers/ui-components';

interface SignupProps {
  onSignup: (data: any) => void;
}

export default function Signup({ onSignup }: SignupProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<'parent' | 'children' | 'payment' | 'confirmation'>('parent');
  const [parentData, setParentData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [children, setChildren] = useState<Array<{
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    grade: string;
  }>>([]);
  const [currentChild, setCurrentChild] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    grade: '',
  });
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const calculateTotalFee = () => {
    // Base fee per child
    const baseFee = 5000;
    return children.length * baseFee;
  };

  const handleParentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parentData.password !== parentData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setStep('children');
  };

  const handleAddChild = () => {
    if (!currentChild.firstName || !currentChild.lastName || !currentChild.dateOfBirth || !currentChild.gender || !currentChild.grade) {
      alert('Please fill in all child details');
      return;
    }
    setChildren([...children, { ...currentChild }]);
    setCurrentChild({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      grade: '',
    });
  };

  const handleRemoveChild = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    const paymentSuccess = true; // In real app, this would be an API call
    
    if (paymentSuccess) {
      // Generate student credentials
      const studentCredentials = children.map((child, index) => ({
        name: `${child.firstName} ${child.lastName}`,
        username: `${child.firstName.toLowerCase()}.${child.lastName.toLowerCase()}${index + 1}`,
        password: `Student${Math.random().toString(36).substring(2, 8)}`,
        email: `${child.firstName.toLowerCase()}.${child.lastName.toLowerCase()}@school.edu`,
      }));

      // Simulate sending email (in real app, this would be an API call)
      console.log('Sending email with credentials:', studentCredentials);
      
      setStep('confirmation');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-authority-purple to-apex-deep-blue flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <span className="text-authority-purple font-bold text-4xl">E</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Springfield Elementary</h1>
          <p className="text-white/80">Parent Registration</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          {/* Progress Steps */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              {['parent', 'children', 'payment', 'confirmation'].map((s, index) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`flex flex-col items-center flex-1 ${index < ['parent', 'children', 'payment', 'confirmation'].indexOf(step) ? 'text-green-600' : index === ['parent', 'children', 'payment', 'confirmation'].indexOf(step) ? 'text-authority-purple' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      index < ['parent', 'children', 'payment', 'confirmation'].indexOf(step) 
                        ? 'bg-green-100 border-green-600 text-green-600' 
                        : index === ['parent', 'children', 'payment', 'confirmation'].indexOf(step)
                        ? 'bg-authority-purple border-authority-purple text-white'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-xs mt-2 text-center capitalize">{s}</span>
                  </div>
                  {index < 3 && (
                    <div className={`h-1 flex-1 mx-2 ${index < ['parent', 'children', 'payment', 'confirmation'].indexOf(step) ? 'bg-green-600' : 'bg-gray-300'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Parent Information */}
          {step === 'parent' && (
            <form onSubmit={handleParentSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold text-charcoal-gray mb-6">Parent Information</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={parentData.firstName}
                    onChange={(e) => setParentData({...parentData, firstName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={parentData.lastName}
                    onChange={(e) => setParentData({...parentData, lastName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={parentData.email}
                  onChange={(e) => setParentData({...parentData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={parentData.phone}
                  onChange={(e) => setParentData({...parentData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <textarea
                  value={parentData.address}
                  onChange={(e) => setParentData({...parentData, address: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <input
                    type="password"
                    value={parentData.password}
                    onChange={(e) => setParentData({...parentData, password: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    value={parentData.confirmPassword}
                    onChange={(e) => setParentData({...parentData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    required
                  />
                </div>
              </div>

              <Button type="submit" fullWidth size="lg">
                Continue to Add Children
              </Button>
            </form>
          )}

          {/* Step 2: Add Children */}
          {step === 'children' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-charcoal-gray mb-6">Add Your Children</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={currentChild.firstName}
                      onChange={(e) => setCurrentChild({...currentChild, firstName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={currentChild.lastName}
                      onChange={(e) => setCurrentChild({...currentChild, lastName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      value={currentChild.dateOfBirth}
                      onChange={(e) => setCurrentChild({...currentChild, dateOfBirth: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                    <select
                      value={currentChild.gender}
                      onChange={(e) => setCurrentChild({...currentChild, gender: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level *</label>
                  <select
                    value={currentChild.grade}
                    onChange={(e) => setCurrentChild({...currentChild, grade: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  >
                    <option value="">Select Grade</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>

                <Button type="button" onClick={handleAddChild} variant="outline" fullWidth>
                  Add Child
                </Button>
              </div>

              {/* List of Added Children */}
              {children.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h3 className="font-semibold text-gray-700">Added Children:</h3>
                  {children.map((child, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>{child.firstName} {child.lastName} - Grade {child.grade}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveChild(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setStep('parent')} className="flex-1">
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={() => {
                    if (children.length === 0) {
                      alert('Please add at least one child');
                      return;
                    }
                    setPaymentData({...paymentData, amount: calculateTotalFee()});
                    setStep('payment');
                  }} 
                  className="flex-1"
                  disabled={children.length === 0}
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold text-charcoal-gray mb-6">School Fees Payment</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Total Amount Due:</span>
                  <span className="text-2xl font-bold text-authority-purple">${paymentData.amount.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {children.length} child{children.length > 1 ? 'ren' : ''} × $5,000 per child
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method *</label>
                <select
                  value={paymentData.paymentMethod}
                  onChange={(e) => setPaymentData({...paymentData, paymentMethod: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              {paymentData.paymentMethod === 'card' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                    <input
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                      <input
                        type="text"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setStep('children')} className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1">
                  Pay ${paymentData.amount.toLocaleString()}
                </Button>
              </div>
            </form>
          )}

          {/* Step 4: Confirmation */}
          {step === 'confirmation' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-charcoal-gray">Registration Successful!</h2>
              <p className="text-gray-600">
                Your account has been created and payment has been processed successfully.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <p className="font-semibold text-gray-700 mb-2">Next Steps:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>An email has been sent to <strong>{parentData.email}</strong> with your child(ren)'s login credentials</li>
                  <li>Each child will receive their own username and password</li>
                  <li>You can now log in to the parent portal</li>
                </ul>
              </div>
              <Button onClick={() => navigate('/login')} fullWidth size="lg">
                Go to Login
              </Button>
            </div>
          )}
        </div>

        <p className="text-center text-white/60 text-sm mt-6">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-white underline">
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}

