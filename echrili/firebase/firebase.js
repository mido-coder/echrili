// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBWChQnD3yxwbNfwVD_HQCL0m8VfGH505M",
  authDomain: "echrili-94cda.firebaseapp.com",
  projectId: "echrili-94cda",
  storageBucket: "echrili-94cda.appspot.com",
  messagingSenderId: "235892930902",
  appId: "1:235892930902:web:555ebf1c19037ff12f3ef7",
  measurementId: "G-N72Q8XR1BE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
