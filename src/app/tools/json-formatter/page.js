"use client";

import { useState } from "react";
import {
  Check,
  Code2,
  Copy,
  Download,
  Eraser,
  FileJson,
  Minimize2,
  RotateCcw,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";

const sampleJSON = `{
  "name": "Raunak",
  "age": 22,
  "role": "Full Stack Developer",
  "skills": [
    "React",
    "Next.js",
    "Node.js",
    "MongoDB"
  ],
  "projects": {
    "DevHub": true,
    "SmartFD": true
  }
}`;

export default function JsonFormatterPage() {
  const [input, setInput] = useState(sampleJSON);
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isValid, setIsValid] = useState(null);

  const parseJSON = () => {
    try {
      const parsed = JSON.parse(input);

      setError("");
      setIsValid(true);

      return parsed;
    } catch (err) {
      setOutput("");
      setIsValid(false);
      setError(err.message);

      return null;
    }
  };

  const formatJSON = () => {
    const parsed = parseJSON();

    if (parsed !== null) {
      setOutput(JSON.stringify(parsed, null, indent));
    }
  };

  const minifyJSON = () => {
    const parsed = parseJSON();

    if (parsed !== null) {
      setOutput(JSON.stringify(parsed));
    }
  };

  const validateJSON = () => {
    parseJSON();
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
    setIsValid(null);
    setCopied(false);
  };

  const loadSample = () => {
    setInput(sampleJSON);
    setOutput("");
    setError("");
    setIsValid(null);
  };

  const copyOutput = async () => {
    if (!output) return;

    await navigator.clipboard.writeText(output);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const downloadJSON = () => {
    if (!output) return;

    const blob = new Blob([output], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "formatted.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;

      setInput(content);
      setOutput("");
      setError("");
      setIsValid(null);
    };

    reader.readAsText(file);
  };

  const getStats = () => {
    if (!input.trim()) {
      return {
        keys: 0,
        objects: 0,
        arrays: 0,
        characters: 0,
      };
    }

    try {
      const parsed = JSON.parse(input);

      let keys = 0;
      let objects = 0;
      let arrays = 0;

      const traverse = (value) => {
        if (Array.isArray(value)) {
          arrays++;

          value.forEach((item) => {
            traverse(item);
          });

          return;
        }

        if (value && typeof value === "object") {
          objects++;

          Object.keys(value).forEach((key) => {
            keys++;
            traverse(value[key]);
          });
        }
      };

      traverse(parsed);

      return {
        keys,
        objects,
        arrays,
        characters: input.length,
      };
    } catch {
      return {
        keys: 0,
        objects: 0,
        arrays: 0,
        characters: input.length,
      };
    }
  };

  const stats = getStats();

  return (
    <main className="min-h-screen bg-[#01040D] text-white">
      {/* ========================================= */}
      {/* HERO / HEADER */}
      {/* ========================================= */}

      <section className="relative overflow-hidden border-b border-slate-800/70">
        {/* Glow */}
        <div className="absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-12">
          {/* Breadcrumb */}

          <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/">DevHub</Link>

            <span>/</span>

            <Link href="/tools">Tools</Link>

            <span>/</span>

            <Link href="/tools/json-formatter" className="text-violet-400">
              JSON Formatter
            </Link>
          </div>

          {/* Heading */}

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400">
                <FileJson size={24} />
              </div>

              <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                Developer Tool
              </span>
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                JSON Formatter
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
                Format, validate, beautify and minify JSON data
                instantly. Perfect for APIs, configuration files
                and everyday development.
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
              {/* Format */}

              <button
                onClick={formatJSON}
                className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
              >
                <Code2 size={17} />

                Format
              </button>

              {/* Minify */}

              <button
                onClick={minifyJSON}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white"
              >
                <Minimize2 size={17} />

                Minify
              </button>

              {/* Validate */}

              <button
                onClick={validateJSON}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white"
              >
                <Check size={17} />

                Validate
              </button>

              <div className="mx-1 hidden h-7 w-px bg-slate-800 sm:block" />

              {/* Upload */}

              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white">
                <Upload size={17} />

                Upload

                <input
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>

              {/* Sample */}

              <button
                onClick={loadSample}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white"
              >
                <RotateCcw size={16} />

                Sample
              </button>

              {/* Clear */}

              <button
                onClick={clearAll}
                className="ml-auto flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
              >
                <Eraser size={17} />

                Clear
              </button>
            </div>
          </div>

          {/* ========================================= */}
          {/* EDITOR */}
          {/* ========================================= */}

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* ========================================= */}
            {/* INPUT */}
            {/* ========================================= */}

            <div className="border-b border-slate-800 lg:border-b-0 lg:border-r">
              {/* Editor Header */}

              <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-violet-500" />

                  <span className="text-sm font-medium text-slate-200">
                    Input JSON
                  </span>
                </div>

                <span className="text-xs text-slate-500">
                  {input.length} characters
                </span>
              </div>

              {/* Textarea */}

              <div className="h-[500px]">
                <textarea
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);

                    setError("");

                    setIsValid(null);
                  }}
                  spellCheck={false}
                  placeholder="Paste your JSON here..."
                  className="h-full w-full resize-none bg-[#070C16] p-5 font-mono text-sm leading-6 text-slate-300 outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* ========================================= */}
            {/* OUTPUT */}
            {/* ========================================= */}

            <div>
              {/* Output Header */}

              <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${isValid === false
                        ? "bg-red-500"
                        : isValid === true
                          ? "bg-emerald-500"
                          : "bg-slate-600"
                      }`}
                  />

                  <span className="text-sm font-medium text-slate-200">
                    Formatted JSON
                  </span>
                </div>

                {/* Output Actions */}

                <div className="flex items-center gap-1">
                  <button
                    onClick={copyOutput}
                    disabled={!output}
                    className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    {copied ? (
                      <>
                        <Check size={14} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy
                      </>
                    )}
                  </button>

                  <button
                    onClick={downloadJSON}
                    disabled={!output}
                    className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Download size={14} />

                    Download
                  </button>
                </div>
              </div>

              {/* Output */}

              <div className="h-[500px] overflow-auto bg-[#070C16] p-5">
                {output ? (
                  <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-6 text-slate-300">
                    {output}
                  </pre>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400">
                        <Code2 size={22} />
                      </div>

                      <p className="text-sm font-medium text-slate-300">
                        Formatted JSON will appear here
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        Click Format or Validate to process your JSON
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ========================================= */}
          {/* ERROR */}
          {/* ========================================= */}

          {error && (
            <div className="border-t border-red-500/20 bg-red-500/5 px-5 py-4">
              <div className="flex gap-3">
                <div className="mt-0.5 text-red-400">
                  <X size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium text-red-400">
                    Invalid JSON
                  </p>

                  <p className="mt-1 break-all font-mono text-xs text-red-400/70">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* SUCCESS */}
          {/* ========================================= */}

          {isValid === true && !error && (
            <div className="border-t border-emerald-500/20 bg-emerald-500/5 px-5 py-3">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                <Check size={17} />

                Valid JSON
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* STATS */}
          {/* ========================================= */}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-800 bg-[#0E1625] px-5 py-3 text-xs text-slate-500">
            <span>
              Objects:{" "}
              <strong className="text-slate-300">
                {stats.objects}
              </strong>
            </span>

            <span>
              Arrays:{" "}
              <strong className="text-slate-300">
                {stats.arrays}
              </strong>
            </span>

            <span>
              Keys:{" "}
              <strong className="text-slate-300">
                {stats.keys}
              </strong>
            </span>

            <span>
              Characters:{" "}
              <strong className="text-slate-300">
                {stats.characters}
              </strong>
            </span>

            {/* Indentation */}

            <div className="ml-auto flex items-center gap-2">
              <span>Indentation:</span>

              <select
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
                className="rounded-md border border-slate-700 bg-[#070C16] px-2 py-1 text-xs text-slate-300 outline-none focus:border-violet-500"
              >
                <option value={2}>2 spaces</option>

                <option value={4}>4 spaces</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* INFORMATION */}
      {/* ========================================= */}

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {/* About */}

          <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
              <FileJson size={20} />
            </div>

            <h2 className="text-lg font-semibold">
              What is a JSON Formatter?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              A JSON Formatter makes JSON data easier to read by
              adding proper indentation and line breaks. It can also
              validate JSON and create a compact minified version.
            </p>
          </div>

          {/* Features */}

          <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
              <Code2 size={20} />
            </div>

            <h2 className="text-lg font-semibold">
              JSON Formatter Features
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-400">
              {[
                "JSON Formatting",
                "JSON Validation",
                "JSON Minification",
                "File Upload",
                "Copy Result",
                "Download JSON",
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
        </div>

        {/* ========================================= */}
        {/* HOW TO USE */}
        {/* ========================================= */}

        <div className="mt-6 rounded-2xl border border-slate-800 bg-[#0A101C] p-6">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-violet-400">
              Simple workflow
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              How to use JSON Formatter?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Format and validate your JSON in just a few steps.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {/* Step 1 */}

            <div>
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                1
              </div>

              <h3 className="font-semibold">
                Paste JSON
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Paste your JSON data into the input editor or
                upload a JSON file.
              </p>
            </div>

            {/* Step 2 */}

            <div>
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                2
              </div>

              <h3 className="font-semibold">
                Format or Validate
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Beautify your JSON or validate it to find syntax
                errors.
              </p>
            </div>

            {/* Step 3 */}

            <div>
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                3
              </div>

              <h3 className="font-semibold">
                Copy or Download
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Copy the formatted result or download it as a
                JSON file.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}