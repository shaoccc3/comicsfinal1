// CollaborationTimeline.jsx
import React, { useMemo } from "react";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleLeftEllipsisIcon,
  DocumentTextIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
  QuestionMarkCircleIcon,
  DocumentIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/solid";

// Helper to format text
const formatContent = (text) => {
  if (typeof text !== "string") {
    return null;
  }
  const html = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");
  return <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
};

// --- Sub-components defined outside the main component ---

// Component for a single User Contribution Item
const ContributionItem = ({ contribution, onReactionClick }) => {
  const authorColors = {
    使用者: "bg-pink-500",
    愛麗絲: "bg-pink-500",
    鮑伯: "bg-indigo-500",
    查理: "bg-teal-500",
    教授: "bg-gray-600",
    社區代表: "bg-amber-500",
  };
  const userColor = authorColors[contribution.author] || "bg-purple-500";

  const typeIcons = {
    idea: LightBulbIcon,
    improvement: ArrowTrendingUpIcon,
    question: QuestionMarkCircleIcon,
    resource: DocumentIcon,
    feedback: ChatBubbleLeftIcon,
  };

  const IconComponent = contribution.is_reaction
    ? ChatBubbleLeftEllipsisIcon
    : typeIcons[contribution.type] || ChatBubbleLeftIcon;

  const agreeCount =
    contribution.reactions?.filter((r) => r.type === "agree").length || 0;
  const disagreeCount =
    contribution.reactions?.filter((r) => r.type === "disagree").length || 0;

  return (
    <div className="timeline-item">
      <div className="timeline-line"></div>
      <div className={`timeline-icon text-white ${userColor}`}>
        <IconComponent className="h-5 w-5" />
      </div>
      <div className="ml-4">
        <div className="flex items-center gap-2 mb-2">
          <p className="font-bold">{contribution.author}</p>
          <span className="text-sm text-gray-500">
            {contribution.is_reaction ? "回應了意見" : "貢獻了想法"}
          </span>
        </div>
        <div
          className={`mt-2 p-4 rounded-lg border bg-gray-50 user-contribution-card whitespace-pre-wrap break-words`}
        >
          {formatContent(contribution.content)}
        </div>

        {!contribution.is_reaction && (
          <div className="mt-3 pt-3 border-t flex items-center gap-4">
            <button
              onClick={() => onReactionClick(contribution.id, "agree")}
              className={`flex items-center text-sm text-green-600 hover:text-green-800 transition-colors ${
                agreeCount > 0 ? "font-semibold" : ""
              }`}
            >
              <HandThumbUpIcon className="h-5 w-5 mr-1" /> 贊同 ({agreeCount})
            </button>
            <button
              onClick={() => onReactionClick(contribution.id, "disagree")}
              className={`flex items-center text-sm text-red-600 hover:text-red-800 transition-colors ${
                disagreeCount > 0 ? "font-semibold" : ""
              }`}
            >
              <HandThumbDownIcon className="h-5 w-5 mr-1" /> 不贊同 (
              {disagreeCount})
            </button>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-2">
          {new Date(contribution.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

// Component for a single AI Draft Item
const DraftItem = ({ draft, onCompareVersion }) => {
  const confidenceColor =
    draft.ai_confidence >= 0.8 ? "text-green-600" : "text-yellow-600";
  const confidenceText = draft.ai_confidence
    ? `${Math.floor(draft.ai_confidence * 100)}%`
    : "N/A";

  return (
    <div className="timeline-item">
      <div className="timeline-line"></div>
      <div className="timeline-icon bg-green-500 text-white">
        <DocumentTextIcon className="h-5 w-5" />
      </div>
      <div className="ml-4">
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold text-green-600">
            AI 系統{" "}
            <span className="font-normal text-gray-500 text-sm">
              生成了草稿 v{draft.version}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${confidenceColor}`}>
              信心度: {confidenceText}
            </span>
            <button
              onClick={() => onCompareVersion(draft.version)}
              className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-600 px-2 py-1 rounded transition-colors"
            >
              比較
            </button>
          </div>
        </div>
        <div className="prose mt-2 p-4 rounded-lg border-2 border-dashed border-green-300 bg-gradient-to-r from-green-50 to-blue-50 whitespace-pre-wrap break-words">
          {formatContent(draft.content)}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {new Date(draft.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

// --- Main Timeline Component ---
export default function CollaborationTimeline({
  projectData,
  onReactionClick,
  onCompareVersion,
}) {
  const timelineItems = useMemo(() => {
    if (!projectData) return [];

    const contributions = (projectData.contributions || []).map((c) => ({
      type: "contribution",
      data: c,
    }));
    const drafts = (projectData.drafts || []).map((d) => ({
      type: "draft",
      data: d,
    }));

    return [...contributions, ...drafts].sort(
      (a, b) => new Date(a.data.created_at) - new Date(b.data.created_at)
    );
  }, [projectData]);

  if (!projectData) {
    return <div>Loading project data...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-6 border-b pb-4 flex items-center">
        <ChatBubbleLeftEllipsisIcon className="h-6 w-6 mr-2 text-indigo-600" />
        協作歷程
      </h3>
      <div className="relative max-h-[600px] overflow-y-auto pr-4">
        {timelineItems.map((item, index) => (
          <div
            key={`${item.type}-${item.data.id || index}`}
            className="fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {item.type === "contribution" ? (
              <ContributionItem
                contribution={item.data}
                onReactionClick={onReactionClick}
              />
            ) : (
              <DraftItem
                draft={item.data}
                onCompareVersion={onCompareVersion}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
