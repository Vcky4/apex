import React, { useState } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

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

// Simple Modal
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

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'dining', name: 'In-Room Dining' },
    { id: 'spa', name: 'Spa & Wellness' },
    { id: 'housekeeping', name: 'Housekeeping' },
    { id: 'concierge', name: 'Concierge' },
  ];

  const services = [
    { id: 1, name: 'Club Sandwich', category: 'dining', price: 24, description: 'Turkey, bacon, lettuce, tomato, fries', image: '🥪' },
    { id: 2, name: 'Caesar Salad', category: 'dining', price: 18, description: 'Romaine, parmesan, croutons, anchovy dressing', image: '🥗' },
    { id: 3, name: 'Deep Tissue Massage', category: 'spa', price: 150, description: '60 minutes intensive muscle therapy', image: '💆' },
    { id: 4, name: 'Extra Towels', category: 'housekeeping', price: 0, description: 'Set of 2 bath towels', image: '🧖' },
    { id: 5, name: 'Pillow Menu', category: 'housekeeping', price: 0, description: 'Choose from memory foam, down, or hypoallergenic', image: '🛏️' },
    { id: 6, name: 'Airport Transfer', category: 'concierge', price: 85, description: 'Private luxury sedan to/from airport', image: '🚗' },
    { id: 7, name: 'Champagne Bottle', category: 'dining', price: 120, description: 'Moët & Chandon Impérial Brut', image: '🍾' },
    { id: 8, name: 'Yoga Class', category: 'spa', price: 35, description: 'Morning flow on the rooftop deck', image: '🧘' },
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const handleAddToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setToast(`Added ${item.name} to request`);
  };

  const handleRequestService = (item: any) => {
    if (item.price > 0) {
      handleAddToCart(item);
    } else {
      setToast(`Request sent for ${item.name}`);
    }
  };

  const handleOpenDetails = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const totalCartValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const submitOrder = () => {
    // Save to local storage for Kitchen/Front Desk
    const newOrder = {
        id: Date.now(),
        room: '304', // Hardcoded for this demo user "Alice Smith"
        items: cart,
        total: totalCartValue,
        status: 'Pending',
        timestamp: new Date().toISOString()
    };

    const storedOrders = localStorage.getItem('apex-hospitality-orders');
    const orders = storedOrders ? JSON.parse(storedOrders) : [];
    localStorage.setItem('apex-hospitality-orders', JSON.stringify([...orders, newOrder]));

    setCart([]);
    setToast(`Order placed successfully! Total: $${totalCartValue.toFixed(2)}`);
  };

  return (
    <div className="space-y-6 relative pb-24">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Guest Services</h1>
        <p className="text-gray-600 mt-1">Order dining, book spa treatments, or request amenities</p>
      </div>

      {/* Category Filter */}
      <div className="flex overflow-x-auto space-x-2 pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat.id
                ? 'bg-navy-900 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{service.image}</div>
              {service.price > 0 && (
                <span className="font-bold text-gray-900">${service.price}</span>
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{service.description}</p>
            <div className="flex space-x-2">
              <Button variant="outline" fullWidth onClick={() => handleOpenDetails(service)}>
                Details
              </Button>
              <Button fullWidth onClick={() => handleRequestService(service)}>
                {service.price > 0 ? 'Add to Order' : 'Request Now'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Floating Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-40">
          <div className="bg-navy-900 text-white rounded-xl shadow-2xl p-4 flex items-center justify-between">
            <div>
              <p className="font-bold">{cart.reduce((acc, i) => acc + i.quantity, 0)} Items</p>
              <p className="text-sm text-white/80">${totalCartValue.toFixed(2)}</p>
            </div>
            <button 
              onClick={submitOrder}
              className="px-6 py-2 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      {/* Service Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedItem?.name || 'Service Details'}
      >
        {selectedItem && (
          <div className="space-y-4">
            <div className="text-center text-6xl mb-4">{selectedItem.image}</div>
            <p className="text-gray-600">{selectedItem.description}</p>
            
            {selectedItem.category === 'dining' && (
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <p className="font-medium mb-1">Dietary Notes:</p>
                <p className="text-gray-500">Please inform us of any allergies. This item may contain gluten, dairy, or nuts.</p>
              </div>
            )}

            {selectedItem.category === 'spa' && (
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <p className="font-medium mb-1">Booking Info:</p>
                <p className="text-gray-500">Cancellation within 4 hours may incur a 50% fee.</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-2xl font-bold text-gray-900">
                {selectedItem.price > 0 ? `$${selectedItem.price}` : 'Free'}
              </span>
              <Button onClick={() => { handleRequestService(selectedItem); setIsModalOpen(false); }}>
                {selectedItem.price > 0 ? 'Add to Order' : 'Request Now'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

