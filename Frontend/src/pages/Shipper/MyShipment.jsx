import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const MyShipment = () => {
  const [shipments, setShipments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/shipper/my-shipments", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setShipments(res.data); // newest first from backend
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const statusStyle = (status) => {
    if (status === "OPEN") return "bg-yellow-100 text-yellow-700";
    if (status === "IN_TRANSIT") return "bg-blue-100 text-blue-700";
    if (status === "DELIVERED") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold opacity-85 mb-6">
          My Shipments
        </h1>

        {shipments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-xl p-10 text-center">
            <p className="text-gray-500 font-semibold">No shipments yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {shipments.map((s) => {
              const isDelivered = s.status === "DELIVERED";

              return (
                <div
                  key={s.id}
                  className={`bg-white rounded-xl shadow-xl p-6 transition
                    ${isDelivered ? "opacity-60" : "hover:shadow-2xl"}`}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-bold text-gray-800">
                      Shipment #{s.id}
                    </h2>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyle(s.status)}`}
                    >
                      {s.status}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="text-sm text-gray-600 space-y-1 font-semibold">
                    <p>From: {s.origin}</p>
                    <p>To: {s.destination}</p>
                    <p>Weight: {s.weight} kg</p>
                  </div>

                  {/* Actions — frozen if delivered */}
                  {isDelivered ? (
                    <div className="mt-5 flex items-center gap-2 text-green-600 font-semibold text-sm">
                      <span>✓</span>
                      <span>Delivered — no further actions</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate(`/shipper/bids/${s.id}`)}
                      className="mt-5 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
                      shadow-[0px_0px_16px_-4px_#0200FF]
                      hover:bg-blue-700 hover:shadow-[0px_0px_22px_-4px_#0200FF]
                      active:scale-[0.98] transition-all duration-200 cursor-pointer"
                    >
                      View Bids
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyShipment;
