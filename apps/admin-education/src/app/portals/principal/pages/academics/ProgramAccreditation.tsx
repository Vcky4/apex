import { Card } from '@apex-providers/ui-components';

export default function ProgramAccreditation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Program Accreditation</h1>
        <p className="text-gray-600 mt-2">Accreditation requirement tracking and compliance</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Accreditation Requirement Tracking</h2>
          <p className="text-gray-600">Track all accreditation requirements and deadlines</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Self-Study Documentation Management</h2>
          <p className="text-gray-600">Manage self-study documentation and reports</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Site Visit Coordination</h2>
          <p className="text-gray-600">Coordinate accreditation site visits</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Compliance Evidence Collection</h2>
          <p className="text-gray-600">Collect and organize compliance evidence</p>
        </Card>
      </div>
    </div>
  );
}
