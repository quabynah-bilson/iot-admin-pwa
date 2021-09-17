import { signOut, getAuth } from "firebase/auth";
import { useRouter } from "next/router";

function LogoutButton({ fullName, avatar }) {
  // router
  const router = useRouter();

  // logout
  const logout = async () => {
    if (confirm("Do you wish to sign out?")) {
      await signOut(getAuth());
      localStorage.clear();
      router.push("/");
    }
  };

  return (
    <div className="flex flex-row items-center space-x-2 py-1 pl-2 pr-4 border-2 border-gray-400 rounded-full">
      <div className="rounded-full w-8 h-8 bg-gray-100 border-2 border-gray-400 overflow-hidden">
        {avatar && <img src={avatar} alt="avatar" className="w-full h-full" />}
      </div>
      <h6
        className="cursor-pointer text-sm text-secondary font-semibold"
        onClick={logout}
      >
        {fullName}
      </h6>
    </div>
  );
}

export default LogoutButton;
