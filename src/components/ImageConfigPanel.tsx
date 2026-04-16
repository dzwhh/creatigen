"use client";

import React, { useState } from "react";

export default function ImageConfigPanel() {
  const [styleTab, setStyleTab] = useState<"trending" | "custom">("trending");
  const [uploadCount] = useState(0);

  return (
    <div className="w-[480px] min-w-[480px] h-full overflow-y-auto border-r border-border bg-white p-6 space-y-6">
      {/* Upload Images */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Upload Images</h3>
          <span className="text-xs text-text-muted">{uploadCount}/5</span>
        </div>

        {/* Drop Zone */}
        <div className="border-2 border-dashed border-border-light rounded-xl p-8 flex flex-col items-center justify-center hover:border-brand-purple/40 transition-colors cursor-pointer bg-surface/30">
          <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9494a5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Click or drag to upload images</p>
          <p className="text-xs text-text-muted">Supports JPG, JPEG, PNG, WEBP, max 10MB each</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-3">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-surface transition-colors">
            Choose Files
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-surface transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            Select from Library
          </button>
        </div>
      </div>

      {/* Target Platform */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Target Platform</label>
        <div className="relative">
          <select className="w-full appearance-none px-4 py-2.5 rounded-lg border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all cursor-pointer">
            <option>Amazon</option>
            <option>Shopify</option>
            <option>TikTok Shop</option>
            <option>Walmart</option>
            <option>eBay</option>
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9494a5" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Target Market & Language */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Target Market</label>
          <div className="relative">
            <select className="w-full appearance-none px-4 py-2.5 rounded-lg border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all cursor-pointer">
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Germany</option>
              <option>Japan</option>
              <option>Canada</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9494a5" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Target Language</label>
          <div className="relative">
            <select className="w-full appearance-none px-4 py-2.5 rounded-lg border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all cursor-pointer">
              <option>English</option>
              <option>German</option>
              <option>Japanese</option>
              <option>French</option>
              <option>Spanish</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9494a5" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {/* Selling Points & Trending Styles */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-foreground">Selling Points & Trending Styles</h3>
          <button className="flex items-center gap-1.5 text-xs font-medium text-brand-purple hover:text-brand-purple/80 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M17.8 6.2L19 5M12.2 11.8L11 13M12.2 6.2L11 5M15 9a3 3 0 1 1 0 0" />
            </svg>
            One-Click Analysis
          </button>
        </div>
      </div>

      {/* Product Selling Points */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-foreground">Product Selling Points</h3>
          <button className="flex items-center gap-1.5 text-xs font-medium text-brand-purple hover:text-brand-purple/80 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L9 9l-7 1 5 5-1.5 7L12 18.5 18.5 22 17 15l5-5-7-1z" />
            </svg>
            AI Generate
          </button>
        </div>
        <textarea
          className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all resize-none"
          rows={6}
          placeholder={`Product Name:\nCore Selling Points:\nTarget Audience:\nExpected Scenarios:\nSize Parameters:`}
        />
      </div>

      {/* Style Tab Toggle */}
      <div className="bg-surface rounded-xl p-1 flex">
        <button
          onClick={() => setStyleTab("trending")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            styleTab === "trending"
              ? "bg-white text-foreground shadow-sm"
              : "text-text-muted hover:text-text-secondary"
          }`}
        >
          Trending Styles
        </button>
        <button
          onClick={() => setStyleTab("custom")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            styleTab === "custom"
              ? "bg-white text-foreground shadow-sm"
              : "text-text-muted hover:text-text-secondary"
          }`}
        >
          Custom Style
        </button>
      </div>

      {/* Generate Button */}
      <div className="pt-2">
        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-accent-green to-accent-green-dark text-foreground font-semibold text-sm shadow-lg shadow-accent-green/25 hover:shadow-accent-green/40 transition-all hover:scale-[1.01] active:scale-[0.99]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Free Preview Generation
        </button>
        <p className="text-xs text-text-muted text-center mt-2">
          Please upload at least one product image first
        </p>
      </div>
    </div>
  );
}
