"use client";

import React from "react";

const placeholderImages = [
  { id: 1, label: null, span: "col-span-2 row-span-2" },
  { id: 2, label: "Cozy Hiding Spot", span: "" },
  { id: 3, label: null, span: "" },
  { id: 4, label: "Modern Home Aesthetic", span: "" },
  { id: 5, label: null, span: "" },
  { id: 6, label: null, span: "" },
  { id: 7, label: null, span: "" },
  { id: 8, label: "DURABLE SISAL POSTS", span: "" },
  { id: 9, label: null, span: "" },
];

const catTowerColors = [
  "from-amber-100 to-orange-50",
  "from-rose-50 to-amber-50",
  "from-stone-100 to-amber-50",
  "from-orange-50 to-yellow-50",
  "from-amber-50 to-stone-100",
  "from-stone-50 to-amber-100",
  "from-yellow-50 to-orange-50",
  "from-rose-50 to-stone-100",
  "from-amber-100 to-stone-50",
];

export default function ImagePreviewPanel() {
  return (
    <div className="flex-1 h-full overflow-y-auto bg-surface/50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
            AI Listing Images
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed max-w-lg mx-auto">
            Upload product images, AI instantly generates{" "}
            <span className="font-bold text-foreground">multi-platform compliant</span>{" "}
            high-conversion product images
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Large Image 01 */}
          <div className="col-span-2 row-span-2 relative group">
            <div className={`w-full h-full min-h-[320px] rounded-2xl bg-gradient-to-br ${catTowerColors[0]} flex items-center justify-center overflow-hidden`}>
              <div className="text-center">
                <svg className="mx-auto mb-2 text-amber-300/60" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p className="text-xs text-amber-400/60">Product Image</p>
              </div>
            </div>
            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold text-foreground w-7 h-7 rounded-lg flex items-center justify-center shadow-sm">
              01
            </span>
          </div>

          {/* Images 02-05 */}
          {[2, 3, 4, 5].map((num) => (
            <div key={num} className="relative group">
              <div className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${catTowerColors[num - 1]} flex items-center justify-center overflow-hidden`}>
                <svg className="text-amber-300/40" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-foreground w-6 h-6 rounded-md flex items-center justify-center shadow-sm">
                {String(num).padStart(2, "0")}
              </span>
              {placeholderImages[num - 1].label && (
                <span className="absolute bottom-2 left-2 right-2 bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-md text-center truncate">
                  {placeholderImages[num - 1].label}
                </span>
              )}
            </div>
          ))}

          {/* Images 06-09 */}
          {[6, 7, 8, 9].map((num) => (
            <div key={num} className="relative group">
              <div className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${catTowerColors[num - 1]} flex items-center justify-center overflow-hidden`}>
                <svg className="text-amber-300/40" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-foreground w-6 h-6 rounded-md flex items-center justify-center shadow-sm">
                {String(num).padStart(2, "0")}
              </span>
              {placeholderImages[num - 1].label && (
                <span className="absolute bottom-2 left-2 right-2 bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-md text-center truncate">
                  {placeholderImages[num - 1].label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
