"use client";

import FavouritesCard from "@/components/cards/FavouritesCard";
import { FaRegStar } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

export default function Favourites() {
    const favourites = [
        {
            src: "/images/1.png",
            heading: "JWT Decoder",
            title: "Decode and verify JWT tokens",
        },
        {
            src: "/images/2.png",
            heading: "JSON Formatter",
            title: "Format and validate JSON",
        },
        {
            src: "/images/3.png",
            heading: "Regex Tester",
            title: "Verify regular expressions",
        },
        {
            src: "/images/4.png",
            heading: "Password Generator",
            title: "Generate strong passwords",
        },
    ];

    const [search, setSearch] = useState("");

    const filteredFavourites = favourites.filter((item) =>
        item.heading.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="min-h-full px-4 py-6 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                            My Favourites
                        </h1>

                        <span className="rounded-full border border-slate-700 bg-[#101827] px-2.5 py-1 text-xs font-medium text-slate-400">
                            {favourites.length}
                        </span>
                    </div>

                    <p className="mt-1 max-w-xl text-sm leading-6 text-slate-400">
                        Your favourite developer tools, all in one place for
                        quick access.
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-72">
                    <FiSearch
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search favourites..."
                        className="
                            h-11 w-full rounded-lg
                            border border-slate-800
                            bg-[#0B1421]
                            pl-10 pr-4
                            text-sm text-white
                            outline-none
                            transition
                            placeholder:text-slate-500
                            focus:border-[#334B80]
                            focus:ring-1
                            focus:ring-[#334B80]/30
                        "
                    />
                </div>
            </div>

            {/* Favourites */}
            {filteredFavourites.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredFavourites.map(({ src, heading, title }) => (
                        <FavouritesCard
                            key={heading}
                            src={src}
                            heading={heading}
                            title={title}
                        />
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-[#0B1421]/40 px-5 text-center">

                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#101D3A] text-slate-400">
                        <FaRegStar size={24} />
                    </div>

                    <h2 className="text-lg font-medium text-slate-200">
                        No favourites found
                    </h2>

                    <p className="mt-1 max-w-sm text-sm text-slate-500">
                        Try searching for another tool or add some tools to
                        your favourites.
                    </p>
                </div>
            )}
        </section>
    );
}