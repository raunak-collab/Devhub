"use client";

import { useState } from "react";
import {
  Check,
  Code2,
  Copy,
  Download,
  Eraser,
  FileCode2,
  FileJson,
  Upload,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";

const SAMPLE_CSV = `name,email,age,role
John Doe,john@example.com,24,Developer
Sarah Smith,sarah@example.com,27,Designer
Mike Johnson,mike@example.com,30,Manager`;

function parseCSV(csv) {
  const rows = [];
  let row = [];
  let value = "";
  let insideQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const nextChar = csv[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        value += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      row.push(value);
      value = "";
    } else if (
      (char === "\n" || char === "\r") &&
      !insideQuotes
    ) {
      if (char === "\r" && nextChar === "\n") {
        i++;
      }

      row.push(value);
      value = "";

      if (row.some((item) => item.trim() !== "")) {
        rows.push(row);
      }

      row = [];
    } else {
      value += char;
    }
  }

  if (value !== "" || row.length > 0) {
    row.push(value);

    if (row.some((item) => item.trim() !== "")) {
      rows.push(row);
    }
  }

  if (rows.length === 0) {
    return [];
  }

  const headers = rows[0].map((header, index) => {
    const cleaned = header.trim();

    return cleaned || `column_${index + 1}`;
  });

  return rows.slice(1).map((row) => {
    const object = {};

    headers.forEach((header, index) => {
      object[header] = row[index]?.trim() ?? "";
    });

    return object;
  });
}

export default function CSVToJSONPage() {
  const [csv, setCsv] = useState(SAMPLE_CSV);
  const [json, setJson] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convertCSV = (input = csv) => {
    try {
      setError("");
      setCopied(false);

      if (!input.trim()) {
        setJson("");
        setError("Please enter some CSV data.");
        return;
      }

      const result = parseCSV(input);

      if (!result.length) {
        setJson("");
        setError("No valid CSV rows were found.");
        return;
      }

      setJson(JSON.stringify(result, null, 2));
    } catch (err) {
      setJson("");
      setError("Unable to parse CSV data.");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (
      !file.name.toLowerCase().endsWith(".csv") &&
      file.type !== "text/csv"
    ) {
      setError("Please upload a valid CSV file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;

      setCsv(content);
      setError("");
      setJson("");
      setCopied(false);
    };

    reader.onerror = () => {
      setError("Unable to read the selected file.");
    };

    reader.readAsText(file);
  };

  const copyJSON = async () => {
    if (!json) return;

    await navigator.clipboard.writeText(json);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const downloadJSON = () => {
    if (!json) return;

    const blob = new Blob([json], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "converted-data.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setCsv("");
    setJson("");
    setError("");
    setCopied(false);
  };

  const loadSample = () => {
    setCsv(SAMPLE_CSV);
    setJson("");
    setError("");
    setCopied(false);
  };

  const rowCount = csv.trim()
    ? csv.trim().split(/\r?\n/).length
    : 0;

  const columnCount = csv.trim()
    ? csv.trim().split(/\r?\n/)[0]?.split(",").length || 0
    : 0;

  return (
    <main className="min-h-screen bg-[#01040D] text-white">
      {/* ========================================= */}
      {/* HERO / HEADER */}
      {/* ========================================= */}

      <section className="relative overflow-hidden border-b border-slate-800/70">
        {/* Glow */}

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
              href="/tools/csv-to-json"
              className="text-violet-400"
            >
              CSV to JSON
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
                CSV to JSON Converter
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
                Convert CSV data into clean and structured JSON
                instantly. Paste your CSV or upload a file and
                transform it with one click.
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
              {/* Convert */}

              <button
                onClick={() => convertCSV()}
                className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
              >
                <Sparkles size={17} />

                Convert
              </button>

              {/* Upload */}

              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white">
                <Upload size={17} />

                Upload CSV

                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Sample */}

              <button
                onClick={loadSample}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white"
              >
                <RefreshCw size={17} />

                Sample
              </button>

              <div className="mx-1 hidden h-7 w-px bg-slate-800 sm:block" />

              {/* Copy */}

              <button
                onClick={copyJSON}
                disabled={!json}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                {copied ? (
                  <Check size={17} />
                ) : (
                  <Copy size={17} />
                )}

                {copied ? "Copied" : "Copy JSON"}
              </button>

              {/* Download */}

              <button
                onClick={downloadJSON}
                disabled={!json}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Download size={17} />

                Download
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
            {/* CSV INPUT */}
            {/* ========================================= */}

            <div className="border-b border-slate-800 lg:border-b-0 lg:border-r">
              {/* Header */}

              <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-violet-500" />

                  <span className="text-sm font-medium text-slate-200">
                    CSV Input
                  </span>
                </div>

                <span className="text-xs text-slate-500">
                  {rowCount > 0 ? `${rowCount} rows` : "Empty"}
                </span>
              </div>

              {/* CSV Area */}

              <div className="h-100 bg-[#070C16] p-4">
                <textarea
                  value={csv}
                  onChange={(e) => {
                    setCsv(e.target.value);
                    setJson("");
                    setError("");
                    setCopied(false);
                  }}
                  spellCheck={false}
                  placeholder={`name,email,age
John Doe,john@example.com,24
Sarah Smith,sarah@example.com,27`}
                  className="h-full w-full resize-none rounded-xl border border-slate-800 bg-[#0A101C] p-5 font-mono text-sm leading-7 text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-violet-500/40"
                />
              </div>
            </div>

            {/* ========================================= */}
            {/* JSON OUTPUT */}
            {/* ========================================= */}

            <div>
              {/* Header */}

              <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-violet-500" />

                  <span className="text-sm font-medium text-slate-200">
                    JSON Output
                  </span>
                </div>

                <span className="text-xs text-slate-500">
                  {json ? "Valid JSON" : "No output"}
                </span>
              </div>

              {/* JSON Area */}

              <div className="relative h-100 bg-[#070C16] p-4">
                {json ? (
                  <pre className="h-full overflow-auto rounded-xl border border-slate-800 bg-[#0A101C] p-5 font-mono text-sm leading-7 text-slate-300">
                    {json}
                  </pre>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-800">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400">
                      <FileJson size={22} />
                    </div>

                    <p className="text-sm font-medium text-slate-300">
                      JSON output will appear here
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Click Convert to transform your CSV
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ========================================= */}
          {/* ERROR */}
          {/* ========================================= */}

          {error && (
            <div className="border-t border-red-500/20 bg-red-500/5 px-5 py-3">
              <div className="flex items-center gap-2 text-sm font-medium text-red-400">
                <X size={17} />

                {error}
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* INFO / SECURITY */}
          {/* ========================================= */}

          <div className="border-t border-emerald-500/20 bg-emerald-500/5 px-5 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
              <ShieldCheck size={17} />

              CSV data is processed locally in your browser
            </div>
          </div>

          {/* ========================================= */}
          {/* STATS */}
          {/* ========================================= */}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-800 bg-[#0E1625] px-5 py-3 text-xs text-slate-500">
            <span>
              Rows:{" "}
              <strong className="text-slate-300">
                {rowCount > 0 ? rowCount - 1 : 0}
              </strong>
            </span>

            <span>
              Columns:{" "}
              <strong className="text-slate-300">
                {columnCount}
              </strong>
            </span>

            <span>
              Input:{" "}
              <strong className="text-slate-300">
                CSV
              </strong>
            </span>

            <span>
              Output:{" "}
              <strong className="text-slate-300">
                JSON
              </strong>
            </span>

            <div className="ml-auto flex items-center gap-2 text-emerald-400">
              <ShieldCheck size={14} />

              Client-side conversion
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
              <FileCode2 size={20} />
            </div>

            <h2 className="text-lg font-semibold">
              What is a CSV to JSON Converter?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              A CSV to JSON converter transforms tabular CSV data
              into structured JSON objects. The first row is used
              as the object keys and each following row becomes a
              JSON object.
            </p>
          </div>

          {/* Features */}

          <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
              <Code2 size={20} />
            </div>

            <h2 className="text-lg font-semibold">
              CSV to JSON Features
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-400">
              {[
                "CSV Input",
                "File Upload",
                "JSON Conversion",
                "Pretty JSON",
                "Copy JSON",
                "Download JSON",
                "Sample Data",
                "Local Processing",
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
              How to use CSV to JSON Converter?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Convert your CSV data into structured JSON in just a
              few steps.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {/* Step 1 */}

            <div>
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                1
              </div>

              <h3 className="font-semibold">
                Add CSV Data
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Paste your CSV data into the editor or upload a
                CSV file from your computer.
              </p>
            </div>

            {/* Step 2 */}

            <div>
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                2
              </div>

              <h3 className="font-semibold">
                Convert to JSON
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Click Convert and DevHub will transform your CSV
                rows into structured JSON objects.
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
                Copy the generated JSON to your clipboard or
                download it as a JSON file.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}