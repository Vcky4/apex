import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface Curriculum {
  id: string;
  subject: string;
  gradeLevel: string;
  standards: string[];
  alignment: number;
  status: 'Draft' | 'Review' | 'Approved' | 'Implemented';
  lastUpdated: string;
}

interface Textbook {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  publisher: string;
  status: 'Selected' | 'Under Review' | 'Rejected';
  cost: number;
}

export default function CurriculumDevelopment() {
  const [curricula, setCurricula] = useState<Curriculum[]>([
    {
      id: '1',
      subject: 'Mathematics',
      gradeLevel: 'Grade 9-12',
      standards: ['Common Core', 'State Standards'],
      alignment: 95,
      status: 'Implemented',
      lastUpdated: '2024-01-10'
    },
    {
      id: '2',
      subject: 'Science',
      gradeLevel: 'Grade 9-12',
      standards: ['NGSS', 'State Standards'],
      alignment: 92,
      status: 'Approved',
      lastUpdated: '2024-01-15'
    }
  ]);

  const [textbooks, setTextbooks] = useState<Textbook[]>([
    {
      id: '1',
      title: 'Advanced Mathematics',
      subject: 'Mathematics',
      gradeLevel: 'Grade 11-12',
      publisher: 'Educational Publishers Inc.',
      status: 'Selected',
      cost: 85
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Curriculum Development</h1>
          <p className="text-gray-600 mt-2">Curriculum design, mapping, and standards alignment</p>
        </div>
        <Button>Create New Curriculum</Button>
      </div>

      <DashboardGrid columns={4}>
        <StatCard title="Active Curricula" value="28" color="blue" />
        <StatCard title="Standards Alignment" value="94%" color="green" />
        <StatCard title="Textbooks Selected" value="45" color="orange" />
        <StatCard title="Programs Evaluated" value="12" color="purple" />
      </DashboardGrid>

      {/* Curriculum Design & Mapping */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Curriculum Design & Mapping</h2>
          <Button size="sm" variant="secondary">New Curriculum</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standards</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alignment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {curricula.map((curriculum) => (
                <tr key={curriculum.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{curriculum.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{curriculum.gradeLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {curriculum.standards.map((std, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          {std}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-semibold text-green-600">{curriculum.alignment}%</div>
                      <div className="w-16 bg-gray-200 rounded-full h-2 ml-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${curriculum.alignment}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      curriculum.status === 'Implemented' ? 'bg-green-100 text-green-800' :
                      curriculum.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                      curriculum.status === 'Review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {curriculum.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Textbook & Resource Selection */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Textbook & Resource Selection</h2>
          <Button size="sm" variant="secondary">Add Textbook</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publisher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {textbooks.map((textbook) => (
                <tr key={textbook.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{textbook.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{textbook.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{textbook.gradeLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{textbook.publisher}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${textbook.cost}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      textbook.status === 'Selected' ? 'bg-green-100 text-green-800' :
                      textbook.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {textbook.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Program Evaluation & Improvement */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Program Evaluation & Improvement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Evaluation Cycle</div>
            <div className="text-sm text-gray-600 mb-3">Annual comprehensive review</div>
            <div className="text-xs text-blue-600 font-medium">Next review: June 2024</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Improvement Initiatives</div>
            <div className="text-sm text-gray-600 mb-3">5 active projects</div>
            <div className="text-xs text-green-600 font-medium">On track</div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary">Start Evaluation</Button>
          <Button variant="outline">View Reports</Button>
        </div>
      </Card>
    </div>
  );
}