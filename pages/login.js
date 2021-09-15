import { useState } from "react";

function LoginPage() {
  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return <div>Sign in to an existing account</div>;
}

export default LoginPage;
