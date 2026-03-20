"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import heroImg from "../../public/sowmi.webp";
import before from "../../public/images/Before-sowmi.webp";
import before2 from "../../public/images/before-2.webp";
import before3 from "../../public/images/before-3.webp";
import before4 from "../../public/images/before-4.webp";
import after from "../../public/sowmi.webp";
import after2 from "../../public/images/after-2.webp";
import product1 from "../../public/images/Slimy-Weight-Loss-Mix.webp";
import product2 from "../../public/images/Feel-Fresh-Tea-Front.webp";
import product3 from "../../public/images/asvara-backend.webp";
import product4 from "../../public/images/SOI1FRONTFINAL.webp";
import product5 from "../../public/images/diet-chapati-front.webp";
import product6 from "../../public/images/SOI2FRONTFINAL.webp";
import product7 from "../../public/images/protien-beans.webp";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface DayEntry {
  day: number;
  morning: string;
  lunch: string;
  dinner: string;
  weight: string;
}

const products = [
  {
    id: 1,
    name: "Weight Loss Mix",
    price: 499,
    image: product1,
    link: "https://soiorganic.com/products/slimy-weight-loss-mix",
  },
  {
    id: 2,
    name: "Feel Fresh Tea",
    price: 299,
    image: product2,
    link: "https://soiorganic.com/products/soi-organic-feel-fresh-tea",
  },
  {
    id: 3,
    name: "Asvara Mix",
    price: 599,
    image: product3,
    link: "https://soiorganic.com/products/soi-organic-crushed-seeds-nuts",
  },
  {
    id: 4,
    name: "Seeds and nuts",
    price: 499,
    image: product4,
    link: "https://soiorganic.com/products/slimy-weight-loss-mix",
  },
  {
    id: 5,
    name: "Chappati mix",
    price: 299,
    image: product5,
    link: "https://soiorganic.com/products/soi-organic-feel-fresh-tea",
  },
  {
    id: 6,
    name: "Moringa powder",
    price: 599,
    image: product6,
    link: "https://soiorganic.com/products/soi-organic-crushed-seeds-nuts",
  },
  {
    id: 7,
    name: "Protien beans",
    price: 599,
    image: product7,
    link: "https://soiorganic.com/products/soi-organic-crushed-seeds-nuts",
  },
];

export default function Dashboard() {

  return (
    <div className="overflow-hidden">
      <Header />
      {/* ================= HERO SECTION ================= */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
        {/* LEFT */}
        <div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800">
            Start your weight loss journey Naturally & Safely with 
            <span className="text-green-600 ml-2"> Sowmiya</span>
          </h1>

          <p className="mt-4 text-gray-600">
            Join thousands of happy customers who reduced weight using our
            natural diet system.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              href="/start-your-journey"
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700"
            >
              Start Your Journey
            </Link>

            <Link
              href="/reels"
              className="border border-green-600 text-green-600 px-6 py-3 rounded-lg"
            >
              Watch Reels
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div>
          <Image
            src={heroImg}
            alt="Weight loss"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>
      {/* ================= ABOUT / TRANSFORMATION ================= */}
      <section className="bg-white py-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          {/* SLIDER FIX */}
          <div className="w-full overflow-hidden">
            <Swiper
              modules={[Navigation, Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop
              spaceBetween={20}
              className="w-full"
            >
              {[before, after, before2, before3, before4, after2].map(
                (img, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative w-full h-[350px]">
                      <Image
                        src={img}
                        alt="Transformation"
                        fill
                        className="rounded-xl shadow object-cover"
                      />

                      {/* Label */}
                      <span className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 text-xs rounded">
                        {i % 2 === 0 ? "Before" : "After"}
                      </span>
                    </div>
                  </SwiperSlide>
                ),
              )}
            </Swiper>
          </div>

          {/* CONTENT */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Sowmi’s Weight Loss Journey
            </h2>

            <p className="mt-4 text-gray-600">
              Lost 12kg in 90 days using our natural diet plan without gym or
              harmful supplements.
            </p>

            <ul className="mt-4 space-y-2 text-gray-700">
              <li>✔ No crash dieting</li>
              <li>✔ 100% natural foods</li>
              <li>✔ Sustainable lifestyle</li>
              <li>✔ Visible results in weeks</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS SLIDER ================= */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Our Products
          </h2>

          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 2500 }}
            loop
            spaceBetween={20}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {products.map((item) => (
              <SwiperSlide key={item.id}>
  <div className="bg-white rounded-xl shadow p-4 h-full flex flex-col">

    {/* IMAGE */}
    <div className="w-full h-[200px] flex items-center justify-center">
      <Image
        src={item.image}
        alt={item.name}
        width={200}
        height={200}
        className="object-contain h-full"
      />
    </div>

    {/* CONTENT */}
    <div className="flex flex-col flex-grow mt-3">

      <h3 className="font-semibold text-sm md:text-base line-clamp-2">
        {item.name}
      </h3>

      <p className="text-green-600 font-bold mt-1">
        ₹{item.price}
      </p>

      {/* BUTTON ALWAYS BOTTOM */}
      <div className="mt-auto">
        <Link href={item.link} target="_blank">
          <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  </div>
</SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className="bg-green-600 py-10 text-center text-white rounded-xl mx-4 md:mx-auto max-w-6xl">
  <h2 className="text-2xl md:text-3xl font-bold">
    Start Your Weight Loss Journey Today
  </h2>

  <p className="mt-3">
    Follow our proven system and see real transformation
  </p>

  <Link
    href="/start-your-journey"
    className="inline-block mt-5 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold"
  >
    start your journey
  </Link>
</section>
      
      <Footer />
    </div>
  );
}
