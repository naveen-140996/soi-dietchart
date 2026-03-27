"use client";

import { useEffect, useState } from "react";
import API from "../utils/api";
import Header from "../components/Header";

export default function ReelsPage() {
  const [reels, setReels] = useState<any[]>([]);

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      const res = await API.get("/admin/content");

      // 🔥 FILTER ONLY REELS
      const reelData = res.data.filter(
        (item: any) => item.type === "reel"
      );

      setReels(reelData);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 FIX INSTAGRAM EMBED URL
  const getEmbedUrl = (url: string) => {
    if (url.includes("/reel/") && !url.includes("/embed")) {
      return `${url}/embed`;
    }
    return url;
  };

  return (
    <div className="overflow-x-hidden">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold text-green-600 mb-6">
          Instagram Reels
        </h1>

        {/* 🔥 MOBILE: HORIZONTAL SCROLL */}
        <div className="flex md:hidden gap-4 overflow-x-auto pb-3">
          {reels.map((reel, i) => (
            <div
              key={i}
              className="min-w-[260px] bg-white rounded-xl shadow p-3 shrink-0"
            >
              <h2 className="font-semibold mb-2">
                Reel {i + 1}
              </h2>

             <div className="aspect-[9/16] flex items-center justify-center bg-gray-100 rounded-lg">
                <a
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-4 py-2 rounded-lg"
                >
                  ▶ Watch Reel
                </a>

              </div>
            </div>
          ))}
        </div>

        {/* 🔥 DESKTOP: GRID */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reels.map((reel, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-3"
            >
              <h2 className="font-semibold mb-2">
                Reel {i + 1}
              </h2>

              <div className="aspect-[9/16] w-full rounded-lg overflow-hidden">
                <iframe
                  src={getEmbedUrl(reel.url)}
                  className="w-full h-full"
                  allow="autoplay; clipboard-write; encrypted-media"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}