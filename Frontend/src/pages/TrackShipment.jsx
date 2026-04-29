import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Fix default marker icons (broken in Webpack/Vite by default)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// This inner component updates the map view when coordinates change
// MapContainer's center prop is NOT reactive — this is the correct React-Leaflet pattern
const MapUpdater = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

// Decode JWT to read the "role" claim (your AuthUtil sets claim name "role")
const getRoleFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || null; // "CARRIER", "SHIPPER", or "CUSTOMER"
  } catch {
    return null;
  }
};

const TrackShipment = () => {
  const { shipmentId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = getRoleFromToken();

  const fetchLocation = async () => {
    try {
      // No Authorization header — tracking is public
      const res = await api.get(`/tracking/track/${shipmentId}`);
      setData(res.data);
      setError(null);
    } catch (err) {
      const msg = err.response?.data || err.message || "Unknown error";
      setError(typeof msg === "object" ? JSON.stringify(msg) : msg);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchLocation();
  }, [shipmentId]);

  // Poll every 10s for live updates from carrier
  useEffect(() => {
    const interval = setInterval(fetchLocation, 10000);
    return () => clearInterval(interval);
  }, [shipmentId]);

  // Same-tab event from MyBids update
  useEffect(() => {
    window.addEventListener("locationUpdated", fetchLocation);
    return () => window.removeEventListener("locationUpdated", fetchLocation);
  }, []);

  // ── Render states ──────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-8 text-center">
          <p className="text-gray-500 font-semibold">
            Loading shipment location...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-2xl font-extrabold mb-3">
            Shipment #{shipmentId}
          </h1>
          <p className="text-red-500 font-semibold">Error: {error}</p>
          <p className="text-gray-400 text-sm mt-1">
            Check that you are logged in and the shipment ID is valid.
          </p>
        </div>
      </div>
    );
  }

  // Carrier hasn't sent coordinates yet
  if (!data || data.lat == null || data.lng == null) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-2xl font-extrabold mb-3">
            Shipment #{shipmentId}
          </h1>

          {data?.status === "DELIVERED" ? (
            <div className="flex items-center gap-2 text-green-600 font-semibold">
              <span>✓</span>
              <span>This shipment has been delivered.</span>
            </div>
          ) : (
            <>
              <p className="text-gray-500 font-semibold">
                Location not available yet — carrier hasn't shared their
                position.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Status: {data?.status ?? "Unknown"}
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── Map view ───────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6">Shipment Tracking</h1>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/*
            IMPORTANT: height must be on MapContainer directly (or a parent
            with a known px height). "100%" won't work unless every ancestor
            up to <html> also has an explicit height.
          */}
          <MapContainer
            center={[data.lat, data.lng]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[data.lat, data.lng]}>
              <Popup>
                <span className="font-semibold">Shipment #{shipmentId}</span>
                <br />
                {data.lat.toFixed(5)}, {data.lng.toFixed(5)}
              </Popup>
            </Marker>

            {/* Updates map center when polling gets new coordinates */}
            <MapUpdater lat={data.lat} lng={data.lng} />
          </MapContainer>

          <div className="p-4 flex flex-wrap items-center gap-4">
            <span className="font-semibold text-gray-700">
              Status:&nbsp;
              <span
                className={
                  data.status === "DELIVERED"
                    ? "text-green-600"
                    : data.status === "IN_TRANSIT"
                      ? "text-blue-600"
                      : "text-gray-500"
                }
              >
                {data.status}
              </span>
            </span>

            {data.lastUpdated && (
              <span className="text-sm text-gray-400">
                Last updated: {new Date(data.lastUpdated).toLocaleString()}
              </span>
            )}

            {data.status === "DELIVERED" && (
              <span className="ml-auto text-green-600 font-bold">
                ✓ Shipment Delivered
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackShipment;
