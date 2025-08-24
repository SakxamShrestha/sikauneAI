import React, { useState, useEffect } from 'react';
import { MessageCircle, BookOpen, Brain } from 'lucide-react';
import ChatInterface from './ChatInterface';
import GradeSelector from './GradeSelector';
import { auth, signInWithGoogle, signOutUser } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [currentView, setCurrentView] = useState('grade-selector'); // 'grade-selector' or 'chat'
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGradeSubjectSelect = (grade, subject) => {
    setSelectedGrade(grade);
    setSelectedSubject(subject);
    setCurrentView('chat');
  };

  const handleBackToGrades = () => {
    setCurrentView('grade-selector');
    setSelectedGrade(null);
    setSelectedSubject(null);
  };

  // Google Sign In
  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      // User will be set automatically by the auth state listener
    } catch (error) {
      console.error('Sign in error:', error);
      setIsLoading(false);
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    try {
      await signOutUser();
      // User will be cleared automatically by the auth state listener
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setCurrentView('grade-selector');
                  setSelectedGrade(null);
                  setSelectedSubject(null);
                }}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
              >
                {/* Replace this src with your actual logo file path */}
                <img 
                  src="/logo.png" 
                  alt="MeroGuru Logo" 
                  className="logo-image"
                  onError={(e) => {
                    // Fallback to Brain icon if logo fails to load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <Brain className="h-8 w-8 text-indigo-600" style={{display: 'none'}} />
                <h1 className="text-2xl font-bold text-gray-900">MeroGuru</h1>
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              {currentView === 'chat' && (
                <>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{selectedGrade}</span>
                    <span className="mx-2">•</span>
                    <span className="font-medium">{selectedSubject}</span>
                  </div>
                  <button
                    onClick={handleBackToGrades}
                    className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    Change Grade/Subject
                  </button>
                </>
              )}
              
              {/* Profile Section */}
              <div className="flex items-center space-x-3">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <img 
                      src={user.photoURL || '/default-avatar.png'} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full border-2 border-gray-200"
                    />
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{user.displayName}</p>
                      <p className="text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-700 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSignIn}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      {isLoading ? 'Signing in...' : 'Sign in with Google'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'grade-selector' ? (
          <GradeSelector onGradeSubjectSelect={handleGradeSubjectSelect} />
        ) : (
          <ChatInterface 
            selectedGrade={selectedGrade}
            selectedSubject={selectedSubject}
          />
        )}
      </main>
    </div>
  );
}

export default App;