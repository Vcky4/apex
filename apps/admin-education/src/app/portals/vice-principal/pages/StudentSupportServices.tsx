import { Card } from '@apex-providers/ui-components';

export default function StudentSupportServices() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Student Support Services</h1>
        <p className="text-gray-600 mt-2">Counseling, special needs accommodation, and academic support</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Counseling Program Management</h2>
          <p className="text-gray-600">Manage counseling programs and student support services</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Special Needs Accommodation Tracking</h2>
          <p className="text-gray-600">Track and manage special needs accommodations</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Tutoring & Academic Support</h2>
          <p className="text-gray-600">Coordinate tutoring and academic support programs</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Crisis Intervention Coordination</h2>
          <p className="text-gray-600">Manage crisis intervention and emergency support</p>
        </Card>
      </div>
    </div>
  );
}
