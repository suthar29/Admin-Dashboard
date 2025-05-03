// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, doc, getDoc, addDoc, deleteDoc, updateDoc,getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXZM4rY5XrsWwqPKKZrhzCJm7umoOsGRA",
  authDomain: "anupam-s-portfolio.firebaseapp.com",
  projectId: "anupam-s-portfolio",
  storageBucket: "anupam-s-portfolio.firebasestorage.app",
  messagingSenderId: "886849041281",
  appId: "1:886849041281:web:b02aa30634a6ae940aae80",
  measurementId: "G-PMYBEZHF7L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);

const CLOUD_NAME = 'dqhroqlaa';
const UPLOAD_PRESET = 'my_unsigned_preset';

// Request notification permission
  const requestPermissionAndGetToken = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey: 'BOvoqZNfVjeNAF6D_P5MV24J7j3qQ5bS_clo5wYjs1J3DwYnzc2P54t_ZUR5fP3QwG_gaOwIeTOs_N_7TG4imBA' // Required for web push
        });

        if (token) {
          console.log('FCM Registration Token:', token);
          // Optionally: send token to your server or Firestore
        } else {
          console.warn('No registration token available.');
        }
      } else {
        console.warn('Notification permission denied.');
      }
    } catch (error) {
      console.error('Error getting registration token:', error);
    }
  };

  requestPermissionAndGetToken();

  onMessage(messaging, (payload) => {
    console.log('Message received in foreground:', payload);
    // Show custom toast or alert if needed
  });

export { db, collection, getDoc, doc, addDoc,getDocs, deleteDoc, updateDoc, CLOUD_NAME, UPLOAD_PRESET };