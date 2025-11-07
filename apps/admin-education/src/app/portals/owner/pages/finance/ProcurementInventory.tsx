import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface PurchaseRequisition {
  id: string;
  requisitionNumber: string;
  requestedBy: string;
  department: string;
  items: string;
  totalAmount: number;
  requestDate: string;
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Ordered' | 'Received';
  priority: 'High' | 'Medium' | 'Low';
  approver: string | null;
}

interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  totalOrders: number;
  totalValue: number;
  rating: number;
  status: 'Active' | 'Inactive' | 'Pending';
  lastOrderDate: string;
}

interface InventoryItem {
  id: string;
  itemName: string;
  category: string;
  currentStock: number;
  reorderLevel: number;
  unitPrice: number;
  totalValue: number;
  location: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'On Order';
  lastRestocked: string;
}

interface Asset {
  id: string;
  assetName: string;
  category: string;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  depreciation: number;
  location: string;
  assignedTo: string | null;
  status: 'Active' | 'Maintenance' | 'Retired';
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

export default function ProcurementInventory() {
  const [purchaseRequisitions, setPurchaseRequisitions] = useState<PurchaseRequisition[]>([
    {
      id: '1',
      requisitionNumber: 'PR-2024-001',
      requestedBy: 'Dr. Smith',
      department: 'Science',
      items: 'Lab Equipment (Microscopes, Test Tubes)',
      totalAmount: 12500,
      requestDate: '2024-01-20',
      status: 'Pending Approval',
      priority: 'High',
      approver: null
    },
    {
      id: '2',
      requisitionNumber: 'PR-2024-002',
      requestedBy: 'Ms. Johnson',
      department: 'IT',
      items: 'Laptops (15 units)',
      totalAmount: 22500,
      requestDate: '2024-01-18',
      status: 'Approved',
      priority: 'High',
      approver: 'Finance Executive'
    },
    {
      id: '3',
      requisitionNumber: 'PR-2024-003',
      requestedBy: 'Mr. Brown',
      department: 'Maintenance',
      items: 'Cleaning Supplies',
      totalAmount: 850,
      requestDate: '2024-01-22',
      status: 'Draft',
      priority: 'Low',
      approver: null
    }
  ]);

  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: '1',
      name: 'Tech Solutions Inc.',
      contactPerson: 'John Doe',
      email: 'john@techsolutions.com',
      phone: '+1-555-0123',
      category: 'IT Equipment',
      totalOrders: 12,
      totalValue: 125000,
      rating: 4.8,
      status: 'Active',
      lastOrderDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Educational Supplies Co.',
      contactPerson: 'Jane Smith',
      email: 'jane@edusupplies.com',
      phone: '+1-555-0124',
      category: 'Academic Supplies',
      totalOrders: 25,
      totalValue: 85000,
      rating: 4.5,
      status: 'Active',
      lastOrderDate: '2024-01-20'
    },
    {
      id: '3',
      name: 'Maintenance Pro Services',
      contactPerson: 'Bob Wilson',
      email: 'bob@maintenancepro.com',
      phone: '+1-555-0125',
      category: 'Maintenance',
      totalOrders: 8,
      totalValue: 15000,
      rating: 4.2,
      status: 'Active',
      lastOrderDate: '2024-01-10'
    }
  ]);

  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: '1',
      itemName: 'Printer Paper (A4)',
      category: 'Office Supplies',
      currentStock: 45,
      reorderLevel: 50,
      unitPrice: 25,
      totalValue: 1125,
      location: 'Storage Room A',
      status: 'Low Stock',
      lastRestocked: '2024-01-05'
    },
    {
      id: '2',
      itemName: 'Whiteboard Markers',
      category: 'Teaching Supplies',
      currentStock: 120,
      reorderLevel: 50,
      unitPrice: 3,
      totalValue: 360,
      location: 'Storage Room B',
      status: 'In Stock',
      lastRestocked: '2024-01-15'
    },
    {
      id: '3',
      itemName: 'Lab Chemicals Set',
      category: 'Science Supplies',
      currentStock: 0,
      reorderLevel: 10,
      unitPrice: 150,
      totalValue: 0,
      location: 'Science Lab',
      status: 'Out of Stock',
      lastRestocked: '2023-12-20'
    }
  ]);

  const [assets, setAssets] = useState<Asset[]>([
    {
      id: '1',
      assetName: 'Science Lab Equipment Set',
      category: 'Equipment',
      purchaseDate: '2022-06-15',
      purchasePrice: 45000,
      currentValue: 31500,
      depreciation: 30,
      location: 'Science Lab',
      assignedTo: 'Science Department',
      status: 'Active',
      condition: 'Good'
    },
    {
      id: '2',
      assetName: 'School Bus #1',
      category: 'Vehicle',
      purchaseDate: '2020-03-10',
      purchasePrice: 85000,
      currentValue: 42500,
      depreciation: 50,
      location: 'Parking Lot',
      assignedTo: 'Transport Department',
      status: 'Active',
      condition: 'Fair'
    },
    {
      id: '3',
      assetName: 'Computer Lab Workstations',
      category: 'IT Equipment',
      purchaseDate: '2023-01-20',
      purchasePrice: 60000,
      currentValue: 48000,
      depreciation: 20,
      location: 'Computer Lab',
      assignedTo: 'IT Department',
      status: 'Active',
      condition: 'Excellent'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Ordered': return 'bg-blue-100 text-blue-800';
      case 'Received': return 'bg-green-100 text-green-800';
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'On Order': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-orange-100 text-orange-800';
      case 'Retired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPendingRequisitions = purchaseRequisitions.filter(pr => pr.status === 'Pending Approval').length;
  const totalRequisitionValue = purchaseRequisitions.filter(pr => pr.status === 'Pending Approval' || pr.status === 'Approved').reduce((sum, pr) => sum + pr.totalAmount, 0);
  const totalInventoryValue = inventoryItems.reduce((sum, item) => sum + item.totalValue, 0);
  const totalAssetValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const lowStockItems = inventoryItems.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Procurement & Inventory</h1>
          <p className="text-gray-600 mt-2">Purchase requisitions, vendor management, and asset tracking</p>
        </div>
        <Button>New Requisition</Button>
      </div>

      {/* Overview Stats */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Pending Requisitions"
          value={totalPendingRequisitions.toString()}
          color="yellow"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatCard
          title="Pending Value"
          value={`$${(totalRequisitionValue / 1000).toFixed(0)}K`}
          color="orange"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Inventory Value"
          value={`$${(totalInventoryValue / 1000).toFixed(0)}K`}
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockItems.toString()}
          color="red"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
      </DashboardGrid>

      {/* Purchase Requisition Workflow */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Purchase Requisition Workflow</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Statuses</option>
              <option>Pending Approval</option>
              <option>Approved</option>
              <option>Draft</option>
            </select>
            <Button size="sm" variant="secondary">New Requisition</Button>
          </div>
        </div>

        {purchaseRequisitions.filter(pr => pr.status === 'Pending Approval' && pr.priority === 'High').length > 0 && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-800">
                  {purchaseRequisitions.filter(pr => pr.status === 'Pending Approval' && pr.priority === 'High').length} high priority requisition(s) awaiting approval
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Req #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {purchaseRequisitions.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{req.requisitionNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{req.requestedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{req.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{req.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${req.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(req.priority)}`}>
                      {req.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      {req.status === 'Pending Approval' && (
                        <>
                          <button className="text-green-600 hover:text-green-900">Approve</button>
                          <button className="text-red-600 hover:text-red-900">Reject</button>
                        </>
                      )}
                      {req.status === 'Draft' && (
                        <button className="text-purple-600 hover:text-purple-900">Edit</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Vendor Management & Performance */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Vendor Management & Performance</h2>
          <Button size="sm" variant="secondary">Add Vendor</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{vendor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div>{vendor.contactPerson}</div>
                    <div className="text-xs text-gray-500">{vendor.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vendor.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vendor.totalOrders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${vendor.totalValue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-gray-900 mr-1">{vendor.rating}</span>
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vendor.status)}`}>
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Contact</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Inventory Tracking & Valuation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Inventory Tracking</h2>
            <Button size="sm" variant="secondary">Add Item</Button>
          </div>

          {lowStockItems > 0 && (
            <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex">
                <svg className="h-5 w-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    {lowStockItems} item(s) need restocking
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventoryItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{item.itemName}</div>
                      <div className="text-xs text-gray-500">{item.category}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.currentStock}</div>
                      <div className="text-xs text-gray-500">Reorder: {item.reorderLevel}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${item.totalValue.toLocaleString()}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">Restock</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Asset Management & Depreciation</h2>
            <Button size="sm" variant="secondary">Add Asset</Button>
          </div>

          <div className="space-y-4">
            {assets.map((asset) => (
              <div key={asset.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium text-gray-900">{asset.assetName}</div>
                    <div className="text-sm text-gray-600">{asset.category} • {asset.location}</div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(asset.status)}`}>
                    {asset.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <div className="text-sm text-gray-600">Purchase Price</div>
                    <div className="text-sm font-semibold text-gray-900">${asset.purchasePrice.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Current Value</div>
                    <div className="text-sm font-semibold text-blue-600">${asset.currentValue.toLocaleString()}</div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Depreciation</span>
                    <span className="font-semibold text-gray-900">{asset.depreciation}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full"
                      style={{ width: `${asset.depreciation}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Condition: <span className="font-medium">{asset.condition}</span></span>
                  {asset.assignedTo && (
                    <span className="text-gray-600">Assigned to: <span className="font-medium">{asset.assignedTo}</span></span>
                  )}
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" fullWidth>View Details</Button>
                  <Button size="sm" variant="outline" fullWidth>Update</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Total Asset Value</div>
            <div className="text-2xl font-bold text-blue-600">${totalAssetValue.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mt-1">Across {assets.length} tracked assets</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
