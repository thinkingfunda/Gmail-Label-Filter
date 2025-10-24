
import React, { useState } from 'react';
import LoginComponent from './components/LoginComponent';
import DashboardComponent from './components/DashboardComponent';
import { User, Email } from './types';
import { fetchEmails, fetchUser } from './services/gmailApiService';

const FullScreenLoader: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <svg className="animate-spin h-10 w-10 text-blue-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-300 text-lg">{message}</p>
    </div>
);


const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [emails, setEmails] = useState<Email[]>([]);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = async () => {
    setIsAuthenticating(true);
    try {
        // In a real app, this would involve an OAuth flow.
        // Here, we simulate fetching user info and emails.
        const fetchedUser = await fetchUser();
        const fetchedEmails = await fetchEmails();
        setUser(fetchedUser);
        setEmails(fetchedEmails);
    } catch (error) {
        console.error("Failed to login and fetch data:", error);
    } finally {
        setIsAuthenticating(false);
    }
  };
  
  const handleLogout = () => {
    setUser(null);
    setEmails([]);
  };

  if (isAuthenticating) {
      return <FullScreenLoader message="Connecting to your Google Account..." />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {user ? (
        <DashboardComponent user={user} initialEmails={emails} onLogout={handleLogout} />
      ) : (
        <LoginComponent onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
