import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    const newUser = { email, password };
    localStorage.setItem("userData", JSON.stringify(newUser));

    alert("Account created successfully!");
    navigate("/signin");
  };

  return (
    <div>
      <h2 className="form-title">Create Account</h2>

      <div className="form-row">
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-row">
        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-row">
        <button className="button" onClick={handleSignup}>Sign Up</button>
      </div>

      <div className="helper">
        Already have an account?{" "}
        <span className="link" onClick={() => navigate("/signin")}>Sign In</span>
      </div>
    </div>
  );
}

export default SignUp;
