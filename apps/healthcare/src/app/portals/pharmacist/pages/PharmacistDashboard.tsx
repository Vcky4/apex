import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';
import { useNavigate } from 'react-router-dom';

export default function PharmacistDashboard() {
  const navigate = useNavigate();

  // Mock data for charts
  const prescriptionData = [
    { day: 'Mon', count: 45 },
    { day: 'Tue', count: 52 },
    { day: 'Wed', count: 38 },
    { day: 'Thu', count: 65 },
    { day: 'Fri', count: 48 },
    { day: 'Sat', count: 25 },
    { day: 'Sun', count: 15 },
  ];
  
  const maxPrescriptions = Math.max(...prescriptionData.map(d => d.count));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Pharmacist Dashboard</h1>
        <p className="text-gray-600 mt-2">Pharmacy overview, pending prescriptions, ready for pickup, patient consultations scheduled, inventory alerts</p>
      </div>

      <DashboardGrid columns={4}>
        <StatCard title="Pending Prescriptions" value="12" color="orange" icon={<span className="text-2xl">⏳</span>} />
        <StatCard title="Ready for Pickup" value="8" color="green" icon={<span className="text-2xl">✅</span>} />
        <StatCard title="Consultations" value="3" color="blue" icon={<span className="text-2xl">💬</span>} />
        <StatCard title="Inventory Alerts" value="5" color="red" icon={<span className="text-2xl">⚠️</span>} />
      </DashboardGrid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Prescription Volume Chart */}
        <Card>
          <h2 className="text-xl font-semibold mb-6">Weekly Prescription Volume</h2>
          <div className="flex items-end justify-between h-64 space-x-2 px-4">
            {prescriptionData.map((data) => (
              <div key={data.day} className="flex flex-col items-center w-full group relative">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded">
                  {data.count} prescriptions
                </div>
                <div 
                  className="w-full bg-teal-100 hover:bg-teal-200 rounded-t transition-all duration-300 relative"
                  style={{ height: `${(data.count / maxPrescriptions) * 100}%` }}
                >
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-teal-500 rounded-t transition-all duration-500" 
                    style={{ height: '0%', animation: 'growUp 1s forwards' }} 
                  />
                  {/* Animated bar using inline style for simplicity in this demo, or just static height */}
                  <div className="w-full h-full bg-teal-500 rounded-t opacity-80 hover:opacity-100"></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{data.day}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Inventory Status Chart */}
        <Card>
          <h2 className="text-xl font-semibold mb-6">Inventory Status Overview</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">In Stock</span>
                <span className="text-gray-500">85% (425 items)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">Low Stock</span>
                <span className="text-gray-500">10% (50 items)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">Out of Stock</span>
                <span className="text-gray-500">5% (25 items)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-red-500 h-3 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
               <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">Expiring Soon (Next 30 Days)</span>
                <span className="text-gray-500">12 items</span>
              </div>
               <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-orange-400 h-3 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline" onClick={() => navigate('/pharmacist/inventory')}>Manage Inventory</Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Top Dispensed Medications */}
         <Card className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Top Dispensed Medications (This Month)</h2>
            <div className="space-y-4">
               {[
                 { name: 'Lisinopril 10mg', count: 145, trend: '+5%' },
                 { name: 'Metformin 500mg', count: 132, trend: '+2%' },
                 { name: 'Atorvastatin 20mg', count: 98, trend: '-1%' },
                 { name: 'Amoxicillin 500mg', count: 85, trend: '+12%' },
                 { name: 'Omeprazole 20mg', count: 76, trend: '+3%' },
               ].map((med, i) => (
                 <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                       <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 font-bold shadow-sm">
                         {i + 1}
                       </div>
                       <div className="font-medium text-gray-900">{med.name}</div>
                    </div>
                    <div className="flex items-center space-x-6">
                       <div className="text-gray-600">{med.count} dispensed</div>
                       <div className={`text-sm font-medium ${med.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                         {med.trend}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </Card>

         {/* Recent Activity Log */}
         <Card>
           <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
           <div className="space-y-4">
              {[
                { action: 'Stock Received', detail: '500 units of Lisinopril', time: '10 mins ago', icon: '📦' },
                { action: 'Prescription Dispensed', detail: 'Order #1234 for J. Doe', time: '25 mins ago', icon: '💊' },
                { action: 'Low Stock Alert', detail: 'Amoxicillin below 50 units', time: '1 hour ago', icon: '⚠️' },
                { action: 'Stock Updated', detail: 'Metformin count corrected', time: '2 hours ago', icon: '📝' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start space-x-3">
                   <div className="mt-1 p-2 bg-gray-100 rounded-full text-sm">{activity.icon}</div>
                   <div>
                      <div className="font-medium text-gray-900">{activity.action}</div>
                      <div className="text-sm text-gray-600">{activity.detail}</div>
                      <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                   </div>
                </div>
              ))}
           </div>
         </Card>
      </div>
    </div>
  );
}
