"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const imageLabels: Record<number, string> = {
  2: "Cozy Hiding Spot",
  4: "Modern Home Aesthetic",
  8: "DURABLE SISAL POSTS",
};

const gradients = [
  "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)",
  "linear-gradient(135deg, #ffe4e6 0%, #fed7aa 100%)",
  "linear-gradient(135deg, #f5f5f4 0%, #fef3c7 100%)",
  "linear-gradient(135deg, #ffedd5 0%, #fef9c3 100%)",
  "linear-gradient(135deg, #fef3c7 0%, #f5f5f4 100%)",
  "linear-gradient(135deg, #f5f5f4 0%, #fef3c7 100%)",
  "linear-gradient(135deg, #fef9c3 0%, #ffedd5 100%)",
  "linear-gradient(135deg, #ffe4e6 0%, #f5f5f4 100%)",
  "linear-gradient(135deg, #fef3c7 0%, #f5f5f4 100%)",
];

function ImagePlaceholder({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="rgba(180,140,60,0.3)" strokeWidth="1">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

export default function ImagePreviewPanel() {
  return (
    <div className="flex-1 h-full overflow-y-auto p-10" style={{ background: "#f4f6f9" }}>
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <h1
            className="text-[32px] font-bold mb-4"
            style={{ color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.15 }}
          >
            AI Listing Images
          </h1>
          <p className="text-[15px] leading-relaxed max-w-xl mx-auto" style={{ color: "#64748b" }}>
            Upload product images, AI instantly generates{" "}
            <strong style={{ color: "#0f172a" }}>multi-platform compliant</strong>{" "}
            high-conversion product images
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-4 gap-4">
          {/* Large Image 01 */}
          <div className="col-span-2 row-span-2 relative group">
            <div
              className="w-full h-full min-h-[360px] rounded-2xl flex items-center justify-center overflow-hidden"
              style={{
                background: gradients[0],
                boxShadow: "0 1px 3px rgba(15,23,42,0.04), 0 8px 32px rgba(15,23,42,0.06)",
              }}
            >
              <div className="text-center">
                <ImagePlaceholder size={72} />
                <p className="text-xs mt-3" style={{ color: "rgba(180,140,60,0.5)" }}>
                  Product Image
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="absolute top-3 left-3 rounded-lg px-2.5 py-1 text-xs font-bold"
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(8px)",
                color: "#0f172a",
                boxShadow: "0 1px 3px rgba(15,23,42,0.08)",
              }}
            >
              01
            </Badge>
          </div>

          {/* Images 02-05 */}
          {[2, 3, 4, 5].map((num) => (
            <div key={num} className="relative group">
              <div
                className="w-full aspect-square rounded-2xl flex items-center justify-center overflow-hidden"
                style={{
                  background: gradients[num - 1],
                  boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
                }}
              >
                <ImagePlaceholder size={36} />
              </div>
              <Badge
                variant="secondary"
                className="absolute top-2.5 left-2.5 rounded-md px-2 py-0.5 text-[10px] font-bold"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(8px)",
                  color: "#0f172a",
                  boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
                }}
              >
                {String(num).padStart(2, "0")}
              </Badge>
              {imageLabels[num] && (
                <span
                  className="absolute bottom-2.5 left-2.5 right-2.5 text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-lg text-center truncate"
                  style={{
                    background: "rgba(15,23,42,0.5)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {imageLabels[num]}
                </span>
              )}
            </div>
          ))}

          {/* Images 06-09 */}
          {[6, 7, 8, 9].map((num) => (
            <div key={num} className="relative group">
              <div
                className="w-full aspect-square rounded-2xl flex items-center justify-center overflow-hidden"
                style={{
                  background: gradients[num - 1],
                  boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
                }}
              >
                <ImagePlaceholder size={36} />
              </div>
              <Badge
                variant="secondary"
                className="absolute top-2.5 left-2.5 rounded-md px-2 py-0.5 text-[10px] font-bold"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(8px)",
                  color: "#0f172a",
                  boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
                }}
              >
                {String(num).padStart(2, "0")}
              </Badge>
              {imageLabels[num] && (
                <span
                  className="absolute bottom-2.5 left-2.5 right-2.5 text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-lg text-center truncate"
                  style={{
                    background: "rgba(15,23,42,0.5)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {imageLabels[num]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
