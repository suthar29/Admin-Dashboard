importScripts(
    'https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging-compat.js'
  );
  
  firebase.initializeApp({
    apiKey: 'AIzaSyDXZM4rY5XrsWwqPKKZrhzCJm7umoOsGRA',
    authDomain: 'anupam-s-portfolio.firebaseapp.com',
    projectId: 'anupam-s-portfolio',
    storageBucket: 'anupam-s-portfolio.firebasestorage.app',
    messagingSenderId: '886849041281',
    appId: '1:886849041281:web:b02aa30634a6ae940aae80',
    measurementId: 'G-PMYBEZHF7L'
  });
  
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message:', payload);
  
    const notification = payload.notification || {};
    const notificationTitle = notification.title || 'New Notification';
    const notificationOptions = {
      body: notification.body || '',
      icon: notification.icon || '/firebase-logo.png',
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  