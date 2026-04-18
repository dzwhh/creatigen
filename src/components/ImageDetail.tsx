"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ImageDetailProps {
  imageId: string;
  taskImages: { id: string; src: string }[];
  onClose: () => void;
}

export default function ImageDetail({ imageId, taskImages, onClose }: ImageDetailProps) {
  const [selectedThumb, setSelectedThumb] = useState(imageId);
  const currentThumb = taskImages.find((t) => t.id === selectedThumb) || taskImages[0];

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden" style={{ background: "#f4f6f9" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-8 py-5 flex-shrink-0"
        style={{
          background: "#ffffff",
          borderBottom: "1px solid rgba(15,23,42,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-[-0.02em]" style={{ color: "#0f172a" }}>
            Task Detail
          </h1>
          <Badge
            className="rounded-full px-3 py-1 text-[11px] font-semibold border-0"
            style={{ background: "#f1f5f9", color: "#0f172a" }}
          >
            Image
          </Badge>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-all cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Large Image */}
        <div className="flex-1 flex flex-col items-center p-8 overflow-y-auto">
          <div
            className="w-full max-w-[580px] aspect-[3/4] rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 1px 3px rgba(15,23,42,0.04), 0 8px 32px rgba(15,23,42,0.08)",
            }}
          >
            <img
              src={currentThumb.src}
              alt="Generated image detail"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-3 mt-5">
            <Button
              variant="outline"
              className="h-11 px-5 rounded-xl text-sm font-medium gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </Button>
            <Button
              variant="outline"
              className="h-11 px-5 rounded-xl text-sm font-medium gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
              Save to Assets
            </Button>
            <Button
              className="h-11 px-5 rounded-xl text-sm font-medium gap-2 text-white"
              style={{ background: "linear-gradient(135deg, #6366f1, #0ea5e9)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </Button>
          </div>
        </div>

        {/* Right: Details panel */}
        <div
          className="w-[420px] min-w-[420px] p-6 overflow-y-auto flex flex-col gap-5"
          style={{
            background: "#ffffff",
            borderLeft: "1px solid rgba(15,23,42,0.06)",
          }}
        >
          {/* Meta tags */}
          <div className="flex flex-wrap gap-2">
            <MetaChip icon="model">Nano Banana Pro</MetaChip>
            <MetaChip icon="ratio">4:3</MetaChip>
            <MetaChip icon="clock">7 minutes ago</MetaChip>
          </div>
          <div className="flex items-center gap-2">
            <MetaChip icon="resolution">1K</MetaChip>
            <Badge
              className="rounded-full px-3 py-1 text-[11px] font-semibold border-0"
              style={{ background: "rgba(16,185,129,0.08)", color: "#10b981" }}
            >
              Done
            </Badge>
          </div>

          {/* Prompt text */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "#f8fafc",
              border: "1px solid rgba(15,23,42,0.05)",
            }}
          >
            <p className="text-[14px] leading-[1.7] text-[#0f172a]">
              Lifestyle product photography from{" "}
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[12px] font-medium"
                style={{ background: "#e2e8f0" }}
              >
                <span className="w-4 h-4 rounded" style={{ background: "linear-gradient(135deg, #1a1a3e, #2d1b4e)" }} />
                图片 1
              </span>{" "}
              — product only, no models or people. CRITICAL: preserve the product&apos;s exact shape, color, texture, logo, and every detail — do NOT alter or reimagine the product. Contextually appropriate scene with harmonizing props and background matching product positioning. Cinematic lighting, editorial composition. Extract product from original background. Use{" "}
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[12px] font-medium"
                style={{ background: "#e2e8f0" }}
              >
                <span className="w-4 h-4 rounded" style={{ background: "linear-gradient(135deg, #1e2a4a, #2a1a3a)" }} />
                图片 2
              </span>{" "}
              as reference for scene style, environment, and prop arrangement.
            </p>
          </div>

          {/* Reference images */}
          <div className="flex gap-3">
            <div
              className="w-[72px] h-[72px] rounded-xl overflow-hidden"
              style={{ border: "2px solid #0f172a" }}
            >
              <img src="/img/excel_images/Product library Fashion/image_001.jpg" alt="Reference 1" className="w-full h-full object-cover" />
            </div>
            <div
              className="w-[72px] h-[72px] rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(15,23,42,0.08)" }}
            >
              <img src="/img/excel_images/Product library Fashion/image_002.jpg" alt="Reference 2" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Original comparison image */}
          <div
            className="relative rounded-2xl overflow-hidden aspect-[4/3]"
            style={{ border: "1px solid rgba(15,23,42,0.06)" }}
          >
            <img src="/img/excel_images/Product library Fashion/image_003.jpg" alt="Original product" className="w-full h-full object-cover" />
            <button
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-black/60 cursor-pointer"
              style={{ background: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          </div>
        </div>

        {/* Far right: Thumbnail strip */}
        <div
          className="w-[72px] min-w-[72px] flex flex-col items-center gap-3 py-6 px-3 overflow-y-auto"
          style={{
            background: "#ffffff",
            borderLeft: "1px solid rgba(15,23,42,0.06)",
          }}
        >
          {taskImages.map((thumb) => (
            <button
              key={thumb.id}
              onClick={() => setSelectedThumb(thumb.id)}
              className={`w-[52px] h-[52px] rounded-xl overflow-hidden cursor-pointer transition-all flex-shrink-0 ${
                selectedThumb === thumb.id ? "ring-2 ring-[#0a84ff] ring-offset-2" : "hover:ring-1 hover:ring-[#0a84ff]/30"
              }`}
              style={{ border: "1px solid rgba(15,23,42,0.08)" }}
            >
              <img src={thumb.src} alt={thumb.id} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetaChip({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#0f172a]"
      style={{ background: "#f8fafc", border: "1px solid rgba(15,23,42,0.06)" }}
    >
      <MetaIcon name={icon} />
      {children}
    </span>
  );
}

function MetaIcon({ name }: { name: string }) {
  const props = { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none", stroke: "#64748b", strokeWidth: 2 };
  switch (name) {
    case "model": return <svg {...props}><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.36 7.64l1.42-1.42" /></svg>;
    case "ratio": return <svg {...props}><rect x="2" y="3" width="20" height="18" rx="2" /><line x1="2" y1="9" x2="22" y2="9" /></svg>;
    case "clock": return <svg {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
    case "resolution": return <svg {...props}><rect x="2" y="2" width="20" height="20" rx="2" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /></svg>;
    default: return null;
  }
}
