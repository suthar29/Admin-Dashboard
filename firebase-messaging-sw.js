// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyDXZM4rY5XrsWwqPKKZrhzCJm7umoOsGRA",
    authDomain: "anupam-s-portfolio.firebaseapp.com",
    projectId: "anupam-s-portfolio",
    storageBucket: "anupam-s-portfolio.firebasestorage.app",
    messagingSenderId: "886849041281",
    appId: "1:886849041281:web:b02aa30634a6ae940aae80",
    measurementId: "G-PMYBEZHF7L"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
