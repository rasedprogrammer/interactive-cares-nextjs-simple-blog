"use client";

import Blogitem from "./Blogitem";

export default function FeaturedPosts({ blogs }) {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center border-b border-gray-200 pb-3">
        Featured Posts
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 overflow-hidden"
          >
            <Blogitem blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}
