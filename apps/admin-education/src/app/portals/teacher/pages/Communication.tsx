import { useState } from 'react';

interface Message {
  id: number;
  from: string;
  fromType: 'parent' | 'student' | 'admin';
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export default function Communication() {
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: 'Mrs. Johnson (Parent)', fromType: 'parent', subject: 'Question about homework', message: 'Hello, I wanted to ask about the homework assignment...', date: '2025-03-08', read: false },
    { id: 2, from: 'Emma Davis (Student)', fromType: 'student', subject: 'Absent tomorrow', message: 'Hi Mr. Smith, I will be absent tomorrow due to a doctor appointment...', date: '2025-03-07', read: false },
    { id: 3, from: 'Principal Johnson (Admin)', fromType: 'admin', subject: 'Faculty Meeting Reminder', message: 'Reminder: Faculty meeting tomorrow at 3:00 PM...', date: '2025-03-06', read: true },
    { id: 4, from: 'Mr. Brown (Parent)', fromType: 'parent', subject: 'Parent-Teacher Conference', message: 'Thank you for taking the time to discuss Michael progress...', date: '2025-03-05', read: true },
  ]);

  const [newMessage, setNewMessage] = useState({
    to: '',
    subject: '',
    message: '',
  });

  const unreadCount = messages.filter(m => !m.read).length;

  const sendMessage = () => {
    alert('Message sent successfully!');
    setShowNewMessageModal(false);
    setNewMessage({ to: '', subject: '', message: '' });
  };

  const viewMessage = (message: Message) => {
    setSelectedMessage(message);
    setMessages(messages.map(m => m.id === message.id ? { ...m, read: true } : m));
  };

  const handleReply = () => {
    setShowReplyModal(true);
  };

  const sendReply = () => {
    alert(`Reply sent to ${selectedMessage?.from}`);
    setShowReplyModal(false);
    setSelectedMessage(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communication</h1>
          <p className="text-gray-600 mt-2">Messages from parents, students, and administration</p>
        </div>
        <div className="flex items-center space-x-3">
          {unreadCount > 0 && (
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">
              {unreadCount} Unread
            </span>
          )}
          <button 
            onClick={() => setShowNewMessageModal(true)}
            className="px-6 py-3 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Message</span>
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${!message.read ? 'bg-blue-50' : ''}`}
            onClick={() => viewMessage(message)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold ${
                  message.fromType === 'parent' ? 'bg-blue-600' :
                  message.fromType === 'student' ? 'bg-green-600' :
                  'bg-purple-600'
                }`}>
                  {message.from.split(' ')[0][0]}{message.from.split(' ')[1]?.[0] || ''}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{message.from}</p>
                    <p className="text-sm text-gray-500">{message.date}</p>
                  </div>
                  <p className="font-medium text-gray-900 mt-1">{message.subject}</p>
                  <p className="text-sm text-gray-600 mt-1 truncate">{message.message}</p>
                </div>
              </div>
              {!message.read && (
                <span className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0 ml-4"></span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Message Modal */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">New Message</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To *</label>
                <select
                  value={newMessage.to}
                  onChange={(e) => setNewMessage({...newMessage, to: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                >
                  <option value="">Select recipient...</option>
                  <optgroup label="Parents">
                    <option value="Mrs. Johnson">Mrs. Johnson (Alex's parent)</option>
                    <option value="Mr. Brown">Mr. Brown (Michael's parent)</option>
                  </optgroup>
                  <optgroup label="Students">
                    <option value="Alex Johnson">Alex Johnson</option>
                    <option value="Emma Davis">Emma Davis</option>
                  </optgroup>
                  <optgroup label="Administration">
                    <option value="Principal Johnson">Principal Johnson</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  value={newMessage.message}
                  onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button onClick={() => setShowNewMessageModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={sendMessage} className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">Send Message</button>
            </div>
          </div>
        </div>
      )}

      {/* View Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{selectedMessage.subject}</h2>
              <p className="text-sm text-gray-600 mt-1">From: {selectedMessage.from} • {selectedMessage.date}</p>
            </div>
            <div className="p-6">
              <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button onClick={() => setSelectedMessage(null)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Close</button>
              <button onClick={handleReply} className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">Reply</button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Reply to: {selectedMessage.from}</h2>
              <p className="text-sm text-gray-600 mt-1">Re: {selectedMessage.subject}</p>
            </div>
            <div className="p-6">
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                <p className="text-sm text-gray-600 font-medium mb-2">Original Message:</p>
                <p className="text-sm text-gray-900">{selectedMessage.message}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply *</label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={6}
                  placeholder="Type your reply here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button onClick={() => { setShowReplyModal(false); setReplyText(''); }} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={sendReply} className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">Send Reply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

