"use client";

import React, { useState } from "react";
import AmazonProductSet from "@/components/AmazonProductSet";
import ImageConfigPanel from "@/components/ImageConfigPanel";
import ImagePreviewPanel from "@/components/ImagePreviewPanel";

const tabs = [
  { id: "amazon", icon: "grid", label: "Amazon Product Set" },
  { id: "listing", icon: "list", label: "Listing Images" },
];

interface ImageWorkspaceProps {
  onImageClick: (imageId: string) => void;
}

export default function ImageWorkspace({ onImageClick }: ImageWorkspaceProps) {
  const [activeTab, setActiveTab] = useState("amazon");

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden" style={{ background: "#f4f6f9" }}>
      {/* Tab bar */}
      <div
        className="flex items-center gap-1 px-6 py-3 overflow-x-auto flex-shrink-0"
        style={{
          background: "#ffffff",
          borderBottom: "1px solid rgba(15,23,42,0.06)",
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "text-[#0f172a]"
                  : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
              }`}
              style={
                isActive
                  ? {
                      background: "#ffffff",
                      border: "1px solid rgba(15,23,42,0.1)",
                      boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
                    }
                  : { border: "1px solid transparent" }
              }
            >
              <TabIcon name={tab.icon} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === "amazon" && (
          <AmazonProductSet onImageClick={onImageClick} />
        )}
        {activeTab === "listing" && (
          <>
            <ImageConfigPanel />
            <ImagePreviewPanel />
          </>
        )}

      </div>
    </div>
  );
}

function TabIcon({ name }: { name: string }) {
  const props = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 };
  switch (name) {
    case "grid": return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>;
    case "list": return <svg {...props}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>;
    case "layout": return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>;
    case "rotate": return <svg {...props}><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>;
    case "languages": return <svg {...props}><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" /><circle cx="12" cy="12" r="10" /></svg>;
    case "eraser": return <svg {...props}><path d="M20 20H7L3 16l9-9 8 8-4 4" /><line x1="2" y1="22" x2="22" y2="22" /></svg>;
    case "sparkle": return <svg {...props}><path d="M12 2L9 9l-7 1 5 5-1.5 7L12 18.5 18.5 22 17 15l5-5-7-1z" /></svg>;
    default: return null;
  }
}
