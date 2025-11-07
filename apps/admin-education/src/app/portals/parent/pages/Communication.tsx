import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface Message {
  id: string;
  from: string;
  fromRole: 'Teacher' | 'Administrator' | 'Principal';
  to: string;
  subject: string;
  message: string;
  date: string;
  time: string;
  isRead: boolean;
  priority: 'High' | 'Normal' | 'Low';
  relatedStudent?: string;
  category: 'General' | 'Academic' | 'Behavior' | 'Attendance' | 'Payment' | 'Event';
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: 'General' | 'Academic' | 'Event' | 'Emergency';
  priority: 'High' | 'Normal' | 'Low';
  isRead: boolean;
}

export default function Communication() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStudent, setSelectedStudent] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'messages' | 'announcements'>('messages');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [composeData, setComposeData] = useState({ to: '', subject: '', message: '' });

  const messages: Message[] = [
    {
      id: '1',
      from: 'Mr. Smith',
      fromRole: 'Teacher',
      to: 'Parent',
      subject: 'Alex\'s Progress in Mathematics',
      message: 'I wanted to reach out regarding Alex\'s excellent progress in Mathematics this semester. He has shown great improvement and consistently participates in class discussions. Keep up the great work!',
      date: '2024-03-08',
      time: '10:30 AM',
      isRead: false,
      priority: 'Normal',
      relatedStudent: 'Alex Johnson',
      category: 'Academic'
    },
    {
      id: '2',
      from: 'Mrs. Johnson',
      fromRole: 'Teacher',
      to: 'Parent',
      subject: 'Emma\'s Assignment Submission',
      message: 'Emma submitted her English essay assignment on time. The quality of her work was exceptional. I\'m very pleased with her progress.',
      date: '2024-03-07',
      time: '2:15 PM',
      isRead: true,
      priority: 'Normal',
      relatedStudent: 'Emma Johnson',
      category: 'Academic'
    },
    {
      id: '3',
      from: 'School Administrator',
      fromRole: 'Administrator',
      to: 'Parent',
      subject: 'Parent-Teacher Conference Reminder',
      message: 'This is a reminder that your Parent-Teacher Conference is scheduled for tomorrow at 3:00 PM in Room 201. Please arrive 5 minutes early.',
      date: '2024-03-09',
      time: '9:00 AM',
      isRead: false,
      priority: 'High',
      category: 'Event'
    },
    {
      id: '4',
      from: 'Dr. Brown',
      fromRole: 'Teacher',
      to: 'Parent',
      subject: 'Alex - Late Arrival Notice',
      message: 'Alex arrived 5 minutes late to Physics class today. This is the first occurrence this month. Please ensure he arrives on time.',
      date: '2024-03-06',
      time: '11:00 AM',
      isRead: true,
      priority: 'Normal',
      relatedStudent: 'Alex Johnson',
      category: 'Attendance'
    },
    {
      id: '5',
      from: 'Principal',
      fromRole: 'Principal',
      to: 'Parent',
      subject: 'School Science Fair - Participation Request',
      message: 'We are excited to invite your children to participate in the upcoming Science Fair on March 15th. Registration forms are available in the office.',
      date: '2024-03-05',
      time: '3:30 PM',
      isRead: true,
      priority: 'Normal',
      category: 'Event'
    }
  ];

  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Spring Break Schedule',
      content: 'Spring Break will be from March 25 to April 1. School will be closed during this period. Classes will resume on April 2nd.',
      author: 'School Administration',
      date: '2024-03-10',
      category: 'General',
      priority: 'Normal',
      isRead: false
    },
    {
      id: '2',
      title: 'Science Fair 2024',
      content: 'The annual Science Fair will be held on March 15th in the school auditorium. All parents are welcome to attend. Projects will be displayed from 9 AM to 3 PM.',
      author: 'Science Department',
      date: '2024-03-08',
      category: 'Event',
      priority: 'High',
      isRead: true
    },
    {
      id: '3',
      title: 'New Library Resources Available',
      content: 'The school library has added new digital resources and books. Students can access these resources using their student ID.',
      author: 'Library Staff',
      date: '2024-03-05',
      category: 'Academic',
      priority: 'Normal',
      isRead: true
    },
    {
      id: '4',
      title: 'Parent-Teacher Conference Schedule',
      content: 'Parent-Teacher Conferences are scheduled for March 10-12. Please book your appointment through the parent portal or contact the school office.',
      author: 'School Administration',
      date: '2024-03-01',
      category: 'Event',
      priority: 'High',
      isRead: false
    }
  ];

  const filteredMessages = messages.filter(msg => {
    if (selectedCategory !== 'All' && msg.category !== selectedCategory) return false;
    if (selectedStudent !== 'All' && msg.relatedStudent !== selectedStudent) return false;
    return true;
  });

  const filteredAnnouncements = announcements.filter(ann => {
    if (selectedCategory !== 'All' && ann.category !== selectedCategory) return false;
    return true;
  });

  const unreadMessages = messages.filter(m => !m.isRead).length;
  const unreadAnnouncements = announcements.filter(a => !a.isRead).length;
  const highPriorityMessages = messages.filter(m => m.priority === 'High' && !m.isRead).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Normal': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic': return 'bg-blue-100 text-blue-800';
      case 'Event': return 'bg-purple-100 text-purple-800';
      case 'Attendance': return 'bg-yellow-100 text-yellow-800';
      case 'Behavior': return 'bg-orange-100 text-orange-800';
      case 'Payment': return 'bg-green-100 text-green-800';
      case 'Emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const students = Array.from(new Set(messages.map(m => m.relatedStudent).filter(Boolean)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Communication</h1>
        <p className="text-gray-600 mt-2">Stay connected with teachers and school administration</p>
      </div>

      <DashboardGrid columns={3}>
        <StatCard
          title="Unread Messages"
          value={unreadMessages.toString()}
          color="blue"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
        />
        <StatCard
          title="Unread Announcements"
          value={unreadAnnouncements.toString()}
          color="purple"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>}
        />
        <StatCard
          title="High Priority"
          value={highPriorityMessages.toString()}
          color="red"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
        />
      </DashboardGrid>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'messages'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Messages ({unreadMessages})
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'announcements'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Announcements ({unreadAnnouncements})
        </button>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All</option>
                <option>General</option>
                <option>Academic</option>
                <option>Event</option>
                <option>Attendance</option>
                <option>Behavior</option>
                <option>Payment</option>
                <option>Emergency</option>
              </select>
            </div>
            {activeTab === 'messages' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Student</label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>All</option>
                  {students.map(student => (
                    <option key={student} value={student}>{student}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex items-end">
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => setShowComposeModal(true)}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Compose Message
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <Card
              key={message.id}
              className={`cursor-pointer hover:shadow-lg transition-shadow ${
                !message.isRead ? 'border-l-4 border-blue-500' : ''
              }`}
              onClick={() => setSelectedMessage(selectedMessage === message.id ? null : message.id)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`text-lg font-semibold ${!message.isRead ? 'text-charcoal-gray' : 'text-gray-600'}`}>
                        {message.subject}
                      </h3>
                      {!message.isRead && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span className="font-medium">{message.from}</span>
                      <span>•</span>
                      <span>{message.fromRole}</span>
                      {message.relatedStudent && (
                        <>
                          <span>•</span>
                          <span>{message.relatedStudent}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(message.category)}`}>
                        {message.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                        {message.priority} Priority
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500 ml-4">
                    <div>{message.date}</div>
                    <div>{message.time}</div>
                  </div>
                </div>

                {selectedMessage === message.id && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="bg-light-gray p-4 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => setShowReplyModal(message.id)}
                      >
                        Reply
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          alert(`Forwarding message: ${message.subject}`);
                        }}
                      >
                        Forward
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <Card
              key={announcement.id}
              className={`hover:shadow-lg transition-shadow ${
                !announcement.isRead ? 'border-l-4 border-purple-500' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`text-lg font-semibold ${!announcement.isRead ? 'text-charcoal-gray' : 'text-gray-600'}`}>
                        {announcement.title}
                      </h3>
                      {!announcement.isRead && (
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span>{announcement.author}</span>
                      <span>•</span>
                      <span>{announcement.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(announcement.category)}`}>
                        {announcement.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority} Priority
                      </span>
                    </div>
                    <p className="text-gray-700">{announcement.content}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {(activeTab === 'messages' && filteredMessages.length === 0) || 
       (activeTab === 'announcements' && filteredAnnouncements.length === 0) ? (
        <Card>
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No {activeTab} found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        </Card>
      ) : null}

      {/* Compose Message Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-charcoal-gray mb-4">Compose Message</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={composeData.to}
                  onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                >
                  <option value="">Select recipient...</option>
                  <option value="teacher">Teacher</option>
                  <option value="principal">Principal</option>
                  <option value="admin">Administration</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={composeData.subject}
                  onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                  placeholder="Enter subject..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={6}
                  value={composeData.message}
                  onChange={(e) => setComposeData({ ...composeData, message: e.target.value })}
                  placeholder="Enter your message..."
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setShowComposeModal(false);
                    setComposeData({ to: '', subject: '', message: '' });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    if (!composeData.to || !composeData.subject || !composeData.message) {
                      alert('Please fill in all fields');
                      return;
                    }
                    alert('Message sent successfully!');
                    setShowComposeModal(false);
                    setComposeData({ to: '', subject: '', message: '' });
                  }}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-charcoal-gray mb-4">Reply to Message</h3>
            {(() => {
              const message = messages.find(m => m.id === showReplyModal);
              return message ? (
                <>
                  <div className="mb-4 p-3 bg-light-gray rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">To: {message.from}</p>
                    <p className="text-sm text-gray-600 mb-1">Subject: Re: {message.subject}</p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={6}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Enter your reply..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setShowReplyModal(null);
                        setReplyText('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        if (!replyText.trim()) {
                          alert('Please enter your reply');
                          return;
                        }
                        alert('Reply sent successfully!');
                        setShowReplyModal(null);
                        setReplyText('');
                      }}
                    >
                      Send Reply
                    </Button>
                  </div>
                </>
              ) : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
