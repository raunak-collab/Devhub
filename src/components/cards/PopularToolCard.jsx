import { ArrowRight } from "lucide-react";

export default function ToolCard({
    title,
    desc,
    icon
}) {
    return (
        <div
            className={`
                h-44
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
            <div className="mb-3">
                {icon}
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-white">
                {title}
            </h3>

            {/* Description */}
            <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-400">
                {desc}
            </p>
            <ArrowRight className="text-violet-500 transition-all duration-300 hover:text-white absolute bottom-3 right-4" size={19}/>
        </div>
    );
}