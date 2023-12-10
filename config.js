// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyDtoAjJewFJS2B0QAbkoCpQGoEpjswXIDo",
//   authDomain: "crafty-sound-388606.firebaseapp.com",
//   projectId: "crafty-sound-388606",
//   storageBucket: "crafty-sound-388606.appspot.com",
//   messagingSenderId: "483597041035",
//   appId: "1:483597041035:web:2e6ed4db286759a23e838e",
//   measurementId: "G-EN5YZ8LPQG"
// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
// export { auth };
// export const database = getFirestore();
// export { db };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { collection, getFirestore, persistentLocalCache } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDtoAjJewFJS2B0QAbkoCpQGoEpjswXIDo",
  authDomain: "crafty-sound-388606.firebaseapp.com",
  projectId: "crafty-sound-388606",
  storageBucket: "crafty-sound-388606.appspot.com",
  messagingSenderId: "483597041035",
  appId: "1:483597041035:web:2e6ed4db286759a23e838e",
  measurementId: "G-EN5YZ8LPQG",
  persistentLocalCache: true,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
export const database = getFirestore(app);
export const trip = collection(database, 'trip');
export const tripRequest = collection(database, 'tripRequest');
const analytics = getAnalytics(app);

export default app;
