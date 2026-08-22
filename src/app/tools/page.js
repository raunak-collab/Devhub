'use client'
import SearchInput from '@/components/ui/SearchInput'

import Link from 'next/link';
import ToolsCard from '@/components/cards/ToolsCard';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import HandleSearch from '@/utils/HandleSearch';
import { AllTools } from '../AllTools.js'
import { ArrowLeft, ArrowRight } from 'lucide-react';



export default function Tools() {
    const [currentPage, setcurrentPage] = useState(1)
    const [search, setsearch] = useState('')

    const router = useRouter();
    const searchParams = useSearchParams()

    const params = new URLSearchParams(searchParams)

    const urlsearch = (searchParams.get('search') || '').toLowerCase()
    const category = (searchParams.get('category') || 'All').toLowerCase()
    const [savedtools, setSavedtools] = useState([])
    const [favouritestools, setFavouritestools] = useState([])

    useEffect(() => {
        setcurrentPage(1)
    }, [urlsearch, category])

    useEffect(() => {
        setsearch(urlsearch);
    }, [urlsearch]);


    useEffect(() => {
        async function fetchFavouritesTools() {
            const response = await fetch('/api/favouritestools')

            const favouritesToolsData = await response.json();

            if (!favouritesToolsData.error) {
                const favouritesToolsArr = favouritesToolsData.map(({ title }) => title)

                setFavouritestools(favouritesToolsArr);
            }

        }
        fetchFavouritesTools()
    }, [])


    useEffect(() => {
        async function fetchSavedTools() {
            const response = await fetch('/api/savedtools')

            const savedToolsdata = await response.json();

            if (!savedToolsdata.error) {
                const savedToolsArr = savedToolsdata.map(({ title }) => title)

                setSavedtools(savedToolsArr);
            }

        }
        fetchSavedTools()
    }, [])



    const filteredTools = AllTools.filter((tool) => {
        const matchesCategory = category === 'all' ||
            tool.type.toLowerCase() === category

        const matchesSearch = tool.desc.toLowerCase().includes(urlsearch) ||
            tool.title.toLowerCase().includes(urlsearch)

        return matchesCategory && matchesSearch;
    }
    )

    const tools = filteredTools;

    useEffect(() => {
        if (!tools.length) {
            function scroll() {
                let noTools = document.getElementById('no-tools')
                if (noTools) {
                    noTools.scrollIntoView({ behavior: 'smooth' })
                }
            }
            scroll()
        }
    }, [tools.length])

    const toolsPerPage = 8;

    const startIndex = (currentPage - 1) * toolsPerPage

    const select = [
        'Formatting',
        'Development',
        'API',
        'Security',
        'Utilities',
        'Conversion',
        'Design',
        'Text',
        'Network',
    ]

    const currentTools = tools.slice(startIndex, startIndex + toolsPerPage)

    const totalPages = Math.ceil(tools.length / toolsPerPage)

    const startTool = tools.length ? startIndex + 1 : 0
    const endTool = startIndex + currentTools.length

    const getPages = () => {
        const pages = [];

        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
            return pages;
        }

        pages.push(1)

        if (currentPage > 3) {
            pages.push('...')
        }

        const start = Math.max(2, currentPage - 1)
        const end = Math.min(totalPages - 1, currentPage + 1)

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (currentPage < totalPages - 2) {
            pages.push('...')
        }

        pages.push(totalPages)

        return pages
    }

    return (
        <main className='min-h-[calc(100vh-4.1rem)] border'>
            <section className="flex flex-col items-center gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                {/* Upper */}
                <div className='w-full flex gap-6 flex-col items-center max-w-4xl'>
                    {/* heading */}
                    <div className='flex flex-col gap-3 mt-3'>
                        <h1 className='text-white mx-auto max-w-4xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl'>Explore Developer <span className='text-violet-500'>Tools</span></h1>
                        <p className='text-slate-400 text-center sm:text-base text-sm'>20+ powerful developer tools to make your workflow easier and faster.</p>
                    </div>

                    {/* Input and filter */}
                    <div className='flex justify-center w-full gap-5'>
                        <div className='flex-1'>
                            <SearchInput
                                onChange={(e) => setsearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        HandleSearch(router, search.trim(), params)
                                    }
                                }}
                                search={search}
                                placeholder={'Search for tools... (eg. JSON Formatter)'}
                            />
                        </div>
                        {/* <div className='md:flex hidden items-center justify-center gap-2 bg-[#0B1220] rounded-lg text-white border px-4 py-1 border-[#1F2937]'>
                            <RiFilterLine />
                            Filters
                        </div> */}
                    </div>

                    {/* Chip */}

                    <div className='lg:flex hidden gap-3'>
                        <div onClick={() =>
                            router.push('/tools')
                        }
                            className={`${category === 'all' ? 'bg-violet-500' :
                                'hover:bg-slate-800'} px-5 py-2
                          cursor-pointer bg-[#0B1220] 
                          rounded-full`}>

                            <p className='text-sm text-white'>All</p>
                        </div>
                        {select.map((title) => {
                            return <Chip
                                key={title}
                                active={category.toLowerCase() === title.toLowerCase()}
                                title={title}
                                setcurrentPage={setcurrentPage}
                            />
                        }
                        )}
                    </div>
                </div>

                <p className='w-full text-gray-400  px-11 pt-2 text-sm'>Showing {startTool} to {endTool} of {tools.length} tools</p>

                {/* Cards */}
                {tools.length ? (
                    <>
                        <div className='w-full px-11'>
                            {/* Cards */}
                            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                                {currentTools.map(
                                    ({
                                        title,
                                        desc,
                                        icon: Icon,
                                        iconColor,
                                        iconBg,
                                        typeBg,
                                        typeColor,
                                        type
                                    }) => (
                                        <div
                                            key={title}
                                        >
                                            <ToolsCard
                                                title={title}
                                                desc={desc}
                                                isSaved={savedtools.includes(title)}
                                                isFavourites={favouritestools.includes(title)}
                                                type={type}
                                                typeBg={typeBg}
                                                typeColor={typeColor}
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
                                        </div>
                                    )
                                )}

                            </div>
                        </div>
                        {/* Pagination */}
                        <div className='text-slate-300 flex gap-2'>
                            <button type='button'
                                disabled={currentPage === 1}
                                onClick={() => setcurrentPage(prev => prev - 1)}
                                className={`
                               border
                             border-[#0d1725]
                               rounded-xs 
                              px-2.5 py-1
                              cursor-pointer
                              bg-[#040b15]`
                                }
                            >
                                <ArrowLeft size={19} />
                            </button>

                            {
                                getPages().map((page, index) => {
                                    if (page === "...") {
                                        return (
                                            <span
                                                key={`dots-${index}`}
                                                className="border
                                     border-[#0d1725]
                                     rounded-xs 
                                      w-9
                                     px-2.5 py-1.5
                                    bg-[#040b15]"
                                            >
                                                ...
                                            </span>
                                        );
                                    }

                                    return <button key={page}
                                        type='button'
                                        onClick={() => setcurrentPage(page)}
                                        className={`border
                             border-[#0d1725]
                             cursor-pointer
                               rounded-xs 
                               w-9
                              px-2.5 py-1.5
                              bg-[#040b15]
                              ${currentPage === page ? "border-violet-500 bg-violet-600 text-white"
                                                : "border-slate-800 text-slate-300 hover:bg-slate-800"}
                              `}
                                    >
                                        {page}
                                    </button>
                                }
                                )
                            }

                            <button type='button'
                                disabled={currentPage === totalPages}
                                onClick={() => setcurrentPage(prev => prev + 1)}
                                className={`
                               border
                             border-[#0d1725]
                               rounded-xs 
                               cursor-pointer
                              px-2.5 py-1.5
                              bg-[#040b15]`
                                }
                            >
                                <ArrowRight size={19} />
                            </button>
                        </div>
                    </>
                ) : (
                    // No-tools
                    <div id='no-tools' className='flex flex-col items-center gap-4'>
                        <Image src="/images/toolBox.png" width={280} height={280} alt='no tools' />
                        <h1 className='text-white text-xl sm:text-3xl font-semibold'>No tools found</h1>
                        <p className='text-gray-500 text-center text-xs sm:text-[15px] leading-6 tracking-wide'>
                            We couldn&apos;t find any tools matching your selected category. <br />
                            Try choosing a different category or search for something else.
                        </p>
                        <div>
                            <button
                                type='button'
                                onClick={() => {
                                    params.delete('category')
                                    router.push(`/tools?${params.toString()}`)
                                }
                                }
                                className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4.5 py-3 font-medium transition hover:bg-violet-500 text-white text-sm"
                            >
                                View All Tools
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}


            </section>
        </main>
    )
}


export function Chip({ title, active }) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const params = new URLSearchParams(searchParams)

    return (
        <div onClick={() => {
            params.set('category', title.toLowerCase())

            router.push(`/tools?${params.toString()}`)
        }}
            className={`${active ? 'bg-violet-500' : 'hover:bg-slate-800'} 
        px-5 py-2 cursor-pointer bg-[#0B1220] rounded-full`}>
            <p className='text-sm text-white'>{title}</p>
        </div>
    )
}