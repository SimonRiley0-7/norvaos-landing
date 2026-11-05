import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Authentic Brand Icons for Segmented Switcher & Comparison Card
function ChatGptIcon({ size = 16, className = '' }) {
  return (
    <img
      src="/chatgpt.webp"
      alt="ChatGPT"
      width={size}
      height={size}
      className={`inline-block object-contain shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  )
}

function ClaudeIcon({ size = 16, className = '' }) {
  return (
    <img
      src="/claude.png"
      alt="Claude"
      width={size}
      height={size}
      className={`inline-block object-contain shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  )
}

function PerplexityIcon({ size = 16, className = '' }) {
  return (
    <img
      src="/perplexity.webp"
      alt="Perplexity"
      width={size}
      height={size}
      className={`inline-block object-contain shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  )
}

export function ProblemSection() {
  const [activeTab, setActiveTab] = useState('chatgpt')

  const tools = [
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      icon: ChatGptIcon,
      frictionHeadline: 'Waits in its own window. You bring it the context.',
      frictionDetail: 'Blind to your active screen, local files, and background workflows.',
    },
    {
      id: 'claude',
      name: 'Claude',
      icon: ClaudeIcon,
      frictionHeadline: 'Stuck in a browser tab. Blind to what is on your screen.',
      frictionDetail: 'Requires manual copy-pasting every time you switch between tasks.',
    },
    {
      id: 'perplexity',
      name: 'perplexity',
      icon: PerplexityIcon,
      frictionHeadline: 'Searches the web. Knows nothing about your private Mac.',
      frictionDetail: 'Zero access to your local notes, project repositories, or active workspaces.',
    },
  ]

  const currentTool = tools.find((t) => t.id === activeTab) || tools[0]

  return (
    <section id="problem" className="pt-24 md:pt-32 pb-14 md:pb-16 bg-[#FAF9F7] relative border-t border-[#E8E6E1]/70 overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10 relative z-10">
        {/* =========================================================
            HEADER: BIG, CRISP SWITZER TYPOGRAPHY
            ========================================================= */}
        <div className="max-w-[780px] mx-auto text-center mb-12">
          <h2
            className="text-[42px] sm:text-[50px] md:text-[58px] font-medium text-[#111116] tracking-tight leading-[1.08] mb-4"
            style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
          >
            A chatbot answers.<br />
            NORVA is always there.
          </h2>

          <p className="text-[16.5px] sm:text-[17.5px] text-[#6B6B78] max-w-[540px] mx-auto leading-relaxed">
            Other AI tools are either stuck in a chat window or have a narrow purpose. NORVA is always there.
          </p>
        </div>

        {/* =========================================================
            21ST.DEV LIQUID GLASS SEGMENTED SWITCHER PILL
            ========================================================= */}
        <div className="flex justify-center mb-12">
          <div
            className="inline-flex items-center p-1.5 rounded-full overflow-x-auto max-w-full"
            style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.85) 0%, rgba(246, 244, 252, 0.65) 100%)',
              backdropFilter: 'blur(24px) saturate(200%)',
              WebkitBackdropFilter: 'blur(24px) saturate(200%)',
              border: '1.5px solid rgba(255, 255, 255, 0.95)',
              boxShadow: `
                0 14px 34px -8px rgba(23, 23, 28, 0.08),
                inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 1)
              `,
            }}
          >
            {tools.map((tool) => {
              const Icon = tool.icon
              const isActive = activeTab === tool.id
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => setActiveTab(tool.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-[13.5px] font-medium transition-all duration-200 cursor-pointer ${
                    isActive ? 'text-[#111116]' : 'text-[#6B6B78] hover:text-[#111116]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="toolSwitcherPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 rounded-full bg-white shadow-[0_4px_14px_-2px_rgba(23,23,28,0.12),inset_0_1px_1px_rgba(255,255,255,1)] border border-black/[0.04]"
                    />
                  )}
                  <span className="relative z-10 opacity-90">
                    <Icon size={15} />
                  </span>
                  <span className="relative z-10 tracking-tight font-medium">
                    {tool.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* =========================================================
            SIDE-BY-SIDE CARDS: BIG HEADINGS + 2 LINES OF CONTENT
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-[1040px] mx-auto">
          {/* LEFT: THE CHATBOT WAY */}
          <div
            className="rounded-[32px] p-8 sm:p-9 flex flex-col justify-between text-left min-h-[250px] sm:min-h-[270px] transition-all duration-300"
            style={{
              background: 'linear-gradient(155deg, rgba(255, 255, 255, 0.90) 0%, rgba(248, 246, 254, 0.60) 100%)',
              backdropFilter: 'blur(26px) saturate(190%)',
              WebkitBackdropFilter: 'blur(26px) saturate(190%)',
              border: '1.5px solid rgba(255, 255, 255, 0.95)',
              boxShadow: `
                0 20px 45px -15px rgba(23, 23, 28, 0.05),
                inset 0 2px 2px 0 rgba(255, 255, 255, 1),
                inset 0 -1px 1px 0 rgba(255, 255, 255, 0.35)
              `,
            }}
          >
            {/* Top: Tool Brand with Big Heading */}
            <div className="flex items-center gap-4 sm:gap-4.5 text-[#111116]">
              <span className="w-14 h-14 sm:w-16 sm:h-16 md:w-[68px] md:h-[68px] rounded-[20px] sm:rounded-[22px] bg-white border border-black/[0.06] shadow-sm flex items-center justify-center p-2 shrink-0">
                <currentTool.icon size={36} />
              </span>
              <span
                className="font-medium text-[32px] sm:text-[38px] md:text-[42px] text-[#111116] tracking-tight leading-none"
                style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
              >
                {currentTool.name}
              </span>
            </div>

            {/* Bottom: 2 Clear, Balanced Content Lines */}
            <div className="mt-8 space-y-1.5">
              <p className="text-[16px] sm:text-[17.5px] text-[#111116] font-medium leading-snug">
                {currentTool.frictionHeadline}
              </p>
              <p className="text-[14px] sm:text-[15px] text-[#6B6B78] leading-relaxed font-normal">
                {currentTool.frictionDetail}
              </p>
            </div>
          </div>

          {/* RIGHT: THE NORVA WAY (APPLE INTELLIGENCE IRIS LIQUID GLASS) */}
          <div
            className="rounded-[32px] p-8 sm:p-9 flex flex-col justify-between text-left min-h-[250px] sm:min-h-[270px] text-white relative overflow-hidden transition-all duration-300"
            style={{
              background: 'linear-gradient(155deg, #7044EC 0%, #5E34E0 45%, #4620CE 100%)',
              backdropFilter: 'blur(26px) saturate(210%)',
              WebkitBackdropFilter: 'blur(26px) saturate(210%)',
              border: '1.5px solid rgba(255, 255, 255, 0.48)',
              boxShadow: `
                0 30px 70px -15px rgba(112, 68, 236, 0.52),
                0 10px 28px -5px rgba(112, 68, 236, 0.32),
                inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.90),
                inset 0 -1px 2px 0 rgba(0, 0, 0, 0.25)
              `,
            }}
          >
            {/* Ambient Apple Intelligence Iridescent Shimmer */}
            <div
              className="absolute -top-12 -right-12 w-80 h-80 rounded-full blur-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 60% 30%, rgba(244, 114, 182, 0.35) 0%, rgba(168, 85, 247, 0.28) 40%, rgba(56, 189, 248, 0.22) 75%, transparent 100%)',
              }}
            />

            {/* Top: Big Clear White NORVA Heading with Enlarged Logo */}
            <div className="relative z-10 flex items-center gap-4 sm:gap-4.5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-[68px] md:h-[68px] rounded-[20px] sm:rounded-[22px] bg-white shadow-[0_8px_24px_-4px_rgba(0,0,0,0.28),0_2px_6px_rgba(0,0,0,0.12)] flex items-center justify-center p-1.5 sm:p-2 border border-white shrink-0">
                <img
                  src="/logo.png"
                  alt="NORVA"
                  className="w-full h-full object-contain"
                />
              </div>
              <span
                className="font-medium text-[32px] sm:text-[38px] md:text-[42px] text-white tracking-tight leading-none"
                style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
              >
                NORVA
              </span>
            </div>

            {/* Bottom: 2 Clear, Balanced Content Lines with Liquid Glass Lens */}
            <div className="relative z-10 mt-8 space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="liquid-glass-lens px-3.5 py-1 rounded-full text-[13px] sm:text-[13.5px] font-medium text-white tracking-tight shadow-sm select-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Already there,
                </span>
                <span className="text-[16px] sm:text-[17.5px] text-white tracking-tight font-medium">
                  looking at the same screen you are.
                </span>
              </div>
              <p className="text-[14px] sm:text-[15px] text-white/85 leading-relaxed font-normal">
                Silently perceives your active workspaces and automates multi-step actions on-device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
