"use client"; // ← Add this at the very top

import React, { useEffect, useState } from "react";
import Blogitem from "../Components/Blogitem";

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mt-8 mb-12">
        ✨ All Blog Posts
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => <Blogitem key={blog._id} blog={blog} />)
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No blogs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
