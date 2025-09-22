import React, { useState, useEffect, useRef } from "react"; // 1. 引入 useRef
import ChartHeader from "./chartHeader";

// 您的後端 API 端點
const API_ENDPOINT = `${process.env.API_BASE_URL}/api/ai-summary`;

const fetchAiSummary = async (chatRoom) => {
  const payload = chatRoom.map((chat) => ({
    role: chat.role,
    message: chat.message,
    timestamp: new Date().toISOString(),
  }));

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversation: payload }),
    });
    if (!response.ok) {
      throw new Error(`API 請求失敗，狀態碼: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("獲取 AI 摘要時發生錯誤:", error);
    return null;
  }
};

function AiSummary({ chatRoom, onClose }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. 使用 useRef 來保存計時器 ID，避免 re-render 影響
  const debounceTimer = useRef(null);

  useEffect(() => {
    // 3. 清除上一個計時器，如果使用者在計時期間內又發話，則取消上一次的 API 請求計畫
    clearTimeout(debounceTimer.current);

    if (!chatRoom || chatRoom.length === 0) {
      setSummary(null);
      setLoading(false);
      return;
    }

    setLoading(true); // 立即顯示載入中，讓使用者知道正在等待分析
    setError(null);

    // 4. 設定一個新的計時器，延遲 1500 毫秒 (1.5秒) 後執行
    debounceTimer.current = setTimeout(async () => {
      const result = await fetchAiSummary(chatRoom);

      if (result) {
        setSummary(result);
      } else {
        setError("無法載入 AI 分析資料，請稍後再試。");
      }
      setLoading(false); // API 完成後，結束載入狀態
    }, 3500); // 延遲時間設為 3.5 秒

    // 5. 元件卸載時，清除計時器，防止記憶體洩漏
    return () => {
      clearTimeout(debounceTimer.current);
    };
  }, [chatRoom]); // 依賴 chatRoom 的變動

  // ... renderContent 和 return 的部分完全不變 ...
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex-grow min-h-0 flex items-center justify-center">
          <p className="text-gray-500 animate-pulse">AI 分析中...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex-grow min-h-0 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }
    if (!summary || summary.totalContributions === 0) {
      return (
        <div className="flex-grow min-h-0 flex items-center justify-center">
          <p className="text-gray-500">尚無對話內容可供分析。</p>
        </div>
      );
    }
    return (
      <div className="flex-grow min-h-0 py-4 overflow-y-auto text-sm space-y-4">
        <h3 className="font-bold text-lg">專案智能分析</h3>
        <div>
          <h4 className="font-bold mb-1">📊 基本統計</h4>
          <ul className="list-disc list-inside text-gray-700">
            <li>總貢獻數：{summary.totalContributions}</li>
            <li>活躍參與者：{summary.activeParticipants}</li>
            <li>最後更新：{summary.lastUpdate}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-1">🎯 核心議題識別</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {summary.coreIssues.map((issue, index) => (
              <li key={index} className="truncate">
                {issue}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-1">📈 協作趨勢</h4>
          <ul className="list-disc list-inside text-gray-700">
            <li>參與度：{summary.collaborationTrend.participation}</li>
            <li>共識度：{summary.collaborationTrend.consensus}</li>
            <li>完成進度：{summary.collaborationTrend.progress}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-1">💡 AI 洞察</h4>
          <p className="text-gray-700">{summary.aiInsight}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-[20px] px-4 py-2 w-full h-full flex flex-col">
      <ChartHeader title="AI 智能摘要" closeHandler={onClose} />
      {renderContent()}
    </div>
  );
}

export default AiSummary;
