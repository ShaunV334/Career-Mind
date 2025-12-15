"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Users } from "lucide-react";

interface Message {
  id: number;
  author: string;
  text: string;
  time: string;
}

export default function GroupDiscussionModule() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("Guest");

  // simple demo participants count derived from unique authors
  const participants = Array.from(new Set(messages.map((m) => m.author))).length || 1;

  useEffect(() => {
    // seed with a welcome message when discussion starts
    if (started && messages.length === 0) {
      setMessages([
        {
          id: 1,
          author: "Moderator",
          text: "Welcome to the group discussion — introduce yourselves and share thoughts.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }
  }, [started]);

  const handleSend = () => {
    if (!input.trim()) return;
    const next: Message = {
      id: messages.length + 1,
      author: name || "Guest",
      text: input.trim(),
      time: new Date().toLocaleTimeString(),
    };
    setMessages((s) => [...s, next]);
    setInput("");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
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

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {!started ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="mb-8">
                <MessageCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Group Discussion</h1>
                <p className="text-xl text-gray-600 mb-8">
                  Join a collaborative discussion with peers — share ideas, ask questions, and learn together.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Live</div>
                  <p className="text-gray-600">Format</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">Collaborative</div>
                  <p className="text-gray-600">Participation</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">Open</div>
                  <p className="text-gray-600">Topics</p>
                </div>
              </div>

              <p className="text-gray-600 mb-8">Discuss interview strategies, problem approaches, and resources with other learners.</p>

              <div className="space-y-3 max-w-md mx-auto">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your display name"
                  className="w-full p-3 rounded-lg border border-gray-200"
                />
                <Button
                  onClick={() => setStarted(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-3 h-auto text-lg"
                >
                  Join Discussion
                </Button>
              </div>
            </div>
          ) : !ended ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Live Group Discussion</h2>
                  <p className="text-sm text-gray-600">Participants: {participants}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-indigo-600" />
                  <Button
                    onClick={() => setEnded(true)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 h-auto"
                  >
                    End Discussion
                  </Button>
                </div>
              </div>

              <div className="mb-6 max-h-96 overflow-y-auto space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-gray-900">{m.author}</div>
                      <div className="text-xs text-gray-400">{m.time}</div>
                    </div>
                    <div className="text-gray-700">{m.text}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="flex gap-3">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Write a message..."
                    className="flex-1 p-3 rounded-lg border border-gray-200"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSend();
                    }}
                  />
                  <Button onClick={handleSend} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3">
                    Send
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="mb-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-6">
                  <div className="text-3xl font-bold text-white">{messages.length}</div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Discussion Ended</h1>
                <p className="text-xl text-gray-600">You contributed {messages.filter(m => m.author === name).length} messages during the discussion.</p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    setStarted(false);
                    setEnded(false);
                    setMessages([]);
                    setInput("");
                  }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 h-auto"
                >
                  Start New Discussion
                </Button>
                <Button onClick={() => router.back()} className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-3 h-auto">
                  Back to Home
                </Button>
              </div>
            </div>
          )}
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
