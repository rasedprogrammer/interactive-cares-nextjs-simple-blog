"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, signIn, useSession } from "next-auth/react";

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  // Helper to check if user is admin
  const isAdmin = session?.user?.role === "admin";

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-xl font-bold text-gray-900">Qurno</span>
          </Link>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4 md:order-2">
          {session ? (
            <div className="flex items-center space-x-4">
              {/* Show Avatar only if Admin, else show name */}
              {isAdmin ? (
                <Link href="/admin">
                  <Image
                    src={session.user?.image || "/avater.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer border border-gray-300 hover:scale-105 transition"
                  />
                </Link>
              ) : (
                <span className="text-gray-700 font-medium">
                  {session.user?.name || "User"}
                </span>
              )}

              {/* Logout Button */}
              <button
                onClick={() => signOut()}
                className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition"
            >
              Login
            </button>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 md:hidden"
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger Icon */}
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="flex flex-col mt-4 space-y-2 md:space-y-0 md:flex-row md:space-x-8 md:mt-0 text-gray-700 font-medium">
            <li>
              <Link href="/" className="hover:text-red-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-red-500 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-red-500 transition">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-red-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
