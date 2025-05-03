// Firebase Service Worker for FCM
importScripts(
    'https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging-compat.js'
  );
  
  // Initialize Firebase in the service worker
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
  
  // Force activate the service worker immediately
  self.addEventListener('install', (event) => {
    console.log('Service worker installed');
    event.waitUntil(self.skipWaiting());
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service worker activated');
    event.waitUntil(self.clients.claim());
  });
  
  // Handle background messages
  messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message:', payload);
    
    // Extract notification data
    const notification = payload.notification || {};
    const data = payload.data || {};
    
    const notificationTitle = notification.title || data.title || 'New Notification';
    const notificationOptions = {
      body: notification.body || data.body || '',
      icon: notification.icon || data.icon || '/firebase-logo.png',
      badge: '/badge-icon.png',
      tag: 'notification-' + Date.now(),
      data: {
        url: notification.click_action || data.click_action || '/',
        ...data
      }
    };
    
    // Show the notification
    return self.registration.showNotification(notificationTitle, notificationOptions);
  });
  
  // Handle notification click
  self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked', event);
    
    event.notification.close();
    
    // Get the notification data and URL to open
    const clickUrl = event.notification.data?.url || '/';
    
    // Open or focus a window
    event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then(clientList => {
        // Check if there's already a window/tab open with the target URL
        for (const client of clientList) {
          if (client.url === clickUrl && 'focus' in client) {
            return client.focus();
          }
        }
        
        // If no window/tab is open or found, open a new one
        if (self.clients.openWindow) {
          return self.clients.openWindow(clickUrl);
        }
      })
    );
  });