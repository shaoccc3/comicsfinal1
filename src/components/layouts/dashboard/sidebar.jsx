"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/legacy/image";
import { useState } from "react";

import cn from "../../../utils/class-names";

import dp from "../../../assets/header/dp.png";
import iconUser from "../../../assets/icon/iconuser.png";

import { Fragment } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

import Logo from "../../../components/logo";
import {
  WorkspaceContext,
  useWorkspaceContext,
} from "../../../context/workspaceProvider";

import { FaCrown } from "react-icons/fa";
import { RiHome6Fill } from "react-icons/ri";
import { FaAward } from "react-icons/fa6";
import { PiBrainFill } from "react-icons/pi";
import { GiSpellBook } from "react-icons/gi";
import { IoLibrary } from "react-icons/io5";
import { HiTemplate } from "react-icons/hi";
import { IoLogIn } from "react-icons/io5";

const sidebarData = [
  {
    label: "Learning Assets",
    icon: <PiBrainFill className="eye_icons" />,
    data: [
      {
        label: "Home",
        route: "/dashboard",
      },
      {
        label: "Option 2",
        route: "/option2-route",
      },
    ],
  },
  {
    label: "Learning Profile",
    icon: <GiSpellBook className="eye_icons" />,
    data: [
      {
        label: "Option 1",
        route: "/profile-option1",
      },
      {
        label: "Option 2",
        route: "/profile-option2",
      },
    ],
  },
  {
    label: "Library",
    icon: <IoLibrary className="eye_icons" />,
    data: [
      {
        label: "Option 1",
        route: "/library-option1",
      },
      {
        label: "Option 2",
        route: "/library-option2",
      },
    ],
  },
  {
    label: "Templates",
    icon: <HiTemplate className="eye_icons" />,
    data: [
      {
        label: "Option 1",
        route: "/templates-option1",
      },
      {
        label: "Option 2",
        route: "/templates-option2",
      },
    ],
  },
];
const sidebarButtons = [
  {
    label: "Try PhoenEdx Pro",
    routes: "/pro",
    icon: <FaCrown className="eye_icons" />,
  },
  {
    label: "Home",
    routes: "/",
    icon: <RiHome6Fill className="eye_icons" />,
  },
  {
    label: "Award Winning",
    routes: "/awards",
    icon: <FaAward className="eye_icons" />,
  },
];

export default function Sidebar({ className }) {
  const { sidebar, setSidebar } = useWorkspaceContext();
  const pathname = usePathname();

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <aside
      className={cn(
        `${
          sidebar ? "w-[270px] 2xl:w-72" : "w-0"
        } transform-width duration-500 fixed overflow-hidden bottom-0 start-0 z-50 h-[85vh] border-gray-100 rounded-[30px] bg-white  dark:bg-gray-100/50 mt-10 mx-4`,
        className
      )}
    >
      {/* ++ 修改: 在這裡增加 h-full 讓父容器有完整高度 ++ */}
      <div className="min-w-[270px] top-0 z-40 bg-gray-0/10 overflow-hidden pb-5 pt-2 dark:bg-gray-100/5 h-full">
        {/* ++ 修改: 讓這個 flex 容器也撐滿高度 ++ */}
        <div className="w-full px-2 flex flex-col h-full">
          {/* 個人資料區塊 (不變) */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className=" border-b-2 border-b-[#9E9E9E] flex w-[94%] mx-auto justify-between py-4 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <div className="flex items-center ">
                    <Image alt={"DP"} src={dp} width="50" height="50" />
                    <div className="flex flex-col items-start ml-3">
                      <label className="text-[#666666] font-semibold text-[16px] mb-1">
                        Shayan Ali
                      </label>
                      <label className="flex items-center text-[#9E9E9E] ">
                        Free.
                        <Image
                          alt={""}
                          src={iconUser}
                          width="20"
                          height="20"
                          className="mx-2"
                        />
                        1
                      </label>
                    </div>
                  </div>
                  <ChevronUpIcon
                    className={`${
                      open ? "" : "rotate-180"
                    } h-5 w-5 transform transition duration-300 `}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 text-sm text-gray-500">
                  <Link
                    href="/settings"
                    className="flex w-full rounded-2xl justify-between mt-2 px-2 py-3 text-left text-[#9E9E9E] focus:outline-none hover:text-white hover:bg-[#2B8CFF] focus-visible:ring focus-visible:ring-purple-500/75"
                  >
                    <div className="flex flex-col items-start ml-6">
                      <label className="text-[16px]">Options</label>
                    </div>
                  </Link>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* 中間滾動選單區塊 (不變) */}
          <div
            className={` text-[16px] fon mx-auto w-full max-w-md px-2 overflow-y-auto bg-white  h-[65vh] `}
          >
            {sidebarButtons.map((items) => (
              <Link
                key={items.label}
                href={items.routes}
                className=" visual_assests flex w-full rounded-2xl justify-between mt-2 px-2 py-3 text-left text-[#9E9E9E]  focus:outline-none hover:text-white hover:bg-[#2B8CFF] focus-visible:ring focus-visible:ring-purple-500/75"
              >
                <div className="flex items-center ">
                  <div className="">{items.icon}</div>
                  <div className="flex flex-col items-start ml-3">
                    <label className="">{items.label}</label>
                  </div>
                </div>
              </Link>
            ))}

            {sidebarData.map((item) => (
              <Disclosure key={item.label}>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={` visual_assests ${
                        open ? "text-black active" : "text-[#9E9E9E]"
                      }   rounded-2xl flex w-full justify-between mt-2 px-2 py-3 text-lefttext-[#666666] hover:text-white hover:bg-[#2B8CFF] focus:outline-none focus-visible:ring-[#2B8CFF] focus-visible:ring-purple-500/75`}
                    >
                      <div className="flex items-center ">
                        <div className="">{item.icon}</div>
                        <div className="flex flex-col items-start ml-3">
                          <label className="  mb-1">{item.label}</label>
                        </div>
                      </div>
                      <ChevronUpIcon
                        className={`${
                          open ? "" : "rotate-180"
                        } h-5 w-5 transform transition duration-300 `}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pb-2 text-sm text-gray-500">
                      {item.data.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.route}
                          className="flex w-full rounded-2xl justify-between mt-2 px-2 py-3 text-left text-[#9E9E9E] focus:outline-none hover:text-white hover:bg-[#2B8CFF] focus-visible:ring focus-visible:ring-purple-500/75"
                        >
                          <div className="flex items-center ">
                            <div className="flex flex-col items-start ml-6">
                              <label className="text-[16px] cursor-pointer">
                                {subItem.label}
                              </label>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>

          {/* ++ 修改: 在這裡加上 mt-auto 將按鈕推至底部 ++ */}
          <button
            onClick={handleLogout}
            className=" visual_assests flex w-full rounded-2xl justify-between mt-2 px-2 py-3 text-left text-[#9E9E9E]  focus:outline-none hover:text-white hover:bg-[#2B8CFF] focus-visible:ring focus-visible:ring-purple-500/75 mt-auto"
          >
            <div className="flex items-center ">
              <IoLogIn className="eye_icons" />
              <div className="flex flex-col items-start ml-6">
                <label className="text-[16px] cursor-pointer">Logout</label>
              </div>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
