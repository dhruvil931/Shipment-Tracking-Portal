import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const MyBids = () => {
  const [bids, setBids] = useState([]);

  // ✅ per-shipment location state (IMPORTANT)
  const [locationInputs, setLocationInputs] = useState({});

  const navigate = useNavigate();

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

  // ✅ handle input change per shipment
  const handleInputChange = (shipmentId, field, value) => {
    setLocationInputs((prev) => ({
      ...prev,
      [shipmentId]: {
        ...prev[shipmentId],
        [field]: value,
      },
    }));
  };

  // ✅ update location API
  const updateLocation = async (shipmentId) => {
    const lat = parseFloat(locationInputs[shipmentId]?.lat);
    const lng = parseFloat(locationInputs[shipmentId]?.lng);

    if (isNaN(lat) || isNaN(lng)) {
      alert("Enter valid coordinates");
      return;
    }

    try {
      await api.post(
        `/carrier/update-location/${shipmentId}`,
        { lat, lng },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert("Location updated");

      // ✅ notify tracking page (event-based update)
      window.dispatchEvent(new Event("locationUpdated"));
    } catch (err) {
      console.log(err);
      alert("Failed to update location");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold opacity-85 mb-6 public-sans">
          My Bids
        </h1>

        {bids.length === 0 ? (
          <div className="bg-white rounded-xl shadow-xl p-10 text-center">
            <p className="text-gray-500 font-semibold">
              You haven’t placed any bids yet
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {bids.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-xl shadow-xl p-6 transition hover:shadow-2xl"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold text-gray-800">
                    Shipment #{b.shipmentId}
                  </h2>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full
                    ${
                      b.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : b.status === "ACCEPTED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                {/* Amount */}
                <div className="text-2xl font-extrabold text-blue-600 mb-3">
                  ₹{b.amount}
                </div>

                {/* Info */}
                <div className="text-sm text-gray-600 font-semibold">
                  <p>Shipment ID: {b.shipmentId}</p>
                </div>

                {/* ================= ACCEPTED ================= */}
                {b.status === "ACCEPTED" && (
                  <div className="mt-5 space-y-3">
                    {/* Track Button */}
                    <button
                      onClick={() => navigate(`/track/${b.shipmentId}`)}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold 
                      shadow-[0px_0px_16px_-4px_#0200FF]
                      hover:bg-blue-700 hover:shadow-[0px_0px_22px_-4px_#0200FF]
                      active:scale-[0.98] transition-all duration-200 cursor-pointer"
                    >
                      Track Shipment
                    </button>

                    {/* Location Update */}
                    <div className="bg-slate-50 p-3 rounded-lg border">
                      <p className="text-sm font-semibold mb-2 text-gray-700">
                        Update Location
                      </p>

                      <div className="flex gap-2">
                        <input
                          placeholder="Latitude"
                          value={locationInputs[b.shipmentId]?.lat || ""}
                          onChange={(e) =>
                            handleInputChange(
                              b.shipmentId,
                              "lat",
                              e.target.value,
                            )
                          }
                          className="w-1/2 p-2 border rounded text-sm"
                        />

                        <input
                          placeholder="Longitude"
                          value={locationInputs[b.shipmentId]?.lng || ""}
                          onChange={(e) =>
                            handleInputChange(
                              b.shipmentId,
                              "lng",
                              e.target.value,
                            )
                          }
                          className="w-1/2 p-2 border rounded text-sm"
                        />
                      </div>

                      <button
                        onClick={() => updateLocation(b.shipmentId)}
                        className="mt-2 w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 cursor-pointer"
                      >
                        Update Location
                      </button>
                    </div>
                  </div>
                )}

                {/* ================= PENDING ================= */}
                {b.status === "PENDING" && (
                  <p className="mt-4 text-sm text-gray-400 font-medium">
                    Waiting for shipper response...
                  </p>
                )}

                {/* ================= REJECTED ================= */}
                {b.status === "REJECTED" && (
                  <p className="mt-4 text-sm text-red-400 font-medium">
                    Your bid was not accepted
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBids;
