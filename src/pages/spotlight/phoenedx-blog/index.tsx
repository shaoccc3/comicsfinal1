// src/app/spotlight/phoenedx-blog/page.tsx
"use client";

import {
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import type { FC } from "react";

// --- MOCK DATA & TYPES ---
// In a real application, this would come from a CMS or database.

type PostCategory =
  | "Pedagogy"
  | "Student Well-being"
  | "Diversity and Inclusion"
  | "Special Education"
  | "Education Technology"
  | "Game-Based Learning";

interface BlogPost {
  id: number;
  title: string;
  author: string;
  category: PostCategory;
  date: string; // e.g., "April 28, 2024"
  imageUrl: string;
  excerpt: string;
  isFeatured?: boolean;
}

const blogPostsData: BlogPost[] = [
  {
    id: 1,
    title: "Empowering Student Voice in the Classroom: Strategies for Success",
    author: "Dr. Olivia Chen",
    category: "Pedagogy",
    date: "May 5, 2024",
    imageUrl: "/static/blog-student-voice.jpg", // Replace with your image
    excerpt:
      "Discover effective strategies to amplify student voices, fostering an inclusive and engaging learning environment.",
    isFeatured: true,
  },
  {
    id: 2,
    title: "The Art of Effective Feedback",
    author: "Dr. Jennifer White",
    category: "Pedagogy",
    date: "April 28, 2024",
    imageUrl: "/static/blog-feedback.jpg",
    excerpt:
      "Master the principles of effective feedback and strategies for providing constructive input that promotes student learning and growth.",
  },
  {
    id: 3,
    title:
      "Building Resilience in Students: Strategies for Supporting Mental Health",
    author: "Dr. Alex Johnson",
    category: "Student Well-being",
    date: "April 26, 2024",
    imageUrl: "/static/blog-resilience.jpg",
    excerpt:
      "Explore evidence-based techniques and practical strategies for fostering mental resilience and well-being in students.",
    isFeatured: true,
  },
  {
    id: 4,
    title:
      "Culturally Responsive Teaching: Honoring Diversity in the Classroom",
    author: "Dr. Maria Rodriguez",
    category: "Diversity and Inclusion",
    date: "April 20, 2024",
    imageUrl: "/static/blog-diversity.jpg",
    excerpt:
      "Unpack the principles of culturally responsive teaching and strategies for integrating diverse perspectives into the curriculum.",
  },
  {
    id: 5,
    title: "Creating Welcoming and Supportive Learning Environments",
    author: "Dr. Samuel Green",
    category: "Special Education",
    date: "April 17, 2024",
    imageUrl: "/static/blog-welcoming.jpg",
    excerpt:
      "Learn about the core principles of inclusive education and practical strategies for creating inclusive classrooms.",
  },
  {
    id: 6,
    title: "Harnessing the Power of EdTech Tools for Personalized Learning",
    author: "Dr. Rebecca Tools",
    category: "Education Technology",
    date: "May 1, 2024",
    imageUrl: "/static/blog-edtech.jpg",
    excerpt:
      "Discover how top technology tools can be leveraged to create personalized learning experiences that cater to individual student needs.",
  },
  {
    id: 7,
    title: "Engaging Students Through Game-Based Learning",
    author: "Dr. Emily Carter",
    category: "Game-Based Learning",
    date: "April 15, 2024",
    imageUrl: "/static/blog-gaming.jpg",
    excerpt:
      "Discover how gamification can be used to enhance student engagement and motivation, turning any topic into a fun experience.",
    isFeatured: true,
  },
  // Add 5 more posts for pagination
  {
    id: 8,
    title: "Project-Based Learning in the Modern Classroom",
    author: "Dr. Ben Adams",
    category: "Pedagogy",
    date: "April 12, 2024",
    imageUrl: "/static/blog-pbl.jpg",
    excerpt:
      "A deep dive into implementing project-based learning to develop critical thinking and problem-solving skills.",
  },
  {
    id: 9,
    title: "Mindfulness in Schools: A Path to Better Focus and Reduced Stress",
    author: "Dr. Chloe Davis",
    category: "Student Well-being",
    date: "April 10, 2024",
    imageUrl: "/static/blog-mindfulness.jpg",
    excerpt:
      "Practical mindfulness exercises that can be easily integrated into the school day to benefit both students and teachers.",
  },
  {
    id: 10,
    title: "The Future of AI in Education",
    author: "Dr. Ian Robinson",
    category: "Education Technology",
    date: "April 8, 2024",
    imageUrl: "/static/blog-ai.jpg",
    excerpt:
      "Exploring the potential impacts of artificial intelligence on teaching methods, curriculum design, and student assessment.",
  },
  {
    id: 11,
    title: "Supporting Neurodiverse Students",
    author: "Dr. Sarah Jenkins",
    category: "Special Education",
    date: "April 5, 2024",
    imageUrl: "/static/blog-neurodiverse.jpg",
    excerpt:
      "Strategies for creating an inclusive environment that celebrates and supports neurodiversity in the classroom.",
  },
  {
    id: 12,
    title: "Global Collaboration Projects for Your Classroom",
    author: "Dr. Kenji Tanaka",
    category: "Diversity and Inclusion",
    date: "April 2, 2024",
    imageUrl: "/static/blog-global.jpg",
    excerpt:
      "How to connect your students with peers from around the world through meaningful and educational collaborative projects.",
  },
];

// --- STYLING HELPERS ---
const categoryStyles: Record<PostCategory, string> = {
  Pedagogy: "bg-red-100 text-red-800",
  "Student Well-being": "bg-sky-100 text-sky-800",
  "Diversity and Inclusion": "bg-purple-100 text-purple-800",
  "Special Education": "bg-amber-100 text-amber-800",
  "Education Technology": "bg-indigo-100 text-indigo-800",
  "Game-Based Learning": "bg-green-100 text-green-800",
};

// --- REUSABLE COMPONENTS ---

const BlogCard: FC<{ post: BlogPost }> = ({ post }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg">
    <div className="relative aspect-video">
      <Image
        src={post.imageUrl}
        alt={post.title}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="p-5">
      <div className="flex justify-between items-center mb-3 text-xs text-gray-500">
        <span
          className={`${
            categoryStyles[post.category]
          } font-medium px-2.5 py-0.5 rounded-full`}
        >
          {post.category}
        </span>
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" />
          <span>{post.author}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
        {post.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
      <div className="flex justify-between items-center">
        <button className="font-semibold text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
          Read more
        </button>
        <span className="text-xs text-gray-400">{post.date}</span>
      </div>
    </div>
  </div>
);

const FeaturedBlogCard: FC<{ post: BlogPost }> = ({ post }) => (
  <div className="relative w-full h-80 flex-shrink-0 snap-center rounded-xl overflow-hidden text-white group">
    <Image
      src={post.imageUrl}
      alt={post.title}
      layout="fill"
      objectFit="cover"
      className="z-0 transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
    <div className="relative z-20 p-6 flex flex-col justify-end h-full">
      <span
        className={`${
          categoryStyles[post.category]
        } font-medium px-2.5 py-0.5 rounded-full self-start mb-2`}
      >
        {post.category}
      </span>
      <h3 className="text-2xl font-bold leading-tight shadow-text">
        {post.title}
      </h3>
      <p className="text-sm mt-1 text-gray-200">
        {post.author} • {post.date}
      </p>
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const featuredPosts = useMemo(
    () => blogPostsData.filter((p) => p.isFeatured),
    []
  );

  const filteredPosts = useMemo(() => {
    return blogPostsData
      .filter((p) => !p.isFeatured) // Exclude featured posts from main grid
      .filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((post) =>
        category === "All" ? true : post.category === category
      );
  }, [searchTerm, category]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-white pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </header>

        {/* Intro Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
            Explore the PhoenEdX Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Dive into the world of educational innovation, learning
            methodologies, and industry trends with the PhoenEdX Blog. Our blog
            features in-depth articles, expert insights, and thought leadership
            pieces curated to inspire and inform.
          </p>
        </section>

        {/* Featured Posts Carousel */}
        <section className="mb-12">
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
            {featuredPosts.map((post) => (
              <FeaturedBlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Filter Bar */}
        <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8 flex flex-wrap items-center gap-4">
          <div className="relative flex-grow min-w-[200px]">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <div className="relative flex-grow min-w-[150px]">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none bg-white px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="All">All Categories</option>
              {Object.keys(categoryStyles).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          {/* Add Popularity and Date filters here if needed */}
          <div className="flex items-center gap-2 ml-auto">
            <button className="p-2 bg-blue-100 text-blue-600 rounded-md">
              <LayoutGrid />
            </button>
            <button className="p-2 text-gray-500 rounded-md hover:bg-gray-100">
              <List />
            </button>
          </div>
          <button className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Search
          </button>
        </section>

        {/* Blog Grid */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginatedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </main>

        {/* Pagination */}
        <nav className="flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight />
          </button>
        </nav>
      </div>
    </div>
  );
}
