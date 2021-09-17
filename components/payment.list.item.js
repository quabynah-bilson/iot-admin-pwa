import { format } from "date-fns";

function PaymentListItem({ info }) {
  return (
    <tr className="text-gray-700 cursor-pointer">
      <td className="px-4 py-3 border">
        <p className="font-semibold text-black">{info.transaction}</p>
      </td>
      <td className="px-4 py-3 text-sm border">
        {format(new Date(info.created_at), "MM/dd/yyyy")}
      </td>
      <td className="px-4 py-3 text-sm border">
        {format(new Date(info.created_at), "MM/dd/yyyy")}
      </td>
      <td className="px-4 py-3 text-xs border">
        <span
          className={`${
            info.status === "pending"
              ? "text-secondary bg-secondary"
              : "text-primary bg-primary"
          } px-2 py-1 font-semibold leading-tight rounded-sm bg-opacity-10`}
        >
          {info.status}
        </span>
      </td>
    </tr>
  );
}

export default PaymentListItem;
