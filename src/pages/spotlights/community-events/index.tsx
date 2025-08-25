import React, { useState } from "react";
// 引入 react-icons 圖示庫，您需要先安裝它: npm install react-icons
import { HiOutlineSearch, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { FiFilter } from "react-icons/fi";
import DashboardLayout from "@/components/layouts/dashboard";

import {
  FaRegEye,
  FaRegThumbsUp,
  FaRegCommentDots,
  FaCheckCircle,
} from "react-icons/fa";

// --- 模擬資料 (Mock Data) ---
// 在實際應用中，這些資料應該來自後端 API

const userProfile = {
  name: "Kashan Bhatti",
  title: "UI-UX Designer",
  avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  bio: "Starting from editing photos in 2018 for my social handles to designing full-fledged products for the world. I kept growing and connected to the foster years.",
};

const forumCategories = [
  {
    category: "Technology & Innovation",
    title: "The Future of Artificial Intelligence In Education",
    imageUrl:
      "https://images.unsplash.com/photo-1593349480503-685d3a4c5979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dGVjaG5vbG9neXx8fHx8fDE2Mjk4NjI0NjQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    color: "text-blue-500",
  },
  {
    category: "Business & Entrepreneurship",
    title: "Navigating the Gig Economy: Opportunities and Challenges",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YnVzaW5lc3N8fHx8fHwxNjI5ODYyNTI5&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    color: "text-purple-500",
  },
  {
    category: "Arts & Humanities",
    title: "Power of Storytelling: Impact & Influence Across Cultures",
    imageUrl:
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXJ0fHx8fHx8MTYyOTg2MjU5NA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    color: "text-orange-500",
  },
];

const recentPosts = [
  {
    id: 1,
    author: "TechGeek42",
    avatarUrl: "https://randomuser.me/api/portraits/women/42.jpg",
    title: "Ensuring Ethical and Inclusive AI in Education",
    excerpt:
      "While AI shows promise, I'm concerned about data privacy and bias in algorithms. How can we ensure that AI in education remains ethical and inclusive?",
    category: "Technology & Innovation",
    views: "20k",
    likes: "923",
    comments: "12",
    solved: true,
  },
  {
    id: 2,
    author: "EntrepreneurLife",
    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    title: "Optimizing Team Cohesion in the Gig Economy",
    excerpt:
      "As a small business owner, I've found the gig economy to be a game-changer for accessing specialized talent on-demand. Let's discuss how to effectively leverage gig workers while maintaining team cohesion.",
    category: "Business & Entrepreneurship",
    views: "39k",
    likes: "1.2k",
    comments: "48",
    solved: true,
  },
  {
    id: 3,
    author: "CulturalExplorer",
    avatarUrl: "https://randomuser.me/api/portraits/women/60.jpg",
    title: "Impact of Cultural Differences on Storytelling Interpretation",
    excerpt:
      "I'm fascinated by the universality of storytelling across cultures. Despite this, I've noticed that cultural differences influence the way stories are told and interpreted.",
    category: "Arts & Humanities",
    views: "15k",
    likes: "812",
    comments: "23",
    solved: true,
  },
];

const latestForums = [
  {
    category: "Technology & Innovation",
    title: "The Future of Artificial Intelligence in Education",
  },
  {
    category: "Business & Entrepreneurship",
    title:
      "Dive into startup strategies, marketing, finance, and leadership insights.",
  },
  {
    category: "Arts & Humanities",
    title: "Immerse in literature, art, philosophy, and cultural studies.",
  },
  {
    category: "Science & Nature",
    title:
      "Discover wonders of astronomy, biology, earth sciences, and conservation.",
  },
  {
    category: "Pedagogy & Teaching",
    title:
      "Learn effective teaching methods and educational technology integration.",
  },
  {
    category: "Health & Wellness",
    title:
      "Explore physical fitness, mental health, nutrition, and holistic wellness.",
  },
];

// --- 組件 (Components) ---

const Header = () => (
  <header className="flex items-center justify-between p-4 bg-white border-b">
    <div className="text-sm text-gray-500">
      <span className="hover:text-blue-600 cursor-pointer">
        Community & Events
      </span>
      <span className="mx-2">&gt;</span>
      <span className="text-gray-800 font-medium">Community Forums</span>
    </div>
    <div className="relative w-1/4">
      <HiOutlineSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        className="w-full pl-10 pr-4 py-2 border rounded-full text-sm"
      />
    </div>
  </header>
);

const HeroSection = () => (
  <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 md:p-12 rounded-lg m-4 md:m-8">
    {/* Decorative elements */}
    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-white/10 rounded-full opacity-50"></div>
    <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-white/10 rounded-full opacity-50"></div>

    <div className="relative z-10 max-w-2xl">
      <h1 className="text-3xl md:text-5xl font-bold mb-2">
        Engage, Learn, Collaborate
      </h1>
      <p className="text-md md:text-lg text-blue-100 mb-6">
        Explore a Wealth of Knowledge and Connect with Peers
      </p>
      <div className="flex items-center bg-white rounded-full p-2 max-w-lg shadow-lg">
        <HiOutlineSearch className="text-gray-400 mx-3" size={20} />
        <input
          type="text"
          placeholder="Search"
          className="w-full text-gray-800 focus:outline-none"
        />
        <button className="text-gray-500 mx-3">
          <FiFilter size={20} />
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors">
          Search
        </button>
      </div>
    </div>
  </div>
);

const FeaturedForums = () => (
  <section className="px-4 md:px-8 my-8">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-gray-800">Forums</h2>
      <div className="flex items-center gap-4">
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          See All
        </a>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full border hover:bg-gray-100">
            <HiChevronLeft />
          </button>
          <button className="p-2 rounded-full border hover:bg-gray-100">
            <HiChevronRight />
          </button>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {forumCategories.map((forum, index) => (
        <div
          key={index}
          className="relative rounded-lg overflow-hidden shadow-md group"
        >
          <img
            src={forum.imageUrl}
            alt={forum.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <p className={`text-sm font-semibold ${forum.color}`}>
              {forum.category}
            </p>
            <h3 className="text-white font-bold mt-1">{forum.title}</h3>
          </div>
        </div>
      ))}
    </div>
  </section>
);

type Post = {
  id: number;
  author: string;
  avatarUrl: string;
  title: string;
  excerpt: string;
  category: string;
  views: string;
  likes: string;
  comments: string;
  solved: boolean;
};

const PostItem = ({ post }: { post: Post }) => (
  <div className="bg-white p-4 rounded-lg border hover:shadow-lg transition-shadow">
    <div className="flex gap-4">
      <img
        src={post.avatarUrl}
        alt={post.author}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-gray-800">{post.author}</p>
          <p className="text-xs text-gray-400">
            Posted in{" "}
            <a href="#" className="text-blue-600">
              {post.category}
            </a>
          </p>
        </div>
        <h3 className="text-lg font-bold text-gray-900 my-1">{post.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
        <div className="flex items-center justify-between text-gray-500">
          {post.solved && (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
              <FaCheckCircle />
              <span>Solved</span>
            </div>
          )}
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <FaRegEye /> {post.views}
            </span>
            <span className="flex items-center gap-2">
              <FaRegThumbsUp /> {post.likes}
            </span>
            <span className="flex items-center gap-2">
              <FaRegCommentDots /> {post.comments}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RecentActivity = () => {
  const [activeTab, setActiveTab] = useState("Recently Solved");
  const tabs = [
    "Recent topics",
    "Recently Solved",
    "Unanswered topics",
    "Trending",
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Recent Forum Activity
      </h2>
      <div className="border-b mb-4">
        <nav className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="space-y-4">
        {recentPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

const Sidebar = () => (
  <aside className="space-y-8">
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={userProfile.avatarUrl}
          alt={userProfile.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="font-bold text-lg text-gray-900">
            {userProfile.name}
          </h3>
          <p className="text-sm text-gray-500">{userProfile.title}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">{userProfile.bio}</p>
      <div className="flex items-center gap-4">
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
          View Profile
        </button>
        <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200">
          Edit Profile
        </button>
      </div>
    </div>
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="font-bold text-lg text-gray-900 mb-4">Latest Forum</h3>
      <div className="space-y-4">
        {latestForums.map((forum, index) => (
          <div key={index}>
            <p className="text-blue-600 font-semibold text-sm cursor-pointer hover:underline">
              {forum.title}
            </p>
            <p className="text-xs text-gray-500">{forum.category}</p>
          </div>
        ))}
      </div>
    </div>
  </aside>
);

// --- 主頁面 (Main Page) ---

export default function CommunityForumsPage() {
  return (
    <DashboardLayout>
      <div className="bg-gray-50 min-h-screen font-sans">
        <Header />
        <main>
          <HeroSection />
          <FeaturedForums />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-8 my-8">
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
            <div>
              <Sidebar />
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
