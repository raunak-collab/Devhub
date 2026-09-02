'use client'

import { IoBookmarkOutline} from "react-icons/io5"
import { FaRegStar } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { toggleFavouriteToolsAction, toggleSavedToolsAction } from "@/action/userAction";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaStar } from "react-icons/fa";



export default function ToolsCard({
    title,
    desc,
    icon,
    type,
    typeBg,
    isSaved,
    isFavourites,
    typeColor
}) {

    const [save, setSave] = useState(false)
    const [favourites, setFavourites] = useState(false)

    const router = useRouter()
    
    useEffect(() => {
        setSave(isSaved)
    }, [isSaved])

    useEffect(() => {
        setFavourites(isFavourites)
    }, [isFavourites])


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

    }

    const handleToggleFavouriteTools = async (title) => {

        setFavourites((prev) => !prev)

        const response = await toggleFavouriteToolsAction(title);

        if (response.status === 401) {
            setFavourites((prev) => !prev)
            return router.push('/login')
        }
        if (!response.success) {
            setFavourites((prev) => !prev)
        }

    }


    return (
        <div
            className={`
                h-45
                rounded-xl
                border border-slate-800
                bg-[#0B1421]
                p-4
                transition-all duration-300
                hover:-translate-y-1
                hover:border-slate-700
                hover:bg-[#0E1728]
                relative
                
            `}
        >
            {/* Icon */}
            <div className="flex justify-between mb-3">
                {icon}
                <div className="flex h-6 gap-3.5 items-center text-slate-300">
                    <button type="button" onClick={() => handleToggleFavouriteTools(title)}>
                        {favourites ? <FaStar size={21} /> : <FaRegStar size={21} />}
                    </button>

                    <button onClick={() => handleToggleSaveTools(title)}
                        className="cursor-pointer" type="button">
                        {save ? <PiBookmarkSimpleFill size={21} /> : <IoBookmarkOutline size={21} />}
                    </button>

                </div>
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-white">
                {title}
            </h3>

            {/* Description */}
            <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-400">
                {desc}
            </p>


            {/* Type */}
            <p
                className={`
                    mt-3
                    inline-flex
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
            <Link
                href={`/tools/${title.toLowerCase().replaceAll(" ", "-")}`}
                className="absolute bottom-2.5
              right-3.5 text-sm text-violet-500 
              flex gap-1.5 hover:text-white 
              transition-all duration-300">
                Use tool
                <ArrowRight
                    size={18} />
            </Link>
        </div>
    );
}