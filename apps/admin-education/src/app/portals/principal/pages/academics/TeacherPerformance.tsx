import { Card } from '@apex-providers/ui-components';

export default function TeacherPerformance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Teacher Performance</h1>
        <p className="text-gray-600 mt-2">Monitor and evaluate teacher effectiveness</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <div className="text-sm text-gray-600 mb-1">Average Performance</div>
          <div className="text-3xl font-bold text-authority-purple">92.5%</div>
          <div className="text-sm text-green-600 mt-2">↑ 3.2% improvement</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Classroom Observations</div>
          <div className="text-3xl font-bold text-blue-600">87</div>
          <div className="text-sm text-gray-600 mt-2">This semester</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Student Performance Correlation</div>
          <div className="text-3xl font-bold text-green-600">0.85</div>
          <div className="text-sm text-gray-600 mt-2">Strong positive</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">PD Completion</div>
          <div className="text-3xl font-bold text-orange-600">85%</div>
          <div className="text-sm text-gray-600 mt-2">On track</div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Teacher Performance Rankings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Teacher</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Performance Score</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Student Avg GPA</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Observations</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Dr. Sarah Mitchell', dept: 'Mathematics', score: 96, gpa: 3.92, observations: 8, status: 'Excellent' },
                { name: 'Prof. James Wilson', dept: 'Science', score: 94, gpa: 3.88, observations: 7, status: 'Excellent' },
                { name: 'Ms. Emily Davis', dept: 'English', score: 93, gpa: 3.85, observations: 6, status: 'Excellent' },
                { name: 'Dr. Michael Brown', dept: 'Mathematics', score: 91, gpa: 3.78, observations: 8, status: 'Good' },
                { name: 'Ms. Linda Garcia', dept: 'Science', score: 89, gpa: 3.72, observations: 5, status: 'Good' },
                { name: 'Mr. Robert Lee', dept: 'Social Studies', score: 87, gpa: 3.68, observations: 6, status: 'Good' },
                { name: 'Ms. Anna Martinez', dept: 'English', score: 85, gpa: 3.65, observations: 4, status: 'Good' },
              ].map((teacher, idx) => (
                <tr key={teacher.name} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{teacher.name}</td>
                  <td className="py-3 px-4">{teacher.dept}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="font-semibold">{teacher.score}%</span>
                      <div className="ml-2 w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            teacher.score >= 93 ? 'bg-green-500' : teacher.score >= 87 ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${teacher.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{teacher.gpa}</td>
                  <td className="py-3 px-4">{teacher.observations}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      teacher.status === 'Excellent' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {teacher.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Classroom Observation Summary</h2>
          <div className="space-y-3">
            {[
              { metric: 'Lesson Planning', score: 94, trend: '+2' },
              { metric: 'Student Engagement', score: 91, trend: '+4' },
              { metric: 'Assessment Practices', score: 89, trend: '+3' },
              { metric: 'Classroom Management', score: 93, trend: '+1' },
              { metric: 'Differentiation', score: 87, trend: '+5' },
            ].map((item) => (
              <div key={item.metric} className="p-3 border rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-charcoal-gray">{item.metric}</span>
                  <span className="text-sm text-green-600">{item.trend}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-authority-purple h-2 rounded-full" 
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">{item.score}% average</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Professional Development Tracking</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-charcoal-gray">PD Hours Completed</span>
                <span className="text-sm text-gray-600">850 / 1000 hours</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-executive-gold h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-sm">Upcoming Training</div>
                <div className="text-xs text-gray-600 mt-1">Advanced Assessment Techniques - March 20</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-sm">Recent Completion</div>
                <div className="text-xs text-gray-600 mt-1">Differentiated Instruction Workshop - Completed</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

