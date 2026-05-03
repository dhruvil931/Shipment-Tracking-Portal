import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const CarrierProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/carrier/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          <p className="text-gray-500 font-semibold text-sm public-sans">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-7 h-7 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-extrabold text-gray-800 mb-1">
            Something went wrong
          </h2>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  const initials = profile?.companyName
    ? profile.companyName
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "CA";

  const fields = [
    {
      label: "Vehicle Type",
      value: profile?.vehicleType,
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 17H5a2 2 0 01-2-2V7a2 2 0 012-2h11l4 4v6a2 2 0 01-2 2h-2m-6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
      ),
    },
    {
      label: "Vehicle Capacity",
      value: profile?.vehicleCapacity,
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      label: "Vehicle Plate",
      value: profile?.vehiclePlate,
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      label: "License Number",
      value: profile?.licenseNumber,
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2"
          />
        </svg>
      ),
    },
    {
      label: "License Expiry",
      value: profile?.licenseExpiry,
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "Experience (years)",
      value: profile?.experience,
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Region",
      value: profile?.region,
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6 pt-20">
      <div className="w-full max-w-2xl">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-4">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-xl bg-blue-600 shadow-[0px_0px_16px_-4px_#0200FF] flex items-center justify-center shrink-0">
              <span className="text-white text-xl font-extrabold public-sans tracking-wide">
                {initials}
              </span>
            </div>

            {/* Name & Badge */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-extrabold text-gray-800 public-sans truncate">
                {profile?.companyName || "—"}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                  Carrier Account
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-5 public-sans">
            Carrier Details
          </h2>

          <div className="divide-y divide-slate-100">
            {fields.map(({ label, value, icon }) => (
              <div key={label} className="flex items-center gap-4 py-4 group">
                <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 text-gray-400 flex items-center justify-center transition-colors duration-200 shrink-0">
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-400 public-sans">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 truncate public-sans">
                    {value ?? (
                      <span className="text-gray-300 italic">Not provided</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrierProfile;
