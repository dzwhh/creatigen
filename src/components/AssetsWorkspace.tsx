"use client";

import React, { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

type AssetTab = "ai-generated" | "uploaded" | "trending" | "creators" | "models" | "products";
type AssetType = "image" | "video";
type AssetStatus = "published" | "unused" | "in-use";
type SortOrder = "newest" | "oldest" | "name-asc" | "name-desc" | "size";
type ViewMode = "grid" | "list";

interface Asset {
  id: string;
  src: string;
  name: string;
  type: AssetType;
  size: string;
  dimensions: string;
  createdAt: string;
  timeAgo: string;
  status: AssetStatus;
  tags: string[];
  source?: string;
  model?: string;
  style?: string;
}

const assetTabs: { id: AssetTab; label: string; icon: string }[] = [
  { id: "ai-generated", label: "AI Generated", icon: "sparkle" },
  { id: "uploaded", label: "Uploaded", icon: "upload" },
  { id: "trending", label: "Trending Styles", icon: "trend" },
  { id: "creators", label: "Creators", icon: "creator" },
  { id: "models", label: "Models", icon: "model" },
  { id: "products", label: "Products", icon: "product" },
];

const mockAssets: Record<AssetTab, Asset[]> = {
  "ai-generated": [
    { id: "a1", src: "/img/excel_images/Collage示例/Western fashion/image_001.png", name: "Western Fashion Look 01", type: "image", size: "2.1 MB", dimensions: "1024×1024", createdAt: "2025-04-15", timeAgo: "1 day ago", status: "published", tags: ["fashion", "western"], model: "Nano Banana Pro" },
    { id: "a2", src: "/img/excel_images/Collage示例/Western fashion/image_002.png", name: "Western Fashion Look 02", type: "image", size: "1.8 MB", dimensions: "1024×1024", createdAt: "2025-04-14", timeAgo: "2 days ago", status: "in-use", tags: ["fashion", "western"], model: "Nano Banana Pro" },
    { id: "a3", src: "/img/excel_images/Collage示例/Western fashion/image_003.png", name: "Western Fashion Look 03", type: "image", size: "2.3 MB", dimensions: "1024×1024", createdAt: "2025-04-14", timeAgo: "2 days ago", status: "unused", tags: ["fashion", "western"], model: "Seedream 5.0 Lite" },
    { id: "a4", src: "/img/excel_images/Collage示例/Daily/image_004.png", name: "Daily Casual 01", type: "image", size: "1.5 MB", dimensions: "1024×1024", createdAt: "2025-04-13", timeAgo: "3 days ago", status: "published", tags: ["daily", "casual"], model: "Nano Banana Pro" },
    { id: "a5", src: "/img/excel_images/Collage示例/Daily/image_005.png", name: "Daily Casual 02", type: "image", size: "1.7 MB", dimensions: "1024×1024", createdAt: "2025-04-13", timeAgo: "3 days ago", status: "unused", tags: ["daily", "casual"], model: "Seedream 4.5" },
    { id: "a6", src: "/img/excel_images/Collage示例/Daily/image_006.png", name: "Daily Casual 03", type: "image", size: "1.9 MB", dimensions: "2048×2048", createdAt: "2025-04-12", timeAgo: "4 days ago", status: "in-use", tags: ["daily"], model: "Nano Banana Pro" },
    { id: "a7", src: "/img/excel_images/Collage示例/Daily/image_007.png", name: "Weekend Vibe 01", type: "image", size: "2.0 MB", dimensions: "1024×1024", createdAt: "2025-04-12", timeAgo: "4 days ago", status: "unused", tags: ["casual", "weekend"], model: "Nano Banana 2" },
    { id: "a8", src: "/img/excel_images/Collage示例/Daily/image_008.png", name: "Weekend Vibe 02", type: "image", size: "1.6 MB", dimensions: "1024×1024", createdAt: "2025-04-11", timeAgo: "5 days ago", status: "published", tags: ["casual", "weekend"], model: "Nano Banana Pro" },
  ],
  "uploaded": [
    { id: "u1", src: "/img/excel_images/Collage示例/Daily/image_009.png", name: "Product Photo Raw 01", type: "image", size: "3.2 MB", dimensions: "2048×2048", createdAt: "2025-04-14", timeAgo: "2 days ago", status: "unused", tags: ["product", "raw"], source: "Manual Upload" },
    { id: "u2", src: "/img/excel_images/Collage示例/Daily/image_010.png", name: "Product Photo Raw 02", type: "image", size: "2.8 MB", dimensions: "2048×2048", createdAt: "2025-04-13", timeAgo: "3 days ago", status: "in-use", tags: ["product", "raw"], source: "Manual Upload" },
    { id: "u3", src: "/img/excel_images/Collage示例/Daily/image_011.png", name: "Brand Logo", type: "image", size: "0.4 MB", dimensions: "512×512", createdAt: "2025-04-10", timeAgo: "6 days ago", status: "in-use", tags: ["brand", "logo"], source: "Manual Upload" },
    { id: "u4", src: "/img/excel_images/Collage示例/Daily/image_012.png", name: "Background Texture", type: "image", size: "1.1 MB", dimensions: "1920×1080", createdAt: "2025-04-09", timeAgo: "7 days ago", status: "unused", tags: ["background"], source: "Batch Import" },
  ],
  "trending": [
    { id: "t1", src: "/img/excel_images/Collage示例/Western fashion/image_001.png", name: "Western Chic Outfit", type: "image", size: "1.8 MB", dimensions: "1024×1024", createdAt: "2025-04-15", timeAgo: "1 day ago", status: "in-use", tags: ["western", "chic"], style: "Western Fashion" },
    { id: "t2", src: "/img/excel_images/Collage示例/Western fashion/image_002.png", name: "Western Fashion Inspo", type: "image", size: "2.0 MB", dimensions: "1024×1024", createdAt: "2025-04-15", timeAgo: "1 day ago", status: "unused", tags: ["western"], style: "Western Fashion" },
    { id: "t3", src: "/img/excel_images/Collage示例/Daily/image_004.png", name: "Spring Outfit Inspo", type: "image", size: "1.5 MB", dimensions: "1024×1024", createdAt: "2025-04-14", timeAgo: "2 days ago", status: "in-use", tags: ["daily", "spring"], style: "Daily" },
    { id: "t4", src: "/img/excel_images/Collage示例/Daily/image_005.png", name: "Casual Weekend", type: "image", size: "1.7 MB", dimensions: "1024×1024", createdAt: "2025-04-13", timeAgo: "3 days ago", status: "unused", tags: ["daily", "casual"], style: "Daily" },
    { id: "t5", src: "/img/excel_images/Collage示例/Daily/image_006.png", name: "Everyday Basics", type: "image", size: "1.4 MB", dimensions: "1024×1024", createdAt: "2025-04-13", timeAgo: "3 days ago", status: "unused", tags: ["daily", "basics"], style: "Daily" },
  ],
  "creators": [
    { id: "c1", src: "/img/excel_images/Collage示例/Western fashion/image_003.png", name: "@sarah_styles", type: "image", size: "2.1 MB", dimensions: "1080×1350", createdAt: "2025-04-15", timeAgo: "1 day ago", status: "in-use", tags: ["influencer", "fashion"], source: "Instagram" },
    { id: "c2", src: "/img/excel_images/Collage示例/Daily/image_007.png", name: "@casual_daily", type: "image", size: "1.9 MB", dimensions: "1080×1350", createdAt: "2025-04-14", timeAgo: "2 days ago", status: "unused", tags: ["influencer", "casual"], source: "TikTok" },
    { id: "c3", src: "/img/excel_images/Collage示例/Daily/image_008.png", name: "@luxe_minimal", type: "image", size: "2.3 MB", dimensions: "1080×1350", createdAt: "2025-04-13", timeAgo: "3 days ago", status: "unused", tags: ["influencer", "luxury"], source: "Instagram" },
  ],
  "models": [
    { id: "m1", src: "/img/models/female_001.png", name: "Sophia", type: "image", size: "1.2 MB", dimensions: "1024×1536", createdAt: "2025-04-10", timeAgo: "6 days ago", status: "in-use", tags: ["female", "european"] },
    { id: "m2", src: "/img/models/female_002.png", name: "Isabella", type: "image", size: "1.3 MB", dimensions: "1024×1536", createdAt: "2025-04-10", timeAgo: "6 days ago", status: "in-use", tags: ["female", "american"] },
    { id: "m3", src: "/img/models/female_003.png", name: "Emma", type: "image", size: "1.1 MB", dimensions: "1024×1536", createdAt: "2025-04-10", timeAgo: "6 days ago", status: "unused", tags: ["female", "european"] },
    { id: "m4", src: "/img/models/male_001.png", name: "Liam", type: "image", size: "1.4 MB", dimensions: "1024×1536", createdAt: "2025-04-10", timeAgo: "6 days ago", status: "unused", tags: ["male", "american"] },
    { id: "m5", src: "/img/models/male_002.png", name: "Noah", type: "image", size: "1.2 MB", dimensions: "1024×1536", createdAt: "2025-04-10", timeAgo: "6 days ago", status: "unused", tags: ["male", "european"] },
  ],
  "products": [
    { id: "p1", src: "/img/excel_images/Collage示例/Daily/image_013.png", name: "Gold Necklace Set", type: "image", size: "2.5 MB", dimensions: "2048×2048", createdAt: "2025-04-15", timeAgo: "1 day ago", status: "in-use", tags: ["jewelry", "gold"] },
    { id: "p2", src: "/img/excel_images/Collage示例/Daily/image_012.png", name: "Premium Lipstick", type: "image", size: "1.8 MB", dimensions: "2048×2048", createdAt: "2025-04-14", timeAgo: "2 days ago", status: "published", tags: ["cosmetics", "lipstick"] },
    { id: "p3", src: "/img/excel_images/Collage示例/Daily/image_011.png", name: "Casual Sneakers", type: "image", size: "2.2 MB", dimensions: "2048×2048", createdAt: "2025-04-13", timeAgo: "3 days ago", status: "unused", tags: ["shoes", "sneakers"] },
    { id: "p4", src: "/img/excel_images/Collage示例/Daily/image_010.png", name: "Designer Handbag", type: "image", size: "3.0 MB", dimensions: "2048×2048", createdAt: "2025-04-12", timeAgo: "4 days ago", status: "in-use", tags: ["bag", "luxury"] },
  ],
};

const storageUsed = 7.41;
const storageTotal = 1;

export default function AssetsWorkspace() {
  const [activeTab, setActiveTab] = useState<AssetTab>("ai-generated");
  const [typeFilter, setTypeFilter] = useState<"all" | AssetType>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | AssetStatus>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [batchMode, setBatchMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [detailAsset, setDetailAsset] = useState<Asset | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const assets = mockAssets[activeTab] || [];
  const filteredAssets = assets
    .filter(a => typeFilter === "all" || a.type === typeFilter)
    .filter(a => statusFilter === "all" || a.status === statusFilter)
    .filter(a => !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.tags.some(t => t.includes(searchQuery.toLowerCase())))
    .sort((a, b) => {
      switch (sortOrder) {
        case "newest": return b.createdAt.localeCompare(a.createdAt);
        case "oldest": return a.createdAt.localeCompare(b.createdAt);
        case "name-asc": return a.name.localeCompare(b.name);
        case "name-desc": return b.name.localeCompare(a.name);
        case "size": return parseFloat(b.size) - parseFloat(a.size);
        default: return 0;
      }
    });

  const selectAll = () => setSelectedIds(new Set(filteredAssets.map(a => a.id)));
  const totalSize = assets.reduce((sum, a) => sum + parseFloat(a.size), 0).toFixed(1);

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden" style={{ background: "#f4f6f9" }}>
      {/* ═══ Header ═══ */}
      <div className="flex-shrink-0" style={{ background: "#ffffff", borderBottom: "1px solid rgba(15,23,42,0.06)" }}>
        <div className="flex items-center justify-between px-8 pt-6 pb-4">
          <div>
            <h1 className="text-xl font-bold text-[#0f172a] tracking-[-0.02em]">Assets</h1>
            <p className="text-[13px] text-[#64748b] mt-1">Manage all your creative assets in one place</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Storage */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ border: "1px solid rgba(15,23,42,0.08)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5" /><path d="M5.5 5.1L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.1z" /></svg>
              <div className="w-[100px] h-1.5 rounded-full" style={{ background: "rgba(15,23,42,0.06)" }}>
                <div className="h-full rounded-full" style={{ width: `${Math.min((storageUsed / (storageTotal * 1024)) * 100, 100)}%`, background: "#0a84ff" }} />
              </div>
              <span className="text-[11px] font-medium text-[#64748b] whitespace-nowrap">{storageUsed} MB / {storageTotal} GB</span>
            </div>
            {/* Batch */}
            <button onClick={() => { setBatchMode(!batchMode); setSelectedIds(new Set()); }} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-medium cursor-pointer transition-all ${batchMode ? "text-white" : "text-[#0f172a]"}`} style={{ background: batchMode ? "#0f172a" : "transparent", border: batchMode ? "none" : "1px solid rgba(15,23,42,0.1)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
              Batch
            </button>
            {/* Upload */}
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold text-[#0f172a] cursor-pointer hover:bg-[#f1f5f9] transition-colors" style={{ border: "1px solid rgba(15,23,42,0.1)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
              Upload
            </button>
            {/* Generate */}
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold text-white cursor-pointer hover:opacity-90 transition-opacity" style={{ background: "#0f172a" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L9 9l-7 1 5 5-1.5 7L12 18.5 18.5 22 17 15l5-5-7-1z" /></svg>
              Generate Image
            </button>
          </div>
        </div>
        {/* Tab bar */}
        <div className="flex items-center gap-1 px-8">
          {assetTabs.map((tab) => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSelectedIds(new Set()); setBatchMode(false); }} className={`flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium cursor-pointer transition-colors ${activeTab === tab.id ? "text-[#0f172a] border-b-2 border-[#0f172a]" : "text-[#64748b] hover:text-[#0f172a]"}`}>
              <AssetTabIcon name={tab.icon} size={15} active={activeTab === tab.id} />
              {tab.label}
              <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-[#0f172a]/8 text-[#0f172a]" : "bg-[#f1f5f9] text-[#94a3b8]"}`}>{(mockAssets[tab.id] || []).length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ═══ Batch Bar ═══ */}
      {batchMode && (
        <div className="flex items-center gap-3 px-8 py-2.5 flex-shrink-0" style={{ background: "#fafafa", borderBottom: "1px solid rgba(15,23,42,0.06)" }}>
          <button onClick={selectAll} className="text-[12px] font-medium text-[#0a84ff] cursor-pointer hover:underline">Select All</button>
          <span className="text-[12px] text-[#64748b]">{selectedIds.size} selected</span>
          <div className="flex-1" />
          <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[12px] font-medium text-white cursor-pointer" style={{ background: "#0f172a" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Download
          </button>
          <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[12px] font-medium text-white cursor-pointer" style={{ background: "#ef4444" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
            Delete
          </button>
          <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[12px] font-medium text-[#0f172a] cursor-pointer" style={{ border: "1px solid rgba(15,23,42,0.1)" }}>Move to...</button>
          <button onClick={() => { setBatchMode(false); setSelectedIds(new Set()); }} className="text-[12px] font-medium text-[#64748b] cursor-pointer hover:text-[#0f172a]">Exit</button>
        </div>
      )}

      {/* ═══ Filter Bar ═══ */}
      <div ref={dropdownRef} className="flex items-center gap-3 px-8 py-3 flex-shrink-0" style={{ background: "#ffffff", borderBottom: "1px solid rgba(15,23,42,0.06)" }}>
        <FilterDropdown label={typeFilter === "all" ? "All Types" : typeFilter === "image" ? "Image" : "Video"} active={typeFilter !== "all"} isOpen={activeDropdown === "type"} onToggle={() => setActiveDropdown(activeDropdown === "type" ? null : "type")}>
          {[{ v: "all" as const, l: "All Types" }, { v: "image" as const, l: "Image" }, { v: "video" as const, l: "Video" }].map(o => (
            <button key={o.v} onClick={() => { setTypeFilter(o.v); setActiveDropdown(null); }} className={`w-full px-4 py-2 text-[12px] text-left cursor-pointer transition-colors ${typeFilter === o.v ? "text-[#0a84ff] font-semibold bg-[#0a84ff]/5" : "text-[#0f172a] hover:bg-[#f8fafc]"}`}>{o.l}</button>
          ))}
        </FilterDropdown>
        <FilterDropdown label={statusFilter === "all" ? "All Status" : statusFilter === "published" ? "Published" : statusFilter === "in-use" ? "In Use" : "Unused"} active={statusFilter !== "all"} isOpen={activeDropdown === "status"} onToggle={() => setActiveDropdown(activeDropdown === "status" ? null : "status")}>
          {[{ v: "all" as const, l: "All Status" }, { v: "published" as const, l: "Published" }, { v: "in-use" as const, l: "In Use" }, { v: "unused" as const, l: "Unused" }].map(o => (
            <button key={o.v} onClick={() => { setStatusFilter(o.v); setActiveDropdown(null); }} className={`w-full px-4 py-2 text-[12px] text-left cursor-pointer transition-colors ${statusFilter === o.v ? "text-[#0a84ff] font-semibold bg-[#0a84ff]/5" : "text-[#0f172a] hover:bg-[#f8fafc]"}`}>{o.l}</button>
          ))}
        </FilterDropdown>
        {/* Search */}
        <div className="relative flex-1 max-w-[280px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search assets..." className="w-full pl-9 pr-3 py-1.5 rounded-lg text-[12px] text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0a84ff]/20" style={{ border: "1px solid rgba(15,23,42,0.1)" }} />
        </div>
        <div className="flex-1" />
        {/* Sort */}
        <FilterDropdown label={sortOrder === "newest" ? "Newest First" : sortOrder === "oldest" ? "Oldest First" : sortOrder === "name-asc" ? "Name A→Z" : sortOrder === "name-desc" ? "Name Z→A" : "Size"} active={false} isOpen={activeDropdown === "sort"} onToggle={() => setActiveDropdown(activeDropdown === "sort" ? null : "sort")} align="right" icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="16" y2="12" /><line x1="4" y1="18" x2="12" y2="18" /></svg>}>
          {[{ v: "newest" as const, l: "Newest First" }, { v: "oldest" as const, l: "Oldest First" }, { v: "name-asc" as const, l: "Name A→Z" }, { v: "name-desc" as const, l: "Name Z→A" }, { v: "size" as const, l: "Size" }].map(o => (
            <button key={o.v} onClick={() => { setSortOrder(o.v); setActiveDropdown(null); }} className={`w-full px-4 py-2 text-[12px] text-left cursor-pointer transition-colors ${sortOrder === o.v ? "text-[#0a84ff] font-semibold bg-[#0a84ff]/5" : "text-[#0f172a] hover:bg-[#f8fafc]"}`}>{o.l}</button>
          ))}
        </FilterDropdown>
        {/* View toggle */}
        <div className="flex items-center rounded-lg overflow-hidden" style={{ border: "1px solid rgba(15,23,42,0.08)" }}>
          <button onClick={() => setViewMode("grid")} className={`p-1.5 cursor-pointer transition-colors ${viewMode === "grid" ? "bg-[#0f172a] text-white" : "text-[#94a3b8] hover:text-[#0f172a]"}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
          </button>
          <button onClick={() => setViewMode("list")} className={`p-1.5 cursor-pointer transition-colors ${viewMode === "list" ? "bg-[#0f172a] text-white" : "text-[#94a3b8] hover:text-[#0f172a]"}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
          </button>
        </div>
      </div>

      {/* ═══ Count ═══ */}
      <div className="flex items-center px-8 py-2.5 flex-shrink-0">
        <span className="text-[12px] text-[#64748b]">{filteredAssets.length} assets · {totalSize} MB</span>
      </div>

      {/* ═══ Content ═══ */}
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        {filteredAssets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(15,23,42,0.04)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
            </div>
            <p className="text-[14px] font-medium text-[#64748b]">No assets found</p>
            <p className="text-[12px] text-[#94a3b8] mt-1">Try adjusting your filters or upload new assets</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-4 gap-4">
            {filteredAssets.map((asset) => (
              <div key={asset.id} className={`group rounded-2xl overflow-hidden transition-all ${batchMode ? "cursor-pointer" : ""}`} style={{ background: "#ffffff", border: batchMode && selectedIds.has(asset.id) ? "2px solid #0f172a" : "1px solid rgba(15,23,42,0.06)", boxShadow: batchMode && selectedIds.has(asset.id) ? "0 2px 8px rgba(15,23,42,0.12)" : "0 1px 2px rgba(15,23,42,0.04)" }} onClick={() => { if (batchMode) toggleSelect(asset.id); }}>
                <div className="relative aspect-square overflow-hidden" style={{ background: "#f8fafc" }}>
                  <img src={asset.src} alt={asset.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" onClick={(e) => { if (batchMode) { e.stopPropagation(); return; } setDetailAsset(asset); }} />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold text-white" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">{asset.type === "image" ? <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></> : <><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></>}</svg>
                    {asset.type === "image" ? "Image" : "Video"}
                  </div>
                  {batchMode && (
                    <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center transition-all" style={{ border: selectedIds.has(asset.id) ? "none" : "2px solid rgba(255,255,255,0.8)", background: selectedIds.has(asset.id) ? "#0f172a" : "rgba(0,0,0,0.2)" }}>
                      {selectedIds.has(asset.id) && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                    </div>
                  )}
                  {!batchMode && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-2">
                        <HoverBtn onClick={(e) => { e.stopPropagation(); setDetailAsset(asset); }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                        </HoverBtn>
                        <HoverBtn><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg></HoverBtn>
                        <HoverBtn><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></HoverBtn>
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-3.5 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[12px] font-semibold text-[#0f172a] truncate leading-tight">{asset.name}</p>
                    <StatusDot status={asset.status} />
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[11px] text-[#94a3b8]">{asset.timeAgo}</span>
                    <span className="text-[11px] text-[#d1d5db]">·</span>
                    <span className="text-[11px] text-[#94a3b8]">{asset.dimensions}</span>
                  </div>
                  {asset.tags.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {asset.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium text-[#64748b]" style={{ background: "rgba(15,23,42,0.04)" }}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-2">
            <div className="flex items-center gap-4 px-4 py-2 text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider">
              {batchMode && <div className="w-6" />}
              <div className="w-12" />
              <div className="flex-1">Name</div>
              <div className="w-[80px]">Type</div>
              <div className="w-[80px]">Size</div>
              <div className="w-[100px]">Dimensions</div>
              <div className="w-[80px]">Status</div>
              <div className="w-[100px]">Date</div>
              <div className="w-[80px]">Actions</div>
            </div>
            {filteredAssets.map((asset) => (
              <div key={asset.id} className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${batchMode ? "cursor-pointer" : "hover:shadow-sm"}`} style={{ background: "#ffffff", border: batchMode && selectedIds.has(asset.id) ? "2px solid #0f172a" : "1px solid rgba(15,23,42,0.06)" }} onClick={() => { if (batchMode) toggleSelect(asset.id); }}>
                {batchMode && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: selectedIds.has(asset.id) ? "none" : "2px solid rgba(15,23,42,0.2)", background: selectedIds.has(asset.id) ? "#0f172a" : "transparent" }}>
                    {selectedIds.has(asset.id) && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                  </div>
                )}
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0" style={{ background: "#f8fafc" }}>
                  <img src={asset.src} alt={asset.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#0f172a] truncate">{asset.name}</p>
                  <div className="flex gap-1 mt-0.5">{asset.tags.slice(0, 2).map(t => <span key={t} className="text-[10px] text-[#94a3b8]">#{t}</span>)}</div>
                </div>
                <div className="w-[80px] text-[12px] text-[#64748b] capitalize">{asset.type}</div>
                <div className="w-[80px] text-[12px] text-[#64748b]">{asset.size}</div>
                <div className="w-[100px] text-[12px] text-[#64748b]">{asset.dimensions}</div>
                <div className="w-[80px]"><StatusBadge status={asset.status} /></div>
                <div className="w-[100px] text-[12px] text-[#94a3b8]">{asset.timeAgo}</div>
                <div className="w-[80px] flex items-center gap-1">
                  {!batchMode && (
                    <>
                      <ListBtn onClick={(e) => { e.stopPropagation(); setDetailAsset(asset); }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg></ListBtn>
                      <ListBtn><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg></ListBtn>
                      <ListBtn danger><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></ListBtn>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ═══ Detail Drawer ═══ */}
      {detailAsset && (
        <div className="fixed inset-0 z-[300] flex" onClick={() => setDetailAsset(null)}>
          <div className="flex-1" style={{ background: "rgba(0,0,0,0.3)" }} />
          <div className="w-[420px] h-full flex flex-col" style={{ background: "#ffffff", boxShadow: "-8px 0 32px rgba(15,23,42,0.12)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(15,23,42,0.06)" }}>
              <h3 className="text-[15px] font-bold text-[#0f172a]">Asset Detail</h3>
              <button onClick={() => setDetailAsset(null)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] cursor-pointer transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="px-6 py-5">
              <div className="rounded-xl overflow-hidden" style={{ background: "#f8fafc" }}>
                <img src={detailAsset.src} alt={detailAsset.name} className="w-full aspect-square object-cover" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <h4 className="text-[16px] font-bold text-[#0f172a]">{detailAsset.name}</h4>
              <div className="mt-4 space-y-3">
                <DetailRow label="Type" value={detailAsset.type === "image" ? "Image" : "Video"} />
                <DetailRow label="Dimensions" value={detailAsset.dimensions} />
                <DetailRow label="File Size" value={detailAsset.size} />
                <DetailRow label="Created" value={detailAsset.createdAt} />
                <DetailRow label="Status"><StatusBadge status={detailAsset.status} /></DetailRow>
                {detailAsset.model && <DetailRow label="Model" value={detailAsset.model} />}
                {detailAsset.source && <DetailRow label="Source" value={detailAsset.source} />}
                {detailAsset.style && <DetailRow label="Style" value={detailAsset.style} />}
                <DetailRow label="Tags">
                  <div className="flex gap-1 flex-wrap">
                    {detailAsset.tags.map(tag => <span key={tag} className="px-2.5 py-1 rounded-full text-[11px] font-medium text-[#0f172a]" style={{ background: "rgba(15,23,42,0.05)" }}>#{tag}</span>)}
                  </div>
                </DetailRow>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-5" style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold text-white cursor-pointer hover:opacity-90" style={{ background: "#0f172a" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                  Download
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium text-[#0f172a] cursor-pointer hover:bg-[#f1f5f9]" style={{ border: "1px solid rgba(15,23,42,0.1)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                  Edit
                </button>
                <button className="w-10 h-10 rounded-xl flex items-center justify-center text-[#ef4444] cursor-pointer hover:bg-[#fef2f2] transition-colors" style={{ border: "1px solid rgba(239,68,68,0.2)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══ Sub Components ═══ */

function FilterDropdown({ label, active, isOpen, onToggle, children, align, icon }: { label: string; active: boolean; isOpen: boolean; onToggle: () => void; children: React.ReactNode; align?: "right"; icon?: React.ReactNode }) {
  return (
    <div className="relative">
      <button onClick={onToggle} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#0f172a] cursor-pointer hover:bg-[#f8fafc] transition-colors" style={{ border: `1px solid ${active ? "rgba(10,132,255,0.4)" : "rgba(15,23,42,0.1)"}` }}>
        {icon}{label}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {isOpen && (
        <div className={`absolute top-full ${align === "right" ? "right-0" : "left-0"} mt-1.5 min-w-[130px] py-1 rounded-xl z-50`} style={{ background: "#ffffff", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 8px 24px rgba(15,23,42,0.12)" }}>
          {children}
        </div>
      )}
    </div>
  );
}

function HoverBtn({ children, onClick }: { children: React.ReactNode; onClick?: (e: React.MouseEvent) => void }) {
  return (
    <button onClick={onClick} className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110" style={{ background: "rgba(255,255,255,0.9)" }}>
      {children}
    </button>
  );
}

function ListBtn({ children, onClick, danger }: { children: React.ReactNode; onClick?: (e: React.MouseEvent) => void; danger?: boolean }) {
  return (
    <button onClick={onClick} className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${danger ? "text-[#94a3b8] hover:text-[#ef4444] hover:bg-[#fef2f2]" : "text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9]"}`}>
      {children}
    </button>
  );
}

function AssetTabIcon({ name, size = 15, active }: { name: string; size?: number; active?: boolean }) {
  const color = active ? "#0f172a" : "#94a3b8";
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "sparkle": return <svg {...props}><path d="M12 2L9 9l-7 1 5 5-1.5 7L12 18.5 18.5 22 17 15l5-5-7-1z" /></svg>;
    case "upload": return <svg {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>;
    case "trend": return <svg {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
    case "creator": return <svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    case "model": return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M16 16v-2a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v2" /><circle cx="12" cy="7.5" r="2.5" /></svg>;
    case "product": return <svg {...props}><rect x="2" y="7" width="20" height="15" rx="2" /><polyline points="16 7 12 2 8 7" /></svg>;
    default: return null;
  }
}

function StatusDot({ status }: { status: AssetStatus }) {
  const colors: Record<AssetStatus, string> = { published: "#10b981", "in-use": "#0a84ff", unused: "#94a3b8" };
  return <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: colors[status] }} />;
}

function StatusBadge({ status }: { status: AssetStatus }) {
  const cfg: Record<AssetStatus, { bg: string; color: string; label: string }> = {
    published: { bg: "rgba(16,185,129,0.08)", color: "#10b981", label: "Published" },
    "in-use": { bg: "rgba(10,132,255,0.08)", color: "#0a84ff", label: "In Use" },
    unused: { bg: "rgba(148,163,184,0.08)", color: "#94a3b8", label: "Unused" },
  };
  const c = cfg[status];
  return <Badge className="rounded-full px-2 py-0.5 text-[10px] font-semibold border-0" style={{ background: c.bg, color: c.color }}>{c.label}</Badge>;
}

function DetailRow({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between">
      <span className="text-[12px] text-[#94a3b8] font-medium">{label}</span>
      {value ? <span className="text-[12px] text-[#0f172a] font-medium">{value}</span> : children}
    </div>
  );
}
