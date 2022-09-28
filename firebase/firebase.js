/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { doc, getFirestore, setDoc } from "firebase/firestore";
import localforage from "localforage";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyBSPPQD4M1anH8uT7Ldh-zevS2lgWoL-9Q",
    authDomain: "notification-cipher-61823.firebaseapp.com",
    projectId: "notification-cipher-61823",
    storageBucket: "gs://cipher-bucket",
    messagingSenderId: "185572736284",
    appId: "1:185572736284:web:54928d1587844ac5fc0ed9",
    measurementId: "G-XBZJZJR692",
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
                    "BG4z48E68RIMUoaxLCJULmW54cCFCRZizpKCvrlnFNnk67wfN-pooKw6dVFqHJHdO_jSpROK5mAOatF7gl6ezI4",
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
