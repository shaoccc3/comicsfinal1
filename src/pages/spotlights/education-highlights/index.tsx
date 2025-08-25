// src/app/spotlight/education-highlights/page.tsx
"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import React from "react";
import DashboardLayout from "@/components/layouts/dashboard";

// --- DATA FOR HIGHLIGHT CARDS ---
// An array to hold the data makes the grid easy to manage and update.

const highlightsData = [
  {
    title: "Weekly Articles",
    description: "Discover Latest Educational Insights from Industry Experts",
    badge: "12+ New",
    imageUrl: "/static/highlights/weekly-articles.png", // Replace with your image
    href: "/spotlight/weekly-articles",
  },
  {
    title: "Research Findings",
    description:
      "Explore Cutting-Edge Studies and Trends in Educational Research",
    badge: null,
    imageUrl: "/static/highlights/research.png", // Replace with your image
    href: "/spotlight/research-findings",
  },
  {
    title: "Pedagogical Innovations",
    description: "Explore New Teaching Methods and Innovations in Education",
    badge: "6+ New",
    imageUrl: "/static/highlights/innovations.png", // Replace with your image
    href: "/spotlight/pedagogical-innovations",
  },
  {
    title: "Curriculum Updates",
    description:
      "Stay Updated on Recent Educational Curriculum Changes and Developments",
    badge: "2+ New",
    imageUrl: "/static/highlights/curriculum.png", // Replace with your image
    href: "/spotlight/curriculum-updates",
  },
  {
    title: "Educational Policies",
    description:
      "Gain Insights into Changing Government Education Policies and Initiatives Worldwide",
    badge: "12+ New",
    imageUrl: "/static/highlights/policies.png", // Replace with your image
    href: "/spotlight/educational-policies",
  },
  {
    title: "Student Success Stories",
    description:
      "Be Inspired by Real-Life Student Achievements, Journeys, and Success Stories",
    badge: null,
    imageUrl: "/static/highlights/success.png", // Replace with your image
    href: "/spotlight/student-success-stories",
  },
  {
    title: "Interviews with Educators",
    description:
      "Gain Insights from Experienced Teachers through In-Depth Interviews and Discussions",
    badge: "4+ New",
    imageUrl: "/static/highlights/interviews.png", // Replace with your image
    href: "/spotlight/interviews",
  },
  {
    title: "Teaching Resources",
    description:
      "Access Valuable Resources to Enhance Your Teaching Experience and Methods",
    badge: "2+ New",
    imageUrl: "/static/highlights/resources.png", // Replace with your image
    href: "/spotlight/teaching-resources",
  },
  {
    title: "Educational Events",
    description:
      "Stay Informed about Upcoming Educational Conferences, Webinars, and Workshops",
    badge: "12+ New",
    imageUrl: "/static/highlights/events.png", // Replace with your image
    href: "/spotlight/educational-events",
  },
  {
    title: "Reader Interaction",
    description: "Engage with Us, Share Your Thoughts, Opinions, and Ideas",
    badge: null,
    imageUrl: "/static/highlights/interaction.png", // Replace with your image
    href: "/spotlight/reader-interaction",
  },
];

// --- REUSABLE COMPONENTS ---

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
    className="block bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
    href={`/spotlight/${title.toLowerCase().replace(/\s+/g, "-")}`}
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

const ArchivesCard: FC = () => (
  <div className="lg:col-span-2 bg-slate-100 rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col md:flex-row items-center gap-6">
    <div className="flex-1 text-center md:text-left">
      <h3 className="text-2xl font-bold text-gray-800 mb-3">Archives</h3>
      <p className="text-gray-600 mb-6">
        Explore past weeks' editions of Education Highlights to catch up on any
        content you might have missed. Our archives are organized by week and
        topic, making it easy to find and revisit articles, research findings,
        success stories, and more.
      </p>
      <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
        Explore Archives
      </button>
    </div>
    <div className="relative w-48 h-48 flex-shrink-0">
      <Image
        src="/static/highlights/archives.png"
        alt="Archives icon"
        layout="fill"
        objectFit="contain"
      />
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

export default function EducationHighlightsPage() {
  return (
    <DashboardLayout>
      <div className="bg-slate-50 min-h-screen">
        {/* Header */}
        <header className="bg-white sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Education Highlights
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
            {highlightsData.map((item) => (
              <HighlightCard key={item.title} {...item} />
            ))}
            <ArchivesCard />
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
