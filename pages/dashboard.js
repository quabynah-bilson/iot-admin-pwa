import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  kAdminUserType,
  kAppName,
  kUsersRef,
  kUserType,
} from "../utils/constants";

import { getDoc, doc, getFirestore } from "firebase/firestore/lite";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import UserCard from "../components/user.card";
import LogoutButton from "../components/logout.button";
import EmptyContent from "../components/empty.content";

export async function getStaticProps(context) {
  // get feeds
  let feedsResponse = await fetch("http://localhost:3000/api/feeds");
  let feeds = await feedsResponse.json();
  console.log(feeds);

  // get users
  let usersResponse = await fetch("http://localhost:3000/api/users");
  let users = await usersResponse.json();

  return {
    props: { feeds, users },
  };
}

function AdminDashboardPage({ feeds, users }) {
  // router
  const router = useRouter();

  // states
  const [currentPage, setCurrentPage] = useState(0);
  const [currentUser, setCurrentUser] = useState({
    username: "loading",
    firstName: "",
    lastName: "",
  });
  currentUser.fullName = `${currentUser.firstName} ${currentUser.lastName}`;

  const pages = ["Users", "Payments"];

  // threshold
  const threshold = 3.0;

  useEffect(() => {
    const getCurrentUserInfo = async () => {
      onAuthStateChanged(getAuth(), async (user) => {
        if (
          !user ||
          localStorage.getItem(kUserType) !== kAdminUserType.toLowerCase()
        )
          router.push("/");
        else {
          let snapshot = await getDoc(doc(getFirestore(), kUsersRef, user.uid));
          if (snapshot.exists) {
            setCurrentUser(snapshot.data());
          }
        }
      });
    };

    getCurrentUserInfo();

    return null;
  }, []);

  return (
    <div className="min-h-screen w-screen bg-background">
      <Head>
        <title>{kAppName}</title>
        <meta name="description" content="For a final year project demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen w-full xl:px-0 px-6">
        <div className="flex-1 h-full max-w-6xl mx-auto w-full py-8">
          <div className="flex flex-row justify-between items-center">
            {/* page details */}
            <div className="flex flex-col">
              <h1 className="text-4xl">Overview</h1>
              <span className="text-gray-700">
                View all users &amp; payments made
              </span>
            </div>

            {/* user details */}
            <LogoutButton
              fullName={currentUser.fullName}
              avatar={currentUser.avatar}
            />
          </div>

          {/* navigation bar */}
          <div className="bg-white mt-8 rounded-tr-xl rounded-tl-xl">
            <nav className="flex flex-row">
              {pages.map((value, index) => (
                <button
                  onClick={() => setCurrentPage(index)}
                  key={index}
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

          {/* table of users */}
          {currentPage === 0 && (
            <>
              {users ? (
                <section className="w-full p-6 font-mono">
                  <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto sm:overflow-x-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="text-sm font-medium tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Phone</th>
                            <th className="px-4 py-3">User Type</th>
                            <th className="px-4 py-3">Created At</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {users.map((value, index) => (
                            <UserCard user={value} key={index} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              ) : (
                <EmptyContent
                  header={"No users registered so far"}
                  subhead={"All registered users will appear here"}
                />
              )}
            </>
          )}

          {/* table of payments */}
          {currentPage === 1 && (
            <>
              <EmptyContent
                header={"No history found"}
                subhead={"Clients' payment history will be displayed here"}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
