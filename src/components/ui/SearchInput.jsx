'use client'

import { Search } from "lucide-react";
import { useRef } from "react";
import useCtrlk from "../../hooks/useCtrlK";

export default function SearchInput({ placeholder, onChange, search, onKeyDown }) {
  const inputRef = useRef(null)

  useCtrlk(() => {
    inputRef.current.focus()
  })

  return (
    <div className="relative w-full">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        value={search}
        ref={inputRef}
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-[#1F2937] bg-[#0B1220] pl-11 pr-16 text-sm text-white placeholder:text-slate-500 placeholder:text-xs sm:placeholder:text-sm outline-none transition focus:border-violet-600"
      />

      <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-[#374151] bg-[#111827] px-2 py-1 text-[11px] text-gray-400">
        Ctrl K
      </div>

    </div>
  );
}