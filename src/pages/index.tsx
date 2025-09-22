// 建議檔案路徑: src/app/page.tsx
import {
  ArrowLeft,
  ArrowRight,
  BarChart,
  Book,
  BookOpen,
  Bot,
  Briefcase,
  Building,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code,
  Facebook,
  FlaskConical,
  Globe,
  GraduationCap,
  Headphones,
  Instagram,
  Library,
  Lightbulb,
  Linkedin,
  Mail,
  Map,
  Mic,
  Quote,
  Rocket,
  Search,
  Star,
  Store,
  Twitter,
  Users,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import DashboardLayout from "@/components/layouts/dashboard"; // 沿用你的 DashboardLayout

// 主要頁面組件
export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="bg-gray-100 pb-16">
        {" "}
        {/* [本次修改] 設定一個淺灰色背景作為整體頁面間隔的底色，並增加底部間距 */}
        {/* --- HeroSection 作為獨立的 Banner --- */}
        <HeroSection />
        {/* --- main 標籤包裹所有中間區塊 --- */}
        {/* [本次修改] 移除 main 上的 bg-white, rounded-3xl, space-y-8。main 現在只負責內容的水平對齊。 */}
        <main className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          {/* [本次修改] 每個 Section 現在都有自己的背景、圓角和上下間距 */}
          <SpotlightsSection className="mt-16" />{" "}
          {/* 從 HeroSection 下方開始，增加間距 */}
          <UniversesSection className="mt-8" />
          <NewsletterSection className="mt-8" />
          <StatsSection className="mt-8" />
          <TestimonialsSection className="mt-8" />
        </main>
        {/* --- Footer 保持獨立 --- */}
        <FooterSection className="mt-16" />{" "}
        {/* Footer 與 main 區塊之間也需要間距 */}
      </div>
    </DashboardLayout>
  );
}

// --- 區塊組件 ---

// 1. 英雄/歡迎區塊 (無修改)
const HeroSection: FC = () => (
  <section className="bg-white py-20">
    {" "}
    {/* HeroSection 保持白色背景 */}
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <span className="font-semibold text-blue-600">
            Welcome to PhoenEdx
          </span>
          <h1 className="mt-2 mb-4 text-5xl font-bold leading-tight text-gray-800">
            Build Your Own AI Learning Universe
          </h1>
          <p className="mb-8 text-gray-600">
            Unlock your potential with our AI-driven platform. Create, explore,
            and master new skills in a universe designed just for you.
          </p>
          <div className="flex items-center gap-4">
            <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-700">
              Explore now
            </button>
            <button className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100">
              Experiment now
            </button>
            <button className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100">
              Extract now
            </button>
          </div>
        </div>
        <div className="relative hidden h-96 md:block">
          <Image
            src="/static/placeholder.png"
            alt="AI Learning Universe"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  </section>
);

// SpotlightCardProps 和 SmallCard, LargeCard 不變
const spotlightsData: SpotlightCardProps[] = [
  {
    type: "small",
    title: "Latest News",
    description: "Discover the newest educational trends and updates.",
    image: "/static/lastnews.png",
    badge: "12+ New",
  },
  {
    type: "small",
    title: "Weekly Highlights",
    description: "Weekly digest of top insightful educational stories.",
    image: "/static/weekly-highlights.png",
    badge: "New",
  },
  {
    type: "small",
    title: "Trending Events",
    description: "Find upcoming educational workshops and webinars.",
    image: "/static/trending-events.jpg",
    badge: "4+ New",
  },
  {
    type: "small",
    title: "New Learning Assets",
    description: "Find upcoming educational workshops and webinars.",
    image: "/static/learning-assets.jpg",
    badge: "2+ New",
  },
  {
    type: "large",
    title: "Join PhoenEdX",
    description:
      "Join our community for exclusive educational benefits. Gain access to expert resources, interactive learning tools, and a network of learners dedicated to growth.",
    buttonText: "Join Community",
    image: "/static/join-phoenedx.jpg",
  },
  {
    type: "large",
    title: "PhoenEdX Blog",
    description:
      "Insights and tips from educational experts. Explore the latest trends, strategies, and resources to enhance your learning and teaching journey.",
    buttonText: "Read Blog",
    image: "/static/phoenedx-blog.png",
  },
];

type SpotlightCardProps = {
  type: "small" | "large";
  title: string;
  description: string;
  image: string;
  badge?: string;
  buttonText?: string;
};

const SmallCard: FC<SpotlightCardProps> = ({
  title,
  description,
  image,
  badge,
}) => (
  <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-xl">
    <div className="relative mb-5 aspect-square w-full">
      <Image
        src={image}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="rounded-2xl"
      />
    </div>
    <div className="mb-2 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      {badge && (
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          {badge}
        </span>
      )}
    </div>
    <p className="flex-grow text-sm text-gray-500">{description}</p>
  </div>
);

const LargeCard: FC<SpotlightCardProps> = ({
  title,
  description,
  buttonText,
  image,
}) => (
  <div className="flex overflow-hidden rounded-3xl border border-gray-200 bg-white transition-shadow hover:shadow-xl md:col-span-2 lg:col-span-2">
    <div className="flex w-1/2 flex-col p-8">
      <h3 className="mb-2 text-xl font-semibold text-gray-700">{title}</h3>
      <p className="mb-8 flex-grow text-sm leading-relaxed text-gray-500">
        {description}
      </p>
      <button className="self-start rounded-full bg-blue-500 py-3 px-6 font-medium text-white transition-colors hover:bg-blue-600">
        {buttonText}
      </button>
    </div>
    <div className="relative w-1/2">
      <Image src={image} alt={title} layout="fill" objectFit="cover" />
    </div>
  </div>
);

// 2. PhoenEdX Spotlights 區塊
const SpotlightsSection: FC<{ className?: string }> = ({ className }) => {
  return (
    // [本次修改] 添加背景、圓角和動態 className，並用 div 包裹內容以確保對齊
    <section className={`bg-white rounded-3xl py-20 ${className}`}>
      {/* [本次修改] 內部容器確保內容對齊 main 的邊界 */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800">
            PhoenEdX Spotlights
          </h2>
          <p className="mt-2 text-base text-gray-500">
            Major announcements, partnerships, and AI educational milestones
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {spotlightsData.map((card) =>
            card.type === "small" ? (
              <SmallCard key={card.title} {...card} />
            ) : (
              <LargeCard key={card.title} {...card} />
            )
          )}
        </div>
      </div>
    </section>
  );
};

const universesData = [
  // ... universesData 內容不變 ...
  {
    Icon: GraduationCap,
    title: "Education",
    description:
      "PhoenEdX Schools & AI Infrastructures for students, schools, and parents.",
    features: [
      "School Courses",
      "Professional Skills",
      "AI Architect Pathways",
    ],
    buttonText: "Go to Education",
  },
  {
    Icon: Briefcase,
    title: "Business & Enterprise",
    description:
      "Create Your Own Working University with industry-specific academies.",
    features: [
      "Finance Academy",
      "Healthcare Academy",
      "Manufacturing Academy",
    ],
    buttonText: "Go to Business & Enterprise",
  },
  {
    Icon: Library,
    title: "A.I. Library",
    description:
      "Turn Every Book into a Friend with AI-powered knowledge companions.",
    features: [
      "Author-as-Friend Bookshelf",
      "Knowledge Tree Factory",
      "MultiMind Labs",
    ],
    buttonText: "Explore AI Library",
  },
  {
    Icon: Store,
    title: "Marketplace",
    description:
      "Shop Books, Bots, Hardware, AI Tools - Amazon meets Multi-Agents.",
    features: ["Bookstore", "ChatBot Marketplace", "AI Hardware & Services"],
    buttonText: "Visit Marketplace",
  },
  {
    Icon: Users,
    title: "Community & Workshops",
    description:
      "Join Learning Communities with reading circles and shared knowledge forests.",
    features: [
      "Global Reading Circles",
      "AI-Supported Events",
      "Knowledge Forest",
    ],
    buttonText: "Explore Community",
  },
  {
    Icon: FlaskConical,
    title: "Research Labs",
    description: "Experiment, Simulate, Discover in our innovation hub.",
    features: [
      "AI Experimentation Lab",
      "Simulation Lab",
      "Ethics & Foresight Lab",
    ],
    buttonText: "Go to Research Labs",
  },
  {
    Icon: Map,
    title: "Roadmap",
    description:
      "See the Future of Learning & AI with our transparent strategic direction.",
    features: [
      "Interactive Timeline",
      "Current Milestones",
      "Future Initiatives",
    ],
    buttonText: "Explore Roadmap",
  },
  {
    Icon: Lightbulb,
    title: "Incubator & Workshop",
    description:
      "Turn Knowledge into Innovation through prototyping and startup creation.",
    features: [
      "Idea-to-Prototype Pipelines",
      "Startup Incubator Program",
      "Global Hackathons",
    ],
    buttonText: "Join Incubator",
  },
];

const UniversesSection: FC<{ className?: string }> = ({ className }) => (
  // [本次修改] 添加背景、圓角和動態 className，並用 div 包裹內容以確保對齊
  <section className={`bg-white rounded-3xl py-20 ${className}`}>
    {/* [本次修改] 內部容器確保內容對齊 main 的邊界 */}
    <div className="mx-auto max-w-7xl">
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">
          Explore PhoenEdX Universe
        </h2>
        <p className="mt-2 text-base text-gray-500">
          Navigate through our comprehensive learning ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {universesData.map((uni) => {
          const Icon = uni.Icon;
          return (
            <div
              key={uni.title}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-xl"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100">
                <Icon className="h-8 w-8 text-blue-600" />
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-800">
                {uni.title}
              </h3>
              <p className="mb-6 text-sm text-gray-500">{uni.description}</p>

              <ul className="mb-8 flex-grow space-y-3 text-gray-600">
                {uni.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm">
                    <CheckCircle2 className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-auto w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition-colors hover:bg-blue-600">
                {uni.buttonText}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const NewsletterSection: FC<{ className?: string }> = ({ className }) => (
  // [本次修改] 添加圓角和動態 className， NewsletterSection 有自己的漸變背景，所以保留
  <section className={`overflow-hidden rounded-3xl py-20 ${className}`}>
    {/* [本次修改] 內部容器確保內容對齊 main 的邊界 */}
    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white sm:p-12">
      <div className="relative z-10 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="md:pr-8">
          <h2 className="mb-4 text-4xl font-bold leading-tight">
            Get the latest education news delivered to your inbox.
          </h2>
          <p className="mb-8 max-w-lg opacity-80">
            Unlock the doorway to continuous learning and stay abreast of the
            latest educational trends by subscribing to the PhoenEdX Newsletter.
          </p>
          <form className="flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email here..."
              className="w-full flex-grow rounded-xl border-none px-6 py-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 shadow-sm transition-colors hover:bg-gray-100"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="relative h-64 w-full md:h-full">
          <Image
            src="/static/newsletter-illustration.png"
            alt="Newsletter illustration"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  </section>
);

const statsData = [
  { icon: Users, number: "2.5M+", label: "Active Learners" },
  { icon: Book, number: "150K+", label: "AI-Enhanced Books" },
  { icon: Building, number: "10K+", label: "Educational Institutions" },
  { icon: Bot, number: "500+", label: "AI learning agents" },
];

const StatsSection: FC<{ className?: string }> = ({ className }) => (
  // [本次修改] 添加背景、圓角和動態 className，並用 div 包裹內容以確保對齊
  <section className={`bg-gray-50 rounded-3xl py-20 ${className}`}>
    {/* [本次修改] 內部容器確保內容對齊 main 的邊界 */}
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-800">
          PhoenEdX by the Numbers
        </h2>
        <p className="mt-2 text-base text-gray-500">
          Building the future of education, one learner at a time.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm"
            >
              <div className="mb-5 rounded-full bg-blue-50 p-5">
                <Icon className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-4xl font-bold text-gray-800">{stat.number}</p>
              <p className="mt-1 text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const testimonialsData = [
  // ... testimonialsData 內容不變 ...
  {
    name: "Sarah Chen",
    role: "AI Research Student",
    quote:
      "PhoenEdX transformed how I learn AI. The AI companions make complex concepts feel like conversations with friends.",
    image: "/testimonials/sarah-chen.jpg",
    bgColor: "bg-pink-100",
  },
  {
    name: "Dr. Michael Rodriguez",
    role: "University Professor",
    quote:
      "The research labs provide incredible tools for experimentation. My students are more engaged than ever before.",
    image: "/testimonials/michael-rodriguez.jpg",
    bgColor: "bg-yellow-100",
  },
  {
    name: "David Lee",
    role: "Enterprise Partner",
    quote:
      "Integrating PhoenEdX into our corporate training has boosted productivity and skill acquisition across the board.",
    image: "/testimonials/david-lee.jpg",
    bgColor: "bg-blue-100",
  },
];

const TestimonialsSection: FC<{ className?: string }> = ({ className }) => (
  // [本次修改] 添加背景、圓角和動態 className，並用 div 包裹內容以確保對齊
  <section className={`bg-gray-50 rounded-3xl py-20 ${className}`}>
    {/* [本次修改] 內部容器確保內容對齊 main 的邊界 */}
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Community Says
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Hear from learners, educators, and enterprises transforming with
            PhoenEdX
          </p>
        </div>
        <div className="flex gap-4">
          <button className="rounded-full border border-gray-200 bg-white p-3 text-gray-500 transition hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button className="rounded-full border border-gray-200 bg-white p-3 text-gray-500 transition hover:bg-gray-100">
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {testimonialsData.map((testimonial) => (
          <div
            key={testimonial.name}
            className="flex overflow-hidden rounded-3xl border border-gray-200 bg-white"
          >
            <div className={`relative w-2/5 ${testimonial.bgColor}`}>
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex w-3/5 flex-col p-8">
              <Quote
                className="mb-4 h-10 w-10 text-blue-100"
                fill="currentColor"
              />
              <p className="mb-6 flex-grow text-base text-gray-600">
                {testimonial.quote}
              </p>
              <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm font-medium text-blue-600">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const footerLinks = {
  Platform: ["Education", "Business", "AI Library", "Marketplace"],
  Community: ["Workshops", "Research Labs", "Incubator", "Roadmap"],
  Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
};

const FooterSection: FC<{ className?: string }> = ({ className }) => (
  // [本次修改] Footer 本身也應該是一個獨立的視覺切片，所以增加背景色和圓角，並用 div 包裹內容
  <footer className={`bg-white rounded-3xl ${className}`}>
    {/* [本次修改] 內部容器確保內容對齊 main 的邊界 */}
    <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-1">
          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/static/phonex.png"
              alt="PhoenEx Logo"
              width={50}
              height={50}
            />
            <span className="text-3xl font-bold text-gray-800">PhoenEx</span>
          </div>
          <p className="mb-6 max-w-sm text-sm leading-relaxed text-gray-600">
            Building the future of education through AI-powered learning
            experiences. Join millions of learners in our Multi-Agent Learning
            Universe.
          </p>
          <div className="flex space-x-3">
            <a
              href="#"
              className="rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="mb-5 font-bold text-gray-800">{title}</h4>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:text-blue-600"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-blue-500 py-4 text-center text-sm text-white">
      <p>&copy; 2025 Copyright by PhoenEx. All rights reserved.</p>
    </div>
  </footer>
);
