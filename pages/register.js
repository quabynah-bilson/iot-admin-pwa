import { useState } from "react";
import { kAppName } from "../utils/constants";
import Head from "next/head";

function CreateAccountPage() {
  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Head>
        <title>{kAppName}</title>
        <meta name="description" content="For a final yer project demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Create a new user account</div>
    </div>
  );
}

export default CreateAccountPage;
