"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaDiscord, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & About */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src="/logo.png" alt="Logo" width={45} height={45} />
              <span className="text-xl font-semibold text-gray-800">
                ByteWrite – Digital writing meets tech.
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              At ByteWrite, we turn coding ideas into reality. Learn how to
              build cutting-edge web apps using Next.js, TailwindCSS, and
              MongoDB through tutorials, step-by-step guides, and community
              projects. Whether you’re a beginner or an experienced developer,
              ByteNest offers inspiration and practical knowledge for every
              stage of your journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-600 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-600 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-5 text-gray-600">
              <a
                href="https://github.com/"
                target="_blank"
                className="hover:text-blue-600 transition"
              >
                <FaGithub size={22} />
              </a>
              <a
                href="https://discord.com/"
                target="_blank"
                className="hover:text-blue-600 transition"
              >
                <FaDiscord size={22} />
              </a>
              <a
                href="https://youtube.com/"
                target="_blank"
                className="hover:text-blue-600 transition"
              >
                <FaYoutube size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center">
          <span className="text-sm text-gray-500">
            © {new Date().getFullYear()}{" "}
            <Link href="/" className="hover:underline">
              codewithsinikdho™
            </Link>{" "}
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
