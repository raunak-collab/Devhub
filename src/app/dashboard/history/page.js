"use client";

import { FaHistory } from "react-icons/fa";
import {
    Braces,
    KeyRound,
    ShieldCheck,
    Fingerprint,
    QrCode,
} from "lucide-react"
import { MdDeleteOutline } from "react-icons/md";


const historyData = {
    Today: [
        {
            name: "JSON Formatter",
            icon: Braces,
            iconColor: "text-white",
            iconBg: "bg-violet-600",
            time: "2 mins ago",
            href: "/tools/json-formatter",
        },
        {
            name: "Password Generator",
            icon: KeyRound,
            iconColor: "text-white",
            iconBg: "bg-amber-600",
            time: "10 mins ago",
            href: "/tools/password-generator",
        },
        {
            name: "JWT Decoder",
            icon: ShieldCheck,
            iconColor: "text-white",
            iconBg: "bg-cyan-600",
            time: "25 mins ago",
            href: "/tools/jwt-decoder",
        },
    ],
    Yesterday: [
        {
            name: "Regex Tester",
            icon: Fingerprint,
            iconColor: "text-white",
            iconBg: "bg-emerald-600",
            time: "1 hour ago"
        },
        {
            name: "SQL Formatter",
            icon: QrCode,
            iconColor: "text-white",
            iconBg: "bg-orange-600",
            time: "2 hours ago"
        },
    ],
};

export default function HistoryPage() {
    return (
        <section className="min-h-full px-4 py-6 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                        History
                    </h1>

                    <p className="mt-1 text-sm text-slate-400">
                        Recently used tools.
                    </p>
                </div>

                <button
                    className="
                        flex w-fit items-center gap-2
                        rounded-lg border border-slate-700
                        bg-[#0B1425]
                        px-4 py-2
                        text-sm text-slate-300
                        transition
                        hover:border-red-500/40
                        hover:bg-red-500/5
                        hover:text-red-400
                    "
                >
                    <MdDeleteOutline size={19} />
                    Clear History
                </button>
            </div>

            {/* History */}
            <div className="space-y-7">
                {Object.entries(historyData).map(([day, tools]) => (
                    <div key={day}>

                        {/* Day */}
                        <h2 className="mb-3 text-sm font-medium text-slate-300">
                            {day}
                        </h2>

                        {/* Tool List */}
                        <div className="overflow-hidden rounded-lg border border-slate-800 bg-[#0B1421]">
                            {tools.map(({ name, icon: Icon, iconBg, iconColor, time }, index) => (
                                <div
                                    key={name}
                                    className={`
                                        flex items-center justify-between
                                        px-4 py-3.5
                                        transition
                                        hover:bg-white/3
                                        sm:px-5
                                        ${index !== tools.length - 1
                                            ? "border-b border-slate-800"
                                            : ""
                                        }
                                    `}
                                >
                                    {/* Tool info */}
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div
                                            className={`
                                                flex h-8 w-8 shrink-0
                                                items-center justify-center
                                                rounded-md
                                                ${iconBg} ${iconColor}
                                                text-sm
                                            `}
                                        >
                                            <Icon />
                                        </div>

                                        <span className="truncate text-sm font-medium text-slate-200">
                                            {name}
                                        </span>
                                    </div>

                                    {/* Time */}
                                    <span className="ml-4 shrink-0 text-xs text-slate-500 sm:text-sm">
                                        {time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state - later */}
            {/* 
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <FaHistory size={40} className="mb-4 text-slate-600" />
                <h2 className="text-lg font-medium text-slate-300">
                    No history yet
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Tools you use will appear here.
                </p>
            </div>
            */}
        </section>
    );
}