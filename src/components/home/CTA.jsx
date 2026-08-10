import Image from 'next/image'
import React from 'react'

export default function CTA() {
    return (
        <section className='h-44'>
            <div
                className=" relative overflow-hidden rounded-3xl bg-linear-to-r from-[#14122D] via-[#25144D] to-[#3B1E67]"
            >
              <div className='flex flex-row'>
                <div className='relative'>
                     <Image className='z-50'  src="/images/rocket.png" width={200} height={150} alt='rocket'/>
                     <Image className='absolute top-1 z-0' src="/images/star.png" width={200} height={200} alt='star'/>
                </div>
                <div></div>
              </div>
    
            </div>
        </section>
    )
}
