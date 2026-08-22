import Link from "next/link";
import { FaStar } from "react-icons/fa6";

export default function FavouritesCard({ title, desc, icon }) {
    return (
        <Link
            href="/"
            className="
                group
                flex min-h-[120px] w-full
                items-start justify-between
                gap-4
                rounded-lg
                border border-[#1F2937]
                bg-[#0A101C]
                p-5
                transition-all duration-300
                hover:border-violet-600
                hover:shadow-[0_0_30px_rgba(101,58,219,0.3)]
            "
        >
            {/* Left */}
            <div className="flex min-w-0 flex-1 items-start gap-5">

                {/* Icon */}
                <div className="shrink-0">
                    {icon}
                </div>

                {/* Content */}
                <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold text-slate-300">
                        {title}
                    </h2>

                    <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-slate-400">
                        {desc}
                    </p>
                </div>
            </div>

            {/* Star */}
            <div className="shrink-0 mt-1">
                <FaStar
                    size={20}
                    className="text-yellow-400 transition-transform duration-300 group-hover:scale-110"
                />
            </div>
        </Link>
    );
}