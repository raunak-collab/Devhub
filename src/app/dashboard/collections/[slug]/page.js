"use client";

import {
    ArrowLeft,
    Check,
    ChevronDown,
    ExternalLink,
    MoreVertical,
    Pencil,
    Search,
    Star,
    Wrench,
} from "lucide-react";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { LuFolder } from "react-icons/lu";

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
import { AllTools } from "@/app/AllTools";
import { toggleFavouriteToolsAction } from "@/action/userAction";


/* =========================
   ICON MAP
========================= */

const iconMap = {
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
};


/* =========================
   CATEGORIES
========================= */

const categories = [
    "All Categories",
    'Formatting',
    'Development',
    'API',
    'Security',
    'Utilities',
    'Conversion',
    'Design',
    'Text',
    'Network',
]


export default function Page() {

    const { slug } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("All Categories");

    const [menuOpen, setMenuOpen] = useState(false);


    /* =========================
       FETCH COLLECTION
    ========================= */

    useEffect(() => {

        async function fetchCollection() {

            try {

                const response = await fetch(`/api/collections/${slug}`);

                if (response.status === 401) {
                    router.push("/login");
                    return;
                }

                const result = await response.json();

                if (!result.error) {
                    setData(result);
                }

            } catch (error) {

                console.error("Failed to fetch collection:", error);

            } finally {

                setTimeout(() => {
                    setLoading(false);
                }, 300);
            }
        }

        if (slug) {
            fetchCollection();
        }

    }, [slug, router]);


    // FETCH FAVOURITES
    const [favouritestools, setFavouritestools] = useState([])

    useEffect(() => {
        async function fetchFavouritesTools() {

            const response = await fetch('/api/favouritestools')

            const favouritesToolsData = await response.json();

            if (!favouritesToolsData.error) {
                const favouritesToolsArr = favouritesToolsData.map(({ title }) => title.toLowerCase())
                setFavouritestools(favouritesToolsArr);
            }


        }
        fetchFavouritesTools()
    }, [])

    /* =========================
       HELPERS
    ========================= */

    function firstCapital(value = "") {

        if (!value) return "";

        return value.charAt(0).toUpperCase() + value.slice(1);
    }


    function formatDate(date) {

        if (!date) return "Recently";

        const created = new Date(date);

        if (Number.isNaN(created.getTime())) {
            return "Recently";
        }

        const now = new Date();

        const diff = now.getTime() - created.getTime();

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return "Today";
        if (days === 1) return "1 day ago";
        if (days < 7) return `${days} days ago`;

        const weeks = Math.floor(days / 7);

        if (weeks === 1) return "1 week ago";
        if (weeks < 4) return `${weeks} weeks ago`;

        const months = Math.floor(days / 30);

        if (months === 1) return "1 month ago";

        return `${months} months ago`;
    }


    /* =========================
       COLLECTION ICON
    ========================= */

    const Icon =
        iconMap[data?.icon?.name] || LuFolder;


    const iconColor =
        data?.icon?.color ||
        "bg-violet-500/10 text-violet-400";


    /* =========================
       COLLECTION NAME
    ========================= */

    const collectionName =
        data?.name
            ?.split(" ")
            .map(word => firstCapital(word))
            .join(" ") || "Collection";


    const description =
        data?.desc
            ? `${firstCapital(data.desc)}${data.desc.endsWith(".") ? "" : "."}`
            : "Your saved developer tools.";


    /* =========================
       FILTER TOOLS
    ========================= */

    const filteredTools = useMemo(() => {

        const toolsArr = data?.tools || [];

        const tools = AllTools.filter(({ title }) => toolsArr.includes(title))

        return tools.filter((tool) => {

            const toolName =
                tool?.title ||
                "";

            const toolDescription =
                tool?.desc ||
                "";

            const category =
                tool?.type ||
                "";


            const searchText = search.toLowerCase();

            const matchesSearch =
                toolName.toLowerCase().includes(searchText) ||
                toolDescription.toLowerCase().includes(searchText);


            const matchesCategory =
                selected === "All Categories" ||
                category === selected;


            return matchesSearch && matchesCategory;

        });

    }, [data?.tools, search, selected]);


    /* =========================
       LOADING
    ========================= */

    if (loading) {
        return <CollectionShimmer />;
    }


    /* =========================
       NOT FOUND
    ========================= */

    if (!data) {

        return (
            <div className="min-h-screen bg-[#070e19] text-white flex items-center justify-center">

                <div className="text-center">

                    <h1 className="text-xl font-semibold">
                        Collection not found
                    </h1>

                    <button
                        onClick={() => router.back()}
                        className="mt-4 text-violet-400 hover:text-violet-300"
                    >
                        Go Back
                    </button>

                </div>

            </div>
        );
    }


    /* =========================
       MAIN
    ========================= */

    return (

        <div className="min-h-screen bg-[#070e19] text-white px-6">

            {/* =========================
                HEADER
            ========================= */}

            <div className="
                h-14.25
                flex
                items-center
                justify-between
                border-b
                border-[#1F2937]
            ">

                <div className="flex items-center gap-8">

                    <button
                        onClick={() => router.back()}
                        className="
                            text-slate-500
                            hover:text-white
                            transition
                        "
                    >
                        <ArrowLeft size={21} />
                    </button>


                    <h1 className="
                        text-violet-500
                        font-semibold
                        text-lg
                    ">
                        View Collection
                    </h1>

                </div>


                {/* RIGHT ACTIONS */}

                <div className="flex items-center gap-3">

                    <button
                        onClick={() => router.push(`/collection/${slug}/edit`)}
                        className="
                            h-9
                            px-4
                            rounded-lg
                            border
                            border-[#243247]
                            bg-[#0B1421]
                            hover:bg-[#111c2c]
                            text-sm
                            flex
                            items-center
                            gap-2
                            transition
                        "
                    >

                        <Pencil size={15} />

                        Edit Collection

                    </button>


                    <div className="relative">

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="
                                h-9
                                w-10
                                rounded-lg
                                border
                                border-[#243247]
                                bg-[#0B1421]
                                flex
                                items-center
                                justify-center
                                hover:bg-[#111c2c]
                            "
                        >

                            <MoreVertical size={18} />

                        </button>


                        {menuOpen && (

                            <div className="
                                absolute
                                right-0
                                top-11
                                z-50
                                w-40
                                rounded-lg
                                border
                                border-[#263448]
                                bg-[#0B1421]
                                p-1
                                shadow-2xl
                            ">

                                <button
                                    className="
                                        w-full
                                        text-left
                                        px-3
                                        py-2
                                        rounded-md
                                        text-sm
                                        hover:bg-white/5
                                        text-slate-300
                                    "
                                >
                                    Duplicate
                                </button>

                                <button
                                    className="
                                        w-full
                                        text-left
                                        px-3
                                        py-2
                                        rounded-md
                                        text-sm
                                        hover:bg-red-500/10
                                        text-red-400
                                    "
                                >
                                    Delete Collection
                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>


            {/* =========================
                COLLECTION INFO
            ========================= */}

            <div className="py-4">

                <div className="flex items-center gap-4">


                    {/* ICON */}

                    <div
                        className={`
                            h-[68px]
                            w-[72px]
                            shrink-0
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            ${iconColor}
                        `}
                    >

                        <Icon size={38} />

                    </div>


                    {/* TEXT */}

                    <div>

                        <h2 className="
                            text-xl
                            font-semibold
                            text-white
                        ">
                            {collectionName}
                        </h2>


                        <p className="
                            text-slate-400
                            text-sm
                            mt-0.5
                        ">
                            {description}
                        </p>


                        {/* META */}

                        <div className="
                            flex
                            items-center
                            gap-2
                            mt-2
                        ">

                            <span className="
                                flex
                                items-center
                                gap-1.5
                                border
                                border-[#1C2A3C]
                                bg-[#0B1421]
                                rounded-md
                                px-2
                                py-1
                                text-[11px]
                                text-slate-400
                            ">

                                <Wrench size={11} />

                                {data?.tools?.length || 0} tools

                            </span>


                            <span className="
                                border
                                border-[#1C2A3C]
                                bg-[#0B1421]
                                rounded-md
                                px-2
                                py-1
                                text-[11px]
                                text-slate-400
                            ">

                                Updated {formatDate(data?.updatedAt)}

                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* =========================
                SEARCH + CATEGORY
            ========================= */}

            <div className="
                flex
                gap-3
                mb-2
            ">


                {/* SEARCH */}

                <div className="relative flex-1">

                    <Search
                        size={16}
                        className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-500
                        "
                    />


                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search tools in this collection..."
                        className="
                            h-9
                            w-full
                            rounded-lg
                            border
                            border-[#1F2C40]
                            bg-[#0B1421]
                            pl-9
                            pr-4
                            text-sm
                            text-white
                            placeholder:text-slate-500
                            outline-none
                            focus:border-violet-600
                            transition
                        "
                    />

                </div>


                {/* CATEGORY */}

                <div className="
                    relative
                    w-[230px]
                    shrink-0
                ">

                    <button
                        onClick={() => setOpen(!open)}
                        className="
                            h-9
                            w-full
                            flex
                            items-center
                            justify-between
                            rounded-lg
                            border
                            border-[#1F2C40]
                            bg-[#0B1421]
                            px-3
                            text-sm
                        "
                    >

                        <span
                            className={
                                selected === "All Categories"
                                    ? "text-slate-300"
                                    : "text-white"
                            }
                        >
                            {selected}
                        </span>


                        <ChevronDown
                            size={16}
                            className={`
                                text-slate-500
                                transition
                                ${open ? "rotate-180" : ""}
                            `}
                        />

                    </button>


                    {/* DROPDOWN */}

                    {open && (

                        <div className="
                            absolute
                            z-50
                            top-11
                            left-0
                            w-full
                            max-h-64
                            overflow-y-auto
                            rounded-lg
                            border
                            border-[#25344A]
                            bg-[#0B1421]
                            p-1
                            shadow-2xl
                        ">

                            {categories.map((category) => (

                                <button
                                    key={category}
                                    onClick={() => {
                                        setSelected(category);
                                        setOpen(false);
                                    }}
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        justify-between
                                        px-3
                                        py-2
                                        rounded-md
                                        text-left
                                        text-sm
                                        text-slate-300
                                        hover:bg-violet-500/10
                                        hover:text-white
                                        transition
                                    "
                                >

                                    <span>
                                        {category}
                                    </span>


                                    {selected === category && (

                                        <Check
                                            size={15}
                                            className="text-violet-500"
                                        />

                                    )}

                                </button>

                            ))}

                        </div>

                    )}

                </div>

            </div>


            {/* =========================
                TOOL LIST
            ========================= */}

            <div className="space-y-1.5">

                {filteredTools.length > 0 ? (

                    filteredTools.map((tool, index) => (

                        <ToolRow
                            isSaved={favouritestools.includes(tool.title.toLowerCase())}
                            key={index}
                            tool={tool}
                        />

                    ))

                ) : (

                    <div className="
                        h-40
                        flex
                        flex-col
                        items-center
                        justify-center
                        border
                        border-[#172437]
                        rounded-xl
                        bg-[#0B1421]
                    ">

                        <Search
                            size={24}
                            className="text-slate-600 mb-2"
                        />

                        <p className="text-slate-400 text-sm">
                            No tools found
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}


/* =========================================================
   TOOL ROW
========================================================= */



function ToolRow({ tool, isSaved }) {

    const [saved, setSaved] = useState(false);
    const router = useRouter()

    useEffect(() => {
        setSaved(isSaved)
    }, [isSaved])


    const handleToggleFavouriteTools = async (title = "") => {

        setSaved((prev) => !prev)

        const response = await toggleFavouriteToolsAction(title);

        if (response.status === 401) {
            setSaved((prev) => !prev)
            return router.push('/login')
        }
        if (!response.success) {
            setSaved((prev) => !prev)
        }

    }


    const name =
        tool?.title ||
        "Unnamed Tool";


    const description =
        tool?.desc ||
        "Developer tool";


    const category =
        tool?.type ||
        "Development";


    const url =
        tool?.url ||
        tool?.link ||
        "#";


    return (

        <div className="
            group
            min-h-14.75
            px-3
            py-2
            rounded-lg
            border
            border-[#172437]
            bg-[#0B1421]
            hover:bg-[#0E1928]
            hover:border-[#24344A]
            flex
            items-center
            gap-3
            transition
        ">


            {/* TOOL ICON */}

            <div className="
                w-9
                h-9
                shrink-0
                rounded-lg
                bg-violet-600/20
                border
                border-violet-500/20
                flex
                items-center
                justify-center
                text-violet-400
            ">

                <FaCode size={17} />

            </div>


            {/* TOOL INFO */}

            <div className="
                min-w-0
                flex-1
            ">

                <h3 className="
                    text-sm
                    font-semibold
                    text-white
                    truncate
                ">
                    {name}
                </h3>


                <p className="
                    text-[11px]
                    text-slate-400
                    truncate
                    mt-0.5
                ">
                    {description}
                </p>

            </div>


            {/* CATEGORY */}

            <span className={`
                hidden
                sm:block
                shrink-0
                rounded-md
                px-2
                py-1
                text-[10px]
                ${tool.typeBg}
                ${tool.typeColor}
                border
                border-violet-500/10
            `}>
                {category}
            </span>


            {/* STAR */}

            <button
                onClick={() => handleToggleFavouriteTools(tool.title)}
                className="
                    shrink-0
                    w-8
                    h-8
                    rounded-md
                    flex
                    items-center
                    justify-center
                    hover:bg-white/5
                    transition
                "
            >

                <Star
                    size={17}
                    className={
                        saved
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-500"
                    }
                />

            </button>


            {/* EXTERNAL LINK */}

            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                    shrink-0
                    w-8
                    h-8
                    rounded-md
                    flex
                    items-center
                    justify-center
                    text-slate-400
                    hover:text-white
                    hover:bg-white/5
                    transition
                "
            >

                <ExternalLink size={16} />

            </a>

        </div>

    );
}


/* =========================================================
   SHIMMER
========================================================= */

const Shimmer = ({ className = "" }) => (

    <div
        className={`
            relative
            overflow-hidden
            bg-[#151e2d]
            rounded-md
            ${className}
        `}
    >

        <div
            className="
                absolute
                inset-0
                -translate-x-full
                animate-[shimmer_1.8s_infinite]
                bg-gradient-to-r
                from-transparent
                via-[#26344a]
                to-transparent
            "
        />

    </div>
);


/* =========================================================
   COLLECTION SHIMMER
========================================================= */

function CollectionShimmer() {

    return (

        <div className="
            min-h-screen
            bg-[#070e19]
            text-white
            px-6
        ">

            {/* Header */}

            <div className="
                h-[57px]
                flex
                items-center
                justify-between
                border-b
                border-[#182437]
            ">

                <div className="flex items-center gap-8">

                    <Shimmer className="w-7 h-7 rounded-full" />

                    <Shimmer className="w-40 h-6" />

                </div>


                <div className="flex items-center gap-3">

                    <Shimmer className="w-36 h-9 rounded-lg" />

                    <Shimmer className="w-10 h-9 rounded-lg" />

                </div>

            </div>


            {/* Collection info */}

            <div className="py-5">

                <div className="flex gap-4">

                    <Shimmer className="w-[72px] h-[68px] rounded-xl" />

                    <div className="space-y-2">

                        <Shimmer className="w-52 h-6" />

                        <Shimmer className="w-80 h-4" />

                        <div className="flex gap-2 pt-1">

                            <Shimmer className="w-20 h-6 rounded-md" />

                            <Shimmer className="w-28 h-6 rounded-md" />

                        </div>

                    </div>

                </div>

            </div>


            {/* Search */}

            <div className="flex gap-3 mb-2">

                <Shimmer className="flex-1 h-9 rounded-lg" />

                <Shimmer className="w-[230px] h-9 rounded-lg" />

            </div>


            {/* Tools */}

            <div className="space-y-1.5">

                {[1, 2, 3, 4, 5].map((item) => (

                    <div
                        key={item}
                        className="
                            h-[59px]
                            px-3
                            rounded-lg
                            border
                            border-[#172437]
                            bg-[#0B1421]
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <Shimmer className="w-9 h-9 rounded-lg" />

                        <div className="flex-1 space-y-2">

                            <Shimmer className="w-36 h-3.5" />

                            <Shimmer className="w-64 h-2.5" />

                        </div>

                        <Shimmer className="w-20 h-6 rounded-md" />

                        <Shimmer className="w-7 h-7 rounded-md" />

                        <Shimmer className="w-7 h-7 rounded-md" />

                    </div>

                ))}

            </div>

        </div>
    );
}