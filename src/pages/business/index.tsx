// src/app/spotlight/business-enterprise/page.tsx
"use client";

import {
  Search,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  BarChart2,
} from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import type { FC } from "react";
import DashboardLayout from "@/components/layouts/dashboard";

// --- DATA MOCKS ---
// Data for the Core Solutions section
const solutionsData = [
  {
    title: "Corporate Training",
    description:
      "Upskill your workforce with our extensive library of expert-led courses.",
    imageUrl: "/static/enterprise/solution-training.jpg",
  },
  {
    title: "Skills Development",
    description:
      "Identify and close skill gaps with targeted learning paths and assessments.",
    imageUrl: "/static/enterprise/solution-skills.jpg",
  },
  {
    title: "Team Onboarding",
    description:
      "Streamline new hire training with custom programs for seamless integration.",
    imageUrl: "/static/enterprise/solution-onboarding.jpg",
  },
  {
    title: "Educational Partnerships",
    description:
      "Collaborate with us to offer accredited courses and certifications.",
    imageUrl: "/static/enterprise/solution-partnerships.jpg",
  },
];

// Data for the alternating Features section
const featuresData = [
  {
    title: "Advanced Analytics & Reporting",
    description:
      "Track learner progress, measure engagement, and demonstrate the ROI of your training initiatives with our powerful analytics dashboard. Gain actionable insights to optimize your learning programs.",
    imageUrl: "/static/enterprise/feature-analytics.jpg",
    icon: <BarChart2 className="w-8 h-8 text-white" />,
  },
  {
    title: "Custom Learning Paths",
    description:
      "Tailor educational journeys to specific roles, departments, or individual career goals. Our platform allows you to build and assign custom learning paths that align perfectly with your business objectives.",
    imageUrl: "/static/enterprise/feature-paths.jpg",
    icon: <TrendingUp className="w-8 h-8 text-white" />,
  },
];

// Data for Success Stories section
const successStoriesData = [
  {
    company: "Innovate Inc.",
    logoUrl: "/static/enterprise/logo-innovate.svg",
    testimonial:
      "PhoenEdX transformed our onboarding process, reducing ramp-up time by 40%.",
  },
  {
    company: "Global Solutions",
    logoUrl: "/static/enterprise/logo-global.svg",
    testimonial:
      "We closed critical skill gaps in our tech department, leading to a 15% increase in project efficiency.",
  },
  {
    company: "Quantum Leap Co.",
    logoUrl: "/static/enterprise/logo-quantum.svg",
    testimonial:
      "The analytics dashboard provided invaluable insights into our team's learning engagement.",
  },
  {
    company: "Starlight Education",
    logoUrl: "/static/enterprise/logo-starlight.svg",
    testimonial:
      "Partnering with PhoenEdX allowed us to expand our accredited course offerings globally.",
  },
];

// --- REUSABLE COMPONENTS ---

const SolutionCard: FC<(typeof solutionsData)[0]> = ({
  title,
  description,
  imageUrl,
}) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className="relative h-32 w-full mb-4">
      <Image src={imageUrl} alt={title} layout="fill" objectFit="contain" />
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

const SuccessStoryCard: FC<(typeof successStoriesData)[0]> = ({
  company,
  logoUrl,
  testimonial,
}) => (
  <div className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center">
    <div className="relative h-12 w-32 mb-4">
      <Image
        src={logoUrl}
        alt={`${company} logo`}
        layout="fill"
        objectFit="contain"
        className="grayscale opacity-60"
      />
    </div>
    <p className="text-gray-600 italic">"{testimonial}"</p>
  </div>
);

// --- MAIN PAGE COMPONENT ---

export default function BusinessEnterprisePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleScroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -340 : 340,
        behavior: "smooth",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-slate-50 font-sans">
        {/* Header */}
        <header className="bg-white sticky top-0 z-20 shadow-sm">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Business & Enterprise
            </h1>
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search Solutions"
                className="w-full bg-slate-100 pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative bg-white pt-20 pb-16 text-center">
            <div className="container mx-auto px-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                Empower Your Workforce, Elevate Your Business
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
                PhoenEdX provides comprehensive learning solutions designed to
                help your teams master new skills, drive innovation, and achieve
                your organization's goals.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <button className="bg-blue-600 text-white font-bold px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
                  Request a Demo
                </button>
                <button className="bg-slate-100 text-gray-800 font-bold px-8 py-3 rounded-lg text-lg hover:bg-slate-200 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </section>

          {/* Solutions Section */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                Solutions Tailored For You
              </h2>
              <p className="text-center text-gray-600 mb-10">
                From onboarding to leadership training, we have you covered.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {solutionsData.map((item) => (
                  <SolutionCard key={item.title} {...item} />
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-white py-16">
            {featuresData.map((feature, index) => (
              <div key={feature.title} className="container mx-auto px-6 py-8">
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                    index % 2 !== 0 ? "md:grid-flow-col-dense" : ""
                  }`}
                >
                  <div
                    className={`relative aspect-video rounded-xl overflow-hidden shadow-lg ${
                      index % 2 !== 0 ? "md:col-start-2" : ""
                    }`}
                  >
                    <Image
                      src={feature.imageUrl}
                      alt={feature.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-4">
                      {feature.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      {feature.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Success Stories Section */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  Trusted by Leading Organizations
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleScroll("left")}
                    className="p-2 rounded-full bg-white hover:bg-gray-200 transition"
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    onClick={() => handleScroll("right")}
                    className="p-2 rounded-full bg-white hover:bg-gray-200 transition"
                  >
                    <ArrowRight />
                  </button>
                </div>
              </div>
              <div
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
              >
                {successStoriesData.map((story) => (
                  <SuccessStoryCard key={story.company} {...story} />
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="bg-blue-600">
            <div className="container mx-auto px-6 py-16 text-center">
              <h2 className="text-3xl font-bold text-white mb-3">
                Ready to Empower Your Team?
              </h2>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                Connect with our experts to design a custom learning strategy
                that aligns with your business goals and drives measurable
                results.
              </p>
              <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-lg text-lg hover:bg-blue-50 transition-colors">
                Get Started Today
              </button>
            </div>
          </section>
        </main>
      </div>
    </DashboardLayout>
  );
}
