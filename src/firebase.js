import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyABbV7cLjvgcLk81Iftd_65Ijzu9eX6-Nc",
  authDomain: "house-finder-db93c.firebaseapp.com",
  projectId: "house-finder-db93c",
  storageBucket: "house-finder-db93c.appspot.com",
  messagingSenderId: "504843167098",
  appId: "1:504843167098:web:e6601f8b6485ac821da2c3",
};

initializeApp(firebaseConfig);
export const db = getFirestore();
