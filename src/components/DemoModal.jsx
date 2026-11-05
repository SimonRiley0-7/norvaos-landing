import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Sparkles, CheckCircle2, Apple } from 'lucide-react'
import { AppleIcon } from './Navbar'

export function DemoModal({ isOpen, onClose, onDownloadClick }) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#17171C]/60 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[800px] rounded-[28px] bg-white border border-[#E8E6E1] shadow-2xl overflow-hidden z-10 text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#F0EEEB]">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="ml-3 font-semibold text-[15px] text-[#17171C]">
                NORVA Product Walkthrough · macOS Native
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#FAF9F7] hover:bg-[#F2EFE9] flex items-center justify-center text-[#5A5A66] hover:text-[#17171C] transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Interactive Simulated Video Screen */}
          <div className="p-6 sm:p-8 bg-[#FAF9F7]">
            <div className="aspect-[16/9] rounded-2xl bg-[#17171C] text-white p-6 sm:p-8 flex flex-col justify-between shadow-inner relative overflow-hidden border border-black/10">
              {/* Top ambient badges */}
              <div className="flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full bg-white/10 text-[#C4B0FA] font-mono text-xs">
                  4K 60fps · Real-time Inference
                </span>
                <span className="text-xs text-white/50 font-mono">
                  Apple Silicon M3 Max (38ms latency)
                </span>
              </div>

              {/* Center interactive playback simulation */}
              <div className="space-y-4 my-auto z-10 text-center max-w-[500px] mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7B5CF0]/20 text-[#C4B0FA] text-xs font-mono">
                  <Sparkles size={13} />
                  <span>One Prompt · Multi-App Desktop Action</span>
                </div>
                <h3
                  className="text-[22px] sm:text-[26px] font-medium text-white tracking-tight leading-snug"
                  style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                >
                  "Plan my day, organize my project folders, and draft a response to Shivam."
                </h3>
                <div className="flex items-center justify-center gap-4 text-xs text-white/70">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-[#10B981]" /> Calendar Synced
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-[#10B981]" /> 14 PDFs Categorized
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-[#10B981]" /> Native Mail Ready
                  </span>
                </div>
              </div>

              {/* Bottom footer controls */}
              <div className="flex items-center justify-between z-10 pt-4 border-t border-white/10">
                <span className="text-xs text-white/60">
                  Runs 100% locally on your computer with zero cloud telemetry.
                </span>
                <button
                  onClick={() => {
                    onClose()
                    onDownloadClick()
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#17171C] text-xs font-semibold hover:bg-stone-200 transition-colors"
                >
                  <AppleIcon size={13} />
                  <span>Download App</span>
                </button>
              </div>

              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#7B5CF0]/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
