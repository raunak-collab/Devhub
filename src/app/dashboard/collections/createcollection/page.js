
"use client";

import React, { useState } from "react";
import { createCollectionAction } from "../../../../action/userAction";
import Input from "../../../../components/ui/Input";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  FaCode,
  FaDatabase,
  FaShieldAlt,
  FaPalette,
  FaTerminal,
  FaGlobe,
  FaMobileAlt,
  FaServer,
  FaCloud,
  FaCog,
  FaNetworkWired,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { LuFolder } from "react-icons/lu";

const CollectionIcon = [
  {
    name: "FaCode",
    icon: FaCode,
    color: "bg-violet-600/20 text-violet-400",
  },
  {
    name: "LuFolder",
    icon: LuFolder,
    color: "bg-blue-600/20 text-blue-400",
  },
  {
    name: "FaDatabase",
    icon: FaDatabase,
    color: "bg-emerald-600/20 text-emerald-400",
  },
  {
    name: "FaShieldAlt",
    icon: FaShieldAlt,
    color: "bg-orange-600/20 text-orange-400",
  },
  {
    name: "FaPalette",
    icon: FaPalette,
    color: "bg-pink-600/20 text-pink-400",
  },
  {
    name: "FaNetworkWired",
    icon: FaNetworkWired,
    color: "bg-purple-600/20 text-purple-400",
  },
  {
    name: "FaTerminal",
    icon: FaTerminal,
    color: "bg-yellow-600/20 text-yellow-400",
  },
  {
    name: "FaGlobe",
    icon: FaGlobe,
    color: "bg-indigo-600/20 text-indigo-400",
  },
  {
    name: "FaMobileAlt",
    icon: FaMobileAlt,
    color: "bg-red-600/20 text-red-400",
  },
  {
    name: "FaServer",
    icon: FaServer,
    color: "bg-teal-600/20 text-teal-400",
  },
  {
    name: "FaCloud",
    icon: FaCloud,
    color: "bg-sky-600/20 text-sky-400",
  },
  {
    name: "FaCog",
    icon: FaCog,
    color: "bg-gray-600/20 text-gray-400",
  },
];

export const AllToolTitles = [
  "JSON Formatter",
  "Password Generator",
  "JWT Decoder",
  "Regex Tester",
  "UUID Generator",
  "QR Code Generator",
  "XML Formatter",
  "YAML Formatter",
  "CSV to JSON",
  "Markdown Previewer",
  "Color Converter",
  "HTTP Status Checker",
  "HTML Minifier",
  "CSS Minifier",
  "Text Case Converter",
  "IP Address Lookup",
  "JSON Validator",
  "JSON to CSV",
  "JSON to XML",
  "HTML Formatter",
  "JavaScript Formatter",
  "CSS Formatter",
  "JavaScript Minifier",
  "CSS Beautifier",
  "Base64 Image Decoder",
  "URL Parser",
  "URL Shortener",
  "URL Query Builder",
  "HTTP Header Parser",
  "HTTP Request Builder",
  "API Response Formatter",
  "API Mock Generator",
  "REST API Tester",
  "GraphQL Query Builder",
  "GraphQL Formatter",
  "SHA256 Generator",
  "SHA512 Generator",
  "HMAC Generator",
  "JWT Generator",
  "JWT Inspector",
  "Token Generator",
  "Encryption Tool",
  "RSA Key Generator",
  "Password Strength Checker",
  "Secret Key Generator",
  "Unix Timestamp Generator",
  "Date Difference Calculator",
  "Time Zone Converter",
  "Number Base Converter",
  "Binary Converter",
  "Hex Converter",
  "Bytes Converter",
  "Image Format Converter",
  "SVG Optimizer",
  "Image Resizer",
  "Lorem Ipsum Generator",
  "Word Counter",
  "Text Diff Checker",
  "Slug Generator",
  "ASCII Converter",
  "Text Reverser",
  "Whitespace Cleaner",
  "Case Converter",
  "Random Number Generator",
  "Cron Expression Generator",
];

export default function CreateCollection() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedicon, setSelectedicon] = useState(null);
  const [selectedTools, setselectedTools] = useState(new Set());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const filterTools = AllToolTitles.filter((title) =>
    title.toLowerCase().includes(search.trim().toLowerCase())
  );

  const handleChange = (title) => {
    setselectedTools((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }

      return newSet;
    });
  };

  const handleSelectedIcon = (icon) => {
    setSelectedicon((prev) =>
      prev?.name === icon.name ? null : icon
    );
    setError("");
  };

  const handleCreateCollection = async () => {
    if (loading) return;

    if (name.trim().length < 4) {
      setError("Collection name must be at least 4 characters.");
      return;
    }

    if (!selectedicon) {
      setError("Please select an icon.");
      return;
    }

    if (selectedTools.size === 0) {
      setError("Please select at least one tool.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await createCollectionAction(
        name.trim(),
        desc.trim(),
        {
          name: selectedicon.name,
          color: selectedicon.color,
        },
        [...selectedTools]
      );

      console.log("Create collection response:", response);

      if (response?.status === 401) {
        router.push("/login");
        return;
      }

      if (response?.success) {
        router.push("/dashboard/collections");
        return;
      }

      setError(
        response?.error ||
          "Collection may not have been created. Please check the server response."
      );
    } catch (err) {
      console.error("Create collection failed:", err);
      setError(
        err?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0B1220] min-h-[calc(100vh-4.2rem)] my-5 pt-1 mx-6 rounded-2xl relative overflow-y-auto">
      {/* Header */}
      <div className="flex gap-9 items-center border-b mb-3 border-[#1F2937] px-6 py-3">
        <ArrowLeft
          onClick={() => router.back()}
          className="cursor-pointer text-slate-500"
          size={21}
        />
        <h1 className="font-semibold text-lg text-violet-600">
          Create Collection
        </h1>
      </div>

      {/* Content */}
      <div className="px-8">
        <div className="flex flex-col gap-4">
          {/* Collection name */}
          <div>
            <Input
              value={name}
              type="text"
              label="Collection Name"
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="eg. Frontend Tools"
            />
            <p className="text-slate-400 text-[13px]">
              Give your collection a unique and descriptive name.
            </p>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label
              className="text-white text-sm mb-0.5"
              htmlFor="desc"
            >
              Description{" "}
              <span className="text-gray-400">(optional)</span>
            </label>

            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="
                rounded-md border border-[#1F2937]
                bg-[#0B1220] pl-4 pt-3.5 pb-2 pr-4
                text-sm text-white placeholder:text-gray-500
                outline-none transition focus:border-violet-600
              "
              id="desc"
              placeholder="eg. All tools I use for frontend development"
              name="desc"
              rows={2}
            />

            <p className="text-slate-400 text-[13px] mt-1">
              Add a short description about this collection.
            </p>
          </div>

          {/* Select icon */}
          <div className="flex flex-col gap-1 mt-1.5">
            <h3 className="text-white text-sm">Select Icon</h3>

            <div className="grid grid-cols-4 gap-y-3 sm:grid-cols-6 md:grid-cols-12">
              {CollectionIcon.map((icon) => (
                <SelectIcon
                  key={icon.name}
                  iconData={icon}
                  selectedicon={selectedicon}
                  onSelect={handleSelectedIcon}
                />
              ))}
            </div>
          </div>

          {/* Search tools */}
          <div>
            <h2 className="text-white text-sm">Search Tools</h2>

            <div className="relative w-full sm:w-72 mt-1">
              <FiSearch
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tools..."
                className="
                  h-9 w-full rounded-lg
                  border border-slate-800
                  bg-[#0B1421] pl-10 pr-4
                  text-sm text-white outline-none
                  transition placeholder:text-slate-500
                  focus:border-violet-600
                  focus:ring-1 focus:ring-[#334B80]/30
                "
              />
            </div>

            {/* Tools */}
            <div
              className="
                grid grid-cols-2 gap-x-6 sm:gap-x-20
                gap-y-3 px-3 pt-2 pb-3 mt-2
                border-b border-[#1F2937]
                max-h-56 overflow-y-auto
              "
            >
              {filterTools.length > 0 ? (
                filterTools.map((title) => (
                  <label
                    key={title}
                    className="flex gap-3 items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTools.has(title)}
                      onChange={() => handleChange(title)}
                      className="h-4 w-4 accent-violet-600 cursor-pointer"
                    />
                    <span className="text-slate-400 text-sm">
                      {title}
                    </span>
                  </label>
                ))
              ) : (
                <p className="col-span-2 text-sm text-slate-500 py-2">
                  No tools found.
                </p>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              className="text-sm text-red-400"
              role="alert"
            >
              {error}
            </p>
          )}

          {/* Create button */}
          <div className="flex justify-end mt-4 pb-6">
            <button
              onClick={handleCreateCollection}
              type="button"
              disabled={
                loading ||
                name.trim().length < 4 ||
                !selectedicon ||
                selectedTools.size === 0
              }
              className="
                inline-flex items-center justify-center gap-2
                rounded-lg bg-violet-600 px-5 py-2.5
                cursor-pointer disabled:bg-violet-900
                disabled:cursor-not-allowed
                text-sm font-medium text-white
                transition hover:bg-violet-500
              "
            >
              {loading && (
                <Loader2 size={16} className="animate-spin" />
              )}
              {loading ? "Creating..." : "Create Collection"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectIcon({ iconData, selectedicon, onSelect }) {
  const Icon = iconData.icon;
  const isSelected = selectedicon?.name === iconData.name;

  return (
    <button
      type="button"
      onClick={() => onSelect(iconData)}
      aria-label={`Select ${iconData.name} icon`}
      aria-pressed={isSelected}
      className={`
        group relative flex h-11 w-13 items-center justify-center
        rounded-lg border transition-all duration-300 ease-out
        hover:shadow-[0_8px_25px_rgba(124,58,237,0.12)]
        ${
          isSelected
            ? "border-violet-700"
            : "border-transparent hover:border-violet-500/40 hover:-translate-y-1 hover:scale-105"
        }
        ${iconData.color}
      `}
    >
      <div className="transition-transform duration-300 ease-out group-hover:scale-110">
        <Icon size={Icon === LuFolder ? 22 : 21} />
      </div>
    </button>
  );
}
