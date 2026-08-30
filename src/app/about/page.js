import Link from "next/link";
import {
  Code2,
  Zap,
  ShieldCheck,
  Users,
  Wrench,
  Rocket,
  ArrowRight,
  Globe,
  Heart,
} from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Zap,
      title: "Fast & Simple",
      description:
        "Access the tools you need quickly without unnecessary complexity or distractions.",
    },
    {
      icon: Wrench,
      title: "Developer Focused",
      description:
        "Useful utilities designed around the everyday needs of developers and programmers.",
    },
    {
      icon: ShieldCheck,
      title: "Privacy First",
      description:
        "We aim to keep your data secure and process information locally whenever possible.",
    },
    {
      icon: Globe,
      title: "Everything in One Place",
      description:
        "Stop switching between different websites. Find your essential developer tools in one place.",
    },
  ];

  const categories = [
    "JSON Tools",
    "JWT Tools",
    "Password Tools",
    "Regex Tools",
    "UUID Generator",
    "API Utilities",
  ];

  return (
    <main className="min-h-screen text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800/70">
        {/* Background glow */}
        <div className="absolute left-1/2 top-0 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <Code2 size={16} />
            About DevHub
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Everything Developers Need,{" "}
            <span className="text-violet-500">In One Place</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            DevHub is a modern platform built to simplify your development
            workflow by bringing essential developer tools and resources
            together in one fast and accessible place.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-6 py-3 font-medium transition hover:bg-violet-500"
            >
              Explore Tools
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-200 transition hover:border-violet-500 hover:text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-violet-400">
              Our Story
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Why was DevHub created?
            </h2>

            <p className="mt-6 leading-7 text-slate-400">
              Developers often have to visit multiple websites for simple
              everyday tasks like formatting JSON, decoding JWT tokens,
              generating passwords, testing regular expressions, or working
              with APIs.
            </p>

            <p className="mt-4 leading-7 text-slate-400">
              DevHub was created to make that process easier. Instead of
              searching for a different website every time, developers can
              access useful utilities from a single, clean and distraction-free
              platform.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-slate-800 bg-[#0B1220] p-8 shadow-2xl shadow-violet-950/20">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-violet-600/15 p-3 text-violet-400">
                  <Code2 size={25} />
                </div>

                <div>
                  <h3 className="font-semibold">DevHub</h3>
                  <p className="text-sm text-slate-500">
                    Developer Toolkit
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="rounded-lg border border-slate-800 bg-[#0E1625] px-4 py-3 text-sm text-slate-300"
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-5 -right-5 -z-10 h-32 w-32 rounded-full bg-violet-600/20 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-slate-800/70 bg-[#050914]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-violet-400">
              Why DevHub
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Built for developers
            </h2>

            <p className="mt-4 text-slate-400">
              Everything is designed to make your development workflow faster,
              simpler and more productive.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-xl border border-slate-800 bg-[#0A101C] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/40"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400 transition group-hover:bg-violet-600 group-hover:text-white">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid overflow-hidden rounded-2xl border border-slate-800 bg-[#0A101C] sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-slate-800 p-8 text-center lg:border-b-0 lg:border-r">
            <h3 className="text-3xl font-bold text-white">100+</h3>
            <p className="mt-2 text-sm text-slate-500">Developer Tools</p>
          </div>

          <div className="border-b border-slate-800 p-8 text-center lg:border-b-0 lg:border-r">
            <h3 className="text-3xl font-bold text-white">Fast</h3>
            <p className="mt-2 text-sm text-slate-500">Performance</p>
          </div>

          <div className="border-b border-slate-800 p-8 text-center sm:border-r lg:border-b-0">
            <h3 className="text-3xl font-bold text-white">Free</h3>
            <p className="mt-2 text-sm text-slate-500">To Get Started</p>
          </div>

          <div className="p-8 text-center">
            <h3 className="text-3xl font-bold text-white">24/7</h3>
            <p className="mt-2 text-sm text-slate-500">Available Online</p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="relative overflow-hidden border-t border-slate-800/70">
        <div className="absolute left-1/2 top-1/2 -z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400">
            <Rocket size={28} />
          </div>

          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
            Our Vision
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Making development simpler for everyone
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-7 text-slate-400">
            Our vision is to build a complete developer ecosystem where
            essential tools, resources and productivity features are available
            from one seamless platform.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/15 to-transparent p-10 text-center sm:p-16">
          <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[80px]" />

          <div className="relative">
            <Heart
              className="mx-auto mb-5 text-violet-400"
              size={28}
            />

            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to build something great?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Explore DevHub and discover the tools that can make your
              development workflow easier.
            </p>

            <Link
              href="/tools"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 font-medium transition hover:bg-violet-500"
            >
              Explore Developer Tools
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}