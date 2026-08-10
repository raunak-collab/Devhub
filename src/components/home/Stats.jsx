import Link from 'next/link'
import StatsCard from '../cards/StatsCard'
import {
  Wrench,
  Users,
  Zap,
  ShieldCheck,
  Activity,
  Clock3,
} from "lucide-react";

export default function Stats() {

    const whydevhub = [
        { src: "/images/free.png", title: "100% Free", desc: "All tools are completely free to use. No hidden Charges." },
        { src: "/images/fast.png", title: "Fast & Reliable", desc: "Optimized for speed and accuracy. Get results instantly." },
        { src: "/images/privacy.png", title: "Privacy Focused", desc: "Your data stays private. Everything is processed in your browser" },
        { src: "/images/easy.png", title: "Easy to Use", desc: "Clean and intuitive interface. No learning curve" },
        { src: "/images/updated.png", title: "Always Updated", desc: "New tools added regularly based on developer needs." },
        { src: "/images/opensource.png", title: "Open Source", desc: "Built with ❤️ for developers. Contribute on GitHub"},
    ]
    return (
        <section className='border-b py-6 border-[#1F2937]'>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3.5 px-9">

                {whydevhub.map(({ src, title, desc }) => {
                    return (
                        <Link href="/" key={src}>
                            <StatsCard ratio={30} src={src} title={title} desc={desc} />
                        </Link>)
                }
                )}
            </div>
        </section>
    )
}

