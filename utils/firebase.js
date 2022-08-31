import "firebase/messaging";

import firebase from "firebase/app";
import localforage from "localforage";

const firebaseCloudMessaging = {
    init: async () => {
        if (!firebase?.apps?.length) {
            // Initialize the Firebase app with the credentials
            firebase?.initializeApp({
                apiKey: "AIzaSyD6e_UafAe0THeyJPDabVyvQO2IyFCys4s",
                authDomain: "cipher-fa40f.firebaseapp.com",
                projectId: "cipher-fa40f",
                storageBucket: "cipher-fa40f.appspot.com",
                messagingSenderId: "1055617831934",
                appId: "1:1055617831934:web:ce0358979c4ccd124f66af",
                measurementId: "G-21LTBEQ7N9",
            });

            try {
                const messaging = firebase.messaging();
                const tokenInLocalForage = await localforage.getItem(
                    "fcm_token"
                );

                // Return the token if it is alredy in our local storage
                if (tokenInLocalForage !== null) {
                    return tokenInLocalForage;
                }

                // Request the push notification permission from browser
                const status = await Notification.requestPermission();
                if (status && status === "granted") {
                    // Get new token from Firebase
                    const fcm_token = await messaging.getToken({
                        vapidKey:
                            "BFmXfSYTALmEEVjUeXlNSbBigs6G0GjPZaTF7Ux6_shYsAcRe0T3fslBAh4jGcq2zLGka_PVm5DtF8Hpah2C_-A",
                    });

                    // Set token in our local storage
                    if (fcm_token) {
                        localforage.setItem("fcm_token", fcm_token);
                        return fcm_token;
                    }
                }
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    },
};
export { firebaseCloudMessaging };
