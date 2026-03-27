"use client";

import { useEffect, useState } from "react";
import API from "../utils/api"; // 🔥 normal user API (NOT admin)
import Header from "../components/Header";

export default function YoutubePage() {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await API.get("/admin/content");

      // 🔥 FILTER ONLY YOUTUBE
      const youtubeVideos = res.data.filter(
        (item: any) => item.type === "youtube"
      );

      setVideos(youtubeVideos);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Convert normal URL → embed
const getEmbedUrl = (url: string) => {
  if (url.includes("youtube.com/watch")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes("youtu.be")) {
    const videoId = url.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return url;
};
  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-6">

        <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-6">
          YouTube Videos
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {videos.map((video, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-3"
            >
              <h2 className="font-semibold mb-2">
                Video {i + 1}
              </h2>

              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                  src={getEmbedUrl(video.url)}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}