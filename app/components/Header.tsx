"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../public/soiOrganicLogo.webp";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menu = [
    { name: "Home", path: "/dashboard" },
    { name: "Diet Chart", path: "/diet-chart" },
    { name: "Reels", path: "/reels" },
    { name: "YouTube", path: "/youtube" },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/dashboard" className="flex items-center">
            <Image
              src={logo}
              alt="Soi Organic"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
            {menu.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`transition ${
                  pathname === item.path
                    ? "text-green-600 font-semibold"
                    : "hover:text-green-500"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex item-center">
            <Link href={"https://soiorganic.com/"} target="_blank" className="md:hidden text-[14px]"><button className="border bg-green-600 bg p-[5px] font-medium text-white rounded-[4px]">Shop now</button></Link>
            {/* MOBILE MENU ICON */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-2xl ml-3"
          >
            ☰
          </button>
          </div>
         
        </div>
      </header>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[270px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg text-green-600">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        {/* MENU ITEMS */}
        <nav className="flex flex-col p-4 gap-4 text-gray-700 font-medium">
          {menu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={`${
                pathname === item.path
                  ? "text-green-600 font-semibold"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}