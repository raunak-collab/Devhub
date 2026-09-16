"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { GoHome } from "react-icons/go";
import { FaHistory, FaRegBookmark, FaRegStar } from "react-icons/fa";
import { LuFolderClosed, LuMenu, LuX } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineWorkHistory } from "react-icons/md";

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        {
            href: "/dashboard/overview",
            label: "Overview",
            icon: <GoHome size={24} />,
        },
        {
            href: "/dashboard/savedtools",
            label: "Saved Tools",
            icon: <FaRegBookmark size={19} />,
        },
        {
            href: "/dashboard/favourites",
            label: "Favourites",
            icon: <FaRegStar size={22} />,
        },
        {
            href: "/dashboard/history",
            label: "History",
            icon: <FaHistory size={20} />,
        },
        {
            href: "/dashboard/collections",
            label: "Collections",
            icon: <LuFolderClosed size={21} />,
        },
        {
            href: "/dashboard/apitesterhistory",
            label: "API Tester History",
            icon: <MdOutlineWorkHistory size={22} />,
        },
        {
            href: "/dashboard/settings",
            label: "Settings",
            icon: <IoMdSettings size={21} />,
        },
    ];

    return (
        <div className="mt-5">
            {/* Mobile / Tablet Menu Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed left-6 top-22 z-50 rounded-md border border-slate-700 bg-[#0B1220] p-2.5 text-slate-300 transition hover:bg-white/5 lg:hidden"
                    aria-label="Open sidebar"
                >
                    <LuMenu size={22} />
                </button>
            )}

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed left-0 top-21.5 z-50 w-64
                    border rounded-2xl border-slate-800/70
                    bg-[#080F1D] 
                    transition-transform duration-300 ease-in-out
                    lg:static lg:z-auto lg:block lg:w-60
                    lg:translate-x-0 lg:ml-5 lg:mt-0
                    ${isOpen ? "translate-x-0 ml-5 mt-5" : "-translate-x-full"}
                `}
            >
                {/* Mobile Close Button */}
                <div className="flex justify-end px-4 pt-4 lg:hidden">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-md p-2 text-slate-400 hover:bg-white/5 hover:text-white"
                        aria-label="Close sidebar"
                    >
                        <LuX size={22} />
                    </button>
                </div>

                <nav className="flex flex-col gap-3 px-3 py-6 text-slate-400">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`
                                flex items-center gap-4 rounded-md
                                px-5 py-2.5
                                transition-all duration-300
                                ${pathname.split('/').slice(0, 3).join('/') === link.href
                                    ? "bg-[#101D3A] text-white"
                                    : "hover:bg-white/5 hover:text-slate-300"
                                }
                            `}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </aside>
        </div>
    );
}