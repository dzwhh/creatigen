"use client";

import React, { useState } from "react";
import PrimarySidebar from "@/components/PrimarySidebar";
import SecondarySidebar from "@/components/SecondarySidebar";
import ImageConfigPanel from "@/components/ImageConfigPanel";
import ImagePreviewPanel from "@/components/ImagePreviewPanel";

export default function Home() {
  const [activeItem, setActiveItem] = useState("creation");
  const [activeSubItem, setActiveSubItem] = useState("image");
  const [secondarySidebarOpen, setSecondarySidebarOpen] = useState(true);

  const handlePrimaryItemClick = (item: string) => {
    setActiveItem(item);
    if (item === "creation") {
      setSecondarySidebarOpen(true);
    } else {
      setSecondarySidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Primary Sidebar */}
      <PrimarySidebar activeItem={activeItem} onItemClick={handlePrimaryItemClick} />

      {/* Secondary Sidebar */}
      <SecondarySidebar
        isOpen={secondarySidebarOpen && activeItem === "creation"}
        activeSubItem={activeSubItem}
        onSubItemClick={setActiveSubItem}
        onCollapse={() => setSecondarySidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 flex h-full overflow-hidden">
        {activeItem === "creation" && activeSubItem === "image" ? (
          <>
            <ImageConfigPanel />
            <ImagePreviewPanel />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-surface/30">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9494a5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-1 capitalize">
                {activeItem.replace("-", " ")}
              </h2>
              <p className="text-sm text-text-muted">Select a menu item to get started</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
