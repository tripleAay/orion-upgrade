// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTkXjNDPdbOeo32CaCkglIy-6nzuszEJM",
  authDomain: "orion-investment-2b141.firebaseapp.com",
  projectId: "orion-investment-2b141",
  storageBucket: "orion-investment-2b141.appspot.com",
  messagingSenderId: "911866094162",
  appId: "1:911866094162:web:bfe2dc2323995f4585358b",
  measurementId: "G-12SQKBDR1S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize individual services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export for use in components
export { app, auth, db, storage };
