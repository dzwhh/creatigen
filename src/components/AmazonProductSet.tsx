"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";

// Mock data for generated task rows
const mockTasks = [
  {
    id: "task-1",
    images: [
      { id: "img-1", src: "/img/excel_images/Collage示例/Western fashion/image_001.png" },
      { id: "img-2", src: "/img/excel_images/Collage示例/Western fashion/image_002.png" },
      { id: "img-3", src: "/img/excel_images/Collage示例/Western fashion/image_003.png" },
      { id: "img-4", src: "/img/excel_images/Collage示例/Daily/image_004.png" },
    ],
    meta: {
      time: "5 minutes ago",
      model: "Nano Banana Pro",
      ratio: "1:1",
      resolution: "1K",
      count: "4/4",
      status: "Done" as const,
    },
  },
  {
    id: "task-2",
    images: [
      { id: "img-5", src: "/img/excel_images/Collage示例/Daily/image_005.png" },
      { id: "img-6", src: "/img/excel_images/Collage示例/Daily/image_006.png" },
      { id: "img-7", src: "/img/excel_images/Collage示例/Daily/image_007.png" },
      { id: "img-8", src: "/img/excel_images/Collage示例/Daily/image_008.png" },
    ],
    meta: {
      time: "7 minutes ago",
      model: "Nano Banana Pro",
      ratio: "1:1",
      resolution: "2K",
      count: "4/4",
      status: "Done" as const,
    },
  },
];

interface AmazonProductSetProps {
  onImageClick: (imageId: string, taskImages?: { id: string; src: string }[]) => void;
}

const resolutions = ["1K", "2K", "4K"];
const ratios = [
  { label: "Auto", icon: "auto" },
  { label: "1:1", icon: "1:1" },
  { label: "3:4", icon: "3:4" },
  { label: "4:3", icon: "4:3" },
  { label: "9:16", icon: "9:16" },
  { label: "16:9", icon: "16:9" },
  { label: "21:9", icon: "21:9" },
];
const imageCounts = [1, 2, 3, 4];

// Style reference images by category (from img/excel_images/Collage示例 subfolders)
const styleRefImages: Record<string, { name: string; src: string }[]> = {
  "Western Fashion": [
    { name: "Western Chic Outfit", src: "/img/excel_images/Collage示例/Western fashion/image_001.png" },
    { name: "Western Fashion Inspo", src: "/img/excel_images/Collage示例/Western fashion/image_002.png" },
    { name: "Western Nomadic", src: "/img/excel_images/Collage示例/Western fashion/image_003.png" },
  ],
  "Daily": [
    { name: "Spring Outfit Inspo", src: "/img/excel_images/Collage示例/Daily/image_004.png" },
    { name: "Casual Weekend", src: "/img/excel_images/Collage示例/Daily/image_005.png" },
    { name: "Everyday Basics", src: "/img/excel_images/Collage示例/Daily/image_006.png" },
    { name: "Street Style", src: "/img/excel_images/Collage示例/Daily/image_007.png" },
    { name: "Minimalist Look", src: "/img/excel_images/Collage示例/Daily/image_008.png" },
    { name: "Cozy Casual", src: "/img/excel_images/Collage示例/Daily/image_009.png" },
    { name: "Urban Daily", src: "/img/excel_images/Collage示例/Daily/image_010.png" },
    { name: "Easy Chic", src: "/img/excel_images/Collage示例/Daily/image_011.png" },
    { name: "Relaxed Fit", src: "/img/excel_images/Collage示例/Daily/image_012.png" },
    { name: "Sporty Casual", src: "/img/excel_images/Collage示例/Daily/image_013.png" },
  ],
  "Formal/Work Commute": [
    { name: "Office Chic", src: "/img/excel_images/Collage示例/Formal&Work commute/image_014.png" },
    { name: "Business Casual", src: "/img/excel_images/Collage示例/Formal&Work commute/image_015.png" },
  ],
  "Vacation": [
    { name: "Beach Vibes", src: "/img/excel_images/Collage示例/Vacation/image_016.png" },
    { name: "Resort Wear", src: "/img/excel_images/Collage示例/Vacation/image_017.png" },
    { name: "Tropical Getaway", src: "/img/excel_images/Collage示例/Vacation/image_018.png" },
    { name: "Summer Holiday", src: "/img/excel_images/Collage示例/Vacation/image_019.png" },
    { name: "Travel Essentials", src: "/img/excel_images/Collage示例/Vacation/image_020.png" },
  ],
};
const styleCategories = ["All", "Western Fashion", "Daily", "Formal/Work Commute", "Vacation"];

// Model reference images (European/American fashion models)
const modelRefImages: Record<string, { name: string; src: string }[]> = {
  "Nesrin": [
    ...Array.from({ length: 22 }, (_, i) => ({ name: `Nesrin ${String(i + 1).padStart(2, "0")}`, src: `/img/excel_images/Nesrin（副本）/image_${String(i + 1).padStart(3, "0")}.png` })),
    ...Array.from({ length: 6 }, (_, i) => ({ name: `Nesrin ${i + 23}`, src: `/img/excel_images/Nesrin（副本）/image_${String(i + 23).padStart(3, "0")}.jpg` })),
  ],
  "Nicole": [
    ...[1,2,3,4,5,6,7,8,9].map(i => ({ name: `Nicole ${String(i).padStart(2, "0")}`, src: `/img/excel_images/Nicole（副本）/image_${String(i).padStart(3, "0")}.png` })),
    ...[10,11,12].map(i => ({ name: `Nicole ${i}`, src: `/img/excel_images/Nicole（副本）/image_${String(i).padStart(3, "0")}.jpg` })),
    ...[13,14].map(i => ({ name: `Nicole ${i}`, src: `/img/excel_images/Nicole（副本）/image_${String(i).padStart(3, "0")}.png` })),
    ...[15,16,17,18,19,20,21,22,23,24,25].map(i => ({ name: `Nicole ${i}`, src: `/img/excel_images/Nicole（副本）/image_${String(i).padStart(3, "0")}.jpg` })),
    ...[26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54].map(i => ({ name: `Nicole ${i}`, src: `/img/excel_images/Nicole（副本）/image_${String(i).padStart(3, "0")}.png` })),
    ...[55,56,57,58,59,60,61,62,63,64].map(i => ({ name: `Nicole ${i}`, src: `/img/excel_images/Nicole（副本）/image_${String(i).padStart(3, "0")}.jpg` })),
  ],
};
const modelCategories = ["All", ...Object.keys(modelRefImages)];

// Digital Model library (white-background European/American digital models)
const digitalModelImages: Record<string, { id: string; name: string; src: string }[]> = {
  Female: [
    { id: "dm-f-01", name: "Sophia", src: "/img/models/female_001.png" },
    { id: "dm-f-02", name: "Isabella", src: "/img/models/female_002.png" },
    { id: "dm-f-03", name: "Olivia", src: "/img/models/female_003.png" },
    { id: "dm-f-04", name: "Emma", src: "/img/models/female_004.png" },
    { id: "dm-f-05", name: "Ava", src: "/img/models/female_005.png" },
    { id: "dm-f-06", name: "Charlotte", src: "/img/models/female_006.png" },
    { id: "dm-f-07", name: "Mia", src: "/img/models/female_007.png" },
    { id: "dm-f-08", name: "Amelia", src: "/img/models/female_008.png" },
    { id: "dm-f-09", name: "Harper", src: "/img/models/female_009.png" },
    { id: "dm-f-10", name: "Evelyn", src: "/img/models/female_010.png" },
    { id: "dm-f-11", name: "Luna", src: "/img/models/female_011.png" },
    { id: "dm-f-12", name: "Chloe", src: "/img/models/female_012.png" },
  ],
  Male: [
    { id: "dm-m-01", name: "Liam", src: "/img/models/male_001.png" },
    { id: "dm-m-02", name: "Noah", src: "/img/models/male_002.png" },
    { id: "dm-m-03", name: "Oliver", src: "/img/models/male_003.png" },
    { id: "dm-m-04", name: "James", src: "/img/models/male_004.png" },
    { id: "dm-m-05", name: "Ethan", src: "/img/models/male_005.png" },
    { id: "dm-m-06", name: "Lucas", src: "/img/models/male_006.png" },
    { id: "dm-m-07", name: "Mason", src: "/img/models/male_007.png" },
    { id: "dm-m-08", name: "Logan", src: "/img/models/male_008.png" },
  ],
};

// Product images by style category (from img/products subfolders)
const productRefImages: Record<string, { name: string; src: string; category: string }[]> = {
  "Western Fashion": [
    "Ankleboots_001","Ankleboots_002","Ankleboots_003","Ankleboots_004","Ankleboots_005",
    "Belt_001","Belt_002","Bracelet_001","Bracelet_002","Dress_001",
    "Earrings_001","Earrings_002","Earrings_003","Flats_001","Glasses_001",
    "Handbag_001","Handbag_002",
    "LongBoots_001","LongBoots_002","LongBoots_003","LongBoots_004","LongBoots_005",
    "Necklace_001","Necklace_002","Necklace_003","Necklace_004","Necklace_005","Necklace_006","Necklace_007",
    "Pants_001","Pants_002","Pants_003","Pants_004",
    "Scarf_001","Shortskirt_001","Shortskirt_002",
    "Top_001","Vest_001","Vest_002","Vest_003",
  ].map(f => ({ name: f.replace(/_\d+$/, "").replace(/([a-z])([A-Z])/g, "$1 $2"), src: `/img/products/Western fashion/${f}.jpeg`, category: f.replace(/_\d+$/, "") })),
  "Daily": [
    "Crossbodybag_001",
    "Earrings_001","Earrings_002","Earrings_003",
    "Flats_001","Flats_002","Flats_003",
    "Glasses_001","Glasses_002","Glasses_003",
    "Handbag_001","Handbag_002","Handbag_003","Handbag_004","Handbag_005",
    "Highheels_001",
    "KittenHeels_001","KittenHeels_002","KittenHeels_003","KittenHeels_004","KittenHeels_005","KittenHeels_006",
    "Nails_001",
    "Pants_001","Pants_002","Pants_003","Pants_004","Pants_005","Pants_006","Pants_007",
    "Scarf_001","Scarf_002",
    "Sneaker_001",
    "Top_001","Top_002","Top_003",
    "swimsuit_001",
  ].map(f => ({ name: f.replace(/_\d+$/, "").replace(/([a-z])([A-Z])/g, "$1 $2"), src: `/img/products/Daily/${f}.jpeg`, category: f.replace(/_\d+$/, "") })),
  "Formal/Work Commute": [
    "Bracelet_001",
    "Flats_001","Flats_002",
    "Handbag_001","Handbag_002","Handbag_003",
    "Loafers_001",
    "Necklace_001","Necklace_002",
    "Pants_001","Top_001",
    "Watch_001","Watch_002",
  ].map(f => ({ name: f.replace(/_\d+$/, "").replace(/([a-z])([A-Z])/g, "$1 $2"), src: `/img/products/Formal&Work commute/${f}.jpeg`, category: f.replace(/_\d+$/, "") })),
  "Vacation": [
    "Camisole_001","Camisole_002","Camisole_003",
    "Flats_001","Flats_002",
    "Glasses_001","Glasses_002",
    "Handbag_001",
    "Pants_001","Pants_002",
    "swimsuit_001",
  ].map(f => ({ name: f.replace(/_\d+$/, "").replace(/([a-z])([A-Z])/g, "$1 $2"), src: `/img/products/Vacation/${f}.jpeg`, category: f.replace(/_\d+$/, "") })),
};

// Derive unique product categories across all styles
const allProductCategories = ["All", ...Array.from(new Set(Object.values(productRefImages).flat().map(i => i.category))).sort()];

// AI image generation models
const aiModels = [
  { id: "wanxiang-2.7", name: "Wanxiang 2.7", desc: "Visual expression, strong creativity", badge: null, refCount: "1+" },
  { id: "seedream-5.0-lite", name: "Seedream 5.0 Lite", desc: "ByteDance model, trend-aware understanding, high consistency", badge: null, refCount: "1+" },
  { id: "seedream-4.5", name: "Seedream 4.5", desc: "ByteDance model, stable multi-image fusion, high consistency, clear small text", badge: null, refCount: "1+" },
  { id: "nano-banana-2", name: "Nano Banana 2", desc: "Google model, high consistency, fast, cost-effective", badge: null, refCount: "1+" },
  { id: "nano-banana-pro", name: "Nano Banana Pro", desc: "Google model, high consistency, high expressiveness, best overall performance", badge: null, refCount: "1+" },
  { id: "qwen-image-2.0", name: "Qwen Image 2.0", desc: "Realistic texture, fast generation", badge: "Recommended", refCount: "1+" },
  { id: "qwen-image-2.0-pro", name: "Qwen Image 2.0 Pro", desc: "Realistic & delicate texture, high quality output", badge: null, refCount: "1+" },
  { id: "flux-1.1-pro", name: "FLUX 1.1 Pro", desc: "Black Forest Labs, state-of-the-art quality & prompt adherence", badge: null, refCount: "1+" },
  { id: "midjourney-v7", name: "Midjourney v7", desc: "Ultimate aesthetics and creativity", badge: null, refCount: "1+" },
  { id: "ideogram-3.0", name: "Ideogram 3.0", desc: "Best text rendering, photorealistic output", badge: null, refCount: "1+" },
  { id: "recraft-v3", name: "Recraft V3", desc: "Design-focused, vector & brand assets", badge: null, refCount: "1+" },
];
const outfitSlots: Record<string, string[]> = {
  Top: ["Top", "Vest", "Camisole", "Dress", "swimsuit"],
  Bottom: ["Pants", "Shortskirt"],
  Shoes: ["Ankleboots", "LongBoots", "Flats", "Highheels", "KittenHeels", "Sneaker", "Loafers"],
  Bag: ["Handbag", "Crossbodybag"],
  Accessory: ["Earrings", "Necklace", "Glasses", "Scarf", "Bracelet", "Belt", "Watch", "Nails"],
};

function pickRandomFromSlot(items: { name: string; src: string; category: string }[], slotCats: string[]) {
  const candidates = items.filter(i => slotCats.includes(i.category));
  return candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : null;
}

function generateAiCombo(styleItems: { name: string; src: string; category: string }[]) {
  const combo: { slot: string; item: { name: string; src: string; category: string } }[] = [];
  for (const [slot, cats] of Object.entries(outfitSlots)) {
    const pick = pickRandomFromSlot(styleItems, cats);
    if (pick) combo.push({ slot, item: pick });
  }
  return combo;
}

// Preset Templates: complete creation blueprints
interface PresetTemplate {
  id: string;
  name: string;
  cover: string;           // preview thumbnail
  style: string;           // Western Fashion / Daily / ...
  season: string;          // Spring-Summer / Autumn-Winter / All Season
  blogger: string;         // Street Style / Minimalist / Luxury / ...
  prompt: string;          // full prompt with {product} and {ref} placeholders
  refImages: string[];     // default style reference images
  defaultProducts: { label: string; src: string }[];  // default product images (user can swap)
}

const presetTemplates: PresetTemplate[] = [
  // ─── Western Fashion ───
  {
    id: "wf-street-aw",
    name: "Western Street Blogger",
    cover: "/img/excel_images/Collage示例/Western fashion/image_001.png",
    style: "Western Fashion", season: "Autumn-Winter", blogger: "Street Style",
    prompt: "User-generated content style photography — Western street fashion look with layered outerwear and boots. CRITICAL: preserve the product's exact shape, color, texture, logo, and every detail. Natural ambient lighting, candid genuine feel, urban backdrop with vintage western elements. Use {ref} as style reference and {product} as featured product.",
    refImages: ["/img/excel_images/Collage示例/Western fashion/image_001.png", "/img/excel_images/Collage示例/Western fashion/image_002.png"],
    defaultProducts: [
      { label: "Ankle Boots", src: "/img/products/Western fashion/Ankleboots_001.jpeg" },
      { label: "Vest", src: "/img/products/Western fashion/Vest_001.jpeg" },
      { label: "Necklace", src: "/img/products/Western fashion/Necklace_001.jpeg" },
    ],
  },
  {
    id: "wf-boho-ss",
    name: "Boho Western Summer",
    cover: "/img/excel_images/Collage示例/Western fashion/image_002.png",
    style: "Western Fashion", season: "Spring-Summer", blogger: "Bohemian",
    prompt: "Bohemian western summer editorial — flowing fabrics and leather accessories in golden hour light. CRITICAL: preserve the product's exact design, color, pattern, fabric, cut. Warm desert tones, relaxed nomadic vibe, outdoor setting with natural textures. Use {ref} as style reference and {product} as featured product.",
    refImages: ["/img/excel_images/Collage示例/Western fashion/image_002.png", "/img/excel_images/Collage示例/Western fashion/image_003.png"],
    defaultProducts: [
      { label: "Dress", src: "/img/products/Western fashion/Dress_001.jpeg" },
      { label: "Long Boots", src: "/img/products/Western fashion/LongBoots_001.jpeg" },
      { label: "Scarf", src: "/img/products/Western fashion/Scarf_001.jpeg" },
    ],
  },
  {
    id: "wf-luxury-aw",
    name: "Western Luxe Editorial",
    cover: "/img/excel_images/Collage示例/Western fashion/image_003.png",
    style: "Western Fashion", season: "Autumn-Winter", blogger: "Luxury",
    prompt: "High-end western fashion editorial — premium leather, structured silhouettes, sophisticated color palette. CRITICAL: preserve the product's exact shape, color, texture, logo, and every detail. Studio-quality lighting, editorial composition, luxurious backdrop. Use {ref} as style reference and {product} as featured product.",
    refImages: ["/img/excel_images/Collage示例/Western fashion/image_003.png"],
    defaultProducts: [
      { label: "Long Boots", src: "/img/products/Western fashion/LongBoots_002.jpeg" },
      { label: "Handbag", src: "/img/products/Western fashion/Handbag_001.jpeg" },
      { label: "Belt", src: "/img/products/Western fashion/Belt_001.jpeg" },
    ],
  },
  // ─── Daily ───
  {
    id: "dl-minimal-ss",
    name: "Minimalist Daily",
    cover: "/img/excel_images/Collage示例/Daily/image_004.png",
    style: "Daily", season: "Spring-Summer", blogger: "Minimalist",
    prompt: "Clean minimalist everyday look — neutral tones, simple silhouettes, effortless styling. CRITICAL: preserve the product's exact design, color, pattern, fabric, cut. Soft natural daylight, airy indoor setting, less-is-more aesthetic. Use {ref} as style reference and {product} as featured product.",
    refImages: ["/img/excel_images/Collage示例/Daily/image_004.png", "/img/excel_images/Collage示例/Daily/image_005.png"],
    defaultProducts: [
      { label: "Top", src: "/img/products/Daily/Top_001.jpeg" },
      { label: "Pants", src: "/img/products/Daily/Pants_001.jpeg" },
      { label: "Flats", src: "/img/products/Daily/Flats_001.jpeg" },
    ],
  },
  {
    id: "dl-street-as",
    name: "Street Casual",
    cover: "/img/excel_images/Collage示例/Daily/image_006.png",
    style: "Daily", season: "All Season", blogger: "Street Style",
    prompt: "Urban street casual photography — relaxed fit, sneakers, crossbody bags, candid walking shot. CRITICAL: preserve the product's exact design, color, pattern, fabric, cut. City backdrop, authentic vibe, natural ambient light. Use {ref} as style reference and {product} as featured product.",
    refImages: ["/img/excel_images/Collage示例/Daily/image_006.png", "/img/excel_images/Collage示例/Daily/image_007.png"],
    defaultProducts: [
      { label: "Top", src: "/img/products/Daily/Top_002.jpeg" },
      { label: "Pants", src: "/img/products/Daily/Pants_003.jpeg" },
      { label: "Sneaker", src: "/img/products/Daily/Sneaker_001.jpeg" },
      { label: "Crossbody Bag", src: "/img/products/Daily/Crossbodybag_001.jpeg" },
    ],
  },
  {
    id: "dl-sporty-ss",
    name: "Sporty Chic",
    cover: "/img/excel_images/Collage示例/Daily/image_008.png",
    style: "Daily", season: "Spring-Summer", blogger: "Sporty",
    prompt: "Sporty chic lifestyle photography — athleisure meets fashion, dynamic pose, vibrant energy. CRITICAL: preserve the product's exact design, color, pattern, fabric, cut. Outdoor park or gym setting, bright natural light, active lifestyle vibe. Use {ref} as style reference and {product} as featured product.",
    refImages: ["/img/excel_images/Collage示例/Daily/image_008.png"],
    defaultProducts: [
      { label: "Top", src: "/img/products/Daily/Top_003.jpeg" },
      { label: "Pants", src: "/img/products/Daily/Pants_005.jpeg" },
      { label: "Sneaker", src: "/img/products/Daily/Sneaker_001.jpeg" },
    ],
  },
  {
    id: "dl-cozy-aw",
    name: "Cozy Weekend",
    cover: "/img/excel_images/Collage示例/Daily/image_009.png",
    style: "Daily", season: "Autumn-Winter", blogger: "Minimalist",
    prompt: "Cozy weekend outfit photography — warm knitwear, soft textures, relaxed at-home or café setting. CRITICAL: preserve the product's exact design, color, pattern, fabric, cut. Warm indoor lighting, hygge atmosphere, inviting and comfortable. Use {ref} as style reference and {product} as featured product.",
    refImages: ["/img/excel_images/Collage示例/Daily/image_009.png", "/img/excel_images/Collage示例/Daily/image_010.png"],
    defaultProducts: [
      { label: "Top", src: "/img/products/Daily/Top_001.jpeg" },
      { label: "Scarf", src: "/img/products/Daily/Scarf_001.jpeg" },
      { label: "Handbag", src: "/img/products/Daily/Handbag_001.jpeg" },
    ],
  },
  // ─── Formal / Work Commute ───
  {
    id: "fw-office-as",
    name: "Office Power Look",
    cover: "/img/excel_images/Collage示例/Formal&Work commute/image_014.png",
    style: "Formal/Work Commute", season: "All Season", blogger: "Minimalist",
    prompt: "Professional office photography — tailored pieces, structured handbag, polished accessories. CRITICAL: preserve the product's exact design, color, pattern, fabric, cut. Modern office interior, clean lines, confident posture. Use {ref} as style reference and {product} as featured product.",
    refImages: ["/img/excel_images/Collage示例/Formal&Work commute/image_014.png"],
    defaultProducts: [
      { label: "Top", src: "/img/products/Formal&Work commute/Top_001.jpeg" },
      { label: "Pants", src: "/img/products/Formal&Work commute/Pants_001.jpeg" },
      { label: "Handbag", src: "/img/products/Formal&Work commute/Handbag_001.jpeg" },
      { label: "Watch", src: "/img/products/Formal&Work commute/Watch_001.jpeg" },
    ],
  },
  {
    id: "fw-commute-ss",
    name: "Smart Commute",
    cover: "/img/excel_images/Collage示例/Formal&Work commute/image_015.png",
    style: "Formal/Work Commute", season: "Spring-Summer", blogger: "Street Style",
    prompt: "Smart commute look — business casual meets street style, walking in urban environment. CRITICAL: preserve the product's exact design, color, pattern, fabric, cut. City streets, morning light, dynamic movement feel. Use {ref} as style reference and {product} as featured product.",
    refImages: ["/img/excel_images/Collage示例/Formal&Work commute/image_015.png"],
    defaultProducts: [
      { label: "Loafers", src: "/img/products/Formal&Work commute/Loafers_001.jpeg" },
      { label: "Handbag", src: "/img/products/Formal&Work commute/Handbag_002.jpeg" },
      { label: "Necklace", src: "/img/products/Formal&Work commute/Necklace_001.jpeg" },
    ],
  },
  // ─── Vacation ───
  {
    id: "vc-beach-ss",
    name: "Beach Resort",
    cover: "/img/excel_images/Collage示例/Vacation/image_016.png",
    style: "Vacation", season: "Spring-Summer", blogger: "Bohemian",
    prompt: "Beach resort lifestyle photography — swimsuit or light dress, sandy tones, ocean backdrop. CRITICAL: preserve the product's exact design, color, pattern, fabric, cut. Golden hour on beach, relaxed vacation mood, warm tropical palette. Use {ref} as style reference and {product} as featured product.",
    refImages: ["/img/excel_images/Collage示例/Vacation/image_016.png", "/img/excel_images/Collage示例/Vacation/image_017.png"],
    defaultProducts: [
      { label: "Camisole", src: "/img/products/Vacation/Camisole_001.jpeg" },
      { label: "Flats", src: "/img/products/Vacation/Flats_001.jpeg" },
      { label: "Handbag", src: "/img/products/Vacation/Handbag_001.jpeg" },
    ],
  },
  {
    id: "vc-tropical-ss",
    name: "Tropical Getaway",
    cover: "/img/excel_images/Collage示例/Vacation/image_018.png",
    style: "Vacation", season: "Spring-Summer", blogger: "Luxury",
    prompt: "Tropical luxury getaway — bold prints, resort wear, lush greenery background. CRITICAL: preserve the product's exact design, color, pattern, fabric, cut. Exotic location, saturated colors, editorial travel magazine feel. Use {ref} as style reference and {product} as featured product.",
    refImages: ["/img/excel_images/Collage示例/Vacation/image_018.png", "/img/excel_images/Collage示例/Vacation/image_019.png"],
    defaultProducts: [
      { label: "Swimsuit", src: "/img/products/Vacation/swimsuit_001.jpeg" },
      { label: "Glasses", src: "/img/products/Vacation/Glasses_001.jpeg" },
      { label: "Pants", src: "/img/products/Vacation/Pants_001.jpeg" },
    ],
  },
  {
    id: "vc-holiday-as",
    name: "Summer Holiday",
    cover: "/img/excel_images/Collage示例/Vacation/image_020.png",
    style: "Vacation", season: "All Season", blogger: "Street Style",
    prompt: "Summer holiday casual — easy breezy outfit, exploring local markets or cafés. CRITICAL: preserve the product's exact design, color, pattern, fabric, cut. Warm afternoon light, authentic travel scenery, spontaneous candid energy. Use {ref} as style reference and {product} as featured product.",
    refImages: ["/img/excel_images/Collage示例/Vacation/image_020.png"],
    defaultProducts: [
      { label: "Camisole", src: "/img/products/Vacation/Camisole_002.jpeg" },
      { label: "Pants", src: "/img/products/Vacation/Pants_002.jpeg" },
      { label: "Glasses", src: "/img/products/Vacation/Glasses_002.jpeg" },
    ],
  },
];

const presetStyles = ["All", ...Array.from(new Set(presetTemplates.map(t => t.style)))];
const presetSeasons = ["All", ...Array.from(new Set(presetTemplates.map(t => t.season)))];
const presetBloggers = ["All", ...Array.from(new Set(presetTemplates.map(t => t.blogger)))];

export default function AmazonProductSet({ onImageClick }: AmazonProductSetProps) {
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const [selectedRes, setSelectedRes] = useState("1K");
  const [selectedRatio, setSelectedRatio] = useState("4:3");
  const [selectedCount, setSelectedCount] = useState(1);
  const [presetStyleFilter, setPresetStyleFilter] = useState("All");
  const [presetSeasonFilter, setPresetSeasonFilter] = useState("All");
  const [presetBloggerFilter, setPresetBloggerFilter] = useState("All");
  const [expandedPreset, setExpandedPreset] = useState<string | null>(null);
  const [showRefModal, setShowRefModal] = useState(false);
  const [refModalTab, setRefModalTab] = useState("upload");
  const [styleFilterCat, setStyleFilterCat] = useState("All");
  const [modelFilterCat, setModelFilterCat] = useState("All");
  const [digitalModelFilter, setDigitalModelFilter] = useState("All");
  const [productStyleFilter, setProductStyleFilter] = useState("All");
  const [productCatFilter, setProductCatFilter] = useState("All");
  const [aiComboResults, setAiComboResults] = useState<Record<string, { slot: string; item: { name: string; src: string; category: string } }[]> | null>(null);
  const [selectedModel, setSelectedModel] = useState("wanxiang-2.7");
  const [uploadedRefs, setUploadedRefs] = useState<string[]>([]);
  const [promptText, setPromptText] = useState("Fashion photography with appropriate model and setting matching product positioning. CRITICAL: preserve the product's exact design, color, pattern, fabric, cut, and every detail — do NOT alter or reimagine the product.");
  const [showAtMenu, setShowAtMenu] = useState(false);
  const [atMenuPos, setAtMenuPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const savedRange = useRef<Range | null>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const promptInitialized = useRef(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const refModalRef = useRef<HTMLDivElement>(null);
  const refTriggerRef = useRef<HTMLButtonElement>(null);
  const promptBarRef = useRef<HTMLDivElement>(null);
  const [modalPos, setModalPos] = useState<{ bottom: number; left: number; width: number } | null>(null);
  const [hoverPreview, setHoverPreview] = useState<{ src: string; x: number; y: number } | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showPreview = useCallback((src: string, e: React.MouseEvent) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHoverPreview({ src, x: rect.left + rect.width / 2, y: rect.top });
  }, []);
  const hidePreview = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setHoverPreview(null), 100);
  }, []);

  useEffect(() => {
    if (showRefModal && promptBarRef.current) {
      const rect = promptBarRef.current.getBoundingClientRect();
      setModalPos({
        bottom: window.innerHeight - rect.top + 8,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [showRefModal]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setActivePopover(null);
      }
      if (
        showRefModal &&
        refModalRef.current && !refModalRef.current.contains(e.target as Node) &&
        refTriggerRef.current && !refTriggerRef.current.contains(e.target as Node)
      ) {
        setShowRefModal(false);
      }
    };
    if (activePopover || showRefModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activePopover, showRefModal]);

  const togglePopover = (name: string) => {
    setActivePopover((prev) => (prev === name ? null : name));
  };

  // Initialize prompt content once
  useEffect(() => {
    if (promptRef.current && !promptInitialized.current) {
      promptRef.current.textContent = promptText;
      promptInitialized.current = true;
    }
  }, [promptText]);

  // Hover preview for prompt chips
  useEffect(() => {
    const el = promptRef.current;
    if (!el) return;
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('img');
      if (target && target.closest('[contenteditable="false"]')) {
        const src = target.getAttribute('src');
        if (src) {
          if (hoverTimer.current) clearTimeout(hoverTimer.current);
          const rect = target.getBoundingClientRect();
          setHoverPreview({ src, x: rect.left + rect.width / 2, y: rect.top });
        }
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('img');
      if (target && target.closest('[contenteditable="false"]')) {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(() => setHoverPreview(null), 100);
      }
    };
    el.addEventListener('mouseover', onOver);
    el.addEventListener('mouseout', onOut);
    return () => { el.removeEventListener('mouseover', onOver); el.removeEventListener('mouseout', onOut); };
  }, []);

  // Handle @ mention in contentEditable
  const handlePromptInput = useCallback(() => {
    if (!promptRef.current) return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    const textBefore = range.startContainer.textContent?.slice(0, range.startOffset) || "";
    if (textBefore.endsWith("@") && uploadedRefs.length > 0) {
      const rect = range.getBoundingClientRect();
      savedRange.current = range.cloneRange();
      setAtMenuPos({ top: rect.top - 8, left: rect.left });
      setShowAtMenu(true);
    } else {
      setShowAtMenu(false);
    }
  }, [uploadedRefs]);

  const insertImageMention = useCallback((index: number) => {
    if (!promptRef.current || !savedRange.current) return;
    const sel = window.getSelection();
    if (!sel) return;
    // Restore saved range
    sel.removeAllRanges();
    sel.addRange(savedRange.current);
    const range = savedRange.current;
    const textNode = range.startContainer;
    if (textNode.nodeType === Node.TEXT_NODE && textNode.textContent) {
      const pos = textNode.textContent.lastIndexOf("@");
      if (pos !== -1) {
        const before = textNode.textContent.slice(0, pos);
        const after = textNode.textContent.slice(pos + 1);
        textNode.textContent = before;
        const chip = document.createElement("span");
        chip.contentEditable = "false";
        chip.className = "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[12px] font-medium align-middle mx-0.5";
        chip.style.cssText = "background: #f1f5f9; border: 1px solid rgba(15,23,42,0.08); cursor: default; vertical-align: middle;";
        chip.innerHTML = `<img src="${uploadedRefs[index]}" style="width:20px;height:20px;border-radius:4px;object-fit:cover;display:inline-block;" /> Image ${index + 1}`;
        const afterNode = document.createTextNode(after || "\u00A0");
        const parent = textNode.parentNode;
        if (parent) {
          parent.insertBefore(afterNode, textNode.nextSibling);
          parent.insertBefore(chip, afterNode);
          const newRange = document.createRange();
          newRange.setStartAfter(chip);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
        }
      }
    }
    savedRange.current = null;
    setShowAtMenu(false);
  }, [uploadedRefs]);

  // Apply a preset template: fill refs + products + prompt with image chips
  const applyPresetTemplate = useCallback((template: PresetTemplate) => {
    // 1. Set ref images (style references + product images, max 5)
    const allRefSrcs = [...template.refImages, ...template.defaultProducts.map(p => p.src)].slice(0, 10);
    setUploadedRefs(allRefSrcs);
    // 2. Build prompt with image chips
    const makeChip = (src: string, label: string) =>
      `<span contenteditable="false" class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[12px] font-medium align-middle mx-0.5" style="background:#f1f5f9;border:1px solid rgba(15,23,42,0.08);cursor:default;vertical-align:middle;"><img src="${src}" style="width:20px;height:20px;border-radius:4px;object-fit:cover;display:inline-block;" /> ${label}</span>`;
    let html = template.prompt;
    // Replace {ref} with first ref image chip
    html = html.replace("{ref}", makeChip(template.refImages[0], "Style Ref"));
    // Replace {product} with product chips
    const productChips = template.defaultProducts.map(p => makeChip(p.src, p.label)).join(" ");
    html = html.replace("{product}", productChips);
    if (promptRef.current) {
      promptRef.current.innerHTML = html;
    }
    setActivePopover(null);
  }, []);

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden" style={{ background: "#f4f6f9" }}>
      {/* Filter bar */}
      <div
        className="flex items-center gap-3 px-6 py-3 flex-shrink-0"
        style={{
          background: "#ffffff",
          borderBottom: "1px solid rgba(15,23,42,0.06)",
        }}
      >
        {["Model", "Resolution", "Aspect Ratio"].map((filter) => (
          <button
            key={filter}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium text-[#0f172a] cursor-pointer hover:bg-[#f1f5f9] transition-colors"
            style={{ border: "1px solid rgba(15,23,42,0.1)" }}
          >
            {filter}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        ))}
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search prompts..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0a84ff]/20"
            style={{ border: "1px solid rgba(15,23,42,0.1)" }}
          />
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium text-[#0f172a] cursor-pointer hover:bg-[#f1f5f9] transition-colors"
          style={{ border: "1px solid rgba(15,23,42,0.1)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          Batch
        </button>
      </div>

      {/* Task list */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {mockTasks.map((task) => (
          <div
            key={task.id}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(15,23,42,0.06)",
              boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
            }}
          >
            {/* Meta params row */}
            <div className="flex items-center gap-2 px-5 py-3 flex-wrap" style={{ borderBottom: "1px solid rgba(15,23,42,0.06)" }}>
              <MetaTag icon="clock">{task.meta.time}</MetaTag>
              <MetaTag icon="settings">{task.meta.model}</MetaTag>
              <MetaTag icon="ratio">{task.meta.ratio}</MetaTag>
              <MetaTag icon="resolution">{task.meta.resolution}</MetaTag>
              <MetaTag icon="images">{task.meta.count}</MetaTag>
              <Badge
                className="rounded-full px-3 py-1 text-[11px] font-semibold border-0"
                style={{
                  background: "rgba(16,185,129,0.08)",
                  color: "#10b981",
                }}
              >
                {task.meta.status}
              </Badge>
            </div>
            {/* 1:1 image grid, max 4 per row */}
            <div className="grid grid-cols-4 gap-3 p-5">
              {task.images.slice(0, 4).map((img) => (
                <div
                  key={img.id}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group relative bg-[#f8fafc]"
                  onClick={() => onImageClick(img.id, task.images)}
                >
                  <img
                    src={img.src}
                    alt="Generated collage"
                    className="w-full h-full object-cover"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {/* Hover action buttons */}
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-1.5 pb-3 px-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                    <div className="flex gap-1.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-[#0f172a] cursor-pointer hover:bg-white transition-colors"
                        style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                        Save
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-[#0f172a] cursor-pointer hover:bg-white transition-colors"
                        style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom prompt bar */}
      <div
        ref={promptBarRef}
        className="relative flex-shrink-0 mx-6 mb-6 rounded-2xl p-4 flex flex-col gap-3"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(15,23,42,0.08)",
          boxShadow: "0 -2px 20px rgba(15,23,42,0.04), 0 4px 16px rgba(15,23,42,0.06)",
        }}
      >
        {/* Reference upload + prompt */}
        <div className="flex items-start gap-3">
          {/* Upload button (dashed) */}
          <div className="flex gap-2 flex-shrink-0">
            {uploadedRefs.map((src, i) => (
              <div key={i} className="group relative w-10 h-10 rounded-lg overflow-visible" style={{ border: "1px solid rgba(15,23,42,0.1)" }}>
                <img src={src} alt={`ref-${i}`} className="w-full h-full rounded-lg object-cover" />
                <button
                  onClick={() => setUploadedRefs(prev => prev.filter((_, idx) => idx !== i))}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#0f172a]/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              ref={refTriggerRef}
              onClick={() => setShowRefModal(prev => !prev)}
              className="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#f8fafc] transition-colors"
              style={{ border: "1.5px dashed rgba(15,23,42,0.2)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
                <line x1="17" y1="3" x2="17" y2="9" />
                <line x1="14" y1="6" x2="20" y2="6" />
              </svg>
            </button>
          </div>
          {/* Editable prompt area */}
          <div className="relative flex-1">
            <div
              ref={promptRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handlePromptInput}
              onKeyDown={(e) => {
                if (e.key === "Escape") setShowAtMenu(false);
              }}
              className="text-[13px] leading-relaxed text-[#0f172a] min-h-[40px] max-h-[80px] overflow-y-auto focus:outline-none"
            />
            {/* @ mention dropdown */}
            {showAtMenu && uploadedRefs.length > 0 && (
              <div
                className="fixed z-[300] rounded-xl py-1 min-w-[200px]"
                style={{
                  top: `${atMenuPos.top}px`,
                  left: `${atMenuPos.left}px`,
                  transform: "translateY(-100%)",
                  background: "#ffffff",
                  border: "1px solid rgba(15,23,42,0.08)",
                  boxShadow: "0 8px 24px rgba(15,23,42,0.12), 0 2px 6px rgba(15,23,42,0.06)",
                }}
              >
                {uploadedRefs.map((src, i) => (
                  <button
                    key={i}
                    onMouseDown={(e) => { e.preventDefault(); insertImageMention(i); }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-[#f8fafc] transition-colors cursor-pointer"
                  >
                    <img src={src} alt={`Image ${i + 1}`} className="w-8 h-8 rounded-lg object-cover" style={{ border: "1px solid rgba(15,23,42,0.08)" }} />
                    <span className="text-[14px] font-medium text-[#0f172a]">Image {i + 1}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Bottom toolbar */}
        <div className="flex items-center gap-3">
          <div className="relative" ref={activePopover === "model" ? popoverRef : undefined}>
            <ToolbarChip icon="model" onClick={() => togglePopover("model")}>
              {aiModels.find(m => m.id === selectedModel)?.name || "Wanxiang 2.7"}
            </ToolbarChip>
            {activePopover === "model" && (
              <div
                className="absolute bottom-full left-0 mb-2 w-[420px] max-h-[400px] overflow-y-auto rounded-2xl py-2 z-50"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(15,23,42,0.08)",
                  boxShadow: "0 8px 32px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.06)",
                }}
              >
                {aiModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => { setSelectedModel(model.id); setActivePopover(null); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer transition-colors ${
                      selectedModel === model.id
                        ? "bg-[#f1f5f9]"
                        : "hover:bg-[#f8fafc]"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold text-[#0f172a]">{model.name}</span>
                        {model.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold text-white" style={{ background: "linear-gradient(135deg, #6366f1, #0ea5e9)" }}>{model.badge}</span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#64748b] mt-0.5 truncate">{model.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="flex items-center gap-0.5 text-[11px] text-[#10b981]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" /></svg>
                        {model.refCount}
                      </span>
                      {selectedModel === model.id && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Settings popover */}
          <div className="relative" ref={activePopover === "settings" ? popoverRef : undefined}>
            <ToolbarChip icon="settings" onClick={() => togglePopover("settings")}>
              {selectedRes} · {selectedRatio}
            </ToolbarChip>
            {activePopover === "settings" && (
              <div
                className="absolute bottom-full left-0 mb-2 w-[380px] rounded-2xl p-5 z-50"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(15,23,42,0.08)",
                  boxShadow: "0 8px 32px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.06)",
                }}
              >
                <h4 className="text-[14px] font-semibold text-[#0f172a] mb-3">Resolution</h4>
                <div className="flex gap-2 mb-5">
                  {resolutions.map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRes(r)}
                      className={`flex-1 py-2.5 rounded-xl text-[13px] font-medium transition-all cursor-pointer ${
                        selectedRes === r
                          ? "text-[#0f172a] bg-[#f1f5f9]"
                          : "text-[#64748b] hover:bg-[#f8fafc]"
                      }`}
                      style={{ border: selectedRes === r ? "1px solid rgba(15,23,42,0.12)" : "1px solid rgba(15,23,42,0.06)" }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <h4 className="text-[14px] font-semibold text-[#0f172a] mb-3">Ratio</h4>
                <div className="grid grid-cols-4 gap-2">
                  {ratios.map((r) => (
                    <button
                      key={r.label}
                      onClick={() => setSelectedRatio(r.label)}
                      className={`flex flex-col items-center gap-1.5 py-3 rounded-xl text-[12px] font-medium transition-all cursor-pointer ${
                        selectedRatio === r.label
                          ? "text-[#0f172a] bg-[#f1f5f9]"
                          : "text-[#64748b] hover:bg-[#f8fafc]"
                      }`}
                      style={{ border: selectedRatio === r.label ? "1px solid rgba(15,23,42,0.12)" : "1px solid rgba(15,23,42,0.06)" }}
                    >
                      <RatioIcon ratio={r.label} />
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Generate count popover */}
          <div className="relative" ref={activePopover === "generate" ? popoverRef : undefined}>
            <ToolbarChip icon="generate" onClick={() => togglePopover("generate")}>
              Generate {selectedCount} images
            </ToolbarChip>
            {activePopover === "generate" && (
              <div
                className="absolute bottom-full left-0 mb-2 w-[180px] rounded-2xl py-2 z-50"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(15,23,42,0.08)",
                  boxShadow: "0 8px 32px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.06)",
                }}
              >
                {imageCounts.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setSelectedCount(c); setActivePopover(null); }}
                    className={`w-full text-left px-5 py-3 text-[14px] transition-colors cursor-pointer ${
                      selectedCount === c
                        ? "font-semibold text-[#0f172a] bg-[#f8fafc]"
                        : "text-[#0f172a] hover:bg-[#f8fafc]"
                    }`}
                  >
                    {c} images
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Presets popover */}
          <div className="relative" ref={activePopover === "presets" ? popoverRef : undefined}>
            <ToolbarChip icon="presets" onClick={() => togglePopover("presets")}>
              Presets
            </ToolbarChip>
            {activePopover === "presets" && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[780px] max-h-[520px] rounded-2xl z-50 flex flex-col"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(15,23,42,0.08)",
                  boxShadow: "0 8px 32px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.06)",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-4 pb-0 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                    </svg>
                    <span className="text-[15px] font-semibold text-[#0f172a]">Preset Templates</span>
                  </div>
                  <button
                    onClick={() => setActivePopover(null)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                {/* Filter dropdowns */}
                <div className="flex gap-2 px-5 py-3 flex-shrink-0">
                  <select value={presetStyleFilter} onChange={e => setPresetStyleFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#0f172a] bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0a84ff]/20"
                    style={{ border: "1px solid rgba(15,23,42,0.1)" }}>
                    {presetStyles.map(s => <option key={s} value={s}>{s === "All" ? "All Styles" : s}</option>)}
                  </select>
                  <select value={presetSeasonFilter} onChange={e => setPresetSeasonFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#0f172a] bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0a84ff]/20"
                    style={{ border: "1px solid rgba(15,23,42,0.1)" }}>
                    {presetSeasons.map(s => <option key={s} value={s}>{s === "All" ? "All Seasons" : s}</option>)}
                  </select>
                  <select value={presetBloggerFilter} onChange={e => setPresetBloggerFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#0f172a] bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0a84ff]/20"
                    style={{ border: "1px solid rgba(15,23,42,0.1)" }}>
                    {presetBloggers.map(s => <option key={s} value={s}>{s === "All" ? "All Types" : s}</option>)}
                  </select>
                </div>
                {/* Template cards grid */}
                <div className="flex-1 overflow-y-auto px-5 pb-5">
                  <div className="grid grid-cols-3 gap-4">
                    {presetTemplates
                      .filter(t => (presetStyleFilter === "All" || t.style === presetStyleFilter)
                        && (presetSeasonFilter === "All" || t.season === presetSeasonFilter)
                        && (presetBloggerFilter === "All" || t.blogger === presetBloggerFilter))
                      .map(t => (
                        <div key={t.id} className="rounded-xl overflow-hidden group cursor-pointer transition-all hover:shadow-lg"
                          style={{ background: "#ffffff", border: "1px solid rgba(15,23,42,0.06)" }}
                          onClick={() => setExpandedPreset(expandedPreset === t.id ? null : t.id)}>
                          {/* Cover image */}
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <img src={t.cover} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            {/* Tags */}
                            <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/90" style={{ background: "rgba(99,102,241,0.7)", backdropFilter: "blur(4px)" }}>{t.style}</span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/90" style={{ background: "rgba(14,165,233,0.7)", backdropFilter: "blur(4px)" }}>{t.season}</span>
                            </div>
                            {/* Name overlay */}
                            <div className="absolute bottom-2 left-3 right-3">
                              <h4 className="text-[13px] font-bold text-white leading-tight">{t.name}</h4>
                              <p className="text-[10px] text-white/70 mt-0.5">{t.blogger} Style</p>
                            </div>
                          </div>
                          {/* Expanded detail */}
                          {expandedPreset === t.id && (
                            <div className="px-3 py-3" style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}>
                              {/* Ref images */}
                              <div className="mb-2">
                                <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider">Style References</span>
                                <div className="flex gap-1.5 mt-1">
                                  {t.refImages.map((src, i) => (
                                    <div key={i} className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                                      onMouseEnter={(e) => showPreview(src, e)} onMouseLeave={hidePreview}>
                                      <img src={src} alt="" className="w-full h-full object-cover" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {/* Default products */}
                              <div className="mb-2">
                                <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider">Default Products</span>
                                <div className="flex gap-1.5 mt-1">
                                  {t.defaultProducts.map((p, i) => (
                                    <div key={i} className="flex flex-col items-center gap-0.5">
                                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-dashed"
                                        style={{ borderColor: "rgba(15,23,42,0.15)" }}
                                        onMouseEnter={(e) => showPreview(p.src, e)} onMouseLeave={hidePreview}>
                                        <img src={p.src} alt={p.label} className="w-full h-full object-cover" />
                                      </div>
                                      <span className="text-[9px] text-[#94a3b8] leading-tight text-center">{p.label}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {/* Prompt preview */}
                              <div className="mb-3">
                                <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider">Prompt</span>
                                <p className="text-[11px] text-[#475569] mt-1 leading-relaxed line-clamp-3">{t.prompt.replace("{ref}", "[Style Ref]").replace("{product}", "[Products]")}</p>
                              </div>
                              {/* Action buttons */}
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => { e.stopPropagation(); applyPresetTemplate(t); }}
                                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold text-white cursor-pointer hover:opacity-90 transition-opacity"
                                  style={{ background: "linear-gradient(135deg, #6366f1, #0ea5e9)" }}>
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                  Use Template
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                  {presetTemplates.filter(t => (presetStyleFilter === "All" || t.style === presetStyleFilter)
                    && (presetSeasonFilter === "All" || t.season === presetSeasonFilter)
                    && (presetBloggerFilter === "All" || t.blogger === presetBloggerFilter)).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-[#94a3b8]">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      <span className="text-[13px] mt-2">No templates match your filters</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex-1" />
          <span className="text-[12px] text-[#94a3b8]">428/2000</span>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-white cursor-pointer hover:opacity-90 transition-opacity"
            style={{
              background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
              boxShadow: "0 2px 8px rgba(15,23,42,0.2)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L9 9l-7 1 5 5-1.5 7L12 18.5 18.5 22 17 15l5-5-7-1z" />
            </svg>
            1
          </button>
        </div>

        {/* Reference image selection modal */}
        {showRefModal && modalPos && (
            <div
              ref={refModalRef}
              className="fixed z-[200]"
              style={{
                bottom: `${modalPos.bottom}px`,
                left: `${modalPos.left}px`,
                width: `${modalPos.width}px`,
              }}
            >
              <div
                className="w-full max-w-[960px] h-[460px] rounded-2xl flex flex-col overflow-hidden"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(15,23,42,0.08)",
              boxShadow: "0 8px 40px rgba(15,23,42,0.14), 0 2px 8px rgba(15,23,42,0.06)",
            }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-3 flex-shrink-0" style={{ borderBottom: "1px solid rgba(15,23,42,0.06)" }}>
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span className="text-[15px] font-semibold text-[#0f172a]">Select Reference</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[13px] text-[#94a3b8]">{uploadedRefs.length}/10</span>
                <button
                  onClick={() => setShowRefModal(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Modal body */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left: Upload zone */}
              <div className="w-[160px] min-w-[160px] flex flex-col items-center p-3" style={{ borderRight: "1px solid rgba(15,23,42,0.06)", background: "#fafbfc" }}>
                <div
                  className="w-full flex-1 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#f1f5f9] transition-colors"
                  style={{ border: "2px dashed rgba(15,23,42,0.15)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="text-[12px] text-[#64748b] font-medium">Upload Local</span>
                </div>
              </div>
              {/* Right: Tabs + content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Tabs */}
                <div className="flex items-center gap-1 px-4 py-2.5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(15,23,42,0.06)" }}>
                  {[
                    { id: "upload", icon: "upload", label: "Upload Assets" },
                    { id: "product", icon: "product", label: "Products" },
                    { id: "style", icon: "sparkle", label: "Trending Style" },
                    { id: "model", icon: "model", label: "Creators" },
                    { id: "digitalModel", icon: "digitalModel", label: "Models" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setRefModalTab(tab.id)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                        refModalTab === tab.id
                          ? "text-[#0f172a] bg-[#f1f5f9] font-semibold"
                          : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc]"
                      }`}
                    >
                      <RefTabIcon name={tab.icon} />
                      {tab.label}
                    </button>
                  ))}
                </div>
                {/* Tab content */}
                <div className="flex-1 overflow-y-auto p-4">
                  {refModalTab === "upload" && (
                    <div className="flex-1 flex items-center justify-center h-full">
                      <div className="text-center">
                        <svg className="mx-auto mb-3" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1">
                          <rect x="3" y="3" width="18" height="18" rx="3" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <p className="text-[14px] text-[#94a3b8]">No images in asset library</p>
                      </div>
                    </div>
                  )}
                  {refModalTab === "style" && (
                    <div className="flex flex-col gap-3">
                      {/* Style category tags */}
                      <div className="flex gap-2 flex-wrap">
                        {styleCategories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setStyleFilterCat(cat)}
                            className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                              styleFilterCat === cat
                                ? "text-[#0f172a] bg-[#0f172a]/8 font-semibold"
                                : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
                            }`}
                            style={{ border: styleFilterCat === cat ? "1px solid rgba(15,23,42,0.12)" : "1px solid rgba(15,23,42,0.06)" }}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                      {/* Style images grouped by category */}
                      {Object.entries(styleRefImages)
                        .filter(([key]) => styleFilterCat === "All" || key === styleFilterCat)
                        .map(([category, items]) => (
                          <div key={category}>
                            <h5 className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">{category}</h5>
                            <div className="grid grid-cols-5 gap-3">
                              {items.map((item) => (
                                <button
                                  key={item.name}
                                  onClick={() => {
                                    if (uploadedRefs.length < 10 && !uploadedRefs.includes(item.src)) {
                                      setUploadedRefs([...uploadedRefs, item.src]);
                                    }
                                  }}
                                  onMouseEnter={(e) => showPreview(item.src, e)}
                                  onMouseLeave={hidePreview}
                                  className={`group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all ${
                                    uploadedRefs.includes(item.src) ? "ring-2 ring-[#0a84ff]" : "hover:ring-2 hover:ring-[#0a84ff]/30"
                                  }`}
                                >
                                  <img src={item.src} alt={item.name} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                  <span className="absolute bottom-2 left-2 right-2 text-[10px] font-semibold text-white leading-tight">{item.name}</span>
                                  {uploadedRefs.includes(item.src) && (
                                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#0a84ff] flex items-center justify-center">
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                  {refModalTab === "product" && (
                    <div className="flex flex-col gap-3">
                      {/* Style & Category dropdowns */}
                      <div className="flex gap-3">
                        <div className="relative">
                          <select
                            value={productStyleFilter}
                            onChange={(e) => setProductStyleFilter(e.target.value)}
                            className="appearance-none pl-3 pr-7 py-1.5 rounded-lg text-[12px] font-medium text-[#0f172a] bg-[#f4f6f9] border border-[#e2e8f0] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#0a84ff]"
                          >
                            {styleCategories.map((s) => (
                              <option key={s} value={s}>{s === "All" ? "All Styles" : s}</option>
                            ))}
                          </select>
                          <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                        </div>
                        <div className="relative">
                          <select
                            value={productCatFilter}
                            onChange={(e) => setProductCatFilter(e.target.value)}
                            className="appearance-none pl-3 pr-7 py-1.5 rounded-lg text-[12px] font-medium text-[#0f172a] bg-[#f4f6f9] border border-[#e2e8f0] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#0a84ff]"
                          >
                            {allProductCategories.map((c) => (
                              <option key={c} value={c}>{c === "All" ? "All Categories" : c.replace(/([a-z])([A-Z])/g, "$1 $2")}</option>
                            ))}
                          </select>
                          <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                        </div>
                        <button
                          onClick={() => {
                            const results: Record<string, { slot: string; item: { name: string; src: string; category: string } }[]> = {};
                            for (const [style, items] of Object.entries(productRefImages)) {
                              if (productStyleFilter !== "All" && style !== productStyleFilter) continue;
                              results[style] = generateAiCombo(items);
                            }
                            setAiComboResults(results);
                          }}
                          className="relative px-4 py-1.5 rounded-lg text-[12px] font-semibold text-white cursor-pointer overflow-hidden"
                          style={{ background: "linear-gradient(135deg, #6366f1, #0ea5e9, #a855f7, #ec4899)" }}
                        >
                          <span className="absolute inset-0 rounded-lg opacity-60" style={{ background: "linear-gradient(270deg, #6366f1, #0ea5e9, #a855f7, #ec4899, #6366f1)", backgroundSize: "300% 100%", animation: "gradientFlow 3s linear infinite" }} />
                          <span className="relative flex items-center gap-1.5">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" /></svg>
                            AI-Enabled
                          </span>
                        </button>
                        {aiComboResults && (
                          <button
                            onClick={() => setAiComboResults(null)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#64748b] bg-white border border-[#e2e8f0] cursor-pointer hover:bg-[#f8fafc] hover:text-[#0f172a] transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                            Clear AI
                          </button>
                        )}
                      </div>

                      {/* AI Combo results */}
                      {aiComboResults && (
                        <div className="flex flex-col gap-3">
                          {Object.entries(aiComboResults).map(([style, combo]) => (
                            <div key={style} className="bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] rounded-xl p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="text-[12px] font-semibold text-[#0f172a] uppercase tracking-wider">{style} — AI Combo</h5>
                                <button
                                  onClick={() => {
                                    const comboSrcs = combo.map(c => c.item.src);
                                    const newRefs = [...new Set([...uploadedRefs, ...comboSrcs])].slice(0, 5);
                                    setUploadedRefs(newRefs);
                                    const makeChip = (src: string, label: string) =>
                                      `<span contenteditable="false" class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[12px] font-medium align-middle mx-0.5" style="background:#f1f5f9;border:1px solid rgba(15,23,42,0.08);cursor:default;vertical-align:middle;"><img src="${src}" style="width:20px;height:20px;border-radius:4px;object-fit:cover;display:inline-block;" /> ${label}</span>`;
                                    const parts = newRefs.map((s, i) => makeChip(s, `Image ${i + 1}`)).join(" + ");
                                    const html = `Complete outfit look with ${parts} — styled in ${style} aesthetic. Preserve every product detail exactly.`;
                                    if (promptRef.current) { promptRef.current.innerHTML = html; }
                                    setShowRefModal(false);
                                  }}
                                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white cursor-pointer transition-colors"
                                  style={{ background: "linear-gradient(135deg, #6366f1, #0ea5e9)" }}
                                >
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                  Apply All
                                </button>
                              </div>
                              <div className="flex gap-2">
                                {combo.map(({ slot, item }) => (
                                  <div
                                    key={slot}
                                    className="flex flex-col items-center gap-1"
                                    onMouseEnter={(e) => showPreview(item.src, e)}
                                    onMouseLeave={hidePreview}
                                  >
                                    <div className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 ${
                                      uploadedRefs.includes(item.src) ? "border-[#0a84ff]" : "border-transparent"
                                    }`}>
                                      <img src={item.src} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-[9px] font-medium text-[#64748b] text-center leading-tight">{slot}</span>
                                  </div>
                                ))}
                              </div>
                              {/* Dismiss / Retry buttons at bottom */}
                              <div className="flex items-center justify-end gap-2 mt-2 pt-2" style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}>
                                <button
                                  onClick={() => {
                                    setAiComboResults(prev => {
                                      if (!prev) return prev;
                                      const next = { ...prev };
                                      delete next[style];
                                      return Object.keys(next).length === 0 ? null : next;
                                    });
                                  }}
                                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium text-[#64748b] bg-white border border-[#e2e8f0] cursor-pointer hover:bg-[#f8fafc] hover:text-[#0f172a] transition-colors"
                                >
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                  Dismiss
                                </button>
                                <button
                                  onClick={() => {
                                    const items = productRefImages[style] || [];
                                    setAiComboResults(prev => ({
                                      ...prev,
                                      [style]: generateAiCombo(items),
                                    }));
                                  }}
                                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium text-[#0f172a] bg-white border border-[#e2e8f0] cursor-pointer hover:bg-[#f8fafc] transition-colors"
                                >
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 4v6h6M23 20v-6h-6" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" /></svg>
                                  Retry
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Product images: single style selected → group by category; otherwise group by style */}
                      {(() => {
                        const renderItem = (item: { name: string; src: string; category: string }) => (
                          <button
                            key={item.src}
                            onClick={() => {
                              if (uploadedRefs.length < 10 && !uploadedRefs.includes(item.src)) {
                                setUploadedRefs([...uploadedRefs, item.src]);
                              }
                            }}
                            onMouseEnter={(e) => showPreview(item.src, e)}
                            onMouseLeave={hidePreview}
                            className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all ${
                              uploadedRefs.includes(item.src) ? "ring-2 ring-[#0a84ff]" : "hover:ring-2 hover:ring-[#0a84ff]/30"
                            }`}
                          >
                            <img src={item.src} alt={item.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="absolute bottom-1 left-1 right-1 text-[9px] font-semibold text-white leading-tight opacity-0 group-hover:opacity-100 transition-opacity">{item.name}</span>
                            {uploadedRefs.includes(item.src) && (
                              <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#0a84ff] flex items-center justify-center">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                              </div>
                            )}
                          </button>
                        );

                        if (productStyleFilter !== "All") {
                          // Single style → group by category
                          const items = productRefImages[productStyleFilter] || [];
                          const filtered = productCatFilter === "All" ? items : items.filter(i => i.category === productCatFilter);
                          const grouped = filtered.reduce<Record<string, typeof items>>((acc, item) => {
                            (acc[item.category] = acc[item.category] || []).push(item);
                            return acc;
                          }, {});
                          return Object.entries(grouped).map(([cat, catItems]) => (
                            <div key={cat}>
                              <h5 className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">{cat.replace(/([a-z])([A-Z])/g, "$1 $2")}</h5>
                              <div className="grid grid-cols-7 gap-2">
                                {catItems.map(renderItem)}
                              </div>
                            </div>
                          ));
                        }

                        // All styles → group by style
                        return Object.entries(productRefImages).map(([style, items]) => {
                          const filtered = productCatFilter === "All" ? items : items.filter(i => i.category === productCatFilter);
                          if (filtered.length === 0) return null;
                          return (
                            <div key={style}>
                              <h5 className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">{style}</h5>
                              <div className="grid grid-cols-7 gap-2">
                                {filtered.map(renderItem)}
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  )}
                  {refModalTab === "model" && (
                    <div className="flex flex-col gap-3">
                      {/* Model category tags */}
                      <div className="flex gap-2 flex-wrap">
                        {modelCategories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setModelFilterCat(cat)}
                            className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                              modelFilterCat === cat
                                ? "text-[#0f172a] bg-[#0f172a]/8 font-semibold"
                                : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
                            }`}
                            style={{ border: modelFilterCat === cat ? "1px solid rgba(15,23,42,0.12)" : "1px solid rgba(15,23,42,0.06)" }}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                      {/* Model images grouped by name */}
                      {Object.entries(modelRefImages)
                        .filter(([key]) => modelFilterCat === "All" || key === modelFilterCat)
                        .map(([modelName, items]) => (
                          <div key={modelName}>
                            <h5 className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">{modelName}</h5>
                            <div className="grid grid-cols-6 gap-2">
                              {items.map((item) => (
                                <button
                                  key={item.src}
                                  onClick={() => {
                                    if (uploadedRefs.length < 10 && !uploadedRefs.includes(item.src)) {
                                      setUploadedRefs([...uploadedRefs, item.src]);
                                    }
                                  }}
                                  onMouseEnter={(e) => showPreview(item.src, e)}
                                  onMouseLeave={hidePreview}
                                  className={`group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all ${
                                    uploadedRefs.includes(item.src) ? "ring-2 ring-[#0a84ff]" : "hover:ring-2 hover:ring-[#0a84ff]/30"
                                  }`}
                                >
                                  <img src={item.src} alt={item.name} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                  <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-semibold text-white leading-tight opacity-0 group-hover:opacity-100 transition-opacity">{item.name}</span>
                                  {uploadedRefs.includes(item.src) && (
                                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#0a84ff] flex items-center justify-center">
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                  {refModalTab === "digitalModel" && (
                    <div className="flex flex-col gap-3">
                      {/* Digital model category tags */}
                      <div className="flex gap-2 flex-wrap">
                        {["All", "Female", "Male"].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setDigitalModelFilter(cat)}
                            className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                              digitalModelFilter === cat
                                ? "text-[#0f172a] bg-[#0f172a]/8 font-semibold"
                                : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
                            }`}
                            style={{ border: digitalModelFilter === cat ? "1px solid rgba(15,23,42,0.12)" : "1px solid rgba(15,23,42,0.06)" }}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                      {/* Digital model grid */}
                      {Object.entries(digitalModelImages)
                        .filter(([key]) => digitalModelFilter === "All" || key === digitalModelFilter)
                        .map(([group, items]) => (
                          <div key={group}>
                            <h5 className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">{group}</h5>
                            <div className="grid grid-cols-6 gap-2">
                              {items.map((item) => (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    if (uploadedRefs.length < 10 && !uploadedRefs.includes(item.src)) {
                                      setUploadedRefs([...uploadedRefs, item.src]);
                                    }
                                  }}
                                  className={`group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all ${
                                    uploadedRefs.includes(item.src) ? "ring-2 ring-[#0a84ff]" : "hover:ring-2 hover:ring-[#0a84ff]/30"
                                  }`}
                                >
                                  {/* Placeholder: white-bg digital model */}
                                  <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: "#f1f5f9" }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.2">
                                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                    </svg>
                                    <span className="text-[9px] text-[#94a3b8] mt-1 font-medium">{item.name}</span>
                                  </div>
                                  {uploadedRefs.includes(item.src) && (
                                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#0a84ff] flex items-center justify-center">
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Hover image preview */}
      {hoverPreview && (
        <div
          className="pointer-events-none fixed z-[9999]"
          style={{
            left: hoverPreview.x,
            top: hoverPreview.y,
            transform: 'translate(-50%, -100%) translateY(-12px)',
          }}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              width: 220,
              height: 220,
              background: '#ffffff',
              border: '1px solid rgba(15,23,42,0.08)',
              boxShadow: '0 12px 40px rgba(15,23,42,0.18), 0 4px 12px rgba(15,23,42,0.08)',
            }}
          >
            <img src={hoverPreview.src} alt="preview" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </div>
  );
}

/* Helper components */
function MetaTag({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-[#0f172a]"
      style={{ background: "#f8fafc", border: "1px solid rgba(15,23,42,0.06)" }}
    >
      <MetaIcon name={icon} />
      {children}
    </span>
  );
}

function ToolbarChip({ icon, children, onClick }: { icon: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#0f172a] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
      style={{ border: "1px solid rgba(15,23,42,0.08)" }}
    >
      <ToolbarIcon name={icon} />
      {children}
    </button>
  );
}

function MetaIcon({ name }: { name: string }) {
  const props = { width: 12, height: 12, viewBox: "0 0 24 24", fill: "none", stroke: "#64748b", strokeWidth: 2 };
  switch (name) {
    case "clock": return <svg {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
    case "settings": return <svg {...props}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
    case "ratio": return <svg {...props}><rect x="2" y="3" width="20" height="18" rx="2" /><line x1="2" y1="9" x2="22" y2="9" /></svg>;
    case "resolution": return <svg {...props}><rect x="2" y="2" width="20" height="20" rx="2" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /></svg>;
    case "images": return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>;
    default: return null;
  }
}

function ToolbarIcon({ name }: { name: string }) {
  const props = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 };
  switch (name) {
    case "model": return <svg {...props}><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.36 7.64l1.42-1.42" /></svg>;
    case "settings": return <svg {...props}><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /></svg>;
    case "generate": return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /></svg>;
    case "presets": return <svg {...props}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>;
    default: return null;
  }
}

function RatioIcon({ ratio }: { ratio: string }) {
  const s = 24;
  const stroke = "currentColor";
  const sw = 1.8;
  const base = { width: 20, height: 20, viewBox: `0 0 ${s} ${s}`, fill: "none", stroke, strokeWidth: sw };
  switch (ratio) {
    case "Auto":
      return <svg {...base}><path d="M12 2L9 9l-7 1 5 5-1.5 7L12 18.5 18.5 22 17 15l5-5-7-1z" /><circle cx="12" cy="12" r="1" /></svg>;
    case "1:1":
      return <svg {...base}><rect x="4" y="4" width="16" height="16" rx="2" /></svg>;
    case "3:4":
      return <svg {...base}><rect x="5" y="3" width="14" height="18" rx="2" /></svg>;
    case "4:3":
      return <svg {...base}><rect x="3" y="5" width="18" height="14" rx="2" /></svg>;
    case "9:16":
      return <svg {...base}><rect x="7" y="2" width="10" height="20" rx="2" /></svg>;
    case "16:9":
      return <svg {...base}><rect x="2" y="7" width="20" height="10" rx="2" /></svg>;
    case "21:9":
      return <svg {...base}><rect x="1" y="8" width="22" height="8" rx="2" /></svg>;
    default:
      return null;
  }
}

function RefTabIcon({ name }: { name: string }) {
  const props = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 };
  switch (name) {
    case "upload": return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>;
    case "sparkle": return <svg {...props}><path d="M12 2L9 9l-7 1 5 5-1.5 7L12 18.5 18.5 22 17 15l5-5-7-1z" /></svg>;
    case "product": return <svg {...props}><rect x="2" y="7" width="20" height="15" rx="2" /><polyline points="16 7 12 2 8 7" /></svg>;
    case "model": return <svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    case "digitalModel": return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M16 16v-2a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v2" /><circle cx="12" cy="7.5" r="2.5" /></svg>;
    default: return null;
  }
}
