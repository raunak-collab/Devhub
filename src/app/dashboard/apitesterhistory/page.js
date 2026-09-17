"use client";

import { useState } from "react";
import {
  Activity,
  CheckCircle2,
  Clock3,
  Code2,
  Copy,
  Eye,
  Filter,
  History,
  MoreHorizontal,
  Play,
  Search,
  Trash2,
  XCircle,
  Zap,
} from "lucide-react";

const historyData = [
  {
    id: 1,
    method: "GET",
    endpoint: "https://api.github.com/users/octocat",
    status: 200,
    responseTime: "342 ms",
    time: "2 minutes ago",
    size: "1.4 KB",
  },
  {
    id: 2,
    method: "POST",
    endpoint: "https://api.example.com/auth/login",
    status: 201,
    responseTime: "528 ms",
    time: "18 minutes ago",
    size: "856 B",
  },
  {
    id: 3,
    method: "GET",
    endpoint: "https://jsonplaceholder.typicode.com/posts",
    status: 200,
    responseTime: "214 ms",
    time: "42 minutes ago",
    size: "4.8 KB",
  },
  {
    id: 4,
    method: "PUT",
    endpoint: "https://api.example.com/users/42",
    status: 200,
    responseTime: "391 ms",
    time: "1 hour ago",
    size: "1.1 KB",
  },
  {
    id: 5,
    method: "DELETE",
    endpoint: "https://api.example.com/posts/18",
    status: 204,
    responseTime: "287 ms",
    time: "2 hours ago",
    size: "0 B",
  },
  {
    id: 6,
    method: "GET",
    endpoint: "https://api.example.com/products",
    status: 404,
    responseTime: "173 ms",
    time: "3 hours ago",
    size: "623 B",
  },
  {
    id: 7,
    method: "PATCH",
    endpoint: "https://api.example.com/profile",
    status: 200,
    responseTime: "448 ms",
    time: "Yesterday",
    size: "972 B",
  },
];

const methodStyles = {
  GET: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  POST: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  PUT: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  PATCH: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  DELETE: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function ApiTesterHistory() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [history, setHistory] = useState(historyData);

  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.endpoint
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "ALL" || item.method === filter;

    return matchesSearch && matchesFilter;
  });

  const deleteItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const copyEndpoint = async (endpoint) => {
    await navigator.clipboard.writeText(endpoint);
  };

  return (
    <div className="min-h-screen bg-[#01040D] text-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#653ADB]/30 bg-[#653ADB]/10">
                <History className="h-5 w-5 text-[#7C5CFF]" />
              </div>

              <span className="text-sm font-medium text-[#7C5CFF]">
                API Tester
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white">
              Request History
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              View and manage your previously tested API requests.
            </p>
          </div>

          <button
            onClick={clearHistory}
            disabled={history.length === 0}
            className="flex items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:border-red-500/40 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 className="h-4 w-4" />
            Clear History
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-xl border border-[#1F2937] bg-[#0B1220] p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Total Requests
              </span>

              <Activity className="h-5 w-5 text-[#7C5CFF]" />
            </div>

            <p className="text-2xl font-semibold text-white">
              {history.length}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Requests in history
            </p>
          </div>

          <div className="rounded-xl border border-[#1F2937] bg-[#0B1220] p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Successful
              </span>

              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>

            <p className="text-2xl font-semibold text-white">
              {history.filter((item) => item.status >= 200 && item.status < 300).length}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              2xx responses
            </p>
          </div>

          <div className="rounded-xl border border-[#1F2937] bg-[#0B1220] p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Failed
              </span>

              <XCircle className="h-5 w-5 text-red-400" />
            </div>

            <p className="text-2xl font-semibold text-white">
              {history.filter((item) => item.status >= 400).length}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              4xx / 5xx responses
            </p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="mb-5 rounded-xl border border-[#1F2937] bg-[#0B1220] p-4">

          <div className="flex flex-col gap-3 md:flex-row">

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search API endpoint..."
                className="w-full rounded-lg border border-[#1F2937] bg-[#080E19] py-2.5 pl-10 pr-4 text-sm text-slate-200 outline-none placeholder:text-slate-600 transition focus:border-[#653ADB]"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="h-4 w-4 shrink-0 text-slate-500" />

              {["ALL", "GET", "POST", "PUT", "PATCH", "DELETE"].map(
                (method) => (
                  <button
                    key={method}
                    onClick={() => setFilter(method)}
                    className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                      filter === method
                        ? "border-[#653ADB]/50 bg-[#653ADB]/15 text-[#9B85FF]"
                        : "border-[#1F2937] bg-[#080E19] text-slate-400 hover:border-[#374151] hover:text-slate-200"
                    }`}
                  >
                    {method}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="overflow-hidden rounded-xl border border-[#1F2937] bg-[#0B1220]">

          {/* Table Header */}
          <div className="hidden grid-cols-[90px_1fr_110px_120px_120px_90px] gap-4 border-b border-[#1F2937] bg-[#0A101C] px-5 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 lg:grid">
            <span>Method</span>
            <span>Endpoint</span>
            <span>Status</span>
            <span>Response</span>
            <span>Time</span>
            <span className="text-right">Action</span>
          </div>

          {filteredHistory.length > 0 ? (
            <div className="divide-y divide-[#1F2937]">

              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="group px-5 py-4 transition hover:bg-[#0E1625]"
                >

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-[90px_1fr_110px_120px_120px_90px] lg:items-center">

                    {/* Method */}
                    <div>
                      <span
                        className={`inline-flex rounded-md border px-2.5 py-1 text-[11px] font-bold ${
                          methodStyles[item.method]
                        }`}
                      >
                        {item.method}
                      </span>
                    </div>

                    {/* Endpoint */}
                    <div className="min-w-0">

                      <div className="flex items-center gap-2">
                        <Code2 className="hidden h-4 w-4 shrink-0 text-slate-600 sm:block" />

                        <p className="truncate font-mono text-sm text-slate-300">
                          {item.endpoint}
                        </p>
                      </div>

                      <div className="mt-1 flex items-center gap-3 text-xs text-slate-600">
                        <span>{item.size}</span>

                        <button
                          onClick={() => copyEndpoint(item.endpoint)}
                          className="flex items-center gap-1 transition hover:text-slate-300"
                        >
                          <Copy className="h-3 w-3" />
                          Copy
                        </button>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">

                      {item.status >= 200 && item.status < 300 ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400" />
                      )}

                      <span
                        className={`text-sm font-medium ${
                          item.status >= 200 && item.status < 300
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    {/* Response Time */}
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Zap className="h-4 w-4 text-amber-400" />
                      {item.responseTime}
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock3 className="h-4 w-4" />
                      {item.time}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-start gap-1 lg:justify-end">

                      <button
                        title="Run request"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-[#653ADB]/10 hover:text-[#9B85FF]"
                      >
                        <Play className="h-4 w-4" />
                      </button>

                      <button
                        title="View request"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-700/30 hover:text-slate-200"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => deleteItem(item.id)}
                        title="Delete"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <button
                        title="More"
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-700/30 hover:text-slate-300"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex min-h-[380px] flex-col items-center justify-center px-6 text-center">

              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#653ADB]/20 bg-[#653ADB]/10">
                <History className="h-7 w-7 text-[#7C5CFF]" />
              </div>

              <h3 className="text-lg font-semibold text-white">
                No API requests found
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {search || filter !== "ALL"
                  ? "Try changing your search or filter."
                  : "Your tested API requests will appear here."}
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setFilter("ALL");
                }}
                className="mt-5 flex items-center gap-2 rounded-lg bg-[#653ADB] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#7C5CFF]"
              >
                <History className="h-4 w-4" />
                View All Requests
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
          <span>
            Showing {filteredHistory.length} of {history.length} requests
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            API Tester History
          </span>
        </div>
      </div>
    </div>
  );
}