
export default function OverviewCards({ icon, title, bgIcon, data }) {
  
    return (
        <div className='rounded-lg border border-[#1F2937] bg-[#0B1220] p-5 items-center flex gap-4'>
            <div className={`${bgIcon} h-fit p-2.5 rounded-lg`}>
                {icon}
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-slate-400">{title}</h3>
                <h1 className="text-white text-2xl">{data}</h1>
            </div>
        </div>
    )
}
