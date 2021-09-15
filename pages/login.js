import { useState } from "react";
import { kAppName, kLoginHeader, kLoginSubHead } from "../utils/constants";
import Head from "next/head";
import Link from "next/link";

function LoginPage() {
  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Head>
        <title>{kAppName}</title>
        <meta name="description" content="For a final yer project demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
          <div className="relative sm:max-w-sm w-full">
            <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
            <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
            <div className="relative w-full rounded-3xl flex flex-col justify-center px-6 py-4 bg-gray-100 shadow-md">
              <label
                htmlFor=""
                className="block mt-3 text-base font-serif text-gray-700 text-center font-semibold"
              >
                {kLoginHeader}
              </label>
              <span className="text-sm text-gray-500 text-center">
                {kLoginSubHead}
              </span>
              <form
                method="#"
                onSubmit={loginUser}
                action="#"
                className="mt-10"
              >
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-4 border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>

                <div className="mt-7">
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-4 border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>

                <div className="mt-7 flex">
                  <label
                    htmlFor="remember_me"
                    className="inline-flex items-center w-full cursor-pointer"
                  >
                    <input
                      id="remember_me"
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      name="remember"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember Me
                    </span>
                  </label>

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
                    className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                  >
                    Login
                  </button>
                </div>

                <div className="mt-7">
                  <div className="flex justify-center items-center">
                    <label className="mr-2">Need an account</label>
                    <Link href="/register">
                      <a
                        href="#"
                        className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                      >
                        Create one
                      </a>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
