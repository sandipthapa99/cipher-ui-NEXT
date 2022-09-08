/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { doc, getFirestore, setDoc } from "firebase/firestore";
import localforage from "localforage";

const firebaseConfig = {
    apiKey: "AIzaSyBSPPQD4M1anH8uT7Ldh-zevS2lgWoL-9Q",
    projectId: "notification-cipher-61823",
    authDomain: "notification-cipher-61823.firebaseapp.com",
    storageBucket: "gs://notification-cipher-61823.appspot.com",
    messagingSenderId: "185572736284",
    appId: "1:185572736284:web:54928d1587844ac5fc0ed9",
    measurementId: "G-XBZJZJR69",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore();

const firebaseCloudMessaging = {
    tokenInlocalforage: async () => {
        const token = await localforage.getItem("fcm_token");
        return token;
    },
    onMessage: async () => {
        const messaging = getMessaging();
        onMessage(messaging, (payload) => {
            console.log("Message received. ", payload);
            // alert("Notificacion");
        });
    },

    init: async function () {
        try {
            if ((await this.tokenInlocalforage()) !== null) {
                return false;
            }
            const messaging = getMessaging(app);
            await Notification.requestPermission();
            getToken(messaging, {
                vapidKey:
                    "BG4z48E68RIMUoaxLCJULmW54cCFCRZizpKCvrlnFNnk67wfN-pooKw6dVFqHJHdO_jSpROK5mAOatF7gl6ezI4",
            })
                .then((currentToken) => {
                    console.log("current Token", currentToken);
                    if (currentToken && typeof window !== "undefined") {
                        // Send the token to your server and update the UI if necessary
                        // save the token in your database
                        localforage.setItem("fcm_token", currentToken);
                        console.log("fcm_token", currentToken);
                    } else {
                        // Show permission request UI
                        console.log(
                            "NOTIFICACION, No registration token available. Request permission to generate one."
                        );
                        // ...
                    }
                })
                .catch((err) => {
                    console.log(
                        "NOTIFICACIONAn error occurred while retrieving token . "
                    );
                    console.log(err);
                });
        } catch (error) {
            console.error(error);
        }
    },
};

export { firebaseCloudMessaging };
