"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import CommentSection from "@/app/Components/CommentSection";

export default function BlogClientPage({ params }) {
  const id = params.id;

  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/blogs/${id}`);
      if (!response.ok) throw new Error("Blog not found");
      const blog = await response.json();
      setData(blog);
    } catch (err) {
      console.error(err);
      setData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700 animate-pulse">Loading blog...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 sm:p-12">
        {/* Blog Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-snug mb-6">
          {data.title}
        </h1>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <span>
            ✍️ Author:{" "}
            <span className="font-semibold text-gray-800">
              {data.author || "Unknown"}
            </span>
          </span>
          <span>
            📅 {new Date(data.createdAt || Date.now()).toLocaleDateString()}
          </span>
        </div>

        {/* Thumbnail Image */}
        {data.image && (
          <div className="mb-8">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-80 object-cover rounded-xl shadow-md"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none leading-relaxed text-gray-800">
          <p className="text-lg">{data.content}</p>
        </div>

        {/* Tags Section */}
        {data.tags && data.tags.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              📌 Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer: Copy & Share */}
        <div className="mt-10 flex items-center gap-4">
          <Button
            className="text-black"
            color="primary"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setIsVisible(true);
              setTimeout(() => setIsVisible(false), 3000);
            }}
          >
            📋 Copy Link
          </Button>

          <Button
            className="text-black"
            color="success"
            onClick={async () => {
              if (navigator.share) {
                await navigator.share({
                  title: data.title,
                  text: "Check out this blog!",
                  url: window.location.href,
                });
              } else {
                alert("Sharing is not supported in this browser.");
              }
            }}
          >
            🔗 Share
          </Button>
        </div>

        <CommentSection blogId={data._id} />

        {/* Success Toast */}
        {isVisible && (
          <div className="fixed top-4 right-4 z-50">
            <div
              className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-700 bg-white rounded-lg shadow-sm"
              role="alert"
            >
              <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="sr-only">Check icon</span>
              </div>
              <div className="ms-3 text-sm font-normal">
                Text copied successfully.
              </div>
              <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
                aria-label="Close"
                onClick={() => setIsVisible(false)}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
