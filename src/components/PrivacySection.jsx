import * as React from 'react'
import { Lock, Cpu, HardDrive, WifiOff, ShieldCheck, Ban } from 'lucide-react'
import { ExpandingCards } from './ui/expanding-cards'

const privacyCards = [
  {
    id: 'hardware-acceleration',
    title: 'On-Device Hardware Acceleration',
    description:
      'Quantized model weights load directly into local VRAM and system memory, executing on native NPU and GPU tensor cores with 0ms off-device latency.',
    imgSrc:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
    icon: <Cpu size={20} />,
    tag: 'Hardware Core',
  },
  {
    id: 'local-sqlite',
    title: 'Encrypted Local Database',
    description:
      'Semantic document embeddings, search indices, and historical context reside in an encrypted local database, protected by OS-level hardware disk encryption.',
    imgSrc:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=80',
    icon: <HardDrive size={20} />,
    tag: 'Data Layer',
  },
  {
    id: 'air-gapped',
    title: 'Air-Gapped Zero Egress',
    description:
      'Disconnect Wi-Fi or enable Airplane Mode. NORVA continues full contextual understanding, drafting, and automation with zero network egress.',
    imgSrc:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1400&q=80',
    icon: <WifiOff size={20} />,
    tag: 'Network Shield',
  },
  {
    id: 'os-sandbox',
    title: 'Native OS Sandboxing',
    description:
      'Operates strictly within explicit system permissions. Screen capture and accessibility APIs require user consent—zero silent background logging.',
    imgSrc:
      'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=1400&q=80',
    icon: <ShieldCheck size={20} />,
    tag: 'System Access',
  },
  {
    id: 'zero-cloud',
    title: 'No Cloud Relays or Training',
    description:
      'No cloud vector DBs, no prompt logging, and zero model training on your personal desktop data. Openly verified by binary hash inspection.',
    imgSrc:
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1400&q=80',
    icon: <Ban size={20} />,
    tag: 'Zero Telemetry',
  },
]

export function PrivacySection() {
  return (
    <section id="privacy" className="py-24 md:py-32 bg-[#FAF9F7] border-t border-[#E8E6E1]/80 relative overflow-hidden">
      {/* Dynamic ambient liquid glass refraction bloom */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#7B5CF0]/12 via-[#38BDF8]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-[#10B981]/12 via-[#7B5CF0]/8 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="max-w-[700px] mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-white/95 text-[#7B5CF0] text-[12px] font-mono tracking-wider uppercase mb-4 shadow-2xs">
            <Lock size={13} />
            <span>Local-First Architecture</span>
          </div>
          <h2
            className="text-[34px] sm:text-[44px] md:text-[48px] font-medium text-[#17171C] tracking-tight leading-[1.1] mb-5"
            style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
          >
            Private by design.
          </h2>
          <p className="text-[17px] text-[#5A5A66] leading-relaxed">
            Your computer contains your personal thoughts, client agreements, financial records,
            and source code. NORVA never uploads your desktop state to cloud servers.
          </p>
        </div>

        {/* Apple Liquid Glass Expanding Cards Showcase */}
        <div className="w-full flex justify-center">
          <ExpandingCards items={privacyCards} defaultActiveIndex={0} />
        </div>
      </div>
    </section>
  )
}
