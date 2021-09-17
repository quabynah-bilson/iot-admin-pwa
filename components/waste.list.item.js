import { format, parseISO } from "date-fns";
import { FaMoneyCheck } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { usePaystackPayment } from "react-paystack";
import { kPaymentsRef, kPaystackApiKey } from "../utils/constants";
import {
  doc,
  getFirestore,
  setDoc,
  getDocs,
  where,
  query,
  collection,
} from "firebase/firestore/lite";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

// list item for waste
function WasteListItem({ feed, user, showPaymentOption = false }) {
  // states
  const [hasPaid, setHasPaid] = useState(false);
  const db = getFirestore();

  const config = {
    reference: new Date().getTime(),
    email: user.email,
    amount: feed.field1 * 100,
    currency: "GHS",
    publicKey: kPaystackApiKey,
  };

  // called when transaction succeeds/fails
  const onSuccess = async (reference) => {
    // reference: "1631863616810";
    // status: "success";
    // trans: "1331033930";
    // transaction: "1331033930";

    if (reference.status === "success") {
      // Implementation for whatever you want to do with reference and after success call.
      console.log(reference);
      await setDoc(
        doc(db, kPaymentsRef, reference.transaction),
        {
          client: user.id,
          transaction: reference.transaction,
          created_at: new Date().getTime(),
          amount: feed.field1,
          feed_id: feed.entry_id,
        },
        { merge: true }
      );
    } else {
      alert("Failed to complete the transaction successfully");
    }
  };

  // called when transaction window is closed
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
    alert("Transaction was cancelled");
  };

  const initializePayment = usePaystackPayment(config);

  useEffect(() => {
    const fetchFeedPaymentState = async () => {
      let q = query(
        collection(getFirestore(), kPaymentsRef),
        where("client", "==", user.id),
        where("feed_id", "==", feed.entry_id)
      );

      let querySnapshots = await getDocs(q);

      console.log(querySnapshots.docs.map((doc) => doc.data()));
      const transactions = querySnapshots.docs.map((doc) => doc.data());

      console.log(`Transactions for user: ${user.id}`, transactions.join(", "));
      setHasPaid(transactions.length > 0);
    };
    fetchFeedPaymentState();
    return null;
  }, []);

  return (
    <tr className="text-gray-700 cursor-pointer">
      <td className="px-4 py-3 border">
        <div className="flex items-center text-sm">
          <p className="font-semibold text-black">{feed.entry_id}</p>
        </div>
      </td>
      <td className="px-4 py-3 text-sm border"> {feed.field1} </td>
      <td className="px-4 py-3 text-sm border">
        <div className="flex items-center">
          <div>
            <p className="font-semibold text-black">
              {format(parseISO(feed.created_at), "MM/dd/yyyy")}
            </p>
            <p className="text-xs text-gray-600">
              {format(parseISO(feed.created_at), "pp")}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-xs border">
        {showPaymentOption &&
          (!hasPaid ? (
            <button
              className="flex flex-row items-center space-x-2 px-6 py-2 border-2 border-primary font-semibold text-primary rounded-full cursor-pointer"
              onClick={() => {
                if (confirm(`Proceed with payment of GHC${feed.field1}?`)) {
                  initializePayment(onSuccess, onClose);
                }
              }}
            >
              <FaMoneyCheck />
              <span className="">Pay now</span>
            </button>
          ) : (
            <button className="flex flex-row items-center space-x-2 px-6 py-2 border-2 border-green-200 bg-green-200 font-semibold text-green-600 rounded-full cursor-pointer">
              <GiCheckMark />
              <span className="">Paid already</span>
            </button>
          ))}
      </td>
    </tr>
  );
}

export default WasteListItem;
