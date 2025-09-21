"use client";

export default function AuthorCard() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center">
      <img
        src="/Rased.jpg"
        alt="Author"
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h3 className="text-xl font-bold mb-1">Md. Rased Molla</h3>
      <p className="text-gray-600 mb-3">
        Web developer and tech enthusiast. Sharing tutorials, guides, and
        open-source projects to help developers grow.
      </p>
      <div className="flex gap-4">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          className="text-gray-500 hover:text-gray-900"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/yourusername"
          target="_blank"
          className="text-gray-500 hover:text-gray-900"
        >
          Twitter
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          className="text-gray-500 hover:text-gray-900"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
