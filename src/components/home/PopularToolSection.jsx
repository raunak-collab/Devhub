import {
    Flame,
    ArrowRight,
    Braces,
    KeyRound,
    ShieldCheck,
    Regex,
    Fingerprint,
    QrCode,
} from "lucide-react";

import ToolCard from "../cards/PopularToolCard";
import Link from "next/link";

export default function PopularToolSection() {
    const popularTools = [
        {
            title: "JSON Formatter",
            desc: "Format, validate and beautify JSON data",
            icon: Braces,
            iconColor: "text-white",
            iconBg: "bg-violet-600",
        },
        {
            title: "Password Generator",
            desc: "Generate strong and secure passwords",
            icon: KeyRound,
            iconColor: "text-white",
            iconBg: "bg-amber-600",
        },
        {
            title: "JWT Decoder",
            desc: "Decode and verify JWT tokens",
            icon: ShieldCheck,
            iconColor: "text-white",
            iconBg: "bg-cyan-600",
        },
        {
            title: "Regex Tester",
            desc: "Test and debug regular expressions",
            icon: Regex,
            iconColor: "text-white",
            iconBg: "bg-pink-600",
        },
        {
            title: "UUID Generator",
            desc: "Generate unique UUIDs instantly",
            icon: Fingerprint,
            iconColor: "text-white",
            iconBg: "bg-emerald-600",
        },
        {
            title: "QR Code Generator",
            desc: "Generate QR codes for any text or URL",
            icon: QrCode,
            iconColor: "text-white",
            iconBg: "bg-orange-600",
        },
    ];

    return (
        <section className="border-b border-[#1F2937] py-6">

            {/* Header */}
            <div className="mx-auto mb-4 flex max-w-7xl justify-between px-6">

                <div className="flex items-center gap-2">
                    <Flame
                        size={20}
                        className="text-pink-500"
                        fill="currentColor"
                    />

                    <h2 className="text-xl font-bold text-white">
                        Popular Tools
                    </h2>
                </div>

                <Link
                    href="/tools"
                    className="flex items-center gap-1.5 px-3 text-sm text-violet-600 transition-all du-white hover:text-white"
                >
                    View all tools

                    <ArrowRight size={15} />
                </Link>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 gap-3.5 px-9 sm:grid-cols-3 xl:grid-cols-6">

                {popularTools.map(
                    ({
                        title,
                        desc,
                        icon: Icon,
                        iconColor,
                        iconBg,
                    }) => (
                        <Link
                            href={`/tools/${title
                                .toLowerCase()
                                .replaceAll(" ", "-")}`}
                            key={title}
                        >
                            <ToolCard
                                title={title}
                                desc={desc}
                                icon={
                                    <div
                                        className={`flex h-11 w-11 items-center justify-center rounded-lg ${iconBg}`}
                                    >
                                        <Icon
                                            size={23}
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