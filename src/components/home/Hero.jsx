'use client'
import React, { useState } from "react";
import SearchInput from "../ui/SearchInput";
import PopularTools from "../cards/PopularToolChip";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HandleSearch from "../../utils/HandleSearch";
import { useSearchParams, useRouter } from "next/navigation";

export default function Hero() {
  const [search, setSearch] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  return (
    <div className="min-h-[calc(100vh-4rem)] border-b border-[#1F2937] flex flex-col">
      <section className="flex-1 flex items-center px-5 flex-col justify-center">
        <div className="text-center mb-10 max-w-2xl">
          <h1 className="mx-auto text-white max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            All Developer Tools <br />
            in <span className="text-violet-500">One Place</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Powerful developer tools including JSON Formatter, JWT Decoder,
            Password Generator, Regex Tester, Image Tools and API Utilities.
          </p>
        </div>
        <div className="flex md:flex-row flex-col gap-4 max-w-2xl w-full">
          <div className="md:flex-1 w-full">
            <SearchInput
              search={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  HandleSearch(router, search, params)
                }
              }
              }
              placeholder={"Search any tool..."}
            />
          </div>
          <Link
            href="/tools"
            className="inline-flex text-white items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2 lg:py-0  font-medium text-sm transition hover:bg-violet-500"
          >
            Explore Tools
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="hidden md:flex gap-2 mt-4">
          Popular:{" "}
          <PopularTools
            jsonformatter={"JSON Formatter"}
            jwtdecoder={"JWT Decoder"}
            passwordgenerator={"Password Generator"}
            regextester={"Regex Tester"}
            uuidgenerator={"UUID Generator"}
          />
        </div>
      </section>
    </div>
  );
}
