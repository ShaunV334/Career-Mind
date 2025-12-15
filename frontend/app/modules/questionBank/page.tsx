"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function QuestionBankModule() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CareerMind
              </h1>
            </div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="mb-8">
              <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Question Banks
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Access a curated collection of question banks for various topics and practice sets.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-blue-600 mb-2">Aptitude</h2>
                <p className="text-gray-600">Practice quantitative and logical reasoning questions.</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-indigo-600 mb-2">Group Discussion</h2>
                <p className="text-gray-600">Explore common group discussion topics and sample questions.</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-purple-600 mb-2">Resume</h2>
                <p className="text-gray-600">Find resume-building questions and tips.</p>
              </div>
              <div className="bg-pink-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-pink-600 mb-2">Technical</h2>
                <p className="text-gray-600">Access technical interview question banks.</p>
              </div>
            </div>
            <Button
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-3 h-auto text-lg"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2025 CareerMind. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
