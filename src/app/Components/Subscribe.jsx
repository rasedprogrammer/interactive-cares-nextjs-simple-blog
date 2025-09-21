"use client";
import { useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // "success" | "error" | ""
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/Subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("✅ Subscription successful!");
        setEmail(""); // clear input
      } else {
        setStatus("❌ Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("⚠️ Something went wrong. Try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto mt-6 w-full max-w-lg">
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full bg-white shadow-sm">
        <span className="px-3 text-gray-500">
          <img src="/email.png" alt="email icon" className="h-5 w-6" />
        </span>

        <input
          type="email"
          placeholder="Enter your email"
          aria-label="Email address"
          className="w-full px-3 py-3 text-gray-800 bg-white focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={handleSubscribe}
          type="button"
          disabled={loading}
          className={`px-5 py-3 font-medium transition ${
            loading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </div>

      {status && (
        <p
          className={`mt-3 text-sm ${
            status.includes("✅")
              ? "text-green-600"
              : status.includes("❌")
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
};

export default Subscribe;
