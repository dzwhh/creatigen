"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";

// Mock accounts data
const mockAccounts = [
  {
    id: "acc-1",
    username: "fashionstore_official",
    profilePic: "/img/excel_images/Collage示例/Western fashion/image_001.png",
    accountType: "Business" as const,
    followers: 12300,
    status: "connected" as const,
  },
  {
    id: "acc-2",
    username: "style_daily_picks",
    profilePic: "/img/excel_images/Collage示例/Daily/image_005.png",
    accountType: "Creator" as const,
    followers: 8700,
    status: "connected" as const,
  },
];

// Mock publish history
const mockHistory = [
  {
    id: "pub-1",
    account: "@fashionstore_official",
    thumbnail: "/img/excel_images/Collage示例/Western fashion/image_002.png",
    caption: "New arrivals! Check out our latest Western fashion collection...",
    status: "published" as const,
    likes: 234,
    comments: 18,
    time: "2 hours ago",
  },
  {
    id: "pub-2",
    account: "@style_daily_picks",
    thumbnail: "/img/excel_images/Collage示例/Daily/image_006.png",
    caption: "Daily outfit inspiration — casual chic for spring...",
    status: "scheduled" as const,
    likes: 0,
    comments: 0,
    time: "Tomorrow 10:00 AM",
  },
  {
    id: "pub-3",
    account: "@fashionstore_official",
    thumbnail: "/img/excel_images/Collage示例/Daily/image_007.png",
    caption: "Weekend vibes with our best-selling accessories...",
    status: "draft" as const,
    likes: 0,
    comments: 0,
    time: "Draft saved 1h ago",
  },
];

const generatedImages = [
  { id: "gi-1", src: "/img/excel_images/Collage示例/Western fashion/image_001.png" },
  { id: "gi-2", src: "/img/excel_images/Collage示例/Western fashion/image_002.png" },
  { id: "gi-3", src: "/img/excel_images/Collage示例/Western fashion/image_003.png" },
  { id: "gi-4", src: "/img/excel_images/Collage示例/Daily/image_004.png" },
  { id: "gi-5", src: "/img/excel_images/Collage示例/Daily/image_005.png" },
  { id: "gi-6", src: "/img/excel_images/Collage示例/Daily/image_006.png" },
  { id: "gi-7", src: "/img/excel_images/Collage示例/Daily/image_007.png" },
  { id: "gi-8", src: "/img/excel_images/Collage示例/Daily/image_008.png" },
];

export default function PublishWorkspace() {
  const [selectedAccount, setSelectedAccount] = useState(mockAccounts[0]?.id || "");
  const [rightTab, setRightTab] = useState<"create" | "history">("create");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [scheduleMode, setScheduleMode] = useState<"now" | "schedule">("now");
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [historyFilter, setHistoryFilter] = useState("all");

  const toggleImage = (src: string) => {
    if (selectedImages.includes(src)) {
      setSelectedImages(selectedImages.filter(s => s !== src));
    } else if (selectedImages.length < 10) {
      setSelectedImages([...selectedImages, src]);
    }
  };

  const currentAccount = mockAccounts.find(a => a.id === selectedAccount);

  return (
    <div className="flex-1 h-full flex overflow-hidden" style={{ background: "#f4f6f9" }}>
      {/* Left Panel: Account List */}
      <div
        className="w-[280px] min-w-[280px] h-full flex flex-col"
        style={{ background: "#ffffff", borderRight: "1px solid rgba(15,23,42,0.06)" }}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-bold text-[#0f172a]">Account List</h2>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#94a3b8] font-medium cursor-pointer hover:text-[#0f172a]">FAQ</span>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-white cursor-pointer hover:opacity-90 transition-opacity"
                style={{ background: "#0f172a" }}
              >
                + Add Account
              </button>
            </div>
          </div>
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search accounts..."
              className="w-full pl-9 pr-3 py-2 rounded-lg text-[12px] text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0a84ff]/20"
              style={{ border: "1px solid rgba(15,23,42,0.1)" }}
            />
          </div>
        </div>

        <div style={{ borderBottom: "1px solid rgba(15,23,42,0.06)" }} />

        {/* Account List */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {mockAccounts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-[13px] text-[#94a3b8] mb-4">No authorized accounts</p>
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-semibold text-white cursor-pointer"
                style={{ background: "#0f172a" }}
              >
                + Add Account
              </button>
              <div className="flex items-center gap-1.5 mt-4 text-[12px] text-[#94a3b8] cursor-pointer hover:text-[#0f172a]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                Tutorial
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </div>
            </div>
          ) : (
            mockAccounts.map((acc) => (
              <button
                key={acc.id}
                onClick={() => setSelectedAccount(acc.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl mb-2 text-left cursor-pointer transition-all ${
                  selectedAccount === acc.id ? "bg-[#f0f7ff]" : "hover:bg-[#f8fafc]"
                }`}
                style={{
                  border: selectedAccount === acc.id ? "1px solid rgba(10,132,255,0.2)" : "1px solid rgba(15,23,42,0.06)",
                }}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img src={acc.profilePic} alt={acc.username} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-semibold text-[#0f172a] truncate">@{acc.username}</span>
                  </div>
                  <p className="text-[11px] text-[#64748b] mt-0.5">Instagram {acc.accountType}</p>
                  <p className="text-[11px] text-[#64748b]">{acc.followers >= 1000 ? `${(acc.followers / 1000).toFixed(1)}K` : acc.followers} followers</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="flex items-center gap-1 text-[10px] font-medium" style={{ color: acc.status === "connected" ? "#10b981" : "#ef4444" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: acc.status === "connected" ? "#10b981" : "#ef4444" }} />
                      {acc.status === "connected" ? "Connected" : "Expired"}
                    </span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right Panel: Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Hero Section */}
        <div className="flex-shrink-0 px-8 pt-6 pb-0" style={{ background: "#ffffff", borderBottom: "1px solid rgba(15,23,42,0.06)" }}>
          <h1 className="text-xl font-bold text-[#0f172a] tracking-[-0.02em]">Instagram Post Publishing</h1>
          <p className="text-[13px] text-[#64748b] mt-1 mb-5">Publish AI-generated images directly to Instagram</p>

          {/* Feature cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { icon: "shield", title: "Official API", desc: "Authorized by Instagram — safe, no account risk", color: "#6366f1" },
              { icon: "zap", title: "From Creation to Post", desc: "Select generated images and publish in one click", color: "#f59e0b" },
              { icon: "calendar", title: "Schedule Posts", desc: "Set publish time, lock in the best engagement window", color: "#10b981" },
            ].map((card) => (
              <div key={card.title} className="flex items-start gap-3 p-4 rounded-xl" style={{ border: "1px solid rgba(15,23,42,0.06)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${card.color}12` }}>
                  <FeatureIcon name={card.icon} color={card.color} />
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-[#0f172a]">{card.title}</h4>
                  <p className="text-[11px] text-[#64748b] mt-0.5 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
            {[
              { id: "create" as const, label: "Create Post" },
              { id: "history" as const, label: "Publish History" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRightTab(tab.id)}
                className={`px-4 py-2.5 text-[13px] font-medium cursor-pointer transition-colors ${
                  rightTab === tab.id
                    ? "text-[#0f172a] border-b-2 border-[#0f172a]"
                    : "text-[#64748b] hover:text-[#0f172a]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {rightTab === "create" ? (
            <div className="max-w-[720px] mx-auto px-8 py-6 space-y-5">
              {/* Select Account */}
              <div>
                <label className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wider">Select Account</label>
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="mt-2 w-full px-4 py-2.5 rounded-xl text-[13px] font-medium text-[#0f172a] bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0a84ff]/20"
                  style={{ border: "1px solid rgba(15,23,42,0.1)" }}
                >
                  {mockAccounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>@{acc.username}</option>
                  ))}
                </select>
              </div>

              {/* Select Images */}
              <div>
                <label className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wider">
                  Select Images <span className="text-[#94a3b8] font-normal">(max 10 for carousel)</span>
                </label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {selectedImages.map((src, i) => (
                    <div key={i} className="group relative w-20 h-20 rounded-xl overflow-visible">
                      <img src={src} alt={`Selected ${i + 1}`} className="w-full h-full rounded-xl object-cover" style={{ border: "1px solid rgba(15,23,42,0.1)" }} />
                      <button
                        onClick={() => setSelectedImages(selectedImages.filter(s => s !== src))}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#0f172a]/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      </button>
                      <span className="absolute bottom-1 left-1 text-[9px] font-bold text-white bg-black/50 rounded px-1">{i + 1}</span>
                    </div>
                  ))}
                  {selectedImages.length < 10 && (
                    <button
                      onClick={() => setShowImagePicker(true)}
                      className="w-20 h-20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#f8fafc] transition-colors"
                      style={{ border: "1.5px dashed rgba(15,23,42,0.2)" }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                      <span className="text-[10px] text-[#94a3b8] mt-1">Add</span>
                    </button>
                  )}
                </div>
                {selectedImages.length > 0 && (
                  <p className="text-[11px] text-[#94a3b8] mt-1.5">Drag to reorder · {selectedImages.length}/10 selected</p>
                )}
              </div>

              {/* Caption */}
              <div>
                <label className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wider">Caption</label>
                <div className="relative mt-2">
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value.slice(0, 2200))}
                    placeholder="Write your caption..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] resize-none focus:outline-none focus:ring-2 focus:ring-[#0a84ff]/20"
                    style={{ border: "1px solid rgba(15,23,42,0.1)" }}
                  />
                  <span className="absolute bottom-3 right-3 text-[11px] text-[#94a3b8]">{caption.length}/2200</span>
                </div>
              </div>

              {/* Hashtags */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wider"># Hashtags</label>
                  <button className="text-[11px] font-medium text-[#0a84ff] cursor-pointer hover:text-[#0a84ff]/80">
                    AI Suggest
                  </button>
                </div>
                <input
                  type="text"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  placeholder="#fashion #ootd #amazonfind"
                  className="mt-2 w-full px-4 py-2.5 rounded-xl text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0a84ff]/20"
                  style={{ border: "1px solid rgba(15,23,42,0.1)" }}
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wider">
                  Location <span className="text-[#94a3b8] font-normal">(optional)</span>
                </label>
                <div className="relative mt-2">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search location..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0a84ff]/20"
                    style={{ border: "1px solid rgba(15,23,42,0.1)" }}
                  />
                </div>
              </div>

              {/* Schedule */}
              <div>
                <label className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wider">Schedule</label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="schedule" checked={scheduleMode === "now"} onChange={() => setScheduleMode("now")} className="accent-[#0a84ff]" />
                    <span className="text-[13px] text-[#0f172a] font-medium">Publish Now</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="schedule" checked={scheduleMode === "schedule"} onChange={() => setScheduleMode("schedule")} className="accent-[#0a84ff]" />
                    <span className="text-[13px] text-[#0f172a] font-medium">Schedule for:</span>
                  </label>
                  {scheduleMode === "schedule" && (
                    <div className="flex gap-2">
                      <input type="date" className="px-3 py-1.5 rounded-lg text-[12px] text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0a84ff]/20" style={{ border: "1px solid rgba(15,23,42,0.1)" }} />
                      <input type="time" className="px-3 py-1.5 rounded-lg text-[12px] text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0a84ff]/20" style={{ border: "1px solid rgba(15,23,42,0.1)" }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}>
                <button
                  onClick={() => setShowPreview(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium text-[#0f172a] cursor-pointer hover:bg-[#f1f5f9] transition-colors"
                  style={{ border: "1px solid rgba(15,23,42,0.1)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  Preview
                </button>
                <div className="flex-1" />
                <button
                  className="px-5 py-2.5 rounded-xl text-[13px] font-medium text-[#64748b] cursor-pointer hover:bg-[#f1f5f9] transition-colors"
                  style={{ border: "1px solid rgba(15,23,42,0.1)" }}
                >
                  Save Draft
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-semibold text-white cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)", boxShadow: "0 2px 8px rgba(15,23,42,0.2)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                  {scheduleMode === "now" ? "Publish" : "Schedule"}
                </button>
              </div>
            </div>
          ) : (
            /* Publish History */
            <div className="px-8 py-6">
              {/* History filter tabs */}
              <div className="flex gap-2 mb-5">
                {["all", "published", "scheduled", "draft", "failed"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setHistoryFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium cursor-pointer transition-colors capitalize ${
                      historyFilter === f
                        ? "text-[#0f172a] bg-[#0f172a]/8 font-semibold"
                        : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
                    }`}
                    style={{ border: historyFilter === f ? "1px solid rgba(15,23,42,0.12)" : "1px solid rgba(15,23,42,0.06)" }}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* History list */}
              <div className="space-y-3">
                {mockHistory
                  .filter(h => historyFilter === "all" || h.status === historyFilter)
                  .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all hover:shadow-sm"
                    style={{ background: "#ffffff", border: "1px solid rgba(15,23,42,0.06)" }}
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[12px] font-medium text-[#64748b]">{item.account}</span>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-[13px] text-[#0f172a] truncate">{item.caption}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[11px] text-[#94a3b8]">{item.time}</span>
                        {item.status === "published" && (
                          <span className="flex items-center gap-2 text-[11px] text-[#64748b]">
                            <span className="flex items-center gap-0.5">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="#ef4444" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                              {item.likes}
                            </span>
                            <span className="flex items-center gap-0.5">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                              {item.comments}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors cursor-pointer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Picker Modal */}
      {showImagePicker && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="w-[640px] max-h-[520px] rounded-2xl flex flex-col" style={{ background: "#ffffff", boxShadow: "0 16px 48px rgba(15,23,42,0.2)" }}>
            <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(15,23,42,0.06)" }}>
              <h3 className="text-[15px] font-semibold text-[#0f172a]">Select Images from Generations</h3>
              <button onClick={() => setShowImagePicker(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="grid grid-cols-4 gap-3">
                {generatedImages.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => toggleImage(img.src)}
                    className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all ${
                      selectedImages.includes(img.src) ? "ring-2 ring-[#0a84ff]" : "hover:ring-2 hover:ring-[#0a84ff]/30"
                    }`}
                  >
                    <img src={img.src} alt="" className="w-full h-full object-cover" />
                    {selectedImages.includes(img.src) && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#0a84ff] flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}>
              <span className="text-[12px] text-[#64748b]">{selectedImages.length}/10 selected</span>
              <button
                onClick={() => setShowImagePicker(false)}
                className="px-5 py-2 rounded-lg text-[13px] font-semibold text-white cursor-pointer hover:opacity-90"
                style={{ background: "#0f172a" }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-[380px] rounded-2xl overflow-hidden" style={{ background: "#ffffff", boxShadow: "0 16px 48px rgba(15,23,42,0.25)" }}>
            {/* IG Header */}
            <div className="flex items-center gap-3 px-4 py-3">
              {currentAccount && (
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src={currentAccount.profilePic} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <span className="text-[13px] font-semibold text-[#0f172a]">{currentAccount ? `@${currentAccount.username}` : ""}</span>
              <div className="flex-1" />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
            </div>
            {/* Image */}
            <div className="aspect-square bg-[#f1f5f9]">
              {selectedImages.length > 0 ? (
                <img src={selectedImages[0]} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#94a3b8]">
                  <span className="text-[13px]">No image selected</span>
                </div>
              )}
            </div>
            {selectedImages.length > 1 && (
              <div className="flex justify-center gap-1 py-2">
                {selectedImages.slice(0, 5).map((_, i) => (
                  <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-[#0a84ff]" : "bg-[#d1d5db]"}`} />
                ))}
              </div>
            )}
            {/* Actions */}
            <div className="flex items-center gap-4 px-4 py-2.5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="1.8"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              <div className="flex-1" />
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="1.8"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg>
            </div>
            {/* Caption preview */}
            <div className="px-4 pb-4">
              <p className="text-[13px] text-[#0f172a] leading-relaxed">
                <span className="font-semibold">{currentAccount?.username}</span>{" "}
                {caption || "Your caption will appear here..."}
              </p>
              {hashtags && <p className="text-[13px] text-[#0a84ff] mt-1">{hashtags}</p>}
              <p className="text-[11px] text-[#94a3b8] mt-2 uppercase">Just now</p>
            </div>
            {/* Close */}
            <div className="px-4 pb-4">
              <button
                onClick={() => setShowPreview(false)}
                className="w-full py-2.5 rounded-xl text-[13px] font-medium text-[#64748b] cursor-pointer hover:bg-[#f8fafc] transition-colors"
                style={{ border: "1px solid rgba(15,23,42,0.1)" }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; color: string; label: string }> = {
    published: { bg: "rgba(16,185,129,0.08)", color: "#10b981", label: "Published" },
    scheduled: { bg: "rgba(245,158,11,0.08)", color: "#f59e0b", label: "Scheduled" },
    draft: { bg: "rgba(148,163,184,0.08)", color: "#94a3b8", label: "Draft" },
    failed: { bg: "rgba(239,68,68,0.08)", color: "#ef4444", label: "Failed" },
  };
  const c = config[status] || config.draft;
  return (
    <Badge className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold border-0" style={{ background: c.bg, color: c.color }}>
      {c.label}
    </Badge>
  );
}

function FeatureIcon({ name, color }: { name: string; color: string }) {
  const props = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2 };
  switch (name) {
    case "shield": return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
    case "zap": return <svg {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
    case "calendar": return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
    default: return null;
  }
}
