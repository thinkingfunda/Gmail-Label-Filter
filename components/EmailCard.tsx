
import React from 'react';
import { Email, Label } from '../types';
import { LABEL_COLORS } from '../constants';

interface EmailCardProps {
  email: Email;
}

const LabelBadge: React.FC<{ label: Label }> = ({ label }) => (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${LABEL_COLORS[label]}`}>
        {label}
    </span>
);

const LoadingSkeleton: React.FC = () => (
    <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-3 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
            </div>
        </div>
    </div>
);


const EmailCard: React.FC<EmailCardProps> = ({ email }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-5 transition-all duration-300 hover:border-gray-600 hover:bg-gray-800/80">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-gray-400 mr-4">
                {email.sender.charAt(0)}
            </div>
            <div>
                <p className="font-semibold text-white">{email.sender}</p>
                <p className="text-sm text-gray-400">{email.subject}</p>
            </div>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
            {email.label ? (
                 <LabelBadge label={email.label} />
            ) : (
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-600/50 text-gray-400 border border-gray-500/30">
                    Uncategorized
                </span>
            )}
             <p className="text-xs text-gray-500 mt-2">{email.timestamp}</p>
        </div>
      </div>
      
      <div className="pl-14">
        {email.summary ? (
            <p className="text-sm text-gray-300 italic">
                <span className="font-bold text-blue-400 not-italic">AI Summary:</span> {email.summary}
            </p>
        ) : (
             <LoadingSkeleton />
        )}
      </div>
    </div>
  );
};

export default EmailCard;
