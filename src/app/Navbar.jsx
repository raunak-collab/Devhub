"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import SearchInput from "../components/ui/SearchInput";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import HandleSearch from "../utils/HandleSearch";
import { logoutAction } from "../action/userAction";
import { useAuth } from "../app/context/AuthContext";
import { signOut, useSession } from "next-auth/react";

function NavbarContent() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const params = new URLSearchParams(searchParams);

    const { loading, user, logout } = useAuth();

    const { data: session } = useSession()

    const handleLogout = async () => {
        if (session !== null) {
            logout()
            await signOut({ redirectTo: "/login" })
        }
        else {
            const response = await logoutAction();

            if (response.success) {
                logout()
                router.push("/login");
            }
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const submitSearch = (e) => {
        if (e.key === "Enter") {
            HandleSearch(router, search, params);
            setOpen(false);
        }
    };

    const Tools = pathname.split("/").slice(0, 2).join("/")

    return (
        <>
            <header className="sticky top-5 z-50 border rounded-2xl bg-[#080F1D]  border-[#1F2937] backdrop-blur-md mx-5.5">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                    {/* Logo */}
                    <Link href="/" className="flex gap-2.5 items-center">
                        <Image
                            src="/images/logo.png"
                            width={30}
                            height={30}
                            alt="DevHub"
                            className=""
                        />
                        <span className="text-white text-[22px] font-semibold tracking-[-0.5px]">
                            Dev<span className="text-violet-500">Hub</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-7 text-sm text-slate-400 lg:flex">

                        <Link
                            href="/"
                            className={`relative transition-all duration-300 hover:text-white ${pathname === "/" ? "text-white" : ""
                                }`}
                        >
                            Home

                            {pathname === "/" && (
                                <span className="absolute left-0 top-10 h-0.5 w-full rounded-full bg-violet-600" />
                            )}
                        </Link>

                        <Link
                            href="/tools"
                            className={`relative transition-all duration-300 hover:text-white ${Tools === "/tools" ? "text-white" : ""
                                }`}
                        >
                            Tools

                            {Tools === "/tools" && (
                                <span className="absolute left-0 top-10 h-0.5 w-full rounded-full bg-violet-600" />
                            )}
                        </Link>

                        <Link
                            href="/dashboard"
                            className={`relative transition-all duration-300 hover:text-white ${pathname.includes("/dashboard") ? "text-white" : ""
                                }`}
                        >
                            Dashboard

                            {pathname.includes("/dashboard") && (
                                <span className="absolute left-0 top-10 h-0.5 w-full rounded-full bg-violet-600" />
                            )}
                        </Link>

                        <Link
                            href="/about"
                            className={`relative transition-all duration-300 hover:text-white ${pathname === "/about" ? "text-white" : ""
                                }`}
                        >
                            About

                            {pathname === "/about" && (
                                <span className="absolute left-0 top-10 h-0.5 w-full rounded-full bg-violet-600" />
                            )}
                        </Link>

                        <Link
                            href="/pricing"
                            className={`relative transition-all duration-300 hover:text-white ${pathname === "/pricing" ? "text-white" : ""
                                }`}
                        >
                            Pricing

                            {pathname === "/pricing" && (
                                <span className="absolute left-0 top-10 h-0.5 w-full rounded-full bg-violet-600" />
                            )}
                        </Link>

                    </nav>

                    {/* Desktop Search */}
                    <div className="hidden max-w-sm md:block lg:mx-8">
                        <SearchInput
                            search={search}
                            onChange={handleSearch}
                            onKeyDown={submitSearch}
                            placeholder="Search tools..."
                        />
                    </div>

                    {/* Desktop Auth */}
                    {loading ? (
                        <div className="hidden w-20 lg:block" />
                    ) : user ? (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="hidden rounded-md border border-[#1F2937] px-4 py-2 text-sm text-white transition-all duration-300 hover:border-violet-500/40 lg:block"
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="hidden items-center gap-3 text-white lg:flex">
                            <Link
                                href="/login"
                                className="rounded-md border border-[#1F2937] px-4 py-2 text-sm transition-all duration-300 hover:border-violet-500/40"
                            >
                                Log in
                            </Link>

                            <Link
                                href="/signup"
                                className="rounded-md bg-violet-600 px-4 py-2 text-sm transition-all duration-300 hover:bg-violet-500"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="text-white lg:hidden"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X size={28} /> : <Menu size={28} />}
                    </button>

                </div>
            </header>

            {/* Mobile Drawer */}
            <div
                className={`fixed left-0 top-22  z-50  h-[calc(100vh-4rem)] w-full overflow-y-auto bg-[#0B1020] transition-all duration-300 lg:hidden ${open
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                    }`}
            >
                <div className="space-y-5 p-5 text-slate-400">

                    <Link
                        onClick={() => setOpen(false)}
                        href="/"
                        className="block"
                    >
                        Home
                    </Link>

                    <Link
                        onClick={() => setOpen(false)}
                        href="/tools"
                        className="block"
                    >
                        Tools
                    </Link>

                    <Link
                        onClick={() => setOpen(false)}
                        href="/dashboard"
                        className="block"
                    >
                        Dashboard
                    </Link>

                    <Link
                        onClick={() => setOpen(false)}
                        href="/about"
                        className="block"
                    >
                        About
                    </Link>

                    <Link
                        onClick={() => setOpen(false)}
                        href="/pricing"
                        className="block"
                    >
                        Pricing
                    </Link>

                    {/* Mobile Auth */}
                    <div className="flex flex-col items-center gap-3 text-white">

                        {user ? (
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full rounded-md border border-[#1F2937] px-4 py-2 text-center text-sm"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link
                                    onClick={() => setOpen(false)}
                                    className="w-full rounded-md border border-[#1F2937] px-4 py-2 text-center text-sm"
                                    href="/login"
                                >
                                    Log in
                                </Link>

                                <Link
                                    onClick={() => setOpen(false)}
                                    href="/signup"
                                    className="w-full rounded-md bg-violet-600 px-4 py-2 text-center text-sm"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}

                    </div>

                </div>
            </div>
        </>
    );
}


export default function Navbar() {
    return (
        <Suspense fallback={null}>
            <NavbarContent />
        </Suspense>
    );
}