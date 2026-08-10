import Image from "next/image";
import React from "react";

export default function StatsCard({ src, title,  desc, ratio, height }) {

    return (
        <div
            className={`group hover:shadow-[0_0_30px_rgba(101,58,219,0.3)] relative rounded-xl border-r border-[#1F2937] p-5 transition-all duration-300 hover:-translate-y-1 flex flex-col sm:w-full items-center  ${height}`}
        >
                <Image className="mb-3  rounded-sm transition-transform duration-300 group-hover:scale-110" src={src} width={35} height={35} alt="tool" />
                <h4 className={`mt-1 text-white text-sm font-medium`}>
                    {title}
                </h4>
                <p className="text-xs leading-5 sm:text-[13px] mt-2 text-center">{desc}</p>
        </div>
    );
}
