"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const aptitudeQuestions: Question[] = [
  {
    id: 1,
    question: "If a train travels 60 km in 1 hour, how far will it travel in 2.5 hours at the same speed?",
    options: ["120 km", "150 km", "180 km", "200 km"],
    correctAnswer: 1,
    explanation: "Distance = Speed × Time = 60 × 2.5 = 150 km"
  },
  {
    id: 2,
    question: "What is 15% of 200?",
    options: ["20", "30", "40", "50"],
    correctAnswer: 1,
    explanation: "15% of 200 = (15/100) × 200 = 30"
  },
  {
    id: 3,
    question: "If a book costs $12 and is on sale for 25% off, what is the final price?",
    options: ["$6", "$8", "$9", "$10"],
    correctAnswer: 2,
    explanation: "Discount = 25% of $12 = $3. Final price = $12 - $3 = $9"
  },
  {
    id: 4,
    question: "What is the next number in the sequence: 2, 4, 8, 16, ?",
    options: ["24", "28", "32", "36"],
    correctAnswer: 2,
    explanation: "Each number is doubled: 2×2=4, 4×2=8, 8×2=16, 16×2=32"
  },
  {
    id: 5,
    question: "If a container has 5 red balls and 3 blue balls, what is the probability of picking a red ball?",
    options: ["3/8", "5/8", "3/5", "5/3"],
    correctAnswer: 1,
    explanation: "Total balls = 5 + 3 = 8. Probability of red = 5/8"
  }
];

export default function AptitudeModule() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  // Timer effect
  useEffect(() => {
    if (!testStarted || testCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTestCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, testCompleted]);

  const handleAnswerClick = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);

    if (index === aptitudeQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < aptitudeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setTestCompleted(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const percentage = Math.round((score / aptitudeQuestions.length) * 100);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-800 to-amber-700 bg-clip-text text-transparent">
                CareerMind
              </h1>
            </div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-700 hover:text-rose-800 transition-colors"
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
          {/* START SCREEN */}
          {!testStarted ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="mb-8">
                <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Aptitude Test
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Challenge yourself with our carefully curated aptitude questions
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {aptitudeQuestions.length}
                  </div>
                  <p className="text-gray-600">Questions</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">
                    10 min
                  </div>
                  <p className="text-gray-600">Time Limit</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    100%
                  </div>
                  <p className="text-gray-600">Score Target</p>
                </div>
              </div>

              <p className="text-gray-600 mb-8">
                Test your quantitative reasoning, problem-solving, and analytical skills.
              </p>

              <Button
                onClick={() => setTestStarted(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-3 h-auto text-lg"
              >
                Start Test
              </Button>
            </div>
          ) : !testCompleted ? (
            // QUIZ SCREEN
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {/* PROGRESS & TIMER */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      Question {currentQuestion + 1} of {aptitudeQuestions.length}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 font-bold">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className={timeLeft < 60 ? "text-red-600" : ""}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentQuestion + 1) / aptitudeQuestions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* QUESTION */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {aptitudeQuestions[currentQuestion].question}
                </h2>

                {/* OPTIONS */}
                <div className="space-y-3">
                  {aptitudeQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={answered}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswer === index
                          ? index === aptitudeQuestions[currentQuestion].correctAnswer
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                          : answered &&
                            index === aptitudeQuestions[currentQuestion].correctAnswer
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                      } ${answered ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswer === index
                              ? index === aptitudeQuestions[currentQuestion].correctAnswer
                                ? "border-green-500 bg-green-500"
                                : "border-red-500 bg-red-500"
                              : answered &&
                                index === aptitudeQuestions[currentQuestion].correctAnswer
                              ? "border-green-500 bg-green-500"
                              : "border-gray-400"
                          }`}
                        >
                          {(selectedAnswer === index ||
                            (answered &&
                              index === aptitudeQuestions[currentQuestion].correctAnswer)) && (
                            <span className="text-white text-sm">✓</span>
                          )}
                        </div>
                        <span className="font-medium text-gray-900">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* EXPLANATION */}
              {answered && (
                <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Explanation:</p>
                  <p className="text-blue-800">
                    {aptitudeQuestions[currentQuestion].explanation}
                  </p>
                </div>
              )}

              {/* NEXT BUTTON */}
              {answered && (
                <Button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-12"
                >
                  {currentQuestion === aptitudeQuestions.length - 1 ? "Finish Test" : "Next Question"}
                </Button>
              )}
            </div>
          ) : (
            // RESULTS SCREEN
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="mb-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-6">
                  <div className="text-5xl font-bold text-white">{percentage}%</div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Test Completed!
                </h1>
                <p className="text-xl text-gray-600">
                  You scored {score} out of {aptitudeQuestions.length} questions
                </p>
              </div>

              {/* PERFORMANCE BADGE */}
              <div className="mb-8">
                {percentage >= 80 && (
                  <div className="inline-block bg-green-100 border border-green-300 rounded-lg px-6 py-3 mb-4">
                    <p className="text-green-800 font-semibold">🎉 Excellent Performance!</p>
                  </div>
                )}
                {percentage >= 60 && percentage < 80 && (
                  <div className="inline-block bg-blue-100 border border-blue-300 rounded-lg px-6 py-3 mb-4">
                    <p className="text-blue-800 font-semibold">👍 Good Job!</p>
                  </div>
                )}
                {percentage < 60 && (
                  <div className="inline-block bg-orange-100 border border-orange-300 rounded-lg px-6 py-3 mb-4">
                    <p className="text-orange-800 font-semibold">💪 Keep Practicing!</p>
                  </div>
                )}
              </div>

              {/* STATS */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-600 mb-2">Time Taken</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {formatTime(600 - timeLeft)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-600 mb-2">Accuracy</p>
                  <p className="text-3xl font-bold text-indigo-600">{percentage}%</p>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    setTestStarted(false);
                    setTestCompleted(false);
                    setCurrentQuestion(0);
                    setScore(0);
                    setAnswered(false);
                    setSelectedAnswer(null);
                    setTimeLeft(600);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 h-auto"
                >
                  Retake Test
                </Button>
                <Button
                  onClick={() => router.back()}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-3 h-auto"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          )}
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
