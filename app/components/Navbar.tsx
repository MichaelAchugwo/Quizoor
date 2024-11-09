"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const [navToggle, toggleNavBar] = useState(true);
  const toggleNav = (bool: boolean) => {
    toggleNavBar(!bool);
  };
  return (
    <header
      className={`p-5 px-[50px] md:flex md:justify-between md:place-items-center`}
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
          className={`font-semibold text-lg text-center md:text-start
            text-[#C3F094]
          }`}
        >
          <Link
            href="/home"
            className={`hover:border-b-2 md:mx-7 block md:inline-block mb-3 md:mb-0 hover:border-b-[#C3F094]`}
            onClick={() => {
              toggleNav(navToggle);
            }}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`hover:border-b-2 md:mx-7 block md:inline-block mb-3 md:mb-0 hover:border-b-[#C3F094]`}
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
            className={`hover:border-b-2 md:mx-7 block md:inline-block mb-3 md:mb-0 hover:border-b-[#C3F094]`}
          >
            Contact Us
          </Link>
          <Link
            href="/faq"
            onClick={() => {
              toggleNav(navToggle);
            }}
            className={`hover:border-b-2 md:mx-7 block md:inline-block mb-3 md:mb-0 hover:border-b-[#C3F094]`}
          >
            FAQ
          </Link>
        </div>
      </div>
    </header>
  );
}
