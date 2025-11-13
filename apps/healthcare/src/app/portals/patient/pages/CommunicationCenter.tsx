import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../shared/Modal';
import { useToast, ToastContainer } from '../../shared/Toast';

interface Message {
  id: number;
  to: string;
  subject: string;
  message: string;
  date: string;
  status: 'Sent' | 'Draft';
  reply?: string;
}

interface IncomingMessage {
  id: number;
  from: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export default function CommunicationCenter() {
  const { toasts, showToast, removeToast } = useToast();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageType, setMessageType] = useState<'message' | 'question' | 'refill'>('message');
  const [formData, setFormData] = useState<any>({});

  const [outgoingMessages, setOutgoingMessages] = useState<Message[]>([
    { id: 1, to: 'Dr. Sarah Johnson', subject: 'Question about medication', message: 'I have a question about my Lisinopril dosage...', date: '2025-01-19', status: 'Sent' },
  ]);

  const [incomingMessages, setIncomingMessages] = useState<IncomingMessage[]>([
    { id: 1, from: 'Dr. Sarah Johnson', subject: 'Re: Question about medication', message: 'Your current dosage is appropriate. Continue as prescribed.', date: '2025-01-20', read: false },
    { id: 2, from: 'Lab', subject: 'Test Results Available', message: 'Your lab results from January 15 are now available.', date: '2025-01-16', read: true },
  ]);

  const handleSendMessage = (type: 'message' | 'question' | 'refill') => {
    setMessageType(type);
    setFormData({
      to: type === 'refill' ? 'Pharmacy' : 'Dr. Sarah Johnson',
      subject: type === 'refill' ? 'Prescription Refill Request' : '',
      message: '',
    });
    setShowMessageModal(true);
  };

  const handleSaveMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const { to, subject, message } = formData;
    
    if (!to || !subject || !message) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      to,
      subject,
      message,
      date: new Date().toISOString().split('T')[0],
      status: 'Sent',
    };

    setOutgoingMessages([...outgoingMessages, newMessage]);
    
    if (messageType === 'refill') {
      showToast('Prescription refill request sent to pharmacy', 'success');
    } else {
      showToast(`Message sent to ${to}`, 'success');
    }
    
    setShowMessageModal(false);
    setFormData({});
  };

  const handleMarkAsRead = (message: IncomingMessage) => {
    setIncomingMessages(incomingMessages.map(m => 
      m.id === message.id ? { ...m, read: true } : m
    ));
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Communication Center</h1>
        <p className="text-gray-600 mt-2">Secure messaging with providers, health question submissions, prescription renewal requests, test result notifications</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Button onClick={() => handleSendMessage('message')} className="h-20 flex flex-col items-center justify-center">
          <span className="text-2xl mb-2">💬</span>
          <span>Message Provider</span>
        </Button>
        <Button onClick={() => handleSendMessage('question')} variant="secondary" className="h-20 flex flex-col items-center justify-center">
          <span className="text-2xl mb-2">❓</span>
          <span>Ask Question</span>
        </Button>
        <Button onClick={() => handleSendMessage('refill')} variant="outline" className="h-20 flex flex-col items-center justify-center">
          <span className="text-2xl mb-2">💊</span>
          <span>Request Refill</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incoming Messages */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">
            Incoming Messages ({incomingMessages.filter(m => !m.read).length} unread)
          </h2>
          <div className="space-y-4">
            {incomingMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`p-4 border rounded-lg cursor-pointer ${msg.read ? 'border-gray-200 bg-white' : 'border-blue-300 bg-blue-50'}`}
                onClick={() => handleMarkAsRead(msg)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-gray-900">{msg.from}</div>
                    <div className="text-sm font-medium text-gray-700 mt-1">{msg.subject}</div>
                    <div className="text-sm text-gray-600 mt-2 line-clamp-2">{msg.message}</div>
                    <div className="text-xs text-gray-500 mt-2">{msg.date}</div>
                  </div>
                  {!msg.read && (
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">New</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Outgoing Messages */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Sent Messages</h2>
          <div className="space-y-4">
            {outgoingMessages.map((msg) => (
              <div key={msg.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="font-semibold text-gray-900">To: {msg.to}</div>
                <div className="text-sm font-medium text-gray-700 mt-1">{msg.subject}</div>
                <div className="text-sm text-gray-600 mt-2 line-clamp-2">{msg.message}</div>
                <div className="text-xs text-gray-500 mt-2">{msg.date}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Send Message Modal */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => {
          setShowMessageModal(false);
          setFormData({});
        }}
        title={
          messageType === 'refill' ? 'Request Prescription Refill' :
          messageType === 'question' ? 'Ask Health Question' :
          'Send Message'
        }
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowMessageModal(false);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Send Message</Button>
          </div>
        }
      >
        <form onSubmit={handleSaveMessage} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To *</label>
            <select
              required
              value={formData.to || ''}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select Recipient</option>
              <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
              <option value="Dr. Michael Chen">Dr. Michael Chen</option>
              <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Nurse">Nurse</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
            <input
              type="text"
              required
              value={formData.subject || ''}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder={messageType === 'refill' ? 'Prescription Refill Request' : 'Enter subject'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
            <textarea
              required
              value={formData.message || ''}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              rows={6}
              placeholder={
                messageType === 'refill' 
                  ? 'Please refill my prescription for...' 
                  : messageType === 'question'
                  ? 'I have a question about...'
                  : 'Enter your message...'
              }
            />
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Secure Messaging:</strong> All messages are encrypted and secure. Your provider will respond within 24-48 hours.
            </p>
          </div>
        </form>
      </Modal>
    </div>
  );
}
