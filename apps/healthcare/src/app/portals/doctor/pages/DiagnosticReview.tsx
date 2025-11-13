import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';

export default function DiagnosticReview() {
  const [selectedTest, setSelectedTest] = useState<any>(null);

  const pendingResults = [
    { id: 1, patient: 'John Doe', test: 'Complete Blood Count', date: '2025-01-18', status: 'Pending Review', priority: 'Normal' },
    { id: 2, patient: 'Jane Smith', test: 'Lipid Panel', date: '2025-01-17', status: 'Pending Review', priority: 'High' },
    { id: 3, patient: 'Bob Johnson', test: 'Chest X-Ray', date: '2025-01-16', status: 'Pending Review', priority: 'Normal' },
  ];

  const handleReview = (test: any) => {
    setSelectedTest(test);
    alert(`Reviewing ${test.test} for ${test.patient}...`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Diagnostic Review</h1>
        <p className="text-gray-600 mt-2">Lab result analysis and signing, imaging study review, pathology reports, result trend analysis</p>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Pending Lab Results</h2>
        <div className="space-y-3">
          {pendingResults.map((result) => (
            <div key={result.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">{result.patient}</div>
                  <div className="text-sm text-gray-600 mt-1">{result.test}</div>
                  <div className="text-xs text-gray-500 mt-1">Date: {result.date}</div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    result.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {result.priority}
                  </span>
                  <Button size="sm" className="mt-2" onClick={() => handleReview(result)}>Review</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Imaging Studies</h3>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="font-medium text-blue-900">3 studies pending review</div>
            <Button size="sm" className="mt-3" onClick={() => alert('Opening imaging viewer...')}>View Studies</Button>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Pathology Reports</h3>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="font-medium text-purple-900">1 report pending review</div>
            <Button size="sm" className="mt-3" onClick={() => alert('Opening pathology reports...')}>View Reports</Button>
          </div>
        </Card>
      </div>

      {selectedTest && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Test Result Details</h3>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium mb-2">{selectedTest.test}</div>
            <div className="text-sm text-gray-600">Patient: {selectedTest.patient}</div>
            <div className="text-sm text-gray-600">Date: {selectedTest.date}</div>
            <div className="mt-4">
              <Button onClick={() => alert('Signing result...')}>Sign Result</Button>
              <Button variant="outline" className="ml-2" onClick={() => setSelectedTest(null)}>Close</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

