'use client'
import { createCollectionAction } from '@/action/userAction';
import Input from '@/components/ui/Input'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {
  FaCode,
  FaDatabase,
  FaShieldAlt,
  FaPalette,
  FaTerminal,
  FaGlobe,
  FaMobileAlt,
  FaServer,
  FaCloud,
  FaCog,
  FaNetworkWired,
} from "react-icons/fa";
import { FiSearch } from 'react-icons/fi';

import { LuFolder } from "react-icons/lu";

const CollectionIcon = [
  {
    icon: FaCode,
    color: "bg-violet-600/20 text-violet-400",
  },
  {
    icon: LuFolder,
    color: "bg-blue-600/20 text-blue-400",
  },
  {
    icon: FaDatabase,
    color: "bg-emerald-600/20 text-emerald-400",
  },
  {
    icon: FaShieldAlt,
    color: "bg-orange-600/20 text-orange-400",
  },
  {
    icon: FaPalette,
    color: "bg-pink-600/20 text-pink-400",
  },
  {
    icon: FaNetworkWired,
    color: "bg-purple-600/20 text-purple-400",
  },
  {
    icon: FaTerminal,
    color: "bg-yellow-600/20 text-yellow-400",
  },
  {
    icon: FaGlobe,
    color: "bg-indigo-600/20 text-indigo-400",
  },
  {
    icon: FaMobileAlt,
    color: "bg-red-600/20 text-red-400",
  },
  {
    icon: FaServer,
    color: "bg-teal-600/20 text-teal-400",
  },
  {
    icon: FaCloud,
    color: "bg-sky-600/20 text-sky-400",
  },
  {
    icon: FaCog,
    color: "bg-gray-600/20 text-gray-400",
  },
];

export const AllToolTitles = [
  "JSON Formatter",
  "Password Generator",
  "JWT Decoder",
  "Regex Tester",
  "UUID Generator",
  "QR Code Generator",
  "XML Formatter",
  "YAML Formatter",
  "CSV to JSON",
  "Markdown Previewer",
  "Color Converter",
  "HTTP Status Checker",
  "HTML Minifier",
  "CSS Minifier",
  "Text Case Converter",
  "IP Address Lookup",
  "JSON Validator",
  "JSON to CSV",
  "JSON to XML",
  "HTML Formatter",
  "JavaScript Formatter",
  "CSS Formatter",
  "JavaScript Minifier",
  "CSS Beautifier",
  "Base64 Image Decoder",
  "URL Parser",
  "URL Shortener",
  "URL Query Builder",
  "HTTP Header Parser",
  "HTTP Request Builder",
  "API Response Formatter",
  "API Mock Generator",
  "REST API Tester",
  "GraphQL Query Builder",
  "GraphQL Formatter",
  "SHA256 Generator",
  "SHA512 Generator",
  "HMAC Generator",
  "JWT Generator",
  "JWT Inspector",
  "Token Generator",
  "Encryption Tool",
  "RSA Key Generator",
  "Password Strength Checker",
  "Secret Key Generator",
  "Unix Timestamp Generator",
  "Date Difference Calculator",
  "Time Zone Converter",
  "Number Base Converter",
  "Binary Converter",
  "Hex Converter",
  "Bytes Converter",
  "Image Format Converter",
  "SVG Optimizer",
  "Image Resizer",
  "Lorem Ipsum Generator",
  "Word Counter",
  "Text Diff Checker",
  "Slug Generator",
  "ASCII Converter",
  "Text Reverser",
  "Whitespace Cleaner",
  "Case Converter",
  "Random Number Generator",
  "Cron Expression Generator",
];

export default function CreateCollection() {

  const [search, setSearch] = useState("")
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [selectedicon, setSelectedicon] = useState(null)
  const [selectedTools, setselectedTools] = useState(new Set())

  const router = useRouter()

  const filterTools = AllToolTitles.filter((title) => {
    return title.toLowerCase().includes(search)
  }
  )


  
  const handleChange = (title) => {
    setselectedTools((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(title)) {
        newSet.delete(title)
      } else {
        newSet.add(title)
      }

      return newSet
    }
    )
  }

  const handleCreateCollection = async (name, desc, selectedIcon, selectedTools) => {
    const response = await createCollectionAction(name, desc, selectedIcon, selectedTools)

    if (response.status === 401) {
      return router.push('/login')
    }

    if (response.success) {
      return router.push('/dashboard/collections')
    }

  }


  return (
    <div className='bg-[#0B1220] min-h-[calc(100vh-4.2rem)] relative overflow-y-auto'>
      {/* Header */}
      <div className='flex gap-9 items-center border-b mb-3 border-[#1F2937] px-6 py-3'>
        <ArrowLeft onClick={() => router.back()} className='cursor-pointer text-slate-500' size={21} />
        <h1 className='font-semibold text-lg text-violet-600'>Create Collection</h1>
      </div>

      {/* Content */}
      <div className='px-8'>
        <div className='flex flex-col gap-4'>
          {/* Input */}
          <div>
            <Input
              value={name}
              type="text"
              label="Collection Name"
              onChange={(e) => setName(e.target.value)}
              placeholder="eg. Frontend Tools"
            />
            <p className='text-slate-400 text-[13px]'>Give your collection a unique and descriptive name.</p>
          </div>

          {/* TextArea */}
          <div className='flex flex-col'>
            <label className='text-white text-sm mb-0.5' htmlFor="desc">
              Description
              <span className='text-gray-400'>
                (optional)
              </span>
            </label>

            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="
             rounded-md border
              border-[#1F2937] 
              bg-[#0B1220] pl-4
              pt-3.5 pb-2
              pr-15 text-sm text-white
               placeholder:text-gray-500 
               outline-none transition
                focus:border-violet-600" id="desc" placeholder='eg. All tools i use for frontend development'
              name="desc" rows="2" cols="50" />

            <p className='text-slate-400 text-[13px] mt-1'>Add a short description about this collection.</p>
          </div>

          {/* Select icon */}
          <div className='flex flex-col gap-1 mt-1.5'>
            <h3 className='text-white text-sm'>Select Icon</h3>
            <div className='grid grid-cols-4 gap-y-3 sm:grid-cols-6 md:grid-cols-12'>
              {CollectionIcon.map(({ icon, color }) => {
                return <SelectIcon
                  key={color}
                  icon={icon}
                  selectedicon={selectedicon}
                  setSelectedicon={setSelectedicon}
                  iconColor={color}
                />
              }
              )}
            </div>
          </div>

          {/* Search Tools */}
          <div>
            <h2 className='text-white text-sm'>Search Tools</h2>
            {/* Search */}
            <div className="relative w-full sm:w-72 mt-1">
              <FiSearch
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tools..."
                className="
                                      h-9 w-full rounded-lg
                                      border border-slate-800
                                      bg-[#0B1421]
                                      pl-10 pr-4
                                      text-sm text-white
                                      outline-none
                                      transition
                                      placeholder:text-slate-500
                                      focus:border-violet-600
                                      focus:ring-1
                                      focus:ring-[#334B80]/30
                                  "
              />
            </div>

            {/* Tools */}
            <div className='
  grid 
  grid-cols-2 
  gap-x-20 
  gap-y-3 
  px-3 
  pt-1.5
  pb-3
  mt-2
  border-b border-[#1F2937]
  max-h-56
  overflow-y-auto
'>
              {filterTools.slice(0, 6).map((title) => {
                return (
                  <div key={title} className='flex gap-3 items-center'>
                    <label className="cursor-pointer">
                      <input
                        onChange={() => handleChange(title)}
                        checked={selectedTools.has(title)}
                        type="checkbox"
                        className="peer sr-only"
                      />

                      <div
                        className="
      w-4 h-4
      rounded
      border border-white/10
      bg-white/5

      flex items-center justify-center

      transition-all duration-200

      peer-checked:bg-violet-600
      peer-checked:border-violet-600

      peer-hover:border-violet-500/50
      peer-focus-visible:ring-2
      peer-focus-visible:ring-violet-500/20
    "
                      >
                        <svg
                          className="
        w-3 h-3
        text-white
        opacity-0
        scale-50
        peer-checked:opacity-100
        peer-checked:scale-100
        transition-all duration-150
      "
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </label>
                    <h3 className='text-slate-400 text-sm'>{title}</h3>
                  </div>
                )
              }
              )}
            </div>

            {/* Button */}
            <div className="flex justify-end mt-4 pb-6">
              <button
                onClick={() => handleCreateCollection(name.trim().toLowerCase(), desc.trim().toLowerCase(),
                  { name: selectedicon.Icon.name, color: selectedicon.iconColor }, [...selectedTools])}
                type="button"
                disabled={name.trim().length < 4 || !selectedicon || !selectedTools.size}
                className="
      inline-flex
      items-center
      justify-center 
      gap-2
      rounded-lg
      bg-violet-600
      px-5
      cursor-pointer
      disabled:bg-violet-900
      disabled:cursor-not-allowed
      py-2
      text-sm
      font-medium
      text-white
      transition
      hover:bg-violet-500
    "
              >
                Create Collection
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

const handleSelectedIcon = (setSelectedicon, Icon, iconColor) => {
  setSelectedicon((prev) => {
    if (prev?.Icon.name === Icon.name) {
      return null
    } else {
      return { Icon, iconColor }
    }
  }
  )
}


function SelectIcon({ icon: Icon, iconColor, selectedicon, setSelectedicon }) {
  return <div
    onClick={() => handleSelectedIcon(setSelectedicon, Icon, iconColor)}
    className={`
    group
    relative
    flex h-11 w-13 items-center justify-center
    rounded-lg
    border border-transparent
    transition-all duration-300 ease-out
    hover:shadow-[0_8px_25px_rgba(124,58,237,0.12)]
    ${selectedicon?.Icon === Icon ? 'border-violet-700' : (
        'hover:border-violet-500/40  hover:-translate-y-1 hover:scale-105')}
    ${iconColor}
  `}
  >
    <div className="
    transition-transform duration-300 ease-out
    group-hover:scale-110
  ">
      {<Icon size={Icon === LuFolder ? 22 : 21} />}
    </div>
  </div>
}