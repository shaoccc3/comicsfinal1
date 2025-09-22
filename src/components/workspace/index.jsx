"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import MainArea from "./mainArea";
import InstantEvaluation from "./InstantEvaluation";
import NotesBoard from "./notesBoard";
import SchoolWork from "./schoolWork";
import EvaluationMatrix from "./evaluationMatrix";
import { useWorkspaceContext } from "../../context/workspaceProvider";
import { useResizable } from "react-resizable-layout";
import SampleSplitter from "./sampleSplitter";
import AiSummary from "./AiSummary";

// --- Agent Avatars ---
import learning2 from "../../assets/icon/profile.png"; // 主助理頭像
import learning3 from "../../assets/icon/profile2.png"; // 使用者頭像
import analysisAvatar from "../../assets/icon/profile3.png";
import professorAvatar from "../../assets/icon/professor.png";
import teacherAvatar from "../../assets/icon/teacher.png";
import deadpoolAvatar from "../../assets/icon/deadpool.png"; // 假設這是新 Agent 的頭像

function getOrCreateUserId() {
  let userId = localStorage.getItem("rag_user_id");
  if (!userId) {
    userId = `react-web-${crypto.randomUUID()}`;
    localStorage.setItem("rag_user_id", userId);
  }
  return userId;
}

function Workspace() {
  const { notesBoard, instantEvaluation, evaluationMatrix, chats } =
    useWorkspaceContext();
  const mainContainerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [chatRoom, setChatRoom] = useState([]);
  const socketRef = useRef(null);
  const [showAiSummary, setShowAiSummary] = useState(true);

  // --- State for Agent Management ---
  const [agents, setAgents] = useState({
    user: {
      name: "You",
      avatar: learning3,
    },
    main_assistant: {
      name: "School Work AI",
      avatar: learning2,
    },
    analysis_agent: {
      name: "analysis_agent",
      avatar: analysisAvatar,
    },
    professor: {
      name: "professor",
      avatar: professorAvatar,
    },
    teacher: {
      name: "teacher",
      avatar: teacherAvatar,
    },
    deadpool: {
      name: "deadpool",
      avatar: deadpoolAvatar,
    },
  });

  const [activeAgents, setActiveAgents] = useState(["main_assistant"]);

  // --- WebSocket Connection ---
  useEffect(() => {
    const userId = getOrCreateUserId();
    const backendUrl = `${process.env.WEBSOCKET_URL}/chat/ws/${userId}`;
    const socket = new WebSocket(backendUrl);
    socketRef.current = socket;

    socket.onopen = () => console.log("WebSocket connection established");

    socket.onmessage = (event) => {
      let parsedData;
      try {
        parsedData = JSON.parse(event.data);
        console.log("從後端收到的原始資料:", parsedData);
      } catch (e) {
        console.error("Failed to parse message data:", event.data);
        parsedData = {
          content: "An error occurred.",
          sender: "assistant",
          agent_id: "main_assistant",
        };
      }

      const agentId = parsedData.agent_id || "main_assistant";
      const agentInfo = agents[agentId] || agents["main_assistant"];
      console.log("解析出的 Agent ID:", agentId);

      const newMessage = {
        role: parsedData.sender === "user" ? "user" : "assistant",
        message: parsedData.content,
        image: agentInfo.avatar,
        name: agentInfo.name,
      };
      setChatRoom((prev) => [...prev, newMessage]);
    };

    socket.onclose = () => console.log("WebSocket connection closed");
    socket.onerror = (error) => console.error("WebSocket error:", error);

    return () => socket.close();
  }, [agents]);

  // --- Message and Agent Handling Functions ---
  const handleSendMessage = (messageData) => {
    if (
      !messageData.trim() ||
      !socketRef.current ||
      socketRef.current.readyState !== WebSocket.OPEN
    ) {
      return;
    }
    const userInfo = agents["user"];
    const newUserMessage = {
      role: "user",
      message: messageData,
      image: userInfo.avatar,
      name: userInfo.name,
    };
    setChatRoom((prev) => [...prev, newUserMessage]);

    // Send a structured message to the backend
    socketRef.current.send(
      JSON.stringify({
        type: "chat",
        content: messageData,
      })
    );
  };

  const handleAddAgent = (agentIdToAdd) => {
    if (
      activeAgents.includes(agentIdToAdd) ||
      !socketRef.current ||
      socketRef.current.readyState !== WebSocket.OPEN
    ) {
      return;
    }

    // Notify backend
    socketRef.current.send(
      JSON.stringify({
        type: "add_agent",
        agent_id: agentIdToAdd,
      })
    );

    // Update frontend state immediately for better UX
    setActiveAgents((prev) => [...prev, agentIdToAdd]);

    const agentName = agents[agentIdToAdd]?.name || "New Agent";
    setChatRoom((prev) => [
      ...prev,
      {
        role: "system",
        message: `${agentName} has joined the conversation.`,
      },
    ]);
  };

  // ... (Resizable layout hooks remain the same) ...
  const {
    isDragging: isHorizontalDragging,
    position: horizontalH,
    separatorProps: horizontalDragBarProps,
  } = useResizable({
    axis: "y",
    initial: 350,
    min: 70,
    max: 450,
    reverse: true,
  });
  const {
    isDragging: isRightPanelDragging,
    position: rightPanelW,
    separatorProps: rightPanelDragBarProps,
  } = useResizable({ axis: "x", initial: 400, min: 300, reverse: true });
  const {
    isDragging: isMiddlePanelDragging,
    position: middlePanelW,
    separatorProps: middlePanelDragBarProps,
  } = useResizable({ axis: "x", initial: 400, min: 300, reverse: true });

  return (
    <div className="relative flex flex-col gap-2 w-full h-full whitespace-nowrap">
      <div className="flex grow h-full w-full" ref={mainContainerRef}>
        {/* --- COLUMN 1: Main Content Area --- */}
        <div className="flex flex-col grow h-full min-w-0">
          <div className="h-full max-w-full">
            <MainArea chatRoom={chatRoom} />
          </div>
          {!evaluationMatrix && !instantEvaluation ? null : (
            <>
              <SampleSplitter
                dir="horizontal"
                isDragging={isHorizontalDragging}
                {...horizontalDragBarProps}
              />
              <div
                className={`flex w-full ${isHorizontalDragging && "dragging"}`}
                style={{ height: horizontalH, width: "100%" }}
              >
                <div className="h-full w-full flex gap-4">
                  {instantEvaluation && (
                    <div
                      className={`${
                        evaluationMatrix ? "w-1/2" : "w-full"
                      } h-full`}
                    >
                      <InstantEvaluation />
                    </div>
                  )}
                  {evaluationMatrix && (
                    <div
                      className={`${
                        instantEvaluation ? "w-1/2" : "w-full"
                      } h-full`}
                    >
                      <EvaluationMatrix />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* --- SPLITTER 1 & COLUMN 2: AI Summary --- */}
        {showAiSummary && (
          <>
            <SampleSplitter
              isDragging={isMiddlePanelDragging}
              {...middlePanelDragBarProps}
            />
            <div
              className={`shrink-0 h-full flex ${
                isMiddlePanelDragging && "dragging"
              }`}
              style={{ width: middlePanelW }}
            >
              <AiSummary
                chatRoom={chatRoom}
                onClose={() => setShowAiSummary(false)}
              />
            </div>
          </>
        )}

        {/* --- SPLITTER 2 & COLUMN 3: Notes & Chat --- */}
        {!notesBoard && !chats ? null : (
          <>
            <SampleSplitter
              isDragging={isRightPanelDragging}
              {...rightPanelDragBarProps}
            />
            <div
              className={`shrink-0 h-full ${
                isRightPanelDragging && "dragging"
              }`}
              style={{ width: rightPanelW }}
            >
              <div className="h-full w-full flex flex-col gap-4">
                {notesBoard && (
                  <div
                    className={`${
                      chats ? "h-1/2" : "h-full"
                    } w-full overflow-hidden`}
                  >
                    <NotesBoard />
                  </div>
                )}
                {chats && (
                  <div
                    className={`${
                      notesBoard ? "h-1/2" : "h-full"
                    } w-full overflow-hidden`}
                  >
                    <SchoolWork
                      chatRoom={chatRoom}
                      handleSendMessage={handleSendMessage}
                      agents={agents}
                      activeAgents={activeAgents}
                      onAddAgent={handleAddAgent}
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Workspace;
