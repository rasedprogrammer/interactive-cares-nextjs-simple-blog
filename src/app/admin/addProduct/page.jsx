"use client";

import { useState, useRef } from "react";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    authorImg: "",
    author: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const [blogPreview, setBlogPreview] = useState(null);
  const [authorPreview, setAuthorPreview] = useState(null);

  const blogFileRef = useRef(null);
  const authorFileRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (fieldName === "image") setBlogPreview(URL.createObjectURL(file));
    if (fieldName === "authorImg") setAuthorPreview(URL.createObjectURL(file));

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();
      if (res.ok) setFormData((prev) => ({ ...prev, [fieldName]: data.url }));
      else {
        setMessage("❌ Image upload failed!");
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Something went wrong while uploading image!");
      setError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError(false);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ Blog added successfully!");
        setFormData({
          title: "",
          content: "",
          image: "",
          category: "",
          authorImg: "",
          author: "",
        });
        setBlogPreview(null);
        setAuthorPreview(null);
        if (blogFileRef.current) blogFileRef.current.value = "";
        if (authorFileRef.current) authorFileRef.current.value = "";
      } else {
        setMessage("❌ Failed to add blog!");
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Something went wrong!");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        ✍️ Add New Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Blog Image Upload */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Blog Image
          </label>
          <input
            type="file"
            accept="image/*"
            ref={blogFileRef}
            onChange={(e) => handleImageUpload(e, "image")}
            className="w-full p-3 rounded-lg border border-gray-300 outline-none"
            required
          />
          {blogPreview && (
            <img
              src={blogPreview}
              alt="blog preview"
              className="mt-3 rounded-lg w-40 h-40 object-cover"
            />
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>
              -- Select a Category --
            </option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
            <option value="Programming">Programming</option>
          </select>
        </div>

        {/* Author Image Upload */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Author Image
          </label>
          <input
            type="file"
            accept="image/*"
            ref={authorFileRef}
            onChange={(e) => handleImageUpload(e, "authorImg")}
            className="w-full p-3 rounded-lg border border-gray-300 outline-none"
            required
          />
          {authorPreview && (
            <img
              src={authorPreview}
              alt="author preview"
              className="mt-3 rounded-full w-20 h-20 object-cover"
            />
          )}
        </div>

        {/* Author */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          {loading ? "Submitting..." : "Add Blog"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-5 text-center font-medium ${
            error ? "text-red-500" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
