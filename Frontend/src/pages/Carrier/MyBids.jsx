import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const MyBids = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await api.get("/carrier/my-bids", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBids(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBids();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bids</h1>

      {bids.length === 0 ? (
        <p>No bids yet</p>
      ) : (
        <div className="grid gap-4">
          {bids.map((b) => (
            <div key={b.id} className="border p-4 rounded">
              <p>Shipment ID: {b.shipmentId}</p>
              <p>Amount: ₹{b.amount}</p>
              <p>Status: {b.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBids;