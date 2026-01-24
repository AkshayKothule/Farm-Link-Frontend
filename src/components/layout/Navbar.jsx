import { useState } from "react";
import {Link} from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleScroll = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-30">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between text-white">

        {/* Logo */}
        <div
          onClick={() => handleScroll("home")}
          className="text-2xl font-bold cursor-pointer"
        >
          🌿 FarmLink
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <button
            onClick={() => handleScroll("home")}
            className="text-yellow-400 hover:text-yellow-300 transition"
          >
            Home
          </button>

          <button
            onClick={() => handleScroll("about")}
            className="hover:text-yellow-400 transition"
          >
            About Us
          </button>

          <button
            onClick={() => handleScroll("services")}
            className="hover:text-yellow-400 transition"
          >
            Services
          </button>

          <button
            onClick={() => handleScroll("shop")}
            className="hover:text-yellow-400 transition"
          >
            Shop
          </button>
        </div>

        {/* Desktop CTA */}
        <Link
          to="/auth"
          className="hidden md:inline-block bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-full font-semibold"
        >
          Get Started Now →
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-green-950/95 text-white px-6 py-8 space-y-6 animate-fade-in">
          <button
            onClick={() => handleScroll("home")}
            className="block text-lg font-medium hover:text-yellow-400"
          >
            Home
          </button>

          <button
            onClick={() => handleScroll("about")}
            className="block text-lg font-medium hover:text-yellow-400"
          >
            About Us
          </button>

          <button
            onClick={() => handleScroll("services")}
            className="block text-lg font-medium hover:text-yellow-400"
          >
            Services
          </button>

          <button
            onClick={() => handleScroll("shop")}
            className="block text-lg font-medium hover:text-yellow-400"
          >
            Shop
          </button>

          <Link
            to="/auth"
            className="inline-block mt-4 bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-full font-semibold"
          >
            Get Started Now →
          </Link>
        </div>
      )}
    </nav>
  );
}
