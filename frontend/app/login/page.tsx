"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center p-8">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=800&h=800&fit=crop"
          alt="Career Growth"
          className="w-full h-full object-cover rounded-lg max-w-md"
        />
      </div>

      {/* Right Side - Login/Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16">
        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-light text-center mb-8">
              <span className="text-blue-200">Career</span>
              <span className="text-blue-300">Mind</span>
            </h1>

            {/* Tabs */}
            <div className="flex gap-12 justify-center mb-8">
              <button
                onClick={() => setActiveTab("login")}
                className={`text-2xl font-light transition-colors ${
                  activeTab === "login"
                    ? "text-blue-400"
                    : "text-blue-200 hover:text-blue-300"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`text-2xl font-light transition-colors ${
                  activeTab === "signup"
                    ? "text-blue-400"
                    : "text-blue-200 hover:text-blue-300"
                }`}
              >
                SignUp
              </button>
            </div>
          </div>

          {/* Login Form */}
          {activeTab === "login" && (
            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Logging in…");
              }}
            >
              <div className="space-y-2">
                <label className="block text-sm text-blue-300 underline">
                  Enter your email:
                </label>
                <input
                  type="email"
                  placeholder=""
                  required
                  className="w-full bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 pb-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm text-blue-300 underline">
                    Enter password:
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:text-blue-400 text-blue-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  required
                  className="w-full bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 pb-2"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg mt-8"
              >
                Login
              </Button>

              <div className="flex items-center gap-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="text-gray-400 text-sm">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <div className="text-center pt-4">
                <a href="#" className="text-blue-300 hover:text-blue-400 underline text-sm">
                  Create new account
                </a>
              </div>
            </form>
          )}

          {/* Signup Form */}
          {activeTab === "signup" && (
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Account created!");
              }}
            >
              <div className="space-y-2">
                <label className="block text-sm text-blue-300 underline">
                  Full Name:
                </label>
                <input
                  type="text"
                  placeholder=""
                  required
                  className="w-full bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 pb-2"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-blue-300 underline">
                  Enter your email:
                </label>
                <input
                  type="email"
                  placeholder=""
                  required
                  className="w-full bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 pb-2"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-blue-300 underline">
                  Create password:
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  required
                  className="w-full bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 pb-2"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-blue-300 underline">
                  Confirm password:
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  required
                  className="w-full bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 pb-2"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg mt-8"
              >
                Sign Up
              </Button>

              <div className="flex items-center gap-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="text-gray-400 text-sm">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <div className="text-center pt-4">
                <a href="#" className="text-blue-300 hover:text-blue-400 underline text-sm">
                  Already have an account? Login
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
