"use client";
import Header from "../components/Header";

const videos = [
  {
    id: 1,
    title: "Weight Loss Mix Preparation",
    url: "https://www.youtube.com/embed/QPlAdDCRmfw",
  },
  {
    id: 2,
    title: "Diet Guide Overview",
    url: "https://www.youtube.com/embed/QPlAdDCRmfw",
  },
];

export default function YoutubePage() {
  return (
    <>
    <Header />
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-6">
        YouTube Videos
      </h1>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow p-3"
          >
            <h2 className="font-semibold mb-2">{video.title}</h2>

            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src={video.url}
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