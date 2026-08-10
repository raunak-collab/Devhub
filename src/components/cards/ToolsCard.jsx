import { IoBookmarkOutline, IoStar } from "react-icons/io5"
import { CiStar } from "react-icons/ci";
import { ArrowRight } from "lucide-react";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { savedToolsAction, unsavedToolsAction } from "@/action/userAction";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function ToolsCard({
    title,
    desc,
    icon,
    type,
    typeBg,
    typeColor
}) {

    const [save, setSave] = useState(false)

    const router = useRouter()

    const handleSaveTools = async (title) => {
        const response = await savedToolsAction(title);

        if (response.status === 401) {
            return router.push('/login')
        } else {
            setSave(true)
        }
    }

    const handleUnSaveTools = async (title) => {
        const response = await unsavedToolsAction(title);

        if (response.status === 401) {
            return router.push('/login')
        } else {
            setSave(false)
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
            <div className="flex  justify-between mb-3">
                {icon}
                <div className="flex h-6 gap-3.5 items-center text-slate-300">
                    <button type="button">
                        <CiStar size={24} />
                    </button>
                    {save ? (
                        <button onClick={() => handleUnSaveTools(title)} className="cursor-pointer" type="button">
                            <PiBookmarkSimpleFill size={21} />
                        </button>) :
                        (
                            <button onClick={() => handleSaveTools(title)} className="cursor-pointer" type="button">
                                <IoBookmarkOutline size={21} />
                            </button>
                        )
                    }
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
                href={`/tools/${title.toLowerCase().replace(" ", "-")}`}
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