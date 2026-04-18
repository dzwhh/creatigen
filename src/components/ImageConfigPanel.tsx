"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function ImageConfigPanel() {
  const [styleTab, setStyleTab] = useState<"trending" | "custom">("trending");
  const [uploadCount] = useState(0);

  return (
    <div
      className="w-[520px] min-w-[520px] h-full overflow-y-auto p-8 space-y-8"
      style={{
        background: "rgba(255,255,255,0.88)",
        borderRight: "1px solid rgba(15,23,42,0.06)",
      }}
    >
      {/* Upload Images */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold tracking-[-0.02em]" style={{ color: "#0f172a" }}>
            Upload Images
          </h3>
          <span className="text-xs font-medium" style={{ color: "#64748b" }}>
            {uploadCount}/5
          </span>
        </div>

        {/* Drop Zone */}
        <div
          className="rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-[#0a84ff]/30"
          style={{
            border: "2px dashed rgba(15,23,42,0.1)",
            background: "rgba(244,246,249,0.5)",
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "rgba(10,132,255,0.08)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="text-sm font-semibold mb-1" style={{ color: "#0f172a" }}>
            Click or drag to upload images
          </p>
          <p className="text-xs" style={{ color: "#64748b" }}>
            Supports JPG, JPEG, PNG, WEBP, max 10MB each
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <Button variant="outline" className="flex-1 h-11 rounded-xl text-sm font-medium">
            Choose Files
          </Button>
          <Button variant="outline" className="flex-1 h-11 rounded-xl text-sm font-medium gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            Select from Library
          </Button>
        </div>
      </section>

      <Separator className="opacity-40" />

      {/* Target Platform */}
      <section>
        <Label className="text-sm font-bold tracking-[-0.02em] mb-3 block" style={{ color: "#0f172a" }}>
          Target Platform
        </Label>
        <Select defaultValue="amazon">
          <SelectTrigger className="w-full h-11 rounded-xl text-sm">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="amazon">Amazon</SelectItem>
            <SelectItem value="shopify">Shopify</SelectItem>
            <SelectItem value="tiktok">TikTok Shop</SelectItem>
            <SelectItem value="walmart">Walmart</SelectItem>
            <SelectItem value="ebay">eBay</SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* Target Market & Language */}
      <section className="grid grid-cols-2 gap-5">
        <div>
          <Label className="text-sm font-bold tracking-[-0.02em] mb-3 block" style={{ color: "#0f172a" }}>
            Target Market
          </Label>
          <Select defaultValue="us">
            <SelectTrigger className="w-full h-11 rounded-xl text-sm">
              <SelectValue placeholder="Select market" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
              <SelectItem value="jp">Japan</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-bold tracking-[-0.02em] mb-3 block" style={{ color: "#0f172a" }}>
            Target Language
          </Label>
          <Select defaultValue="en">
            <SelectTrigger className="w-full h-11 rounded-xl text-sm">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <Separator className="opacity-40" />

      {/* Selling Points & Trending Styles */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold tracking-[-0.02em]" style={{ color: "#0f172a" }}>
            Selling Points & Trending Styles
          </h3>
          <Button variant="ghost" size="sm" className="h-8 px-3 text-xs font-semibold gap-1.5" style={{ color: "#0a84ff" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M17.8 6.2L19 5M12.2 11.8L11 13M12.2 6.2L11 5M15 9a3 3 0 1 1 0 0" />
            </svg>
            One-Click Analysis
          </Button>
        </div>
      </section>

      {/* Product Selling Points */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold tracking-[-0.02em]" style={{ color: "#0f172a" }}>
            Product Selling Points
          </h3>
          <Button variant="ghost" size="sm" className="h-8 px-3 text-xs font-semibold gap-1.5" style={{ color: "#0a84ff" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L9 9l-7 1 5 5-1.5 7L12 18.5 18.5 22 17 15l5-5-7-1z" />
            </svg>
            AI Generate
          </Button>
        </div>
        <Textarea
          className="min-h-[160px] rounded-xl text-sm leading-relaxed resize-none"
          placeholder={`Product Name:\nCore Selling Points:\nTarget Audience:\nExpected Scenarios:\nSize Parameters:`}
        />
      </section>

      <Separator className="opacity-40" />

      {/* Style Tab Toggle */}
      <section>
        <div
          className="rounded-2xl p-1.5 flex"
          style={{ background: "#f1f5f9" }}
        >
          <button
            onClick={() => setStyleTab("trending")}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer tracking-[-0.01em] ${
              styleTab === "trending"
                ? "bg-white text-[#0f172a]"
                : "text-[#64748b] hover:text-[#0f172a]"
            }`}
            style={
              styleTab === "trending"
                ? { boxShadow: "0 1px 3px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.06)" }
                : undefined
            }
          >
            Trending Styles
          </button>
          <button
            onClick={() => setStyleTab("custom")}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer tracking-[-0.01em] ${
              styleTab === "custom"
                ? "bg-white text-[#0f172a]"
                : "text-[#64748b] hover:text-[#0f172a]"
            }`}
            style={
              styleTab === "custom"
                ? { boxShadow: "0 1px 3px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.06)" }
                : undefined
            }
          >
            Custom Style
          </button>
        </div>
      </section>

      {/* Generate Button */}
      <section className="pt-2 pb-4">
        <Button
          className="w-full h-13 rounded-2xl text-sm font-bold gap-2 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #0a84ff 0%, #0059b3 100%)",
            color: "#ffffff",
            boxShadow: "0 4px 16px rgba(10,132,255,0.3)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Free Preview Generation
        </Button>
        <p className="text-xs text-center mt-3" style={{ color: "#64748b" }}>
          Please upload at least one product image first
        </p>
      </section>
    </div>
  );
}
