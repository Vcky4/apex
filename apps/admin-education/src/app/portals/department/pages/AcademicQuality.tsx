import { Card } from '@apex-providers/ui-components';

interface AcademicQualityProps {
  deptName: string;
}

export default function AcademicQuality({ deptName }: AcademicQualityProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Academic Quality</h1>
        <p className="text-gray-600 mt-2">Assessment standardization and teaching methodology review</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <div className="text-sm text-gray-600 mb-1">Assessment Standardization</div>
          <div className="text-3xl font-bold text-authority-purple">94.5%</div>
          <div className="text-sm text-green-600 mt-2">↑ 2.1% improvement</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Grade Distribution</div>
          <div className="text-3xl font-bold text-green-600">Normal</div>
          <div className="text-sm text-gray-600 mt-2">Well-distributed</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Methodology Review</div>
          <div className="text-3xl font-bold text-blue-600">92%</div>
          <div className="text-sm text-gray-600 mt-2">Approved methods</div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Grade Distribution Analysis</h2>
        <div className="space-y-4">
          {[
            { grade: 'A (90-100)', count: 145, percentage: 35 },
            { grade: 'B (80-89)', count: 168, percentage: 41 },
            { grade: 'C (70-79)', count: 72, percentage: 17 },
            { grade: 'D (60-69)', count: 18, percentage: 4 },
            { grade: 'F (<60)', count: 5, percentage: 1 },
          ].map((item) => (
            <div key={item.grade}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-charcoal-gray">{item.grade}</span>
                <span className="text-sm text-gray-600">{item.count} students ({item.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-authority-purple h-2 rounded-full" 
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Assessment Banks</h2>
          <div className="space-y-3">
            {[
              { name: 'Unit Tests', count: 45, lastUpdate: '2 weeks ago' },
              { name: 'Mid-Term Exams', count: 12, lastUpdate: '1 month ago' },
              { name: 'Final Exams', count: 8, lastUpdate: '2 months ago' },
            ].map((item) => (
              <div key={item.name} className="p-3 border rounded-lg">
                <div className="font-medium text-charcoal-gray">{item.name}</div>
                <div className="text-sm text-gray-600 mt-1">{item.count} assessments available</div>
                <div className="text-xs text-gray-500 mt-1">Last updated: {item.lastUpdate}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Teaching Resources</h2>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium">Lesson Plans</div>
              <div className="text-sm text-gray-600">120 shared plans</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium">Teaching Aids</div>
              <div className="text-sm text-gray-600">85 digital resources</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-medium">Best Practices</div>
              <div className="text-sm text-gray-600">32 documented methods</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

