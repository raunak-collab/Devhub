"use client";

import { useState } from "react";
import {
  AlertCircle,
  Check,
  Code2,
  Copy,
  Eraser,
  FileKey2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const sampleJWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzU2MTAwMDAwLCJleHAiOjE3NTYxMDM2MDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

/* ========================================= */
/* JWT DECODER */
/* ========================================= */

function decodeBase64Url(value) {
  try {
    const base64 = value
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const padded =
      base64 +
      "=".repeat((4 - (base64.length % 4)) % 4);

    const binary = atob(padded);

    const bytes = Uint8Array.from(
      binary,
      (char) => char.charCodeAt(0)
    );

    return new TextDecoder().decode(bytes);
  } catch {
    throw new Error("Invalid Base64URL data.");
  }
}

function decodeJWT(token) {
  const parts = token.trim().split(".");

  if (parts.length !== 3) {
    throw new Error(
      "Invalid JWT. A JWT must contain exactly 3 parts."
    );
  }

  if (parts.some((part) => !part)) {
    throw new Error("JWT contains an empty section.");
  }

  let header;
  let payload;

  try {
    header = JSON.parse(
      decodeBase64Url(parts[0])
    );
  } catch {
    throw new Error(
      "Unable to decode the JWT header."
    );
  }

  try {
    payload = JSON.parse(
      decodeBase64Url(parts[1])
    );
  } catch {
    throw new Error(
      "Unable to decode the JWT payload."
    );
  }

  return {
    header,
    payload,
    signature: parts[2],
  };
}

/* ========================================= */
/* TIMESTAMP */
/* ========================================= */

function formatTimestamp(value) {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return null;
  }

  const date = new Date(value * 1000);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleString();
}

function formatPayload(payload) {
  const formatted = { ...payload };

  ["iat", "exp", "nbf"].forEach((key) => {
    if (key in formatted) {
      const date = formatTimestamp(formatted[key]);

      if (date) {
        formatted[key] =
          `${formatted[key]} (${date})`;
      }
    }
  });

  return formatted;
}

/* ========================================= */
/* COPY BUTTON */
/* ========================================= */

function CopyButton({ copied, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white"
    >
      {copied ? (
        <>
          <Check
            size={15}
            className="text-emerald-400"
          />
          Copied
        </>
      ) : (
        <>
          <Copy size={15} />
          Copy
        </>
      )}
    </button>
  );
}

/* ========================================= */
/* RESULT SECTION */
/* ========================================= */

function ResultSection({
  title,
  icon: Icon,
  value,
  copied,
  onCopy,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0A101C]">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
            <Icon size={18} />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-200">
              {title}
            </p>

            <p className="text-xs text-slate-600">
              Decoded JSON data
            </p>
          </div>
        </div>

        <CopyButton
          copied={copied}
          onClick={onCopy}
        />
      </div>

      {/* Content */}

      <pre className="max-h-[400px] overflow-auto bg-[#070C16] p-5 font-mono text-sm leading-7 text-slate-300">
        {value}
      </pre>
    </div>
  );
}

/* ========================================= */
/* MAIN PAGE */
/* ========================================= */

export default function JWTDecoderPage() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  /* ========================================= */
  /* DECODE */
  /* ========================================= */

  const handleDecode = () => {
    if (!token.trim()) {
      setError("Please paste a JWT token first.");
      setDecoded(null);
      return;
    }

    try {
      const result = decodeJWT(token);

      setDecoded(result);
      setError("");
    } catch (err) {
      setDecoded(null);
      setError(err.message);
    }
  };

  /* ========================================= */
  /* CLEAR */
  /* ========================================= */

  const handleClear = () => {
    setToken("");
    setDecoded(null);
    setError("");
    setCopied("");
  };

  /* ========================================= */
  /* SAMPLE */
  /* ========================================= */

  const handleSample = () => {
    setToken(sampleJWT);
    setDecoded(null);
    setError("");
  };

  /* ========================================= */
  /* COPY */
  /* ========================================= */

  const handleCopy = async (text, type) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);

      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch {
      setError("Failed to copy content.");
    }
  };

  /* ========================================= */
  /* DATA */
  /* ========================================= */

  const headerJSON = decoded
    ? JSON.stringify(
        decoded.header,
        null,
        2
      )
    : "";

  const payloadJSON = decoded
    ? JSON.stringify(
        formatPayload(decoded.payload),
        null,
        2
      )
    : "";

  const parts = token.trim().split(".");

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
              href="/tools/jwt-decoder"
              className="text-violet-400"
            >
              JWT Decoder
            </Link>
          </div>

          {/* Heading */}

          <div className="flex flex-col gap-5">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400">
                <FileKey2 size={24} />
              </div>

              <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                Developer Tool
              </span>
            </div>

            <div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                JWT Decoder
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
                Decode and inspect JSON Web Tokens instantly.
                View the header, payload, claims and signature
                directly in your browser.
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

              {/* Decode */}

              <button
                onClick={handleDecode}
                className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
              >
                <Sparkles size={17} />

                Decode
              </button>

              {/* Sample */}

              <button
                onClick={handleSample}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white"
              >
                <RefreshCw size={17} />

                Sample
              </button>

              <div className="mx-1 hidden h-7 w-px bg-slate-800 sm:block" />

              {/* Copy Token */}

              <button
                onClick={() =>
                  handleCopy(token, "token")
                }
                disabled={!token}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                {copied === "token" ? (
                  <Check size={17} />
                ) : (
                  <Copy size={17} />
                )}

                {copied === "token"
                  ? "Copied"
                  : "Copy"}
              </button>

              {/* Clear */}

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
          {/* INPUT */}
          {/* ========================================= */}

          <div className="border-b border-slate-800">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">

              <div className="flex items-center gap-2">

                <div className="h-2 w-2 rounded-full bg-violet-500" />

                <span className="text-sm font-medium text-slate-200">
                  JWT Token
                </span>
              </div>

              <span className="text-xs text-slate-500">
                Header.Payload.Signature
              </span>
            </div>

            {/* Textarea */}

            <div className="bg-[#070C16] p-5">

              <textarea
                value={token}
                onChange={(e) => {
                  setToken(e.target.value);
                  setError("");
                }}
                placeholder="Paste your JWT token here..."
                spellCheck={false}
                className="min-h-[180px] w-full resize-y rounded-xl border border-slate-800 bg-[#0A101C] p-5 font-mono text-sm leading-7 text-slate-300 outline-none transition placeholder:text-slate-600 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
              />

              {/* Error */}

              {error && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">

                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-red-400"
                  />

                  <div>

                    <p className="text-sm font-medium text-red-400">
                      Unable to decode token
                    </p>

                    <p className="mt-1 text-xs text-red-400/70">
                      {error}
                    </p>

                  </div>
                </div>
              )}

              {/* Decode button */}

              <button
                onClick={handleDecode}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-500"
              >
                <ShieldCheck size={17} />

                Decode JWT
              </button>
            </div>
          </div>

          {/* ========================================= */}
          {/* RESULTS */}
          {/* ========================================= */}

          {decoded && (
            <div>

              {/* ========================================= */}
              {/* TOKEN STRUCTURE */}
              {/* ========================================= */}

              <div className="border-b border-slate-800">

                <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">

                  <div className="flex items-center gap-2">

                    <div className="h-2 w-2 rounded-full bg-violet-500" />

                    <span className="text-sm font-medium text-slate-200">
                      Token Structure
                    </span>
                  </div>

                  <Code2
                    size={16}
                    className="text-violet-400"
                  />
                </div>

                <div className="grid grid-cols-1 gap-px bg-slate-800 md:grid-cols-3">

                  {/* Header */}

                  <div className="bg-[#070C16] p-5">

                    <div className="mb-3 flex items-center justify-between">

                      <span className="text-xs font-semibold tracking-wide text-violet-400">
                        HEADER
                      </span>

                      <span className="rounded-md border border-violet-500/20 bg-violet-500/10 px-2 py-1 text-[10px] text-violet-400">
                        01
                      </span>
                    </div>

                    <p className="truncate font-mono text-xs text-slate-500">
                      {parts[0]}
                    </p>
                  </div>

                  {/* Payload */}

                  <div className="bg-[#070C16] p-5">

                    <div className="mb-3 flex items-center justify-between">

                      <span className="text-xs font-semibold tracking-wide text-violet-400">
                        PAYLOAD
                      </span>

                      <span className="rounded-md border border-violet-500/20 bg-violet-500/10 px-2 py-1 text-[10px] text-violet-400">
                        02
                      </span>
                    </div>

                    <p className="truncate font-mono text-xs text-slate-500">
                      {parts[1]}
                    </p>
                  </div>

                  {/* Signature */}

                  <div className="bg-[#070C16] p-5">

                    <div className="mb-3 flex items-center justify-between">

                      <span className="text-xs font-semibold tracking-wide text-violet-400">
                        SIGNATURE
                      </span>

                      <span className="rounded-md border border-violet-500/20 bg-violet-500/10 px-2 py-1 text-[10px] text-violet-400">
                        03
                      </span>
                    </div>

                    <p className="truncate font-mono text-xs text-slate-500">
                      {parts[2]}
                    </p>
                  </div>
                </div>
              </div>

              {/* ========================================= */}
              {/* DECODED DATA */}
              {/* ========================================= */}

              <div className="grid grid-cols-1 gap-px bg-slate-800 lg:grid-cols-2">

                {/* Header */}

                <div className="bg-[#070C16] p-5">

                  <ResultSection
                    title="Header"
                    icon={Code2}
                    value={headerJSON}
                    copied={copied === "header"}
                    onCopy={() =>
                      handleCopy(
                        headerJSON,
                        "header"
                      )
                    }
                  />

                </div>

                {/* Payload */}

                <div className="bg-[#070C16] p-5">

                  <ResultSection
                    title="Payload"
                    icon={FileKey2}
                    value={payloadJSON}
                    copied={copied === "payload"}
                    onCopy={() =>
                      handleCopy(
                        payloadJSON,
                        "payload"
                      )
                    }
                  />

                </div>
              </div>

              {/* ========================================= */}
              {/* CLAIMS */}
              {/* ========================================= */}

              <div className="border-t border-slate-800">

                <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">

                  <div className="flex items-center gap-2">

                    <div className="h-2 w-2 rounded-full bg-violet-500" />

                    <span className="text-sm font-medium text-slate-200">
                      Claims
                    </span>
                  </div>

                  <span className="text-xs text-slate-500">
                    {Object.keys(
                      decoded.payload
                    ).length}{" "}
                    properties
                  </span>
                </div>

                <div className="overflow-x-auto bg-[#070C16]">

                  <table className="w-full min-w-[550px] text-left">

                    <thead className="bg-[#0A101C]">

                      <tr>
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Claim
                        </th>

                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Value
                        </th>
                      </tr>

                    </thead>

                    <tbody>

                      {Object.entries(
                        decoded.payload
                      ).map(([key, value]) => (
                        <tr
                          key={key}
                          className="border-t border-slate-800"
                        >

                          <td className="px-5 py-3.5 font-mono text-xs font-medium text-violet-400">
                            {key}
                          </td>

                          <td className="max-w-xl break-all px-5 py-3.5 font-mono text-xs text-slate-400">
                            {typeof value ===
                            "object"
                              ? JSON.stringify(
                                  value
                                )
                              : String(value)}
                          </td>

                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
              </div>

              {/* ========================================= */}
              {/* SIGNATURE */}
              {/* ========================================= */}

              <div className="border-t border-slate-800">

                <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">

                  <div className="flex items-center gap-2">

                    <div className="h-2 w-2 rounded-full bg-violet-500" />

                    <span className="text-sm font-medium text-slate-200">
                      Signature
                    </span>
                  </div>

                  <CopyButton
                    copied={
                      copied === "signature"
                    }
                    onClick={() =>
                      handleCopy(
                        decoded.signature,
                        "signature"
                      )
                    }
                  />
                </div>

                <div className="break-all bg-[#070C16] p-5 font-mono text-xs leading-6 text-slate-400">
                  {decoded.signature}
                </div>
              </div>

              {/* ========================================= */}
              {/* SECURITY */}
              {/* ========================================= */}

              <div className="border-t border-emerald-500/20 bg-emerald-500/5 px-5 py-3">

                <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">

                  <ShieldCheck size={17} />

                  JWT decoded locally in your browser

                </div>

                <p className="mt-1 pl-6 text-xs text-emerald-400/60">
                  Your token is not sent to any server.
                </p>

              </div>

              {/* ========================================= */}
              {/* STATS */}
              {/* ========================================= */}

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-800 bg-[#0E1625] px-5 py-3 text-xs text-slate-500">

                <span>
                  Parts:{" "}
                  <strong className="text-slate-300">
                    3
                  </strong>
                </span>

                <span>
                  Header:{" "}
                  <strong className="text-slate-300">
                    JSON
                  </strong>
                </span>

                <span>
                  Payload:{" "}
                  <strong className="text-slate-300">
                    JSON
                  </strong>
                </span>

                <span>
                  Algorithm:{" "}
                  <strong className="text-violet-400">
                    {decoded.header.alg ||
                      "Unknown"}
                  </strong>
                </span>

                <div className="ml-auto">

                  <span className="text-amber-400">
                    Decode Only
                  </span>

                </div>
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* EMPTY STATE */}
          {/* ========================================= */}

          {!decoded && !error && (
            <div className="border-t border-slate-800 bg-[#070C16] px-6 py-16 text-center">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400">
                <FileKey2 size={22} />
              </div>

              <p className="text-sm font-medium text-slate-300">
                Ready to decode your JWT
              </p>

              <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-600">
                Paste a JSON Web Token above or use the
                sample token to inspect its header, payload,
                claims and signature.
              </p>

            </div>
          )}
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
              <FileKey2 size={20} />
            </div>

            <h2 className="text-lg font-semibold">
              What is a JWT?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              JSON Web Token (JWT) is a compact token format
              commonly used for securely transmitting information
              between parties. A JWT contains a header, payload
              and signature separated by dots.
            </p>

          </div>

          {/* Features */}

          <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">

            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
              <ShieldCheck size={20} />
            </div>

            <h2 className="text-lg font-semibold">
              JWT Decoder Features
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-400">

              {[
                "Header Decoding",
                "Payload Decoding",
                "JWT Claims",
                "Signature Viewer",
                "Timestamp Formatting",
                "Algorithm Detection",
                "Copy Results",
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
              How to use JWT Decoder?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Inspect your JSON Web Token in just a few steps.
            </p>

          </div>

          <div className="grid gap-6 sm:grid-cols-3">

            {/* Step 1 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                1
              </div>

              <h3 className="font-semibold">
                Paste JWT
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Paste your encoded JSON Web Token into the
                input field.
              </p>

            </div>

            {/* Step 2 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                2
              </div>

              <h3 className="font-semibold">
                Decode Token
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Click Decode JWT to split and decode the token
                into its individual sections.
              </p>

            </div>

            {/* Step 3 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                3
              </div>

              <h3 className="font-semibold">
                Inspect Results
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View the header, payload, claims and signature
                in a readable format.
              </p>

            </div>

          </div>
        </div>

        {/* Security Notice */}

        <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">

          <div className="flex items-start gap-3">

            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-amber-400"
            />

            <div>

              <p className="text-sm font-semibold text-amber-400">
                Important Security Notice
              </p>

              <p className="mt-1 text-xs leading-5 text-amber-400/60">
                This tool only decodes JWT data. Decoding a JWT
                does not verify its signature or prove that the
                token is authentic. Never paste sensitive tokens
                into tools you do not trust.
              </p>

            </div>
          </div>
        </div>

      </section>

    </main>
  );
}