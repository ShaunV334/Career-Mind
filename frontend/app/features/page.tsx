"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function FeaturesPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-gray-900">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-800 to-amber-700 bg-clip-text text-transparent">
                CareerMind
              </h1>
            </div>
            
            {/* Nav Menu */}
            <ul className="hidden md:flex gap-8 items-center">
              <li>
                <a
                  className="cursor-pointer font-medium text-gray-700 hover:text-rose-800 transition-colors"
                  onClick={() => router.push("/features")}
                >
                  Features
                </a>
              </li>
            </ul>

            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-gray-700 hover:text-rose-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* FEATURES SECTION */}
      <section className="pt-32 pb-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="feature-card bg-slate-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer" onClick={() => router.push("/modules/aptitude")}>
              <div className="text-4xl font-bold text-rose-800 mb-4">📊</div>
              <h3 className="text-xl font-bold text-white mb-2">Aptitude Test</h3>
              <p className="text-gray-300">Test your quantitative reasoning and analytical skills with our curated questions.</p>
            </div>
            <div className="feature-card bg-slate-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer" onClick={() => router.push("/modules/groupDiscussion")}>
              <div className="text-4xl font-bold text-purple-600 mb-4">💬</div>
              <h3 className="text-xl font-bold text-white mb-2">Group Discussion</h3>
              <p className="text-gray-300">Join live discussions to collaborate and share insights with peers.</p>
            </div>
            <div className="feature-card bg-slate-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer" onClick={() => router.push("/modules/weeklyTask")}>
              <div className="text-4xl font-bold text-green-600 mb-4">🗓️</div>
              <h3 className="text-xl font-bold text-white mb-2">Weekly Tasks</h3>
              <p className="text-gray-300">Track and complete weekly preparation tasks to stay consistent.</p>
            </div>
            <div className="feature-card bg-slate-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-amber-700 mb-4">🎤</div>
              <h3 className="text-xl font-bold text-white mb-2">Mock Interviews</h3>
              <p className="text-gray-300">Practice with AI-powered mock interviews tailored to your industry.</p>
            </div>
            <div className="feature-card bg-slate-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer" onClick={() => router.push("/modules/resume")}>
              <div className="text-4xl font-bold text-amber-600 mb-4">📄</div>
              <h3 className="text-xl font-bold text-white mb-2">Resume Builder</h3>
              <p className="text-gray-300">Create professional ATS-friendly resumes — fill details and download as PDF.</p>
            </div>
            <div className="feature-card bg-slate-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-rose-700 mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Interview Prep</h3>
              <p className="text-gray-300">Get personalized tips and strategies for interview success.</p>
            </div>
            <div className="feature-card bg-slate-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-amber-800 mb-4">👔</div>
              <h3 className="text-xl font-bold text-white mb-2">Outfit Analysis</h3>
              <p className="text-gray-300">Get fashion advice for professional settings and interviews.</p>
            </div>

            <div className="feature-card bg-slate-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer" onClick={() => router.push("/modules/questionBank")}>
              <div className="text-4xl font-bold text-purple-600 mb-4">📚</div>
              <h3 className="text-xl font-bold text-white mb-2">Question Bank</h3>
              <p className="text-gray-300">Access a curated collection of question banks for various topics and practice sets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2025 CareerMind. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
