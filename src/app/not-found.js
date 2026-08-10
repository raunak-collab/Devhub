import Link from "next/link";
import { GoHomeFill } from "react-icons/go";

export default function notfound() {
  return (
    <div className='min-h-[calc(100vh-5rem)] flex justify-center items-center'>
      <div className='flex flex-col items-center gap-2 border'>
        <h1 className='text-violet-600 text-5xl sm:text-8xl font-bold'>404</h1>
        <h2 className='text-white text-2xl sm:text-4xl font-bold'>Oops! Page Not Found</h2>
        <p className='text-slate-400 max-w-lg px-4 text-sm sm:text-base text-center mt-3'>
          The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back to DevHub.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg text-white bg-violet-600 px-7 py-2.5 font-medium transition hover:bg-violet-500"
        >
          <GoHomeFill size={20} />
          Go Home
        </Link>
      </div>
    </div>
  )
}
