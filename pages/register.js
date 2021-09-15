import { useState } from "react";

function CreateAccountPage() {
  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return <div>Create a new user account</div>;
}

export default CreateAccountPage;
