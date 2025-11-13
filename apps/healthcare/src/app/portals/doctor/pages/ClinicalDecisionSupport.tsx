import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';

export default function ClinicalDecisionSupport() {
  const [drug1, setDrug1] = useState('');
  const [drug2, setDrug2] = useState('');
  const [checkResult, setCheckResult] = useState<any>(null);

  const handleDrugInteractionCheck = () => {
    if (!drug1 || !drug2) {
      alert('Please enter both medications');
      return;
    }
    // Simulate drug interaction check
    setCheckResult({
      interaction: 'Moderate',
      description: 'Potential interaction detected. Monitor patient closely.',
      recommendation: 'Consider adjusting dosage or timing.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Clinical Decision Support</h1>
        <p className="text-gray-600 mt-2">Drug interaction checking, clinical guideline access, diagnostic support tools, best practice alerts</p>
      </div>

      {/* Drug Interaction Checker */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Drug Interaction Checker</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medication 1</label>
            <input
              type="text"
              value={drug1}
              onChange={(e) => setDrug1(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter medication name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medication 2</label>
            <input
              type="text"
              value={drug2}
              onChange={(e) => setDrug2(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter medication name"
            />
          </div>
        </div>
        <Button onClick={handleDrugInteractionCheck}>Check Interaction</Button>
        
        {checkResult && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="font-semibold text-yellow-900 mb-2">Interaction: {checkResult.interaction}</div>
            <div className="text-sm text-yellow-800">{checkResult.description}</div>
            <div className="text-sm text-yellow-800 mt-2"><strong>Recommendation:</strong> {checkResult.recommendation}</div>
          </div>
        )}
      </Card>

      {/* Clinical Guidelines */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Clinical Guidelines</h2>
        <div className="space-y-3">
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="font-medium">Hypertension Management Guidelines</div>
            <div className="text-sm text-gray-600 mt-1">ACC/AHA 2023 Guidelines</div>
            <Button size="sm" variant="outline" className="mt-2">View Guidelines</Button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="font-medium">Diabetes Care Standards</div>
            <div className="text-sm text-gray-600 mt-1">ADA 2024 Standards</div>
            <Button size="sm" variant="outline" className="mt-2">View Standards</Button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="font-medium">Infectious Disease Protocols</div>
            <div className="text-sm text-gray-600 mt-1">CDC Guidelines</div>
            <Button size="sm" variant="outline" className="mt-2">View Protocols</Button>
          </div>
        </div>
      </Card>

      {/* Diagnostic Support Tools */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Diagnostic Support Tools</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="font-medium mb-2">BMI Calculator</div>
            <Button size="sm" variant="outline" onClick={() => alert('Opening BMI calculator...')}>Open Calculator</Button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="font-medium mb-2">Dosage Calculator</div>
            <Button size="sm" variant="outline" onClick={() => alert('Opening dosage calculator...')}>Open Calculator</Button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="font-medium mb-2">Risk Assessment Tools</div>
            <Button size="sm" variant="outline" onClick={() => alert('Opening risk assessment...')}>View Tools</Button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="font-medium mb-2">Medical Reference</div>
            <Button size="sm" variant="outline" onClick={() => alert('Opening medical reference...')}>Access Library</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

