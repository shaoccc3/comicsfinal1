// src/app/spotlight/business-highlights/page.tsx
"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import React from "react";
import DashboardLayout from "@/components/layouts/dashboard";

// --- DATA FOR BUSINESS HIGHLIGHT CARDS ---
// The data is sourced directly from your image to ensure an exact match.

const businessHighlightsData = [
  {
    title: "Corporate News",
    description: "Stay Updated on Business Announcements and Developments",
    badge: "12+ New",
    imageUrl: "/static/business/corporate-news.png", // Replace with your image
  },
  {
    title: "Entrepreneurial Insights",
    description:
      "Gain Valuable Knowledge and Inspiration from Successful Entrepreneurs.",
    badge: null,
    imageUrl: "/static/business/entrepreneurial.jpg", // Replace with your image
  },
  {
    title: "Innovation and Technology",
    description: "Explore the Latest in Business Tech and Trends",
    badge: "4+ New",
    imageUrl: "/static/business/innovation.png", // Replace with your image
  },
  {
    title: "Market Trends",
    description: "Understand Economic Shifts and Consumer Behaviors",
    badge: "2+ New",
    imageUrl: "/static/business/market-trends.png", // Replace with your image
  },
  {
    title: "Business Strategies",
    description: "Implement Effective Tactics for Growth and Success",
    badge: "12+ New",
    imageUrl: "/static/business/strategies.png", // Replace with your image
  },
  {
    title: "Startup Spotlights",
    description:
      "Discover the Stories Behind Promising Startups and Innovative Ventures",
    badge: null,
    imageUrl: "/static/business/startup.png", // Replace with your image
  },
  {
    title: "Leadership and Management",
    description: "Develop Skills for Effective Business Leadership",
    badge: "4+ New",
    imageUrl: "/static/business/leadership.png", // Replace with your image
  },
  {
    title: "Case Studies",
    description:
      "Analyze Real-world Business Scenarios and Learn from the Challenges.",
    badge: "2+ New",
    imageUrl: "/static/business/case-studies.png", // Replace with your image
  },
  {
    title: "Industry-specific News",
    description:
      "Stay Informed about the Latest Developments, Trends, and Innovations in Specific Sectors.",
    badge: "12+ New",
    imageUrl: "/static/business/industry-news.png", // Replace with your image
  },
  {
    title: "Business Events",
    description: "Find Networking Opportunities and Conferences.",
    badge: null,
    imageUrl: "/static/business/events.png", // Replace with your image
  },
  {
    title: "Reader Engagement",
    description: "Engage in Thoughtful Discussions, Share Your Insights.",
    badge: null,
    imageUrl: "/static/business/engagement.png", // Replace with your image
  },
  {
    title: "Archives",
    description:
      "Access Past Editions of 'Business Highlights' for Reference and Catch-Up.",
    badge: null,
    imageUrl: "/static/business/archives.png", // Replace with your image
  },
];

// --- REUSABLE HIGHLIGHT CARD COMPONENT ---

interface HighlightCardProps {
  title: string;
  description: string;
  badge: string | null;
  imageUrl: string;
}

const HighlightCard: FC<HighlightCardProps> = ({
  title,
  description,
  badge,
  imageUrl,
}) => (
  <a
    href={`/spotlight/${title.toLowerCase().replace(/\s+/g, "-")}`}
    className="block bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
  >
    <div className="relative h-40 w-full mb-4">
      <Image src={imageUrl} alt={title} layout="fill" objectFit="contain" />
    </div>
    <div className="text-center">
      <div className="flex justify-center items-center gap-2 mb-1">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        {badge && (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
            {badge}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </a>
);

// --- MAIN PAGE COMPONENT ---

export default function BusinessHighlightsPage() {
  return (
    <DashboardLayout>
      <div className="bg-slate-50 min-h-screen">
        {/* Header */}
        <header className="bg-white sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Business Highlights
            </h1>
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-slate-100 pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <main className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessHighlightsData.map((item) => (
              <HighlightCard key={item.title} {...item} />
            ))}
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
