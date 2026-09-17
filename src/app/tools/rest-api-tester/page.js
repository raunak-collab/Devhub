"use client";

import { useState } from "react";
import {
  Activity,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  Copy,
  Database,
  Eraser,
  FileJson,
  Globe2,
  Hash,
  History,
  Loader2,
  Plus,
  RotateCcw,
  Send,
  Settings2,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export default function RestApiTesterPage() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");

  const [activeTab, setActiveTab] = useState("Params");

  const [params, setParams] = useState([
    {
      id: 1,
      key: "",
      value: "",
      enabled: true,
    },
  ]);

  const [headers, setHeaders] = useState([
    {
      id: 1,
      key: "",
      value: "",
      enabled: true,
    },
  ]);

  const [body, setBody] = useState(`{
  "name": "John Doe",
  "email": "john@example.com"
}`);

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // =========================================
  // PARAMS
  // =========================================

  const addParam = () => {
    setParams((prev) => [
      ...prev,
      {
        id: Date.now(),
        key: "",
        value: "",
        enabled: true,
      },
    ]);
  };

  const updateParam = (id, field, value) => {
    setParams((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const removeParam = (id) => {
    setParams((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // =========================================
  // HEADERS
  // =========================================

  const addHeader = () => {
    setHeaders((prev) => [
      ...prev,
      {
        id: Date.now(),
        key: "",
        value: "",
        enabled: true,
      },
    ]);
  };

  const updateHeader = (id, field, value) => {
    setHeaders((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const removeHeader = (id) => {
    setHeaders((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // =========================================
  // BUILD URL
  // =========================================

  const buildUrl = () => {
    try {
      const finalUrl = new URL(url);

      params.forEach((param) => {
        if (
          param.enabled &&
          param.key.trim() &&
          param.value.trim()
        ) {
          finalUrl.searchParams.set(
            param.key.trim(),
            param.value.trim()
          );
        }
      });

      return finalUrl.toString();
    } catch {
      return url;
    }
  };

  // =========================================
  // SEND REQUEST
  // =========================================

  const sendRequest = async () => {
    if (!url.trim()) {
      setError("Please enter an API URL.");
      setResponse(null);
      return;
    }

    setLoading(true);
    setError("");
    setResponse(null);

    const startTime = performance.now();

    try {
      const requestHeaders = {};

      headers.forEach((header) => {
        if (
          header.enabled &&
          header.key.trim() &&
          header.value.trim()
        ) {
          requestHeaders[header.key.trim()] =
            header.value.trim();
        }
      });

      if (
        ["POST", "PUT", "PATCH"].includes(method) &&
        body.trim() &&
        !requestHeaders["Content-Type"]
      ) {
        requestHeaders["Content-Type"] =
          "application/json";
      }

      const finalUrl = buildUrl();

      const options = {
        method,
        headers: requestHeaders,
      };

      if (
        ["POST", "PUT", "PATCH"].includes(method) &&
        body.trim()
      ) {
        options.body = body;
      }

      const res = await fetch(finalUrl, options);

      const responseTime = Math.round(
        performance.now() - startTime
      );

      const contentType =
        res.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      const formattedData =
        typeof data === "string"
          ? data
          : JSON.stringify(data, null, 2);

      const responseData = {
        status: res.status,
        statusText: res.statusText,
        time: responseTime,
        data: formattedData,
        size: new Blob([formattedData]).size,
      };

      setResponse(responseData);

      // =====================================
      // SAVE HISTORY
      // =====================================

      const historyItem = {
        id: Date.now(),
        method,
        endpoint: finalUrl,
        status: res.status,
        responseTime: `${responseTime} ms`,
        time: "Just now",
        size: formatBytes(responseData.size),
      };

      saveToHistory(historyItem);
    } catch (err) {
      const responseTime = Math.round(
        performance.now() - startTime
      );

      setError(
        err.message ||
          "Unable to send request. Please check the URL."
      );

      const historyItem = {
        id: Date.now(),
        method,
        endpoint: url,
        status: 0,
        responseTime: `${responseTime} ms`,
        time: "Just now",
        size: "0 B",
      };

      saveToHistory(historyItem);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // SAVE HISTORY
  // =========================================

  const saveToHistory = (historyItem) => {
    try {
      const oldHistory = JSON.parse(
        localStorage.getItem("devhub-api-history") ||
          "[]"
      );

      const newHistory = [
        historyItem,
        ...oldHistory,
      ].slice(0, 50);

      localStorage.setItem(
        "devhub-api-history",
        JSON.stringify(newHistory)
      );
    } catch {
      console.log("Unable to save API history");
    }
  };

  // =========================================
  // COPY RESPONSE
  // =========================================

  const copyResponse = async () => {
    if (!response?.data) return;

    await navigator.clipboard.writeText(response.data);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // =========================================
  // CLEAR
  // =========================================

  const clearAll = () => {
    setMethod("GET");
    setUrl("");

    setParams([
      {
        id: 1,
        key: "",
        value: "",
        enabled: true,
      },
    ]);

    setHeaders([
      {
        id: 1,
        key: "",
        value: "",
        enabled: true,
      },
    ]);

    setBody(`{
  "name": "John Doe",
  "email": "john@example.com"
}`);

    setResponse(null);
    setError("");
    setCopied(false);
  };

  return (
    <main className="min-h-screen mt-5 bg-[#01040D] text-white">

      {/* ========================================= */}
      {/* HERO / HEADER */}
      {/* ========================================= */}

      <section className="relative overflow-hidden border-b border-slate-800/70">

        {/* Glow */}

        <div className="absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />

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

            <span className="text-violet-400">
              REST API Tester
            </span>
          </div>

          {/* Heading */}

          <div className="flex flex-col gap-5">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400">
                <Globe2 size={24} />
              </div>

              <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                Developer Tool
              </span>
            </div>

            <div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                REST API Tester
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
                Send, test and inspect REST API requests
                instantly. Build requests with custom
                parameters, headers and JSON bodies.
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
          {/* REQUEST BAR */}
          {/* ========================================= */}

          <div className="border-b border-slate-800 p-4">

            <div className="flex flex-col gap-2 lg:flex-row">

              {/* Method */}

              <div className="relative shrink-0">

                <select
                  value={method}
                  onChange={(e) =>
                    setMethod(e.target.value)
                  }
                  className="h-11 w-full appearance-none rounded-lg border border-slate-700 bg-[#0E1625] px-4 pr-10 text-sm font-semibold text-violet-400 outline-none transition focus:border-violet-500 lg:w-[120px]"
                >
                  {METHODS.map((item) => (
                    <option
                      key={item}
                      value={item}
                      className="bg-[#0A101C]"
                    >
                      {item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

              </div>

              {/* URL */}

              <div className="relative flex-1">

                <Globe2
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  type="text"
                  value={url}
                  onChange={(e) =>
                    setUrl(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendRequest();
                    }
                  }}
                  placeholder="https://api.example.com/users"
                  className="h-11 w-full rounded-lg border border-slate-700 bg-[#070C16] pl-10 pr-4 font-mono text-sm text-slate-300 outline-none placeholder:text-slate-600 transition focus:border-violet-500"
                />

              </div>

              {/* Send */}

              <button
                onClick={sendRequest}
                disabled={loading}
                className="flex h-11 items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Sending
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    Send Request
                  </>
                )}
              </button>

              {/* Clear */}

              <button
                onClick={clearAll}
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 text-sm font-medium text-slate-400 transition hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400"
              >
                <Eraser size={17} />
                Clear
              </button>

            </div>
          </div>

          {/* ========================================= */}
          {/* REQUEST TABS */}
          {/* ========================================= */}

          <div className="border-b border-slate-800 px-4">

            <div className="flex gap-6 overflow-x-auto">

              {[
                {
                  name: "Params",
                  icon: Hash,
                },
                {
                  name: "Headers",
                  icon: Settings2,
                },
                {
                  name: "Body",
                  icon: FileJson,
                },
              ].map((tab) => {

                const Icon = tab.icon;

                return (
                  <button
                    key={tab.name}
                    onClick={() =>
                      setActiveTab(tab.name)
                    }
                    className={`relative flex items-center gap-2 py-3 text-sm font-medium transition ${
                      activeTab === tab.name
                        ? "text-white"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >

                    <Icon size={16} />

                    {tab.name}

                    {activeTab === tab.name && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-violet-500" />
                    )}

                  </button>
                );
              })}

            </div>
          </div>

          {/* ========================================= */}
          {/* REQUEST CONTENT */}
          {/* ========================================= */}

          <div className="min-h-[260px] p-5">

            {/* PARAMS */}

            {activeTab === "Params" && (
              <div>

                <div className="mb-4 flex items-center justify-between">

                  <div>

                    <h3 className="text-sm font-semibold text-white">
                      Query Parameters
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Parameters will be appended to the
                      request URL.
                    </p>

                  </div>

                  <button
                    onClick={addParam}
                    className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white"
                  >
                    <Plus size={15} />
                    Add Parameter
                  </button>

                </div>

                <div className="space-y-2">

                  {params.map((param) => (
                    <div
                      key={param.id}
                      className="flex gap-2"
                    >

                      <button
                        onClick={() =>
                          updateParam(
                            param.id,
                            "enabled",
                            !param.enabled
                          )
                        }
                        className={`w-12 shrink-0 rounded-lg border text-[10px] font-medium ${
                          param.enabled
                            ? "border-violet-500/20 bg-violet-500/10 text-violet-400"
                            : "border-slate-700 bg-[#070C16] text-slate-600"
                        }`}
                      >
                        {param.enabled ? "ON" : "OFF"}
                      </button>

                      <input
                        value={param.key}
                        onChange={(e) =>
                          updateParam(
                            param.id,
                            "key",
                            e.target.value
                          )
                        }
                        placeholder="Parameter"
                        className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-[#070C16] px-3 py-2.5 font-mono text-xs text-slate-300 outline-none placeholder:text-slate-600 focus:border-violet-500"
                      />

                      <input
                        value={param.value}
                        onChange={(e) =>
                          updateParam(
                            param.id,
                            "value",
                            e.target.value
                          )
                        }
                        placeholder="Value"
                        className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-[#070C16] px-3 py-2.5 font-mono text-xs text-slate-300 outline-none placeholder:text-slate-600 focus:border-violet-500"
                      />

                      <button
                        onClick={() =>
                          removeParam(param.id)
                        }
                        className="rounded-lg border border-slate-700 px-3 text-slate-600 transition hover:border-red-500/30 hover:text-red-400"
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>
                  ))}

                </div>
              </div>
            )}

            {/* HEADERS */}

            {activeTab === "Headers" && (
              <div>

                <div className="mb-4 flex items-center justify-between">

                  <div>

                    <h3 className="text-sm font-semibold text-white">
                      Request Headers
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Configure custom headers for your
                      API request.
                    </p>

                  </div>

                  <button
                    onClick={addHeader}
                    className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white"
                  >
                    <Plus size={15} />
                    Add Header
                  </button>

                </div>

                <div className="space-y-2">

                  {headers.map((header) => (
                    <div
                      key={header.id}
                      className="flex gap-2"
                    >

                      <button
                        onClick={() =>
                          updateHeader(
                            header.id,
                            "enabled",
                            !header.enabled
                          )
                        }
                        className={`w-12 shrink-0 rounded-lg border text-[10px] font-medium ${
                          header.enabled
                            ? "border-violet-500/20 bg-violet-500/10 text-violet-400"
                            : "border-slate-700 bg-[#070C16] text-slate-600"
                        }`}
                      >
                        {header.enabled ? "ON" : "OFF"}
                      </button>

                      <input
                        value={header.key}
                        onChange={(e) =>
                          updateHeader(
                            header.id,
                            "key",
                            e.target.value
                          )
                        }
                        placeholder="Header"
                        className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-[#070C16] px-3 py-2.5 font-mono text-xs text-slate-300 outline-none placeholder:text-slate-600 focus:border-violet-500"
                      />

                      <input
                        value={header.value}
                        onChange={(e) =>
                          updateHeader(
                            header.id,
                            "value",
                            e.target.value
                          )
                        }
                        placeholder="Value"
                        className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-[#070C16] px-3 py-2.5 font-mono text-xs text-slate-300 outline-none placeholder:text-slate-600 focus:border-violet-500"
                      />

                      <button
                        onClick={() =>
                          removeHeader(header.id)
                        }
                        className="rounded-lg border border-slate-700 px-3 text-slate-600 transition hover:border-red-500/30 hover:text-red-400"
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>
                  ))}

                </div>
              </div>
            )}

            {/* BODY */}

            {activeTab === "Body" && (
              <div>

                <div className="mb-4 flex items-center justify-between">

                  <div>

                    <h3 className="text-sm font-semibold text-white">
                      Request Body
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Add JSON data for POST, PUT or PATCH
                      requests.
                    </p>

                  </div>

                  <span className="rounded-md border border-slate-700 bg-[#070C16] px-2.5 py-1 text-[10px] font-medium text-slate-500">
                    JSON
                  </span>

                </div>

                <textarea
                  value={body}
                  onChange={(e) =>
                    setBody(e.target.value)
                  }
                  spellCheck={false}
                  className="min-h-[210px] w-full resize-y rounded-lg border border-slate-700 bg-[#070C16] p-5 font-mono text-sm leading-6 text-slate-300 outline-none placeholder:text-slate-600 focus:border-violet-500"
                  placeholder={`{
  "key": "value"
}`}
                />

              </div>
            )}

          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* ERROR */}
      {/* ========================================= */}

      {error && (
        <section className="mx-auto max-w-7xl px-6">

          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4">

            <div className="flex gap-3">

              <X
                size={18}
                className="mt-0.5 text-red-400"
              />

              <div>

                <p className="text-sm font-medium text-red-400">
                  Request Failed
                </p>

                <p className="mt-1 break-all font-mono text-xs text-red-400/70">
                  {error}
                </p>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================= */}
      {/* RESPONSE */}
      {/* ========================================= */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0A101C] shadow-2xl shadow-black/20">

          {/* Response Header */}

          <div className="flex flex-col gap-4 border-b border-slate-800 bg-[#0E1625] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                <Code2 size={20} />
              </div>

              <div>

                <h2 className="text-sm font-semibold">
                  Response
                </h2>

                <p className="text-xs text-slate-500">
                  API server response
                </p>

              </div>
            </div>

            {response && (
              <div className="flex flex-wrap items-center gap-2">

                <span
                  className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${
                    response.status >= 200 &&
                    response.status < 300
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                      : "border-red-500/20 bg-red-500/10 text-red-400"
                  }`}
                >
                  {response.status}{" "}
                  {response.statusText}
                </span>

                <span className="flex items-center gap-1.5 rounded-md border border-slate-700 bg-[#070C16] px-2.5 py-1 text-xs text-slate-400">
                  <Clock3 size={13} />
                  {response.time} ms
                </span>

                <span className="flex items-center gap-1.5 rounded-md border border-slate-700 bg-[#070C16] px-2.5 py-1 text-xs text-slate-400">
                  <Database size={13} />
                  {formatBytes(response.size)}
                </span>

                <button
                  onClick={copyResponse}
                  className="flex items-center gap-1.5 rounded-md border border-slate-700 bg-[#070C16] px-2.5 py-1 text-xs text-slate-400 transition hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check size={13} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      Copy
                    </>
                  )}
                </button>

              </div>
            )}
          </div>

          {/* Response Content */}

          <div className="min-h-[360px] bg-[#070C16]">

            {loading ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center">

                <Loader2
                  size={28}
                  className="animate-spin text-violet-500"
                />

                <p className="mt-4 text-sm text-slate-400">
                  Sending request...
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Waiting for API response
                </p>

              </div>
            ) : response ? (
              <div className="relative">

                <div className="absolute left-0 top-0 w-12 border-r border-slate-800 py-5 text-center font-mono text-xs leading-6 text-slate-700">

                  {response.data
                    .split("\n")
                    .map((_, index) => (
                      <div key={index}>
                        {index + 1}
                      </div>
                    ))}

                </div>

                <pre className="max-h-[600px] overflow-auto whitespace-pre-wrap break-words p-5 pl-16 font-mono text-sm leading-6 text-slate-300">
                  {response.data}
                </pre>

              </div>
            ) : (
              <div className="flex min-h-[360px] items-center justify-center">

                <div className="text-center">

                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400">
                    <Activity size={24} />
                  </div>

                  <p className="text-sm font-medium text-slate-300">
                    No response yet
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Enter an API endpoint and send a
                    request to inspect the response.
                  </p>

                </div>
              </div>
            )}

          </div>

          {/* Response Footer */}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-800 bg-[#0E1625] px-5 py-3 text-xs text-slate-500">

            <span className="flex items-center gap-1.5">
              <Zap
                size={13}
                className="text-violet-400"
              />
              Press Enter to send
            </span>

            <span className="flex items-center gap-1.5">
              <History size={13} />
              Requests are saved to history
            </span>

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
              <Globe2 size={20} />
            </div>

            <h2 className="text-lg font-semibold">
              What is a REST API Tester?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              A REST API Tester lets developers send HTTP
              requests to an API and inspect the server
              response. It is useful for debugging,
              development and testing API endpoints.
            </p>

          </div>

          {/* Features */}

          <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">

            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
              <Code2 size={20} />
            </div>

            <h2 className="text-lg font-semibold">
              REST API Tester Features
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-400">

              {[
                "GET Requests",
                "POST Requests",
                "Custom Headers",
                "Query Parameters",
                "JSON Request Body",
                "Response Inspection",
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
              How to use REST API Tester?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Test your API endpoint in just a few steps.
            </p>

          </div>

          <div className="grid gap-6 sm:grid-cols-3">

            {/* Step 1 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                1
              </div>

              <h3 className="font-semibold">
                Enter Endpoint
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Select an HTTP method and enter the API
                endpoint you want to test.
              </p>

            </div>

            {/* Step 2 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                2
              </div>

              <h3 className="font-semibold">
                Configure Request
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Add query parameters, headers or a JSON
                request body when required.
              </p>

            </div>

            {/* Step 3 */}

            <div>

              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                3
              </div>

              <h3 className="font-semibold">
                Send & Inspect
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Send the request and inspect status,
                response time and returned data.
              </p>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

// =========================================
// HELPER
// =========================================

function formatBytes(bytes) {
  if (!bytes) return "0 B";

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  return `${(bytes / 1024).toFixed(1)} KB`;
}