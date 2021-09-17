import admin from "firebase-admin";
// import { kClientWasteTopic } from "./constants";
import serviceAccount from "./service.account.json";

// configuration
const adminFirebaseConfig = {
  credential: admin.credential.cert({
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    projectId: serviceAccount.project_id,
  }),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
};

// initialization
if (!admin.apps.length) {
  admin.initializeApp(adminFirebaseConfig);

  // // Retrieve firebase messaging
  // const messaging = admin.messaging();
  // let response = await messaging.subscribeToTopic([], kClientWasteTopic);
  // if (response.errors.length) {
  //   console.log(`Unable to subscribe to topic => ${response.errors}`);
  // }
}

module.exports = admin;
