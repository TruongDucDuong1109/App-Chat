import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getDatabase} from "firebase/database";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyDJEhWfqE6naRjjAPQj55wGXFjUPcJLOb8",
  authDomain: "chatapp-5fd40.firebaseapp.com",
  databaseURL: "https://chatapp-5fd40-default-rtdb.firebaseio.com",
  projectId: "chatapp-5fd40",
  storageBucket: "chatapp-5fd40.appspot.com",
  messagingSenderId: "88363742306",
  appId: "1:88363742306:web:f6c2873ff520f13b0b4d3b",
  measurementId: "G-88GLM01R59",
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export { auth };
export const database = getFirestore();
export { db };