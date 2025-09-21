"use client";

const categories = [
  "All",
  "Technology",
  "Lifestyle",
  "Health",
  "Education",
  "Business",
  "Programming",
];

export default function Categories({ activeCategory, setActiveCategory }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-4 py-2 rounded-full border transition ${
            activeCategory === category
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-red-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
