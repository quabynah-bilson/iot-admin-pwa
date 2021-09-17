// list item for waste
function WasteListItem({ feed }) {
  return (
    <tr className="text-gray-700 cursor-pointer">
      <td className="px-4 py-3 border">
        <div className="flex items-center text-sm">
          <div>
            <p className="font-semibold text-black">Waste item</p>
            <p className="text-xs text-gray-600">not long ago</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm border"> Some data </td>
      <td className="px-4 py-3 text-xs border">
        <span
          className={`text-secondary bg-secondary px-2 py-1 font-semibold leading-tight rounded-sm bg-opacity-10`}
        >
          Pending
        </span>
      </td>
      <td className="px-4 py-3 text-sm border">
        {format(new Date(), "MM/dd/yyyy")}
      </td>
    </tr>
  );
}

export default WasteListItem;
