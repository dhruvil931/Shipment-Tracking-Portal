import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const CreateShipment = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    origin: "",
    destination: "",
    weight: "",
    length: "",
    width: "",
    height: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    let newErrors = {};

    if (!form.origin.trim()) newErrors.origin = "Origin is required";
    if (!form.destination.trim())
      newErrors.destination = "Destination is required";

    if (!form.weight || form.weight <= 0)
      newErrors.weight = "Valid weight required";

    if (!form.length || form.length <= 0) newErrors.length = "Required";

    if (!form.width || form.width <= 0) newErrors.width = "Required";

    if (!form.height || form.height <= 0) newErrors.height = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const token = localStorage.getItem("token");

    try {
      await api.post("/shipper/create-shipment", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/shipper/my-shipments");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 mt-17">
      <div className="w-full max-w-120 bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold opacity-85 mb-2">
          Create Shipment
        </h1>

        <p className="text-gray-500 mb-6 font-semibold">
          Enter shipment details to post a new load
        </p>

        <form onSubmit={handleSubmit}>
          {/* Origin */}
          <div className="mb-4">
            <label className="text-sm font-semibold">Origin Location</label>
            <input
              type="text"
              name="origin"
              placeholder="e.g. Ahmedabad"
              value={form.origin}
              onChange={handleChange}
              className="w-full rounded-lg p-3 mt-1 font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            {errors.origin && (
              <p className="text-red-500 text-sm">{errors.origin}</p>
            )}
          </div>

          {/* Destination */}
          <div className="mb-4">
            <label className="text-sm font-semibold">
              Destination Location
            </label>
            <input
              type="text"
              name="destination"
              placeholder="e.g. Mumbai"
              value={form.destination}
              onChange={handleChange}
              className="w-full rounded-lg p-3 mt-1 font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            {errors.destination && (
              <p className="text-red-500 text-sm">{errors.destination}</p>
            )}
          </div>

          {/* Weight */}
          <div className="mb-4">
            <label className="text-sm font-semibold">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              placeholder="e.g. 500"
              value={form.weight}
              onChange={handleChange}
              className="w-full rounded-lg p-3 mt-1 font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            {errors.weight && (
              <p className="text-red-500 text-sm">{errors.weight}</p>
            )}
          </div>

          {/* Dimensions */}
          <div className="mb-4">
            <label className="text-sm font-semibold">Dimensions (cm)</label>

            <div className="grid grid-cols-3 gap-3 mt-1">
              <input
                type="number"
                name="length"
                placeholder="Length"
                value={form.length}
                onChange={handleChange}
                className="rounded-lg p-3 font-semibold bg-slate-50 border border-slate-200 focus:outline-none"
              />
              <input
                type="number"
                name="width"
                placeholder="Width"
                value={form.width}
                onChange={handleChange}
                className="rounded-lg p-3 font-semibold bg-slate-50 border border-slate-200 focus:outline-none"
              />
              <input
                type="number"
                name="height"
                placeholder="Height"
                value={form.height}
                onChange={handleChange}
                className="rounded-lg p-3 font-semibold bg-slate-50 border border-slate-200 focus:outline-none"
              />
            </div>

            {(errors.length || errors.width || errors.height) && (
              <p className="text-red-500 text-sm mt-1">
                All dimensions are required
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg cursor-pointer shadow-[0px_0px_16px_-4px_#0200FF] font-semibold hover:bg-blue-700 hover:shadow-[0px_0px_22px_-4px_#0200FF] active:scale-[0.98] transition-all"
          >
            Post Shipment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateShipment;
