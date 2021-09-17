import Head from "next/head";
import { useEffect, useState } from "react";
import {
  kAppName,
  kClientUserType,
  kUsersRef,
  kUserType,
} from "../utils/constants";
import { getDoc, doc, getFirestore } from "firebase/firestore/lite";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import LogoutButton from "../components/logout.button";
import EmptyContent from "../components/empty.content";
import WasteListItem from "../components/waste.list.item";
import ItemLoader from "../components/loader";
import PaymentListItem from "../components/payment.list.item";

export async function getStaticProps(context) {
  // get feeds
  let response = await fetch("http://localhost:3000/api/feeds");
  let feeds = await response.json();

  return {
    props: { feeds },
  };
}

function ClientDashboardPage({ feeds }) {
  // router
  const router = useRouter();

  // states
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [updatedFeeds, setFeeds] = useState(feeds);
  const [paymentItems, setPaymentItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    username: "loading",
    firstName: "",
    lastName: "",
  });
  currentUser.fullName = `${currentUser.firstName} ${currentUser.lastName}`;

  const pages = ["History", "Notifications"];

  // get payment info for user
  const fetchHistory = async () => {
    let paymentResponse = await fetch("http://localhost:3000/api/payments", {
      body: { user: currentUser.id },
      method: "POST",
    });
    let data = await paymentResponse.json();
    setPaymentItems(data);
  };

  // check user login status
  useEffect(() => {
    // get current user details
    const getCurrentUserInfo = async () => {
      onAuthStateChanged(getAuth(), async (user) => {
        if (
          !user ||
          localStorage.getItem(kUserType) !== kClientUserType.toLowerCase()
        )
          router.push("/");
        else {
          let snapshot = await getDoc(doc(getFirestore(), kUsersRef, user.uid));
          if (snapshot.exists) {
            setCurrentUser(snapshot.data());
            fetchHistory();
          }
        }
      });
    };

    getCurrentUserInfo();
    return null;
  }, []);

  // update feeds
  const updateFeeds = async () => {
    setLoading(true);
    // get feeds
    let response = await fetch("http://localhost:3000/api/feeds");
    let data = await response.json();
    setFeeds(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-screen bg-background">
      <Head>
        <title>{kAppName}</title>
        <meta name="description" content="For a final year project demo" />
        <link rel="icon" href="/favicon.ico" />
        {/* TODO -> enable this */}
        {/* <meta http-equiv="Refresh" content="30"></meta> */}
      </Head>

      <div className="flex flex-col h-screen w-full xl:px-0 px-6">
        <div className="flex-1 h-full max-w-6xl mx-auto w-full py-8">
          <div className="flex flex-row justify-between items-center">
            {/* page details */}
            <div className="flex flex-col">
              <h1 className="text-4xl">Dashboard</h1>
              <span className="text-gray-700">
                View all waste level &amp; make payments
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

          {/* content */}
          {/* {currentPage === 0 && (
            <>
              <EmptyContent
                header={"You haven't received any updates yet"}
                subhead={"Updates on your waste level will be displayed here"}
              />
            </>
          )} */}
          {currentPage === 0 && (
            <>
              {paymentItems.length ? (
                <section className="w-full p-6 font-mono">
                  <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto sm:overflow-x-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="text-sm font-medium tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                            <th className="px-4 py-3">Transaction ID</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Transaction Date</th>
                            <th className="px-4 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {paymentItems.map((value, index) => (
                            <PaymentListItem info={value} key={index} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              ) : (
                <EmptyContent
                  header={"No history found"}
                  subhead={"Your payment history will be displayed here"}
                />
              )}
            </>
          )}
          {currentPage === 1 && (
            <>
              {loading && <ItemLoader />}

              {updatedFeeds.length ? (
                <section className="w-full p-6 font-mono">
                  <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto sm:overflow-x-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="text-sm font-medium tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Current Level</th>
                            <th className="px-4 py-3">Created At</th>
                            <th className="px-4 py-3"></th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {updatedFeeds.map((value, index) => (
                            <WasteListItem
                              feed={value}
                              user={currentUser}
                              showPaymentOption
                              key={index}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              ) : (
                <EmptyContent
                  header={"No new notifications"}
                  subhead={"Updates on your waste level will be displayed here"}
                  onRefresh={updateFeeds}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientDashboardPage;
