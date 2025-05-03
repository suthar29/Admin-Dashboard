import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  getDocs 
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { 
  getMessaging, 
  getToken, 
  onMessage, 
  isSupported 
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

// Messaging (conditionally, for unsupported platforms)
let messaging;
const CLOUD_NAME = 'dqhroqlaa';
const UPLOAD_PRESET = 'my_unsigned_preset';

// VAPID key for web push
const VAPID_KEY = 'BOvoqZNfVjeNAF6D_P5MV24J7j3qQ5bS_clo5wYjs1J3DwYnzc2P54t_ZUR5fP3QwG_gaOwIeTOs_N_7TG4imBA';

async function registerServiceWorker() {
  try {
    // Register service worker with correct path
    // Make sure this path is correct relative to your project structure
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log('✅ Service Worker registered:', registration.scope);
    
    // Wait for the service worker to be ready
    await navigator.serviceWorker.ready;
    console.log('Service worker is active and ready');
    
    return registration;
  } catch (error) {
    console.error('❌ Service Worker registration failed:', error);
    throw error;
  }
}

async function requestPermissionAndGetToken() {
  try {
    const supported = await isSupported();
    if (!supported) {
      console.warn('FCM not supported in this browser.');
      return null;
    }
    
    messaging = getMessaging(app);
    
    // Request notification permission
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission denied');
      return null;
    }
    
    // Register service worker first
    const registration = await registerServiceWorker();
    
    // Get FCM token with the service worker registration
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration
    });
    
    if (token) {
      console.log('📲 FCM Token:', token);
      // Optionally save this token to your backend
      return token;
    } else {
      console.warn('⚠️ No token retrieved.');
      return null;
    }
  } catch (error) {
    console.error('❌ Failed to get FCM token:', error);
    return null;
  }
}

function handleForegroundMessages() {
  if (!messaging) return;
  
  onMessage(messaging, (payload) => {
    console.log('📩 Foreground message received:', payload);
    
    // Extract notification data from payload
    const notification = payload.notification || {};
    
    const title = notification.title || 'New Message';
    const body = notification.body || '';
    const icon = notification.icon || '/firebase-logo.png';
    
    // Check if we can show notifications
    if (Notification.permission === 'granted') {
      // For foreground notifications, we need to use the showNotification API
      // through the service worker registration
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, {
          body: body,
          icon: icon,
          badge: '/badge-icon.png',
          // Add a unique tag to prevent duplicate notifications
          tag: 'notification-' + Date.now()
        });
      });
    } else {
      console.warn('Notification received but permission not granted. Showing alert.');
      alert(`${title}\n${body}`);
    }
  });
}

async function initFCM() {
  try {
    // Get token first
    const token = await requestPermissionAndGetToken();
    
    if (token) {
      // Setup foreground message handler
      handleForegroundMessages();
      console.log('FCM initialized successfully');
      return true;
    }
    return false;
  } catch (error) {
    console.error('FCM initialization failed:', error);
    return false;
  }
}

// Initialize FCM when the page loads
window.addEventListener('load', () => {
  initFCM().catch(console.error);
});

// Export Firestore + Cloudinary vars
export {
  db, collection, getDoc, doc, addDoc, getDocs,
  onMessage, deleteDoc, updateDoc, CLOUD_NAME, UPLOAD_PRESET
};