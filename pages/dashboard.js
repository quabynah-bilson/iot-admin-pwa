import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { kAppName, kUsersRef } from "../utils/constants";
import { getToken, getMessaging } from "firebase/messaging";
import {
  getDocs,
  getFirestore,
  collection,
  query,
} from "firebase/firestore/lite";

export async function getStaticProps(context) {
  // get feeds
  let response = await fetch("http://localhost:3000/api/feeds");
  let feeds = await response.json();
  console.log(feeds);

  // get users
  let snapshots = await getDocs(query(collection(getFirestore(), kUsersRef)));
  let users = snapshots.docs.map((doc) => doc.data()) || [];

  return {
    props: {
      feeds,
      users,
    },
  };
}

function AdminDashboardPage({ feeds, users }) {
  // states
  const [currentPage, setCurrentPage] = useState(0);
  const pages = ["Users", "Payments"];

  // threshold
  const threshold = 3.0;

  useEffect(async () => {
    let messaging = getMessaging();

    return null;
  }, []);

  return (
    <div className="min-h-screen w-screen bg-background">
      <Head>
        <title>{kAppName}</title>
        <meta name="description" content="For a final year project demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen w-full">
        <div className="flex-1 h-full max-w-6xl mx-auto w-full py-8">
          <h1 className="text-4xl">Overview</h1>
          <span className="text-gray-700">
            View all users &amp; payments made
          </span>

          {/* navigation bar */}
          <div className="bg-white mt-8">
            <nav class="flex flex-col sm:flex-row">
              {pages.map((value, index) => (
                <button
                  onClick={() => setCurrentPage(index)}
                  className={`${
                    currentPage === index
                      ? "text-primary border-primary border-b-2"
                      : "text-gray-600"
                  } py-4 px-6 block hover:text-primary focus:outline-none font-medium`}
                >
                  <h6 className="">{value}</h6>
                </button>
              ))}
            </nav>
          </div>

          {/* content */}
          {currentPage === 0 ? (
            <>{/* table of users */}</>
          ) : (
            <>{/* table of payments */}</>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
