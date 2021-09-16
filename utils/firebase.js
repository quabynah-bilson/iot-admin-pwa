import { initializeApp, getApps } from "firebase/app";
// import admin from "firebase-admin";
// import serviceAccount from "./service.account.json";
import { kProjectName } from "./constants";
import {
  getMessaging,
  onMessage,
  // onBackgroundMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBJ5AmVi7uWaftrPRbL7L8cAcJ-8LDBUGM",
  authDomain: `${kProjectName}.firebaseapp.com`,
  databaseURL: `https://${kProjectName}.firebaseio.com`,
  projectId: `${kProjectName}`,
  storageBucket: `${kProjectName}.appspot.com`,
  messagingSenderId: "645657470774",
  appId: "1:645657470774:web:2dbc69abfe02635e98b597",
};

// const adminFirebaseConfig = {
//   credential: firebaseAdmin.credential.cert({
//     privateKey: serviceAccount.private_key,
//     clientEmail: serviceAccount.client_email,
//     projectId: serviceAccount.project_id,
//   }),
//   databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
// };

// Check that `window` is in scope for the analytics module!
if (typeof window !== "undefined" && !getApps().length) {
  initializeApp(firebaseConfig);

  // Retrieve firebase messaging
  const messaging = getMessaging();

  // handle foreground messages
  onMessage(messaging, (payload) => {
    console.log("Received message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });

  // handle background messages
  // onBackgroundMessage(messaging, (payload) => {
  //   console.log("Received background message ", payload);

  //   const notificationTitle = payload.notification.title;
  //   const notificationOptions = {
  //     body: payload.notification.body,
  //   };

  //   self.registration.showNotification(notificationTitle, notificationOptions);
  // });
}

// Check that `window` is in scope for the analytics module!
// if (typeof window !== "undefined" && !admin.apps.length) {
// admin.initializeApp(adminFirebaseConfig);
// }
