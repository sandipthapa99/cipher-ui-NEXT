import "firebase/messaging";

import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBSPPQD4M1anH8uT7Ldh-zevS2lgWoL-9Q",
    projectId: "notification-cipher-61823",
    authDomain: "notification-cipher-61823.firebaseapp.com",
    storageBucket: "gs://notification-cipher-61823.appspot.com",
    messagingSenderId: "185572736284",
    appId: "1:185572736284:web:54928d1587844ac5fc0ed9",
    measurementId: "G-XBZJZJR692",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification permission granted.");
            messaging
                .getToken({
                    vapidKey:
                        "BG4z48E68RIMUoaxLCJULmW54cCFCRZizpKCvrlnFNnk67wfN-pooKw6dVFqHJHdO_jSpROK5mAOatF7gl6ezI4",
                })
                .then((currentToken) => {
                    if (currentToken) {
                        console.log("token", currentToken);
                    } else {
                        // Show permission request UI
                        console.log(
                            "No registration token available. Request permission to generate one."
                        );
                        // ...
                    }
                })
                .catch((err) => {
                    console.log(
                        "An error occurred while retrieving token. ",
                        err
                    );
                    // ...
                });
        }
    });
}

// export const fetchToken = (setTokenFound) => {
//     return getToken(messaging, { vapidKey: "---" })
//         .then((currentToken) => {
//             if (currentToken) {
//                 console.log("current token for client: ", currentToken);
//                 setTokenFound(true);
//                 // Track the token -> client mapping, by sending to backend server
//                 // show on the UI that permission is secured
//             } else {
//                 console.log(
//                     "No registration token available. Request permission to generate one."
//                 );
//                 setTokenFound(false);
//                 // shows on the UI that permission is required
//             }
//         })
//         .catch((err) => {
//             console.log("An error occurred while retrieving token. ", err);
//             // catch error while creating client token
//         });
// };

// export const onMessageListener = () =>
//     new Promise((resolve) => {
//         onmessage(messaging, (payload) => {
//             resolve(payload);
//         });
//     });
