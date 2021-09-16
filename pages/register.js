import { useState } from "react";
import {
  kAppName,
  kMessagingPublicKey,
  kRegisterHeader,
  kRegisterSubHead,
  kUsersRef,
} from "../utils/constants";
import Head from "next/head";
import Link from "next/link";
import ItemLoader from "../components/loader";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import { RiAdminLine } from "react-icons/ri";
import { MdSupervisorAccount } from "react-icons/md";

export const accountTypes = [
  {
    name: "Administrator",
    desc: "Gain full access over the system",
    Icon: RiAdminLine,
  },
  {
    name: "Customer",
    desc: "View personal information",
    Icon: MdSupervisorAccount,
  },
];

function CreateAccountPage() {
  // router
  const router = useRouter();

  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [userType, setUserType] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // create new user
  const createUser = async (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Email address is required");
    } else if (password === "") {
      alert("Password is required");
    } else if (lastName === "") {
      alert("Last name is required");
    } else if (firstName === "") {
      alert("First name is required");
    } else {
      try {
        setLoading(true);
        let credential = await createUserWithEmailAndPassword(
          getAuth(),
          email,
          password
        );
        let user = credential.user;
        if (user) {
          let docRef = doc(getFirestore(), kUsersRef, user.uid);
          let userData = {
            id: docRef.id,
            email: user.email,
            firstName,
            lastName,
            phone,
            userType,
            created_at: new Date().getTime(),
          };
          console.log(userData);

          await setDoc(docRef, userData, { merge: true });
          localStorage.setItem(kUserType, userType);
          router.push("/dashboard");
        } else {
          setLoading(false);
          alert(`An error occurred. ${error.message}`);
        }
      } catch (error) {
        setLoading(false);
        alert(`An error occurred. ${error.message}`);
      }
    }
  };

  return (
    <div className="bg-background w-screen min-h-screen">
      <Head>
        <title>{kAppName}</title>
        <meta name="description" content="For a final year project demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <>
          <ItemLoader />
        </>
      ) : (
        <>
          {showForm ? (
            <div className="relative min-h-screen flex flex-col justify-center items-center">
              <div className="relative max-w-xs sm:max-w-sm 2xl:max-w-xl w-full">
                <div className="card bg-secondary shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                <div className="card bg-tertiary shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                <div className="relative w-full rounded-3xl flex flex-col justify-center px-6 py-4 bg-gray-100 shadow-md">
                  <h6 className="block mt-3 text-xl font-serif text-primary text-center font-semibold">
                    {kRegisterHeader}
                  </h6>
                  <span className="text-sm text-gray-500 text-center">
                    {kRegisterSubHead}
                  </span>
                  <form
                    method="#"
                    onSubmit={createUser}
                    action="#"
                    className="mt-10"
                  >
                    {/* first name */}
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                        className="form_control"
                        required={true}
                      />
                    </div>

                    {/* last name */}
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        className="form_control"
                        required={true}
                      />
                    </div>

                    {/* phone number */}
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Phone Number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="form_control"
                      />
                    </div>

                    {/* email */}
                    <div className="mt-4">
                      <input
                        type="email"
                        placeholder="Email address"
                        onChange={(e) => setEmail(e.target.value)}
                        className="form_control"
                        required={true}
                      />
                    </div>

                    {/* password */}
                    <div className="mt-4">
                      <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="form_control"
                        required={true}
                      />
                    </div>

                    <div className="mt-6 flex">
                      <div className="w-full text-right">
                        <Link href="/login">
                          <a
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                            href="#"
                          >
                            Forgot password?
                          </a>
                        </Link>
                      </div>
                    </div>

                    <div className="mt-7">
                      <button
                        type="submit"
                        className="bg-primary w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                      >
                        Create account
                      </button>
                    </div>

                    <div className="mt-7">
                      <div className="flex justify-center items-center font-semibold">
                        <label className="mr-2">
                          Already having an account?
                        </label>
                        <Link href="/login">
                          <a
                            href="#"
                            className=" text-primary transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                          >
                            Sign in
                          </a>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center h-screen w-full max-w-lg mx-auto">
                <h2 className="text-2xl font-serif">
                  Choose your account type
                </h2>
                <p className="font-sans mt-2 text-black text-opacity-50 text-center mb-12">
                  Select your account type to get started. This will enable us
                  to tailor your experience based on the selected account
                </p>

                {/* account types */}
                <div
                  className={`grid grid-rows-${accountTypes.length} gap-y-4 w-full mx-auto max-w-sm`}
                >
                  {accountTypes.map((account, index) => (
                    <div
                      onClick={() => setUserType(account.name.toLowerCase())}
                      className={
                        (userType === account.name.toLowerCase()
                          ? "bg-opacity-10 bg-primary border-2 border-primary"
                          : "bg-gray-50 border-2 border-gray-100") +
                        ` flex flex-row px-4 py-4 w-full rounded-lg cursor-pointer`
                      }
                      key={index}
                    >
                      <div className="flex flex-row space-x-8">
                        {/* icon */}
                        <div
                          className={
                            (userType === account.name.toLowerCase()
                              ? "rounded-lg bg-primary border-2 border-primary"
                              : "rounded-lg bg-gray-50 border-2 border-gray-100") +
                            "py-px px-3 flex items-center justify-center"
                          }
                        >
                          <account.Icon
                            className={
                              userType === account.name.toLowerCase()
                                ? "text-white"
                                : "text-primary"
                            }
                          />
                        </div>

                        {/* title & subhead */}
                        <div className="flex flex-col space-y-1">
                          <h6
                            className={`${
                              userType === account.name.toLowerCase()
                                ? "text-primary"
                                : "text-black"
                            } text-base font-semibold`}
                          >
                            {account.name}
                          </h6>
                          <p
                            className={`${
                              userType === account.name.toLowerCase()
                                ? "text-primary"
                                : "text-black"
                            } text-sm text-opacity-50`}
                          >
                            {account.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* next */}
                <div className="w-1/3 mt-12">
                  <button
                    type="submit"
                    onClick={() => setShowForm(!showForm)}
                    disabled={!userType}
                    className={!userType ? "btn_outlined" : "btn_primary"}
                  >
                    <h6 className="">Next</h6>
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default CreateAccountPage;
