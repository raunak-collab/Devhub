import Image from "next/image";
import Link from "next/link";
import { FiBookmark, FiExternalLink } from "react-icons/fi";

export default function SavedToolsCard({
    src,
    heading,
    title,
    category,
}) {
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

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-800 bg-[#101827]">
                        <Image
                            src={src}
                            width={30}
                            height={30}
                            alt={heading}
                            className="object-contain"
                        />
                    </div>

                    <div>
                        <h2 className="font-medium text-slate-100">
                            {heading}
                        </h2>

                        <span className="text-xs text-slate-500">
                            {category}
                        </span>
                    </div>
                </div>

                <button
                    aria-label="Remove bookmark"
                    className="
                        rounded-md p-2
                        text-slate-400
                        transition
                        hover:bg-white/5
                        hover:text-white
                    "
                >
                    <FiBookmark size={18} />
                </button>
            </div>

            {/* Description */}
            <p className="mt-5 min-h-[42px] text-sm leading-6 text-slate-400">
                {title}
            </p>

            <div className="my-4 border-t border-slate-800" />

            {/* Bottom */}
            <div className="flex items-center justify-between">

                <span className="text-xs text-slate-500">
                    Saved tool
                </span>

                <Link
                    href="#"
                    className="
                        flex items-center gap-1.5
                        text-xs font-medium
                        text-purple-400
                        transition
                        hover:text-purple-300
                    "
                >
                    Open Tool
                    <FiExternalLink size={14} />
                </Link>
            </div>
        </div>
    );
}