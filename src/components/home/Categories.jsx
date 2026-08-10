import {
    ArrowRight,
    Braces,
    KeyRound,
    ShieldCheck,
    RefreshCcw,
    Image,
    Webhook,
    Code2,
    Wrench,
    Network
} from "lucide-react";

import Link from "next/link";
import CategoryCard from "../cards/CategoryCard";

export default function Categories() {
    const categories = [
        {
            title: "Formatting",
            desc: "12 Tools",
            icon: Braces,
            iconColor: "text-white",
            iconBg: "bg-violet-500",
        },
        {
            title: "Network",
            desc: "18 Tools",
            icon: Network,
            iconColor: "text-white",
            iconBg: "bg-amber-500",
        },
        {
            title: "Security",
            desc: "14 Tools",
            icon: ShieldCheck,
            iconColor: "text-white",
            iconBg: "bg-red-500",
        },
        {
            title: "Conversion",
            desc: "15 Tools",
            icon: RefreshCcw,
            iconColor: "text-white",
            iconBg: "bg-cyan-500",
        },
        {
            title: "Images",
            desc: "10 Tools",
            icon: Image,
            iconColor: "text-white",
            iconBg: "bg-pink-500",
        },
        {
            title: "API",
            desc: "12 Tools",
            icon: Webhook,
            iconColor: "text-white",
            iconBg: "bg-blue-500",
        },
        {
            title: "Development",
            desc: "12 Tools",
            icon: Code2,
            iconColor: "text-white",
            iconBg: "bg-emerald-500",
        },
        {
            title: "Utilities",
            desc: "8 Tools",
            icon: Wrench,
            iconColor: "text-white",
            iconBg: "bg-orange-500",
        },
    ];

    return (
        <section className="border-b border-[#1F2937] py-6">

            {/* Header */}
            <div className="mx-auto mb-5 flex max-w-7xl justify-between px-6">

                <div className="flex items-center gap-2">
                    <div className="h-6 w-1 rounded-full bg-yellow-500" />

                    <h2 className="text-xl font-bold text-white">
                        Browse by Categories
                    </h2>
                </div>

                <Link
                    href="/categories"
                    className="flex items-center gap-1.5 px-3 text-sm text-violet-600 transition-all duration-300 hover:text-white"
                >
                    View all categories

                    <ArrowRight size={15} />
                </Link>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 gap-3.5 px-9 sm:grid-cols-4 lg:grid-cols-8">

                {categories.map(
                    ({
                        title,
                        desc,
                        icon: Icon,
                        iconColor,
                        iconBg,
                    }) => (
                        <Link
                            href={`/tools?category=${title.toLowerCase()}`}
                            key={title}
                        >
                            <CategoryCard
                                title={title}
                                desc={desc}
                                icon={
                                    <div
                                        className={`
                                            flex h-11 w-11
                                            items-center justify-center
                                            rounded-lg
                                            ${iconBg}
                                        `}
                                    >
                                        <Icon
                                            size={22}
                                            strokeWidth={1.8}
                                            className={iconColor}
                                        />
                                    </div>
                                }
                            />
                        </Link>
                    )
                )}

            </div>
        </section>
    );
}