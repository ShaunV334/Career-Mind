"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function Page() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <nav className="fixed top-0 w-full z-50 bg-white shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">CareerMind</h1>
            </div>
            <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Sparkles className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">You're Doing Great!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Small consistent steps lead to big progress. Keep completing your weekly tasks —
              each one brings you closer to your goals. Take a deep breath, celebrate today's wins, and come back stronger tomorrow.
            </p>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => router.push('/modules/weeklyTask')} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3">Back to Tasks</Button>
              <Button onClick={() => router.push('/')} className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3">Back Home</Button>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2025 CareerMind. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
