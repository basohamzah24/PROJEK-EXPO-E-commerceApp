// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV9-s7MEO55imZ4V2W7aAiZfKaDoizlYI",
  authDomain: "ecommerce-51d31.firebaseapp.com",
  projectId: "ecommerce-51d31",
  storageBucket: "ecommerce-51d31.firebasestorage.app",
  messagingSenderId: "164578417507",
  appId: "1:164578417507:web:dc9906ee7a7d0c6d8f9156",
  measurementId: "G-VK5933Y1TT"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

