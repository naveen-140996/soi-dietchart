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
    const res = await API.get("/admin/content");

    const data = res.data.filter(
      (item: any) => item.type === "reel"
    );

    setReels(data);
  };

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-6">

        <h1 className="text-2xl font-bold text-green-600 mb-6">
          Instagram Reels
        </h1>

        {/* MOBILE SCROLL */}
        <div className="flex md:hidden gap-4 overflow-x-auto">
          {reels.map((reel, i) => (
            <a
              key={i}
              href={reel.url}
              target="_blank"
              className="min-w-[260px] rounded-xl overflow-hidden shadow bg-white"
            >
              <div className="relative">

                <img
                  src={reel.thumbnail}
                  className="w-full h-[360px] object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/70 text-white px-4 py-2 rounded-full">
                    ▶
                  </div>
                </div>

              </div>
            </a>
          ))}
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {reels.map((reel, i) => (
            <a
              key={i}
              href={reel.url}
              target="_blank"
              className="rounded-xl overflow-hidden shadow bg-white"
            >
              <div className="relative">

                <img
                  src={reel.thumbnail}
                  className="w-full h-[400px] object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/70 text-white px-4 py-2 rounded-full">
                    ▶
                  </div>
                </div>

              </div>
            </a>
          ))}
        </div>

      </div>
    </>
  );
}