import { Card } from '@apex-providers/ui-components';

export default function CurriculumOversight() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Curriculum Oversight</h1>
        <p className="text-gray-600 mt-2">Monitor curriculum implementation and standards alignment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <div className="text-sm text-gray-600 mb-1">Implementation Rate</div>
          <div className="text-3xl font-bold text-authority-purple">96.8%</div>
          <div className="text-sm text-green-600 mt-2">↑ 1.2% improvement</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Standards Alignment</div>
          <div className="text-3xl font-bold text-green-600">98.5%</div>
          <div className="text-sm text-gray-600 mt-2">All core subjects</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Pending Approvals</div>
          <div className="text-3xl font-bold text-orange-600">3</div>
          <div className="text-sm text-gray-600 mt-2">Textbook requests</div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Subject-wise Implementation Status</h2>
        <div className="space-y-4">
          {[
            { subject: 'Mathematics', coverage: 98, alignment: 100, resources: 'Approved' },
            { subject: 'Science', coverage: 96, alignment: 98, resources: 'Approved' },
            { subject: 'English Language', coverage: 97, alignment: 100, resources: 'Approved' },
            { subject: 'Social Studies', coverage: 95, alignment: 97, resources: 'Pending' },
            { subject: 'Physical Education', coverage: 94, alignment: 95, resources: 'Approved' },
            { subject: 'Arts', coverage: 92, alignment: 93, resources: 'Pending' },
              ].map((item) => (
                <div key={item.subject} className="p-4 border rounded-lg hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-semibold text-lg text-charcoal-gray">{item.subject}</div>
                      <div className="text-sm text-gray-600 mt-1">Standards Alignment: {item.alignment}%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.resources === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.resources}
                      </span>
                      {item.resources === 'Pending' && (
                        <button className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
                          Review
                        </button>
                      )}
                    </div>
                  </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Curriculum Coverage</span>
                    <span className="text-sm font-medium">{item.coverage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-authority-purple h-2 rounded-full" 
                      style={{ width: `${item.coverage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Textbook & Resource Approvals</h2>
          <div className="space-y-3">
            {[
              { title: 'New Science Lab Manual', dept: 'Science', status: 'Pending', date: '2 days ago' },
              { title: 'Math Workbook Series', dept: 'Mathematics', status: 'Approved', date: '1 week ago' },
              { title: 'Literature Anthology', dept: 'English', status: 'Pending', date: '3 days ago' },
            ].map((item) => (
              <div key={item.title} className="p-3 border rounded-lg hover:bg-gray-50 transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-charcoal-gray">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.dept} Department</div>
                    <div className="text-xs text-gray-500 mt-1">{item.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                    {item.status === 'Pending' && (
                      <div className="flex gap-1">
                        <button className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded hover:bg-green-100">
                          Approve
                        </button>
                        <button className="px-2 py-1 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100">
                          Reject
                        </button>
                      </div>
                    )}
                    {item.status === 'Approved' && (
                      <button className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
                        View
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Standards Verification</h2>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-800">National Curriculum Standards</div>
              <div className="text-sm text-green-700 mt-1">Fully compliant across all subjects</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-800">State Requirements</div>
              <div className="text-sm text-blue-700 mt-1">All requirements met</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-medium text-purple-800">Accreditation Standards</div>
              <div className="text-sm text-purple-700 mt-1">Exceeds minimum requirements</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

