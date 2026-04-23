import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faTruck,
  faWeightHanging,
  faIdCard,
  faCalendar,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { SignupContext } from "../../context/SignupContext";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const CarrierRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    vehicleType: "",
    vehicleCapacity: "",
    vehiclePlate: "",
    licenseNumber: "",
    licenseExpiry: "",
    experience: "",
    region: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState({});
  const { signupData } = useContext(SignupContext);

  const validate = () => {
    let newErrors = {};

    if (!form.vehicleType.trim())
      newErrors.vehicleType = "Vehicle type is required";

    if (!form.vehicleCapacity.trim())
      newErrors.vehicleCapacity = "Vehicle capacity is required";
    else if (isNaN(form.vehicleCapacity))
      newErrors.vehicleCapacity = "Capacity must be a number";

    if (!form.vehiclePlate.trim())
      newErrors.vehiclePlate = "Vehicle plate number required";

    if (!form.licenseNumber.trim())
      newErrors.licenseNumber = "Driving license number required";

    if (!form.licenseExpiry)
      newErrors.licenseExpiry = "License expiry date required";
    else if (new Date(form.licenseExpiry) < new Date())
      newErrors.licenseExpiry = "License already expired";

    if (!form.experience.trim()) newErrors.experience = "Experience required";
    else if (isNaN(form.experience))
      newErrors.experience = "Experience must be a number";

    if (!form.region.trim()) newErrors.region = "Operating region required";

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
            Carrier / Driver Details
          </h1>

          <p className="text-gray-500 mb-6 text-[1rem] font-semibold">
            Provide vehicle and license information
          </p>

          <div className="grid gap-4">
            {/* Company Name */}
            <div>
              <label className="text-sm font-semibold">
                Company Name (optional)
              </label>

              <div className="relative mt-1">
                <FontAwesomeIcon
                  icon={faBuilding}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  name="companyName"
                  placeholder="Company name"
                  value={form.companyName}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 pl-10 font-semibold bg-slate-50 border border-slate-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                  hover:border-slate-300 transition-all"
                />
              </div>
            </div>

            {/* Vehicle Type + Capacity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold">Vehicle Type</label>

                <div className="relative mt-1">
                  <FontAwesomeIcon
                    icon={faTruck}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    name="vehicleType"
                    placeholder="Truck / Van"
                    value={form.vehicleType}
                    onChange={handleChange}
                    className="w-full rounded-lg p-3 pl-10 font-semibold bg-slate-50 border border-slate-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                    hover:border-slate-300 transition-all"
                  />
                </div>
                {errors.vehicleType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.vehicleType}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold">
                  Vehicle Capacity
                </label>

                <div className="relative mt-1">
                  <FontAwesomeIcon
                    icon={faWeightHanging}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    name="vehicleCapacity"
                    placeholder="kg / tons"
                    value={form.vehicleCapacity}
                    onChange={handleChange}
                    className="w-full rounded-lg p-3 pl-10 font-semibold bg-slate-50 border border-slate-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                    hover:border-slate-300 transition-all"
                  />
                </div>
                {errors.vehicleCapacity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.vehicleCapacity}
                  </p>
                )}
              </div>
            </div>

            {/* Vehicle Plate */}
            <div>
              <label className="text-sm font-semibold">
                Vehicle Number Plate
              </label>

              <div className="relative mt-1">
                <FontAwesomeIcon
                  icon={faTruck}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  name="vehiclePlate"
                  placeholder="GJ05AB1234"
                  value={form.vehiclePlate}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 pl-10 font-semibold bg-slate-50 border border-slate-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                  hover:border-slate-300 transition-all"
                />
              </div>

              {errors.vehiclePlate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.vehiclePlate}
                </p>
              )}
            </div>

            {/* License Number */}
            <div>
              <label className="text-sm font-semibold">
                Driving License Number
              </label>

              <div className="relative mt-1">
                <FontAwesomeIcon
                  icon={faIdCard}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  name="licenseNumber"
                  placeholder="License number"
                  value={form.licenseNumber}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 pl-10 font-semibold bg-slate-50 border border-slate-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                  hover:border-slate-300 transition-all"
                />
              </div>

              {errors.licenseNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.licenseNumber}
                </p>
              )}
            </div>

            {/* Expiry + Experience */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold">
                  License Expiry Date
                </label>

                <div className="relative mt-1">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="date"
                    name="licenseExpiry"
                    value={form.licenseExpiry}
                    onChange={handleChange}
                    className="w-full rounded-lg p-3 pl-10 font-semibold bg-slate-50 border border-slate-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                    hover:border-slate-300 transition-all"
                  />
                </div>
                {errors.licenseExpiry && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.licenseExpiry}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold">
                  Years of Experience
                </label>

                <input
                  name="experience"
                  placeholder="Years"
                  value={form.experience}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 mt-1 font-semibold bg-slate-50 border border-slate-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                  hover:border-slate-300 transition-all"
                />

                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.experience}
                  </p>
                )}
              </div>
            </div>

            {/* Operating Region */}
            <div>
              <label className="text-sm font-semibold">Operating Region</label>

              <div className="relative mt-1">
                <FontAwesomeIcon
                  icon={faMap}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  name="region"
                  placeholder="Example: Gujarat / India"
                  value={form.region}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 pl-10 font-semibold bg-slate-50 border border-slate-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                  hover:border-slate-300 transition-all"
                />
              </div>

              {errors.region && (
                <p className="text-red-500 text-sm mt-1">{errors.region}</p>
              )}
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

export default CarrierRegister;
