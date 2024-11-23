"use client";
import { Suspense, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { User } from "next-auth";
import { checkSession } from "@/app/lib/actions";
import Loader from "../extras/Loader";

function useDebouncedCallback(callback: (term: string) => void, delay: number) {
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  return (term: string) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      callback(term);
    }, delay);
  };
}

function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const userDetails = await checkSession("Done");
      setUser(userDetails?.user || null);
    };
    const getParam = async () => {
      const keyword = searchParams.get("search") || "";
      setQuery(keyword);
    };
    getUser();
    getParam();
  }, []);

  const changeSearchParam = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/quiz?search=${query}`);
  };

  return (
    <div className="mt-7">
      <h1 className="text-3xl font-semibold text-[#066C5D] text-center">
        Take a Quiz, {user?.name?.split(" ")[0]}
      </h1>
      <form
        onSubmit={handleSearch}
        className="text-center mt-7 md:flex md:gap-4 md:place-items-center md:justify-center"
      >
        <label
          htmlFor="searchQuery"
          className="text-xl block mb-3 md:mb-0 md:inline-block"
        >
          Have a Quiz ID?
        </label>
        <input
          type="text"
          name="query"
          id="searchQuery"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            changeSearchParam(e.target.value);
          }}
          placeholder="Quiz ID"
          className="border-b-2 border-gray-400 rounded-md px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="bg-[#066C5D] text-white px-4 py-2 rounded-md hover:bg-[#066c5de9]"
        >
          Find Quiz
        </button>
      </form>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <Home />
    </Suspense>
  );
}
