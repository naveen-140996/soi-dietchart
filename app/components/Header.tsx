"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-green-600">
          Soi Organic
        </h1>

        {/* Menu */}
        <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
          <Link href="/dashboard" className="hover:text-green-500">
            Dashboard
          </Link>
          <Link href="#" className="hover:text-green-500">
            Progress
          </Link>
          <Link href="#" className="hover:text-green-500">
            Profile
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          ☰
        </div>
      </div>
    </header>
  );
}