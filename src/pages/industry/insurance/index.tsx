"use client";

import React from "react";
import Link from "next/link"; // Make sure Link is imported
import DashboardLayout from "@/components/layouts/dashboard";

// --- Re-usable Components for this Page ---

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: JSX.Element;
  value: string;
  label: string;
}) => (
  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50">
    <div className="flex items-center space-x-4">
      <div className="bg-indigo-100 text-indigo-600 rounded-full p-3">
        {icon}
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  </div>
);

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="text-blue-500 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const ModuleCard = ({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) => (
  <Link href={href} legacyBehavior>
    <a
      className="block bg-gradient-to-br from-gray-700 to-gray-900 p-6 rounded-xl shadow-lg
                    text-white transform hover:scale-105 hover:shadow-2xl transition-all duration-300
                    focus:outline-none focus:ring-4 focus:ring-blue-400"
    >
      <h4 className="font-bold text-lg">{title}</h4>
      <p className="text-sm text-gray-300 mt-2">{description}</p>
      <div className="text-right text-blue-400 font-semibold mt-4">
        Learn More &rarr;
      </div>
    </a>
  </Link>
);

// --- Main Insurance Industry Page Component ---

export default function InsuranceIndustryPage() {
  const keyStats = [
    {
      value: "$6.3T",
      label: "Global Market Size (Est.)",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.7 9a9 9 0 0110.6 0"
          />
        </svg>
      ),
    },
    {
      value: "InsurTech",
      label: "Fastest Growing Sector",
      icon: (
        <svg
          className="w-6 h-6"
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
    },
    {
      value: "2.8M+",
      label: "Jobs in the U.S. Alone",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  const coreConcepts = [
    {
      title: "Principles of Risk Management",
      description:
        "Understand how insurers identify, analyze, and mitigate risk to maintain solvency and profitability.",
      icon: (
        <svg
          className="w-8 h-8"
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
    },
    {
      title: "Insurance Products & Lines",
      description:
        "Explore the main categories: Life, Health, Property & Casualty, and specialized commercial lines.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
    },
    {
      title: "Underwriting & Claims",
      description:
        "Learn the core processes of evaluating applications and managing claim submissions and payouts.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      title: "InsurTech & Innovation",
      description:
        "Discover how AI, big data, and IoT are transforming the industry, from product creation to customer service.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
  ];

  const featuredModules = [
    {
      title: "AI in Claims Processing",
      description:
        "An in-depth look at how machine learning automates and improves claim accuracy.",
      href: "/modules/ai-claims",
    },
    {
      title: "Regulatory Tech (RegTech)",
      description:
        "Understand the technology helping firms meet compliance and reporting standards.",
      href: "/modules/regtech",
    },
    {
      title: "Cybersecurity Insurance",
      description:
        "Analyze the growing market for protecting businesses against digital threats.",
      href: "/modules/cyber-insurance",
    },
  ];

  return (
    <DashboardLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* --- Hero Section --- */}
        <div className="bg-gradient-to-b from-white to-indigo-50">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Insurance Industry</span>
              <span className="block text-indigo-600">
                Learning & Development Hub
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
              Dive into the world of insurance. From core principles to the
              latest in InsurTech, start your journey here. Create custom AI
              assistants to guide you.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              {/* --- MODIFIED BUTTON --- */}
              <Link href="/workspace" legacyBehavior>
                <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-transform">
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  Create Your Learning Assets
                </a>
              </Link>
              <Link href="/modules/insurance" legacyBehavior>
                <a className="inline-flex items-center px-6 py-3 border border-indigo-200 text-base font-medium rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
                  Browse All Assets
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* --- Key Statistics Section --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {keyStats.map((stat) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>

          {/* --- Core Concepts Section --- */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              Core Concepts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreConcepts.map((concept) => (
                <FeatureCard
                  key={concept.title}
                  icon={concept.icon}
                  title={concept.title}
                  description={concept.description}
                />
              ))}
            </div>
          </div>

          {/* --- Featured Learning Modules Section --- */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              Featured Learning Modules
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredModules.map((module) => (
                <ModuleCard
                  key={module.title}
                  title={module.title}
                  description={module.description}
                  href={module.href}
                />
              ))}
            </div>
          </div>

          {/* --- Final CTA Section --- */}
          <div className="bg-white p-12 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Ready to Begin?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Create a personalized AI tutor or explore our full catalog of
              insurance modules to start mastering the industry today.
            </p>
            <div className="mt-8 flex justify-center">
              {/* --- MODIFIED BUTTON --- */}
              <Link href="/workspace" legacyBehavior>
                <a className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-transform">
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  Start with an AI Chatbot
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
