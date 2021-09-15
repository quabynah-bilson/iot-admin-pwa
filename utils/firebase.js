import firebase from "firebase/app";
import { kProjectName } from "./constants";
// import 'firebase/functions';
// import 'firebase/auth'
// import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBJ5AmVi7uWaftrPRbL7L8cAcJ-8LDBUGM",
  authDomain: `${kProjectName}.firebaseapp.com`,
  projectId: `${kProjectName}`,
  storageBucket: `${kProjectName}.appspot.com`,
  messagingSenderId: "645657470774",
  appId: "1:645657470774:web:2dbc69abfe02635e98b597",
};

// Check that `window` is in scope for the analytics module!
if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // To enable analytics. https://firebase.google.com/docs/analytics/get-started
  // if ('measurementId' in clientCredentials) firebase.analytics();
}
