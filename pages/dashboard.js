import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { kAppName } from "../utils/constants";

export async function getStaticProps(context) {
  let response = await fetch("http://localhost:3000/api/feeds");
  let feeds = await response.json();
  console.log(feeds);
  return {
    props: {
      feeds,
    },
  };
}

function AdminDashboardPage({ feeds }) {
  // threshold
  const threshold = 3.0;

  return (
    <div>
      <Head>
        <title>{kAppName}</title>
        <meta name="description" content="For a final yer project demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Dashboard</div>
    </div>
  );
}

export default AdminDashboardPage;
