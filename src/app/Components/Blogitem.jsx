"use client";
import Link from "next/link";

export default function Blogitem({ blog }) {
  return (
    <div className="flex flex-col h-full bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Blog Image */}
      <img
        src={blog.image || "/placeholder.jpg"}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />

      {/* Blog Content */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-gray-700 text-sm flex-grow line-clamp-3">
          {blog.content}
        </p>

        {/* Author + Date */}
        <div className="flex items-center mt-4">
          <img
            src={blog.authorImg || "/profile.jpg"}
            alt={blog.author}
            className="w-8 h-8 rounded-full mr-3"
          />
          <div>
            <p className="text-sm font-medium text-gray-800">{blog.author}</p>
            <p className="text-xs text-gray-500">
              {blog?.createdAt
                ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "No date"}
            </p>
          </div>
        </div>

        {/* Category + Link */}
        <div className="flex items-center justify-between mt-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
            {blog.category}
          </span>
          <Link
            href={`/blog/${blog._id}`}
            className="text-blue-600 hover:underline text-sm"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}
