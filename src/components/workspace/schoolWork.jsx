"use client";

import React, { useState } from "react";
import ChartHeader from "./chartHeader";
import Image from "next/legacy/image";
import learning2 from "../../assets/icon/profile.png";
import learning3 from "../../assets/icon/profile2.png";
import { useWorkspaceContext } from "../../context/workspaceProvider";
import { FaMicrophone } from "react-icons/fa6";
import { BiLogoTelegram } from "react-icons/bi";
import { BsSoundwave } from "react-icons/bs";

function SchoolWork() {
  const { setChats } = useWorkspaceContext();
  // Renamed for clarity: messageData holds the text for the new message
  const [messageData, setMessageData] = useState("");
  const [chatRoom, setChatRoom] = useState([
    {
      user: "person",
      message:
        "Hey! Let me know if you have any questions about the assignment.",
      image: learning2,
    },
    {
      user: "user",
      message: "Okay, sounds good! I'll take a look now.",
      image: learning3,
    },
    // Removed the soundwave example to start fresh
  ]);

  // --- NEW: Function to handle sending a message ---
  const handleSendMessage = () => {
    // 1. Prevent sending empty messages
    if (!messageData.trim()) return;

    // 2. Create the new message object for the user
    const newUserMessage = {
      user: "user",
      message: messageData,
      image: learning3,
    };

    // 3. Add the user's message to the chat room
    setChatRoom((prevChatRoom) => [...prevChatRoom, newUserMessage]);

    // 4. Clear the input field after sending
    setMessageData("");

    // 5. Simulate a response after a short delay (e.g., 1.5 seconds)
    setTimeout(() => {
      const botResponse = {
        user: "person",
        message: `Got it! ${messageData} Thanks for the update. 👍`,
        image: learning2,
      };
      setChatRoom((prevChatRoom) => [...prevChatRoom, botResponse]);
    }, 1500); // 1500 milliseconds = 1.5 seconds
  };

  return (
    <div className="bg-white h-full rounded-[20px] px-4 py-2 w-full flex flex-col justify-between">
      <ChartHeader
        title={"School Work"}
        chat={"Interactive"}
        closeHandler={() => setChats(false)}
      />

      <div className="py-4 flex flex-col justify-start h-full gap-10 items-start overflow-y-auto ">
        {chatRoom.map((item, index) => (
          <div
            key={index}
            className={`flex gap-3 w-full ${
              item.user === "user" ? "flex-row-reverse " : ""
            } `}
          >
            <div className="border border-lightGray relative h-[35px] w-[40px] rounded-full flex-shrink-0">
              <Image
                src={item.image}
                alt="profile"
                objectFit="cover"
                className="rounded-full"
                layout="fill"
              />
            </div>
            <div
              className={`rounded-lg p-2 relative ${
                item.user === "user"
                  ? "bg-[#2B8CFF] text-white"
                  : "bg-[#F4F8FC]"
              }`}
            >
              <span className="text-[11px]">{item.message}</span>
              <div
                className={`absolute bottom-[-25px] ${
                  item.user === "user" ? "left-2" : "right-2"
                } border border-lightGray bg-white py-[1px] px-2 rounded-full`}
              >
                🤩 👍
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#E1E1E1] flex gap-4 pt-2 justify-start items-center">
        <div className="w-full">
          <textarea
            className="bg-[#F4F8FC] p-2 rounded-md border-none w-full text-sm focus:ring-1 focus:ring-blue-500 outline-none"
            onChange={(e) => setMessageData(e.target.value)}
            // --- MODIFIED: Control the textarea value and handle Enter key ---
            value={messageData}
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevents new line on Enter
                handleSendMessage();
              }
            }}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-[#F4F8FC] text-[#2B8CFF] justify-center items-center p-2 rounded-full border-[#E1E1E1] cursor-pointer">
            <FaMicrophone />
          </div>

          <div
            className="flex bg-[#2B8CFF] text-[#F4F8FC] justify-center items-center p-2 rounded-full cursor-pointer"
            // --- MODIFIED: Use the new handler function ---
            onClick={handleSendMessage}
          >
            <BiLogoTelegram />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchoolWork;
