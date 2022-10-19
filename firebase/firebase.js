/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { doc, getFirestore, setDoc } from "firebase/firestore";
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
    apiKey: "AIzaSyBK_aeh-FDu7UcboGVaJl3Fq5a9U0HUw4I",
    authDomain: "homaale-fcm-948ec.firebaseapp.com",
    projectId: "homaale-fcm-948ec",
    storageBucket: "homaale-fcm-948ec.appspot.com",
    messagingSenderId: "668178213848",
    appId: "1:668178213848:web:7b90a94c07862bfb4aa0ad",
    measurementId: "G-6V8N7CTPRG",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore();

const firebaseCloudMessaging = {
    tokenInlocalforage: async () => {
        const token = await localforage.getItem("fcm_token");
        //
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

            // alert("Notificacion");
        });
    },

    init: async function () {
        try {
            if ((await this.tokenInlocalforage()) !== null) {
                //
                return false;
            }
            //
            const messaging = getMessaging(app);
            await Notification.requestPermission();
            getToken(messaging, {
                vapidKey:
                    "BGz8L5135QkuuscXYI-djbUGfQZx0tERIq6tfM1SL549J7YkbXiGR-Lamiwv2KCnkDS7bI7tgRKz7WvUqydh4gg",
            })
                .then((currentToken) => {
                    //
                    if (currentToken) {
                        // Send the token to your server and update the UI if necessary
                        // save the token in your database
                        localforage.setItem("fcm_token", currentToken);
                        //
                    } else {
                        // Show permission request UI
                        //
                        //         "NOTIFICACION, No registration token available. Request permission to generate one."
                        //     );
                        // ...
                    }
                })
                .catch((err) => {
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
