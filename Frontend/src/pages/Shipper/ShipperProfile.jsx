import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const ShipperProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/shipper/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
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
    : "SP";

  const fields = [
    {
      label: "City",
      value: profile?.city,
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
    {
      label: "State",
      value: profile?.state,
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
            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H10l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
          />
        </svg>
      ),
    },
    {
      label: "Country",
      value: profile?.country,
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
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Address",
      value: profile?.address,
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      label: "Business Number",
      value: profile?.businessNumber,
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
                  Shipper Account
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-5 public-sans">
            Company Details
          </h2>

          <div className="divide-y divide-slate-100">
            {fields.map(({ label, value, icon }) => (
              <div
                key={label}
                className="flex items-center gap-4 py-4 group"
              >
                {/* Icon */}
                <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 text-gray-400 flex items-center justify-center transition-colors duration-200 shrink-0">
                  {icon}
                </div>

                {/* Label + Value */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-400 public-sans">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 truncate public-sans">
                    {value || (
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

export default ShipperProfile;