// src/app/spotlight/education-highlights/innovations/page.tsx
"use client";

import { Search, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import type { FC } from "react";

// --- DATA FOR INNOVATION CARDS ---
const innovationsData = [
  {
    title: "Flipped Classroom",
    description:
      "Enhance active learning with flipped classrooms, where online preparation leads to deeper engagement and understanding.",
    imageUrl: "/static/innovations/flipped-classroom.jpg", // Replace with your image
  },
  {
    title: "Gamification",
    description:
      "Explore gamification in education, making learning interactive and enjoyable through challenges and rewards.",
    imageUrl: "/static/innovations/gamification.jpg", // Replace with your image
  },
  {
    title: "Personalized Learning",
    description:
      "Discover tech-enhanced learning tailored to individual student needs and preferences for a customized educational experience.",
    imageUrl: "/static/innovations/personalized-learning.jpg", // Replace with your image
  },
  {
    title: "Project-Based Learning",
    description:
      "Dive into project-based learning to foster critical thinking skills, collaboration, and creativity in students.",
    imageUrl: "/static/innovations/project-based.jpg", // Replace with your image
  },
  {
    title: "Inquiry-Based Learning",
    description:
      "Encourage students to ask questions and explore topics independently, fostering a sense of curiosity and ownership.",
    imageUrl: "/static/innovations/inquiry-based.jpg", // Replace with your image
  },
];

// --- REUSABLE COMPONENTS ---

interface InnovationCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const InnovationCard: FC<InnovationCardProps> = ({
  title,
  description,
  imageUrl,
}) => (
  <div className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-xl overflow-hidden">
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 h-20">{description}</p>
    </div>
    <div className="relative h-48 w-full">
      <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

export default function PedagogicalInnovationsPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340; // width of card + gap
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-slate-100 pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Pedagogical Innovations – Enhancing Learning Experiences
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
            In today's dynamic educational landscape, educators continually seek
            innovative teaching methods to engage students and optimize learning
            outcomes.
          </p>
          <div className="relative w-full max-w-5xl mx-auto aspect-[16/7]">
            <Image
              src="/static/innovations/infographic.png" // Replace with your infographic image
              alt="Pedagogical Innovations Infographic"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </section>

        {/* Innovations Carousel Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Innovations</h2>
            <div className="flex gap-2">
              <button
                onClick={() => handleScroll("left")}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                aria-label="Scroll Left"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                aria-label="Scroll Right"
              >
                <ArrowRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
          >
            {innovationsData.map((item) => (
              <InnovationCard key={item.title} {...item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
