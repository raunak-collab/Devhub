"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  X,
  Sparkles,
  Zap,
  Users,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Everything you need to get started.",
    monthly: 0,
    yearly: 0,
    icon: Zap,
    features: [
      "50+ Developer Tools",
      "Unlimited Tool Usage",
      "JSON Formatter",
      "JWT Decoder",
      "Regex Tester",
      "QR Code Generator",
      "Password Generator",
      "Basic History",
    ],
    unavailable: [
      "AI-powered tools",
      "Advanced history",
      "Team workspace",
      "Custom branding",
    ],
    button: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For developers who want more productivity.",
    monthly: 5,
    yearly: 48,
    icon: Sparkles,
    features: [
      "Everything in Free",
      "AI-powered developer tools",
      "Unlimited History",
      "Unlimited Favorites",
      "Unlimited Collections",
      "Advanced API tools",
      "Priority processing",
      "No advertisements",
    ],
    unavailable: [
      "Team workspace",
      "Custom branding",
    ],
    button: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Team",
    description: "Powerful tools for development teams.",
    monthly: 15,
    yearly: 144,
    icon: Users,
    features: [
      "Everything in Pro",
      "Team workspace",
      "Shared collections",
      "Shared tool history",
      "Team members",
      "Custom branding",
      "Team analytics",
      "Priority support",
    ],
    unavailable: [],
    button: "Upgrade to Team",
    popular: false,
  },
];

const faqs = [
  {
    question: "Are the basic developer tools free?",
    answer:
      "Yes. Core DevHub tools remain available for free with unlimited basic usage.",
  },
  {
    question: "Can I cancel my Pro subscription?",
    answer:
      "Yes. You can cancel your subscription whenever you want. Your account will remain active until the end of your billing period.",
  },
  {
    question: "Do I need an account to use DevHub?",
    answer:
      "No. Most basic tools can be used without creating an account. An account is required for features such as history, favorites and collections.",
  },
  {
    question: "What are AI tools?",
    answer:
      "AI tools can help developers explain code, improve prompts, understand errors, generate test data and automate repetitive development tasks.",
  },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <main className="min-h-screen bg-[#01040D] text-white">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 -top-62.5 h-125 w-175 -translate-x-1/2 rounded-full bg-[#653ADB]/15 blur-[140px]" />

        <div className="absolute -bottom-50 -left-37.5 h-100 w-100 rounded-full bg-[#3B82F6]/10 blur-[130px]" />
      </div>

      {/* Hero */}
      <section className="relative z-10 px-6 pb-12 pt-20 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#653ADB]/30 bg-[#653ADB]/10 px-4 py-2 text-sm text-[#A78BFA]">
            <Sparkles size={15} />
            Simple & Transparent Pricing
          </div>

          <h1 className="text-4xl font-extrabold tracking-[-1.5px] sm:text-5xl lg:text-6xl">
            Choose the plan that
            <span className="block bg-gradient-to-r from-[#A78BFA] via-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent">
              works for you
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#94A3B8] sm:text-lg">
            Start free with powerful developer tools. Upgrade when you need
            advanced features, AI tools and team collaboration.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mt-10 inline-flex items-center rounded-xl border border-[#27272A] bg-[#0B1220] p-1">
          <button
            onClick={() => setYearly(false)}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
              !yearly
                ? "bg-[#653ADB] text-white shadow-lg shadow-[#653ADB]/20"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setYearly(true)}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
              yearly
                ? "bg-[#653ADB] text-white shadow-lg shadow-[#653ADB]/20"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            Yearly
            <span className="rounded-full bg-[#22C55E]/15 px-2 py-0.5 text-[11px] text-[#22C55E]">
              Save 20%
            </span>
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = yearly ? plan.yearly : plan.monthly;

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-7 transition duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? "border-[#7C3AED] bg-gradient-to-b from-[#16102C] to-[#0B1220] shadow-2xl shadow-[#653ADB]/15"
                    : "border-[#27272A] bg-[#0B1220]"
                }`}
              >
                {/* Popular */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#7C3AED] px-4 py-1 text-xs font-bold">
                    MOST POPULAR
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${
                    plan.popular
                      ? "bg-[#653ADB]/20 text-[#A78BFA]"
                      : "bg-[#1A1F2E] text-[#94A3B8]"
                  }`}
                >
                  <Icon size={21} />
                </div>

                <h2 className="text-xl font-bold">{plan.name}</h2>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#94A3B8]">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-extrabold">
                    ${price}
                  </span>

                  <span className="mb-1 text-sm text-[#64748B]">
                    /{yearly ? "year" : "month"}
                  </span>
                </div>

                {yearly && plan.monthly > 0 && (
                  <p className="mt-2 text-xs text-[#22C55E]">
                    Save ${plan.monthly * 12 - plan.yearly} per year
                  </p>
                )}

                {/* Button */}
                <button
                  className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    plan.popular
                      ? "bg-[#7C3AED] hover:bg-[#8B5CF6]"
                      : "border border-[#374151] bg-transparent hover:bg-[#161D2F]"
                  }`}
                >
                  {plan.button}
                  <ArrowRight size={16} />
                </button>

                {/* Divider */}
                <div className="my-7 h-px bg-[#27272A]" />

                <p className="mb-4 text-sm font-semibold">
                  What's included
                </p>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 text-sm text-[#CBD5E1]"
                    >
                      <Check
                        size={17}
                        className="mt-0.5 shrink-0 text-[#22C55E]"
                      />
                      <span>{feature}</span>
                    </div>
                  ))}

                  {plan.unavailable.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 text-sm text-[#475569]"
                    >
                      <X
                        size={17}
                        className="mt-0.5 shrink-0"
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold text-[#A78BFA]">
            COMPARE PLANS
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Everything you need
          </h2>

          <p className="mt-3 text-[#94A3B8]">
            Choose the features that match your workflow.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#27272A] bg-[#0B1220]">
          <div className="grid grid-cols-4 border-b border-[#27272A] px-6 py-4 text-sm font-semibold">
            <div>Feature</div>
            <div className="text-center">Free</div>
            <div className="text-center text-[#A78BFA]">Pro</div>
            <div className="text-center">Team</div>
          </div>

          {[
            ["Developer Tools", "50+", "50+", "50+"],
            ["Tool Usage", "Unlimited", "Unlimited", "Unlimited"],
            ["Favorites", "✓", "✓", "✓"],
            ["Collections", "✓", "✓", "✓"],
            ["AI Tools", "—", "✓", "✓"],
            ["Team Workspace", "—", "—", "✓"],
            ["Custom Branding", "—", "—", "✓"],
            ["Priority Support", "—", "—", "✓"],
          ].map(([feature, free, pro, team]) => (
            <div
              key={feature}
              className="grid grid-cols-4 border-b border-[#1A1F2E] px-6 py-4 text-sm last:border-0"
            >
              <div className="text-[#CBD5E1]">{feature}</div>
              <div className="text-center text-[#94A3B8]">{free}</div>
              <div className="text-center text-[#A78BFA]">{pro}</div>
              <div className="text-center text-[#94A3B8]">{team}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-24">
        <div className="mb-10 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#653ADB]/15 text-[#A78BFA]">
            <HelpCircle size={21} />
          </div>

          <h2 className="mt-4 text-3xl font-bold">
            Frequently asked questions
          </h2>

          <p className="mt-3 text-[#94A3B8]">
            Everything you need to know about DevHub pricing.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-[#27272A] bg-[#0B1220] px-5 py-4"
            >
              <summary className="cursor-pointer list-none font-medium text-[#F8FAFC]">
                <div className="flex items-center justify-between gap-4">
                  {faq.question}

                  <span className="text-xl text-[#64748B] transition group-open:rotate-45">
                    +
                  </span>
                </div>
              </summary>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#94A3B8]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#653ADB]/30 bg-gradient-to-br from-[#16102C] to-[#0B1220] px-6 py-14 text-center sm:px-10">
          <Sparkles
            className="mx-auto mb-5 text-[#A78BFA]"
            size={25}
          />

          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to build faster?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[#94A3B8]">
            Get access to powerful developer tools designed to make your
            everyday workflow faster and easier.
          </p>

          <Link
            href="/tools"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-6 py-3 text-sm font-semibold transition hover:bg-[#8B5CF6]"
          >
            Explore DevHub
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}