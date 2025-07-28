'use client';

import { Send, X, Minimize2 } from 'lucide-react';
import { useState } from 'react';

interface ChatPanelProps {
  onClose: () => void;
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
  const [message, setMessage] = useState('');

  const chatMessages = [
    {
      id: 1,
      type: 'received',
      content: 'Hello! How can I help you with your analysis today?',
      timestamp: '2:14 PM',
      sender: 'AI Assistant'
    },
    {
      id: 2,
      type: 'sent',
      content: 'Can you help me understand the credit rating for Tesla?',
      timestamp: '2:15 PM',
    },
    {
      id: 3,
      type: 'received',
      content: 'I can help you with Tesla\'s credit analysis. Tesla currently has a B1 rating from Moody\'s. Would you like me to provide more details about the rating rationale?',
      timestamp: '2:15 PM',
      sender: 'AI Assistant'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <div className="h-full bg-white border-l border-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">AI Assistant</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.type === 'sent' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-100 text-slate-900'
            }`}>
              {msg.sender && (
                <p className="text-xs font-medium mb-1 opacity-70">{msg.sender}</p>
              )}
              <p className="text-sm">{msg.content}</p>
              <p className={`text-xs mt-1 ${
                msg.type === 'sent' ? 'text-blue-100' : 'text-slate-500'
              }`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything about companies, ratings, or analysis..."
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 