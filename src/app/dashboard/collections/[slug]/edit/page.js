
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { FiSearch } from "react-icons/fi";

import Input from "../../../../../components/ui/Input";

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

import { LuFolder } from "react-icons/lu";
import { editCollectionAction } from "../../../../../action/userAction";

const CollectionIcon = [
    { icon: FaCode, color: "bg-violet-600/20 text-violet-400" },
    { icon: LuFolder, color: "bg-blue-600/20 text-blue-400" },
    { icon: FaDatabase, color: "bg-emerald-600/20 text-emerald-400" },
    { icon: FaShieldAlt, color: "bg-orange-600/20 text-orange-400" },
    { icon: FaPalette, color: "bg-pink-600/20 text-pink-400" },
    { icon: FaNetworkWired, color: "bg-purple-600/20 text-purple-400" },
    { icon: FaTerminal, color: "bg-yellow-600/20 text-yellow-400" },
    { icon: FaGlobe, color: "bg-indigo-600/20 text-indigo-400" },
    { icon: FaMobileAlt, color: "bg-red-600/20 text-red-400" },
    { icon: FaServer, color: "bg-teal-600/20 text-teal-400" },
    { icon: FaCloud, color: "bg-sky-600/20 text-sky-400" },
    { icon: FaCog, color: "bg-gray-600/20 text-gray-400" },
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

const getIconName = (Icon) => {
    if (Icon === LuFolder) return "LuFolder";
    return Icon.name;
};

export default function EditCollection() {
    const { slug } = useParams();
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [selectedicon, setSelectedicon] = useState(null);
    const [selectedTools, setselectedTools] = useState(new Set());

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Load existing collection
    useEffect(() => {
        if (!slug) return;

        async function fetchCollection() {
            try {
                const response = await fetch(`/api/collections/${slug}`);

                if (response.status === 401) {
                    router.push("/login");
                    return;
                }

                const result = await response.json();

                if (!response.ok || result.error) {
                    setError(result.error || "Failed to load collection.");
                    return;
                }

                setName(result.name || "");
                setDesc(result.desc || "");

                const savedIcon = result.icon;

                if (savedIcon?.name) {
                    const matchedIcon = CollectionIcon.find(
                        ({ icon }) => getIconName(icon) === savedIcon.name
                    );

                    if (matchedIcon) {
                        setSelectedicon({
                            Icon: matchedIcon.icon,
                            iconColor: savedIcon.color || matchedIcon.color,
                        });
                    }
                }

                setselectedTools(new Set(result.tools || []));
            } catch (err) {
                console.error("Failed to fetch collection:", err);
                setError("Something went wrong while loading.");
            } finally {
                setLoading(false);
            }
        }

        fetchCollection();
    }, [slug, router]);

    // Search tools
    const filterTools = AllToolTitles.filter((title) =>
        title.toLowerCase().includes(search.toLowerCase())
    );

    // Toggle checkbox
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

    // Update collection
    const handleUpdateCollection = async () => {

        setSaving(true);
        setError("");

        const updatedData = {
            name: name.trim().toLowerCase(),
            desc: desc.trim().toLowerCase(),
            icon: {
                name: getIconName(selectedicon.Icon),
                color: selectedicon.iconColor,
            },
            tools: [...selectedTools],
        }

        try {
            const response = await editCollectionAction(slug, updatedData)

            if (response.status === 401) {
                return router.push("/login");
            }

            if (response.error) {
                setError(response.error || "Failed to update collection.");
                return;
            }


           return router.push(`/dashboard/collections/${slug}`);

        } catch (err) {
            console.error("Update collection error:", err);
            setError("Something went wrong. Please try again.");

        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-[#0B1220] min-h-[calc(100vh-4.2rem)] mt-5 mx-6 rounded-2xl px-8 py-6">
                <div className="h-7 w-48 rounded bg-slate-800 animate-pulse" />
                <div className="mt-8 space-y-5">
                    <div className="h-12 rounded-lg bg-slate-800 animate-pulse" />
                    <div className="h-20 rounded-lg bg-slate-800 animate-pulse" />
                    <div className="h-36 rounded-lg bg-slate-800 animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#0B1220] mt-5 pt-1 mx-6 rounded-2xl relative">

            {/* Header */}
            <div className="flex gap-9 items-center border-b mb-3 border-[#1F2937] px-6 py-3">
                <ArrowLeft
                    onClick={() => router.back()}
                    className="cursor-pointer text-slate-500 hover:text-white transition"
                    size={21}
                />

                <h1 className="font-semibold text-lg text-violet-600">
                    Edit Collection
                </h1>
            </div>

            {/* Content */}
            <div className="px-6 sm:px-8">
                <div className="flex flex-col gap-4">

                    {/* Collection Name */}
                    <div>
                        <Input
                            value={name}
                            type="text"
                            label="Collection Name"
                            onChange={(e) => setName(e.target.value)}
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
                rounded-md border
                border-[#1F2937]
                bg-[#0B1220] pl-4
                pt-3.5 pb-2
                pr-4 text-sm text-white
                placeholder:text-gray-500
                outline-none transition
                focus:border-violet-600
              "
                            id="desc"
                            placeholder="eg. All tools i use for frontend development"
                            name="desc"
                            rows="2"
                        />

                        <p className="text-slate-400 text-[13px] mt-1">
                            Add a short description about this collection.
                        </p>
                    </div>

                    {/* Select Icon */}
                    <div className="flex flex-col gap-1 mt-1.5">
                        <h3 className="text-white text-sm">Select Icon</h3>

                        <div className="grid grid-cols-4 gap-y-3 sm:grid-cols-6 md:grid-cols-12">
                            {CollectionIcon.map(({ icon, color }) => (
                                <SelectIcon
                                    key={getIconName(icon)}
                                    icon={icon}
                                    selectedicon={selectedicon}
                                    setSelectedicon={setSelectedicon}
                                    iconColor={color}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Search Tools */}
                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-white text-sm">Search Tools</h2>
                            <span className="text-xs text-violet-400">
                                {selectedTools.size} selected
                            </span>
                        </div>

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
                  bg-[#0B1421]
                  pl-10 pr-4
                  text-sm text-white
                  outline-none
                  transition
                  placeholder:text-slate-500
                  focus:border-violet-600
                  focus:ring-1
                  focus:ring-[#334B80]/30
                "
                            />
                        </div>

                        {/* Tools */}
                        <div
                            className="
  grid
  grid-cols-1 sm:grid-cols-2
  gap-x-8 md:gap-x-20
  gap-y-3
  px-3
  pt-3
  pb-3
  mt-2
  border-b border-[#1F2937]
  max-h-56
  overflow-y-auto
  overscroll-contain
"
                        >
                            {filterTools.slice(0, 6).map((title) => (
                                <div key={title} className="flex gap-3 items-center">
                                    <label className="cursor-pointer">
                                        <input
                                            onChange={() => handleChange(title)}
                                            checked={selectedTools.has(title)}
                                            type="checkbox"
                                            className="peer sr-only"
                                        />

                                        <div
                                            className="
                        w-4 h-4
                        rounded
                        border border-white/10
                        bg-white/5
                        flex items-center justify-center
                        transition-all duration-200
                        peer-checked:bg-violet-600
                        peer-checked:border-violet-600
                        peer-hover:border-violet-500/50
                        peer-focus-visible:ring-2
                        peer-focus-visible:ring-violet-500/20
                      "
                                        >
                                            {selectedTools.has(title) && (
                                                <Check size={12} className="text-white" />
                                            )}
                                        </div>
                                    </label>

                                    <h3
                                        className={`text-sm ${selectedTools.has(title)
                                            ? "text-white"
                                            : "text-slate-400"
                                            }`}
                                    >
                                        {title}
                                    </h3>
                                </div>
                            ))}

                            {filterTools.length === 0 && (
                                <p className="text-sm text-slate-500 col-span-full py-4">
                                    No tools found.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-sm text-red-400">{error}</p>
                    )}

                    {/* Button */}
                    <div className="flex justify-end mt-4 pb-6 gap-3">
                        <button
                            onClick={() => router.back()}
                            type="button"
                            disabled={saving}
                            className="
                inline-flex items-center justify-center
                rounded-lg border border-[#263448]
                px-5 py-2
                text-sm font-medium text-slate-300
                hover:bg-white/5
                transition
              "
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleUpdateCollection}
                            type="button"
                            disabled={
                                saving ||
                                name.trim().length < 4 ||
                                !selectedicon ||
                                !selectedTools.size
                            }
                            className="
                inline-flex items-center justify-center
                gap-2
                rounded-lg
                bg-violet-600
                px-5
                cursor-pointer
                disabled:bg-violet-900
                disabled:cursor-not-allowed
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-violet-500
              "
                        >
                            {saving && (
                                <Loader2 size={15} className="animate-spin" />
                            )}
                            {saving ? "Updating..." : "Update Collection"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function handleSelectedIcon(setSelectedicon, Icon, iconColor) {
    setSelectedicon((prev) => {
        if (prev?.Icon === Icon) {
            return null;
        }

        return { Icon, iconColor };
    });
}

function SelectIcon({
    icon: Icon,
    iconColor,
    selectedicon,
    setSelectedicon,
}) {
    const isSelected = selectedicon?.Icon === Icon;

    return (
        <button
            type="button"
            onClick={() =>
                handleSelectedIcon(setSelectedicon, Icon, iconColor)
            }
            aria-label={`Select ${getIconName(Icon)} icon`}
            aria-pressed={isSelected}
            className={`
        group
        relative
        flex h-11 w-13 items-center justify-center
        rounded-lg
        border
        transition-all duration-300 ease-out
        hover:shadow-[0_8px_25px_rgba(124,58,237,0.12)]
        ${isSelected
                    ? "border-violet-700 ring-1 ring-violet-600/30"
                    : "border-transparent hover:border-violet-500/40 hover:-translate-y-1 hover:scale-105"
                }
        ${iconColor}
      `}
        >
            <div className="transition-transform duration-300 ease-out group-hover:scale-110">
                <Icon size={Icon === LuFolder ? 22 : 21} />
            </div>
        </button>
    );
}
