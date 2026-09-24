"use client";

import { useState } from "react";
import {
  AlertCircle,
  Check,
  Code2,
  Copy,
  Eraser,
  FileCode2,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

/* ========================================= */
/* SAMPLE DATA */
/* ========================================= */

const sampleRegex =
  "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b";

const sampleText = `Contact us at hello@example.com or support@devhub.com.

You can also reach admin@test.org for technical support.

Invalid email:
hello@invalid`;

/* ========================================= */
/* FLAG OPTIONS */
/* ========================================= */

const flagOptions = [
  {
    key: "g",
    label: "Global",
    description: "Find all matches",
  },
  {
    key: "i",
    label: "Ignore Case",
    description: "Case insensitive",
  },
  {
    key: "m",
    label: "Multiline",
    description: "^ and $ match lines",
  },
  {
    key: "s",
    label: "Dot All",
    description: ". matches new lines",
  },
  {
    key: "u",
    label: "Unicode",
    description: "Unicode mode",
  },
];

/* ========================================= */
/* COMMON REGEX */
/* ========================================= */

const commonPatterns = [
  {
    name: "Email",
    regex:
      "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b",
  },
  {
    name: "URL",
    regex: "https?:\\/\\/(?:www\\.)?[^\\s]+",
  },
  {
    name: "Phone",
    regex:
      "\\+?[0-9]{1,3}[\\s-]?[0-9]{3}[\\s-]?[0-9]{3}[\\s-]?[0-9]{4}",
  },
  {
    name: "Numbers",
    regex: "\\b\\d+\\b",
  },
];

/* ========================================= */
/* MAIN PAGE */
/* ========================================= */

export default function RegexTesterPage() {
  const [regex, setRegex] = useState("");
  const [text, setText] = useState("");

  const [flags, setFlags] = useState({
    g: true,
    i: false,
    m: false,
    s: false,
    u: false,
  });

  /*
   * Results are stored in state.
   *
   * This is important:
   * Results will ONLY change when
   * handleTest() is called.
   */

  const [result, setResult] = useState({
    matches: [],
    error: "",
    tested: false,
  });

  const [copied, setCopied] = useState(false);

  /* ========================================= */
  /* FLAGS STRING */
  /* ========================================= */

  const flagsString = Object.entries(flags)
    .filter(([, enabled]) => enabled)
    .map(([key]) => key)
    .join("");

  /* ========================================= */
  /* TEST REGEX */
  /* ========================================= */

  const handleTest = () => {
    /*
     * Clear previous error
     */
    setResult({
      matches: [],
      error: "",
      tested: false,
    });

    /*
     * Regex required
     */
    if (!regex.trim()) {
      setResult({
        matches: [],
        error:
          "Please enter a regular expression first.",
        tested: true,
      });

      return;
    }

    /*
     * Test text required
     */
    if (!text) {
      setResult({
        matches: [],
        error: "Please enter some test text.",
        tested: true,
      });

      return;
    }

    try {
      /*
       * Create RegExp object
       */
      const pattern = new RegExp(
        regex,
        flagsString
      );

      const matches = [];

      /*
       * Global / Sticky regex
       *
       * Example:
       * /\d+/g
       *
       * Finds every number.
       */
      if (pattern.global || pattern.sticky) {
        let match;

        while (
          (match = pattern.exec(text)) !== null
        ) 
        {
          matches.push({
            index: match.index,
            value: match[0],
            length: match[0].length,
            groups: match.slice(1),
          });

          /*
           * Prevent infinite loop
           * for zero-length matches.
           */
          if (match[0] === "") {
            pattern.lastIndex++;
          }
        }
      } else {
        /*
         * Without "g",
         * only first match is returned.
         */
        const match = pattern.exec(text);

        if (match) {
          matches.push({
            index: match.index,
            value: match[0],
            length: match[0].length,
            groups: match.slice(1),
          });
        }
      }

      /*
       * Save results.
       */
      setResult({
        matches,
        error: "",
        tested: true,
      });
    } catch (err) {
      /*
       * Invalid regex
       */
      setResult({
        matches: [],
        error:
          err.message ||
          "Invalid regular expression.",
        tested: true,
      });
    }
  };

  /* ========================================= */
  /* TOGGLE FLAG */
  /* ========================================= */

  const toggleFlag = (key) => {
    setFlags((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /* ========================================= */
  /* SAMPLE */
  /* ========================================= */

  const handleSample = () => {
    setRegex(sampleRegex);
    setText(sampleText);

    setFlags({
      g: true,
      i: false,
      m: false,
      s: false,
      u: false,
    });

    /*
     * Do not automatically test.
     *
     * User must click
     * Test Regex.
     */
    setResult({
      matches: [],
      error: "",
      tested: false,
    });

    setCopied(false);
  };

  /* ========================================= */
  /* CLEAR */
  /* ========================================= */

  const handleClear = () => {
    setRegex("");
    setText("");
    setCopied(false);

    setResult({
      matches: [],
      error: "",
      tested: false,
    });
  };

  /* ========================================= */
  /* COPY REGEX */
  /* ========================================= */

  const handleCopy = async () => {
    if (!regex) return;

    try {
      await navigator.clipboard.writeText(regex);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setResult((prev) => ({
        ...prev,
        error: "Failed to copy regex.",
      }));
    }
  };

  /* ========================================= */
  /* USE COMMON PATTERN */
  /* ========================================= */

  const usePattern = (pattern) => {
    setRegex(pattern);

    /*
     * Pattern changed,
     * so previous result is no longer valid.
     */
    setResult({
      matches: [],
      error: "",
      tested: false,
    });
  };

  /* ========================================= */
  /* HIGHLIGHT MATCHES */
  /* ========================================= */

  const highlightedText = () => {
    if (!text || !result.matches.length) {
      return text;
    }

    const parts = [];
    let lastIndex = 0;

    result.matches.forEach((match, index) => {
      const start = match.index;
      const end = start + match.length;

      /*
       * Text before match
       */
      if (start > lastIndex) {
        parts.push(
          <span key={`text-${index}`}>
            {text.slice(lastIndex, start)}
          </span>
        );
      }

      /*
       * Matched text
       */
      parts.push(
        <mark
          key={`match-${index}`}
          className="rounded bg-violet-500/30 px-0.5 text-violet-200 ring-1 ring-violet-500/30"
        >
          {text.slice(start, end)}
        </mark>
      );

      lastIndex = end;
    });

    /*
     * Remaining text
     */
    if (lastIndex < text.length) {
      parts.push(
        <span key="remaining">
          {text.slice(lastIndex)}
        </span>
      );
    }

    return parts;
  };

  /* ========================================= */
  /* ERROR */
  /* ========================================= */

  const currentError = result.error;

  return (
    <main className="min-h-screen bg-[#01040D] text-white">

      {/* ========================================= */}
      {/* HERO */}
      {/* ========================================= */}

      <section className="relative overflow-hidden border-b border-slate-800/70">

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
              href="/tools/regex-tester"
              className="text-violet-400"
            >
              Regex Tester
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
                Regex Tester
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
                Test and debug regular expressions instantly.
                Find matches, inspect capture groups and
                highlight results directly in your browser.
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

              {/* TEST REGEX */}

              <button
                onClick={handleTest}
                className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 active:scale-[0.98]"
              >
                <Sparkles size={17} />
                Test Regex
              </button>

              {/* SAMPLE */}

              <button
                onClick={handleSample}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white"
              >
                <RefreshCw size={17} />
                Sample
              </button>

              <div className="mx-1 hidden h-7 w-px bg-slate-800 sm:block" />

              {/* COPY */}

              <button
                onClick={handleCopy}
                disabled={!regex}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                {copied ? (
                  <Check size={17} />
                ) : (
                  <Copy size={17} />
                )}

                {copied
                  ? "Copied"
                  : "Copy Regex"}
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
          {/* REGEX INPUT */}
          {/* ========================================= */}

          <div className="border-b border-slate-800">

            <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">

              <div className="flex items-center gap-2">

                <div className="h-2 w-2 rounded-full bg-violet-500" />

                <span className="text-sm font-medium text-slate-200">
                  Regular Expression
                </span>

              </div>

              <span className="font-mono text-xs text-slate-500">
                /pattern/{flagsString}
              </span>

            </div>

            <div className="bg-[#070C16] p-5">

              <div className="flex overflow-hidden rounded-xl border border-slate-800 bg-[#0A101C] focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10">

                <div className="flex items-center px-4 font-mono text-lg text-violet-400">
                  /
                </div>

                <input
                  value={regex}
                  onChange={(e) => {
                    setRegex(e.target.value);

                    /*
                     * Existing result becomes stale
                     * when regex changes.
                     */
                    setResult({
                      matches: [],
                      error: "",
                      tested: false,
                    });
                  }}
                  placeholder="Enter your regex pattern..."
                  spellCheck={false}
                  className="min-w-0 flex-1 bg-transparent py-4 font-mono text-sm text-slate-200 outline-none placeholder:text-slate-600"
                />

                <div className="flex items-center px-4 font-mono text-lg text-violet-400">
                  /{flagsString}
                </div>

              </div>

              {/* FLAGS */}

              <div className="mt-4">

                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Flags
                </p>

                <div className="flex flex-wrap gap-2">

                  {flagOptions.map((flag) => {

                    const active =
                      flags[flag.key];

                    return (
                      <button
                        key={flag.key}
                        onClick={() => {
                          toggleFlag(flag.key);

                          /*
                           * Flag changed,
                           * previous result invalid.
                           */
                          setResult({
                            matches: [],
                            error: "",
                            tested: false,
                          });
                        }}
                        title={flag.description}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                          active
                            ? "border-violet-500/40 bg-violet-500/10 text-violet-300"
                            : "border-slate-800 bg-[#0A101C] text-slate-500 hover:border-slate-700 hover:text-slate-300"
                        }`}
                      >

                        <span className="font-mono font-bold">
                          {flag.key}
                        </span>

                        {flag.label}

                      </button>
                    );
                  })}

                </div>

              </div>

              {/* ERROR */}

              {currentError && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">

                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-red-400"
                  />

                  <div>

                    <p className="text-sm font-medium text-red-400">
                      {result.error.includes(
                        "regular expression"
                      )
                        ? "Invalid regular expression"
                        : "Unable to test regex"}
                    </p>

                    <p className="mt-1 break-all text-xs text-red-400/70">
                      {currentError}
                    </p>

                  </div>

                </div>
              )}

            </div>

          </div>

          {/* ========================================= */}
          {/* TEST TEXT */}
          {/* ========================================= */}

          <div className="border-b border-slate-800">

            <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">

              <div className="flex items-center gap-2">

                <div className="h-2 w-2 rounded-full bg-violet-500" />

                <span className="text-sm font-medium text-slate-200">
                  Test String
                </span>

              </div>

              <span className="text-xs text-slate-500">
                {text.length} characters
              </span>

            </div>

            <div className="bg-[#070C16] p-5">

              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);

                  /*
                   * Text changed,
                   * previous result invalid.
                   */
                  setResult({
                    matches: [],
                    error: "",
                    tested: false,
                  });
                }}
                placeholder="Enter text to test your regex against..."
                spellCheck={false}
                className="min-h-55 w-full resize-y rounded-xl border border-slate-800 bg-[#0A101C] p-5 font-mono text-sm leading-7 text-slate-300 outline-none transition placeholder:text-slate-600 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
              />

            </div>

          </div>

          {/* ========================================= */}
          {/* RESULTS */}
          {/* ========================================= */}

          <div>

            {/* RESULT HEADER */}

            <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">

              <div className="flex items-center gap-2">

                <div className="h-2 w-2 rounded-full bg-violet-500" />

                <span className="text-sm font-medium text-slate-200">
                  Matches
                </span>

              </div>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  result.matches.length > 0
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                    : result.tested &&
                        !currentError
                      ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
                      : "border-slate-700 bg-slate-800/50 text-slate-500"
                }`}
              >
                {result.matches.length}{" "}
                {result.matches.length === 1
                  ? "match"
                  : "matches"}
              </span>

            </div>

            {/* HIGHLIGHT */}

            <div className="border-b border-slate-800 bg-[#070C16] p-5">

              <div className="mb-3 flex items-center gap-2">

                <Search
                  size={16}
                  className="text-violet-400"
                />

                <span className="text-xs font-medium text-slate-500">
                  Highlighted Result
                </span>

              </div>

              <div className="min-h-30 whitespace-pre-wrap wrap-break-word rounded-xl border border-slate-800 bg-[#0A101C] p-5 font-mono text-sm leading-7 text-slate-400">

                {!result.tested ? (
                  <span className="text-slate-600">
                    Enter a regex and test string, then
                    click &quot;Test Regex&quot;.
                  </span>
                ) : currentError ? (
                  <span className="text-red-400/60">
                    Unable to display results.
                  </span>
                ) : result.matches.length > 0 ? (
                  highlightedText()
                ) : (
                  <span className="text-amber-400/70">
                    No matches found.
                  </span>
                )}

              </div>

            </div>

            {/* MATCH LIST */}

            {result.matches.length > 0 && (
              <div className="border-b border-slate-800">

                <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">

                  <div className="flex items-center gap-2">

                    <Zap
                      size={16}
                      className="text-violet-400"
                    />

                    <span className="text-sm font-medium text-slate-200">
                      Match Details
                    </span>

                  </div>

                  <span className="text-xs text-slate-500">
                    {result.matches.length} results
                  </span>

                </div>

                <div className="overflow-x-auto bg-[#070C16]">

                  <table className="w-full min-w-[650px] text-left">

                    <thead className="bg-[#0A101C]">

                      <tr>

                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          #
                        </th>

                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Match
                        </th>

                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Position
                        </th>

                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Length
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {result.matches.map(
                        (match, index) => (
                          <tr
                            key={`${match.index}-${index}`}
                            className="border-t border-slate-800"
                          >

                            <td className="px-5 py-3.5 font-mono text-xs text-slate-500">
                              {index + 1}
                            </td>

                            <td className="max-w-md break-all px-5 py-3.5 font-mono text-xs font-medium text-violet-400">
                              {match.value}
                            </td>

                            <td className="px-5 py-3.5 font-mono text-xs text-slate-400">
                              {match.index}
                            </td>

                            <td className="px-5 py-3.5 font-mono text-xs text-slate-400">
                              {match.length}
                            </td>

                          </tr>
                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </div>
            )}

            {/* CAPTURE GROUPS */}

            {result.matches.some(
              (match) => match.groups.length > 0
            ) && (
              <div className="border-b border-slate-800">

                <div className="flex items-center gap-2 border-b border-slate-800 bg-[#0E1625] px-4 py-3">

                  <Code2
                    size={16}
                    className="text-violet-400"
                  />

                  <span className="text-sm font-medium text-slate-200">
                    Capture Groups
                  </span>

                </div>

                <div className="space-y-3 bg-[#070C16] p-5">

                  {result.matches.map(
                    (match, matchIndex) => {

                      if (!match.groups.length) {
                        return null;
                      }

                      return (
                        <div
                          key={`groups-${matchIndex}`}
                          className="rounded-xl border border-slate-800 bg-[#0A101C] p-4"
                        >

                          <div className="mb-3 text-xs font-medium text-slate-500">
                            Match{" "}
                            {matchIndex + 1}
                          </div>

                          <div className="space-y-2">

                            {match.groups.map(
                              (
                                group,
                                groupIndex
                              ) => (
                                <div
                                  key={
                                    groupIndex
                                  }
                                  className="flex items-start gap-3"
                                >

                                  <span className="min-w-20 rounded-md border border-violet-500/20 bg-violet-500/10 px-2 py-1 text-center font-mono text-[10px] text-violet-400">
                                    Group{" "}
                                    {groupIndex +
                                      1}
                                  </span>

                                  <span className="break-all font-mono text-xs text-slate-400">
                                    {group ??
                                      "undefined"}
                                  </span>

                                </div>
                              )
                            )}

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

              </div>
            )}

            {/* STATS */}

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 bg-[#0E1625] px-5 py-3 text-xs text-slate-500">

              <span>
                Matches:{" "}
                <strong className="text-slate-300">
                  {result.matches.length}
                </strong>
              </span>

              <span>
                Flags:{" "}
                <strong className="font-mono text-violet-400">
                  {flagsString || "none"}
                </strong>
              </span>

              <span>
                Characters:{" "}
                <strong className="text-slate-300">
                  {text.length}
                </strong>
              </span>

              <div className="ml-auto">

                {currentError ? (
                  <span className="text-red-400">
                    Invalid Regex
                  </span>
                ) : !result.tested ? (
                  <span className="text-slate-500">
                    Ready
                  </span>
                ) : result.matches.length > 0 ? (
                  <span className="text-emerald-400">
                    Match Found
                  </span>
                ) : (
                  <span className="text-amber-400">
                    No Match
                  </span>
                )}

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* EMPTY STATE */}
          {/* ========================================= */}

          {!regex && !text && (
            <div className="border-t border-slate-800 bg-[#070C16] px-6 py-16 text-center">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400">
                <Search size={22} />
              </div>

              <p className="text-sm font-medium text-slate-300">
                Ready to test your regex
              </p>

              <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-600">
                Enter a regular expression and some test
                text above, or use the sample pattern to get
                started.
              </p>

            </div>
          )}

        </div>
      </section>

      {/* ========================================= */}
      {/* COMMON PATTERNS */}
      {/* ========================================= */}

      <section className="mx-auto max-w-7xl px-6 pb-6">

        <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">

          <div className="mb-5">

            <p className="text-xs font-medium uppercase tracking-widest text-violet-400">
              Quick Start
            </p>

            <h2 className="mt-2 text-xl font-bold">
              Common Regex Patterns
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Use a common pattern as a starting point.
            </p>

          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {commonPatterns.map((pattern) => (

              <button
                key={pattern.name}
                onClick={() =>
                  usePattern(pattern.regex)
                }
                className="group rounded-xl border border-slate-800 bg-[#070C16] p-4 text-left transition hover:border-violet-500/30 hover:bg-[#0E1625]"
              >

                <div className="mb-3 flex items-center justify-between">

                  <span className="text-sm font-medium text-slate-300 group-hover:text-white">
                    {pattern.name}
                  </span>

                  <Code2
                    size={15}
                    className="text-violet-400"
                  />

                </div>

                <p className="truncate font-mono text-xs text-slate-600 group-hover:text-slate-400">
                  {pattern.regex}
                </p>

              </button>

            ))}

          </div>

        </div>

      </section>

      {/* ========================================= */}
      {/* INFORMATION */}
      {/* ========================================= */}

      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="grid gap-6 md:grid-cols-2">

          {/* ABOUT */}

          <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">

            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
              <FileCode2 size={20} />
            </div>

            <h2 className="text-lg font-semibold">
              What is Regex?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              A regular expression, commonly called Regex,
              is a pattern used to search, match and extract
              specific text from a string. Regex is commonly
              used for validation, searching, parsing and
              text processing.
            </p>

          </div>

          {/* FEATURES */}

          <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">

            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
              <Zap size={20} />
            </div>

            <h2 className="text-lg font-semibold">
              Regex Tester Features
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-400">

              {[
                "Live Matching",
                "Match Highlighting",
                "Capture Groups",
                "Match Positions",
                "Regex Flags",
                "Common Patterns",
                "Copy Regex",
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
              How to use Regex Tester?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Test your regular expression in just a few
              simple steps.
            </p>

          </div>

          <div className="grid gap-6 sm:grid-cols-3">

            {/* STEP 1 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                1
              </div>

              <h3 className="font-semibold">
                Enter Regex
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your regular expression pattern and
                select the flags you need.
              </p>

            </div>

            {/* STEP 2 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                2
              </div>

              <h3 className="font-semibold">
                Add Test Text
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter the text you want to search or validate
                against your regular expression.
              </p>

            </div>

            {/* STEP 3 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                3
              </div>

              <h3 className="font-semibold">
                Click Test Regex
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Run the regular expression and inspect
                highlighted matches, positions and groups.
              </p>

            </div>

          </div>

        </div>

        {/* SECURITY */}

        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

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
                Your regular expressions and test text are
                processed locally in your browser and are not
                sent to a server.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}