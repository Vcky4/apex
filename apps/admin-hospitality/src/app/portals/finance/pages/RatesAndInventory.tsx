import React, { useState } from 'react';
import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';

// Reusing simple modal for consistency
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
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
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default function RatesAndInventory() {
  const [activeTab, setActiveTab] = useState<'rates' | 'inventory' | 'packages'>('rates');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editRateId, setEditRateId] = useState<number | null>(null);
  
  // Package Editing State
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [packageForm, setPackageForm] = useState({
    name: '',
    inclusions: '',
    price: '',
    active: true
  });

  // Mock Data
  const [roomTypes, setRoomTypes] = useState([
    { id: 1, name: 'Standard King', baseRate: 180, inventory: 45, available: 12, ota: 8 },
    { id: 2, name: 'Standard Double', baseRate: 195, inventory: 40, available: 5, ota: 10 },
    { id: 3, name: 'Executive Suite', baseRate: 350, inventory: 15, available: 8, ota: 2 },
    { id: 4, name: 'Presidential Suite', baseRate: 1200, inventory: 2, available: 1, ota: 0 },
  ]);

  const [rateRules, setRateRules] = useState([
    { id: 1, name: 'Weekend Surge', condition: 'Fri, Sat', adjustment: '+15%', status: 'Active' },
    { id: 2, name: 'Last Minute Deal', condition: '< 24h before', adjustment: '-10%', status: 'Active' },
    { id: 3, name: 'Holiday Peak', condition: 'Dec 20 - Jan 5', adjustment: '+25%', status: 'Scheduled' },
  ]);

  const [packages, setPackages] = useState([
    { id: 1, name: 'Romantic Getaway', inclusions: 'Breakfast, Champagne, Late Checkout', price: '+$85', active: true },
    { id: 2, name: 'Business Traveler', inclusions: 'Wifi Premium, Laundry, Breakfast', price: '+$45', active: true },
  ]);

  const handleUpdateRate = (id: number, newRate: number) => {
    setRoomTypes(prev => prev.map(room => 
      room.id === id ? { ...room, baseRate: newRate } : room
    ));
    setEditRateId(null);
  };

  const toggleRuleStatus = (id: number) => {
    setRateRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, status: rule.status === 'Active' ? 'Inactive' : 'Active' } : rule
    ));
  };

  // Package Handlers
  const openPackageModal = (pkg: any = null) => {
    if (pkg) {
      setEditingPackage(pkg);
      setPackageForm({
        name: pkg.name,
        inclusions: pkg.inclusions,
        price: pkg.price,
        active: pkg.active
      });
    } else {
      setEditingPackage(null);
      setPackageForm({
        name: '',
        inclusions: '',
        price: '',
        active: true
      });
    }
    setIsPackageModalOpen(true);
  };

  const savePackage = () => {
    if (editingPackage) {
      // Update existing
      setPackages(prev => prev.map(p => 
        p.id === editingPackage.id ? { ...p, ...packageForm } : p
      ));
    } else {
      // Create new
      const newPackage = {
        id: packages.length + 1,
        ...packageForm
      };
      setPackages(prev => [...prev, newPackage]);
    }
    setIsPackageModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Rates & Inventory</h1>
          <p className="text-gray-600 mt-1">Dynamic pricing and availability management</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Sync OTAs</Button>
          <Button onClick={() => setIsModalOpen(true)}>+ Add Rate Rule</Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['Rates', 'Inventory', 'Packages'].map((tab) => {
            const key = tab.toLowerCase().replace(' ', '') as any;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === key
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'rates' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Rate Management Table */}
              <div className="lg:col-span-2">
                <Card>
                  <h3 className="font-bold text-gray-900 mb-4">Room Rates (Base)</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Rate</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {roomTypes.map((room) => (
                          <tr key={room.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {editRateId === room.id ? (
                                <div className="flex items-center space-x-2">
                                  <span className="text-gray-500">$</span>
                                  <input 
                                    type="number" 
                                    className="w-20 px-2 py-1 border border-gray-300 rounded"
                                    defaultValue={room.baseRate}
                                    onBlur={(e) => handleUpdateRate(room.id, parseInt(e.target.value) || room.baseRate)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        handleUpdateRate(room.id, parseInt((e.target as HTMLInputElement).value) || room.baseRate);
                                      }
                                    }}
                                    autoFocus
                                  />
                                </div>
                              ) : (
                                <span className="font-bold">${room.baseRate}</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.inventory} total</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button 
                                onClick={() => setEditRateId(room.id)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit Rate
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

              {/* Dynamic Pricing Rules */}
              <div className="lg:col-span-1">
                <Card>
                  <h3 className="font-bold text-gray-900 mb-4">Dynamic Pricing Rules</h3>
                  <div className="space-y-4">
                    {rateRules.map((rule) => (
                      <div key={rule.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow bg-white">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-bold text-gray-900">{rule.name}</p>
                            <p className="text-xs text-gray-500">{rule.condition}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            rule.adjustment.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {rule.adjustment}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className={`text-xs font-medium ${
                            rule.status === 'Active' ? 'text-green-600' : 'text-gray-400'
                          }`}>
                            ● {rule.status}
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={rule.status === 'Active'}
                              onChange={() => toggleRuleStatus(rule.id)}
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <DashboardGrid columns={4}>
              <StatCard title="Total Inventory" value="102" icon={<span>🏨</span>} color="blue" />
              <StatCard title="Occupied" value="75" icon={<span>🔑</span>} color="green" />
              <StatCard title="Available" value="24" icon={<span>🛏️</span>} color="gold" />
              <StatCard title="Out of Order" value="3" icon={<span>🔧</span>} color="red" />
            </DashboardGrid>

            <Card>
              <h3 className="font-bold text-gray-900 mb-4">Inventory Distribution</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Direct Channel</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OTA Channel</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Blocks</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Available</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {roomTypes.map((room) => (
                      <tr key={room.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.available}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.ota}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{room.available + room.ota}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'packages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.id}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{pkg.name}</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">{pkg.price}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4 min-h-[40px]">{pkg.inclusions}</p>
                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <span className={`text-xs font-medium ${pkg.active ? 'text-green-600' : 'text-gray-400'}`}>
                    {pkg.active ? 'Active' : 'Inactive'}
                  </span>
                  <button 
                    onClick={() => openPackageModal(pkg)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                </div>
              </Card>
            ))}
            <button 
              onClick={() => openPackageModal()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-green-500 hover:text-green-500 transition-colors h-full min-h-[150px]"
            >
              <span className="text-4xl mb-2">+</span>
              <span className="font-medium">Create New Package</span>
            </button>
          </div>
        )}
      </div>

      {/* Add Rule Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Dynamic Pricing Rule"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
            <input type="text" placeholder="e.g. Summer Special" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Date Range</option>
                <option>Day of Week</option>
                <option>Occupancy &gt; X%</option>
                <option>Lead Time &lt; X days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
              <input type="text" placeholder="e.g. Fri, Sat" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Adjustment</label>
            <div className="flex space-x-2">
              <select className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Increase By (+)</option>
                <option>Decrease By (-)</option>
              </select>
              <input type="text" placeholder="e.g. 15%" className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <Button onClick={() => { setIsModalOpen(false); alert('Rule added!'); }}>
              Save Rule
            </Button>
          </div>
        </div>
      </Modal>

      {/* Package Edit/Create Modal */}
      <Modal
        isOpen={isPackageModalOpen}
        onClose={() => setIsPackageModalOpen(false)}
        title={editingPackage ? "Edit Package" : "Create New Package"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
            <input 
              type="text" 
              value={packageForm.name}
              onChange={(e) => setPackageForm({...packageForm, name: e.target.value})}
              placeholder="e.g. Honeymoon Special" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Inclusions</label>
            <textarea 
              value={packageForm.inclusions}
              onChange={(e) => setPackageForm({...packageForm, inclusions: e.target.value})}
              placeholder="e.g. Breakfast, Spa Credit, Late Checkout" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-24" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Adjustment</label>
              <input 
                type="text" 
                value={packageForm.price}
                onChange={(e) => setPackageForm({...packageForm, price: e.target.value})}
                placeholder="e.g. +$50" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
              />
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={packageForm.active}
                  onChange={(e) => setPackageForm({...packageForm, active: e.target.checked})}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500" 
                />
                <span className="text-sm text-gray-700">Active Package</span>
              </label>
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <Button onClick={savePackage} disabled={!packageForm.name}>
              {editingPackage ? 'Update Package' : 'Create Package'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
