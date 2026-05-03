import React from "react";
import Signup from "./pages/Login-Signup/Signup";
import Login from "./pages/Login-Signup/Login";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import ShipperRegister from "./pages/Login-Signup/ShipperRegister";
import CarrierRegister from "./pages/Login-Signup/CarrierRegister";
import CustomerRegister from "./pages/Login-Signup/CustomerRegister";
import { SignupProvider } from "./context/SignupContext";
import Navbar from "./components/Navbar";
import CreateShipment from "./pages/Shipper/CreateShipment";
import MyShipment from "./pages/Shipper/MyShipment";
import CarrierMarketplace from "./pages/Carrier/CarrierMarketplace";
import ShipperBids from "./pages/Shipper/ShipperBids";
import MyBids from "./pages/Carrier/MyBids";
import TrackShipment from "./pages/TrackShipment";
import ShipperProfile from "./pages/Shipper/ShipperProfile";
import CarrierProfile from "./pages/Carrier/CarrierProfile";
import CustomerProfile from "./pages/Customer/CustomerProfile";
import Support from "./pages/Support"

const App = () => {
  return (
    <SignupProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/shipper" element={<Landing />} />
        <Route path="/carrier" element={<Landing />} />
        <Route path="/customer" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/register/shipper" element={<ShipperRegister />} />
        <Route path="/register/carrier" element={<CarrierRegister />} />
        <Route path="/register/customer" element={<CustomerRegister />} />

        {/* ============ SHIPPER ============ */}
        <Route path="/shipper/create-shipment" element={<CreateShipment />} />
        <Route path="/shipper/my-shipments" element={<MyShipment />} />
        <Route path="/shipper/bids/:shipmentId" element={<ShipperBids />} />
        <Route path="/shipper/profile" element={<ShipperProfile />} />

        {/* ============ CARRIER ============ */}
        <Route path="/carrier/marketplace" element={<CarrierMarketplace />} />
        <Route path="/carrier/my-bids" element={<MyBids />} />
        <Route path="/carrier/profile" element={<CarrierProfile />} />

        {/* ============ CUSTOMER ============ */}
        <Route path="/customer/profile" element={<CustomerProfile />} />

        <Route path="/track/:shipmentId" element={<TrackShipment />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </SignupProvider>
  );
};

export default App;
