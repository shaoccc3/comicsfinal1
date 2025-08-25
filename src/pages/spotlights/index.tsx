// src/app/spotlight/page.tsx
import { Search } from "lucide-react";
import Image from "next/image";
import type { FC, ReactNode } from "react";
import DashboardLayout from "@/components/layouts/dashboard";

// Card 數據，方便管理和修改
const cardData = [
  {
    title: "Latest News",
    description: "Discover the newest educational trends and updates.",
    badge: { text: "12+ New", color: "bg-blue-100 text-blue-800" },
    imageSrc: "/static/lastnews.png",
    href: "/spotlight/latest-news",
  },
  {
    title: "Weekly Highlights",
    description: "Weekly digest of top educational stories.",
    badge: null,
    imageSrc: "/static/weekly-highlights.png",
    href: "/spotlight/weekly-highlights",
  },
  {
    title: "Trending Events",
    description: "Find upcoming educational workshops and webinars.",
    badge: { text: "6+ New", color: "bg-red-100 text-red-800" },
    imageSrc: "/static/trending-events.jpg",
    href: "/spotlight/trending-events",
  },
  {
    title: "New Learning Assets",
    description:
      "Discover a world of knowledge through new books, interactive resources and tools.",
    badge: { text: "3+ New", color: "bg-green-100 text-green-800" },
    imageSrc: "/static/learning-assets.jpg",
    href: "/spotlight/new-learning-assets",
  },
  {
    title: "Join PhoenEdX",
    description: "Join our community for exclusive educational benefits.",
    badge: null,
    imageSrc: "/static/join-phoenedx.jpg",
    href: "/spotlight/join-phoenedx",
  },
  {
    title: "PhoenEdX Blog",
    description: "Insights and tips from educational experts.",
    badge: { text: "50+ New", color: "bg-purple-100 text-purple-800" },
    imageSrc: "/static/phoenedx-blog.png",
    href: "/spotlight/phoenedx-blog",
  },
];

// 主頁面組件
export default function SpotlightPage() {
  return (
    <DashboardLayout>
      <div className="bg-slate-50 min-h-screen p-8 font-sans">
        <header className="bg-white shadow-sm rounded-xl p-4 flex justify-between items-center mb-8">
          <h1 className="font-poppins font-medium text-[22px] text-[#2B8CFF]">
            PhoenEdX Spotlight
          </h1>
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-slate-100 pl-4 pr-10 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-none font-poppins"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card) => (
            <SpotlightCard key={card.title} {...card} />
          ))}
          <NewsletterSignUp />
        </main>
      </div>
    </DashboardLayout>
  );
}

// 卡片組件
interface SpotlightCardProps {
  title: string;
  description: string;
  badge: { text: string; color: string } | null;
  imageSrc: string;
  href: string;
}

const SpotlightCard: FC<SpotlightCardProps> = ({
  title,
  description,
  badge,
  imageSrc,
  href,
}) => {
  return (
    <a
      href={href}
      className="block bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-video mb-4">
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="fill"
          className="rounded-lg"
        />
      </div>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        {badge && (
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${badge.color}`}
          >
            {badge.text}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-500 mt-1">{description}</p>
    </a>
  );
};

// 電子報訂閱組件
const NewsletterSignUp: FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2 flex items-center gap-6">
      <div className="flex-1">
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Get the latest education news delivered to your inbox.
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Unlock the doorway to continuous learning and stay abreast of the
          latest educational trends by subscribing to the PhoenEdX Newsletter.
        </p>
        <div className="flex">
          <input
            type="email"
            placeholder="Enter your email here..."
            className="w-full px-4 py-2 border border-slate-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-r-lg hover:bg-blue-600 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
      <div className="relative w-32 h-32 hidden md:block">
        <Image
          src="/static/newsletter-icon.png"
          alt="Newsletter"
          layout="fill"
          objectFit="fill"
        />
      </div>
    </div>
  );
};
