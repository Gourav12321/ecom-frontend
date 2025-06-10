// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const Config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-com-ff1ce.firebaseapp.com",
  projectId: "e-com-ff1ce",
  storageBucket: "e-com-ff1ce.appspot.com",
  messagingSenderId: "363045410605",
  appId: "1:363045410605:web:2157e3140698b484e1e5a4",
};

// Initialize
export const app = initializeApp(Config);
export const storage = getStorage(app);
