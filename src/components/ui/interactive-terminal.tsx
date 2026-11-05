"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface InteractiveTerminalProps {
  className?: string
  appName?: string
  username?: string
}

export function InteractiveTerminal({
  className = "",
  appName = "norva",
  username = "guest",
}: InteractiveTerminalProps) {
  const [isPaused, setIsPaused] = React.useState(false)
  const [soundOn, setSoundOn] = React.useState(false)

  // Animation timeline state
  // 0: typing cmd1
  // 1: show creating
  // 2: show installing
  // 3: show success
  // 4: show prompt with blinking cursor
  const [step, setStep] = React.useState(0)
  const [cmd1Text, setCmd1Text] = React.useState("")

  const cmd1Full = `npx create-${appName}-app@latest my-app`

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const handleReset = () => {
    clearTimer()
    setStep(0)
    setCmd1Text("")
  }

  const togglePause = () => {
    setIsPaused((prev) => !prev)
  }

  // Driving step-based typing animation
  React.useEffect(() => {
    if (isPaused) return

    if (step === 0) {
      // Type cmd1 character by character
      if (cmd1Text.length < cmd1Full.length) {
        timerRef.current = setTimeout(() => {
          setCmd1Text(cmd1Full.slice(0, cmd1Text.length + 1))
        }, 32)
      } else {
        // Finished typing cmd1, move to step 1
        timerRef.current = setTimeout(() => {
          setStep(1)
        }, 350)
      }
    } else if (step === 1) {
      // Show "Creating new app..."
      timerRef.current = setTimeout(() => {
        setStep(2)
      }, 500)
    } else if (step === 2) {
      // Show "Installing dependencies..."
      timerRef.current = setTimeout(() => {
        setStep(3)
      }, 650)
    } else if (step === 3) {
      // Show "Success! Your app is ready."
      timerRef.current = setTimeout(() => {
        setStep(4)
      }, 600)
    } else if (step === 4) {
      // Show prompt with blinking cursor, pause then loop
      timerRef.current = setTimeout(() => {
        handleReset()
      }, 4500)
    }

    return () => clearTimer()
  }, [step, cmd1Text, isPaused, cmd1Full])

  return (
    <div
      className={`w-full max-w-xl mx-auto rounded-[24px] sm:rounded-[26px] overflow-hidden text-left relative transition-all duration-300 shadow-2xl ${className}`}
      style={{
        background: "rgba(14, 16, 24, 0.82)",
        backdropFilter: "blur(32px) saturate(210%)",
        WebkitBackdropFilter: "blur(32px) saturate(210%)",
        border: "1.2px solid rgba(255, 255, 255, 0.18)",
        boxShadow:
          "0 25px 60px -15px rgba(0, 0, 0, 0.65), inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Specular Top Rim */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

      {/* Terminal Window Header (Matching Reference Image) */}
      <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-white/[0.08] bg-white/[0.03]">
        {/* Left: macOS Traffic Light Dots & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-xs cursor-pointer hover:opacity-80 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-xs cursor-pointer hover:opacity-80 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] shadow-xs cursor-pointer hover:opacity-80 transition-opacity" />
          </div>

          <div className="flex flex-col text-left pl-2">
            <span className="text-[13px] font-mono font-medium text-white/90 leading-tight">
              {appName} — bash
            </span>
            <span className="text-[10.5px] font-mono text-white/45 leading-tight">
              {username}@{appName}: ~
            </span>
          </div>
        </div>

        {/* Right: Interactive Action Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={togglePause}
            className="px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.16] text-[11px] sm:text-[11.5px] font-mono text-white/85 hover:text-white transition-all border border-white/10 cursor-pointer select-none active:scale-95"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.16] text-[11px] sm:text-[11.5px] font-mono text-white/85 hover:text-white transition-all border border-white/10 cursor-pointer select-none active:scale-95"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => setSoundOn((s) => !s)}
            className="hidden sm:inline-flex px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.16] text-[11px] sm:text-[11.5px] font-mono text-white/85 hover:text-white transition-all border border-white/10 cursor-pointer select-none active:scale-95"
          >
            {soundOn ? "Sound On" : "Sound Off"}
          </button>
        </div>
      </div>

      {/* Terminal Window Body */}
      <div className="p-5 sm:p-6 font-mono text-[13px] sm:text-[13.5px] leading-relaxed space-y-3.5 select-text">
        {/* Command 1 Prompt & Command */}
        <div className="space-y-2">
          <div className="flex items-start flex-wrap gap-1">
            <span className="text-[#2DD4BF] font-semibold">
              → {username}@{appName} <span className="text-white/60">~</span>
            </span>
            <span className="text-white font-medium">
              {cmd1Text}
              {step === 0 && (
                <span className="inline-block w-2 h-4 bg-white/90 align-middle ml-0.5 animate-pulse" />
              )}
            </span>
          </div>

          {/* Output 1: Creating app */}
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#38BDF8] pl-0"
            >
              Creating a new {appName.charAt(0).toUpperCase() + appName.slice(1)} app in ./my-app
            </motion.div>
          )}

          {/* Output 2: Installing dependencies */}
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/60"
            >
              Installing dependencies...
            </motion.div>
          )}

          {/* Output 3: Success banner */}
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#34D399] font-medium"
            >
              Success! Your app is ready.
            </motion.div>
          )}
        </div>

        {/* Step 4: Clean final waiting prompt with blinking block cursor */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 pt-1.5"
          >
            <span className="text-[#2DD4BF] font-semibold">
              → {username}@{appName} <span className="text-white/60">~</span>
            </span>
            <span className="inline-block w-2.5 h-4.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse rounded-[1px]" />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default InteractiveTerminal

