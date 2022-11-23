/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");

// firebase.initializeApp({
//     apiKey: "AIzaSyBSPPQD4M1anH8uT7Ldh-zevS2lgWoL-9Q",
//     projectId: "notification-cipher-61823",
//     authDomain: "notification-cipher-61823.firebaseapp.com",
//     storageBucket: "notification-cipher-61823.appspot.com",
//     messagingSenderId: "185572736284",
//     appId: "1:185572736284:web:54928d1587844ac5fc0ed9",
//     measurementId: "G-XBZJZJR69",
// });
firebase.initializeApp({
    apiKey: "AIzaSyBYnEmAHcAjLEnwYRHsD-U6jOitzaOLyA0",
    authDomain: "homaale-c945b.firebaseapp.com",
    projectId: "homaale-c945b",
    storageBucket: "homaale-c945b.appspot.com",
    messagingSenderId: "17609084275",
    appId: "1:17609084275:web:3e820a0e0c64bbe7bc8906",
    measurementId: "G-6MNMFK079G",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: "/firebase-logo.png",
    };
    // Customize notification here

    // const notificationTitle = payload?.data?.title;
    // const notificationOptions = {
    //     body: payload?.data?.body,
    //     icon: "/firebase-logo.png",
    // };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
