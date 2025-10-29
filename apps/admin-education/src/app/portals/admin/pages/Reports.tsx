export default function Reports() {
  const reportTypes = [
    { id: 1, title: 'Student Performance Report', description: 'Comprehensive academic performance analysis by grade level', icon: '📊', frequency: 'Monthly', lastGenerated: '2 days ago' },
    { id: 2, title: 'Attendance Summary', description: 'Detailed attendance tracking and trends', icon: '📅', frequency: 'Weekly', lastGenerated: '1 day ago' },
    { id: 3, title: 'Teacher Workload Report', description: 'Analysis of class assignments and student distribution', icon: '👨‍🏫', frequency: 'Monthly', lastGenerated: '5 days ago' },
    { id: 4, title: 'Grade Distribution Analysis', description: 'Statistical breakdown of grades across all subjects', icon: '📈', frequency: 'Quarterly', lastGenerated: '1 week ago' },
    { id: 5, title: 'Parent Communication Log', description: 'Record of all parent-teacher interactions', icon: '💬', frequency: 'Monthly', lastGenerated: '3 days ago' },
    { id: 6, title: 'Enrollment Trends', description: 'Student enrollment patterns and projections', icon: '📉', frequency: 'Quarterly', lastGenerated: '2 weeks ago' },
  ];

  const recentReports = [
    { name: 'March 2025 Performance Report', date: '2025-03-08', type: 'PDF', size: '2.4 MB', status: 'Ready' },
    { name: 'Weekly Attendance - Week 10', date: '2025-03-07', type: 'Excel', size: '856 KB', status: 'Ready' },
    { name: 'Q1 Grade Distribution', date: '2025-03-01', type: 'PDF', size: '1.8 MB', status: 'Ready' },
    { name: 'Teacher Assignments Feb 2025', date: '2025-02-28', type: 'PDF', size: '1.2 MB', status: 'Ready' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-2">Generate and access comprehensive school reports</p>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{report.icon}</div>
              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{report.frequency}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{report.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{report.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>Last generated: {report.lastGenerated}</span>
            </div>
            <button className="w-full px-4 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm">
              Generate Report
            </button>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Reports</h2>
        <div className="space-y-3">
          {recentReports.map((report, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-authority-purple bg-opacity-10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-authority-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{report.name}</p>
                  <p className="text-sm text-gray-500">{report.date} • {report.type} • {report.size}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">{report.status}</span>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
