"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Logo */}
          <h1 className="text-xl font-bold text-green-600">
            Soi Organic
          </h1>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
           <Link href="/dashboard" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/diet-chart" onClick={() => setIsOpen(false)}>
            Diet chart
          </Link>
          <Link href="/reels" onClick={() => setIsOpen(false)}>
            Instagram Reels
          </Link>
          <Link href="/youtube" onClick={() => setIsOpen(false)}>
            Youtube
          </Link>
          </nav>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[260px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col p-4 gap-4 text-gray-700 font-medium">
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/diet-chart" onClick={() => setIsOpen(false)}>
            Diet chart
          </Link>
          <Link href="/reels" onClick={() => setIsOpen(false)}>
            Instagram Reels
          </Link>
          <Link href="/youtube" onClick={() => setIsOpen(false)}>
            Youtube
          </Link>
        </nav>
      </div>
    </>
  );
}