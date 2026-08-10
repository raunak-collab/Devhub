import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <>
            <footer className="py-10 border-b border-[#1F2937]">
                <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">

                    <div className="flex flex-col lg:flex-row justify-between gap-12">

                        {/* Left Section */}
                        <div className="max-w-xs">
                            <Image
                                src="/images/DevHub.png"
                                width={150}
                                height={40}
                                alt="DevHub"
                            />

                            <p className="mt-4 text-sm leading-7 text-gray-400">
                                All developer tools in one place.
                                <br />
                                Fast, Free and always accessible.
                            </p>

                            <div className="flex gap-3 mt-6">
                                <Link
                                    href="https://github.com/raunak-collab"
                                    target="_blank"
                                    className="p-2 rounded-full bg-violet-600 transition-all duration-300 hover:bg-violet-500"
                                >
                                    <FaGithub size={18} color="white" />
                                </Link>

                                <Link
                                    href="https://www.linkedin.com/in/raunak-raza-7172a1315/"
                                    target="_blank"
                                    className="p-2 rounded-full bg-violet-600 transition-all duration-300 hover:bg-violet-500"
                                >
                                    <FaLinkedin size={18} color="white" />
                                </Link>
                            </div>
                        </div>

                        {/* Middle Section */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 lg:gap-16">

                            <div>
                                <h3 className="text-white font-medium mb-4">Tools</h3>

                                <div className="flex flex-col gap-2 text-sm text-gray-400">
                                    <Link className="hover:text-white transition" href="/">All Tools</Link>
                                    <Link className="hover:text-white transition" href="/">Popular Tools</Link>
                                    <Link className="hover:text-white transition" href="/">New Tools</Link>
                                    <Link className="hover:text-white transition" href="/">Request a Tool</Link>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white font-medium mb-4">Support</h3>

                                <div className="flex flex-col gap-2 text-sm text-gray-400">
                                    <Link className="hover:text-white transition" href="/">Contact</Link>
                                    <Link className="hover:text-white transition" href="/">FAQ</Link>
                                    <Link className="hover:text-white transition" href="/">Request a Tool</Link>
                                    <Link className="hover:text-white transition" href="/">Report a Bug</Link>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white font-medium mb-4">Legal</h3>

                                <div className="flex flex-col gap-2 text-sm text-gray-400">
                                    <Link className="hover:text-white transition" href="/">Privacy Policy</Link>
                                    <Link className="hover:text-white transition" href="/">Terms of Service</Link>
                                    <Link className="hover:text-white transition" href="/">Disclaimer</Link>
                                </div>
                            </div>

                        </div>

                        {/* Right Section */}
                        <div className="w-full sm:w-60 lg:shrink-0 rounded-xl border border-[#1F2937] bg-[#09101f] p-5">

                            <h2 className="text-white text-[16px] font-semibold">
                                Stay Updated
                            </h2>

                            <p className="mt-2 mb-4 text-sm text-gray-400">
                                Get notified when new tools are added.
                            </p>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full h-10 rounded-md border border-[#1F2937] bg-[#0B1220] px-4 text-sm text-white placeholder:text-gray-500 outline-none focus:border-violet-600"
                            />

                            <button className="mt-4 w-full rounded-md bg-violet-600 py-2 text-white font-medium transition-all duration-300 hover:bg-violet-500">
                                Subscribe
                            </button>

                        </div>

                    </div>

                    <div></div>
                </div>
            </footer>
            <div className="flex justify-between px-11 text-slate-500 h-20 items-center">
                <p>© 2026 DevHub. All rights reserved.</p>
                <p>Made with ❤️ for developers</p>
            </div>
        </>
    );
}