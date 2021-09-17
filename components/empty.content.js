import { FaRetweet } from "react-icons/fa";

function EmptyContent({ header, subhead, onRefresh }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-1/3 bg-gray-100">
      {header && <h4 className="text-2xl font-serif font-medium">{header}</h4>}
      {subhead && <span className="mt-2 text-gray-600">{subhead}</span>}
      {onRefresh && (
        <button
          className="flex flex-row items-center space-x-2 mt-8 px-6 py-2 bg-primary text-white rounded-full cursor-pointer"
          onClick={onRefresh}
        >
          <FaRetweet />
          <span className="">Refresh</span>
        </button>
      )}
    </div>
  );
}

export default EmptyContent;
