// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDabWKsrv7DT8OX9e5BNB0vb2a_bBPW0Hw",
  authDomain: "signtrackerpro-d3439.firebaseapp.com",
  projectId: "signtrackerpro-d3439",
  storageBucket: "signtrackerpro-d3439.appspot.com",
  messagingSenderId: "1052941343396",
  appId: "1:1052941343396:web:2dadbfc348ff3cdc766431",
  measurementId: "G-V0NGZBP33E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { db, storage };
