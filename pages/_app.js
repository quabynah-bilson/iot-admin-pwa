import { useEffect } from "react";
import "../styles/globals.css";
import "../utils/firebase";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    return null;
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
