import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

interface InventoryItem {
  id: number;
  item: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate?: string;
  status: 'In Stock' | 'Low Stock' | 'Expired' | 'Out of Stock';
  reorderLevel: number;
}

export default function InventoryManagement() {
  const { toasts, showToast, removeToast } = useToast();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState<any>({});

  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, item: 'Blood Collection Tubes', category: 'Supplies', quantity: 150, unit: 'boxes', expiryDate: '2025-12-31', status: 'In Stock', reorderLevel: 50 },
    { id: 2, item: 'Hematology Reagent', category: 'Reagents', quantity: 25, unit: 'bottles', expiryDate: '2025-03-15', status: 'Low Stock', reorderLevel: 30 },
    { id: 3, item: 'Chemistry Control', category: 'Controls', quantity: 0, unit: 'vials', expiryDate: '2025-02-01', status: 'Out of Stock', reorderLevel: 20 },
    { id: 4, item: 'Glucose Test Strips', category: 'Supplies', quantity: 200, unit: 'strips', expiryDate: '2025-06-30', status: 'In Stock', reorderLevel: 100 },
  ]);

  const [showUpdateStockModal, setShowUpdateStockModal] = useState(false);

  const handleUpdateStock = (item: InventoryItem) => {
    setSelectedItem(item);
    setFormData({
      quantity: item.quantity,
      status: item.status
    });
    setShowUpdateStockModal(true);
  };

  const handleSaveStockUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    const newQuantity = parseInt(formData.quantity);
    const newStatus = newQuantity === 0 ? 'Out of Stock' : newQuantity < selectedItem.reorderLevel ? 'Low Stock' : 'In Stock';

    setInventory(inventory.map(i => 
      i.id === selectedItem.id 
        ? { ...i, quantity: newQuantity, status: newStatus }
        : i
    ));

    showToast(`Inventory updated for ${selectedItem.item}`, 'success');
    setShowUpdateStockModal(false);
    setSelectedItem(null);
    setFormData({});
  };

  const handleSaveOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    const { quantity, vendor, expectedDelivery } = formData;
    if (!quantity || !vendor) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    // Update inventory
    setInventory(inventory.map(i => 
      i.id === selectedItem.id 
        ? { ...i, quantity: i.quantity + parseInt(quantity), status: i.quantity + parseInt(quantity) < i.reorderLevel ? 'Low Stock' : 'In Stock' }
        : i
    ));

    showToast(`Order placed for ${selectedItem.item}. Expected delivery: ${expectedDelivery || 'TBD'}`, 'success');
    setShowOrderModal(false);
    setSelectedItem(null);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Inventory Management</h1>
        <p className="text-gray-600 mt-2">Reagent and supply tracking, expiration date monitoring, order management, vendor communication</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Inventory Status</h2>
          <div className="text-sm text-gray-600">
            Low Stock: {inventory.filter(i => i.status === 'Low Stock').length} | 
            Out of Stock: {inventory.filter(i => i.status === 'Out of Stock').length}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{item.item}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.quantity} {item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.expiryDate || 'N/A'}</td>
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
                    <button onClick={() => handleUpdateStock(item)} className="text-green-600 hover:text-green-900 mr-3">Update Stock</button>
                    {(item.status === 'Low Stock' || item.status === 'Out of Stock') && (
                      <button onClick={() => handleOrderSupplies(item)} className="text-blue-600 hover:text-blue-900">Order</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Update Stock Modal */}
      <Modal
        isOpen={showUpdateStockModal}
        onClose={() => {
          setShowUpdateStockModal(false);
          setSelectedItem(null);
          setFormData({});
        }}
        title={`Update Inventory: ${selectedItem?.item}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowUpdateStockModal(false)}>Cancel</Button>
            <Button onClick={() => {
               const form = document.getElementById('update-lab-stock-form') as HTMLFormElement;
               if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
            }}>Save Update</Button>
          </div>
        }
      >
        {selectedItem && (
          <form id="update-lab-stock-form" onSubmit={handleSaveStockUpdate} className="space-y-4">
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Quantity</label>
              <input
                type="number"
                required
                min="0"
                value={formData.quantity || ''}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <p className="text-xs text-gray-500 mt-1">System will automatically update status based on reorder level ({selectedItem.reorderLevel}).</p>
            </div>
          </form>
        )}
      </Modal>

      {/* Order Supplies Modal */}
      <Modal
        isOpen={showOrderModal}
        onClose={() => {
          setShowOrderModal(false);
          setSelectedItem(null);
          setFormData({});
        }}
        title={`Order Supplies: ${selectedItem?.item}`}
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
                value={formData.quantity || ''}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
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
    </div>
  );
}
