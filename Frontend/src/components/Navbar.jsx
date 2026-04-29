import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruckFast,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ── utils (moved from inline) ────────────────────────────────────────────────
const getPayload = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

const isTokenExpired = (payload) => {
  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1000;
};

// ── role → nav items ─────────────────────────────────────────────────────────
const NAV_ITEMS = {
  SHIPPER: [
    { label: "Create Shipment", path: "/shipper/create-shipment" },
    { label: "My Shipments", path: "/shipper/my-shipments" },
  ],
  CARRIER: [
    { label: "Marketplace", path: "/carrier/marketplace" },
    { label: "My Bids", path: "/carrier/my-bids" },
    { label: "Support", path: "/support" },
  ],
  CUSTOMER: [
    { label: "Track Shipment", path: "/track" },
    { label: "Support", path: "/support" },
  ],
};

const PUBLIC_NAV = [
  { label: "Home", path: "/" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Support", path: "/support" },
];

// ── component ────────────────────────────────────────────────────────────────
const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  // NEW: auth state
  const [user, setUser] = useState(null); // email from JWT sub
  const [role, setRole] = useState(null); // "SHIPPER" | "CARRIER" | "CUSTOMER"

  useEffect(() => {
    const readAuth = () => {
      const payload = getPayload();
      if (payload && !isTokenExpired(payload)) {
        setUser(payload.sub); // email stored as subject in your AuthUtil
        setRole(payload.role); // role claim you set in AuthUtil.generateAccessToken()
      } else {
        localStorage.removeItem("token");
        setUser(null);
        setRole(null);
      }
    };

    readAuth();
    // login page dispatches this event after saving the token
    window.addEventListener("authChange", readAuth);
    return () => window.removeEventListener("authChange", readAuth);
  }, []);

  // existing scroll logic — fixed lastScroll inside useEffect
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // NEW: logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setRole(null);
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  const isLoggedIn = !!user;
  const navItems = isLoggedIn ? (NAV_ITEMS[role] ?? []) : PUBLIC_NAV;

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-white z-50 
      transition-transform duration-300
      ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="flex justify-between items-center h-15 px-6 lg:px-14 lato relative">
        {/* Logo — unchanged */}
        <div
          className="flex gap-4 cursor-pointer items-center"
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon
            icon={faTruckFast}
            size="xl"
            style={{ color: "rgb(12, 113, 196)" }}
          />
          <span className="tracking-wide text-xl font-semibold poppins">
            Freightelligent
          </span>
        </div>

        {/* Desktop Menu — same look, items now come from navItems */}
        <div className="hidden lg:flex gap-15">
          {navItems.map(({ label, path }) => (
            <span
              key={label}
              className="cursor-pointer hover:underline"
              onClick={() => navigate(path)}
            >
              {label}
            </span>
          ))}

          {/* Login/Register  →  Profile + Logout once logged in */}
          {isLoggedIn ? (
            <>
              <span
                className="cursor-pointer hover:underline"
                onClick={() => navigate(`/${role.toLowerCase()}/profile`)}
              >
                Profile
              </span>
              <span
                className="cursor-pointer hover:underline text-red-500"
                onClick={handleLogout}
              >
                Logout
              </span>
            </>
          ) : (
            <span
              className="cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login/Register
            </span>
          )}
        </div>

        {/* Mobile Button — unchanged */}
        <div
          className="lg:hidden cursor-pointer text-xl"
          onClick={() => setMenu(!menu)}
        >
          <FontAwesomeIcon icon={menu ? faXmark : faBars} />
        </div>

        {/* Mobile Menu — same look, items now come from navItems */}
        <div
          className={`absolute top-full left-0 w-full bg-white shadow-md z-40 
          flex flex-col items-center gap-6 py-6 lg:hidden
          transition-all duration-300
          ${menu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
        >
          {navItems.map(({ label, path }) => (
            <span
              key={label}
              className="cursor-pointer"
              onClick={() => {
                navigate(path);
                setMenu(false);
              }}
            >
              {label}
            </span>
          ))}

          {/* Login/Register  →  Profile + Logout once logged in */}
          {isLoggedIn ? (
            <>
              <span
                className="cursor-pointer"
                onClick={() => {
                  navigate(`/${role.toLowerCase()}/profile`);
                  setMenu(false);
                }}
              >
                Profile
              </span>
              <span
                className="cursor-pointer text-red-500"
                onClick={handleLogout}
              >
                Logout
              </span>
            </>
          ) : (
            <span
              className="cursor-pointer"
              onClick={() => {
                navigate("/login");
                setMenu(false);
              }}
            >
              Login/Register
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
