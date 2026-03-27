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

      // 🔥 FILTER REELS ONLY
      const reelData = res.data.filter(
        (item: any) => item.type?.toLowerCase() === "reel"
      );

      setReels(reelData);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 ensure embed format
  const getEmbedUrl = (url: string) => {
    if (url.includes("/reel/") && !url.includes("/embed")) {
      return `${url}/embed`;
    }
    return url;
  };

  return (
    <div className="overflow-hidden">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-green-600 mb-6">
          Instagram Reels
        </h1>

        {/* Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">

          {reels.map((reel, index) => (
            <div
              key={index}
              className="min-w-[250px] md:min-w-[300px] bg-white rounded-xl shadow p-3 flex-shrink-0"
            >
              <h2 className="font-semibold mb-2">
                Reel {index + 1}
              </h2>

              <div className="aspect-[9/16] w-full overflow-hidden rounded-lg">
                <iframe
                  src={getEmbedUrl(reel.url)}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                />
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}