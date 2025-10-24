
import { Email, Label, User } from './types';

export const MOCK_USER: User = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
};

export const MOCK_EMAILS: Email[] = [
  {
    id: '1',
    sender: 'GitHub',
    subject: 'Your weekly digest',
    body: 'A lot has happened on GitHub this week. New feature updates in Actions, security alerts for your repositories, and trending projects you might like. Check out what is new.',
    label: null,
    summary: null,
    timestamp: '9:30 AM'
  },
  {
    id: '2',
    sender: 'Vercel',
    subject: 'Deployment Notification: project-zeta successful',
    body: 'Your project "project-zeta" has been successfully deployed. You can view the deployment at project-zeta.vercel.app. The build completed in 45 seconds.',
    label: null,
    summary: null,
    timestamp: '9:25 AM'
  },
  {
    id: '3',
    sender: 'LinkedIn',
    subject: 'John Doe viewed your profile',
    body: 'See who is viewing your profile and how you are connected. John Doe, a recruiter at Tech Solutions Inc., recently viewed your profile. Connect with them today!',
    label: null,
    summary: null,
    timestamp: '8:55 AM'
  },
  {
    id: '4',
    sender: 'Amazon Deals',
    subject: 'Flash Sale: Up to 70% off on electronics!',
    body: 'Limited time offer! Get amazing discounts on laptops, smartphones, and more. Our flash sale ends in 24 hours. Shop now before the best deals are gone.',
    label: null,
    summary: null,
    timestamp: 'Yesterday'
  },
  {
    id: '5',
    sender: 'Asana',
    subject: 'Task "Finalize Q3 Report" is due tomorrow',
    body: 'A friendly reminder that your task to finalize the Q3 financial report is due tomorrow. Please update the status once completed. You can view the task details in the "Finance" project board.',
    label: null,
    summary: null,
    timestamp: 'Yesterday'
  },
  {
    id: '6',
    sender: 'Twitter',
    subject: 'You have new notifications',
    body: 'Your tweet about React state management is getting a lot of attention. You have 15 new likes and 5 retweets. See what people are saying.',
    label: null,
    summary: null,
    timestamp: '2 days ago'
  },
];

export const LABEL_COLORS: Record<Label, string> = {
    [Label.IMPORTANT]: 'bg-red-500/20 text-red-300 border border-red-500/30',
    [Label.PROMOTIONS]: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    [Label.SOCIAL]: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    [Label.UPDATES]: 'bg-green-500/20 text-green-300 border border-green-500/30',
    [Label.WORK]: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    [Label.SPAM]: 'bg-gray-500/20 text-gray-300 border border-gray-500/30',
};
