"use client";
import React from "react";

const AboutSection = () => {
  return (
    <section className="relative bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      {/* Container */}
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
          About Us
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          We are a passionate team committed to delivering the best solutions
          for our clients. Our focus on innovation, creativity, and
          collaboration ensures that every project we work on achieves
          excellence.
        </p>

        {/* Features / Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mx-auto">
              {/* Icon: Light Bulb */}
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 3a1 1 0 00-2 0v1H7v2h6V4h-2V3z" />
                <path
                  fillRule="evenodd"
                  d="M10 2a5 5 0 00-5 5c0 1.38.56 2.63 1.464 3.536A5 5 0 0010 14a5 5 0 003.536-1.464A5 5 0 0015 7a5 5 0 00-5-5zm0 11a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Innovation
            </h3>
            <p className="text-gray-600 text-center">
              We leverage cutting-edge technology and fresh ideas to stay ahead
              in our industry.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto">
              {/* Icon: Team */}
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 7a3 3 0 11-6 0 3 3 0 016 0zM7 14a7 7 0 0114 0v1H0v-1a7 7 0 017-7h6a7 7 0 01-6 7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Collaboration
            </h3>
            <p className="text-gray-600 text-center">
              Our team works together seamlessly, blending diverse skills to
              deliver outstanding results.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mx-auto">
              {/* Icon: Star */}
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 15l-5.878 3.09L5.82 11.545 1 7.91l6.06-.91L10 2l2.94 5l6.06.91l-4.82 3.636l1.698 6.545z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Excellence
            </h3>
            <p className="text-gray-600 text-center">
              We aim for the highest standards in everything we do, ensuring
              client satisfaction and long-term success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
