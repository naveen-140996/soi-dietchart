"use client";
import Header from "../components/Header";

const reels = [
  {
    id: 1,
    title: "Feel Fresh Tea",
    url: "https://www.instagram.com/reel/DJwYpzWTftO/embed",
  },
  {
    id: 2,
    title: "Asvara Preparation",
    url: "https://www.instagram.com/reel/DMKUc1sR0nh/embed",
  },
  {
    id: 3,
    title: "More Video",
    url: "https://www.instagram.com/reel/DJwYpzWTftO/embed",
  },
];

export default function ReelsPage() {
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

          {reels.map((reel) => (
            <div
              key={reel.id}
              className="min-w-[250px] md:min-w-[300px] bg-white rounded-xl shadow p-3 flex-shrink-0"
            >
              <h2 className="font-semibold mb-2">{reel.title}</h2>

              <div className="aspect-[9/16] w-full overflow-hidden rounded-lg">
                <iframe
                  src={reel.url}
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