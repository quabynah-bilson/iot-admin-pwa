import { useEffect } from "react";
import "../styles/globals.css";
import "../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import {
  onSnapshot,
  query,
  collection,
  getFirestore,
} from "firebase/firestore";
import { kPaymentPendingState, kPaymentsRef } from "../utils/constants";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const fetchHistory = async () => {
      onSnapshot(
        query(collection(getFirestore(), kPaymentsRef)),
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (
              change.type === "modified" &&
              change.doc.exists &&
              change.doc.data()["status"] === kPaymentPendingState
            ) {
              // console.log("new item added to payments");
              toast("New request received from a client");
            }
          });
        }
      );
    };
    fetchHistory();
    return null;
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
