"use client";
import React, { useEffect, useState } from "react";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/contactus");
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8 lg:px-20">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-2">
        📩 Messages
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Here you can manage all your messages.
      </p>

      <div className="max-w-5xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading messages...
          </p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-400">No messages found.</p>
        ) : (
          <div className="grid gap-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 border border-gray-200"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {msg.name}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Email */}
                <p className="text-sm text-blue-600 mb-3 font-medium">
                  {msg.email}
                </p>

                {/* Message */}
                <p className="text-gray-700 leading-relaxed">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
