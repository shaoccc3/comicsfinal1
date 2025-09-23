"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/legacy/image";
import { useWorkspaceContext } from "../../context/workspaceProvider";
import { FaPaperclip, FaMicrophone, FaUserPlus } from "react-icons/fa6";
import { BiLogoTelegram } from "react-icons/bi";
import { FiMessageSquare } from "react-icons/fi";

// A small helper component for the header to include the add agent button
const ChartHeader = ({ title, chat, closeHandler, children }) => (
  <div className="border-b border-[#E1E1E1] pb-4 flex justify-between items-center">
    <div>
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500">{chat}</p>
    </div>
    <div className="flex items-center gap-2">
      {children}
      <button
        onClick={closeHandler}
        className="text-gray-400 hover:text-gray-600 text-2xl font-light"
      >
        &times;
      </button>
    </div>
  </div>
);

function SchoolWork({
  chatRoom,
  handleSendMessage,
  agents,
  activeAgents,
  onAddAgent,
  userId,
}) {
  console.log("User ID received in SchoolWork component:", userId);
  const { setChats } = useWorkspaceContext();
  const [messageData, setMessageData] = useState("");
  const [showAgentList, setShowAgentList] = useState(false);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  // --- [NEW] State to manage mention suggestions ---
  const [suggestions, setSuggestions] = useState([]);
  const [mentionQuery, setMentionQuery] = useState("");

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatRoom]);

  const onSendMessage = () => {
    if (messageData.trim()) {
      handleSendMessage(messageData);
      setMessageData("");
    }
  };

  // --- [NEW] Handler for input changes to detect '@' ---
  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessageData(value);

    // Use regex to find if the user is typing a mention at the end of the text
    const mentionMatch = value.match(/@(\w*)$/);

    if (mentionMatch) {
      const query = mentionMatch[1].toLowerCase();
      setMentionQuery(query);
      // Filter agents based on the query (matching agent ID or name)
      const filteredSuggestions = Object.entries(agents).filter(
        ([id, agent]) =>
          id !== "user" &&
          (id.toLowerCase().includes(query) ||
            agent.name.toLowerCase().includes(query))
      );
      setSuggestions(filteredSuggestions);
    } else {
      // If no mention is being typed, clear suggestions
      setSuggestions([]);
      setMentionQuery("");
    }
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return; // 如果使用者取消選擇檔案，則不執行任何操作
    }

    // 再次確認 userId 是否存在
    if (!userId) {
      console.error("User ID is missing. Cannot upload file.");
      // 可以考慮使用更友善的 UI 提示取代 alert
      alert("發生錯誤：無法取得使用者資訊，無法上傳檔案。");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // [可選] 提供一個即時的 UI 反應，告知使用者上傳已開始
    // 例如：可以在畫面上顯示一個 "上傳中..." 的訊息
    console.log(`Uploading ${file.name}...`);

    try {
      const apiEndpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload/${userId}`;
      console.log(`Sending file to: ${apiEndpoint}`); // 在開發中確認 URL 是否正確

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
        // 注意：當使用 FormData 時，瀏覽器會自動設定 'Content-Type' 為 'multipart/form-data'，
        // 所以不需要手動加入 headers。
      });

      const result = await response.json();

      if (!response.ok) {
        // 如果伺服器回傳錯誤（例如 4xx 或 5xx 狀態碼），則拋出錯誤
        throw new Error(result.detail || "伺服器發生錯誤，檔案上傳失敗。");
      }

      // 成功上傳後，給予使用者明確的成功提示
      alert(`成功： ${result.message || "檔案已成功上傳"}`);
    } catch (error) {
      console.error("File upload error:", error);
      // 將錯誤訊息顯示給使用者
      alert(`上傳失敗： ${error.message}`);
    } finally {
      // 無論成功或失敗，都清空 file input 的值，
      // 以確保使用者可以再次選擇同一個檔案
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // --- [NEW] Handler for clicking a suggestion ---
  const handleSuggestionClick = (agentId) => {
    // Find the beginning of the current mention
    const lastAtPosition = messageData.lastIndexOf("@");
    // Replace the partial mention with the full agent ID and a space
    const newMessage =
      messageData.substring(0, lastAtPosition) + `@${agentId} `;

    setMessageData(newMessage);
    setSuggestions([]); // Hide the suggestions menu
    textareaRef.current?.focus(); // Refocus on the textarea
  };

  return (
    <div className="bg-white h-full rounded-[20px] px-4 py-2 w-full flex flex-col justify-between">
      <ChartHeader
        title={"School Work"}
        chat={"Interactive"}
        closeHandler={() => setChats(false)}
      >
        <div className="relative">
          <button
            onClick={() => setShowAgentList(!showAgentList)}
            className="p-2 rounded-full hover:bg-gray-100"
            title="Add Agent"
          >
            <FaUserPlus className="text-gray-600" />
          </button>
          {showAgentList && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border rounded-lg shadow-xl z-10">
              <div className="p-3 font-bold border-b text-sm">
                Available Agents
              </div>
              <ul>
                {Object.entries(agents).map(([id, agent]) => {
                  if (id === "user") return null;
                  const isAdded = activeAgents.includes(id);
                  return (
                    <li
                      key={id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={agent.avatar}
                          alt={agent.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="text-sm">{agent.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          onAddAgent(id);
                          setShowAgentList(false);
                        }}
                        disabled={isAdded}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                          isAdded
                            ? "bg-gray-200 text-gray-500 cursor-default"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        {isAdded ? "Joined" : "Join"}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </ChartHeader>

      <div
        ref={chatContainerRef}
        className="py-4 flex-1 flex flex-col gap-6 items-start overflow-y-auto"
      >
        {/* Chat message rendering remains the same */}
        {chatRoom.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full w-full text-gray-400">
            <FiMessageSquare size={48} />
            <p className="mt-4 text-lg">Start your conversation</p>
          </div>
        ) : (
          chatRoom.map((chat, index) => {
            if (chat.role === "system") {
              return (
                <div key={index} className="w-full text-center my-2">
                  <p className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">
                    {chat.message}
                  </p>
                </div>
              );
            }
            return (
              <div
                key={index}
                className={`flex gap-3 w-full items-start ${
                  chat.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div className="relative h-[35px] w-[35px] rounded-full flex-shrink-0">
                  <Image
                    src={chat.image}
                    alt={chat.name}
                    objectFit="cover"
                    className="rounded-full"
                    layout="fill"
                  />
                </div>
                <div
                  className={`rounded-lg p-2.5 relative max-w-md ${
                    chat.role === "user"
                      ? "bg-[#2B8CFF] text-white"
                      : "bg-[#F4F8FC] text-gray-800"
                  }`}
                >
                  {chat.role !== "user" && (
                    <p className="text-xs font-bold mb-1 text-gray-600">
                      {chat.name}
                    </p>
                  )}
                  <p className="text-sm font-normal whitespace-pre-wrap">
                    {chat.message}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="border-t border-[#E1E1E1] flex gap-2 md:gap-4 pt-4 items-center">
        {/* --- [NEW] Add hidden file input element --- */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {/* --- [MODIFIED] Add onClick to the paperclip button --- */}
        <button
          onClick={() => fileInputRef.current?.click()} // This triggers the file input
          className="flex bg-[#F4F8FC] text-gray-600 justify-center items-center p-3 rounded-full border border-[#E1E1E1] cursor-pointer hover:bg-gray-200 transition-colors"
          title="Upload File"
        >
          <FaPaperclip />
        </button>

        <button
          className="flex bg-[#F4F8FC] text-[#2B8CFF] justify-center items-center p-3 rounded-full border border-[#E1E1E1] cursor-pointer hover:bg-gray-200 transition-colors"
          title="Record Voice (UI only)"
        >
          <FaMicrophone />
        </button>
        {/* --- [MODIFIED] Added a relative container for the suggestion menu --- */}
        <div className="flex-grow relative">
          {/* --- [NEW] The suggestion menu UI --- */}
          {suggestions.length > 0 && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-48 overflow-y-auto">
              <ul>
                {suggestions.map(([id, agent]) => (
                  <li key={id}>
                    <button
                      onClick={() => handleSuggestionClick(id)}
                      className="w-full text-left flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Image
                        src={agent.avatar}
                        alt={agent.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800">
                          {agent.name}
                        </span>
                        <span className="text-xs text-gray-500">@{id}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <textarea
            ref={textareaRef} // --- [NEW] Attach the ref
            className="bg-[#F4F8FC] p-3 rounded-xl border-none w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-shadow"
            onChange={handleInputChange} // --- [MODIFIED] Use the new handler
            value={messageData}
            placeholder="Type @ to mention an agent..."
            rows="1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSendMessage();
              }
            }}
          />
        </div>
        <button
          className={`flex justify-center items-center p-3 rounded-full cursor-pointer transition-colors ${
            messageData.trim()
              ? "bg-[#2B8CFF] text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          onClick={onSendMessage}
          disabled={!messageData.trim()}
          title="Send Message"
        >
          <BiLogoTelegram size={24} />
        </button>
      </div>
    </div>
  );
}

export default SchoolWork;
