"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setErrorMessage(data?.error || "Something went wrong!");
      } else {
        router.push("/login");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-dvh w-full bg-gray-50 grid gap-10 grid-cols-1 md:grid-cols-2 py-12 px-4">
      {/* Form Section */}
      <div className="max-w-md w-full mx-auto mt-10 flex flex-col gap-6 px-6 py-8 items-center bg-white border border-gray-200 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-1 text-gray-800">
          Create account
        </h1>
        <p className="text-sm text-gray-600 text-center">
          Let's start with your basic information
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {/* Name + Email */}
          <div>
            <label htmlFor="name" className="block text-sm text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              placeholder="Enter your name"
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setName(e.target.value)}
            />

            <label
              htmlFor="email"
              className="block text-sm text-gray-700 mb-1 mt-4"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white rounded-lg p-2 w-full mt-4 hover:bg-blue-600 transition font-semibold"
          >
            {isLoading ? "Creating New User..." : "Sign Up"}
          </button>

          {/* Error message */}
          {errorMessage && (
            <p className="text-red-600 mt-2 text-sm">{errorMessage}</p>
          )}
        </form>

        {/* Divider */}
        <div className="w-full flex items-center gap-2 mt-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-400 text-xs">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Login Link */}
        <Link
          href="/login"
          className="text-sm text-blue-500 hover:underline mt-2"
        >
          Already have an account? Sign in
        </Link>
      </div>

      {/* Image Section */}
      <div className="hidden md:flex justify-center items-center max-h-[600px]">
        <Image
          src="/woman-laptop-standing-dark.png"
          alt="Sign Up Illustration"
          width={500}
          height={400}
          className="object-contain w-full h-full"
          priority
        />
      </div>
    </div>
  );
};

export default Page;
