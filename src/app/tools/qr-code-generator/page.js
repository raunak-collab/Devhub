"use client";

import { useState } from "react";
import {
  Check,
  Clipboard,
  Code2,
  Copy,
  Download,
  Eraser,
  FileCode2,
  History,
  QrCode,
  ShieldCheck,
  Sparkles,
  Trash2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";

/* ========================================= */
/* MAIN PAGE */
/* ========================================= */

export default function QRCodeGeneratorPage() {
  const [text, setText] = useState("");
  const [generatedQR, setGeneratedQR] = useState("");
  const [copied, setCopied] = useState(false);

  const [history, setHistory] = useState([]);

  const [generatedCount, setGeneratedCount] = useState(0);

  /* ========================================= */
  /* GENERATE QR */
/* ========================================= */

  const generateQR = () => {
    if (!text.trim()) return;

    const value = text.trim();

    setGeneratedQR(value);

    setGeneratedCount((prev) => prev + 1);

    setHistory((prev) => {
      const updated = [value, ...prev];

      return updated.slice(0, 10);
    });

    setCopied(false);
  };

  /* ========================================= */
  /* COPY CONTENT */
/* ========================================= */

  const copyContent = async (value = generatedQR) => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      console.error("Failed to copy content.");
    }
  };

  /* ========================================= */
  /* DOWNLOAD QR */
/* ========================================= */

  const downloadQR = () => {
    const canvas = document.getElementById("qr-code-canvas");

    if (!canvas) return;

    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.href = url;
    link.download = "devhub-qr-code.png";

    link.click();
  };

  /* ========================================= */
  /* CLEAR */
/* ========================================= */

  const handleClear = () => {
    setText("");
    setGeneratedQR("");
    setHistory([]);
    setCopied(false);
  };

  /* ========================================= */
  /* SELECT HISTORY ITEM */
/* ========================================= */

  const selectHistory = (value) => {
    setText(value);
    setGeneratedQR(value);
    setCopied(false);
  };

  return (
    <main className="min-h-screen bg-[#01040D] text-white">

      {/* ========================================= */}
      {/* HERO */}
      {/* ========================================= */}

      <section className="relative overflow-hidden border-b border-slate-800/70">

        {/* Background glow */}

        <div className="absolute left-1/2 top-0 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-12">

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
              href="/tools/qr-code-generator"
              className="text-violet-400"
            >
              QR Code Generator
            </Link>

          </div>

          {/* Heading */}

          <div className="flex flex-col gap-5">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400">
                <QrCode size={24} />
              </div>

              <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                Developer Tool
              </span>

            </div>

            <div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                QR Code Generator
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
                Generate QR codes instantly from text, URLs and other
                data. Create and download QR codes directly in your
                browser without sending your data to a server.
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
                onClick={generateQR}
                disabled={!text.trim()}
                className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Sparkles size={17} />
                Generate QR
              </button>

              {/* COPY */}

              <button
                onClick={() => copyContent()}
                disabled={!generatedQR}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                {copied ? (
                  <Check size={17} />
                ) : (
                  <Copy size={17} />
                )}

                {copied ? "Copied" : "Copy Content"}
              </button>

              {/* DOWNLOAD */}

              <button
                onClick={downloadQR}
                disabled={!generatedQR}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Download size={17} />
                Download PNG
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
          {/* QR INPUT + OUTPUT */}
          {/* ========================================= */}

          <div className="border-b border-slate-800">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">

              <div className="flex items-center gap-2">

                <div className="h-2 w-2 rounded-full bg-violet-500" />

                <span className="text-sm font-medium text-slate-200">
                  QR Code Content
                </span>

              </div>

              <div className="flex items-center gap-3">

                <span className="font-mono text-xs text-slate-500">
                  QR
                </span>

                {generatedQR && (
                  <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-300">
                    Generated
                  </span>
                )}

              </div>

            </div>

            {/* Content */}

            <div className="grid gap-6 bg-[#070C16] p-5 lg:grid-cols-[1fr_350px]">

              {/* INPUT */}

              <div>

                <label className="mb-3 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Enter Text or URL
                </label>

                <textarea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setGeneratedQR("");
                    setCopied(false);
                  }}
                  placeholder="https://example.com"
                  rows={9}
                  className="w-full resize-none rounded-xl border border-slate-800 bg-[#0A101C] p-5 font-mono text-sm leading-7 text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
                />

                <div className="mt-2 flex justify-end text-xs text-slate-600">
                  {text.length} characters
                </div>

              </div>

              {/* QR OUTPUT */}

              <div>

                <label className="mb-3 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  QR Preview
                </label>

                <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-slate-800 bg-[#0A101C] p-5">

                  {generatedQR ? (

                    <div className="rounded-xl bg-white p-4 shadow-xl">

                      <QRCodeCanvas
                        id="qr-code-canvas"
                        value={generatedQR}
                        size={240}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                        includeMargin
                      />

                    </div>

                  ) : (

                    <div className="text-center">

                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400">
                        <QrCode size={28} />
                      </div>

                      <p className="font-mono text-sm text-slate-600">
                        QR Code Preview
                      </p>

                      <p className="mt-2 text-xs text-slate-600">
                        Enter content and click &quot;Generate QR&quot;.
                      </p>

                    </div>

                  )}

                </div>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* QR DETAILS */}
          {/* ========================================= */}

          <div className="border-b border-slate-800">

            <div className="border-b border-slate-800 bg-[#0E1625] px-4 py-3">

              <span className="text-sm font-medium text-slate-200">
                QR Code Details
              </span>

            </div>

            <div className="bg-[#070C16] p-5">

              <div className="grid gap-3 sm:grid-cols-3">

                <div className="rounded-xl border border-slate-800 bg-[#0A101C] p-4">

                  <p className="text-xs text-slate-500">
                    Content Length
                  </p>

                  <p className="mt-1 font-mono text-lg font-semibold text-slate-200">
                    {generatedQR.length}
                  </p>

                </div>

                <div className="rounded-xl border border-slate-800 bg-[#0A101C] p-4">

                  <p className="text-xs text-slate-500">
                    Error Correction
                  </p>

                  <p className="mt-1 font-mono text-lg font-semibold text-violet-400">
                    High
                  </p>

                </div>

                <div className="rounded-xl border border-slate-800 bg-[#0A101C] p-4">

                  <p className="text-xs text-slate-500">
                    Output
                  </p>

                  <p className="mt-1 font-mono text-lg font-semibold text-slate-200">
                    PNG
                  </p>

                </div>

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
              Type:{" "}
              <strong className="font-mono text-violet-400">
                QR
              </strong>
            </span>

            <span>
              Format:{" "}
              <strong className="font-mono text-slate-300">
                PNG
              </strong>
            </span>

            <div className="ml-auto">

              {generatedQR ? (
                <span className="text-emerald-400">
                  QR Generated
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
      {/* HISTORY + QR INFORMATION */}
      {/* ========================================= */}

      <section className="mx-auto max-w-7xl px-6 pb-6">

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">

          {/* QR INFORMATION */}

          <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">

            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
              <QrCode size={20} />
            </div>

            <h2 className="text-lg font-semibold">
              What is a QR Code?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              A QR code is a two-dimensional barcode that can store
              information such as URLs, text, contact details and
              other data. QR codes can be scanned by smartphones and
              other compatible devices to quickly access the encoded
              information.
            </p>

            {/* QR EXAMPLE */}

            <div className="mt-5 rounded-xl border border-slate-800 bg-[#070C16] p-5">

              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                Example Content
              </p>

              <p className="break-all font-mono text-sm leading-7 text-violet-400">
                https://example.com
              </p>

            </div>

            {/* DETAILS */}

            <div className="mt-5 grid gap-3 sm:grid-cols-3">

              <div className="rounded-xl bg-[#070C16] p-4">

                <p className="text-xs text-slate-500">
                  Dimension
                </p>

                <p className="mt-1 font-mono text-lg font-semibold text-slate-200">
                  2D
                </p>

              </div>

              <div className="rounded-xl bg-[#070C16] p-4">

                <p className="text-xs text-slate-500">
                  Output
                </p>

                <p className="mt-1 font-mono text-lg font-semibold text-slate-200">
                  PNG
                </p>

              </div>

              <div className="rounded-xl bg-[#070C16] p-4">

                <p className="text-xs text-slate-500">
                  Processing
                </p>

                <p className="mt-1 font-mono text-lg font-semibold text-violet-400">
                  Local
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
                  Recent QR Codes
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
                  No QR codes generated yet.
                </p>

                <p className="mt-1 text-xs text-slate-700">
                  Your latest QR content will appear here.
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

                    <button
                      onClick={() => selectHistory(item)}
                      className="min-w-0 flex-1 truncate text-left font-mono text-xs text-slate-500 transition hover:text-slate-300"
                    >
                      {item}
                    </button>

                    <button
                      onClick={() => copyContent(item)}
                      className="shrink-0 rounded-lg p-1.5 text-slate-600 transition hover:bg-violet-500/10 hover:text-violet-400"
                      title="Copy content"
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
              Where are QR codes used?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              QR codes are useful whenever information needs to be
              quickly accessed by scanning.
            </p>

          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {/* WEBSITES */}

            <div className="rounded-xl border border-slate-800 bg-[#070C16] p-4">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                <Code2 size={17} />
              </div>

              <h3 className="text-sm font-medium text-slate-200">
                Websites
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Share website URLs that users can open by scanning.
              </p>

            </div>

            {/* PAYMENTS */}

            <div className="rounded-xl border border-slate-800 bg-[#070C16] p-4">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                <Zap size={17} />
              </div>

              <h3 className="text-sm font-medium text-slate-200">
                Payments
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Encode payment information for quick scanning.
              </p>

            </div>

            {/* CONTACT */}

            <div className="rounded-xl border border-slate-800 bg-[#070C16] p-4">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                <ShieldCheck size={17} />
              </div>

              <h3 className="text-sm font-medium text-slate-200">
                Contact Info
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Share contact information without typing it manually.
              </p>

            </div>

            {/* MARKETING */}

            <div className="rounded-xl border border-slate-800 bg-[#070C16] p-4">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                <FileCode2 size={17} />
              </div>

              <h3 className="text-sm font-medium text-slate-200">
                Marketing
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Add scannable links to posters, products and campaigns.
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
              How to generate a QR code?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Create and download a QR code in just a few simple steps.
            </p>

          </div>

          <div className="grid gap-6 sm:grid-cols-3">

            {/* STEP 1 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                1
              </div>

              <h3 className="font-semibold">
                Enter Content
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter a URL, text or any other information you want
                to store inside the QR code.
              </p>

            </div>

            {/* STEP 2 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                2
              </div>

              <h3 className="font-semibold">
                Generate QR
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Click the Generate QR button to create your QR code
                directly in the browser.
              </p>

            </div>

            {/* STEP 3 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                3
              </div>

              <h3 className="font-semibold">
                Download QR
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Download the generated QR code as a PNG image and
                use it anywhere you need.
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
            QR Code Generator Features
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-400 sm:grid-cols-4">

            {[
              "Text & URL Support",
              "Instant Generation",
              "High Error Correction",
              "PNG Download",
              "Copy Content",
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
                QR codes are generated directly in your browser.
                Your entered content is not sent to a server while
                generating the QR code.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
