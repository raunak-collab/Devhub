"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Copy,
  Download,
  Eraser,
  FileKey2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const CHARACTERS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generateSecurePassword(length, options) {
  const pools = [];

  if (options.uppercase) pools.push(CHARACTERS.uppercase);
  if (options.lowercase) pools.push(CHARACTERS.lowercase);
  if (options.numbers) pools.push(CHARACTERS.numbers);
  if (options.symbols) pools.push(CHARACTERS.symbols);

  if (pools.length === 0) return "";

  const allCharacters = pools.join("");

  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  let password = "";

  // Make sure every selected character type is representedlength
  for (const pool of pools) {
    const random = new Uint32Array(1);
    crypto.getRandomValues(random);

    password += pool[random[0] % pool.length];
  }

  // Fill remaining characters
  for (let i = password.length; i < length; i++) {
    password +=
      allCharacters[randomValues[i] % allCharacters.length];
  }

  // Securely shuffle the password
  const shuffled = password.split("");

  const shuffleValues = new Uint32Array(shuffled.length);
  crypto.getRandomValues(shuffleValues);

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = shuffleValues[i] % (i + 1);

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.join("");
}

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);

  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const [password, setPassword] = useState(() =>
    generateSecurePassword(16, {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    })
  );

  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const newPassword = generateSecurePassword(
      length,
      options
    );

    setPassword(newPassword);
    setCopied(false);
  };

  const toggleOption = (key) => {
    setOptions((prev) => {
      const updated = {
        ...prev,
        [key]: !prev[key],
      };

      const hasOption = Object.values(updated).some(Boolean);

      if (hasOption) {
        setPassword(
          generateSecurePassword(length, updated)
        );
      }

      return hasOption ? updated : prev;
    });

    setCopied(false);
  };

  const handleLengthChange = (e) => {
    const newLength = Number(e.target.value);

    setLength(newLength);

    setPassword(
      generateSecurePassword(newLength, options)
    );

    setCopied(false);
  };

  const copyPassword = async () => {
    if (!password) return;

    await navigator.clipboard.writeText(password);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const downloadPassword = () => {
    if (!password) return;

    const blob = new Blob([password], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "generated-password.txt";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const clearPassword = () => {
    setPassword("");
    setCopied(false);
  };

  const strength = useMemo(() => {
    let score = 0;

    if (length >= 12) score++;
    if (length >= 20) score++;

    if (options.uppercase) score++;
    if (options.lowercase) score++;
    if (options.numbers) score++;
    if (options.symbols) score++;

    if (score <= 2) {
      return {
        label: "Weak",
        width: "25%",
        color: "bg-red-500",
        text: "text-red-400",
      };
    }

    if (score <= 4) {
      return {
        label: "Medium",
        width: "50%",
        color: "bg-yellow-500",
        text: "text-yellow-400",
      };
    }

    if (score === 5) {
      return {
        label: "Strong",
        width: "75%",
        color: "bg-emerald-500",
        text: "text-emerald-400",
      };
    }

    return {
      label: "Very Strong",
      width: "100%",
      color: "bg-violet-500",
      text: "text-violet-400",
    };
  }, [length, options]);

  return (
    <main className="min-h-screen bg-[#01040D] text-white">
      {/* ========================================= */}
      {/* HERO / HEADER */}
      {/* ========================================= */}

      <section className="relative overflow-hidden border-b border-slate-800/70">
        {/* Glow */}

        <div className="absolute left-1/2 top-0 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-12">
          {/* Breadcrumb */}

          <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="transition hover:text-slate-300">
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
              href="/tools/password-generator"
              className="text-violet-400"
            >
              Password Generator
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
                Password Generator
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
                Generate strong and secure passwords instantly
                with customizable length and character options.
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
              {/* Generate */}

              <button
                onClick={generatePassword}
                className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
              >
                <Sparkles size={17} />

                Generate
              </button>

              {/* Regenerate */}

              <button
                onClick={generatePassword}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white"
              >
                <RefreshCw size={17} />

                Regenerate
              </button>

              <div className="mx-1 hidden h-7 w-px bg-slate-800 sm:block" />

              {/* Copy */}

              <button
                onClick={copyPassword}
                disabled={!password}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                {copied ? (
                  <Check size={17} />
                ) : (
                  <Copy size={17} />
                )}

                {copied ? "Copied" : "Copy"}
              </button>

              {/* Download */}

              <button
                onClick={downloadPassword}
                disabled={!password}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0E1625] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-[#111b2c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Download size={17} />

                Download
              </button>

              {/* Clear */}

              <button
                onClick={clearPassword}
                className="ml-auto flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
              >
                <Eraser size={17} />

                Clear
              </button>
            </div>
          </div>

          {/* ========================================= */}
          {/* PASSWORD DISPLAY */}
          {/* ========================================= */}

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Password */}

            <div className="border-b border-slate-800 lg:border-b-0 lg:border-r">
              {/* Header */}

              <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-violet-500" />

                  <span className="text-sm font-medium text-slate-200">
                    Generated Password
                  </span>
                </div>

                <span className="text-xs text-slate-500">
                  {password.length} characters
                </span>
              </div>

              {/* Password Area */}

              <div className="flex h-100 items-center justify-center bg-[#070C16] p-6">
                {password ? (
                  <div className="w-full">
                    <div className="rounded-xl border border-slate-800 bg-[#0A101C] p-6">
                      <p className="break-all text-center font-mono text-lg leading-8 text-slate-200 sm:text-xl">
                        {password}
                      </p>
                    </div>

                    {/* Strength */}

                    <div className="mt-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-500">
                          Password Strength
                        </span>

                        <span
                          className={`text-xs font-semibold ${strength.text}`}
                        >
                          {strength.label}
                        </span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                          style={{
                            width: strength.width,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400">
                      <FileKey2 size={22} />
                    </div>

                    <p className="text-sm font-medium text-slate-300">
                      Generate a password
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Click Generate to create a secure password
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Settings */}

            <div>
              {/* Header */}

              <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1625] px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-violet-500" />

                  <span className="text-sm font-medium text-slate-200">
                    Password Settings
                  </span>
                </div>

                <ShieldCheck
                  size={16}
                  className="text-emerald-400"
                />
              </div>

              {/* Settings */}

              <div className="h-100 overflow-auto bg-[#070C16] p-5">
                {/* Length */}

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        Password Length
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Choose between 8 and 64 characters
                      </p>
                    </div>

                    <span className="rounded-md border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 font-mono text-sm font-medium text-violet-400">
                      {length}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="8"
                    max="64"
                    value={length}
                    onChange={handleLengthChange}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-violet-600"
                  />

                  <div className="mt-2 flex justify-between text-xs text-slate-600">
                    <span>8</span>
                    <span>64</span>
                  </div>
                </div>

                {/* Divider */}

                <div className="my-7 h-px bg-slate-800" />

                {/* Character Options */}

                <div>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-slate-200">
                      Character Options
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Choose which characters to include
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <CharacterOption
                      label="Uppercase"
                      description="A-Z"
                      checked={options.uppercase}
                      onChange={() =>
                        toggleOption("uppercase")
                      }
                    />

                    <CharacterOption
                      label="Lowercase"
                      description="a-z"
                      checked={options.lowercase}
                      onChange={() =>
                        toggleOption("lowercase")
                      }
                    />

                    <CharacterOption
                      label="Numbers"
                      description="0-9"
                      checked={options.numbers}
                      onChange={() =>
                        toggleOption("numbers")
                      }
                    />

                    <CharacterOption
                      label="Symbols"
                      description="!@#$%"
                      checked={options.symbols}
                      onChange={() =>
                        toggleOption("symbols")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================= */}
          {/* SECURITY */}
          {/* ========================================= */}

          <div className="border-t border-emerald-500/20 bg-emerald-500/5 px-5 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
              <ShieldCheck size={17} />

              Password generated locally in your browser
            </div>
          </div>

          {/* ========================================= */}
          {/* STATS */}
          {/* ========================================= */}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-800 bg-[#0E1625] px-5 py-3 text-xs text-slate-500">
            <span>
              Length:{" "}
              <strong className="text-slate-300">
                {length}
              </strong>
            </span>

            <span>
              Uppercase:{" "}
              <strong className="text-slate-300">
                {options.uppercase ? "On" : "Off"}
              </strong>
            </span>

            <span>
              Lowercase:{" "}
              <strong className="text-slate-300">
                {options.lowercase ? "On" : "Off"}
              </strong>
            </span>

            <span>
              Numbers:{" "}
              <strong className="text-slate-300">
                {options.numbers ? "On" : "Off"}
              </strong>
            </span>

            <span>
              Symbols:{" "}
              <strong className="text-slate-300">
                {options.symbols ? "On" : "Off"}
              </strong>
            </span>

            <div className="ml-auto">
              Strength:{" "}
              <strong className={strength.text}>
                {strength.label}
              </strong>
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
              <FileKey2 size={20} />
            </div>

            <h2 className="text-lg font-semibold">
              What is a Password Generator?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              A password generator creates random passwords using
              different combinations of letters, numbers and
              symbols. Strong passwords help protect accounts
              from unauthorized access.
            </p>
          </div>

          {/* Features */}

          <div className="rounded-2xl border border-slate-800 bg-[#0A101C] p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
              <ShieldCheck size={20} />
            </div>

            <h2 className="text-lg font-semibold">
              Password Generator Features
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-400">
              {[
                "Custom Length",
                "Uppercase Letters",
                "Lowercase Letters",
                "Numbers",
                "Special Symbols",
                "Secure Generation",
                "Copy Password",
                "Download Password",
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
              How to use Password Generator?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Create a strong password in just a few steps.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {/* Step 1 */}

            <div>
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                1
              </div>

              <h3 className="font-semibold">
                Choose Length
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Select how long you want your password to be
                using the length slider.
              </p>
            </div>

            {/* Step 2 */}

            <div>
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/10 text-sm font-semibold text-violet-400">
                2
              </div>

              <h3 className="font-semibold">
                Select Characters
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Choose uppercase, lowercase, numbers and symbols
                for your password.
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
                Generate your password and copy or download it
                for later use.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ========================================= */
/* CHARACTER OPTION */
/* ========================================= */

function CharacterOption({
  label,
  description,
  checked,
  onChange,
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex items-center justify-between rounded-lg border p-3 text-left transition ${
        checked
          ? "border-violet-500/30 bg-violet-500/10"
          : "border-slate-800 bg-[#0A101C] hover:border-violet-500/30 hover:bg-[#0E1625]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-5 w-5 items-center justify-center rounded-md border ${
            checked
              ? "border-violet-500 bg-violet-600 text-white"
              : "border-slate-700 bg-[#070C16]"
          }`}
        >
          {checked && (
            <Check
              size={13}
              strokeWidth={3}
            />
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-slate-200">
            {label}
          </p>

          <p className="mt-0.5 font-mono text-xs text-slate-600">
            {description}
          </p>
        </div>
      </div>

      <span
        className={`text-xs ${
          checked
            ? "text-violet-400"
            : "text-slate-600"
        }`}
      >
        {checked ? "On" : "Off"}
      </span>
    </button>
  );
}