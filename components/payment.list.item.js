import { format, parseISO } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import {
  kPaymentCompletedState,
  kPaymentPendingState,
  kPaymentsRef,
} from "../utils/constants";
import { setDoc, doc, getFirestore } from "firebase/firestore/lite";

function PaymentListItem({ info, allowClick }) {
  return (
    <tr
      className="text-gray-700 cursor-pointer"
      onClick={() => {
        const updateInfo = async () => {
          if (
            allowClick &&
            confirm("Do you wish to mark this item as collected?")
          ) {
            let db = getFirestore();
            await setDoc(
              doc(db, kPaymentsRef, info.id),
              { ...info, status: kPaymentCompletedState },
              { merge: true }
            );
          }
        };

        updateInfo();
      }}
    >
      <td className="px-4 py-3 border">
        <p className="font-semibold text-black">{info.transaction}</p>
      </td>
      <td className="px-4 py-3 text-sm border">{info.amount}</td>
      <td className="px-4 py-3 text-sm border">
        <div className="flex items-center">
          <div>
            <p className="font-semibold text-black">
              {format(new Date(info.created_at), "MM/dd/yyyy")}
            </p>
            <p className="text-xs text-gray-600">
              {format(new Date(info.created_at), "pp")}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-xs border">
        <span
          className={`${
            info.status === kPaymentCompletedState
              ? "text-green-600 bg-green-400"
              : "text-yellow-600 bg-yellow-400"
          } px-2 py-1 font-semibold leading-tight rounded-sm bg-opacity-10`}
        >
          {info.status || kPaymentPendingState}
        </span>
      </td>
    </tr>
  );
}

export default PaymentListItem;
