import Image from 'next/image'
import Link from 'next/link';
import { FaStar } from "react-icons/fa6";

export default function FavouritesCard({ src, heading, title }) {

    return (
        <Link href='/' className='hover:shadow-[0_0_30px_rgba(101,58,219,0.3)] rounded-lg border border-[#1F2937] bg-[#0A101C] p-5 transition-all duration-300 hover:border-violet-600 flex justify-between h-28 items-center'>

            {/* Favourites */}
            <div className='flex gap-6'>
                <Image
                    src={src}
                    width={43}
                    height={40}
                    alt={heading}
                    className='object-contain'
                />
                <div className='flex flex-col gap-1'>
                    <h2 className='text-slate-300 text-lg font-semibold'>{heading}</h2>
                    <p className='text-slate-400 text-sm'>{title}</p>
                </div>
            </div>

            {/* Star */}
            <FaStar size={20} className='text-yellow-400' />
        </Link>
    )
}
