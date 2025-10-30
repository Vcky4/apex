import { Card } from '@apex-providers/ui-components';

export default function DisciplineBehavior() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Discipline & Behavior Management</h1>
        <p className="text-gray-600 mt-2">Code of conduct, incident reporting, and behavior intervention</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Code of Conduct Management</h2>
          <p className="text-gray-600">Manage and enforce school code of conduct</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Incident Reporting & Tracking</h2>
          <p className="text-gray-600">Report and track disciplinary incidents</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Restorative Practice Programs</h2>
          <p className="text-gray-600">Implement and manage restorative practice programs</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Parent Communication Logs</h2>
          <p className="text-gray-600">Maintain logs of parent communications regarding behavior</p>
        </Card>
      </div>
    </div>
  );
}
