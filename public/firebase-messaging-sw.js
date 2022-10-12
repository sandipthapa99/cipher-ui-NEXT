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
    apiKey: "AIzaSyBK_aeh-FDu7UcboGVaJl3Fq5a9U0HUw4I",
    authDomain: "homaale-fcm-948ec.firebaseapp.com",
    projectId: "homaale-fcm-948ec",
    storageBucket: "homaale-fcm-948ec.appspot.com",
    messagingSenderId: "668178213848",
    appId: "1:668178213848:web:7b90a94c07862bfb4aa0ad",
    measurementId: "G-6V8N7CTPRG",
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
