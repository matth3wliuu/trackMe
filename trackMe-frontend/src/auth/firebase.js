
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID                                                         
// }

const firebaseConfig = {
    apiKey: "AIzaSyDK6Z_y-qxeYXbIcfNhG6NVTErDpQBOTDU",
    authDomain: "trackme-development.firebaseapp.com",
    projectId: "trackme-development",
    storageBucket: "trackme-development.appspot.com",
    messagingSenderId: "147444602780",
    appId: "1:147444602780:web:a46fd5bf5ea5cc10729a59"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export default app;