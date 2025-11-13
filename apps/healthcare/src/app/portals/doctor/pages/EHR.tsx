import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EHR() {
  const { patientId } = useParams();
  const [selectedPatient] = useState(patientId || '1');

  const patients = [
    { id: '1', name: 'John Doe', dob: '1980-05-15', mrn: 'MRN-001', lastVisit: '2025-01-18' },
    { id: '2', name: 'Jane Smith', dob: '1975-08-22', mrn: 'MRN-002', lastVisit: '2025-01-17' },
  ];

  const patient = patients.find(p => p.id === selectedPatient) || patients[0];

  const medicalHistory = [
    { date: '2025-01-18', type: 'Visit', diagnosis: 'Hypertension', provider: 'Dr. Sarah Johnson' },
    { date: '2025-01-10', type: 'Lab Test', diagnosis: 'Blood Work - Normal', provider: 'Lab' },
    { date: '2024-12-15', type: 'Visit', diagnosis: 'Annual Check-up', provider: 'Dr. Sarah Johnson' },
  ];

  const medications = [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2025-01-01' },
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2024-12-01' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Electronic Health Records</h1>
        <p className="text-gray-600 mt-2">Comprehensive patient medical history, clinical notes, treatment plan management, progress tracking</p>
      </div>

      {/* Patient Info */}
      <Card>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <div>DOB: {patient.dob} | MRN: {patient.mrn}</div>
              <div>Last Visit: {patient.lastVisit}</div>
            </div>
          </div>
          <Button onClick={() => alert('Adding new clinical note...')}>Add Clinical Note</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medical History */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Medical History</h3>
          <div className="space-y-3">
            {medicalHistory.map((entry, idx) => (
              <div key={idx} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{entry.type}</div>
                    <div className="text-sm text-gray-600 mt-1">{entry.diagnosis}</div>
                    <div className="text-xs text-gray-500 mt-1">{entry.provider}</div>
                  </div>
                  <div className="text-xs text-gray-500">{entry.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Current Medications */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Current Medications</h3>
          <div className="space-y-3">
            {medications.map((med, idx) => (
              <div key={idx} className="p-3 border border-gray-200 rounded-lg">
                <div className="font-medium">{med.name}</div>
                <div className="text-sm text-gray-600 mt-1">{med.dosage} - {med.frequency}</div>
                <div className="text-xs text-gray-500 mt-1">Started: {med.startDate}</div>
              </div>
            ))}
          </div>
          <Button size="sm" className="mt-4" variant="outline" onClick={() => alert('Opening prescription management...')}>
            Manage Medications
          </Button>
        </Card>
      </div>

      {/* Clinical Notes */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Clinical Notes & Observations</h3>
          <Button size="sm" onClick={() => alert('Adding new clinical note...')}>Add Note</Button>
        </div>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div className="font-medium">Visit Note - {patient.lastVisit}</div>
              <div className="text-xs text-gray-500">Dr. Sarah Johnson</div>
            </div>
            <p className="text-sm text-gray-700">
              Patient presents with controlled hypertension. Blood pressure readings stable. 
              Continue current medication regimen. Follow-up in 3 months.
            </p>
          </div>
        </div>
      </Card>

      {/* Treatment Plan */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Treatment Plan</h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="font-medium text-blue-900">Active Plan</div>
            <div className="text-sm text-blue-800 mt-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Continue Lisinopril 10mg daily</li>
                <li>Monitor blood pressure weekly</li>
                <li>Follow-up appointment scheduled for April 2025</li>
                <li>Lifestyle modifications: Diet and exercise</li>
              </ul>
            </div>
          </div>
        </div>
        <Button size="sm" className="mt-4" onClick={() => alert('Updating treatment plan...')}>
          Update Treatment Plan
        </Button>
      </Card>
    </div>
  );
}

