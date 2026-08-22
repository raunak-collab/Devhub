
import { toggleSavedToolsAction } from "@/action/userAction";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { IoBookmarkOutline } from "react-icons/io5";
import { PiBookmarkSimpleFill } from "react-icons/pi";

export default function SavedToolsCard({
    title,
    desc,
    icon,
    type,
    typeBg,
    isSaved,
    onUnsave,
    typeColor
}) {

    const [save, setSave] = useState(true)

    useEffect(() => {
        setSave(isSaved)
    }, [isSaved])


    const handleToggleSaveTools = async (title) => {

        setSave((prev) => !prev)

        const response = await toggleSavedToolsAction(title);

        if (response.status === 401) {
            setSave((prev) => !prev)
            return router.push('/login')
        }
        if (!response.success) {
            setSave((prev) => !prev)
        }

        onUnsave?.(title)

    }


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

                <div className="flex items-center gap-4">

                    {/* Icon */}
                    <div className="flex  justify-between">
                        {icon}
                    </div>

                    <div className="flex flex-col gap-1">
                        <h2 className="font-medium text-[15px] text-slate-100">
                            {title}
                        </h2>

                        {/* Type */}
                        <p
                            className={`
                                 w-fit
                  
                    rounded-md
                    px-2
                    py-1
                    text-[11px]
                    font-medium
                    ${typeBg}
                    ${typeColor}
                `}
                        >
                            {type}
                        </p>
                    </div>
                </div>

                <button
                    aria-label="Remove bookmark"
                    onClick={() => handleToggleSaveTools(title)}
                    className="
                        rounded-md p-2
                        text-slate-400
                        transition
                        hover:bg-white/5
                        hover:text-white
                    "
                >
                    {save ? <PiBookmarkSimpleFill size={21} /> : <IoBookmarkOutline size={21} />}
                </button>
            </div>

            {/* Description */}
            <p className="mt-5 min-h-10.5 text-sm leading-6 text-slate-400">
                {desc}
            </p>

            <div className="my-4 border-t border-slate-800" />

            {/* Bottom */}
            <div className="flex items-center justify-between">

                <span className="text-xs text-slate-500">
                    Saved tool
                </span>

                <Link
                    href={title.toLowerCase().replace(" ", "-")}
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