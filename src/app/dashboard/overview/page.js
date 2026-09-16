import OverviewCards from "@/components/cards/OverviewCards";
import Link from "next/link";
import { CiStar } from "react-icons/ci";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import {
  MdCollectionsBookmark,
  MdAccessTime,
} from "react-icons/md";

import {
  ArrowRight,
  Braces,
  KeyRound,
  ShieldCheck,
  Fingerprint,
  QrCode,
} from "lucide-react"


export default function Overview() {
  const overviewData = [
    {
      icon: <CiStar className="text-purple-400" size={34} />,
      bgIcon: "bg-purple-500/10",
      title: "Favourites",
      data: "24",
    },
    {
      icon: (
        <HiOutlineWrenchScrewdriver
          className="text-sky-400"
          size={30}
        />
      ),
      bgIcon: "bg-sky-400/10",
      title: "Tools Used",
      data: "20",
    },
    {
      icon: (
        <MdCollectionsBookmark
          className="text-amber-400"
          size={30}
        />
      ),
      bgIcon: "bg-amber-400/10",
      title: "Collections",
      data: "6",
    },
    {
      icon: <MdAccessTime className="text-green-500" size={30} />,
      bgIcon: "bg-green-500/10",
      title: "Total Time Saved",
      data: "23h",
    },
  ];


  const recentTools = [
    {
      name: "JSON Formatter",
      icon: Braces,
      iconColor: "text-white",
      iconBg: "bg-violet-600",
      time: "2 mins ago",
      href: "/tools/json-formatter",
    },
    {
      name: "Password Generator",
      icon: KeyRound,
      iconColor: "text-white",
      iconBg: "bg-amber-600",
      time: "10 mins ago",
      href: "/tools/password-generator",
    },
    {
      name: "JWT Decoder",
      icon: ShieldCheck,
      iconColor: "text-white",
      iconBg: "bg-cyan-600",
      time: "25 mins ago",
      href: "/tools/jwt-decoder",
    },
    // {
    //   name: "Regex Tester",
    //   icon: Fingerprint,
    //   iconColor: "text-white",
    //   iconBg: "bg-emerald-600",
    //   time: "1 hour ago",
    //   href: "/tools/regex-tester",
    // },
    // {
    //   name: "SQL Formatter",
    //   icon: QrCode,
    //   iconColor: "text-white",
    //   iconBg: "bg-orange-600",
    //   time: "2 hours ago",
    //   href: "/tools/sql-formatter",
    // },
  ];

  const categories = [
    {
      name: "Formatting",
      value: "32%",
      color: "bg-violet-500",
    },
    {
      name: "Network",
      value: "24%",
      color: "bg-purple-400",
    },
    {
      name: "Security",
      value: "16%",
      color: "bg-emerald-400",
    },
    {
      name: "Conversion",
      value: "14%",
      color: "bg-amber-400",
    },
    {
      name: "Others",
      value: "14%",
      color: "bg-orange-300",
    },
  ];

  return (
    <div className="flex flex-col gap-6 min-h-full px-4 py-5 sm:px-6 lg:px-8">

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">
          Dashboard
        </h1>

        <h4 className="text-slate-500">
          Welcome back,{" "}
          <span className="text-slate-400">
            Dear User 👋
          </span>
        </h4>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewData.map(
          ({ icon, bgIcon, title, data }) => (
            <OverviewCards
              key={title}
              bgIcon={bgIcon}
              icon={icon}
              title={title}
              data={data}
            />
          )
        )}
      </div>

      {/* Recent Tools + Top Categories */}
      <div className="grid lg:grid-cols-2 gap-4">

        {/* Recent Tools */}
        <div className="rounded-lg border border-[#1F2937] bg-[#0B1220] p-5">

          {/* Card Header */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-white">
              Recent Tools
            </h2>

            <Link
              href="/dashboard/history"
              className="flex items-center gap-1 text-sm text-violet-500 transition hover:text-violet-400"
            >
              View All
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Tools */}
          <div className="flex flex-col">

            {recentTools.map(({ name, icon: Icon, iconBg, iconColor, href, time }, index) => (
              <Link
                key={name}
                href={href}
                className={`group flex items-center justify-between py-3 transition hover:bg-white/3 ${index !== recentTools.length - 1
                  ? "border-b border-[#1F2937]"
                  : ""
                  }`}
              >
                {/* Left */}
                <div className="flex items-center gap-3">

                  <div className={`flex h-9 w-9 items-center justify-center rounded-md ${iconBg} ${iconColor}`}>
                    <Icon />
                  </div>

                  <span className="text-sm text-slate-300 transition group-hover:text-white">
                    {name}
                  </span>
                </div>

                {/* Time */}
                <span className="text-xs text-slate-500">
                  {time}
                </span>
              </Link>
            ))}

          </div>
        </div>

        {/* Top Categories */}
        <div className="rounded-lg border border-[#1F2937] bg-[#0B1220] p-5">

          <div className="mb-5">
            <h2 className="font-semibold text-white">
              Top Categories
            </h2>
          </div>

          <div className="flex items-center justify-center gap-10">

            {/* Donut */}
            <div
              className="
                relative h-40 w-40 rounded-full
                bg-[conic-gradient(#8b5cf6_0_32%,#a78bfa_32%_56%,#34d399_56%_72%,#fbbf24_72%_86%,#fdba74_86%_100%)]
              "
            >
              <div className="absolute inset-6.75 rounded-full bg-[#0B1220]" />
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-3">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center gap-3"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-sm ${category.color}`}
                  />

                  <span className="w-20 text-sm text-slate-400">
                    {category.name}
                  </span>

                  <span className="text-sm text-slate-300">
                    {category.value}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}