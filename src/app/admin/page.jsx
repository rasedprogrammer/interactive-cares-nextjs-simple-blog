"use client";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [unique, setUnique] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, blogsRes, visitorsRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/blogs"),
          fetch("/api/visitor"),
        ]);
        const usersData = await usersRes.json();
        const blogsData = await blogsRes.json();
        const visitorsData = await visitorsRes.json();

        setUsers(usersData);
        setBlogs(blogsData);
        setUnique(visitorsData.uniqueVisitors);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-2">
          Admin Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Overview of users, blogs, and unique visitors
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Skeleton loaders
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl shadow animate-pulse"
              >
                <div className="h-8 w-20 bg-gray-300 rounded mb-4 mx-auto"></div>
                <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
              </div>
            ))
          ) : (
            <>
              {/* Users Card */}
              <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                <h2 className="text-3xl font-bold text-gray-900 text-center">
                  {users.length}
                </h2>
                <p className="text-gray-500 text-center mt-2 font-medium">
                  👥 Users
                </p>
              </div>

              {/* Blogs Card */}
              <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                <h2 className="text-3xl font-bold text-gray-900 text-center">
                  {blogs.length}
                </h2>
                <p className="text-gray-500 text-center mt-2 font-medium">
                  📝 Blogs
                </p>
              </div>

              {/* Unique Visitors Card */}
              <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                <h2 className="text-3xl font-bold text-gray-900 text-center">
                  {unique}
                </h2>
                <p className="text-gray-500 text-center mt-2 font-medium">
                  👤 Unique Visitors
                </p>
                <p className="text-sm text-gray-400 text-center mt-1">
                  (Per Day)
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
