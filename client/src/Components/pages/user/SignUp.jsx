import React, { useState } from "react";
import "./SignUp.css";


function SignUp() {
  // Form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  // Error messages
  const [errors, setErrors] = useState({});

  // Show / hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    // Username
    if (formData.username.trim() === "") {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Email
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    // Password
    if (formData.password === "") {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password
    if (formData.confirmPassword === "") {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms
    if (!formData.agree) {
      newErrors.agree = "Please accept Terms & Conditions";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      alert("Account created successfully!");

      console.log(formData);
    }
  };

  return (
    <div className="page">

      {/* LEFT SIDE */}
      <div className="left-section" >

        <div className="overlay"  ></div>
     
        <div className="left-content">
          <h1>Let's Get Started!</h1>

          <p>
            Create your account and unlock the
            <br />
            full potential of Fragranzia.
          </p>
        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="right-section">

        <form onSubmit={handleSubmit}>

          {/* Social buttons */}
          <div className="social-buttons">

            <button type="button" className="social-btn">
              <span className="google">G</span>
              Google
            </button>

            <button type="button" className="social-btn">
              <span className="facebook">f</span>
              Facebook
            </button>

          </div>


          {/* Divider */}
          <div className="divider">
            <span></span>
            <p>Or sign up with email</p>
            <span></span>
          </div>


          {/* Username */}
          <div className="input-group">

            <div
              className={`input-box ${
                errors.username ? "input-error" : ""
              }`}
            >
              <span className="icon">◉</span>

              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            {errors.username && (
              <p className="error">{errors.username}</p>
            )}

          </div>


          {/* Email */}
          <div className="input-group">

            <div
              className={`input-box ${
                errors.email ? "input-error" : ""
              }`}
            >
              <span className="icon">✉</span>

              <input
                type="email"
                name="email"
                placeholder="Enter your E - Mail"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {errors.email && (
              <p className="error">{errors.email}</p>
            )}

          </div>


          {/* Password */}
          <div className="input-group">

            <div
              className={`input-box ${
                errors.password ? "input-error" : ""
              }`}
            >
              <span className="icon">🔒</span>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "◉" : "◌"}
              </button>
            </div>

            {errors.password && (
              <p className="error">{errors.password}</p>
            )}

          </div>


          {/* Confirm Password */}
          <div className="input-group">

            <div
              className={`input-box ${
                errors.confirmPassword ? "input-error" : ""
              }`}
            >
              <span className="icon">🔒</span>

              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <button
                type="button"
                className="eye"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "◉" : "◌"}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="error">
                {errors.confirmPassword}
              </p>
            )}

          </div>


          {/* Terms */}
          <div className="terms">

            <label>
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />

              <span>
                Agree with{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Terms & Conditions
                </a>
              </span>
            </label>

            {errors.agree && (
              <p className="error">{errors.agree}</p>
            )}

          </div>


          {/* Submit */}
          <button type="submit" className="signup-btn">
            Sign up
          </button>


          {/* Login */}
          <p className="login-text">
            Already have an account?{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Sign In
            </a>
          </p>

        </form>

      </div>

    </div>
  );
}

export default SignUp;