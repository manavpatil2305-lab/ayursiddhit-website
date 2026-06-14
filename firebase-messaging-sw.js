// Import Firebase Background Libraries
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Your exact Ayursiddhit Database Config
const firebaseConfig = {
    apiKey: "AIzaSyAOBW9PJetbBmROBV2GEMft7QM0HaGpdB0",
    authDomain: "ayursiddhitnaturals-d2ecb.firebaseapp.com",
    projectId: "ayursiddhitnaturals-d2ecb",
    messagingSenderId: "704398728935",
    appId: "1:704398728935:web:6330cb27578d80ce15cc42"
};

// Initialize Firebase in the background
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Listen for the push notification
messaging.onBackgroundMessage((payload) => {
    console.log('Background message received: ', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'logo.png', // This will show your brand logo on the lock screen
        badge: 'logo.png'
    };

    // Push the alert to the phone screen
    self.registration.showNotification(notificationTitle, notificationOptions);
});
