"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

interface NavbarProps {
  toggleVideo: boolean;
}

export default function Navbar({ toggleVideo }: NavbarProps) {
  const [navToggle, toggleNavBar] = useState(true);
  const toggleNav = (bool: boolean) => {
    toggleNavBar(!bool);
  };
  return (
    <header
      className={`p-5 px-[50px] md:flex md:justify-between md:place-items-center ${
        toggleVideo ? "" : "shadow-sm sticky top-0 w-screen z-[10000]"
      }`}
    >
      <div className="flex md:inline-block justify-between">
        <Link href="/" className="inline-block h-[35px] w-[140px] relative">
          <Image
            alt="Quizoor Logo"
            src="/quizoorLogo.png"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
          />
        </Link>
        <button onClick={() => toggleNav(navToggle)} className="md:hidden">
          {navToggle ? (
            <MenuIcon sx={{ fontSize: 30 }} />
          ) : (
            <CloseIcon sx={{ fontSize: 30 }} />
          )}
        </button>
      </div>
      <div
        className={`md:flex md:flex-row md:py-2 mt-3 md:mt-0 overflow-hidden transition-all duration-500 ease-in-out ${
          navToggle ? "max-h-0" : "max-h-[500px]"
        } md:max-h-none`}
      >
        <div
          className={`font-semibold text-lg text-center md:text-start ${
            toggleVideo ? "text-[#C3F094]" : "text-[#066C5D]"
          }`}
        >
          <Link
            href="/"
            className={`hover:border-b-2 md:mx-7 block md:inline-block mb-3 md:mb-0 ${
              toggleVideo
                ? "hover:border-b-[#C3F094]"
                : "hover:border-b-[#066C5D]"
            }`}
            onClick={() => {
              toggleNav(navToggle);
            }}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`hover:border-b-2 md:mx-7 block md:inline-block mb-3 md:mb-0 ${
              toggleVideo
                ? "hover:border-b-[#C3F094]"
                : "hover:border-b-[#066C5D]"
            }`}
            onClick={() => {
              toggleNav(navToggle);
            }}
          >
            About Us
          </Link>
          <Link
            href="/contact-us"
            onClick={() => {
              toggleNav(navToggle);
            }}
            className={`hover:border-b-2 md:mx-7 block md:inline-block mb-3 md:mb-0 ${
              toggleVideo
                ? "hover:border-b-[#C3F094]"
                : "hover:border-b-[#066C5D]"
            }`}
          >
            Contact Us
          </Link>
          <Link
            href="/faq"
            onClick={() => {
              toggleNav(navToggle);
            }}
            className={`hover:border-b-2 md:mx-7 block md:inline-block mb-3 md:mb-0 ${
              toggleVideo
                ? "hover:border-b-[#C3F094]"
                : "hover:border-b-[#066C5D]"
            }`}
          >
            FAQ
          </Link>
        </div>
        <div className={`text-center md:text-start my-7 md:my-0 ${toggleVideo ? "hidden" : ""}`}>
          <Link
            href="/quiz/create"
            className="p-2 px-4 bg-[#066C5D] text-white font-semibold rounded-md md:ml-5"
            onClick={() => {
              toggleNav(navToggle);
            }}
          >
            Create Quiz
          </Link>
          <Link
            href="/quiz"
            className="p-2 px-4 bg-[#C3F094] text-black font-semibold rounded-md ml-5"
            onClick={() => {
              toggleNav(navToggle);
            }}
          >
            Take a Quiz
          </Link>
        </div>
      </div>
    </header>
  );
}
