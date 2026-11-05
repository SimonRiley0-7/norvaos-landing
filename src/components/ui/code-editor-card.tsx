"use client"

import * as React from "react"
import { Copy, Check, Sparkles } from "lucide-react"

interface CodeEditorCardProps {
  filename?: string
  language?: string
  className?: string
}

export function CodeEditorCard({
  filename = "greet.ts",
  language = "TYPESCRIPT",
  className = "",
}: CodeEditorCardProps) {
  const [copied, setCopied] = React.useState(false)

  const rawCode = `function greet(name: string) {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
}

greet("world");`

  const handleCopy = () => {
    navigator.clipboard?.writeText(rawCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={`w-full max-w-xl mx-auto rounded-[22px] overflow-hidden text-left relative transition-all duration-300 shadow-2xl ${className}`}
      style={{
        background: "rgba(13, 15, 22, 0.86)",
        backdropFilter: "blur(32px) saturate(210%)",
        WebkitBackdropFilter: "blur(32px) saturate(210%)",
        border: "1.2px solid rgba(255, 255, 255, 0.18)",
        boxShadow:
          "0 25px 60px -15px rgba(0, 0, 0, 0.65), inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Specular Top Rim */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

      {/* Header with File Tab & Copy Button */}
      <div className="flex items-center justify-between pt-3 px-4 sm:px-5 border-b border-white/[0.08] bg-white/[0.02]">
        {/* Active File Tab */}
        <div
          className="px-4 py-2 rounded-t-[12px] flex items-center gap-2 border-t border-x border-white/15 relative"
          style={{
            background: "rgba(22, 25, 38, 0.95)",
            marginBottom: "-1px",
          }}
        >
          <span className="text-[13px] font-mono font-medium text-white/95">
            {filename}
          </span>
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[12px] font-mono text-white/70 hover:text-white transition-colors cursor-pointer select-none pb-2"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} className="text-white/60" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Editor Body with Line Numbers and Syntax Highlighting */}
      <div className="py-4 font-mono text-[13px] sm:text-[14px] leading-[1.8] select-text">
        {/* Line 1 */}
        <div className="flex items-center px-4 sm:px-5">
          <span className="w-7 sm:w-8 text-right pr-4 text-white/30 select-none">
            1
          </span>
          <div className="flex-1 whitespace-pre pl-1">
            <span className="text-[#F43F5E]">function</span>{" "}
            <span className="text-[#818CF8]">greet</span>(
            <span className="text-[#38BDF8]">name</span>:{" "}
            <span className="text-[#E2E8F0]">string</span>) {"{"}
          </div>
        </div>

        {/* Line 2 (Highlighted Active Line matching image) */}
        <div
          className="flex items-center px-4 sm:px-5 border-l-[3px] border-[#3B82F6]"
          style={{ background: "rgba(59, 130, 246, 0.12)" }}
        >
          <span className="w-7 sm:w-8 text-right pr-4 text-[#3B82F6] font-semibold select-none -ml-[3px]">
            2
          </span>
          <div className="flex-1 whitespace-pre pl-1">
            {"  "}
            <span className="text-[#F43F5E]">const</span>{" "}
            <span className="text-[#F8FAFC]">message</span> ={" "}
            <span className="text-[#34D399]">`Hello, ${"{"}name{"}"}!`</span>;
          </div>
        </div>

        {/* Line 3 */}
        <div className="flex items-center px-4 sm:px-5">
          <span className="w-7 sm:w-8 text-right pr-4 text-white/30 select-none">
            3
          </span>
          <div className="flex-1 whitespace-pre pl-1">
            {"  "}
            <span className="text-[#F8FAFC]">console</span>.
            <span className="text-[#818CF8]">log</span>(
            <span className="text-[#F8FAFC]">message</span>);
          </div>
        </div>

        {/* Line 4 */}
        <div className="flex items-center px-4 sm:px-5">
          <span className="w-7 sm:w-8 text-right pr-4 text-white/30 select-none">
            4
          </span>
          <div className="flex-1 whitespace-pre pl-1">
            {"  "}
            <span className="text-[#F43F5E]">return</span>{" "}
            <span className="text-[#F8FAFC]">message</span>;
          </div>
        </div>

        {/* Line 5 */}
        <div className="flex items-center px-4 sm:px-5">
          <span className="w-7 sm:w-8 text-right pr-4 text-white/30 select-none">
            5
          </span>
          <div className="flex-1 whitespace-pre pl-1">{"}"}</div>
        </div>

        {/* Line 6 */}
        <div className="flex items-center px-4 sm:px-5">
          <span className="w-7 sm:w-8 text-right pr-4 text-white/30 select-none">
            6
          </span>
          <div className="flex-1 pl-1">&nbsp;</div>
        </div>

        {/* Line 7 */}
        <div className="flex items-center px-4 sm:px-5">
          <span className="w-7 sm:w-8 text-right pr-4 text-white/30 select-none">
            7
          </span>
          <div className="flex-1 whitespace-pre pl-1">
            <span className="text-[#818CF8]">greet</span>(
            <span className="text-[#34D399]">"world"</span>);
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="px-5 py-2.5 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-white/45 tracking-wider uppercase bg-white/[0.02]">
        <span>
          {language} · 7 lines
        </span>
        <span className="flex items-center gap-1.5 text-sky-300/80 lowercase">
          <Sparkles size={11} className="text-sky-400" />
          <span>norva autocomplete ready</span>
        </span>
      </div>
    </div>
  )
}

export default CodeEditorCard

