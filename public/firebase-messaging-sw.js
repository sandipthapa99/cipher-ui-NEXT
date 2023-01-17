/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
    apiKey: "AIzaSyBYnEmAHcAjLEnwYRHsD-U6jOitzaOLyA0",
    authDomain: "homaale-c945b.firebaseapp.com",
    projectId: "homaale-c945b",
    storageBucket: "homaale-c945b.appspot.com",
    messagingSenderId: "17609084275",
    appId: "1:17609084275:web:3e820a0e0c64bbe7bc8906",
    measurementId: "G-6MNMFK079G",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
