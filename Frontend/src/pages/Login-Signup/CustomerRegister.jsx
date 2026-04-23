import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCity,
  faGlobe,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { SignupContext } from "../../context/SignupContext";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const CustomerRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState({});
  const { signupData } = useContext(SignupContext);

  const validate = () => {
    let newErrors = {};

    if (!form.address.trim()) newErrors.address = "Address required";

    if (!form.city.trim()) newErrors.city = "City required";

    if (!form.state.trim()) newErrors.state = "State required";

    if (!form.country.trim()) newErrors.country = "Country required";

    if (!form.postalCode.trim()) newErrors.postalCode = "Postal code required";
    else if (!/^[0-9]{4,10}$/.test(form.postalCode))
      newErrors.postalCode = "Invalid postal code";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const finalData = {
      ...signupData,
      roleData: form,
    };

    try {
      await api.post("/auth/register", finalData);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 pt-20">
        <div className="w-full max-w-120 bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-extrabold opacity-85 mb-2 public-sans">
            Customer Details
          </h1>

          <p className="text-gray-500 mb-6 text-[1rem] font-semibold">
            Provide your delivery address information
          </p>

          <div className="grid gap-4">
            {/* Address */}
            <div>
              <label className="text-sm font-semibold">Address</label>

              <div className="relative mt-1">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  name="address"
                  placeholder="Street address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 pl-10 font-semibold bg-slate-50 border border-slate-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                  hover:border-slate-300 transition-all"
                />
              </div>

              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* City + State */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold">City</label>

                <div className="relative mt-1">
                  <FontAwesomeIcon
                    icon={faCity}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full rounded-lg p-3 pl-10 font-semibold bg-slate-50 border border-slate-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                    hover:border-slate-300 transition-all"
                  />
                </div>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold">State</label>

                <input
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 mt-1 font-semibold bg-slate-50 border border-slate-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                  hover:border-slate-300 transition-all"
                />

                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
            </div>

            {/* Country + Postal Code */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold">Country</label>

                <div className="relative mt-1">
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    name="country"
                    placeholder="Country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full rounded-lg p-3 pl-10 font-semibold bg-slate-50 border border-slate-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                    hover:border-slate-300 transition-all"
                  />
                </div>

                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold">Postal Code</label>

                <div className="relative mt-1">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    name="postalCode"
                    placeholder="Postal Code"
                    value={form.postalCode}
                    onChange={handleChange}
                    className="w-full rounded-lg p-3 pl-10 font-semibold bg-slate-50 border border-slate-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                    hover:border-slate-300 transition-all"
                  />
                </div>

                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.postalCode}
                  </p>
                )}
              </div>
            </div>

            {/* Button */}
            <button
              className="w-full bg-blue-600 text-white py-4 rounded-lg
              shadow-[0px_0px_16px_-4px_#0200FF]
              font-semibold cursor-pointer
              hover:bg-blue-700
              hover:shadow-[0px_0px_22px_-4px_#0200FF]
              active:scale-[0.98]
              transition-all duration-200"
              onClick={handleSubmit}
            >
              Complete Registration
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerRegister;
