
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Email, User } from '../types';
import { categorizeAndSummarizeEmail } from '../services/geminiService';
import EmailCard from './EmailCard';

interface DashboardComponentProps {
    user: User;
    initialEmails: Email[];
    onLogout: () => void;
}

const DashboardComponent: React.FC<DashboardComponentProps> = ({ user, initialEmails, onLogout }) => {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);

  useEffect(() => {
    setEmails(initialEmails);
  }, [initialEmails]);

  const startFiltering = useCallback(async () => {
    setIsProcessing(true);
    setProcessedCount(0);
    const emailsToProcess = emails.filter(e => !e.label);

    for (let i = 0; i < emailsToProcess.length; i++) {
        const email = emailsToProcess[i];
        const result = await categorizeAndSummarizeEmail(email);
        if (result) {
            setEmails(prevEmails => 
                prevEmails.map(e => 
                    e.id === email.id ? { ...e, label: result.label, summary: result.summary } : e
                )
            );
        }
        setProcessedCount(prev => prev + 1);
    }
    
    setIsProcessing(false);
  }, [emails]);

  const hasUnprocessedEmails = useMemo(() => emails.some(e => !e.label), [emails]);
  const labeledCount = useMemo(() => emails.filter(e => e.label).length, [emails]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="w-full">
            <div className="flex items-center gap-4">
                 <h1 className="text-3xl font-bold text-white">Inbox</h1>
                 <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-700 text-gray-300">
                    {labeledCount} / {emails.length} Labeled
                </span>
            </div>
          <p className="text-gray-400 mt-1">AI-Powered Email Dashboard</p>
        </div>

        <div className="flex w-full sm:w-auto items-center justify-end gap-4 flex-shrink-0">
            <div className="text-right">
                <p className="font-semibold text-white">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
            </div>
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-blue-300 border border-blue-500/30">
                {user.name.charAt(0)}
            </div>
             <button onClick={onLogout} className="p-2 rounded-md hover:bg-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
             </button>
        </div>
      </header>
      
      <div className="mb-8">
       <button
          onClick={startFiltering}
          disabled={isProcessing || !hasUnprocessedEmails}
          className="w-full flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing... ({processedCount}/{emails.filter(e => !e.label).length})
            </>
          ) : (
            'Start Automated Filtering'
          )}
        </button>
      </div>

      <div className="space-y-4">
        {emails.map(email => (
          <EmailCard key={email.id} email={email} />
        ))}
      </div>
    </div>
  );
};

export default DashboardComponent;
