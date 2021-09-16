import Image from "next/image";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

function UserCard({ user }) {
  return (
    <tr className="text-gray-700">
      <td className="px-4 py-3 border">
        <div className="flex items-center text-sm">
          <div className="relative w-8 h-8 mr-3 rounded-full md:block">
            <img
              className="object-cover w-full h-full rounded-full"
              src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt=""
              loading="lazy"
            />
            <div
              className="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></div>
          </div>
          <div>
            <p className="font-semibold text-black">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-600">@{user.username}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm border">{user.phone}</td>
      <td className="px-4 py-3 text-xs border">
        <span
          className={`${
            user.userType === "customer"
              ? "text-secondary bg-secondary"
              : "text-primary bg-primary"
          } px-2 py-1 font-semibold leading-tight rounded-sm bg-opacity-10`}
        >
          {user.userType}
        </span>
      </td>
      <td className="px-4 py-3 text-sm border">
        {format(new Date(user.created_at), "MM/dd/yyyy")}
      </td>
    </tr>
  );
}

export default UserCard;
