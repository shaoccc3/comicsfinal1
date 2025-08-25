"use client";

import { Fragment, useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { Menu as MenuIcon, X, ChevronDown, ChevronRight } from "lucide-react";

import cn from "../../../utils/class-names";
import { useIsMounted } from "../../../hooks/use-is-mounted";
import { useWindowScroll } from "../../../hooks/use-window-scroll";

import dp from "../../../assets/header/dp.png";
import bg from "../../../assets/header/bg.png";

// Merged and updated navigation data from the second file
const navigationLinks = [
  {
    title: "PhoenEdX Spotlights",
    href: "/spotlights",
    subItems: [
      { title: "Home", href: "/spotlights/home" },
      {
        title: "Education Highlights",
        href: "/spotlights/education-highlights",
      },
      {
        title: "Business Highlights",
        href: "/spotlights/business-highlights",
      },
      { title: "Community & Events", href: "/spotlights/community-events" },
      { title: "Join Us", href: "/spotlights/join-us" },
    ],
  },
  {
    title: "Education",
    href: "/education",
    subItems: [
      { title: "PhoenEdX School", href: "/education/school" },
      { title: "A.I. Infras", href: "/education/ai-infras" },
      { title: "School Courses", href: "/education/courses" },
      {
        title: "Professional Skills",
        href: "/education/professional-skills",
      },
      { title: "Life & Social", href: "/education/life-social" },
      { title: "21th Faith Citizenship", href: "/education/citizenship" },
      { title: "A.I. Architect", href: "/education/ai-architect" },
    ],
  },
  {
    title: "Business & Enterprise",
    href: "/business",
    subItems: [
      { title: "Enterprise Homepage", href: "/business/homepage" },
      { title: "Industry Specific Academies", href: "/business/academies" },
      { title: "Role-Based Training Tracks", href: "/business/training" },
      { title: "Multi-Agent Mentor Pods", href: "/business/mentor-pods" },
      { title: "Enterprise Labs", href: "/business/labs" },
      {
        title: "Compliance & Governance Hub",
        href: "/business/compliance",
      },
      {
        title: "Leadership & Change Management Track",
        href: "/business/leadership",
      },
      {
        title: "Enterprise Community & Knowledge Sharing",
        href: "/business/community",
      },
      {
        title: "Certification & Career Pathways",
        href: "/business/certification",
      },
    ],
  },
  {
    title: "A.I. Library",
    href: "/ai-library",
    subItems: [
      { title: "Homepage", href: "/ai-library/homepage" },
      {
        title: "Author as-Friend Bookshelf",
        href: "/ai-library/bookshelf",
      },
      {
        title: "Knowledge Tree Factory",
        href: "/ai-library/knowledge-tree",
      },
      {
        title: "Cognitive & Emotional Learning Agents",
        href: "/ai-library/agents",
      },
      { title: "MultiMind Labs", href: "/ai-library/multimind-labs" },
    ],
  },
  {
    title: "Marketplace",
    href: "/marketplace",
    subItems: [
      { title: "Homepage", href: "/marketplace/homepage" },
      { title: "Bookstore", href: "/marketplace/bookstore" },
      { title: "ChatBot", href: "/marketplace/chatbot" },
      { title: "Hardware", href: "/marketplace/hardware" },
      { title: "A.I. Services", href: "/marketplace/ai-services" },
      {
        title: "A.I. Development Kits & Tools",
        href: "/marketplace/dev-kits",
      },
      {
        title: "Immersive Labs Marketplace",
        href: "/marketplace/immersive-labs",
      },
    ],
  },
  {
    title: "Community & Events",
    href: "/community",
    subItems: [
      { title: "Homepage", href: "/community/homepage" },
      {
        title: "Global Reading Circles",
        href: "/community/reading-circles",
      },
      { title: "A.I. Supported Events", href: "/community/events" },
      {
        title: "Community Knowledge Forest",
        href: "/community/knowledge-forest",
      },
      {
        title: "Social & Emotional Learning Spaces",
        href: "/community/learning-spaces",
      },
    ],
  },
  {
    title: "Research Labs",
    href: "/research-labs",
    subItems: [
      { title: "Homepage", href: "/research-labs/homepage" },
      {
        title: "A.I. Experimentation Lab",
        href: "/research-labs/experimentation",
      },
      {
        title: "Knowledge Simulation Lab",
        href: "/research-labs/simulation",
      },
      {
        title: "Cognitive Science Lab",
        href: "/research-labs/cognitive-science",
      },
      { title: "Ethics & Foresight Lab", href: "/research-labs/ethics" },
      {
        title: "Collaborative Research Hub",
        href: "/research-labs/collaborative-hub",
      },
      {
        title: "Open Innovation Challenges",
        href: "/research-labs/challenges",
      },
    ],
  },
  {
    title: "Incubator",
    href: "/incubator",
    subItems: [
      { title: "Homepage", href: "/incubator/homepage" },
      { title: "Idea to Prototype Pipeline", href: "/incubator/pipeline" },
      { title: "Startup Incubator Program", href: "/incubator/program" },
      { title: "Workshops & Hackathons", href: "/incubator/workshops" },
      { title: "Collaboration Arena", href: "/incubator/arena" },
      { title: "Funding & Partnerships", href: "/incubator/funding" },
      {
        title: "Alumni & Innovation Success Stories",
        href: "/incubator/alumni",
      },
    ],
  },
  {
    title: "Roadmap",
    href: "/roadmap",
    subItems: [
      { title: "HomePage", href: "/roadmap/homepage" },
      { title: "Current Milestones", href: "/roadmap/milestones" },
      { title: "Future Initiatives", href: "/roadmap/initiatives" },
      { title: "Community & Co-Creation", href: "/roadmap/co-creation" },
      { title: "Research-to-Impact Pipeline", href: "/roadmap/pipeline" },
      { title: "Foresight & Ethics Tracker", href: "/roadmap/ethics" },
      {
        title: "Recognition & Transparency Dashboard",
        href: "/roadmap/dashboard",
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();

  // State management for mobile menu from the second file
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileItems, setExpandedMobileItems] = useState({});

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setExpandedMobileItems({});
    }
  };

  const toggleMobileSubmenu = (title) => {
    setExpandedMobileItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[1000] flex items-center bg-[#f4f8fc]",
          isMounted && windowScroll.y > 2 ? "card-shadow" : ""
        )}
      >
        <div className="mx-4 mt-4 flex h-full min-h-16 w-full flex-row items-center justify-between rounded-[25px] bg-white px-4 backdrop-blur-xl md:px-5 lg:px-6 2xl:py-5 3xl:px-8 4xl:px-10">
          {/* Left Section: Mobile Menu Toggle, Logo, and Desktop Nav */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="h-8 w-8 cursor-pointer text-gray-600 lg:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X /> : <MenuIcon />}
            </button>

            {/* Logo */}
            <Link href="/dashboard" className="flex-shrink-0">
              <Image src={bg} alt={"icon"} width="40" height="40" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 lg:flex">
              {navigationLinks.map((item) => (
                <div key={item.title} className="group relative">
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-2 py-4 text-gray-600 hover:text-gray-900"
                  >
                    <span className="whitespace-nowrap text-sm font-medium">
                      {item.title}
                    </span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>
                  {/* Desktop Dropdown */}
                  {item.subItems && (
                    <div className="invisible absolute left-0 z-50 mt-0 w-64 rounded-md border bg-white py-1 shadow-lg opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="block whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: User Profile Dropdown */}
          <Menu as="div" className="relative ml-auto flex-shrink-0 text-left">
            {({ open }) => (
              <>
                <Menu.Button className="inline-flex w-full items-center justify-center gap-x-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <Image alt={"dp"} src={dp} width="30" height="30" />
                  <span className="hidden sm:inline">Shayan</span>
                  <ChevronDown
                    className={`${
                      open ? "rotate-180" : ""
                    } h-5 w-5 transform transition duration-300 `}
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-[1000] mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Account settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Slide-out Menu */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-80 transform bg-white shadow-lg duration-300 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600"
            onClick={toggleMobileMenu}
          >
            <Image src={bg} alt="Logo" width={32} height={32} />
            <span className="font-semibold">PhoenEdX</span>
          </Link>
          <button onClick={toggleMobileMenu} aria-label="Close menu">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="h-full overflow-y-auto pb-20 pt-4">
          {navigationLinks.map((item) => (
            <div
              key={item.title}
              className="border-b border-gray-100 last:border-b-0"
            >
              <button
                onClick={() => toggleMobileSubmenu(item.title)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-gray-700 hover:bg-gray-50"
              >
                <span className="font-medium">{item.title}</span>
                <ChevronRight
                  className={`h-5 w-5 transition-transform duration-200 ${
                    expandedMobileItems[item.title] ? "rotate-90" : ""
                  }`}
                />
              </button>

              {expandedMobileItems[item.title] && item.subItems && (
                <div className="bg-gray-50">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      className="block px-8 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      onClick={toggleMobileMenu}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
