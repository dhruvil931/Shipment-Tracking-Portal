import React, { useEffect } from "react";

const marketplace = ["Find Loads", "Post Shipment", "Pricing", "Carriers List"];
const support = [
  "Help Center",
  "API Documentation",
  "Terms of Service",
  "Privacy Policy",
];

export default function Footer() {
  return (
    <footer
      style={{ background: "#0a0f1e" }}
      className="dm-sans px-6 pt-16 pb-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Top Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <div className="flex items-center gap-0.1">
              <i className="fa-solid fa-truck text-blue-500 text-lg" />
              <span className="syne text-lg font-extrabold tracking-tight">
                <span className="text-white">FREIGHT</span>
                <span className="text-blue-500">ELLIGENT</span>
              </span>
            </div>

            {/* Tagline */}
            <p className="text-slate-400 text-sm leading-relaxed max-w-65">
              Leading the digital transformation of the global freight
              marketplace with tracking system.
            </p>
          </div>

          {/* Marketplace links */}
          <div>
            <h4 className="syne text-white text-sm font-bold mb-6 tracking-wide">
              Marketplace
            </h4>
            <ul className="flex flex-col gap-3.5">
              {marketplace.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="syne text-white text-sm font-bold mb-6 tracking-wide">
              Support
            </h4>
            <ul className="flex flex-col gap-3.5">
              {support.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-white/[0.07]" />

        {/* ── Bottom Row ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-7">
          <p className="text-slate-500 text-xs">
            © 2026 Freightelligent Marketplace. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="dm-mono text-slate-500 text-xs flex items-center gap-1.5">
              <i className="fa-solid fa-location-dot text-slate-600" />
              India
            </span>
            <span className="text-slate-500 text-xs flex items-center gap-1.5">
              <i className="fa-solid fa-circle text-green-400 text-[6px]" />
              95% System Uptime
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
