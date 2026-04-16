"use client";

import React from "react";

interface SecondarySidebarProps {
  isOpen: boolean;
  activeSubItem: string;
  onSubItemClick: (item: string) => void;
  onCollapse: () => void;
}

const subMenuItems = [
  {
    id: "image",
    label: "Image",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    id: "workflow",
    label: "Workflow",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
];

export default function SecondarySidebar({
  isOpen,
  activeSubItem,
  onSubItemClick,
  onCollapse,
}: SecondarySidebarProps) {
  return (
    <div
      className={`
        h-full bg-white border-r border-border flex flex-col
        transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? "w-[220px] min-w-[220px] opacity-100" : "w-0 min-w-0 opacity-0"}
      `}
    >
      <div className="px-4 pt-4 pb-2 flex-shrink-0">
        {/* Workspace Selector */}
        <div className="flex items-center justify-between mb-5">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border hover:bg-surface transition-colors text-sm">
            <span className="w-5 h-5 rounded bg-brand-purple text-white flex items-center justify-center text-[10px] font-bold">
              A
            </span>
            <span className="font-medium text-foreground">All Workspaces</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <button
            onClick={onCollapse}
            className="w-7 h-7 rounded-md hover:bg-surface flex items-center justify-center text-text-muted hover:text-foreground transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="11 17 6 12 11 7" />
              <polyline points="18 17 13 12 18 7" />
            </svg>
          </button>
        </div>

        {/* Section Title */}
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-1">
          Creation
        </h2>
      </div>

      {/* Sub Menu */}
      <nav className="flex-1 px-3">
        {subMenuItems.map((item) => {
          const isActive = activeSubItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSubItemClick(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5
                transition-all duration-150 text-sm font-medium cursor-pointer
                ${isActive
                  ? "bg-brand-purple-light text-brand-purple"
                  : "text-text-secondary hover:bg-surface hover:text-foreground"
                }
              `}
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
