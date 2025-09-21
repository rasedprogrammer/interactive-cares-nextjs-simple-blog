"use client";

import { useState, useEffect } from "react";
import Subscribe from "./Components/Subscribe";
import Blogitem from "./Components/Blogitem";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F4] text-gray-900 px-6 py-16">
      {/* Header Section */}
      <header className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight text-gray-900">
          Taking control of your daily life is{" "}
          <span className="text-red-500">easy when you know how!</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 italic">
          .Recent posts.
        </p>
      </header>

      {/* Subscribe Section */}
      <section className="mt-12 max-w-2xl mx-auto">
        <Subscribe />
      </section>

      {/* Blog Items Section */}
      <section className="mt-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center border-b border-gray-200 pb-3">
          Recent Posts
        </h2>
        <div className="grid gap-12 md:grid-cols-2">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 overflow-hidden"
            >
              <Blogitem blog={blog} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
