// src/app/spotlight/join-phoenedx/page.tsx
"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import React from "react";
import DashboardLayout from "@/components/layouts/dashboard";

// --- DATA FOR FEATURE SECTIONS ---
// This approach makes it easy to add, remove, or reorder sections later.

const features = [
  {
    eyebrow: "EXPLORE A WORLD OF LEARNING OPPORTUNITIES",
    title: "Access to Diverse Courses",
    description:
      "Discover a vast array of courses spanning diverse subjects, from technology and business to arts and humanities. Whether you're delving into new areas or enhancing existing skills, our curated selection offers something for learners of all levels. Explore cutting-edge content, expertly crafted to ignite your curiosity and fuel your passion for learning.",
    buttonText: "Explore Courses",
    imageUrl: "/static/join.jpg", // Replace with your image
    imageAlt: "Stack of blue books",
  },
  {
    eyebrow: "EXPAND YOUR NETWORK AND CONNECT GLOBALLY",
    title: "Networking Opportunities",
    description:
      "Forge connections with peers, professionals, and experts worldwide through PhoenEdX's extensive networking opportunities. Engage in meaningful discussions, collaborate on projects, and join interest groups—all driven by shared interests and aspirations. Expand your network, broaden your horizons, and cultivate valuable relationships.",
    buttonText: "Connect with Professionals",
    imageUrl: "/static/join-network.jpg", // Replace with your image
    imageAlt: "Diagram of a professional network",
  },
  {
    eyebrow: "JOIN A THRIVING LEARNING COMMUNITY",
    title: "Community Engagement",
    description:
      "Discover a vast array of courses spanning diverse subjects, from technology and business to arts and humanities. Whether you're delving into new areas or enhancing existing skills, our curated selection offers something for learners of all levels. Explore cutting-edge content, expertly crafted to ignite your curiosity and fuel your passion for learning.",
    buttonText: "Join the Discussion",
    imageUrl: "/static/join-community.jpg", // Replace with your image
    imageAlt: "Paper cutouts of people representing a community",
  },
  {
    eyebrow: "TAILOR YOUR LEARNING JOURNEY",
    title: "Personalized Learning Experience",
    description:
      "Discover a vast array of courses spanning diverse subjects, from technology and business to arts and humanities. Whether you're delving into new areas or enhancing existing skills, our curated selection offers something for learners of all levels. Explore cutting-edge content, expertly crafted to ignite your curiosity and fuel your passion for learning.",
    buttonText: "Customize Your Learning Journey",
    imageUrl: "/static/join-puzzle.jpg", // Replace with your image
    imageAlt: "Puzzle pieces spelling out EDUCATION",
  },
];

// --- REUSABLE FEATURE SECTION COMPONENT ---

interface FeatureSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean; // This prop controls the layout order
}

const FeatureSection: FC<FeatureSectionProps> = ({
  eyebrow,
  title,
  description,
  buttonText,
  imageUrl,
  imageAlt,
  reverse = false,
}) => {
  // Determine the order of text and image based on the 'reverse' prop
  const textOrder = reverse ? "md:order-last" : "";
  const imageOrder = reverse ? "md:order-first" : "";

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className={textOrder}>
          <p className="text-sm font-bold text-blue-600 tracking-wider mb-2">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
          <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
            {buttonText}
          </button>
        </div>
        {/* Image Content */}
        <div className={`relative aspect-video ${imageOrder}`}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            layout="fill"
            objectFit="cover"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function JoinPhoenEdxPage() {
  return (
    <DashboardLayout>
      <div className="bg-white font-sans">
        {/* Header */}
        <header className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-slate-100 pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative text-center py-20 px-6 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-80">
              <Image
                src="/static/join-courses.png" // Replace with your large background graphic
                alt="Decorative background"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                Join PhoenEdX
              </h1>
              <p className="text-lg font-semibold text-blue-800 mb-4">
                Unlock Your Learning Potential with a Global Community
              </p>
              <p className="text-gray-600 mb-8">
                Welcome to PhoenEdX, where learning knows no bounds, and
                possibilities are limitless! Join our vibrant community of
                passionate learners and dedicated educators to embark on an
                enriching educational journey like never before. Our platform is
                more than just a space for collaboration, where curiosity is
                celebrated, and growth knows no limits.
              </p>
              <button className="bg-blue-600 text-white font-bold px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg">
                Get Started Now!
              </button>
            </div>
          </section>

          {/* Feature Sections rendered from data */}
          <div className="bg-slate-50/70">
            {features.map((feature, index) => (
              <FeatureSection
                key={feature.title}
                {...feature}
                reverse={index % 2 !== 0} // This creates the alternating layout
              />
            ))}
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
