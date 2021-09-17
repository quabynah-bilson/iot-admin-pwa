import { format, parseISO } from "date-fns";
import { FaMoneyCheck } from "react-icons/fa";

// list item for waste
function WasteListItem({ feed, showPaymentOption = false }) {
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
              //   let data = PayStackImpl.makePayment();
              //   alert(data);
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
