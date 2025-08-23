import React, { useState } from 'react';
import { GraduationCap, BookOpen, Brain } from 'lucide-react';

const GradeSelector = ({ onGradeSubjectSelect }) => {
  const [selectedGrade, setSelectedGrade] = useState(null);

  const grades = [
    {
      id: 'class-10',
      name: 'Class 10',
      subjects: [
        { id: 'science', name: 'Science', icon: '🔬', color: 'from-blue-500 to-cyan-500' },
        { id: 'mathematics', name: 'Mathematics', icon: '📐', color: 'from-green-500 to-emerald-500' },
        { id: 'social-studies', name: 'Social Studies', icon: '🌍', color: 'from-purple-500 to-pink-500' },
        { id: 'english', name: 'English', icon: '📚', color: 'from-orange-500 to-red-500' }
      ]
    },
    {
      id: 'class-11',
      name: 'Class 11',
      subjects: [
        { id: 'physics', name: 'Physics', icon: '⚡', color: 'from-indigo-500 to-purple-500' },
        { id: 'chemistry', name: 'Chemistry', icon: '🧪', color: 'from-blue-500 to-cyan-500' },
        { id: 'biology', name: 'Biology', icon: '🧬', color: 'from-green-500 to-emerald-500' },
        { id: 'mathematics', name: 'Mathematics', icon: '📐', color: 'from-yellow-500 to-orange-500' },
        { id: 'computer-science', name: 'Computer Science', icon: '💻', color: 'from-gray-500 to-slate-500' }
      ]
    },
    {
      id: 'class-12',
      name: 'Class 12',
      subjects: [
        { id: 'physics', name: 'Physics', icon: '⚡', color: 'from-indigo-500 to-purple-500' },
        { id: 'chemistry', name: 'Chemistry', icon: '🧪', color: 'from-blue-500 to-cyan-500' },
        { id: 'biology', name: 'Biology', icon: '🧬', color: 'from-green-500 to-emerald-500' },
        { id: 'mathematics', name: 'Mathematics', icon: '📐', color: 'from-yellow-500 to-orange-500' },
        { id: 'computer-science', name: 'Computer Science', icon: '💻', color: 'from-gray-500 to-slate-500' }
      ]
    }
  ];

  const handleSubjectSelect = (subject) => {
    onGradeSubjectSelect(selectedGrade.name, subject.name);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full">
            <Brain className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to MeroGuru
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your personalized AI tutor. Select your grade and subject to get started with intelligent, 
          context-aware learning assistance.
        </p>
      </div>

      {/* Grade Selection */}
      {!selectedGrade ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {grades.map((grade) => (
            <div
              key={grade.id}
              onClick={() => setSelectedGrade(grade)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{grade.name}</h2>
                <p className="text-gray-600 mb-6">
                  Advanced curriculum with comprehensive subject coverage
                </p>
                <div className="text-sm text-indigo-600 font-medium">
                  Click to select subjects →
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Subject Selection */
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <button
              onClick={() => setSelectedGrade(null)}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-4 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Grades
            </button>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Select Your Subject
            </h2>
            <p className="text-lg text-gray-600">
              Choose a subject to start learning with {selectedGrade.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedGrade.subjects.map((subject) => (
              <div
                key={subject.id}
                onClick={() => handleSubjectSelect(subject)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className={`bg-gradient-to-br ${subject.color} rounded-2xl shadow-lg p-6 text-center text-white hover:shadow-2xl transition-all duration-300`}>
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {subject.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                  <p className="text-white/80 text-sm">
                    Start learning with AI assistance
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <BookOpen className="h-6 w-6 mx-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeSelector;
