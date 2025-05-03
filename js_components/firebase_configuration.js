import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getFirestore, collection, doc, getDoc, addDoc, deleteDoc, updateDoc, getDocs
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import {
  getMessaging, getToken, onMessage
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDXZM4rY5XrsWwqPKKZrhzCJm7umoOsGRA",
  authDomain: "anupam-s-portfolio.firebaseapp.com",
  projectId: "anupam-s-portfolio",
  storageBucket: "anupam-s-portfolio.firebasestorage.app",
  messagingSenderId: "886849041281",
  appId: "1:886849041281:web:b02aa30634a6ae940aae80",
  measurementId: "G-PMYBEZHF7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);

const CLOUD_NAME = 'dqhroqlaa';
const UPLOAD_PRESET = 'my_unsigned_preset';

async function requestPermissionAndGetToken() {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission denied');
      return;
    }

    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log('Service Worker registered:', registration.scope);

    const token = await getToken(messaging, {
      vapidKey: 'BOvoqZNfVjeNAF6D_P5MV24J7j3qQ5bS_clo5wYjs1J3DwYnzc2P54t_ZUR5fP3QwG_gaOwIeTOs_N_7TG4imBA',
      serviceWorkerRegistration: registration
    });

    if (token) {
      console.log('✅ FCM Registration Token:', token);
    } else {
      console.warn('⚠️ No registration token available. Request permission to generate one.');
    }
  } catch (error) {
    console.error('❌ Error getting registration token:', error);
  }
}

function handleForegroundMessages() {
  onMessage(messaging, (payload) => {
    console.log('📩 Foreground message received:', payload);
    const notification = payload.notification || {};

    const title = notification.title || 'New Message';
    const body = notification.body || '';

    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: notification.icon || '/firebase-logo.png'
      });
    } else {
      console.log(`New message: ${title} - ${body}`);
    }
  });
}

async function initFCM() {
  await requestPermissionAndGetToken();
  handleForegroundMessages();
}

initFCM().catch(console.error);

// Export Firestore + Cloudinary vars
export {
  db, collection, getDoc, doc, addDoc, getDocs,
  onMessage, deleteDoc, updateDoc, CLOUD_NAME, UPLOAD_PRESET
};
