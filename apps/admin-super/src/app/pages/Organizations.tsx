import { Card } from '@apex-providers/ui-components';

export default function Organizations() {
  const organizations = [
    { id: 1, name: 'Springfield Elementary', vertical: 'Education', status: 'Active', users: 245, healthScore: 8.5 },
    { id: 2, name: 'City General Hospital', vertical: 'Healthcare', status: 'Active', users: 387, healthScore: 9.2 },
    { id: 3, name: 'TechManuf Corp', vertical: 'Manufacturing', status: 'Trial', users: 152, healthScore: 7.8 },
    { id: 4, name: 'Lincoln High School', vertical: 'Education', status: 'Active', users: 312, healthScore: 8.9 },
  ];

  const getVerticalColor = (vertical: string) => {
    switch (vertical) {
      case 'Education': return 'bg-authority-purple text-white';
      case 'Healthcare': return 'bg-healthcare-red text-white';
      case 'Manufacturing': return 'bg-industrial-gray text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Trial': return 'bg-blue-100 text-blue-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Organizations</h1>
          <p className="text-gray-600 mt-2">Manage all organizations across the platform</p>
        </div>
        <button className="px-6 py-3 bg-apex-deep-blue text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>New Organization</span>
        </button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <input
            type="search"
            placeholder="Search organizations..."
            className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-apex-deep-blue"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-apex-deep-blue">
            <option value="">All Verticals</option>
            <option value="education">Education</option>
            <option value="healthcare">Healthcare</option>
            <option value="manufacturing">Manufacturing</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-apex-deep-blue">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </Card>

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <Card key={org.id} hover>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-600">{org.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-gray">{org.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getVerticalColor(org.vertical)} mt-1`}>
                    {org.vertical}
                  </span>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(org.status)}`}>
                {org.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Users</span>
                <span className="font-medium text-charcoal-gray">{org.users}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Health Score</span>
                <span className="font-medium text-green-600">{org.healthScore}/10</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 px-4 py-2 bg-apex-deep-blue text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
