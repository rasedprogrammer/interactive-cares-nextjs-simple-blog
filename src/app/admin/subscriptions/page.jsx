"use client";
import { useEffect, useState } from "react";

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch("/api/Subscriptions");
        if (!response.ok) throw new Error("Failed to fetch subscriptions");

        const data = await response.json();

        // Normalize MongoDB data if needed
        const formattedData = data.map((sub) => ({
          id: sub._id?.$oid || sub._id,
          email: sub.email,
          createdAt: new Date(
            sub.createdAt?.$date?.$numberLong || sub.createdAt
          ),
        }));

        setSubscriptions(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
          📧 Subscribed Emails
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Here's a list of users who have subscribed to your newsletter.
        </p>

        {loading && (
          <p className="text-center text-gray-500 animate-pulse">Loading...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="space-y-4">
            {subscriptions.length > 0 ? (
              subscriptions.map((sub, index) => (
                <div
                  key={sub.id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center border border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-gray-700 w-6 text-center">
                      {index + 1}.
                    </span>
                    <div>
                      <p className="text-gray-900 font-medium">{sub.email}</p>
                      <p className="text-sm text-gray-500">
                        Subscribed on:{" "}
                        {sub.createdAt.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    ID: {sub.id.slice(0, 6)}...
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No subscriptions yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
