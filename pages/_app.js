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
import { kPaymentsRef } from "../utils/constants";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const fetchHistory = async () => {
      onSnapshot(
        query(collection(getFirestore(), kPaymentsRef)),
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
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
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
