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
  Minimize2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";

/* ========================================= */
/* SAMPLE XML */
/* ========================================= */

const sampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<users>
  <user id="1">
    <name>Raunak</name>
    <role>Developer</role>
    <skills>
      <skill>React</skill>
      <skill>Next.js</skill>
      <skill>Node.js</skill>
    </skills>
  </user>
  <user id="2">
    <name>John</name>
    <role>Designer</role>
    <skills>
      <skill>Figma</skill>
      <skill>UI Design</skill>
    </skills>
  </user>
</users>`;

/* ========================================= */
/* MAIN PAGE */
/* ========================================= */

export default function XMLFormatterPage() {
  const [xml, setXml] = useState("");
  const [output, setOutput] = useState("");

  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [error, setError] = useState("");

  const [history, setHistory] = useState([]);

  const [indentSize, setIndentSize] = useState(2);

  /* ========================================= */
  /* PARSE XML */
  /* ========================================= */

  const parseXML = (value) => {
    const parser = new DOMParser();

    const document = parser.parseFromString(
      value,
      "application/xml"
    );

    const parserError = document.querySelector("parsererror");

    if (parserError) {
      throw new Error(
        parserError.textContent || "Invalid XML"
      );
    }

    return document;
  };

  /* ========================================= */
  /* SERIALIZE NODE */
  /* ========================================= */

  const serializeNode = (node, level = 0, indent = 2) => {
    const spaces = " ".repeat(level * indent);

    /* XML declaration / processing instruction */

    if (
      node.nodeType === Node.PROCESSING_INSTRUCTION_NODE
    ) {
      return `${spaces}<?${node.nodeName} ${node.nodeValue}?>`;
    }

    /* Comment */

    if (node.nodeType === Node.COMMENT_NODE) {
      return `${spaces}<!--${node.nodeValue}-->`;
    }

    /* Text */

    if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue.trim();
    }

    /* CDATA */

    if (node.nodeType === Node.CDATA_SECTION_NODE) {
      return `${spaces}<![CDATA[${node.nodeValue}]]>`;
    }

    /* Element */

    if (node.nodeType === Node.ELEMENT_NODE) {
      const serializer = new XMLSerializer();

      const openingTag = serializer.serializeToString(node)
        .split(">")[0] + ">";

      /*
       * Get attributes only.
       *
       * XMLSerializer above may include the complete
       * element, so we construct the opening tag manually.
       */

      let tag = `<${node.tagName}`;

      for (const attribute of Array.from(node.attributes)) {
        tag += ` ${attribute.name}="${attribute.value
          .replace(/&/g, "&amp;")
          .replace(/"/g, "&quot;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}"`;
      }

      const children = Array.from(node.childNodes);

      /*
       * No children.
       */

      if (children.length === 0) {
        return `${spaces}${tag}/>`;
      }

      /*
       * Check whether this element contains
       * only text / CDATA content.
       */

      const hasElementChildren = children.some(
        (child) =>
          child.nodeType === Node.ELEMENT_NODE
      );

      const hasNonWhitespaceText = children.some(
        (child) =>
          child.nodeType === Node.TEXT_NODE &&
          child.nodeValue.trim() !== ""
      );

      /*
       * Mixed content should not be aggressively
       * formatted because whitespace can be meaningful.
       */

      if (!hasElementChildren) {
        const inner = children
          .map((child) => {
            if (
              child.nodeType === Node.TEXT_NODE
            ) {
              return child.nodeValue.trim();
            }

            if (
              child.nodeType === Node.CDATA_SECTION_NODE
            ) {
              return `<![CDATA[${child.nodeValue}]]>`;
            }

            if (
              child.nodeType === Node.COMMENT_NODE
            ) {
              return `<!--${child.nodeValue}-->`;
            }

            return serializer.serializeToString(child);
          })
          .join("");

        return `${spaces}${tag}>${inner}</${node.tagName}>`;
      }

      /*
       * Element contains child elements.
       */

      const formattedChildren = children
        .filter((child) => {
          /*
           * Ignore whitespace-only text nodes
           * created by existing formatting.
           */

          if (child.nodeType === Node.TEXT_NODE) {
            return child.nodeValue.trim() !== "";
          }

          return true;
        })
        .map((child) =>
          serializeNode(
            child,
            level + 1,
            indent
          )
        )
        .join("\n");

      /*
       * If meaningful text exists along with child
       * elements, preserve it as much as possible.
       */

      if (hasNonWhitespaceText) {
        const compact = new XMLSerializer()
          .serializeToString(node)
          .replace(/>\s+</g, "><");

        return `${spaces}${compact}`;
      }

      return (
        `${spaces}${tag}>\n` +
        formattedChildren +
        `\n${spaces}</${node.tagName}>`
      );
    }

    return "";
  };

  /* ========================================= */
  /* FORMAT XML */
/* ========================================= */

  const formatXML = () => {
    if (!xml.trim()) {
      setError("Please enter XML first.");
      setStatus("Error");
      return;
    }

    try {
      const document = parseXML(xml);

      let result = "";

      /*
       * Preserve XML declaration if present.
       */

      const processingInstructions =
        Array.from(document.childNodes).filter(
          (node) =>
            node.nodeType ===
            Node.PROCESSING_INSTRUCTION_NODE
        );

      processingInstructions.forEach((node) => {
        result += serializeNode(node, 0, indentSize) + "\n";
      });

      /*
       * Format root element.
       */

      if (document.documentElement) {
        result += serializeNode(
          document.documentElement,
          0,
          indentSize
        );
      }

      setOutput(result);
      setError("");
      setStatus("Valid XML");

      /*
       * Add to history.
       */

      setHistory((prev) => {
        const updated = [result, ...prev];

        return updated.slice(0, 8);
      });

      setCopied(false);
    } catch (error) {
      setOutput("");
      setError(
        error?.message || "Invalid XML structure."
      );
      setStatus("Invalid XML");
    }
  };

  /* ========================================= */
  /* MINIFY XML */
/* ========================================= */

  const minifyXML = () => {
    if (!xml.trim()) {
      setError("Please enter XML first.");
      setStatus("Error");
      return;
    }

    try {
      const document = parseXML(xml);

      const serializer = new XMLSerializer();

      let result = serializer
        .serializeToString(document)
        .replace(/>\s+</g, "><")
        .trim();

      setOutput(result);
      setError("");
      setStatus("Minified");

      setHistory((prev) => {
        const updated = [result, ...prev];

        return updated.slice(0, 8);
      });

      setCopied(false);
    } catch (error) {
      setOutput("");
      setError(
        error?.message || "Invalid XML structure."
      );
      setStatus("Invalid XML");
    }
  };

  /* ========================================= */
  /* VALIDATE XML */
/* ========================================= */

  const validateXML = () => {
    if (!xml.trim()) {
      setError("Please enter XML first.");
      setStatus("Error");
      return;
    }

    try {
      parseXML(xml);

      setError("");
      setStatus("Valid XML");
    } catch (error) {
      setError(
        error?.message || "Invalid XML structure."
      );
      setStatus("Invalid XML");
    }
  };

  /* ========================================= */
  /* COPY OUTPUT */
/* ========================================= */

  const copyOutput = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      console.error("Failed to copy XML.");
    }
  };

  /* ========================================= */
  /* DOWNLOAD XML */
/* ========================================= */

  const downloadXML = () => {
    if (!output) return;

    const blob = new Blob([output], {
      type: "application/xml",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "formatted.xml";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* ========================================= */
  /* LOAD SAMPLE */
/* ========================================= */

  const loadSample = () => {
    setXml(sampleXML);
    setOutput("");
    setError("");
    setStatus("Ready");
    setCopied(false);
  };

  /* ========================================= */
  /* CLEAR */
/* ========================================= */

  const handleClear = () => {
    setXml("");
    setOutput("");
    setError("");
    setStatus("Ready");
    setCopied(false);
  };

  /* ========================================= */
  /* LOAD HISTORY */
/* ========================================= */

  const loadHistory = (item) => {
    setXml(item);
    setOutput(item);
    setError("");
    setStatus("Loaded");
    setCopied(false);
  };

  /* ========================================= */
  /* CLEAR HISTORY */
/* ========================================= */

  const clearHistory = () => {
    setHistory([]);
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
              href="/tools/xml-formatter"
              className="text-violet-400"
            >
              XML Formatter
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
                XML Formatter
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
                Format, validate and minify XML instantly.
                Beautify your XML with proper indentation
                directly in your browser without sending data
                to a server.
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

              {/* FORMAT */}

              <button
                onClick={formatXML}
                className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 active:scale-[0.98]"
              >
                <Sparkles size={17} />
                Format XML
              </button>

              {/* MINIFY */}

              <button
                onClick={minifyXML}
                disabled={!xml.trim()}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Minimize2 size={17} />
                Minify
              </button>

              {/* VALIDATE */}

              <button
                onClick={validateXML}
                disabled={!xml.trim()}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ShieldCheck size={17} />
                Validate
              </button>

              {/* COPY */}

              <button
                onClick={copyOutput}
                disabled={!output}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                {copied ? (
                  <Check size={17} />
                ) : (
                  <Copy size={17} />
                )}

                {copied ? "Copied" : "Copy"}
              </button>

              {/* DOWNLOAD */}

              <button
                onClick={downloadXML}
                disabled={!output}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Download size={17} />
                Download
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
          {/* EDITOR */}
          {/* ========================================= */}

          <div className="grid border-b border-slate-800 lg:grid-cols-2">

            {/* INPUT */}

            <div className="border-b border-slate-800 lg:border-b-0 lg:border-r">

              {/* Header */}

              <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">

                <div className="flex items-center gap-2">

                  <div className="h-2 w-2 rounded-full bg-violet-500" />

                  <span className="text-sm font-medium text-slate-200">
                    XML Input
                  </span>

                </div>

                <button
                  onClick={loadSample}
                  className="flex items-center gap-1.5 text-xs text-slate-500 transition hover:text-violet-400"
                >
                  <RotateCcw size={14} />
                  Load Sample
                </button>

              </div>

              {/* Textarea */}

              <div className="bg-[#070C16] p-4">

                <textarea
                  value={xml}
                  onChange={(e) => {
                    setXml(e.target.value);
                    setError("");
                    setStatus("Ready");
                  }}
                  placeholder={`<?xml version="1.0" encoding="UTF-8"?>
<users>
  <user>
    <name>Raunak</name>
  </user>
</users>`}
                  spellCheck={false}
                  className="min-h-[430px] w-full resize-none rounded-xl border border-slate-800 bg-[#0A101C] p-5 font-mono text-sm leading-7 text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-violet-500/40"
                />

              </div>

            </div>

            {/* OUTPUT */}

            <div>

              {/* Header */}

              <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">

                <div className="flex items-center gap-2">

                  <div
                    className={`h-2 w-2 rounded-full ${
                      status === "Invalid XML"
                        ? "bg-red-500"
                        : status === "Valid XML"
                        ? "bg-emerald-500"
                        : "bg-violet-500"
                    }`}
                  />

                  <span className="text-sm font-medium text-slate-200">
                    Formatted XML
                  </span>

                </div>

                <span
                  className={`text-xs ${
                    status === "Invalid XML"
                      ? "text-red-400"
                      : status === "Valid XML"
                      ? "text-emerald-400"
                      : "text-slate-500"
                  }`}
                >
                  {status}
                </span>

              </div>

              {/* Output */}

              <div className="bg-[#070C16] p-4">

                <div className="relative min-h-[430px] rounded-xl border border-slate-800 bg-[#0A101C] p-5">

                  {output ? (

                    <>

                      <pre className="max-h-[390px] overflow-auto whitespace-pre-wrap break-words font-mono text-sm leading-7 text-violet-300">
                        {output}
                      </pre>

                      <button
                        onClick={copyOutput}
                        className="absolute right-4 top-4 rounded-lg border border-slate-700 bg-[#0E1625] p-2 text-slate-400 transition hover:border-violet-500/40 hover:text-violet-400"
                        title="Copy XML"
                      >
                        {copied ? (
                          <Check size={17} />
                        ) : (
                          <Clipboard size={17} />
                        )}
                      </button>

                    </>

                  ) : error ? (

                    <div className="flex min-h-[390px] items-center justify-center">

                      <div className="max-w-md text-center">

                        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                          <X size={22} />
                        </div>

                        <p className="text-sm font-medium text-red-400">
                          Invalid XML
                        </p>

                        <p className="mt-2 text-xs leading-5 text-slate-600">
                          {error}
                        </p>

                      </div>

                    </div>

                  ) : (

                    <div className="flex min-h-[390px] items-center justify-center">

                      <div className="text-center">

                        <FileCode2
                          size={32}
                          className="mx-auto mb-4 text-slate-700"
                        />

                        <p className="font-mono text-sm text-slate-600">
                          &lt;your-xml&gt;...&lt;/your-xml&gt;
                        </p>

                        <p className="mt-3 text-xs text-slate-600">
                          Enter XML and click &quot;Format XML&quot;
                          to beautify it.
                        </p>

                      </div>

                    </div>

                  )}

                </div>

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

              <div className="flex flex-wrap items-center gap-3">

                <div className="rounded-xl border border-slate-800 bg-[#0A101C] px-4 py-3">

                  <p className="text-xs text-slate-500">
                    Indentation
                  </p>

                  <select
                    value={indentSize}
                    onChange={(e) =>
                      setIndentSize(Number(e.target.value))
                    }
                    className="mt-1 bg-transparent font-mono text-sm text-violet-400 outline-none"
                  >
                    <option
                      value={2}
                      className="bg-[#0A101C]"
                    >
                      2 spaces
                    </option>

                    <option
                      value={4}
                      className="bg-[#0A101C]"
                    >
                      4 spaces
                    </option>

                    <option
                      value={8}
                      className="bg-[#0A101C]"
                    >
                      8 spaces
                    </option>
                  </select>

                </div>

                <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0A101C] px-4 py-3">

                  <ShieldCheck
                    size={17}
                    className="text-emerald-400"
                  />

                  <span className="text-xs text-slate-500">
                    Browser processing
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* STATS */}
          {/* ========================================= */}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 bg-[#0E1625] px-5 py-3 text-xs text-slate-500">

            <span>
              Input:
              {" "}
              <strong className="font-mono text-slate-300">
                {xml.length}
              </strong>
              {" "}
              chars
            </span>

            <span>
              Output:
              {" "}
              <strong className="font-mono text-slate-300">
                {output.length}
              </strong>
              {" "}
              chars
            </span>

            <span>
              Indent:
              {" "}
              <strong className="font-mono text-violet-400">
                {indentSize}
              </strong>
              {" "}
              spaces
            </span>

            <div className="ml-auto">

              {status === "Valid XML" ? (

                <span className="text-emerald-400">
                  XML is valid
                </span>

              ) : status === "Invalid XML" ? (

                <span className="text-red-400">
                  XML has errors
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
      {/* HISTORY + XML INFO */}
      {/* ========================================= */}

      <section className="mx-auto max-w-7xl px-6 pb-6">

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">

          {/* XML INFORMATION */}

          <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">

            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
              <FileCode2 size={20} />
            </div>

            <h2 className="text-lg font-semibold">
              What is XML?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              XML stands for Extensible Markup Language.
              It is a text-based format used to store,
              structure and exchange data between different
              applications and systems.
            </p>

            {/* XML EXAMPLE */}

            <div className="mt-5 rounded-xl border border-slate-800 bg-[#070C16] p-5">

              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                XML Structure
              </p>

              <pre className="overflow-auto font-mono text-sm leading-7 text-violet-400">
{`<user>
  <name>Raunak</name>
  <role>Developer</role>
</user>`}
              </pre>

            </div>

            {/* DETAILS */}

            <div className="mt-5 grid gap-3 sm:grid-cols-3">

              <div className="rounded-xl bg-[#070C16] p-4">

                <p className="text-xs text-slate-500">
                  Format
                </p>

                <p className="mt-1 font-mono text-lg font-semibold text-slate-200">
                  Text
                </p>

              </div>

              <div className="rounded-xl bg-[#070C16] p-4">

                <p className="text-xs text-slate-500">
                  Extension
                </p>

                <p className="mt-1 font-mono text-lg font-semibold text-slate-200">
                  .xml
                </p>

              </div>

              <div className="rounded-xl bg-[#070C16] p-4">

                <p className="text-xs text-slate-500">
                  Type
                </p>

                <p className="mt-1 font-mono text-lg font-semibold text-violet-400">
                  Markup
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
                  Recent XML
                </h2>

              </div>

              {history.length > 0 && (

                <button
                  onClick={clearHistory}
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
                  No XML formatted yet.
                </p>

                <p className="mt-1 text-xs text-slate-700">
                  Your recent XML will appear here.
                </p>

              </div>

            ) : (

              <div className="space-y-2">

                {history.map((item, index) => (

                  <div
                    key={`${index}-${item.length}`}
                    className="group flex items-center gap-2 rounded-xl border border-slate-800 bg-[#070C16] p-3 transition hover:border-violet-500/20"
                  >

                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-500/10 font-mono text-[10px] text-violet-400">
                      {index + 1}
                    </span>

                    <p className="min-w-0 flex-1 truncate font-mono text-xs text-slate-500 group-hover:text-slate-300">
                      {item.slice(0, 60)}
                    </p>

                    <button
                      onClick={() => loadHistory(item)}
                      className="shrink-0 rounded-lg p-1.5 text-slate-600 transition hover:bg-violet-500/10 hover:text-violet-400"
                      title="Load XML"
                    >
                      <RotateCcw size={15} />
                    </button>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </section>

      {/* ========================================= */}
      {/* COMMON USES */}
      {/* ========================================= */}

      <section className="mx-auto max-w-7xl px-6 pb-6">

        <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">

          <div className="mb-6">

            <p className="text-xs font-medium uppercase tracking-widest text-violet-400">
              Common Uses
            </p>

            <h2 className="mt-2 text-xl font-bold">
              Where is XML used?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              XML is widely used for structured data,
              configuration and data exchange.
            </p>

          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {/* API */}

            <div className="rounded-xl border border-slate-800 bg-[#070C16] p-4">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                <Zap size={17} />
              </div>

              <h3 className="text-sm font-medium text-slate-200">
                APIs
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Exchange structured data between applications
                and services.
              </p>

            </div>

            {/* CONFIG */}

            <div className="rounded-xl border border-slate-800 bg-[#070C16] p-4">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                <Code2 size={17} />
              </div>

              <h3 className="text-sm font-medium text-slate-200">
                Configuration
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Store application and system configuration
                settings.
              </p>

            </div>

            {/* DATA */}

            <div className="rounded-xl border border-slate-800 bg-[#070C16] p-4">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                <FileCode2 size={17} />
              </div>

              <h3 className="text-sm font-medium text-slate-200">
                Data Exchange
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Transfer structured information between
                different systems.
              </p>

            </div>

            {/* RSS */}

            <div className="rounded-xl border border-slate-800 bg-[#070C16] p-4">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                <Sparkles size={17} />
              </div>

              <h3 className="text-sm font-medium text-slate-200">
                RSS & Feeds
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Publish structured content through XML-based
                feeds.
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
              How to format XML?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Clean and validate XML in just a few simple
              steps.
            </p>

          </div>

          <div className="grid gap-6 sm:grid-cols-3">

            {/* STEP 1 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                1
              </div>

              <h3 className="font-semibold">
                Paste XML
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Paste your XML document into the input editor
                or load the sample XML.
              </p>

            </div>

            {/* STEP 2 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                2
              </div>

              <h3 className="font-semibold">
                Format or Validate
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Format your XML for readability or validate
                it to detect structural errors.
              </p>

            </div>

            {/* STEP 3 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                3
              </div>

              <h3 className="font-semibold">
                Copy or Download
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Copy the formatted XML or download it as an
                XML file.
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
            XML Formatter Features
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-400 sm:grid-cols-4">

            {[
              "XML Formatting",
              "XML Validation",
              "XML Minification",
              "Custom Indentation",
              "Copy to Clipboard",
              "Download XML",
              "Formatting History",
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
                Processed Locally
              </p>

              <p className="mt-1 text-xs leading-5 text-emerald-400/60">
                XML formatting and validation happen directly
                in your browser using the built-in DOMParser
                and XMLSerializer APIs. Your XML data is not
                sent to a server.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

