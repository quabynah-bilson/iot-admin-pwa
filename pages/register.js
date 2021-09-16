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
import { useRouter } from "next/dist/client/router";

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
            created_at: new Date().getTime(),
          };
          console.log(userData);
          await setDoc(docRef, userData, { merge: true });
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
    <div>
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
          <div className="relative min-h-screen flex flex-col justify-center items-center bg-background">
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
                      <label className="mr-2">Already having an account?</label>
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
        </>
      )}
    </div>
  );
}

export default CreateAccountPage;
