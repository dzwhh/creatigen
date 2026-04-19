"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SecondarySidebarProps {
  isOpen: boolean;
  activeSubItem: string;
  onSubItemClick: (item: string) => void;
  onCollapse: () => void;
  sectionTitle?: string;
}

const subMenuItems = [
  {
    id: "image",
    label: "Image",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    id: "video",
    label: "Video",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    id: "workflow",
    label: "Workflow",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
];

const publishSubMenuItems = [
  {
    id: "instagram",
    label: "Instagram",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    id: "tiktok",
    label: "TikTok",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
];

export default function SecondarySidebar({
  isOpen,
  activeSubItem,
  onSubItemClick,
  onCollapse,
  sectionTitle = "Creation",
}: SecondarySidebarProps) {
  const items = sectionTitle === "Publish" ? publishSubMenuItems : subMenuItems;
  return (
    <div
      className={`
        h-full bg-white flex flex-col
        transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? "w-[240px] min-w-[240px] opacity-100" : "w-0 min-w-0 opacity-0"}
      `}
      style={{
        borderRight: "1px solid rgba(15,23,42,0.06)",
      }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex-shrink-0">
        {/* Workspace Selector */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 h-9 px-3 text-sm font-medium rounded-lg"
          >
            <span
              className="w-5 h-5 rounded text-white flex items-center justify-center text-[10px] font-bold"
              style={{ background: "#0a84ff" }}
            >
              A
            </span>
            All Workspaces
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-lg"
            onClick={onCollapse}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="11 17 6 12 11 7" />
              <polyline points="18 17 13 12 18 7" />
            </svg>
          </Button>
        </div>

        {/* Section Title */}
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-1" style={{ color: "#64748b" }}>
          {sectionTitle}
        </h2>
      </div>

      <Separator className="opacity-60" />

      {/* Sub Menu */}
      <nav className="flex-1 px-3 pt-3">
        {items.map((item) => {
          const isActive = activeSubItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSubItemClick(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1
                transition-all duration-150 text-[13px] font-medium cursor-pointer
                ${isActive
                  ? "text-[#0a84ff]"
                  : "text-[#64748b] hover:text-[#0f172a]"
                }
              `}
              style={
                isActive
                  ? { background: "rgba(10,132,255,0.08)" }
                  : undefined
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
