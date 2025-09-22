// VersionTree.jsx
import React from "react";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";

// 版本節點子元件
const VersionNode = ({ draft, isLatest, onViewVersion }) => {
  const nodeClasses = `version-node ${isLatest ? "current" : "draft"}`;
  const confidenceColor =
    draft.ai_confidence >= 0.8 ? "text-green-600" : "text-yellow-600";

  return (
    <div className={nodeClasses}>
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-bold text-sm">
            版本 {draft.version} {isLatest ? "(最新)" : ""}
          </h4>
          <p className="text-xs text-gray-500">
            {new Date(draft.created_at).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <div className={`text-xs ${confidenceColor}`}>
            信賴度: {Math.floor(draft.ai_confidence * 100)}%
          </div>
          <button
            onClick={() => onViewVersion(draft.version)}
            className="view-version-btn text-xs text-blue-500 hover:underline"
          >
            查看
          </button>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-600 truncate">
        {draft.content.split("\n").find((line) => line.trim()) || "..."}
      </div>
    </div>
  );
};

// 版本樹主元件
export default function VersionTree({
  drafts,
  onViewVersion,
  onCompareLatest,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-6 border-b pb-4 flex items-center">
        <DocumentDuplicateIcon className="h-6 w-6 mr-2 text-green-600" />
        版本樹
        <button
          onClick={onCompareLatest}
          className="ml-auto text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-colors"
        >
          比較最新
        </button>
      </h3>
      <div className="version-tree max-h-96 overflow-y-auto pr-2">
        {drafts.map((draft, index) => (
          <VersionNode
            key={draft.id}
            draft={draft}
            isLatest={index === drafts.length - 1}
            onViewVersion={onViewVersion}
          />
        ))}
      </div>
    </div>
  );
}
