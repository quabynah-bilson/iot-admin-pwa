import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import ItemLoader from "../components/loader";
import { kAppName } from "../utils/constants";
import firebase from "firebase/app";
import "firebase/auth";
import { useRouter } from "next/dist/client/router";

export default function Home() {
  // router
  const router = useRouter();

  // called when page is first loaded
  useEffect(async () => {
    // check user authentication state
    let currentUser = firebase.auth().currentUser;
    if (currentUser) router.push("/dashboard");
    else router.push("/login");
  }, []);

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>{kAppName}</title>
        <meta name="description" content="For a final yer project demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col justify-center items-center w-full h-full">
        <ItemLoader />
      </div>
    </div>
  );
}
