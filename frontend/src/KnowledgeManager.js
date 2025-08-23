import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import axios from 'axios';
import MarkdownRenderer from './MarkdownRenderer';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const KnowledgeManager = () => {
  const [entries, setEntries] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content_markdown: '',
    question: '',
    answer_markdown: '',
    subject: 'Mathematics',
    grade_level: 'High School',
    difficulty: 'Medium',
    category: 'Concept',
    tags: '',
    priority: 1
  });

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/knowledge`);
      setEntries(response.data || []);
    } catch (error) {
      console.error('Error loading knowledge base:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Convert tags string to array
      const entryData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      };
      
      if (editingId) {
        await axios.put(`${API_BASE_URL}/knowledge/${editingId}`, entryData);
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE_URL}/knowledge`, entryData);
      }
      
      setFormData({ title: '', content: '', question: '', answer: '', category: 'general', tags: '', priority: 1 });
      setIsAdding(false);
      loadEntries();
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setFormData({
      title: entry.title,
      content: entry.content,
      question: entry.question || '',
      answer: entry.answer || '',
      category: entry.category || 'general',
      tags: Array.isArray(entry.tags) ? entry.tags.join(', ') : (entry.tags || ''),
      priority: entry.priority || 1
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await axios.delete(`${API_BASE_URL}/knowledge/${id}`);
        loadEntries();
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', content: '', category: 'general' });
    setIsAdding(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Knowledge Base Manager</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={16} />
          Add Entry
        </button>
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Entry' : 'Add New Entry'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="English">English</option>
                  <option value="Geography">Geography</option>
                  <option value="Literature">Literature</option>
                  <option value="Study Skills">Study Skills</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade Level
                </label>
                <select
                  value={formData.grade_level}
                  onChange={(e) => setFormData({ ...formData, grade_level: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Elementary">Elementary</option>
                  <option value="Middle School">Middle School</option>
                  <option value="High School">High School</option>
                  <option value="College">College</option>
                  <option value="All Levels">All Levels</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Concept">Concept</option>
                  <option value="Example">Example</option>
                  <option value="Practice">Practice</option>
                  <option value="Review">Review</option>
                  <option value="Tips">Tips</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What is the user asking?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Answer
              </label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="The answer to the question"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content (Markdown Format)
              </label>
              <textarea
                value={formData.content_markdown}
                onChange={(e) => setFormData({ ...formData, content_markdown: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="# Title&#10;&#10;**Bold text**&#10;&#10;- List item 1&#10;- List item 2&#10;&#10;`code` or ```code block```"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use markdown: **bold**, *italic*, # headers, - lists, `code`, ```blocks```
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Answer (Markdown Format)
              </label>
              <textarea
                value={formData.answer_markdown}
                onChange={(e) => setFormData({ ...formData, answer_markdown: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="## Step-by-Step Solution&#10;&#10;**Step 1**: First step&#10;**Step 2**: Second step&#10;&#10;`Final Answer: x = 5`"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="password, reset, account, security"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>Low</option>
                  <option value={2}>Medium</option>
                  <option value={3}>High</option>
                  <option value={4}>Critical</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Save size={16} />
                {editingId ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Entries List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Knowledge Base Entries</h2>
        </div>
        
        {entries.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No knowledge base entries yet. Add your first entry above!
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {entries.map((entry) => (
              <div key={entry.id} className="p-6">
                <div className="flex justify-between items-start mb-3">
                                  <div>
                  <h3 className="text-lg font-medium text-gray-800">{entry.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {entry.category}
                    </span>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Priority {entry.priority}
                    </span>
                  </div>
                </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                {entry.question && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Question:</p>
                    <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{entry.question}</p>
                  </div>
                )}
                
                {entry.answer_markdown && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Answer:</p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <MarkdownRenderer content={entry.answer_markdown} />
                    </div>
                  </div>
                )}
                
                {entry.content_markdown && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Content:</p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <MarkdownRenderer content={entry.content_markdown} />
                    </div>
                  </div>
                )}
                
                {entry.tags && entry.tags.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Tags:</p>
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-3">
                  Created: {new Date(entry.created_at).toLocaleDateString()}
                  {entry.updated_at !== entry.created_at && 
                    ` • Updated: ${new Date(entry.updated_at).toLocaleDateString()}`
                  }
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeManager;
