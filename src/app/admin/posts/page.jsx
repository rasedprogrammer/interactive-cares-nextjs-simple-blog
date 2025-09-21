"use client";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to load posts", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPosts(posts.filter((post) => post._id !== id));
        alert("✅ Blog deleted successfully!");
      } else {
        alert("❌ Failed to delete blog");
      }
    } catch (error) {
      alert("⚠️ Something went wrong!");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-500 text-lg animate-pulse">
        Loading...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
          Admin Dashboard
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">All Posts</h2>

        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-lg border border-gray-200 transition"
              >
                {/* Author Info */}
                <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                  <img
                    src={post.authorImg || "/default-avatar.png"}
                    alt={post.author}
                    className="w-12 h-12 rounded-full border border-gray-300 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ✍️ {post.author} | 📌 {post.category}
                    </p>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(post._id)}
                  className="mt-2 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
