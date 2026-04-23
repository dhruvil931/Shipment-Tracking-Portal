import React, { useState } from "react";
import Footer from "../components/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const stakeholders = [
  {
    label: "SHIPPER",
    icon: "fa-solid fa-box",
    items: ["Quickly find available carriers", "Compare transportation bids", "Track shipments continuously"],
  },
  {
    label: "CARRIER",
    icon: "fa-solid fa-truck",
    items: ["Access new transport opportunities", "Bid for shipment loads", "Manage transport jobs efficiently"],
  },
  {
    label: "CUSTOMER",
    icon: "fa-solid fa-location-dot",
    items: ["Receive accurate shipment updates", "Track delivery progress", "View shipment location on map"],
  },
];

const steps = [
  { number: "01", icon: "fa-solid fa-file-arrow-up",  iconBg: "#fff7ed", iconColor: "#ea580c", title: "Post a Shipment",  desc: "Enter your load details, weight, and destination in seconds." },
  { number: "02", icon: "fa-solid fa-gavel",           iconBg: "#eff6ff", iconColor: "#2563eb", title: "Receive Bids",     desc: "Verified carriers place competitive bids on your marketplace posting." },
  { number: "03", icon: "fa-solid fa-circle-check",    iconBg: "#fff7ed", iconColor: "#ea580c", title: "Select Carrier",  desc: "Review ratings, history, and price to pick the best carrier." },
  { number: "04", icon: "fa-solid fa-satellite-dish",  iconBg: "#eff6ff", iconColor: "#2563eb", title: "Track Real-Time", desc: "Watch your shipment move on the map until it reaches the door." },
];

const featureCards = [
  {
    icon: "fa-solid fa-gears",
    rotate: "group-hover:rotate-6",
    title: "Digital Freight Marketplace",
    desc: "Instantly connect shippers and carriers through intelligent matching. Post loads in seconds and access a verified network with transparent pricing.",
    gradient: false,
  },
  {
    icon: "fa-solid fa-map-location-dot",
    rotate: "group-hover:scale-110",
    title: "Geo-Based Shipment Tracking",
    desc: "Track shipments using real-time latitude and longitude coordinates. Get precise location updates and route-level visibility without manual calls.",
    gradient: true,
  },
  {
    icon: "fa-solid fa-shield-halved",
    rotate: "group-hover:-rotate-6",
    title: "Secure Logistics",
    desc: "Built with trust at the core. From verified carriers to secure transactions, every step is designed to keep your cargo and operations safe.",
    gradient: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const Landing = () => {
  const [trackingId, setTrackingId] = useState("");

  const handleTrack = () => {
    if (trackingId.trim()) alert(`Tracking: ${trackingId}`);
  };

  return (
    <div className="bg-slate-100">

      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen flex items-center px-4 py-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

            {/* Left Image */}
            <div className="w-full md:w-[42%] fade-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-4/3">
                <img src="/truck.jpg" alt="truck" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full md:w-[58%] flex flex-col gap-5">
              <h1 className="syne text-slate-900 text-4xl md:text-[2.75rem] leading-[1.05] tracking-tight fade-2">
                Smart Freight<br />
                Marketplace with<br />
                Real-Time<br />
                Shipment Tracking
              </h1>

              <p className="dm-sans text-slate-500 text-[15px] leading-relaxed max-w-sm fade-3">
                Connecting shippers and carriers with maximum efficiency, full transparency, and advanced digital tools.
              </p>

              {/* Tracking Input */}
              <div className="fade-4">
                <p className="dm-sans text-blue-600 text-[11px] font-semibold uppercase tracking-widest mb-2">
                  Track Your Shipment
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2.5 flex-1 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                    <i className="fa-solid fa-magnifying-glass text-slate-400 text-sm shrink-0" />
                    <input
                      type="text"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                      placeholder="Enter Tracking ID (e.g. LOG-78429)"
                      className="dm-sans ml-2 bg-transparent text-sm text-slate-700 placeholder-slate-400 w-full outline-none"
                    />
                  </div>
                  <button
                    onClick={handleTrack}
                    className="dm-sans bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2.5 text-sm font-medium flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    Track <i className="fa-solid fa-arrow-right text-xs" />
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center gap-3 fade-5">
                <button className="dm-sans bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2.5 text-sm font-medium cursor-pointer transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-plus text-xs" /> Post Shipment
                </button>
                <button className="dm-sans border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 rounded-xl px-6 py-2.5 text-sm font-medium cursor-pointer transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-list text-xs" /> Browse Loads
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="relative py-24 px-6 overflow-hidden bg-slate-50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-10" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="dm-sans inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-100 rounded-full">
              Next-Gen Logistics
            </span>
            <h2 className="syne text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Streamline Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">
                Supply Chain
              </span>
            </h2>
            <p className="dm-sans text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Experience a smarter logistics platform built for speed, transparency, and precise shipment visibility.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featureCards.map((card, i) => (
              <div key={i} className="relative group p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                {!card.gradient && (
                  <div className="absolute inset-0 bg-linear-to-b from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                )}
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg ${card.rotate} transition-transform ${card.gradient ? "bg-linear-to-tr from-blue-400 to-indigo-500" : "bg-blue-600"}`}>
                    <i className={`${card.icon} text-white text-xl`} />
                  </div>
                  <h3 className="syne text-xl font-bold text-slate-900 mb-4">{card.title}</h3>
                  <p className="dm-sans text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STAKEHOLDER SECTION ================= */}
      <section className="bg-slate-100 relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(37,99,235,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.04) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="absolute pointer-events-none" style={{ top: "-80px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "260px", background: "radial-gradient(ellipse,rgba(37,99,235,.1) 0%,transparent 70%)" }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <p className="dm-mono text-blue-600 text-[11px] font-bold tracking-[0.12em] uppercase mb-2">
            // PLATFORM_BENEFITS
          </p>
          <h2 className="syne text-slate-900 font-extrabold tracking-tight mb-14" style={{ fontSize: "clamp(1.8rem,3.5vw,2.4rem)" }}>
            Built for Every Stakeholder
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {stakeholders.map((s, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm transition-all duration-300 cursor-default hover:-translate-y-1 hover:bg-blue-50 hover:border-blue-200 hover:shadow-[0_12px_32px_rgba(37,99,235,0.12)]">
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-[10px] bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                    <i className={`${s.icon} text-sm`} />
                  </div>
                  <span className="dm-sans text-slate-900 text-xs font-bold tracking-widest uppercase">{s.label}</span>
                </div>
                <div className="flex flex-col gap-3.5">
                  {s.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="dm-mono text-blue-600 text-[11px] font-bold tracking-wider pt-0.5 min-w-5">0{j + 1}</span>
                      <span className="dm-sans text-slate-500 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section className="bg-slate-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="dm-sans text-blue-600 text-xs font-semibold uppercase tracking-widest mb-2">How It Works</p>
            <h2 className="syne text-slate-900 font-extrabold tracking-tight" style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)" }}>
              4 Easy Steps to Ship
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div key={i} className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-100 overflow-hidden">
                <span className="dm-mono absolute top-3 right-4 font-bold select-none pointer-events-none" style={{ fontSize: "3.5rem", lineHeight: 1, color: "#e2e8f0", letterSpacing: "-0.04em" }}>
                  {step.number}
                </span>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: step.iconBg, color: step.iconColor }}>
                  <i className={`${step.icon} text-base`} />
                </div>
                <h3 className="syne text-slate-900 font-bold text-base mb-2">{step.title}</h3>
                <p className="dm-sans text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* ================= GLOBAL STYLES ================= */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-1 { animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; animation-delay: 0ms;   }
        .fade-2 { animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; animation-delay: 80ms;  }
        .fade-3 { animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; animation-delay: 160ms; }
        .fade-4 { animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; animation-delay: 240ms; }
        .fade-5 { animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; animation-delay: 320ms; }
      `}</style>
    </div>
  );
};

export default Landing;