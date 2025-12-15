import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem, Dashboard, StatCard, Card, DashboardGrid } from '@apex-providers/ui-components';
import Services from './pages/Services';
import CheckOut from './pages/CheckOut';

// Modal Component
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const GuestDashboard = () => {
  const [toast, setToast] = useState<string | null>(null);
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);
  const [isWifiModalOpen, setIsWifiModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isConciergeModalOpen, setIsConciergeModalOpen] = useState(false);
  const [isCleaningModalOpen, setIsCleaningModalOpen] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [keyState, setKeyState] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  
  // Mock Data
  const [visitorName, setVisitorName] = useState('');
  const [conciergeRequest, setConciergeRequest] = useState('');
  const [cleaningTime, setCleaningTime] = useState('Now');
  const [cleaningType, setCleaningType] = useState('Standard Clean');

  const events = [
    { id: 1, title: 'Wine Tasting', time: '18:00', location: 'Lobby Bar', type: 'Social' },
    { id: 2, title: 'Pool Maintenance', time: '22:00', location: 'Rooftop Pool', type: 'Notice' },
    { id: 3, title: 'Yoga Session', time: '07:00', location: 'Gym Studio', type: 'Activity' },
  ];
  
  const parcels = [
    { id: 101, sender: 'Amazon', status: 'Arrived', location: 'Front Desk' },
    { id: 102, sender: 'FedEx', status: 'En Route', eta: 'Tomorrow, 10am' },
  ];

  // Shared task creation function
  const createStaffTask = (title: string, type: string, priority: string) => {
    const newTask = {
        id: Date.now(),
        title,
        type,
        priority,
        status: 'Pending',
        assignee: 'Unassigned',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // In a real app, this would be an API call. Here we simulate by reading/writing local storage
    // compatible with the Staff Tasks page
    const storedTasks = localStorage.getItem('apex-hospitality-tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    localStorage.setItem('apex-hospitality-tasks', JSON.stringify([newTask, ...tasks]));
  };

  const handleQuickAction = (action: string) => {
    // Simulate action
    let message = '';
    switch(action) {
      case 'concierge':
        setIsConciergeModalOpen(true);
        return; // Early return to not show toast immediately
      case 'room-service':
        message = 'Redirecting to In-Room Dining menu...';
        // In a real app, this would navigate
        break;
      case 'cleaning':
        setIsCleaningModalOpen(true);
        return; // Early return
      case 'checkout':
        message = 'Redirecting to Express Check-out...';
        break;
      case 'key':
        setIsKeyModalOpen(true);
        setKeyState('idle');
        return;
      case 'panic':
        createStaffTask('EMERGENCY - PANIC BUTTON - ROOM 801', 'Security', 'High');
        message = 'SECURITY ALERT SENT! Staff have been notified of your location.';
        break;
      default:
        message = 'Action completed';
    }
    setToast(message);
  };

  const unlockDoor = () => {
    setKeyState('scanning');
    // Simulate NFC/Bluetooth handshake
    setTimeout(() => {
        setKeyState('success');
        // Auto close after success
        setTimeout(() => {
            setIsKeyModalOpen(false);
            setToast('Room 801 Unlocked!');
            setKeyState('idle');
        }, 2000);
    }, 1500);
  };

  const registerVisitor = () => {
    setToast(`Visitor pass created for ${visitorName}. QR code sent.`);
    setIsVisitorModalOpen(false);
    setVisitorName('');
  };

  const submitConciergeRequest = () => {
    createStaffTask(`Concierge Request: ${conciergeRequest} - Room 801`, 'Concierge', 'Normal');
    setToast('Request sent to Concierge desk.');
    setIsConciergeModalOpen(false);
    setConciergeRequest('');
  };

  const submitCleaningRequest = () => {
    createStaffTask(`${cleaningType} Request (${cleaningTime}) - Room 801`, 'Housekeeping', 'Normal');
    setToast('Housekeeping request scheduled.');
    setIsCleaningModalOpen(false);
  };

  return (
    <div className="space-y-8 relative">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Welcome back, Mr. Wick</h1>
        <p className="text-gray-600 mt-2">Room 801 • Executive Suite • Checked In</p>
      </div>

      {/* Security & Alerts Bar */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
            <span className="text-2xl">📢</span>
            <div>
                <p className="font-bold text-red-800">Curfew Reminder</p>
                <p className="text-sm text-red-600">Main pool area closes at 10:00 PM for maintenance.</p>
            </div>
        </div>
        <button 
            onClick={() => setIsSecurityModalOpen(true)}
            className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 animate-pulse"
        >
            SOS / Panic
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stay Overview - Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Events & Announcements */}
          <section>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-charcoal-gray">Events & Updates</h2>
                <span className="text-sm text-blue-600 font-medium cursor-pointer">View All</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {events.map(event => (
                    <div key={event.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <span className={`inline-block px-2 py-1 text-xs font-bold rounded mb-2 ${
                            event.type === 'Notice' ? 'bg-orange-100 text-orange-800' : 
                            event.type === 'Social' ? 'bg-purple-100 text-purple-800' : 
                            'bg-green-100 text-green-800'
                        }`}>
                            {event.type}
                        </span>
                        <h3 className="font-bold text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{event.time} • {event.location}</p>
                    </div>
                ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal-gray mb-4">Your Stay Overview</h2>
            <DashboardGrid columns={2}>
              <StatCard
                title="Current Bill"
                value="$1,250.00"
                icon={<span className="text-2xl">💳</span>}
                color="gold"
                trend={{ value: 0, isPositive: true }}
              />
              <StatCard
                title="Check-out"
                value="Oct 12"
                icon={<span className="text-2xl">📅</span>}
                color="blue"
              />
            </DashboardGrid>
          </section>

          {/* Parcel Tracking */}
          <section>
             <h2 className="text-xl font-bold text-charcoal-gray mb-4">Parcels & Deliveries</h2>
             <Card>
                {parcels.length > 0 ? (
                    <div className="space-y-4">
                        {parcels.map(parcel => (
                            <div key={parcel.id} className="flex justify-between items-center border-b border-gray-50 last:border-0 pb-2 last:pb-0">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-gray-100 rounded-lg text-xl">📦</div>
                                    <div>
                                        <p className="font-bold text-gray-900">{parcel.sender}</p>
                                        <p className="text-xs text-gray-500">{parcel.status} • {parcel.location || parcel.eta}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 text-xs font-bold rounded ${
                                    parcel.status === 'Arrived' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {parcel.status}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No active deliveries.</p>
                )}
             </Card>
          </section>
        </div>

        {/* Quick Actions - Right Column */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-charcoal-gray mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => setIsVisitorModalOpen(true)}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left w-full"
              >
                <div className="p-3 bg-purple-50 text-purple-600 rounded-full">👤</div>
                <div>
                  <h3 className="font-bold text-gray-900">Register Visitor</h3>
                  <p className="text-xs text-gray-500">Create digital pass</p>
                </div>
              </button>
              
              <button 
                onClick={() => setIsWifiModalOpen(true)}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left w-full"
              >
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">📶</div>
                <div>
                  <h3 className="font-bold text-gray-900">Wi-Fi Access</h3>
                  <p className="text-xs text-gray-500">Manage devices</p>
                </div>
              </button>

              <button 
                onClick={() => handleQuickAction('concierge')}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left w-full"
              >
                <div className="p-3 bg-gold-50 text-gold-600 rounded-full">🛎️</div>
                <div>
                  <h3 className="font-bold text-gray-900">Contact Concierge</h3>
                  <p className="text-xs text-gray-500">Request services or transport</p>
                </div>
              </button>
              <button 
                onClick={() => { handleQuickAction('room-service'); window.location.href = '/hospitality/guest/services'; }}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left w-full"
              >
                <div className="p-3 bg-blue-50 text-blue-600 rounded-full">🍽️</div>
                <div>
                  <h3 className="font-bold text-gray-900">Room Service</h3>
                  <p className="text-xs text-gray-500">Order food & drinks</p>
                </div>
              </button>
              <button 
                onClick={() => handleQuickAction('cleaning')}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left w-full"
              >
                <div className="p-3 bg-green-50 text-green-600 rounded-full">🧹</div>
                <div>
                  <h3 className="font-bold text-gray-900">Request Cleaning</h3>
                  <p className="text-xs text-gray-500">Schedule housekeeping</p>
                </div>
              </button>
            </div>
          </section>
          
          <Card>
            <h3 className="font-bold text-gray-900 mb-2">Digital Key</h3>
            <div 
              onClick={() => handleQuickAction('key')}
              className="bg-navy-900 text-white p-6 rounded-lg text-center cursor-pointer hover:opacity-90 transition-opacity active:scale-95 transform duration-100"
            >
              <div className="text-4xl mb-2">🔑</div>
              <p className="font-medium">Tap to Unlock Room 801</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Visitor Modal */}
      <Modal isOpen={isVisitorModalOpen} onClose={() => setIsVisitorModalOpen(false)} title="Register Visitor">
        <div className="space-y-4">
            <p className="text-gray-600 text-sm">Create a temporary digital pass for your guest. They will need to show this at the front desk or security.</p>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visitor Name</label>
                <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="Jane Doe"
                />
            </div>
            <div className="flex justify-end pt-2">
                <button 
                    onClick={registerVisitor}
                    disabled={!visitorName}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    Generate Pass
                </button>
            </div>
        </div>
      </Modal>

      {/* Wi-Fi Modal */}
      <Modal isOpen={isWifiModalOpen} onClose={() => setIsWifiModalOpen(false)} title="Wi-Fi Management">
        <div className="space-y-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Network Name</p>
                <p className="text-xl font-bold text-gray-900 mb-4">Apex_Guest_Secure</p>
                
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Your Password</p>
                <p className="text-2xl font-mono font-bold text-blue-600">Wick801x!</p>
            </div>
            
            <div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Data Usage</span>
                    <span className="text-sm text-gray-500">12.5 GB / Unlimited</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
                <p className="font-bold text-gray-900 mb-2">Connected Devices</p>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex justify-between">
                        <span>iPhone 15 Pro</span>
                        <span className="text-green-600">Active</span>
                    </li>
                    <li className="flex justify-between">
                        <span>MacBook Air</span>
                        <span className="text-gray-400">Idle</span>
                    </li>
                </ul>
            </div>
            
            <button className="w-full py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium">
                Reset Access Password
            </button>
        </div>
      </Modal>

      {/* Security Modal */}
      <Modal isOpen={isSecurityModalOpen} onClose={() => setIsSecurityModalOpen(false)} title="Security & Emergency">
        <div className="space-y-6 text-center">
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                <p className="font-bold text-red-800 text-lg mb-2">Emergency Assistance</p>
                <p className="text-red-600 mb-4">Pressing the button below will immediately alert security and medical staff to your room (801).</p>
                <button 
                    onClick={() => { handleQuickAction('panic'); setIsSecurityModalOpen(false); }}
                    className="w-full py-4 bg-red-600 text-white font-bold text-xl rounded-xl hover:bg-red-700 shadow-lg transform hover:scale-105 transition-all"
                >
                    🆘 PANIC BUTTON
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
                <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-gray-900">Hotel Security</p>
                    <p className="text-blue-600 font-mono text-lg">Ext. 911</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-gray-900">Front Desk</p>
                    <p className="text-blue-600 font-mono text-lg">Ext. 0</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-gray-900">Local Police</p>
                    <p className="text-blue-600 font-mono text-lg">911</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-gray-900">Medical</p>
                    <p className="text-blue-600 font-mono text-lg">Ext. 55</p>
                </div>
            </div>
        </div>
      </Modal>

      {/* Concierge Modal */}
      <Modal isOpen={isConciergeModalOpen} onClose={() => setIsConciergeModalOpen(false)} title="Contact Concierge">
        <div className="space-y-4">
            <p className="text-gray-600 text-sm">How can we assist you today?</p>
            <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-gold-500 focus:outline-none"
                placeholder="e.g. Reserve a table for 2 at The Continental, book airport transfer..."
                value={conciergeRequest}
                onChange={(e) => setConciergeRequest(e.target.value)}
            ></textarea>
            <div className="flex justify-end pt-2">
                <button 
                    onClick={submitConciergeRequest}
                    disabled={!conciergeRequest}
                    className="px-4 py-2 bg-gold-500 text-white font-bold rounded-lg hover:bg-gold-600 disabled:opacity-50"
                >
                    Send Request
                </button>
            </div>
        </div>
      </Modal>

      {/* Cleaning Modal */}
      <Modal isOpen={isCleaningModalOpen} onClose={() => setIsCleaningModalOpen(false)} title="Request Housekeeping">
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                <div className="grid grid-cols-2 gap-2">
                    {['Standard Clean', 'Turndown Service', 'Extra Towels', 'Laundry Pickup'].map(type => (
                        <button
                            key={type}
                            onClick={() => setCleaningType(type)}
                            className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                                cleaningType === type 
                                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={cleaningTime}
                    onChange={(e) => setCleaningTime(e.target.value)}
                >
                    <option value="Now">As soon as possible</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="02:00 PM">2:00 PM</option>
                    <option value="04:00 PM">4:00 PM</option>
                </select>
            </div>

            <div className="flex justify-end pt-4">
                <button 
                    onClick={submitCleaningRequest}
                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
                >
                    Schedule Service
                </button>
            </div>
        </div>
      </Modal>

      {/* Digital Key Modal */}
      <Modal isOpen={isKeyModalOpen} onClose={() => setIsKeyModalOpen(false)} title="Digital Key">
        <div className="flex flex-col items-center justify-center p-8 space-y-8">
            <div 
                onClick={keyState === 'idle' ? unlockDoor : undefined}
                className={`w-48 h-48 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 shadow-xl border-4 ${
                    keyState === 'idle' ? 'bg-navy-900 border-gold-500 hover:scale-105' :
                    keyState === 'scanning' ? 'bg-blue-600 border-blue-300 animate-pulse' :
                    keyState === 'success' ? 'bg-green-500 border-green-300 scale-105' :
                    'bg-red-500 border-red-300'
                }`}
            >
                <div className="text-white text-6xl">
                    {keyState === 'success' ? '🔓' : '🔑'}
                </div>
            </div>
            
            <div className="text-center">
                <h3 className="text-2xl font-bold text-charcoal-gray mb-2">
                    {keyState === 'idle' ? 'Tap to Unlock' :
                     keyState === 'scanning' ? 'Connecting...' :
                     keyState === 'success' ? 'Unlocked!' : 'Error'}
                </h3>
                <p className="text-gray-500">
                    {keyState === 'idle' ? 'Hold near door reader' :
                     keyState === 'scanning' ? 'Communicating with lock...' :
                     keyState === 'success' ? 'Welcome back, Mr. Wick' : 'Please try again'}
                </p>
            </div>
        </div>
      </Modal>
    </div>
  );
};

interface GuestPortalProps {
  user: any;
  onLogout: () => void;
}

export default function GuestPortal({ user, onLogout }: GuestPortalProps) {
  const navigation: NavItem[] = [
    { label: 'My Stay', href: '/hospitality/guest/dashboard', icon: '🏠' },
    { label: 'Services', href: '/hospitality/guest/services', icon: '🛎️' },
    { label: 'Check-out', href: '/hospitality/guest/checkout', icon: '👋' },
  ];

  return (
    <AdminLayout
      navigation={navigation}
      logo={<div className="font-bold text-xl text-gold-500">Apex Hotel</div>}
      userMenu={
        <button onClick={onLogout} className="text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20">
          Logout
        </button>
      }
      sidebarColor="bg-navy-900" // Luxurious Navy
    >
      <Routes>
        <Route path="dashboard" element={<GuestDashboard />} />
        <Route path="services" element={<Services />} />
        <Route path="checkout" element={<CheckOut />} />
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}
