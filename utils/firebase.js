import { initializeApp, getApps } from "firebase/app";
import { kProjectName } from "./constants";

const firebaseConfig = {
  apiKey: "AIzaSyBJ5AmVi7uWaftrPRbL7L8cAcJ-8LDBUGM",
  authDomain: `${kProjectName}.firebaseapp.com`,
  databaseURL: `https://${kProjectName}.firebaseio.com`,
  projectId: `${kProjectName}`,
  storageBucket: `${kProjectName}.appspot.com`,
  messagingSenderId: "645657470774",
  appId: "1:645657470774:web:2dbc69abfe02635e98b597",
};

// initialization
if (typeof window !== "undefined" && !getApps().length) {
  initializeApp(firebaseConfig);
}
