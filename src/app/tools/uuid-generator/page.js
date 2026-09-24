"use client";

import { useState } from "react";
import {
  Check,
  Clipboard,
  Code2,
  Copy,
  Eraser,
  FileCode2,
  History,
  ShieldCheck,
  Sparkles,
  Trash2,
  Zap,
} from "lucide-react";
import Link from "next/link";

/* ========================================= */
/* MAIN PAGE */
/* ========================================= */

export default function UUIDGeneratorPage() {
  const [uuid, setUuid] = useState("");
  const [copied, setCopied] = useState(false);

  const [history, setHistory] = useState([]);

  const [uppercase, setUppercase] = useState(false);
  const [removeHyphens, setRemoveHyphens] = useState(false);

  const [generatedCount, setGeneratedCount] = useState(0);

  /* ========================================= */
  /* GENERATE UUID */
  /* ========================================= */

  const generateUUID = () => {
    /*
     * crypto.randomUUID()
     *
     * Browser's cryptographically secure
     * UUID v4 generator.
     */
    let newUUID = crypto.randomUUID();

    /*
     * Remove hyphens if option is enabled.
     */
    if (removeHyphens) {
      newUUID = newUUID.replace(/-/g, "");
    }

    /*
     * Convert to uppercase if enabled.
     */
    if (uppercase) {
      newUUID = newUUID.toUpperCase();
    }

    setUuid(newUUID);

    /*
     * Increase generated counter.
     */
    setGeneratedCount((prev) => prev + 1);

    /*
     * Add UUID to history.
     *
     * Only keep the latest 10.
     */
    setHistory((prev) => {
      const updated = [newUUID, ...prev];

      return updated.slice(0, 10);
    });

    setCopied(false);
  };

  /* ========================================= */
  /* COPY UUID */
  /* ========================================= */

  const copyUUID = async (value = uuid) => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      console.error("Failed to copy UUID.");
    }
  };

  /* ========================================= */
  /* CLEAR */
  /* ========================================= */

  const handleClear = () => {
    setUuid("");
    setHistory([]);
    setCopied(false);
  };

  /* ========================================= */
  /* FORMAT UUID */
  /* ========================================= */

  const formatUUID = (value, remove = removeHyphens, upper = uppercase) => {
    let formatted = value;

    /*
     * Remove existing hyphens first.
     */
    const clean = formatted.replace(/-/g, "");

    /*
     * Add UUID hyphens when required.
     */
    if (!remove && clean.length === 32) {
      formatted =
        `${clean.slice(0, 8)}-` +
        `${clean.slice(8, 12)}-` +
        `${clean.slice(12, 16)}-` +
        `${clean.slice(16, 20)}-` +
        `${clean.slice(20)}`;
    } else if (remove) {
      formatted = clean;
    }

    /*
     * Uppercase / lowercase.
     */
    formatted = upper
      ? formatted.toUpperCase()
      : formatted.toLowerCase();

    return formatted;
  };

  /* ========================================= */
  /* TOGGLE UPPERCASE */
  /* ========================================= */

  const handleUppercase = () => {
    const newValue = !uppercase;

    setUppercase(newValue);

    if (!uuid) return;

    const formatted = formatUUID(
      uuid,
      removeHyphens,
      newValue
    );

    setUuid(formatted);

    setHistory((prev) =>
      prev.map((item) =>
        item === uuid ? formatted : item
      )
    );
  };

  /* ========================================= */
  /* TOGGLE HYPHENS */
  /* ========================================= */

  const handleHyphens = () => {
    const newValue = !removeHyphens;

    setRemoveHyphens(newValue);

    if (!uuid) return;

    const formatted = formatUUID(
      uuid,
      newValue,
      uppercase
    );

    setUuid(formatted);

    setHistory((prev) =>
      prev.map((item) =>
        item === uuid ? formatted : item
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#01040D] text-white">

      {/* ========================================= */}
      {/* HERO */}
      {/* ========================================= */}

      <section className="relative overflow-hidden border-b border-slate-800/70">

        {/* Background glow */}

        <div className="absolute left-1/2 top-0 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />

        <div className="relative mx-3 max-w-7xl px-6 pb-12 pt-12">

          {/* Breadcrumb */}

          <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">

            <Link
              href="/"
              className="transition hover:text-slate-300"
            >
              DevHub
            </Link>

            <span>/</span>

            <Link
              href="/tools"
              className="transition hover:text-slate-300"
            >
              Tools
            </Link>

            <span>/</span>

            <Link
              href="/tools/uuid-generator"
              className="text-violet-400"
            >
              UUID Generator
            </Link>

          </div>

          {/* Heading */}

          <div className="flex flex-col gap-5">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400">
                <FileCode2 size={24} />
              </div>

              <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                Developer Tool
              </span>

            </div>

            <div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                UUID Generator
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
                Generate secure random UUID v4 identifiers
                instantly. Create unique IDs directly in your
                browser without sending data to a server.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================= */}
      {/* TOOL */}
      {/* ========================================= */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0A101C] shadow-2xl shadow-black/20">

          {/* ========================================= */}
          {/* TOOLBAR */}
          {/* ========================================= */}

          <div className="border-b border-slate-800 p-4">

            <div className="flex flex-wrap items-center gap-2">

              {/* GENERATE */}

              <button
                onClick={generateUUID}
                className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 active:scale-[0.98]"
              >
                <Sparkles size={17} />
                Generate UUID
              </button>

              {/* COPY */}

              <button
                onClick={() => copyUUID()}
                disabled={!uuid}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                {copied ? (
                  <Check size={17} />
                ) : (
                  <Copy size={17} />
                )}

                {copied ? "Copied" : "Copy UUID"}
              </button>

              {/* CLEAR */}

              <button
                onClick={handleClear}
                className="ml-auto flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
              >
                <Eraser size={17} />
                Clear
              </button>

            </div>

          </div>

          {/* ========================================= */}
          {/* UUID OUTPUT */}
          {/* ========================================= */}

          <div className="border-b border-slate-800">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">

              <div className="flex items-center gap-2">

                <div className="h-2 w-2 rounded-full bg-violet-500" />

                <span className="text-sm font-medium text-slate-200">
                  Generated UUID
                </span>

              </div>

              <div className="flex items-center gap-3">

                <span className="font-mono text-xs text-slate-500">
                  UUID v4
                </span>

                {uuid && (
                  <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-300">
                    Generated
                  </span>
                )}

              </div>

            </div>

            {/* Output */}

            <div className="bg-[#070C16] p-5">

              <div className="relative min-h-32 rounded-xl border border-slate-800 bg-[#0A101C] p-6">

                {uuid ? (
                  <div className="flex min-h-20 items-center">

                    <p className="w-full break-all pr-12 font-mono text-lg leading-8 text-violet-300 sm:text-xl">
                      {uuid}
                    </p>

                    <button
                      onClick={() => copyUUID()}
                      className="absolute right-4 top-4 rounded-lg border border-slate-700 bg-[#0E1625] p-2 text-slate-400 transition hover:border-violet-500/40 hover:text-violet-400"
                      title="Copy UUID"
                    >
                      {copied ? (
                        <Check size={17} />
                      ) : (
                        <Clipboard size={17} />
                      )}
                    </button>

                  </div>
                ) : (
                  <div className="flex min-h-20 items-center">

                    <div>

                      <p className="font-mono text-sm text-slate-600">
                        xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
                      </p>

                      <p className="mt-3 text-xs text-slate-600">
                        Click &quot;Generate UUID&quot; to create a
                        secure UUID v4.
                      </p>

                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* OPTIONS */}
          {/* ========================================= */}

          <div className="border-b border-slate-800">

            <div className="border-b border-slate-800 bg-[#0E1625] px-4 py-3">

              <span className="text-sm font-medium text-slate-200">
                Formatting Options
              </span>

            </div>

            <div className="bg-[#070C16] p-5">

              <div className="grid gap-3 sm:grid-cols-2">

                {/* UPPERCASE */}

                <button
                  onClick={handleUppercase}
                  className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                    uppercase
                      ? "border-violet-500/40 bg-violet-500/10"
                      : "border-slate-800 bg-[#0A101C] hover:border-slate-700"
                  }`}
                >

                  <div>

                    <p className="text-sm font-medium text-slate-200">
                      Uppercase
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Use A-F instead of a-f
                    </p>

                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                      uppercase
                        ? "border-violet-500 bg-violet-600 text-white"
                        : "border-slate-700"
                    }`}
                  >
                    {uppercase && <Check size={14} />}
                  </div>

                </button>

                {/* REMOVE HYPHENS */}

                <button
                  onClick={handleHyphens}
                  className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                    removeHyphens
                      ? "border-violet-500/40 bg-violet-500/10"
                      : "border-slate-800 bg-[#0A101C] hover:border-slate-700"
                  }`}
                >

                  <div>

                    <p className="text-sm font-medium text-slate-200">
                      Remove Hyphens
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Use the 32-character format
                    </p>

                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                      removeHyphens
                        ? "border-violet-500 bg-violet-600 text-white"
                        : "border-slate-700"
                    }`}
                  >
                    {removeHyphens && <Check size={14} />}
                  </div>

                </button>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* STATS */}
          {/* ========================================= */}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 bg-[#0E1625] px-5 py-3 text-xs text-slate-500">

            <span>
              Generated:{" "}
              <strong className="text-slate-300">
                {generatedCount}
              </strong>
            </span>

            <span>
              Version:{" "}
              <strong className="font-mono text-violet-400">
                v4
              </strong>
            </span>

            <span>
              Format:{" "}
              <strong className="font-mono text-slate-300">
                {removeHyphens ? "32 chars" : "36 chars"}
              </strong>
            </span>

            <div className="ml-auto">

              {uuid ? (
                <span className="text-emerald-400">
                  UUID Generated
                </span>
              ) : (
                <span className="text-slate-500">
                  Ready
                </span>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* ========================================= */}
      {/* HISTORY + UUID INFO */}
      {/* ========================================= */}

      <section className="mx-auto max-w-7xl px-6 pb-6">

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">

          {/* UUID INFORMATION */}

          <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">

            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
              <FileCode2 size={20} />
            </div>

            <h2 className="text-lg font-semibold">
              What is UUID v4?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              UUID stands for Universally Unique Identifier.
              UUID v4 is a randomly generated identifier
              containing 128 bits. It is commonly used for
              database records, API resources, sessions and
              other situations where a unique identifier is
              required.
            </p>

            {/* UUID FORMAT */}

            <div className="mt-5 rounded-xl border border-slate-800 bg-[#070C16] p-5">

              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                UUID v4 Format
              </p>

              <p className="break-all font-mono text-sm leading-7 text-violet-400">
                xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
              </p>

            </div>

            {/* DETAILS */}

            <div className="mt-5 grid gap-3 sm:grid-cols-3">

              <div className="rounded-xl bg-[#070C16] p-4">

                <p className="text-xs text-slate-500">
                  Total Bits
                </p>

                <p className="mt-1 font-mono text-lg font-semibold text-slate-200">
                  128
                </p>

              </div>

              <div className="rounded-xl bg-[#070C16] p-4">

                <p className="text-xs text-slate-500">
                  Random Bits
                </p>

                <p className="mt-1 font-mono text-lg font-semibold text-slate-200">
                  122
                </p>

              </div>

              <div className="rounded-xl bg-[#070C16] p-4">

                <p className="text-xs text-slate-500">
                  Version
                </p>

                <p className="mt-1 font-mono text-lg font-semibold text-violet-400">
                  v4
                </p>

              </div>

            </div>

          </div>

          {/* HISTORY */}

          <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">

            <div className="mb-5 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <History
                  size={19}
                  className="text-violet-400"
                />

                <h2 className="font-semibold">
                  Recent UUIDs
                </h2>

              </div>

              {history.length > 0 && (
                <button
                  onClick={() => setHistory([])}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                  title="Clear history"
                >
                  <Trash2 size={16} />
                </button>
              )}

            </div>

            {history.length === 0 ? (

              <div className="py-10 text-center">

                <History
                  size={30}
                  className="mx-auto mb-3 text-slate-700"
                />

                <p className="text-sm text-slate-500">
                  No UUIDs generated yet.
                </p>

                <p className="mt-1 text-xs text-slate-700">
                  Your latest UUIDs will appear here.
                </p>

              </div>

            ) : (

              <div className="space-y-2">

                {history.map((item, index) => (

                  <div
                    key={`${item}-${index}`}
                    className="group flex items-center gap-2 rounded-xl border border-slate-800 bg-[#070C16] p-3 transition hover:border-violet-500/20"
                  >

                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-500/10 font-mono text-[10px] text-violet-400">
                      {index + 1}
                    </span>

                    <p className="min-w-0 flex-1 truncate font-mono text-xs text-slate-500 group-hover:text-slate-300">
                      {item}
                    </p>

                    <button
                      onClick={() => copyUUID(item)}
                      className="shrink-0 rounded-lg p-1.5 text-slate-600 transition hover:bg-violet-500/10 hover:text-violet-400"
                      title="Copy UUID"
                    >
                      <Clipboard size={15} />
                    </button>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </section>

      {/* ========================================= */}
      {/* USE CASES */}
      {/* ========================================= */}

      <section className="mx-auto max-w-7xl px-6 pb-6">

        <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">

          <div className="mb-6">

            <p className="text-xs font-medium uppercase tracking-widest text-violet-400">
              Common Uses
            </p>

            <h2 className="mt-2 text-xl font-bold">
              Where are UUIDs used?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              UUIDs are useful whenever applications need
              unique identifiers.
            </p>

          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {/* DATABASE */}

            <div className="rounded-xl border border-slate-800 bg-[#070C16] p-4">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                <Code2 size={17} />
              </div>

              <h3 className="text-sm font-medium text-slate-200">
                Database IDs
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Create unique identifiers for database records.
              </p>

            </div>

            {/* API */}

            <div className="rounded-xl border border-slate-800 bg-[#070C16] p-4">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                <Zap size={17} />
              </div>

              <h3 className="text-sm font-medium text-slate-200">
                API Resources
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Identify users, products, orders and resources.
              </p>

            </div>

            {/* SESSIONS */}

            <div className="rounded-xl border border-slate-800 bg-[#070C16] p-4">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                <ShieldCheck size={17} />
              </div>

              <h3 className="text-sm font-medium text-slate-200">
                Sessions
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Generate unique identifiers for application
                sessions.
              </p>

            </div>

            {/* FILES */}

            <div className="rounded-xl border border-slate-800 bg-[#070C16] p-4">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                <FileCode2 size={17} />
              </div>

              <h3 className="text-sm font-medium text-slate-200">
                File Identifiers
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Give uploaded files or objects unique IDs.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================= */}
      {/* HOW TO USE */}
      {/* ========================================= */}

      <section className="mx-auto max-w-7xl px-6 pb-6">

        <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">

          <div className="mb-8">

            <p className="text-xs font-medium uppercase tracking-widest text-violet-400">
              Simple workflow
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              How to generate a UUID?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Create a secure UUID in just a few simple steps.
            </p>

          </div>

          <div className="grid gap-6 sm:grid-cols-3">

            {/* STEP 1 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                1
              </div>

              <h3 className="font-semibold">
                Click Generate
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Click the Generate UUID button to create a
                cryptographically secure UUID v4.
              </p>

            </div>

            {/* STEP 2 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                2
              </div>

              <h3 className="font-semibold">
                Customize Format
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Choose uppercase characters or remove
                hyphens depending on your requirements.
              </p>

            </div>

            {/* STEP 3 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                3
              </div>

              <h3 className="font-semibold">
                Copy UUID
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Copy the generated identifier and use it
                anywhere in your application.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================= */}
      {/* FEATURES */}
      {/* ========================================= */}

      <section className="mx-auto max-w-7xl px-6 pb-6">

        <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">

          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
            <Zap size={20} />
          </div>

          <h2 className="text-lg font-semibold">
            UUID Generator Features
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-400 sm:grid-cols-4">

            {[
              "UUID v4 Generation",
              "Cryptographically Secure",
              "Uppercase Support",
              "Hyphen Removal",
              "Copy to Clipboard",
              "Generation History",
              "Local Processing",
              "No Server Required",
            ].map((feature) => (

              <div
                key={feature}
                className="flex items-center gap-2"
              >

                <Check
                  size={15}
                  className="text-violet-400"
                />

                {feature}

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ========================================= */}
      {/* SECURITY */}
      {/* ========================================= */}

      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

          <div className="flex items-start gap-3">

            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-emerald-400"
            />

            <div>

              <p className="text-sm font-semibold text-emerald-400">
                Generated Locally
              </p>

              <p className="mt-1 text-xs leading-5 text-emerald-400/60">
                UUIDs are generated directly in your browser
                using the Web Crypto API. No generated UUID or
                personal data is sent to a server.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

