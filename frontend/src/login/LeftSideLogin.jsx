import React from "react";
import { PiggyBank, Trophy, Flame } from "lucide-react"; // or your preferred icon library
import Logo from "../assets/images/Wisume-Logo.png";

const LeftSideLogin = () => {
  const features = [
    {
      icon: <PiggyBank className="w-8 h-8 text-yellow-400" />,
      title: "Save time with hassle-free templates",
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-400" />,
      title: "Beat the competition using actionable, contextual advice",
    },
    {
      icon: <Flame className="w-8 h-8 text-yellow-400" />,
      title: "Highlight key achievements with memorable visuals",
    },
  ];

  return (
    <div className="min-h-screen bg-[#2f5bf887]">
      {/* Navigation */}
      <nav className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            <div className="flex items-center">
              {/* Logo */}
              <a href="/" className="flex items-center">
                <span className="text-emerald-500 text-2xl font-bold">
                  <img src={Logo} alt="" height={50} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center ">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-400 mb-8 leading-tight">
              Create a resume you
              <br />
              are proud of
            </h1>
          </div>

          {/* Features Section */}
          <div className="w-[90%] lg:w-[70%] space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4
                 p-0 rounded-lg transition-colors duration-300"
              >
                <div className="flex-shrink-0">{feature.icon}</div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl text-gray-200">
                    {feature.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="w-[90%] lg:w-[70%]  mt-8 text-center">
            <p className="text-lg text-white">
              Get inspired by{" "}
              <a
                href="/templates"
                className="text-yellow-400 hover:text-red-500 font-medium"
              >
                1800+ Free Resume Examples and Templates
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeftSideLogin;
