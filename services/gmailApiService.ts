
import { MOCK_EMAILS, MOCK_USER } from '../constants';
import { Email, User } from '../types';

// This is a mock service to simulate fetching data from the Gmail API.
// In a real application, you would use the Google API client library (gapi)
// to perform OAuth and make authenticated requests.

export const fetchUser = (): Promise<User> => {
    console.log("Simulating fetching user...");
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("User fetched.");
            resolve(MOCK_USER);
        }, 800);
    });
};

export const fetchEmails = (): Promise<Email[]> => {
    console.log("Simulating fetching emails...");
    // Resetting mock emails to their initial, uncategorized state for every "fetch"
    const initialEmails = MOCK_EMAILS.map(email => ({
        ...email,
        label: null,
        summary: null,
    }));
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Emails fetched.");
            resolve(initialEmails);
        }, 1500);
    });
};
