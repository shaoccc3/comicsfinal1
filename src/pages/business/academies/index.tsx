"use client";

import React from "react";
import Link from "next/link"; // 導入 Next.js 的 Link 元件來處理頁面跳轉
import DashboardLayout from "@/components/layouts/dashboard";

// Card component with navigation and CSS gradient background
const AssetCard = ({
  title,
  icon,
  gradient,
  href,
}: {
  title: string;
  icon: JSX.Element;
  gradient: string;
  href: string;
}) => (
  <Link href={href} legacyBehavior>
    <a
      className="block bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent 
                 transform hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500 transition-all duration-300
                 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      {/* Visual part of the card using CSS gradient */}
      <div
        className={`h-40 flex items-center justify-center text-white ${gradient}`}
      >
        <div className="transform scale-150 opacity-80">{icon}</div>
      </div>
      {/* Text part of the card */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 text-center">{title}</h3>
      </div>
    </a>
  </Link>
);

// Main Page Component
const LearningAssetsPage = () => {
  // Data updated with CSS gradients and slugs for URL paths
  const industryCards = [
    {
      title: "Medical Aesthetics",
      slug: "medical-aesthetics",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
      gradient: "bg-gradient-to-br from-pink-400 to-purple-500",
    },
    {
      title: "Traditional Chinese Medicine",
      slug: "tcm",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 01-1.423.547l-1.352-.27a2 2 0 01-1.423-.547a2 2 0 00-1.806.547a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L.55 15.21a2 2 0 00-1.806.547"
            transform="translate(2 5)"
          />
        </svg>
      ),
      gradient: "bg-gradient-to-br from-green-400 to-teal-500",
    },
    {
      title: "Insurance",
      slug: "insurance",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
    },
    {
      title: "Law",
      slug: "law",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.75 3.75v16.5h16.5"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.75 3.75L12 12l8.25-8.25"
          />
        </svg>
      ),
      gradient: "bg-gradient-to-br from-gray-700 to-gray-900",
    },
    {
      title: "Finance",
      slug: "finance",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
    },
    {
      title: "Technology",
      slug: "technology",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      gradient: "bg-gradient-to-br from-purple-600 to-blue-700",
    },
  ];

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* --- Header Section (No changes) --- */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl overflow-hidden mb-16">
            <div className="relative p-8 sm:p-14">
              <div className="absolute inset-0 bg-black opacity-25"></div>
              <div className="relative">
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
                  Revolutionize Your Learning
                </h1>
                <p className="mt-4 text-xl text-indigo-100 max-w-3xl">
                  Unlock potential with our learning hub, offering smart
                  insights, interactive lessons, and collaborative tools.
                </p>
                <div className="mt-10 sm:max-w-xl">
                  <div className="flex rounded-lg shadow-sm">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-12 pr-5 py-4 border-0 rounded-l-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-base"
                        placeholder="Create Your Own Learning Assets..."
                      />
                    </div>
                    <button
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-r-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 px-6 py-3 transition-all transform hover:scale-105"
                      aria-label="Create Asset"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Industry Cards Section --- */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Explore by Industry
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {industryCards.map((card) => (
                <AssetCard
                  key={card.title}
                  title={card.title}
                  icon={card.icon}
                  gradient={card.gradient}
                  href={`/industry/${card.slug}`} // Constructing the URL
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LearningAssetsPage;
