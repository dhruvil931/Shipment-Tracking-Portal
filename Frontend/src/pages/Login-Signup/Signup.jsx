import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../api/axios";
import { useContext } from "react";
import { SignupContext } from "../../context/SignupContext";

const Signup = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const { setSignupData } = useContext(SignupContext);

  const handleSignup = async (e) => {
    e.preventDefault();

    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) return;

    try {
      const response = await api.get(`/auth/check-email`, {
        params: { email },
      });

      if (response.data === true) {
        setErrors({ email: "Email already registered" });
        return;
      }

      setSignupData({
        fullName,
        email,
        password,
        role,
      });

      const routes = {
        SHIPPER: "/register/shipper",
        CARRIER: "/register/carrier",
        CUSTOMER: "/register/customer",
      };

      navigate(routes[role]);
    } catch (error) {
      console.error("Email check failed", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 pt-20">
        <div className="w-full max-w-120 bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-extrabold opacity-85 mb-2 public-sans">
            Create Account
          </h1>

          <p className="text-gray-500 mb-6 text-[1rem] font-semibold">
            Register as a shipper or carrier to get started
          </p>

          <form onSubmit={handleSignup}>
            {/* Name */}
            <div className="mb-4 public-sans">
              <label className="text-sm font-semibold">Full Name</label>

              <div className="relative mt-1">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => ({ ...prev, fullName: "" }));
                  }}
                  className="w-full rounded-lg p-3 pl-10 font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all"
                />
              </div>

              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

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

            {/* Confirm Password */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <label className="font-semibold">Confirm Password</label>
              </div>

              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                  }}
                  className="w-full rounded-lg p-3 pl-10 font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all"
                />
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="text-sm font-semibold">Select Role</label>

              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setErrors((prev) => ({ ...prev, role: "" }));
                }}
                className="w-full rounded-lg p-3 mt-1 font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="SHIPPER">Shipper</option>
                <option value="CARRIER">Carrier / Driver</option>
                <option value="CUSTOMER">Customer</option>
              </select>

              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg shadow-[0px_0px_16px_-4px_#0200FF] font-semibold cursor-pointer hover:bg-blue-700 hover:shadow-[0px_0px_22px_-4px_#0200FF] active:scale-[0.98] transition-all duration-200"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5 public-sans font-bold">
            Already have an account?
            <button
              className="text-blue-600 ml-1 cursor-pointer hover:underline transition"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
