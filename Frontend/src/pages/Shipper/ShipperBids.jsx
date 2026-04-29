import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ShipperBids = () => {
  const { shipmentId } = useParams();

  const [bids, setBids] = useState([]);

  const navigate = useNavigate();

  const fetchBids = async () => {
    try {
      const res = await api.get(`/shipper/bids/${shipmentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBids(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBids();
  }, []);

  const handleAccept = async (bidId) => {
    try {
      await api.post(
        `/shipper/bids/accept/${bidId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert("Bid accepted");
      fetchBids();
    } catch (err) {
      console.log(err);
      alert("Error accepting bid");
    }
  };

  const handleComplete = async (shipmentId) => {
    if (
      !window.confirm("Mark this shipment as delivered? This cannot be undone.")
    )
      return;
    try {
      await api.post(
        `/shipper/complete/${shipmentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      alert("Shipment marked as delivered");
      fetchBids(); // refresh the list
    } catch (err) {
      console.log(err);
      alert("Error completing shipment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold opacity-85 mb-6 public-sans">
          Shipment Bids
        </h1>

        {bids.length === 0 ? (
          <div className="bg-white rounded-xl shadow-xl p-10 text-center">
            <p className="text-gray-500 font-semibold">No bids received yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {bids.map((item) => {
              const { bid, carrier } = item;

              return (
                <div
                  key={bid.id}
                  className="bg-white rounded-xl shadow-xl p-6 transition hover:shadow-2xl"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-bold text-gray-800">
                      {carrier?.companyName || "Unknown Carrier"}
                    </h2>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full
                      ${
                        bid.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : bid.status === "ACCEPTED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {bid.status}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="text-sm text-gray-600 space-y-1 font-semibold">
                    <p>Vehicle: {carrier?.vehicleType}</p>
                    <p>Region: {carrier?.region}</p>
                  </div>

                  {/* Price */}
                  <div className="mt-4 text-2xl font-extrabold text-blue-600">
                    ₹{bid.amount}
                  </div>

                  {/* ACTIONS */}

                  {/* Accept Button */}
                  {bid.status === "PENDING" && (
                    <button
                      onClick={() => handleAccept(bid.id)}
                      className="mt-5 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold 
                    shadow-[0px_0px_16px_-4px_#0200FF]
                    hover:bg-blue-700 hover:shadow-[0px_0px_22px_-4px_#0200FF]
                    active:scale-[0.98] transition-all duration-200"
                    >
                      Accept Bid
                    </button>
                  )}

                  {/* Track Button */}
                  {bid.status === "ACCEPTED" && (
                    <div className="mt-5 flex flex-col gap-3">
                      <button
                        onClick={() => navigate(`/track/${shipmentId}`)}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold 
      shadow-[0px_0px_16px_-4px_#0200FF]
      hover:bg-blue-700 hover:shadow-[0px_0px_22px_-4px_#0200FF]
      active:scale-[0.98] transition-all duration-200 cursor-pointer"
                      >
                        Track Shipment
                      </button>

                      <button
                        onClick={() => handleComplete(shipmentId)}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold
      hover:bg-green-700 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                      >
                        ✓ Mark as Delivered
                      </button>
                    </div>
                  )}

                  {/* Feedback */}
                  {bid.status === "REJECTED" && (
                    <p className="mt-4 text-sm text-red-400 font-medium">
                      Bid not accepted
                    </p>
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

export default ShipperBids;
