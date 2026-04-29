import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const CarrierMarketplace = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeBidId, setActiveBidId] = useState(null);

  const [bidValues, setBidValues] = useState({});

  const [myBids, setMyBids] = useState({});

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const res = await api.get("/carrier/marketplace", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = res.data;

        if (Array.isArray(data)) setShipments(data);
        else if (data && Array.isArray(data.content))
          setShipments(data.content);
        else if (data && typeof data === "object") setShipments([data]);
        else setShipments([]);
      } catch (err) {
        console.log(err);
        setShipments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  useEffect(() => {
    const fetchMyBids = async () => {
      try {
        const res = await api.get("/carrier/my-bids", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const map = {};
        res.data.forEach((b) => {
          map[b.shipmentId] = true;
        });

        setMyBids(map);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMyBids();
  }, []);

  // 🔥 handle input change
  const handleChange = (id, value) => {
    setBidValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 🔥 handle button click
  const handleBidClick = async (shipmentId) => {
    // first click → expand
    if (activeBidId !== shipmentId) {
      setActiveBidId(shipmentId);
      return;
    }

    // second click → submit
    const amount = bidValues[shipmentId];

    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }

    try {
      await api.post(
        `/carrier/bids/submit/${shipmentId}`,
        { amount: Number(amount) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert("Bid submitted!");
    } catch (err) {
      console.log(err);
      alert("Failed to submit bid");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-17">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold opacity-85">
            Shipment Marketplace
          </h1>
          <p className="text-gray-500 font-semibold">
            Browse available shipments and place bids
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6">
          {loading ? (
            <p className="text-gray-500 font-semibold">Loading...</p>
          ) : shipments.length === 0 ? (
            <p className="text-gray-500 font-semibold">
              No shipments available
            </p>
          ) : (
            <div className="grid gap-4">
              {shipments.map((s) => {
                const isActive = activeBidId === s.id;

                return (
                  <div
                    key={s.id}
                    className={`p-5 rounded-xl border border-slate-200 bg-slate-50 transition-all flex flex-col justify-between ${
                      isActive ? "shadow-xl scale-[1.01]" : "hover:shadow-lg"
                    }`}
                  >
                    {/* Top */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h2 className="font-bold text-lg">
                          {s.origin} → {s.destination}
                        </h2>

                        <span className="px-3 py-1 text-xs rounded-full font-semibold bg-green-100 text-green-700">
                          OPEN
                        </span>
                      </div>

                      {/* Info */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-semibold text-gray-600">
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="text-xs text-gray-400">Weight</p>
                          <p className="text-base font-bold text-gray-800">
                            {s.weight} kg
                          </p>
                        </div>

                        <div className="bg-white rounded-lg p-3 shadow-sm col-span-2 md:col-span-1">
                          <p className="text-xs text-gray-400">Dimensions</p>
                          <p className="text-base font-bold text-gray-800">
                            {s.length} × {s.width} × {s.height} cm
                          </p>
                        </div>
                      </div>

                      {/* EXPANDED INPUT */}
                      {isActive && (
                        <div className="mt-4">
                          <input
                            type="number"
                            placeholder="Enter your bid amount (₹)"
                            value={bidValues[s.id] || ""}
                            onChange={(e) => handleChange(s.id, e.target.value)}
                            className="w-full p-2 border rounded-lg"
                          />
                        </div>
                      )}
                    </div>

                    {/* Button */}
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => handleBidClick(s.id)}
                        disabled={myBids[s.id]}
                        className={`px-5 py-2 rounded-lg font-semibold cursor-pointer transition-all ${
                          myBids[s.id]
                            ? "bg-gray-400 cursor-not-allowed"
                            : isActive
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {myBids[s.id]
                          ? "Already Bid"
                          : isActive
                            ? "Confirm Bid"
                            : "Place Bid"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarrierMarketplace;
