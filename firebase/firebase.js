/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { doc, getFirestore, getStorage, setDoc } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Cookies from "js-cookie";
import localforage from "localforage";
import { toast } from "utils/toast";

// const firebaseConfig = {
//     apiKey: "AIzaSyBSPPQD4M1anH8uT7Ldh-zevS2lgWoL-9Q",
//     authDomain: "notification-cipher-61823.firebaseapp.com",
//     projectId: "notification-cipher-61823",
//     storageBucket: "notification-cipher-61823.appspot.com",
//     messagingSenderId: "185572736284",
//     appId: "1:185572736284:web:54928d1587844ac5fc0ed9",
//     measurementId: "G-XBZJZJR692",
// };
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const firebaseCloudMessaging = {
    tokenInlocalforage: async () => {
        const token = Cookies.get("fcm_token");
        return token;
    },
    onMessage: async () => {
        const messaging = getMessaging();
        onMessage(messaging, (payload) => {
            toast.success(`Successfully ${payload?.data?.title} `, {
                onClick: () => {
                    window.open(
                        `/task/${payload?.data?.object_slug}`,
                        "_blank"
                    );
                },
            });
        });
    },

    init: async function () {
        try {
            //
            const messaging = getMessaging(app);
            await Notification.requestPermission();
            const token = await getToken(messaging, {
                vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
            })
                .then((currentToken) => {
                    //
                    if (currentToken) {
                        // Send the token to your server and update the UI if necessary
                        // save the token in your database
                        Cookies.set("fcm_token", currentToken);
                        //
                    } else {
                        console.log("213131232");
                        // Show permission request UI
                        //
                        //         "NOTIFICACION, No registration token available. Request permission to generate one."
                        //     );
                        // ...
                    }
                })
                .catch((err) => {
                    console.log("🚀 ~ file: firebase.js:85 ~ err", err);
                    //
                    //     "NOTIFICACIONAn error occurred while retrieving token . "
                    // );
                });
        } catch (error) {
            console.error(error);
        }
    },
};

export { firebaseCloudMessaging };
export const db = getFirestore();
