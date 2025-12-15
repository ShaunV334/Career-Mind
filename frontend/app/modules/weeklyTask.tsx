"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarCheck } from "lucide-react";

interface TaskItem {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export default function WeeklyTaskModule() {
  const router = useRouter();
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, title: "Review mock interview notes", description: "Summarize strengths & weaknesses", completed: false },
    { id: 2, title: "Complete 3 aptitude problems", description: "Focus on time management", completed: false },
    { id: 3, title: "Update resume section", description: "Add latest project achievements", completed: false },
    { id: 4, title: "Research company roles", description: "Identify target roles and skills", completed: false },
    { id: 5, title: "Practice group discussion topic", description: "Prepare talking points", completed: false },
  ]);

  const completedCount = tasks.filter((t) => t.completed).length;

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const resetWeek = () => {
    setTasks((prev) => prev.map((t) => ({ ...t, completed: false })));
  };

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
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center mb-8">
            <CalendarCheck className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Weekly Tasks</h1>
            <p className="text-xl text-gray-600 mb-6">A focused weekly task list to keep your preparation on track. Mark tasks complete as you finish them.</p>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
                <p className="text-gray-600">Tasks</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-indigo-600">{completedCount}</div>
                <p className="text-gray-600">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">This Week</h2>

            <div className="space-y-4 mb-6">
              {tasks.map((task) => (
                <div key={task.id} className={`p-4 rounded-lg border ${task.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-100"}`}>
                  <div className="flex items-start justify-between">
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{task.title}</div>
                      {task.description && <div className="text-sm text-gray-600">{task.description}</div>}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} className="w-5 h-5" />
                        <span className="text-sm text-gray-700">Done</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button onClick={resetWeek} className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3">Reset Week</Button>
              <Button onClick={() => router.push('/modules/weeklyTask/motivate')} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3">Motivate Me</Button>
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
