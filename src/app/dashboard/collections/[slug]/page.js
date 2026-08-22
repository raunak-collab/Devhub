"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Page() {

    const [loading, setloading] = useState(true)
    const [data, setData] = useState(null)

    console.log(data)
    const { slug } = useParams();
    const router = useRouter()

    useEffect(() => {

        async function fetchCollection() {
            try {
                const response = await fetch(`/api/collections/${slug}`)

                if (response.status === 401) {
                    return router.push('/login')
                }

                const data = await response.json()

                if (!data.error) {
                    setData(data)
                }
            }
            finally {
               await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve()
                    }, 0)
                )
                setloading(false)
            }
        }
        fetchCollection()
    }, [])


const icon = data?.icon


    return (
        loading ? (
            <CollectionShimmer />
        ) : (
            data ? (
                <div>
                    {/* Header */}
                    <div className='text-violet-600 flex gap-9 items-center border-b mb-3
                       border-[#1F2937] px-6 py-3'>
                        <ArrowLeft onClick={() => router.back()} className='cursor-pointer' size={21} />
                        <h1 className='font-semibold text-lg'>View Collection</h1>
                    </div>
                    
                    <div>
                        <div className={`${icon.color}`}>
                            
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Collection not found</h1>
                </div>
            )

        )
    );
}



const Shimmer = ({ className = "" }) => {
    return (
        <div
            className={`
        relative overflow-hidden
        bg-[#151e2d]
        rounded-md
        ${className}
      `}
        >
            <div
                className="
          absolute inset-0
          -translate-x-full
          animate-[shimmer_1.8s_infinite]
          bg-gradient-to-r
          from-transparent
          via-[#26344a]
          to-transparent
        "
            />
        </div>
    );
};

function CollectionShimmer() {
    return (
        <div className="min-h-screen bg-[#070e19] text-white">

            {/* Header */}
            <div className="flex items-center justify-between px-8 py-3 border-b border-[#182437]">

                <div className="flex items-center gap-8">
                    {/* Back */}
                    <Shimmer className="w-7 h-7 rounded-full" />

                    {/* Title */}
                    <Shimmer className="w-44 h-7 rounded-md" />
                </div>

                {/* Edit + Menu */}
                <div className="flex items-center gap-4">
                    <Shimmer className="w-44 h-12 rounded-xl" />
                    <Shimmer className="w-12 h-12 rounded-xl" />
                </div>
            </div>


            {/* Main Content */}
            <div className="px-8 py-5">

                {/* Collection Info */}
                <div className="flex items-start gap-5 mb-7">

                    {/* Collection Icon */}
                    <Shimmer className="w-24 h-24 rounded-2xl shrink-0" />

                    <div className="pt-1 space-y-3">

                        {/* Collection name */}
                        <Shimmer className="w-56 h-7 rounded-md" />

                        {/* Description */}
                        <Shimmer className="w-80 h-4 rounded-md" />

                        {/* Meta */}
                        <div className="flex items-center gap-3 pt-1">
                            <Shimmer className="w-24 h-7 rounded-lg" />
                            <Shimmer className="w-36 h-7 rounded-lg" />
                        </div>

                    </div>
                </div>


                {/* Search + Category */}
                <div className="flex gap-4 mb-3">

                    {/* Search */}
                    <div className="flex-1 h-11 rounded-xl bg-[#101a29] border border-[#1d2a3d] overflow-hidden relative">
                        <div
                            className="
                absolute inset-0
                -translate-x-full
                animate-[shimmer_1.8s_infinite]
                bg-gradient-to-r
                from-transparent
                via-[#26344a]
                to-transparent
              "
                        />

                        <div className="relative flex items-center h-full px-4 gap-3">
                            <Shimmer className="w-5 h-5 rounded-full" />
                            <Shimmer className="w-48 h-4 rounded" />
                        </div>
                    </div>


                    {/* Category */}
                    <div className="w-72 h-11 rounded-xl bg-[#101a29] border border-[#1d2a3d] overflow-hidden relative">
                        <div
                            className="
                absolute inset-0
                -translate-x-full
                animate-[shimmer_1.8s_infinite]
                bg-gradient-to-r
                from-transparent
                via-[#26344a]
                to-transparent
              "
                        />

                        <div className="relative flex items-center justify-between h-full px-4">
                            <Shimmer className="w-28 h-4 rounded" />
                            <Shimmer className="w-4 h-4 rounded" />
                        </div>
                    </div>

                </div>


                {/* Tools */}
                <div className="space-y-2">

                    {[1, 2, 3, 4, 5].map((item) => (
                        <ToolShimmer key={item} />
                    ))}

                </div>

            </div>
        </div>
    );
}

/* Tool Row Skeleton */
function ToolShimmer() {
    return (
        <div
            className="
        h-[68px]
        px-4
        rounded-xl
        border border-[#18263a]
        bg-[#0d1725]
        flex items-center
        gap-4
        overflow-hidden
      "
        >

            {/* Tool Icon */}
            <Shimmer className="w-11 h-11 rounded-lg shrink-0" />

            {/* Tool Name + Description */}
            <div className="flex-1 space-y-2">

                <Shimmer className="w-36 h-4 rounded" />

                <Shimmer className="w-64 h-3 rounded" />

            </div>


            {/* Category */}
            <Shimmer className="w-24 h-8 rounded-lg" />


            {/* Star */}
            <Shimmer className="w-6 h-6 rounded-full" />


            {/* External Link */}
            <Shimmer className="w-5 h-5 rounded" />

        </div>
    );
}