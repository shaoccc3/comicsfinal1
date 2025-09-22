"use client";
import React, { useMemo } from "react";
import { useWorkspaceContext } from "../../../context/workspaceProvider";
import "tailwindcss/tailwind.css"; // 確保已引入 TailwindCSS
import CollaborationTimeline from "./flow/CollaborationTimeline";
// --- Icon Imports ---
import { IoChevronDown } from "react-icons/io5";
import {
  FaUpRightAndDownLeftFromCenter,
  FaDownLeftAndUpRightToCenter,
} from "react-icons/fa6";
import {
  ClockIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftEllipsisIcon,
  DocumentTextIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/solid";

// --- MainArea Component (Fully Integrated) ---
function MainArea({ chatRoom }) {
  const {
    evaluationMatrix,
    setEvaluationMatrix,
    instantEvaluation,
    setInstantEvaluation,
    notesBoard,
    setNotesBoard,
    chats,
    setChats,
  } = useWorkspaceContext();

  const maximizeView = () => {
    setEvaluationMatrix(false);
    setInstantEvaluation(false);
    setNotesBoard(false);
    setChats(false);
  };

  const minimizeView = () => {
    setEvaluationMatrix(true);
    setInstantEvaluation(true);
    setNotesBoard(true);
    setChats(true);
  };

  const transformedData = useMemo(() => {
    if (!chatRoom) {
      return { contributions: [], drafts: [] };
    }
    const contributions = chatRoom.map((chat, index) => ({
      id: index,
      author: chat.role === "user" ? "使用者" : "Assistant",
      content: chat.message,
      created_at: new Date().toISOString(),
      reactions: [],
      type: "idea",
      priority: "normal",
    }));
    return { contributions, drafts: [] };
  }, [chatRoom]);

  return (
    <div className="h-full flex flex-col bg-white rounded-[20px] overflow-hidden p-3">
      {/* 頂部導覽列 */}
      <div className="flex justify-between items-center border-b pb-3 mb-3">
        <div className="flex justify-between gap-4 items-center">
          <p className="text-lightGray xl:text-[14px] lg:text-[12px] text-[10px]">
            Subject: <span className="text-black font-[600]">Technology</span>
          </p>
          <p className="text-lightGray xl:text-[14px] lg:text-[12px] text-[10px] text-nowrap">
            Category: <span className="text-black font-[600]">Blockchain</span>
          </p>
          <p className="text-lightGray xl:text-[14px] lg:text-[12px] text-[10px] text-nowrap">
            Module :{" "}
            <span className="text-black font-[600]">
              Web 3 Tech_Intelligence
            </span>
          </p>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex border border-[#D8D8D8] bg-[#F4F8FC] rounded-full justify-center py-1 items-center px-2">
            <select className="border-none bg-[#F4F8FC] py-0 px-3 rounded-full xl:text-[14px] lg:text-[11px] text-[10px]">
              <option>Day 1</option>
              <option>Day 2</option>
              <option>Day 3</option>
            </select>
            <IoChevronDown className="xl:text-[14px] lg:text-[11px] text-[10px]" />
          </div>
          <div className="border-l border-lightGray h-[30px]"></div>
          {evaluationMatrix && instantEvaluation && notesBoard && chats ? (
            <button
              className="border border-[#9E9E9E] bg-[#9E9E9E] lg:p-2 p-1 rounded-md"
              onClick={maximizeView}
            >
              <FaUpRightAndDownLeftFromCenter className="text-white" />
            </button>
          ) : (
            <button
              className="border border-[#9E9E9E] bg-[#9E9E9E] lg:p-1 p-[5px] rounded-md"
              onClick={minimizeView}
            >
              <FaDownLeftAndUpRightToCenter className="text-white text-[8px]" />
            </button>
          )}
        </div>
      </div>

      {/* 主要內容區域：條件渲染 */}
      <div className="flex-1 w-full h-full overflow-y-auto">
        <CollaborationTimeline projectData={transformedData} />
      </div>
    </div>
  );
}

export default MainArea;
