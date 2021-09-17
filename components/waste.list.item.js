import { format, parseISO } from "date-fns";
import { FaMoneyCheck } from "react-icons/fa";
import { PaystackButton, usePaystackPayment } from "react-paystack";
import { kPaystackApiKey } from "../utils/constants";

// list item for waste
function WasteListItem({ feed, user, showPaymentOption = false }) {
  const config = {
    reference: new Date().getTime(),
    email: user.email,
    amount: feed.field1 * 100,
    currency: "GHS",
    publicKey: kPaystackApiKey,
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);

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
        {showPaymentOption && (
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
        )}
      </td>
    </tr>
  );
}

export default WasteListItem;
