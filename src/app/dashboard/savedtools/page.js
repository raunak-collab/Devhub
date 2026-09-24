"use client";

import { useEffect, useState } from "react";
import SavedToolsCard from "../../../components/cards/SavedToolsCard";
import { FiSearch } from "react-icons/fi";
import { LuSlidersHorizontal } from "react-icons/lu";
import { AllTools } from "../../../data/AllTools";
import { IoBookmarkOutline } from "react-icons/io5";


export default function SavedTools() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [savedTools, setSavedTools] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchSavedTools() {
            try {
                const response = await fetch("/api/savedtools");
                const savedToolsdata = await response.json();

                if (!savedToolsdata.error) {
                    const savedToolsArr = savedToolsdata.map(
                        ({ title }) => title
                    );

                    setSavedTools(savedToolsArr);
                }
            } finally {

                setLoading(false);
            }
        }

        fetchSavedTools();
    }, []);

    const categories = [
        "All",
        "Development",
        "Security",
        "Database",
        "Productivity",
    ];

    const tools = AllTools.filter(({ title }) => savedTools.includes(title))


    const filteredTools = tools.filter((tool) => {
        const matchesSearch = tool.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" || tool.type === category;

        return matchesSearch && matchesCategory;
    });

    return (
        <section className="min-h-full px-4 py-6 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                            Saved Tools
                        </h1>

                        <span className="rounded-full border border-slate-700 bg-[#101827] px-2.5 py-1 text-xs font-medium text-slate-400">
                            {tools.length}
                        </span>
                    </div>

                    <p className="mt-1 max-w-xl text-sm leading-6 text-slate-400">
                        Keep your useful developer tools saved for quick and
                        easy access.
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
                        placeholder="Search saved tools..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
                            h-11 w-full rounded-lg
                            border border-slate-800
                            bg-[#0B1421]
                            pl-10 pr-4
                            text-sm text-white
                            outline-none
                            placeholder:text-slate-500
                            transition
                            focus:border-[#334B80]
                            focus:ring-1
                            focus:ring-[#334B80]/30
                        "
                    />
                </div>
            </div>

            {/* Filter */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    <LuSlidersHorizontal
                        size={18}
                        className="mr-1 shrink-0 text-slate-500"
                    />

                    {categories.map((item) => (
                        <button
                            key={item}
                            onClick={() => setCategory(item)}
                            className={`
                                whitespace-nowrap rounded-md px-3.5 py-2
                                text-xs font-medium
                                transition-all duration-200
                                ${category === item
                                    ? "bg-[#101D3A] text-white"
                                    : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
                                }
                            `}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <p className="shrink-0 text-xs text-slate-500">
                    {filteredTools.length}{" "}
                    {filteredTools.length === 1 ? "tool" : "tools"}
                </p>
            </div>

            {/* Cards */}
            {loading ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <div
                        className=" 
                   rounded-xl border
                   h-50
                 border-slate-900
                bg-[#040b14] p-5"
                    />
                    <div
                        className=" 
                   rounded-xl border
                
                   h-50
                 border-slate-900
                bg-[#040b14] p-5"
                    />
                    <div
                        className=" 
                   rounded-xl border
                   
                   h-50
                 border-slate-900
                bg-[#040b14] p-5"
                    />
                    <div
                        className=" 
                   rounded-xl border
                   h-50
                 border-slate-900
                bg-[#040b14] p-5"
                    />
                    <div
                        className=" 
                   rounded-xl border
                   h-50
                 border-slate-900
                bg-[#040b14] p-5"
                    />
                </div>
            ) : (
                filteredTools.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {filteredTools.map(({
                            title,
                            desc,
                            icon: Icon,
                            iconColor,
                            iconBg,
                            typeBg,
                            typeColor,
                            type
                        }) => (
                            <div
                                key={title}
                            >
                                <SavedToolsCard
                                    title={title}
                                    desc={desc}
                                    type={type}
                                    isSaved={savedTools.includes(title)}
                                    onUnsave={(title) => {
                                        setSavedTools((prev) => prev.filter(Title => Title !== title))
                                    }
                                    }
                                    typeBg={typeBg}
                                    typeColor={typeColor}
                                    icon={
                                        <div
                                            className={`flex h-11 w-11 items-center justify-center rounded-lg ${iconBg}`}
                                        >
                                            <Icon
                                                size={23}
                                                strokeWidth={1.8}
                                                className={iconColor}
                                            />
                                        </div>
                                    }
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-[#0B1421]/40 px-5 text-center">

                        <button className="cursor-pointer" type="button">
                            <IoBookmarkOutline size={21} />
                        </button>

                        <h2 className="text-lg font-medium text-slate-200">
                            No saved tools found
                        </h2>

                        <p className="mt-1 max-w-sm text-sm text-slate-500">
                            Try another search or save some developer tools to
                            access them quickly later.
                        </p>
                    </div>
                )
            )}

        </section>
    );
}