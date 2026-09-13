import { getApps, initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWe6K5kiDCc78R9nm5JrhJ5ncdL2xa8qc",
  authDomain: "get-mechanic-c12c6.firebaseapp.com",
  projectId: "get-mechanic-c12c6",
  storageBucket: "get-mechanic-c12c6.appspot.com",
  messagingSenderId: "903480734455",
  appId: "1:903480734455:web:2576a16441b04d75e719f2",
  measurementId: "G-MVMY9HN199",
};

// Initialize Firebase app only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Auth with persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  // If already initialized, use existing instance
  auth = getAuth(app);
}

export { auth };
export default app;











