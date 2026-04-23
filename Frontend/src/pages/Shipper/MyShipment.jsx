import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const MyShipment = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const res = await api.get("/shipper/my-shipments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = res.data;

        if (Array.isArray(data)) {
          setShipments(data);
        } else if (data && Array.isArray(data.content)) {
          setShipments(data.content);
        } else if (data && Array.isArray(data.data)) {
          setShipments(data.data);
        } else if (data && typeof data === "object") {
          setShipments([data]);
        } else {
          setShipments([]);
        }

      } catch (err) {
        console.log(err);
        setShipments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  const handleViewBids = (id) => {
    navigate(`/shipper/bids/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-17">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold opacity-85">
            My Shipments
          </h1>
          <p className="text-gray-500 font-semibold">
            Track and manage all your shipments
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          
          {loading ? (
            <p className="text-gray-500 font-semibold">Loading...</p>
          ) : !Array.isArray(shipments) || shipments.length === 0 ? (
            <p className="text-gray-500 font-semibold">
              No shipments found
            </p>
          ) : (
            <div className="grid gap-4">
              
              {shipments.map((s) => (
                <div
                  key={s.id}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  
                  {/* TOP CONTENT */}
                  <div>
                    {/* Route + Status */}
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="font-bold text-lg">
                        {s.origin} → {s.destination}
                      </h2>

                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold ${
                          s.status === "OPEN"
                            ? "bg-green-100 text-green-700"
                            : s.status === "IN_TRANSIT"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {s.status}
                      </span>
                    </div>

                    {/* INFO GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-semibold text-gray-600">
                      
                      {/* Weight */}
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-xs text-gray-400">Weight</p>
                        <p className="text-base font-bold text-gray-800">
                          {s.weight} kg
                        </p>
                      </div>

                      {/* Dimensions */}
                      <div className="bg-white rounded-lg p-3 shadow-sm col-span-2 md:col-span-1">
                        <p className="text-xs text-gray-400">Dimensions</p>
                        <p className="text-base font-bold text-gray-800 tracking-wide">
                          {s.length} × {s.width} × {s.height}
                          <span className="text-sm text-gray-500"> cm</span>
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleViewBids(s.id)}
                      className="bg-blue-600 text-white cursor-pointer px-5 py-2 rounded-lg font-semibold shadow-[0px_0px_12px_-4px_#0200FF] hover:bg-blue-700 hover:shadow-[0px_0px_18px_-4px_#0200FF] active:scale-[0.97] transition-all"
                    >
                      View Bids
                    </button>
                  </div>

                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyShipment;