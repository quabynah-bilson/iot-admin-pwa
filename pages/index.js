import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import ItemLoader from "../components/loader";
import { kAppName } from "../utils/constants";

export default function Home({ feeds }) {
  useEffect(() => {
    // check user authentication state
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
