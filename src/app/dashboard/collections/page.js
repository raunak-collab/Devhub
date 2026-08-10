"use client";

import { useState } from "react";
import { LuFolder, LuPlus, LuSearch } from "react-icons/lu";
import { FaCode, FaDatabase, FaShieldAlt, FaPalette } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    name: "Web Development",
    description: "Frontend and backend development tools.",
    tools: 12,
    icon: <FaCode size={21} />,
    color: "bg-violet-600/20 text-violet-400",
  },
  {
    name: "API Tools",
    description: "Tools for testing and working with APIs.",
    tools: 8,
    icon: <LuFolder size={22} />,
    color: "bg-blue-600/20 text-blue-400",
  },
  {
    name: "Database",
    description: "Database management and query tools.",
    tools: 6,
    icon: <FaDatabase size={20} />,
    color: "bg-emerald-600/20 text-emerald-400",
  },
  {
    name: "Security",
    description: "Security, encryption and testing utilities.",
    tools: 5,
    icon: <FaShieldAlt size={20} />,
    color: "bg-orange-600/20 text-orange-400",
  },
  {
    name: "Design Resources",
    description: "Useful tools for colours, images and design.",
    tools: 7,
    icon: <FaPalette size={20} />,
    color: "bg-pink-600/20 text-pink-400",
  },
  {
    name: "Code Utilities",
    description: "Formatters, converters and developer utilities.",
    tools: 10,
    icon: <FaCode size={21} />,
    color: "bg-cyan-600/20 text-cyan-400",
  },
];

export default function CollectionsPage() {
  const [search, setSearch] = useState("");

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-full px-4 py-6 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            Collections
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Organize your favourite tools into custom collections.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">

          {/* Search */}
          <div className="relative">
            <LuSearch
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Search collections..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                                h-11 w-full rounded-lg
                                border border-slate-700
                                bg-[#0B1421]
                                pl-10 pr-4
                                text-sm text-white
                                outline-none
                                placeholder:text-slate-500
                                focus:border-purple-500/60
                                sm:w-64
                            "
            />
          </div>

          {/* Create Button */}
          <button
            className="
                            flex h-11 items-center justify-center gap-2
                            rounded-lg
                            bg-violet-600
                            px-5
                            text-sm font-medium text-white
                            transition
                            hover:bg-violet-500
                        "
          >
            <LuPlus size={19} />
            Create Collection
          </button>
        </div>
      </div>

      {/* Collection Stats */}
      <div className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">

        <StatCard
          title="Collections"
          value={collections.length}
        />

        <StatCard
          title="Total Tools"
          value={48}
        />

        <StatCard
          title="Saved Tools"
          value={24}
        />

        <StatCard
          title="Recently Updated"
          value={6}
        />

      </div>

      {/* Collections Grid */}
      {filteredCollections.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {filteredCollections.map((collection) => (
            <CollectionCard
              key={collection.name}
              collection={collection}
            />
          ))}

        </div>
      ) : (
        <div className="flex min-h-87.5 flex-col items-center justify-center text-center">

          <div className="mb-4 rounded-full bg-purple-500/10 p-4 text-violet-400">
            <LuFolder size={30} />
          </div>

          <h2 className="text-lg font-medium text-slate-200">
            No collections found
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Try searching for another collection.
          </p>

        </div>
      )}
    </section>
  );
}


/* ---------------- Stats Card ---------------- */

function StatCard({ title, value }) {
  return (
    <div
      className="
                rounded-lg border border-slate-800
                bg-[#0B1421]
                px-4 py-4
            "
    >
      <p className="text-xs text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-xl font-semibold text-white">
        {value}
      </p>
    </div>
  );
}


/* ---------------- Collection Card ---------------- */

function CollectionCard({ collection }) {
  return (
    <div
      className="
                group rounded-xl
                border border-slate-800
                bg-[#0B1421]
                p-5
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-slate-700
                hover:bg-[#0D1727]
            "
    >

      {/* Top */}
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div
            className={`
                            flex h-11 w-11 items-center justify-center
                            rounded-lg
                            ${collection.color}
                        `}
          >
            {collection.icon}
          </div>

          <div>
            <h2 className="font-medium text-slate-100">
              {collection.name}
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              {collection.tools} tools
            </p>
          </div>

        </div>

        <button
          className="
                        rounded-md p-1.5
                        text-slate-500
                        transition
                        hover:bg-white/5
                        hover:text-slate-300
                    "
        >
          <FiMoreVertical size={19} />
        </button>

      </div>

      {/* Description */}
      <p className="mt-5 min-h-10.5 text-sm leading-6 text-slate-400">
        {collection.description}
      </p>

      {/* Divider */}
      <div className="my-4 border-t border-slate-800" />

      {/* Bottom */}
      <div className="flex items-center justify-between">

        <span className="text-xs text-slate-500">
          {collection.tools} tools
        </span>

        <button
          className="
                        text-xs font-medium
                        text-violet-400
                        transition
                        flex gap-1
                        hover:text-purple-300
                    "
        >
          View Collection <ArrowRight size={15}/>
        </button>

      </div>

    </div>
  );
}