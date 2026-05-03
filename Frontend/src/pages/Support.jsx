import React, { useState } from "react";
import Footer from "../components/Footer";

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "How do I track my shipment?",
    a: "Enter your Tracking ID (e.g. LOG-78429) on the homepage or navigate to /track/<your-id>. Updates are available in real-time.",
  },
  {
    q: "How do I post a shipment as a shipper?",
    a: "Log in as a Shipper, click 'Create Shipment' in the navbar, fill in load details, weight, pickup, and destination, then submit.",
  },
  {
    q: "How are carriers verified?",
    a: "All carriers go through an identity and license verification process before they can place bids on any shipment listing.",
  },
  {
    q: "What happens after I select a carrier?",
    a: "The carrier is notified, and real-time tracking is activated. You and the end customer can monitor the shipment until delivery.",
  },
];

// ─── Destination email ────────────────────────────────────────────────────────
const SUPPORT_EMAIL = "dhruvil.k1087@gmail.com";

// ─── Component ────────────────────────────────────────────────────────────────
const Support = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [openFaq, setOpenFaq] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.category) e.category = "Please select a category.";
    if (!form.message.trim()) e.message = "Message is required.";
    else if (form.message.trim().length < 20)
      e.message = "Message must be at least 20 characters.";
    return e;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${SUPPORT_EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
            _subject: `[Freightelligent Support] ${form.category} — ${form.subject}`,
            category: form.category,
            subject: form.subject,
            _captcha: "false",
          }),
        },
      );

      if (response.ok) {
        setStatus("success");
        setForm({
          name: "",
          email: "",
          subject: "",
          category: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      {/* ── Hero ── */}
      <section className="bg-white border-b border-slate-200 py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="dm-sans inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-100 rounded-full">
            We're here to help
          </span>
          <h1 className="syne text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Support Center
          </h1>
          <p className="dm-sans text-slate-500 text-[15px] leading-relaxed">
            Browse our FAQs or send us a message — our team typically responds
            within&nbsp;24&nbsp;hours.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-start">
        {/* ── FAQ ── */}
        <div>
          <h2 className="syne text-xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  className="w-full text-left flex items-center justify-between px-6 py-4 cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="dm-sans text-slate-800 text-sm font-semibold pr-4">
                    {faq.q}
                  </span>
                  <i
                    className={`fa-solid fa-chevron-down text-blue-500 text-xs transition-transform duration-200 shrink-0 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="dm-sans text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact info chips */}
          <div className="mt-8 flex flex-col gap-3">
            <p className="dm-sans text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
              Other ways to reach us
            </p>
            {[
              {
                icon: "fa-solid fa-envelope",
                label: "support@freightelligent.com",
              },
              { icon: "fa-solid fa-phone", label: "+1 (800) 555-0192" },
              {
                icon: "fa-solid fa-clock",
                label: "Mon – Fri, 9 AM – 6 PM EST",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                  <i className={`${item.icon} text-xs`} />
                </div>
                <span className="dm-sans text-slate-600 text-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Contact Form ── */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                <i className="fa-solid fa-circle-check text-green-500 text-2xl" />
              </div>
              <h3 className="syne text-slate-900 text-xl font-bold">
                Message Sent!
              </h3>
              <p className="dm-sans text-slate-500 text-sm max-w-xs leading-relaxed">
                Thanks for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="dm-sans mt-2 text-blue-600 text-sm font-semibold hover:underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h2 className="syne text-xl font-bold text-slate-900 mb-1">
                Send Us a Message
              </h2>
              <p className="dm-sans text-slate-400 text-sm mb-6">
                Fill out the form below and we'll be in touch.
              </p>

              <div className="flex flex-col gap-4">
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1">
                  <label className="dm-sans text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className={`dm-sans w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-colors ${
                      errors.category ? "border-red-400" : "border-slate-200"
                    }`}
                  >
                    <option value="">Select a category…</option>
                    <option value="Shipment Tracking">Shipment Tracking</option>
                    <option value="Billing & Payments">
                      Billing & Payments
                    </option>
                    <option value="Account & Profile">Account & Profile</option>
                    <option value="Carrier Issues">Carrier Issues</option>
                    <option value="Technical Problem">Technical Problem</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.category && (
                    <p className="dm-sans text-red-500 text-xs mt-0.5">
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <Field
                  label="Subject"
                  name="subject"
                  type="text"
                  placeholder="Brief description of your issue"
                  value={form.subject}
                  onChange={handleChange}
                  error={errors.subject}
                />

                {/* Message */}
                <div className="flex flex-col gap-1">
                  <label className="dm-sans text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe your issue in detail…"
                    className={`dm-sans w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors ${
                      errors.message ? "border-red-400" : "border-slate-200"
                    }`}
                  />
                  <div className="flex justify-between items-center mt-0.5">
                    {errors.message ? (
                      <p className="dm-sans text-red-500 text-xs">
                        {errors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className="dm-sans text-slate-400 text-xs">
                      {form.message.length} chars
                    </span>
                  </div>
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
                    <i className="fa-solid fa-triangle-exclamation text-red-500 text-sm" />
                    <p className="dm-sans text-red-600 text-sm">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="dm-sans bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors mt-1"
                >
                  {status === "loading" ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin text-sm" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <i className="fa-solid fa-paper-plane text-xs" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

// ─── Reusable Field ───────────────────────────────────────────────────────────
const Field = ({ label, name, type, placeholder, value, onChange, error }) => (
  <div className="flex flex-col gap-1">
    <label className="dm-sans text-xs font-semibold text-slate-600 uppercase tracking-wider">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`dm-sans w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
        error ? "border-red-400" : "border-slate-200"
      }`}
    />
    {error && <p className="dm-sans text-red-500 text-xs mt-0.5">{error}</p>}
  </div>
);

export default Support;
