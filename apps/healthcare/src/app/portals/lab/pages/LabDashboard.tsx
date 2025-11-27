import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';
import { useNavigate } from 'react-router-dom';

export default function LabDashboard() {
  const navigate = useNavigate();

  // Mock data for charts
  const testVolumeData = [
    { day: 'Mon', count: 32 },
    { day: 'Tue', count: 45 },
    { day: 'Wed', count: 28 },
    { day: 'Thu', count: 50 },
    { day: 'Fri', count: 42 },
    { day: 'Sat', count: 18 },
    { day: 'Sun', count: 12 },
  ];
  
  const maxTests = Math.max(...testVolumeData.map(d => d.count));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Lab Assistant Dashboard</h1>
        <p className="text-gray-600 mt-2">Lab work overview, pending test requests, in-progress tests, critical result alerts, equipment status</p>
      </div>

      <DashboardGrid columns={4}>
        <StatCard title="Pending Tests" value="15" color="orange" icon={<span className="text-2xl">⏳</span>} />
        <StatCard title="In Progress" value="8" color="blue" icon={<span className="text-2xl">🔬</span>} />
        <StatCard title="Critical Results" value="2" color="red" icon={<span className="text-2xl">⚠️</span>} />
        <StatCard title="QC Due" value="3" color="purple" icon={<span className="text-2xl">✅</span>} />
      </DashboardGrid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Test Volume Chart */}
        <Card>
          <h2 className="text-xl font-semibold mb-6">Weekly Test Volume</h2>
          <div className="flex items-end justify-between h-64 space-x-2 px-4">
            {testVolumeData.map((data) => (
              <div key={data.day} className="flex flex-col items-center w-full group relative">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded">
                  {data.count} tests
                </div>
                <div 
                  className="w-full bg-indigo-100 hover:bg-indigo-200 rounded-t transition-all duration-300 relative"
                  style={{ height: `${(data.count / maxTests) * 100}%` }}
                >
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t transition-all duration-500" 
                    style={{ height: '0%', animation: 'growUp 1s forwards' }} 
                  />
                  <div className="w-full h-full bg-indigo-500 rounded-t opacity-80 hover:opacity-100"></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{data.day}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Test Status & Equipment Overview */}
        <Card>
          <h2 className="text-xl font-semibold mb-6">Lab Status Overview</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">Sample Processing Efficiency</span>
                <span className="text-gray-500">92% (On Time)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                <div className="text-sm font-medium text-green-800">Hematology Analyzer</div>
                <div className="text-xs text-green-600 mt-1">Operational</div>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                <div className="text-sm font-medium text-yellow-800">Centrifuge A</div>
                <div className="text-xs text-yellow-600 mt-1">Maintenance Due</div>
              </div>
              <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                <div className="text-sm font-medium text-green-800">Chemistry Analyzer</div>
                <div className="text-xs text-green-600 mt-1">Operational</div>
              </div>
               <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                <div className="text-sm font-medium text-red-800">Microscope B</div>
                <div className="text-xs text-red-600 mt-1">Offline</div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => navigate('/lab/quality')}>View Quality Control</Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Recent Activity Log */}
         <Card className="lg:col-span-2">
           <h2 className="text-xl font-semibold mb-4">Recent Lab Activity</h2>
           <div className="space-y-4">
              {[
                { action: 'Critical Result', detail: 'High Potassium - Patient: J. Doe', time: '10 mins ago', icon: '⚠️', color: 'text-red-600 bg-red-100' },
                { action: 'Sample Received', detail: 'Lipid Panel - Patient: S. Smith', time: '25 mins ago', icon: '🧪', color: 'text-blue-600 bg-blue-100' },
                { action: 'Test Completed', detail: 'CBC - Patient: M. Brown', time: '45 mins ago', icon: '✅', color: 'text-green-600 bg-green-100' },
                { action: 'QC Warning', detail: 'Hematology Control Level 2 out of range', time: '1 hour ago', icon: '📉', color: 'text-orange-600 bg-orange-100' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 border-b border-gray-50 last:border-0">
                   <div className={`mt-1 p-2 rounded-full text-sm ${activity.color}`}>{activity.icon}</div>
                   <div>
                      <div className="font-medium text-gray-900">{activity.action}</div>
                      <div className="text-sm text-gray-600">{activity.detail}</div>
                      <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                   </div>
                </div>
              ))}
           </div>
         </Card>

         {/* Quick Actions */}
         <Card>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
               <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/lab/test-processing')}>
                 <span className="mr-2">🔬</span> Process New Sample
               </Button>
               <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/lab/test-processing')}>
                 <span className="mr-2">📝</span> Enter Results
               </Button>
               <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/lab/inventory')}>
                 <span className="mr-2">📦</span> Check Inventory
               </Button>
               <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/lab/quality')}>
                 <span className="mr-2">📊</span> Log QC Data
               </Button>
            </div>
         </Card>
      </div>
    </div>
  );
}
