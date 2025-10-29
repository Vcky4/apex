export default function Students() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Students</h1>
          <p className="text-gray-600 mt-2">Manage all student records and information</p>
        </div>
        <button className="px-6 py-3 bg-authority-purple text-white rounded-lg hover:bg-opacity-90">
          + Add Student
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Student management interface - Coming soon</p>
      </div>
    </div>
  );
}
