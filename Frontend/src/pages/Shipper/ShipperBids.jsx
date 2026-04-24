import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams } from "react-router-dom";

const ShipperBids = () => {
  const { shipmentId  } = useParams();

  const [bids, setBids] = useState([]);

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
      await api.post(`/shipper/bids/accept/${bidId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Bid accepted");
      fetchBids();
    } catch (err) {
      console.log(err);
      alert("Error accepting bid");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bids for Shipment</h1>

      {bids.length === 0 ? (
        <p>No bids yet</p>
      ) : (
        <div className="grid gap-4">
          {bids.map((item) => {
            const { bid, carrier } = item;

            return (
              <div key={bid.id} className="border p-4 rounded-lg shadow">

                {/* Carrier Info */}
                <h2 className="font-bold text-lg">
                  {carrier?.companyName || "Unknown Carrier"}
                </h2>

                <p>Vehicle: {carrier?.vehicleType}</p>
                <p>Region: {carrier?.region}</p>

                {/* Bid */}
                <p className="mt-2 font-semibold">
                  Bid Amount: ₹{bid.amount}
                </p>

                <p>Status: {bid.status}</p>

                {/* Actions */}
                {bid.status === "PENDING" && (
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleAccept(bid.id)}
                      className="bg-green-600 text-white px-4 py-1 rounded"
                    >
                      Accept
                    </button>

                    {/* Optional reject */}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShipperBids;