/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { doc, getFirestore, getStorage, setDoc } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
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
    apiKey: "AIzaSyBYnEmAHcAjLEnwYRHsD-U6jOitzaOLyA0",
    authDomain: "homaale-c945b.firebaseapp.com",
    projectId: "homaale-c945b",
    storageBucket: "homaale-c945b.appspot.com",
    messagingSenderId: "17609084275",
    appId: "1:17609084275:web:3e820a0e0c64bbe7bc8906",
    measurementId: "G-6MNMFK079G",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

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
                    "BOP205JIvgHBRt71rjOD_jnopyOUbGElHjXMXYXyt45roXqjrZO9UFF9dkGBkjQjUczl57MMWYWRgGsx9fUg27o",
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
export const db = getFirestore();
