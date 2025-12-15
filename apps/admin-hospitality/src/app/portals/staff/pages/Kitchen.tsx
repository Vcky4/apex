import React, { useState, useEffect } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

export default function Kitchen() {
  const [orders, setOrders] = useState<any[]>([]);
  const [view, setView] = useState<'active' | 'history'>('active');

  useEffect(() => {
    // Load orders from local storage
    const storedOrders = localStorage.getItem('apex-hospitality-orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    } else {
      // Seed mock data if empty
      const initialOrders = [
        {
          id: 101,
          room: '304',
          items: [{ name: 'Club Sandwich', quantity: 2 }, { name: 'Coke', quantity: 2 }],
          total: 58.00,
          status: 'Pending',
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 mins ago
        },
        {
          id: 102,
          room: '501',
          items: [{ name: 'Caesar Salad', quantity: 1 }, { name: 'Champagne Bottle', quantity: 1 }],
          total: 138.00,
          status: 'Preparing',
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() // 15 mins ago
        },
        {
          id: 103,
          room: '202',
          items: [{ name: 'Deep Tissue Massage', quantity: 1 }], // Services can also be ordered
          total: 150.00,
          status: 'Completed',
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() // 45 mins ago
        },
        {
          id: 104,
          room: '405',
          items: [{ name: 'Extra Towels', quantity: 1 }],
          total: 0.00,
          status: 'Delivered',
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() // 2 hours ago
        }
      ];
      setOrders(initialOrders);
      localStorage.setItem('apex-hospitality-orders', JSON.stringify(initialOrders));
    }
    
    // Poll for new orders every 5 seconds (simulating real-time)
    const interval = setInterval(() => {
        const currentOrders = localStorage.getItem('apex-hospitality-orders');
        if (currentOrders) {
            setOrders(JSON.parse(currentOrders));
        }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = (orderIndex: number, newStatus: string) => {
    const updatedOrders = [...orders];
    updatedOrders[orderIndex].status = newStatus;
    setOrders(updatedOrders);
    localStorage.setItem('apex-hospitality-orders', JSON.stringify(updatedOrders));
  };

  const activeOrders = orders.filter(o => o.status !== 'Completed' && o.status !== 'Delivered');
  const completedOrders = orders.filter(o => o.status === 'Completed' || o.status === 'Delivered');

  // Sort completed orders by timestamp descending (newest first)
  completedOrders.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Kitchen Display System</h1>
          <p className="text-gray-600 mt-1">Manage food and beverage orders</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 pb-1">
        <button 
          onClick={() => setView('active')}
          className={`pb-3 px-4 font-medium text-sm transition-colors ${
            view === 'active' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Active Orders ({activeOrders.length})
        </button>
        <button 
          onClick={() => setView('history')}
          className={`pb-3 px-4 font-medium text-sm transition-colors ${
            view === 'history' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Order History ({completedOrders.length})
        </button>
      </div>

      {view === 'active' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeOrders.map((order, idx) => (
            <Card key={idx} className="border-l-4 border-l-blue-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Room {order.room || 'Unknown'}</h3>
                  <p className="text-sm text-gray-500">Order #{1000 + idx}</p>
                </div>
                <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              <div className="space-y-2 mb-6">
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold bg-gray-100 w-6 h-6 flex items-center justify-center rounded-full text-sm">
                        {item.quantity}
                      </span>
                      <span className="text-gray-800">{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2 pt-2">
                {order.status !== 'Preparing' && (
                  <Button 
                      fullWidth 
                      variant="outline"
                      onClick={() => handleStatusChange(orders.indexOf(order), 'Preparing')}
                  >
                      Start Preparing
                  </Button>
                )}
                <Button 
                  fullWidth 
                  onClick={() => handleStatusChange(orders.indexOf(order), 'Completed')}
                >
                  Mark Ready
                </Button>
              </div>
            </Card>
          ))}
          {activeOrders.length === 0 && (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg text-gray-500">
                  No active orders at the moment.
              </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {completedOrders.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                      <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                      {completedOrders.map((order, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(order.timestamp).toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Room {order.room}</td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                  {order.items.map((i: any) => `${i.quantity}x ${i.name}`).join(', ')}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                ${order.total?.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      {order.status}
                                  </span>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
            ) : (
              <div className="p-12 text-center text-gray-500">
                No order history found.
              </div>
            )}
        </div>
      )}
    </div>
  );
}
