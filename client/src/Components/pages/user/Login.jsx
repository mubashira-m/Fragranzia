import { useState } from "react";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    alert("Login successful!");
  };

  return (
    <div className="login-page">

      {/* LEFT SECTION */}
      <div className="welcome-section">

        <div className="welcome-content">
          <h1>Welcome Back</h1>

          <p>
            Glad to see you again! Access your
            <br />
            account to explore more
          </p>
        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="login-section">

        <div className="login-container">

          {/* SOCIAL BUTTONS */}
          <div className="social-buttons">

            <button className="social-btn">
              <span className="google-icon">G</span>
              Google
            </button>

            <button className="social-btn">
              <span className="facebook-icon">f</span>
              Facebook
            </button>

          </div>

          {/* DIVIDER */}
          <div className="divider">
            <span></span>
            <p>Or sign in with email</p>
            <span></span>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin}>

            {/* USERNAME */}
            <div className="input-box">

              <span className="input-icon">◉</span>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

            </div>

            {/* PASSWORD */}
            <div className="input-box">

              <span className="input-icon">♙</span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "◉" : "◌"}
              </span>

            </div>

            {/* FORGOT PASSWORD */}
            <div className="forgot">
              <a href="#">Forgot Password?</a>
            </div>

            {/* LOGIN BUTTON */}
            <button className="login-btn" type="submit">
              Log In
            </button>

          </form>

          {/* SIGN UP */}
          <p className="signup-text">
            Don't have an account?{" "}
            <a href="#">Sign Up</a>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;