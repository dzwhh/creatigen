"use client";

import React, { useState } from "react";
import PrimarySidebar from "@/components/PrimarySidebar";
import SecondarySidebar from "@/components/SecondarySidebar";
import ImageWorkspace from "@/components/ImageWorkspace";
import ImageDetail from "@/components/ImageDetail";
import PublishWorkspace from "@/components/PublishWorkspace";
import AssetsWorkspace from "@/components/AssetsWorkspace";

export default function Home() {
  const [activeItem, setActiveItem] = useState("creation");
  const [activeSubItem, setActiveSubItem] = useState("image");
  const [publishSubItem, setPublishSubItem] = useState("instagram");
  const [secondarySidebarOpen, setSecondarySidebarOpen] = useState(true);
  const [detailImageId, setDetailImageId] = useState<string | null>(null);
  const [detailTaskImages, setDetailTaskImages] = useState<{ id: string; src: string }[]>([]);

  const handlePrimaryItemClick = (item: string) => {
    setActiveItem(item);
    if (item === "creation" || item === "publish") {
      setSecondarySidebarOpen(true);
    } else {
      setSecondarySidebarOpen(false);
    }
  };

  const renderImageContent = () => {
    if (detailImageId) {
      return (
        <ImageDetail
          imageId={detailImageId}
          taskImages={detailTaskImages}
          onClose={() => setDetailImageId(null)}
        />
      );
    }

    return (
      <ImageWorkspace onImageClick={(id: string, taskImages?: { id: string; src: string }[]) => { setDetailImageId(id); setDetailTaskImages(taskImages || []); }} />
    );
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Primary Sidebar */}
      <PrimarySidebar activeItem={activeItem} onItemClick={handlePrimaryItemClick} />

      {/* Secondary Sidebar */}
      {activeItem === "creation" && (
        <SecondarySidebar
          isOpen={secondarySidebarOpen}
          activeSubItem={activeSubItem}
          onSubItemClick={setActiveSubItem}
          onCollapse={() => setSecondarySidebarOpen(false)}
          sectionTitle="Creation"
        />
      )}
      {activeItem === "publish" && (
        <SecondarySidebar
          isOpen={secondarySidebarOpen}
          activeSubItem={publishSubItem}
          onSubItemClick={setPublishSubItem}
          onCollapse={() => setSecondarySidebarOpen(false)}
          sectionTitle="Publish"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex h-full overflow-hidden">
        {activeItem === "publish" ? (
          <PublishWorkspace />
        ) : activeItem === "assets" ? (
          <AssetsWorkspace />
        ) : activeItem === "creation" && activeSubItem === "image" ? (
          renderImageContent()
        ) : (
          <div className="flex-1 flex items-center justify-center" style={{ background: "#f4f6f9" }}>
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: "rgba(10,132,255,0.08)" }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 capitalize" style={{ color: "#0f172a", letterSpacing: "-0.02em" }}>
                {activeItem.replace("-", " ")}
              </h2>
              <p className="text-sm" style={{ color: "#64748b" }}>
                Select a menu item to get started
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
