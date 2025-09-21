"use client";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="w-full md:w-1/3">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search posts..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
      />
    </div>
  );
}
