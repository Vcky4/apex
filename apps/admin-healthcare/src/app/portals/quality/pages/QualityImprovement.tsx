import { Card, Button, DashboardGrid } from '@apex-providers/ui-components';

export default function QualityImprovement() {
  const initiatives = [
    { name: 'Reduce Hospital-Acquired Infections', status: 'In Progress', progress: 75, target: 'Reduce by 20%' },
    { name: 'Improve ED Wait Times', status: 'In Progress', progress: 60, target: 'Under 30 minutes' },
    { name: 'Enhance Patient Communication', status: 'In Progress', progress: 85, target: '95% satisfaction' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Quality Improvement</h1>
        <p className="text-gray-600 mt-2">Performance measure dashboard, quality initiative management, benchmarking</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Quality Initiatives</h2>
          <Button onClick={() => alert('Create initiative')}>Create Initiative</Button>
        </div>
        <div className="space-y-4">
          {initiatives.map((initiative, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{initiative.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Target: {initiative.target}</p>
                </div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {initiative.status}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: `${initiative.progress}%` }}></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{initiative.progress}% Complete</span>
                <Button size="sm" variant="outline">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

