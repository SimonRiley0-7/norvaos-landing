import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, Shield, Check, Clock } from 'lucide-react'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      q: 'How is NORVA different from ChatGPT or Copilot in the browser?',
      a: 'Web chatbots are isolated in a browser tab. They know nothing about your open windows, git branches, or local files unless you manually copy-paste context. NORVA is an OS-native desktop intelligence layer that runs in background memory, perceiving your actual active screen context, querying local files semantically, and executing multi-step tasks across macOS natively.',
    },
    {
      q: 'Does NORVA send my files, documents, or screen to cloud servers?',
      a: 'No. NORVA is built on a strict local-first architecture. Quantized AI model weights are loaded directly into your Mac\'s Unified Memory. Vector embeddings and search indices are stored in an encrypted SQLite database on your local drive (~/Library). No desktop telemetry or document contents ever leave your device.',
    },
    {
      q: 'Does NORVA work offline in Airplane Mode?',
      a: 'Yes. All core capabilities—natural language file search, document summarization, desktop automation, context perception, and workflow execution—run 100% on-device using your Apple Silicon Neural Engine or CPU. You can disconnect Wi-Fi entirely and NORVA continues to work with zero degradation.',
    },
    {
      q: 'What are the system requirements and supported operating systems?',
      a: 'NORVA is optimized natively for macOS 14 (Sonoma) and macOS 15 (Sequoia). Apple Silicon Macs (M1, M2, M3, M4) with 16GB+ Unified Memory provide the fastest inference (~38 tokens/sec). Intel 64-bit Macs running macOS 14+ are also supported with CPU acceleration.',
    },
    {
      q: 'What capabilities are available today vs planned on the roadmap?',
      a: 'Available today (v1.0.0 Public Beta): Natural-language file discovery, document indexing & semantic QA (PDF, Markdown, TXT), active workspace context radar (VS Code, Figma, Terminal, Slack), multi-step file automation, and daily briefing workflows. Planned for upcoming releases: Multi-modal screen perception via local Vision models, cross-app deep AppleScript extensions, and custom workflow triggers.',
    },
    {
      q: 'How does NORVA prevent accidental or destructive file changes?',
      a: 'NORVA never performs destructive actions autonomously. Before executing file moves, code token extraction, or email drafting, it generates a deterministic execution plan DAG with rollback capability. You can inspect every step, and changes are logged to an atomic undo transaction log.',
    },
  ]

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAF9F7] relative border-t border-[#E8E6E1]/70">
      <div className="max-w-[1000px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill text-[#7B5CF0] text-[11.5px] font-semibold tracking-wide uppercase mb-3.5 shadow-2xs">
            <HelpCircle size={13} />
            <span>Frequently Asked Questions</span>
          </div>
          <h2
            className="text-[34px] sm:text-[42px] font-medium text-[#111116] tracking-tight leading-[1.08] mb-4"
            style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
          >
            Everything you need to know.
          </h2>
          <p className="text-[16px] text-[#5A5A66] leading-relaxed">
            Clear, honest answers about NORVA's local-first architecture,
            supported capabilities, and release status.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 mb-12">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={faq.q}
                className="rounded-[22px] transition-all duration-200 overflow-hidden text-left"
                style={{
                  background: isOpen
                    ? 'linear-gradient(155deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 246, 254, 0.75) 100%)'
                    : 'rgba(255, 255, 255, 0.70)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: isOpen
                    ? '1.5px solid rgba(123, 92, 240, 0.35)'
                    : '1px solid rgba(255, 255, 255, 0.90)',
                  boxShadow: isOpen
                    ? '0 12px 30px -8px rgba(123, 92, 240, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 1)'
                    : '0 2px 8px -2px rgba(0, 0, 0, 0.03)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left cursor-pointer gap-4"
                >
                  <span
                    className="text-[16px] sm:text-[17px] font-medium text-[#111116] tracking-tight leading-snug"
                    style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#7B5CF0]/10 text-[#7B5CF0]' : 'bg-black/[0.04] text-[#5A5A66]'
                    }`}
                  >
                    <ChevronDown size={15} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-[14.5px] text-[#5A5A66] leading-relaxed border-t border-black/[0.04]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

