import Link from 'next/link'
import React from 'react'

export default function PopularTools(props) {
    
    return (
        <div className='flex md:flex-row gap-2 text-xs text-slate-400'>
            {Object.values(props).map((value) => {
                return (<Link key={value} href="/" className='border border-[#1F2937] bg-[#0B1220] px-3 py-1.5 rounded-2xl'>{value}</Link>)
            }
            )}
        </div>
    )   
}
