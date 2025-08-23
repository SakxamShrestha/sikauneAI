import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, Trash2, Plus } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const App = () => {
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showThreads, setShowThreads] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadThreads();
  }, []);

  const loadThreads = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/threads`);
      setThreads(response.data || []);
    } catch (error) {
      console.error('Error loading threads:', error);
    }
  };

  const loadMessages = async (threadId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/threads/${threadId}`);
      setMessages(response.data || []);
      setCurrentThread(threadId);
      setShowThreads(false);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    const newMessage = {
      sender: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);

    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message: userMessage,
        thread_id: currentThread
      });

      const aiMessage = {
        sender: 'assistant',
        content: response.data.response,
        sources: response.data.sources || [],
        timestamp: response.data.timestamp
      };
      setMessages(prev => [...prev, aiMessage]);

      if (!currentThread) {
        setCurrentThread(response.data.thread_id);
      }

      loadThreads();
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        sender: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewThread = () => {
    setCurrentThread(null);
    setMessages([]);
    setShowThreads(false);
  };

  const deleteThread = async (threadId) => {
    try {
      await axios.delete(`${API_BASE_URL}/threads/${threadId}`);
      loadThreads();
      if (currentThread === threadId) {
        setCurrentThread(null);
        setMessages([]);
        setShowThreads(true);
      }
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${showThreads ? 'w-80' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className={`font-semibold text-gray-800 ${!showThreads ? 'hidden' : ''}`}>
              Conversations
            </h2>
            <button
              onClick={() => setShowThreads(!showThreads)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <MessageSquare size={20} />
            </button>
          </div>
          <button
            onClick={startNewThread}
            className={`mt-3 w-full flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${!showThreads ? 'justify-center' : ''}`}
          >
            <Plus size={16} />
            {showThreads && <span>New Chat</span>}
          </button>
        </div>

        {showThreads && (
          <div className="flex-1 overflow-y-auto p-4">
            {threads.length === 0 ? (
              <p className="text-gray-500 text-sm">No conversations yet</p>
            ) : (
              <div className="space-y-2">
                {threads.map((thread) => (
                  <div
                    key={thread.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      currentThread === thread.id
                        ? 'bg-blue-100 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div
                      onClick={() => loadMessages(thread.id)}
                      className="flex-1"
                    >
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">
                        {thread.title || thread.last_message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTimestamp(thread.updated_at)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteThread(thread.id);
                      }}
                      className="p-1 hover:bg-red-100 rounded mt-2"
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-xl font-semibold text-gray-800">
            AI Assistant with Knowledge Base
          </h1>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Start a conversation with your AI assistant</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl rounded-lg p-4 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-600 mb-2">Sources:</p>
                      {message.sources.map((source, idx) => (
                        <div key={idx} className="text-xs text-gray-500 mb-1">
                          <span className="font-medium">{source.title}</span>
                          <p className="mt-1">{source.excerpt}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs mt-2 opacity-70">
                    {formatTimestamp(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-3xl">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;