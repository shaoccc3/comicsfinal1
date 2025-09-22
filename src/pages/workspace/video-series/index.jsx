"use client";
import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FaFilePdf } from "react-icons/fa";
import axios from "axios";

function VideoSeriesPage() {
  const [prompt, setPrompt] = useState("");
  const [resolution, setResolution] = useState("480p");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [language, setLanguage] = useState("Chinese");
  const [style, setStyle] = useState("MARVIE");
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  const pollingIntervalRef = useRef(null);
  const pollingTimeoutRef = useRef(null);

  const cleanupTimers = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
      pollingTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => cleanupTimers();
  }, []);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const startPolling = (projectId) => {
    setPolling(true);
    setStatusMessage(`影片處理中... 專案 ID: ${projectId}`);
    setError("");

    pollingTimeoutRef.current = setTimeout(() => {
      setStatusMessage("處理超時，請稍後再試。");
      setError("Polling timed out.");
      setPolling(false);
      cleanupTimers();
    }, 300000); // 5 minutes

    pollingIntervalRef.current = setInterval(async () => {
      try {
        const res = await axios.get(
          `https://accurately-lucky-polecat.ngrok-free.app/webhook/story_video/${projectId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true", // 或任何值都可以
            },
          }
        );

        // 假設後端回傳的資料庫紀錄中有 status 欄位
        const status = res.data.status || "processing";
        setStatusMessage(`正在檢查影片狀態... (狀態: ${status})`);

        if (status === "ready" || res.data.video_url) {
          cleanupTimers();
          setPolling(false);
          setStatusMessage("影片生成成功！");
          setVideoUrl(res.data.video_url);
        }
      } catch (pollError) {
        // 404 Not Found 是正常情況，代表 webhook 還沒被呼叫，資料還沒寫入資料庫
        if (pollError.response && pollError.response.status === 404) {
          setStatusMessage("等待影片處理完成...");
        } else {
          cleanupTimers();
          setPolling(false);
          setStatusMessage("查詢狀態時發生錯誤。");
          setError("Failed to poll video status.");
          console.error("Polling error:", pollError);
        }
      }
    }, 60000);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setResponse(null);
    setVideoUrl("");
    setStatusMessage("");
    setError("");
    cleanupTimers();

    let pdfUrl = null;

    if (pdfFile) {
      const formData = new FormData();
      formData.append("file", pdfFile);
      try {
        const uploadRes = await axios.post("/api/upload/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        pdfUrl = uploadRes.data.file_url;
      } catch (uploadError) {
        setError("檔案上傳失敗。");
        setLoading(false);
        return;
      }
    }

    try {
      const requestBody = {
        bgm_url: "./assets/storyai/bgm/fantasy.mp3",
        content: prompt,
        // pdf_url: pdfUrl,
        style,
        language,
        aspect_ratio: aspectRatio,
        resolution,
        webhook_url:
          "https://accurately-lucky-polecat.ngrok-free.app/webhook/story_video_ready",
      };

      const storyRes = await axios.post(
        "http://localhost:8080/generate-story",
        requestBody
      );
      setResponse(storyRes.data);
      setLoading(false);

      if (storyRes.data && storyRes.data.project_id) {
        startPolling(storyRes.data.project_id);
      } else {
        setError("未能從後端取得有效的專案 ID。");
      }
    } catch (genError) {
      setError("發送生成請求時發生錯誤。");
      if (genError.response) {
        console.error("Error data:", genError.response.data);
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex flex-col p-4 w-full rounded-3xl h-full">
      <div className="w-full justify-between flex text-[16px] font-semibold border-b-2 pb-4 mb-4 border-[#D8D8D8]">
        <h3 className="text-[28px] font-bold">Video Series Generation</h3>
      </div>
      <div className="flex flex-col gap-4">
        <textarea
          className="w-full h-48 p-4 border rounded-lg"
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="flex flex-wrap gap-4 items-center">
          {/* Resolution Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                {resolution}
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setResolution("480p")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        480p
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setResolution("720p")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        720p
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Aspect Ratio Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                {aspectRatio}
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setAspectRatio("16:9")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        16:9
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setAspectRatio("9:16")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        9:16
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Language Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                {language}
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setLanguage("English")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        English
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setLanguage("Chinese")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        Chinese
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Style Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                {style}
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setStyle("MARVIE")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        MARVIE
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setStyle("Cinematic")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        Cinematic
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setStyle("Anime")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        Anime
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <label className="flex items-center gap-2 bg-[#F4F8FC] text-[#2B8CFF] py-2 px-4 rounded-3xl cursor-pointer">
            <FaFilePdf className="text-2xl" />
            <span>{pdfFile ? pdfFile.name : "Upload PDF"}</span>
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <button
          className="bg-[#2B8CFF] text-white py-2 px-4 rounded-3xl self-start disabled:bg-gray-400"
          onClick={handleGenerate}
          disabled={loading || polling}
        >
          {loading ? "請求發送中..." : polling ? "影片處理中..." : "Generate"}
        </button>

        {statusMessage && (
          <div
            className={`mt-4 p-4 border rounded-lg ${
              error ? "bg-red-50 text-red-800" : "bg-blue-50 text-blue-800"
            }`}
          >
            <p>{statusMessage}</p>
          </div>
        )}

        {videoUrl && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Generated Video:</h3>
            <div className="w-full max-w-4xl mx-auto aspect-video bg-black rounded-lg overflow-hidden">
              <video
                controls
                width="100%"
                height="auto"
                src={videoUrl}
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoSeriesPage;
