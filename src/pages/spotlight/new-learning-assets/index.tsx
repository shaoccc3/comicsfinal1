// src/app/spotlight/new-learning-assets/page.tsx
"use client";

import {
  Search,
  ArrowLeft,
  ArrowRight,
  Map,
  ImageIcon,
  BookOpen,
  Library,
} from "lucide-react";
import Image from "next/image";
import type { FC, ReactNode } from "react";
import React, { useRef } from "react";

// --- DATA MOCKS ---
// 確保這些圖片路徑是正確的，且檔案存在於您的 /public 資料夾下
const latestAssetsData = [
  {
    icon: <Map className="w-8 h-8 text-blue-500" />,
    title: "Mind Maps",
    description:
      "Powerful visual tools simplifying complex topics, stimulating brainstorming, and organizing information.",
    previewImg: "/static/mindmap-preview.png", // 範例路徑
  },
  {
    icon: <ImageIcon className="w-8 h-8 text-green-500" />,
    title: "Pictures",
    description:
      "Essential visual aids across textbooks, presentations, and websites, simplifying complex concepts.",
    previewImg: "/static/pictures-preview.png", // 範例路徑
  },
];

const featuredBooksData = [
  {
    title: "The Power of Habit",
    author: "Charles Duhigg",
    coverImg: "/static/book-habit.jpg",
  },
  {
    title: "Educated: A Memoir",
    author: "Tara Westover",
    coverImg: "/static/book-educated.jpg",
  },
  {
    title: "How Children Succeed",
    author: "Paul Tough",
    coverImg: "/static/book-succeed.jpg",
  },
  {
    title: "Mindset",
    author: "Carol S. Dweck",
    coverImg: "/static/book-mindset.jpg",
  },
  {
    title: "Grit",
    author: "Angela Duckworth",
    coverImg: "/static/book-grit.jpg",
  },
];

const featuredPublicationsData = [
  {
    title: "21st Century Skills: Preparing Students for the Future",
    publisher: "Pearson Education",
    description:
      "Explore the essential skills needed for success in the 21st century workplace.",
    bgImg: "/static/pub-skills.jpg",
    date: "April 18, 2024",
  },
  {
    title: "Empowering Students to Thrive in a Changing World",
    publisher: "Dave Burgess Consulting, Inc.",
    description:
      "Dive into the principles of innovation and creativity in education.",
    bgImg: "/static/pub-empowering.jpg",
    date: "May 09, 2024",
  },
  {
    title: "Culturally Responsive Teaching",
    publisher: "Corwin",
    description:
      "Discover strategies for creating inclusive and equitable learning environments.",
    bgImg: "/static/pub-cultural.jpg",
    date: "June 01, 2024",
  },
];

// --- REUSABLE COMPONENTS ---

interface SectionHeaderProps {
  title: string;
  onScroll: (direction: "left" | "right") => void;
}

const SectionHeader: FC<SectionHeaderProps> = ({ title, onScroll }) => (
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-baseline gap-4">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
        See All
      </a>
    </div>
    <div className="flex gap-2">
      <button
        onClick={() => onScroll("left")}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        aria-label="Scroll Left"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>
      <button
        onClick={() => onScroll("right")}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        aria-label="Scroll Right"
      >
        <ArrowRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  </div>
);

const HorizontalScroller: FC<{
  children: ReactNode;
  scrollRef: React.RefObject<HTMLDivElement>;
}> = ({ children, scrollRef }) => (
  <div className="relative">
    <div
      ref={scrollRef}
      className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
    >
      {children}
    </div>
  </div>
);

// --- CARD COMPONENTS (with fixes) ---

const AssetCard: FC<(typeof latestAssetsData)[0]> = ({
  icon,
  title,
  description,
  previewImg,
}) => (
  <div className="flex-shrink-0 w-96 bg-white border border-gray-200 rounded-lg p-4 flex gap-4 items-center">
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <button className="text-sm font-semibold text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        Learn More
      </button>
    </div>
    {/* MODIFIED: Added bg-gray-100 for placeholder */}
    <div className="w-32 h-32 relative flex-shrink-0 bg-gray-100 rounded-md">
      <Image
        src={previewImg}
        alt={`${title} preview`}
        layout="fill"
        objectFit="contain"
        className="rounded-md"
      />
    </div>
  </div>
);

const BookCard: FC<(typeof featuredBooksData)[0]> = ({
  title,
  author,
  coverImg,
}) => (
  <div className="flex-shrink-0 w-48 text-center">
    {/* MODIFIED: Added bg-gray-200 for placeholder */}
    <div className="relative aspect-[2/3] w-full mb-3 shadow-lg rounded-lg overflow-hidden bg-gray-200">
      <Image src={coverImg} alt={title} layout="fill" objectFit="cover" />
    </div>
    <h3 className="font-semibold text-gray-800 truncate">{title}</h3>
    <p className="text-xs text-gray-500">Author: {author}</p>
    <button className="mt-2 w-full text-sm font-semibold text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
      See More
    </button>
  </div>
);

const PublicationCard: FC<(typeof featuredPublicationsData)[0]> = ({
  title,
  publisher,
  description,
  bgImg,
  date,
}) => (
  // MODIFIED: Added bg-gray-700 for placeholder
  <div className="flex-shrink-0 w-[450px] h-64 rounded-xl relative overflow-hidden p-6 flex flex-col justify-end text-white bg-gray-700 bg-gradient-to-t from-black/80 to-transparent">
    <Image
      src={bgImg}
      alt={title}
      layout="fill"
      objectFit="cover"
      className="-z-10"
    />
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-sm font-medium">Publisher: {publisher}</p>
    <p className="text-sm mt-1 mb-3 line-clamp-2">{description}</p>
    <div className="flex justify-between items-center mt-auto">
      <button className="text-sm font-semibold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition">
        Read more
      </button>
      <span className="text-xs font-light">{date}</span>
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

export default function NewLearningAssetsPage() {
  const assetsRef = useRef<HTMLDivElement>(null);
  const booksRef = useRef<HTMLDivElement>(null);
  const publicationsRef = useRef<HTMLDivElement>(null);

  const handleScroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right"
  ) => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.8;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white min-h-screen p-8 font-sans">
      {/* Page Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">
            Our New Learning Assets
          </h1>
        </div>
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-slate-50 pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </header>

      <main className="space-y-12">
        <section>
          <SectionHeader
            title="Latest educational assets"
            onScroll={(dir) => handleScroll(assetsRef, dir)}
          />
          <HorizontalScroller scrollRef={assetsRef}>
            {latestAssetsData.map((asset) => (
              <AssetCard key={asset.title} {...asset} />
            ))}
          </HorizontalScroller>
        </section>

        <section>
          <SectionHeader
            title="Featured Books"
            onScroll={(dir) => handleScroll(booksRef, dir)}
          />
          <HorizontalScroller scrollRef={booksRef}>
            {featuredBooksData.map((book) => (
              <BookCard key={book.title} {...book} />
            ))}
          </HorizontalScroller>
        </section>

        <section>
          <SectionHeader
            title="Featured Publications"
            onScroll={(dir) => handleScroll(publicationsRef, dir)}
          />
          <HorizontalScroller scrollRef={publicationsRef}>
            {featuredPublicationsData.map((pub) => (
              <PublicationCard key={pub.title} {...pub} />
            ))}
          </HorizontalScroller>
        </section>

        <section className="bg-blue-50 rounded-2xl p-8 flex items-center justify-between gap-8 mt-16">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              How to Access?
            </h2>
            <p className="text-gray-600 mb-6">
              Ready to explore and access these learning assets through our
              Marketplace or in any library? Whether you're looking to purchase
              a book for your personal library or borrow a publication for your
              studies, our platform provides convenient access to these
              resources.
            </p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                <BookOpen className="w-5 h-5" />
                Marketplace
              </button>
              <button className="flex items-center gap-2 bg-white text-gray-800 font-semibold px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                <Library className="w-5 h-5" />
                Library
              </button>
            </div>
          </div>
          {/* MODIFIED: Added bg-blue-100 for placeholder */}
          <div className="relative w-64 h-56 hidden lg:block bg-blue-100 rounded-lg">
            <Image
              src="/static/access-illustration.svg"
              alt="Books and learning illustration"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
