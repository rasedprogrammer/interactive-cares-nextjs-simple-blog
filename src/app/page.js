"use client";

import { useState, useEffect } from "react";
import Subscribe from "./Components/Subscribe";
import Blogitem from "./Components/Blogitem";
import FeaturedPosts from "./Components/FeaturedPosts";
import Categories from "./Components/Categories";
import SearchBar from "./Components/SearchBar";
import AuthorCard from "./Components/AuthorCard";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      setBlogs(data);
      setFilteredBlogs(data);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    let updatedBlogs = [...blogs];

    // Filter by category
    if (activeCategory !== "All") {
      updatedBlogs = updatedBlogs.filter(
        (blog) => blog.category === activeCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      updatedBlogs = updatedBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBlogs(updatedBlogs);
  }, [searchQuery, activeCategory, blogs]);

  return (
    <div className="min-h-screen bg-[#FAF7F4] text-gray-900 px-6 py-16">
      {/* Header Section */}
      <header className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight text-gray-900">
          Taking control of your daily life is{" "}
          <span className="text-red-500">easy when you know how!</span>
        </h1>
        <p className="mt-4 text-gray-700 text-lg md:text-xl">
          Learn modern web development with Next.js, TailwindCSS, and MongoDB
        </p>
      </header>

      {/* Featured Posts */}
      <section className="mt-16 max-w-6xl mx-auto">
        <FeaturedPosts blogs={blogs.slice(0, 3)} />
      </section>

      {/* Categories & Search */}
      <section className="mt-16 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </section>

      {/* Blog Items Section */}
      <section className="mt-12 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center border-b border-gray-200 pb-3">
          Recent Posts
        </h2>
        <div className="grid gap-12 md:grid-cols-2">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 overflow-hidden"
            >
              <Blogitem blog={blog} />
            </div>
          ))}
        </div>
      </section>

      {/* Author Section */}
      <section className="mt-20 max-w-4xl mx-auto">
        <AuthorCard />
      </section>

      {/* Subscribe / Footer CTA */}
      <section className="mt-20 max-w-2xl mx-auto">
        <Subscribe />
      </section>
    </div>
  );
}
