import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../shared/Modal';
import { useToast, ToastContainer } from '../../shared/Toast';

interface InventoryItem {
  id: number;
  medication: string;
  genericName: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  status: 'In Stock' | 'Low Stock' | 'Expired' | 'Out of Stock';
  reorderLevel: number;
  location: string;
}

export default function InventoryControl() {
  const { toasts, showToast, removeToast } = useToast();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState<any>({});

  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, medication: 'Lisinopril', genericName: 'Lisinopril', quantity: 500, unit: 'tablets', expiryDate: '2025-12-31', status: 'In Stock', reorderLevel: 200, location: 'A-12' },
    { id: 2, medication: 'Metformin', genericName: 'Metformin HCl', quantity: 150, unit: 'tablets', expiryDate: '2025-06-30', status: 'Low Stock', reorderLevel: 300, location: 'B-05' },
    { id: 3, medication: 'Amoxicillin', genericName: 'Amoxicillin', quantity: 0, unit: 'capsules', expiryDate: '2025-03-15', status: 'Out of Stock', reorderLevel: 250, location: 'C-08' },
    { id: 4, medication: 'Atorvastatin', genericName: 'Atorvastatin Calcium', quantity: 800, unit: 'tablets', expiryDate: '2025-09-30', status: 'In Stock', reorderLevel: 400, location: 'A-15' },
  ]);

  const handleOrderMedication = (item: InventoryItem) => {
    setSelectedItem(item);
    setFormData({
      orderQuantity: item.reorderLevel,
      vendor: '',
      expectedDelivery: '',
    });
    setShowOrderModal(true);
  };

  const handleSaveOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    const { orderQuantity, vendor, expectedDelivery } = formData;
    if (!orderQuantity || !vendor) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    showToast(`Order placed for ${selectedItem.medication}. Expected delivery: ${expectedDelivery || 'TBD'}`, 'success');
    setShowOrderModal(false);
    setSelectedItem(null);
    setFormData({});
  };

  const handleReceiveStock = (item: InventoryItem) => {
    setSelectedItem(item);
    setFormData({
      receivedQuantity: '',
      lotNumber: '',
      expiryDate: '',
    });
    setShowReceiveModal(true);
  };

  const handleSaveReceive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    const { receivedQuantity, lotNumber, expiryDate } = formData;
    if (!receivedQuantity) {
      showToast('Please enter received quantity', 'error');
      return;
    }

    setInventory(inventory.map(i => 
      i.id === selectedItem.id 
        ? { 
            ...i, 
            quantity: i.quantity + parseInt(receivedQuantity),
            status: i.quantity + parseInt(receivedQuantity) < i.reorderLevel ? 'Low Stock' : 'In Stock',
            expiryDate: expiryDate || i.expiryDate,
          }
        : i
    ));

    showToast(`${receivedQuantity} ${selectedItem.unit} of ${selectedItem.medication} received`, 'success');
    setShowReceiveModal(false);
    setSelectedItem(null);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Inventory Control</h1>
        <p className="text-gray-600 mt-2">Drug stock level monitoring, order management, expiration date tracking, location management</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Medication Inventory</h2>
          <div className="text-sm text-gray-600">
            Low Stock: {inventory.filter(i => i.status === 'Low Stock').length} | 
            Out of Stock: {inventory.filter(i => i.status === 'Out of Stock').length}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medication</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Generic Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{item.medication}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.genericName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.quantity} {item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.expiryDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                      item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'Out of Stock' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {(item.status === 'Low Stock' || item.status === 'Out of Stock') && (
                      <button onClick={() => handleOrderMedication(item)} className="text-blue-600 hover:text-blue-900 mr-3">Order</button>
                    )}
                    <button onClick={() => handleReceiveStock(item)} className="text-green-600 hover:text-green-900">Receive</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Order Modal */}
      <Modal
        isOpen={showOrderModal}
        onClose={() => {
          setShowOrderModal(false);
          setSelectedItem(null);
          setFormData({});
        }}
        title={`Order Medication: ${selectedItem?.medication}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowOrderModal(false);
              setSelectedItem(null);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Place Order</Button>
          </div>
        }
      >
        {selectedItem && (
          <form onSubmit={handleSaveOrder} className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Current Stock: {selectedItem.quantity} {selectedItem.unit}</div>
              <div className="text-sm text-blue-800 mt-1">Reorder Level: {selectedItem.reorderLevel} {selectedItem.unit}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Quantity *</label>
              <input
                type="number"
                required
                min="1"
                value={formData.orderQuantity || ''}
                onChange={(e) => setFormData({ ...formData, orderQuantity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder={selectedItem.reorderLevel.toString()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vendor *</label>
              <input
                type="text"
                required
                value={formData.vendor || ''}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Vendor name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery Date</label>
              <input
                type="date"
                value={formData.expectedDelivery || ''}
                onChange={(e) => setFormData({ ...formData, expectedDelivery: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </form>
        )}
      </Modal>

      {/* Receive Stock Modal */}
      <Modal
        isOpen={showReceiveModal}
        onClose={() => {
          setShowReceiveModal(false);
          setSelectedItem(null);
          setFormData({});
        }}
        title={`Receive Stock: ${selectedItem?.medication}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowReceiveModal(false);
              setSelectedItem(null);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Receive Stock</Button>
          </div>
        }
      >
        {selectedItem && (
          <form onSubmit={handleSaveReceive} className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Medication: {selectedItem.medication}</div>
              <div className="text-sm text-blue-800 mt-1">Current Stock: {selectedItem.quantity} {selectedItem.unit}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Received Quantity *</label>
              <input
                type="number"
                required
                min="1"
                value={formData.receivedQuantity || ''}
                onChange={(e) => setFormData({ ...formData, receivedQuantity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter quantity"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lot Number</label>
              <input
                type="text"
                value={formData.lotNumber || ''}
                onChange={(e) => setFormData({ ...formData, lotNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter lot number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="date"
                value={formData.expiryDate || ''}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
