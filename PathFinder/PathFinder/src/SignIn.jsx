import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("userData"));

    // Admin Login
    if (email === "admin@demo.com" && password === "admin123") {
      alert("Admin Login Successful!");
      navigate("/admin/dashboard");
      return;
    }

    // User Login
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      alert("User Login Successful!");
      navigate("/user/dashboard");
    } else {
      alert("Incorrect email or password");
    }
  };

  return (
    <div>
      <h2 className="form-title">Sign In</h2>

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
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-row">
        <button className="button" onClick={handleLogin}>Login</button>
      </div>

      <div className="helper">
        Don't have an account?{" "}
        <span className="link" onClick={() => navigate("/signup")}>Sign Up</span>
      </div>
    </div>
  );
}

export default SignIn;
