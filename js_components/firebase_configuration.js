import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, doc, getDoc, addDoc, deleteDoc, updateDoc, getDocs, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getMessaging, getToken, onMessage} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging.js";
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
 /* 
 async function requestPermission() {
    const permission = await Notification.requestPermission();
    if(permission === "granted"){
        console.log("You granted for the notification");
        const token = getToken(messaging, { vapidKey: "BOvoqZNfVjeNAF6D_P5MV24J7j3qQ5bS_clo5wYjs1J3DwYnzc2P54t_ZUR5fP3QwG_gaOwIeTOs_N_7TG4imBA" });
        console.log('✅ FCM Token:', token)
    }else if(permission === "denied"){
        console.log("you denied for the notification");
    }
}*

requestPermission();*/


// Request permission and get FCM token
async function setupFCM() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BOvoqZNfVjeNAF6D_P5MV24J7j3qQ5bS_clo5wYjs1J3DwYnzc2P54t_ZUR5fP3QwG_gaOwIeTOs_N_7TG4imBA"
      });
      console.log("✅ FCM Token:", token);
    } else {
      console.warn("🔕 Notification permission denied");
    }
  }
  
  // Listen for foreground messages (optional)
  onMessage(messaging, payload => {
    console.log("📩 Foreground message", payload);
  });
  
  // Real-time Firestore listener (client-only alternative to functions)
  async function listenForNewQueries() {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("timestamp", "desc"), limit(1));
  
    let lastDocId = null;
    let isFirstRun = true;
  
    try {
      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const docData = change.doc.data();
  
          if (change.type === "added" && change.doc.id !== lastDocId) {
            // Don't notify on the first load
            if (!isFirstRun) {
              const title = "📩 New Query Received";
              const options = {
                body: `${docData.name || "Someone"} submitted a new query.`,
                icon: "/icons/icon-192.png"
              };
  
              if (Notification.permission === "granted") {
                new Notification(title, options);
              }
            }
  
            lastDocId = change.doc.id;
          }
        });
  
        // After the first snapshot has been processed
        isFirstRun = false;
      });
    } catch (error) {
      console.error("Error setting up Firestore listener:", error);
    }
  }
  
  
  setupFCM();
  listenForNewQueries();

// Export Firestore + Cloudinary vars
export { db, collection, getDoc, doc, addDoc, getDocs, deleteDoc, updateDoc, CLOUD_NAME, UPLOAD_PRESET };