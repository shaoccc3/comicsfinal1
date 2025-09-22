// src/app/page.tsx
import {
  Search,
  BookOpen,
  Users,
  Briefcase,
  Lightbulb,
  Heart,
  Calendar,
  Settings,
  GraduationCap,
  Award,
  ThumbsUp,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  User,
  Bell,
  Home,
  LayoutGrid,
  Library,
  MessageSquare,
  BarChart3,
  Rocket,
} from "lucide-react";
import Image from "next/image";
import type { FC, ReactNode } from "react";

// --- Layout Components (As requested, using DashboardLayout concept) ---

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => (
  <div className="flex bg-slate-50 min-h-screen font-sans">
        <Sidebar />   {" "}
    <div className="flex-1 flex flex-col">
            <TopHeader />      <main className="p-8">{children}</main>   {" "}
    </div>
     {" "}
  </div>
);

const Sidebar: FC = () => (
  <aside className="w-20 bg-white border-r border-slate-200 flex flex-col items-center py-4 space-y-6">
       {" "}
    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            P    {" "}
    </div>
       {" "}
    <nav className="flex flex-col items-center gap-6 text-slate-500">
           {" "}
      <a href="#" title="Home" className="p-2 rounded-lg hover:bg-slate-100">
                <Home className="w-6 h-6" />     {" "}
      </a>
           {" "}
      <a
        href="#"
        title="My Learnings"
        className="p-2 rounded-lg hover:bg-slate-100"
      >
                <Library className="w-6 h-6" />     {" "}
      </a>
           {" "}
      <a
        href="#"
        title="Community"
        className="p-2 rounded-lg bg-blue-50 text-blue-600"
      >
                <Users className="w-6 h-6" />     {" "}
      </a>
           {" "}
      <a
        href="#"
        title="Spotlights"
        className="p-2 rounded-lg hover:bg-slate-100"
      >
                <LayoutGrid className="w-6 h-6" />     {" "}
      </a>
           {" "}
      <a
        href="#"
        title="Messages"
        className="p-2 rounded-lg hover:bg-slate-100"
      >
                <MessageSquare className="w-6 h-6" />     {" "}
      </a>
           {" "}
      <a
        href="#"
        title="Analytics"
        className="p-2 rounded-lg hover:bg-slate-100"
      >
                <BarChart3 className="w-6 h-6" />     {" "}
      </a>
         {" "}
    </nav>
     {" "}
  </aside>
);

const TopHeader: FC = () => (
  <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-200 px-8 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-800">Welcome to Phoenix</h1>
       {" "}
    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
           {" "}
      <a href="#" className="hover:text-blue-600">
        AI Library
      </a>
           {" "}
      <a href="#" className="hover:text-blue-600">
        Marketplace
      </a>
           {" "}
      <a href="#" className="hover:text-blue-600">
        Community & Workshops
      </a>
           {" "}
      <a href="#" className="hover:text-blue-600">
        Research Lab
      </a>
           {" "}
      <a href="#" className="hover:text-blue-600">
        Roadmap
      </a>
         {" "}
    </nav>
       {" "}
    <div className="flex items-center gap-4">
           {" "}
      <div className="relative w-full max-w-xs">
               {" "}
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-slate-100 pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-none text-sm"
        />
               {" "}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
             {" "}
      </div>
           {" "}
      <button className="p-2 rounded-full hover:bg-slate-100">
                <Bell className="w-5 h-5 text-slate-500" />     {" "}
      </button>
           {" "}
      <Image
        src="/avatar-2.png" // Placeholder for user avatar
        alt="User Avatar"
        width={36}
        height={36}
        className="rounded-full cursor-pointer"
      />
         {" "}
    </div>
     {" "}
  </header>
);

// --- Page Section Components ---

const HeroSection: FC = () => (
  <section className="bg-white rounded-2xl p-10 flex items-center justify-between mb-12">
       {" "}
    <div className="max-w-xl">
           {" "}
      <h1 className="text-5xl font-bold text-slate-800 leading-tight mb-4">
                Build Your Own AI Learning Universe      {" "}
      </h1>
           {" "}
      <p className="text-slate-500 mb-8">
                Unlock your potential with our AI-powered platform. Create
        personalized         learning paths, discover new skills, and achieve
        your goals faster than         ever.      {" "}
      </p>
           {" "}
      <div className="flex gap-4">
               {" "}
        <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Start learning        {" "}
        </button>
               {" "}
        <button className="bg-slate-100 text-slate-700 font-semibold px-6 py-3 rounded-lg hover:bg-slate-200 transition-colors">
                    Enterprise Solutions        {" "}
        </button>
               {" "}
        <button className="bg-slate-100 text-slate-700 font-semibold px-6 py-3 rounded-lg hover:bg-slate-200 transition-colors">
                    Explore Library        {" "}
        </button>
             {" "}
      </div>
         {" "}
    </div>
       {" "}
    <div className="relative w-[400px] h-[300px] hidden lg:block">
           {" "}
      <Image
        src="/hero-image.png" // Replace with actual image path
        alt="AI Learning Universe"
        layout="fill"
        objectFit="contain"
      />
         {" "}
    </div>
     {" "}
  </section>
);

const SpotlightSection: FC = () => {
  const spotlightCards = [
    { title: "Latest News", image: "/spotlight-1.png" },
    { title: "Weekly Highlights", image: "/spotlight-2.png" },
    { title: "Trending Events", image: "/spotlight-3.png" },
    { title: "New Learning Assets", image: "/spotlight-4.png" },
  ];

  return (
    <section className="mb-12">
           {" "}
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
                PhoenEdX Spotlights      {" "}
      </h2>
           {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {" "}
        {spotlightCards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
          >
                       {" "}
            <div className="relative aspect-[4/3] bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
                             
              <Image
                src={card.image}
                alt={card.title}
                layout="fill"
                objectFit="contain"
                className="p-4"
              />
                         {" "}
            </div>
                       {" "}
            <h3 className="font-semibold text-slate-700">{card.title}</h3>     
               {" "}
          </div>
        ))}
                 {/* Second row of spotlights */}       {" "}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <div className="relative aspect-[4/3] mb-4"></div>       
              <h3 className="font-semibold text-slate-700">Join PhoenEdX</h3>   
             {" "}
        </div>
               {" "}
        <div className="bg-blue-500 p-4 rounded-xl flex items-center justify-center">
                       
          <Image
            src="/promo-2.png"
            alt="Puzzle Promo"
            width={150}
            height={150}
            objectFit="contain"
          />
                 {" "}
        </div>
               {" "}
        <div className="bg-sky-400 p-4 rounded-xl flex items-center justify-center">
                     {" "}
          <Image
            src="/promo-3.png"
            alt="Computer Promo"
            width={150}
            height={150}
            objectFit="contain"
          />
                 {" "}
        </div>
               {" "}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <div className="relative aspect-[4/3] mb-4"></div>       
              <h3 className="font-semibold text-slate-700">PhoenEdX Blog</h3>   
             {" "}
        </div>
             {" "}
      </div>
         {" "}
    </section>
  );
};

const UniverseSection: FC = () => {
  const universeItems = [
    {
      icon: GraduationCap,
      title: "Academics",
      features: ["Textbooks", "Research Papers", "Case Studies"],
    },
    {
      icon: Briefcase,
      title: "Professional Development",
      features: ["Workshops", "Certifications", "Networking"],
    },
    {
      icon: Library,
      title: "Skills library",
      features: ["Coding", "Design", "Marketing"],
    },
    {
      icon: Lightbulb,
      title: "Soft skills",
      features: ["Communication", "Leadership", "Teamwork"],
    },
    {
      icon: Users,
      title: "Community & Workshops",
      features: ["Online Forums", "Local Meetups", "Hackathons"],
    },
    {
      icon: Rocket,
      title: "Research Labs",
      features: ["AI Research", "Data Science", "Publications"],
    },
    {
      icon: Settings,
      title: "Incubator & Workshop",
      features: ["Startup Support", "Mentorship", "Pitching Events"],
    },
    {
      icon: Award,
      title: "Teacher Education",
      features: ["Pedagogy", "Classroom Tech", "Certifications"],
    },
  ];

  return (
    <section className="mb-12">
           {" "}
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Explore PhoenEdX Universe      {" "}
      </h2>
           {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {" "}
        {universeItems.map((item) => (
          <div
            key={item.title}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
          >
                       {" "}
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <item.icon className="w-6 h-6 text-blue-600" />     
                   {" "}
            </div>
                       {" "}
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              {item.title}
            </h3>
                       {" "}
            <ul className="text-slate-500 text-sm space-y-1 mb-4">
                           {" "}
              {item.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2">
                  ✓ {feat}
                </li>
              ))}
                         {" "}
            </ul>
                       {" "}
            <button className="w-full bg-blue-50 text-blue-700 font-semibold py-2 rounded-lg hover:bg-blue-100 transition-colors">
                            View learnings            {" "}
            </button>
                     {" "}
          </div>
        ))}
             {" "}
      </div>
         {" "}
    </section>
  );
};

const NewsletterSection: FC = () => (
  <section className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-10 flex items-center justify-between mb-12 text-white overflow-hidden relative">
       {" "}
    <div className="max-w-2xl z-10">
           {" "}
      <h2 className="text-3xl font-bold mb-2">
                Get the latest education news delivered to your inbox.      {" "}
      </h2>
           {" "}
      <p className="opacity-80 mb-6">
                Unlock the doorway to continuous learning and stay abreast of
        the latest         educational trends by subscribing to the PhoenEdX
        Newsletter.      {" "}
      </p>
           {" "}
      <div className="flex bg-white rounded-lg p-1 max-w-md shadow-lg">
               {" "}
        <input
          type="email"
          placeholder="Enter your email here..."
          className="w-full px-4 py-2 text-slate-700 focus:outline-none rounded-l-lg"
        />
               {" "}
        <button className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Subscribe        {" "}
        </button>
             {" "}
      </div>
         {" "}
    </div>
       {" "}
    <div className="relative w-[300px] h-[250px] hidden lg:block z-10">
           {" "}
      <Image
        src="/newsletter-image.png" // Replace with actual image path
        alt="Newsletter"
        layout="fill"
        objectFit="contain"
      />
         {" "}
    </div>
     {" "}
  </section>
);

const StatsSection: FC = () => {
  const stats = [
    { icon: GraduationCap, number: "2.5M+", label: "Active Learners" },
    { icon: BookOpen, number: "150K+", label: "Courses & Resources" },
    { icon: Award, number: "10K+", label: "Expert Instructors" },
    { icon: ThumbsUp, number: "500+", label: "Partner Institutions" },
  ];

  return (
    <section className="bg-white rounded-2xl p-8 mb-12">
           {" "}
      <h2 className="text-center text-2xl font-bold text-slate-800 mb-8">
                PhoenEdX by the Numbers      {" "}
      </h2>
           {" "}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
               {" "}
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
                       {" "}
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <stat.icon className="w-8 h-8 text-slate-500" />   
                     {" "}
            </div>
                       {" "}
            <p className="text-3xl font-bold text-blue-600">{stat.number}</p>   
                    <p className="text-slate-500">{stat.label}</p>         {" "}
          </div>
        ))}
             {" "}
      </div>
         {" "}
    </section>
  );
};

const TestimonialsSection: FC = () => {
  const testimonials = [
    {
      name: "Sanam Chen",
      handle: "@sanamchen",
      quote:
        "PhoenEdX has transformed my learning journey. The personalized paths and AI tools are incredible!",
      image: "/avatar-1.png",
      color: "bg-pink-50",
    },
    {
      name: "Dr. Michael Rodrigues",
      handle: "@doc_rodrigues",
      quote:
        "The quality of academic courses and the research lab are top-notch. A game-changer for professionals.",
      image: "/avatar-2.png",
      color: "bg-yellow-50",
    },
    {
      name: "Jessica Wong",
      handle: "@jesswong.dev",
      quote:
        "The community features are fantastic for connecting with peers and experts. Highly recommended for developers.",
      image: "/avatar-3.png",
      color: "bg-cyan-50",
    },
  ];

  return (
    <section className="mb-12">
           {" "}
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
                What Our Community Says      {" "}
      </h2>
           {" "}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {" "}
        {testimonials.map((t) => (
          <div key={t.name} className={`p-6 rounded-xl ${t.color}`}>
                       {" "}
            <p className="text-slate-600 mb-4 text-lg">“{t.quote}”</p>         
             {" "}
            <div className="flex items-center gap-4 mt-6">
                           {" "}
              <Image
                src={t.image}
                alt={t.name}
                width={48}
                height={48}
                className="rounded-full"
              />
                           {" "}
              <div>
                               {" "}
                <p className="font-semibold text-slate-800">{t.name}</p>       
                        <p className="text-sm text-slate-500">{t.handle}</p>   
                         {" "}
              </div>
                         {" "}
            </div>
                     {" "}
          </div>
        ))}
             {" "}
      </div>
         {" "}
    </section>
  );
};

const Footer: FC = () => {
  const links = {
    Platform: ["Education", "Business", "AI Library", "Marketplace", "Roadmap"],
    Community: ["Workshops", "Research Labs", "Incubator"],
    Support: [
      "Help Center",
      "Contact Us",
      "Privacy Policy",
      "Terms of Service",
    ],
  };

  return (
    <footer className="bg-slate-800 text-white p-10 rounded-t-2xl">
           {" "}
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
               {" "}
        <div className="col-span-2">
                    <h3 className="text-2xl font-bold mb-4">PhoenEx</h3>       
           {" "}
          <p className="text-slate-400 text-sm mb-4">
                        Your universe for AI-powered learning and growth.      
               {" "}
          </p>
                   {" "}
          <div className="flex gap-4 text-slate-400">
                       {" "}
            <a href="#" className="hover:text-white">
              <Facebook className="w-5 h-5" />
            </a>
                       {" "}
            <a href="#" className="hover:text-white">
              <Twitter className="w-5 h-5" />
            </a>
                       {" "}
            <a href="#" className="hover:text-white">
              <Linkedin className="w-5 h-5" />
            </a>
                       {" "}
            <a href="#" className="hover:text-white">
              <Youtube className="w-5 h-5" />
            </a>
                     {" "}
          </div>
                 {" "}
        </div>
               {" "}
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
                        <h4 className="font-semibold mb-4">{title}</h4>         
             {" "}
            <ul className="space-y-2">
                    _{" "}
              {items.map((link) => (
                <li key={link}>
                                   {" "}
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white text-sm"
                  >
                                        {link}                 {" "}
                  </a>
                                 {" "}
                </li>
              ))}
                         {" "}
            </ul>
                     {" "}
          </div>
        ))}
             {" "}
      </div>
           {" "}
      <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
                © 2025 Copyright by Phoenix. All rights reserved.      {" "}
      </div>
         {" "}
    </footer>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  return (
    <DashboardLayout>
              <HeroSection />
              <SpotlightSection />
              <UniverseSection />
              <NewsletterSection />
              <StatsSection />
              <TestimonialsSection />
              <Footer />   {" "}
    </DashboardLayout>
  );
}
