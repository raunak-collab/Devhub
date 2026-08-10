export default function CategoryCard({
    title,
    desc,
    icon,
}) {
    return (
        <div
            className="
                flex h-32 flex-col
                rounded-xl
                border border-slate-800
                bg-[#0B1421]
                p-4
                transition-all duration-300
                hover:-translate-y-1
                hover:border-slate-700
                hover:bg-[#0E1728]
            "
        >
            {/* Icon */}
            <div className="mb-3">
                {icon}
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-white">
                {title}
            </h3>

            {/* Tools count */}
            <p className="mt-1 text-xs text-slate-500">
                {desc}
            </p>
        </div>
    );
}