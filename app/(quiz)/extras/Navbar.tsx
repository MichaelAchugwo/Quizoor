"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { signUserOut } from "@/app/lib/actions";

export default function Navbar() {
  const [navToggle, toggleNavBar] = useState(true);
  const toggleNav = (bool: boolean) => {
    toggleNavBar(!bool);
  };
  return (
    <header
      className={`p-5 px-[50px] md:flex md:justify-between md:place-items-center bg-white shadow-sm sticky top-0 w-screen z-[10000]`}
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
        <div className={`text-lg text-center md:text-start text-[#066c5d]}`}>
          <Link
            href="/home"
            className={`hover:border-b-2 md:mx-5 block md:inline-block mb-3 md:mb-0 hover:border-b-[#066c5d]`}
            onClick={() => {
              toggleNav(navToggle);
            }}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`hover:border-b-2 md:mx-5 block md:inline-block mb-3 md:mb-0 hover:border-b-[#066c5d]`}
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
            className={`hover:border-b-2 md:mx-5 block md:inline-block mb-3 md:mb-0 hover:border-b-[#066c5d]`}
          >
            Contact Us
          </Link>
          <Link
            href="/faq"
            onClick={() => {
              toggleNav(navToggle);
            }}
            className={`hover:border-b-2 md:mx-5 block md:inline-block mb-3 md:mb-0 hover:border-b-[#066c5d]`}
          >
            FAQ
          </Link>
        </div>
        <div className="text-center md:text-start my-7 md:my-0 md:ml-7 flex flex-row justify-center gap-3">
          <Link
            href="/create-quiz"
            className="p-2 px-4 bg-[#066C5D] text-white rounded-md"
            onClick={() => {
              toggleNav(navToggle);
            }}
          >
            Create Quiz
          </Link>
          <Link
            href="/quiz"
            className="p-2 px-4 bg-[#C3F094] text-black rounded-md"
            onClick={() => {
              toggleNav(navToggle);
            }}
          >
            Take a Quiz
          </Link>
          <Button
            className="bg-[#066C5D] text-white p-2 px-3 md:px-0 rounded-md"
            onClick={() => {
              signUserOut("Done");
            }}
            variant="contained"
          >
            <span className="md:hidden">Logout</span>
            <LogoutIcon />
          </Button>
        </div>
      </div>
    </header>
  );
}
