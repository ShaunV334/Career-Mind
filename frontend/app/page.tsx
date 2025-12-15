"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Menu, X } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [navActive, setNavActive] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 100);

      // Active section highlight
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop;
        if (window.scrollY >= top - 100) current = section.id;
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fade animations
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".feature-card, .about-text, .about-image"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(30px)";
      (el as HTMLElement).style.transition =
        "opacity 0.6s ease-out, transform 0.6s ease-out";

      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll
  const scrollToSection = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
      setNavActive(false);
    }
  };

  return (
    <div className="w-full">
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navScrolled ? "bg-white shadow-lg" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          <div className="shrink-0">
              <a href="#" className="text-2xl font-bold text-linear-to-r from-blue-600 to-indigo-600">
                CareerMind
              </a>
            </div>

            {/* Mobile Toggle */}
            <div
              className="md:hidden cursor-pointer"
              onClick={() => setNavActive(!navActive)}
            >
              {navActive ? (
                <X className="w-6 h-6 text-gray-800" />
              ) : (
                <Menu className="w-6 h-6 text-gray-800" />
              )}
            </div>

            {/* Nav Menu */}
            <ul className={`hidden md:flex gap-8 items-center ${navActive ? "flex flex-col absolute top-16 left-0 right-0 bg-white shadow-lg p-4 gap-4" : ""}`}>
              <li>
                <a
                  className={`cursor-pointer font-medium transition-colors ${activeSection === "" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
                  onClick={() => scrollToSection("#home")}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className={`cursor-pointer font-medium transition-colors ${activeSection === "about" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
                  onClick={() => scrollToSection("#about")}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className={`cursor-pointer font-medium transition-colors ${activeSection === "features" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
                  onClick={() => scrollToSection("#features")}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  className={`cursor-pointer font-medium transition-colors ${activeSection === "contact" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
                  onClick={() => scrollToSection("#contact")}
                >
                  Contact
                </a>
              </li>
            </ul>
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all"
              >
                Login / Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="pt-32 pb-20 px-4 bg-linear-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col justify-center">
              <h1>Transform Your Career Journey With...</h1>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                <span className="text-linear-to-r from-blue-600 to-indigo-600"> CareerMind</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your AI Placement Trainer 
              </p>
              <Button
                onClick={() => setAuthModalOpen(true)}
                className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-12 w-fit text-lg"
              >
                Get Started
              </Button>
            </div>
            <div className="hidden md:flex justify-center">
              <img
                src="images/p2.jpg"
                alt="Hero"
                className="w-full max-w-md rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="about-text">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">About CareerMind</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                CareerMind is your personalised AI-driven platform designed to help
                students, job seekers, and professionals grow smarter and faster.
                We combine cutting-edge AI technology with career coaching expertise
                to accelerate your professional growth.
              </p>
            </div>
            <div className="about-image flex justify-center">
              <img
                src="images/p5.jpg"
                alt="About"
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="feature-card bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer" onClick={() => router.push("/modules/aptitude")}>
              <div className="text-4xl font-bold text-cyan-600 mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aptitude Test</h3>
              <p className="text-gray-600">Test your quantitative reasoning and analytical skills with our curated questions.</p>
            </div>
            <div className="feature-card bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-blue-600 mb-4">🎤</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mock Interviews</h3>
              <p className="text-gray-600">Practice with AI-powered mock interviews tailored to your industry.</p>
            </div>
            <div className="feature-card bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-indigo-600 mb-4">📄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Resume Builder</h3>
              <p className="text-gray-600">Create professional resumes with AI assistance and templates.</p>
            </div>
            <div className="feature-card bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-blue-500 mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Interview Prep</h3>
              <p className="text-gray-600">Get personalized tips and strategies for interview success.</p>
            </div>
            <div className="feature-card bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-purple-600 mb-4">👔</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Outfit Analysis</h3>
              <p className="text-gray-600">Get fashion advice for professional settings and interviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Contact Us</h2>
          <p className="text-xl text-gray-600 mb-8">
            Have questions? Reach out to our team.
          </p>
          <a href="mailto:careermind@gmail.com" className="inline-block">
            <Button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-12 text-lg">
              Email us at careermind@gmail.com
            </Button>
          </a>
        </div>
      </section>

      {/* AUTH MODAL */}
      {authModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-linear-to-r from-blue-600 to-indigo-600">
                  CareerMind
                </h1>
                <button
                  onClick={() => setAuthModalOpen(false)}
                  className="text-2xl text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <p className="text-center text-gray-600 mb-8">
                Your AI-powered career growth companion
              </p>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* LOGIN FORM */}
                <TabsContent value="login">
                  <form
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("Logging in…");
                    }}
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        required
                        className="w-full"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-11">
                      Login
                    </Button>
                  </form>
                </TabsContent>

                {/* SIGNUP FORM */}
                <TabsContent value="signup">
                  <form
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("Account created!");
                    }}
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        required
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        required
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        required
                        className="w-full"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-11">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2025 CareerMind. All Rights Reserved.</p>
        </div>
      </footer>
    </div>



  );
}
