import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();

    let newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) return;

    const finalData = {
      email,
      password,
    };

    try {
      const response = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", response.data.jwt);

      window.dispatchEvent(new Event("authChange"));
      navigate("/");
    } catch (err) {
      setErrors({
        api: err.response?.data?.message || "Login failed. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
        <div className="w-full max-w-120 bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-extrabold opacity-85 mb-2 public-sans">
            Welcome Back
          </h1>

          <p className="text-gray-500 mb-6 text-[1rem] font-semibold">
            Log in to manage your shipments and fleet analytics
          </p>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-4 public-sans">
              <label className="text-sm font-semibold">Email Address</label>

              <div className="relative mt-1">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="name@logistics.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  className="w-full rounded-lg p-3 pl-10 font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <label className="font-semibold">Password</label>
              </div>

              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  className="w-full rounded-lg p-3 pl-10 font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all"
                />
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <button className="text-blue-600 font-semibold text-[0.9rem] mb-5 hover:underline cursor-pointer transition">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg shadow-[0px_0px_16px_-4px_#0200FF] font-semibold cursor-pointer hover:bg-blue-700 hover:shadow-[0px_0px_22px_-4px_#0200FF] active:scale-[0.98] transition-all duration-200"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5 public-sans font-bold">
            New to Logistics Hub?
            <button
              className="text-blue-600 ml-1 cursor-pointer hover:underline transition"
              onClick={() => navigate("/register")}
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
