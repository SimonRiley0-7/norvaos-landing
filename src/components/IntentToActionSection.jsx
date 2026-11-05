import React from 'react'
import { motion } from 'framer-motion'
import { Cpu } from 'lucide-react'
import { FeatureSteps } from '@/components/ui/feature-section'

export function IntentToActionSection() {
  const pipelineFeatures = [
    {
      step: 'Stage 01',
      title: 'Understand',
      content: 'Parses natural intent into concrete OS parameters on-device.',
      image:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      badge: 'Apple Silicon Neural Engine',
      metric: '18ms Latency',
    },
    {
      step: 'Stage 02',
      title: 'Plan',
      content: 'Builds an atomic DAG with instant rollback and zero side effects.',
      image:
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop',
      badge: 'Zero Hallucination Sandbox',
      metric: '100% Rollback',
    },
    {
      step: 'Stage 03',
      title: 'Act',
      content: 'Executes via native OS APIs and direct kernel dispatch.',
      image:
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
      badge: 'Native OS Runtime',
      metric: '2.4ms Dispatch',
    },
    {
      step: 'Stage 04',
      title: 'Complete',
      content: 'Verifies state changes locally with 0.00 bytes cloud egress.',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      badge: 'Air-Gapped Hardware Enclave',
      metric: '0.00 B Egress',
    },
  ]

  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 bg-[#FAF9F7] border-t border-[#E8E6E1]/80 relative overflow-hidden"
    >
      {/* Ambient Liquid Glow for Glass Refraction */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[520px] bg-gradient-to-r from-[#7B5CF0]/12 via-[#38BDF8]/10 to-[#A855F7]/08 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[620px] h-[420px] bg-gradient-to-tl from-[#10B981]/10 via-[#7B5CF0]/08 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 left-10 w-[500px] h-[350px] bg-gradient-to-br from-[#38BDF8]/08 to-transparent rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-[700px] mb-12 sm:mb-16 text-left">
          {/* Liquid Glass Badge */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/80 text-[#7B5CF0] text-[12px] font-mono tracking-wider uppercase mb-4 shadow-xs"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(248, 246, 254, 0.55) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
            }}
          >
            <Cpu size={13} />
            <span>Deterministic System Pipeline</span>
          </div>

          <h2
            className="text-[34px] sm:text-[42px] md:text-[48px] font-medium text-[#17171C] tracking-tight leading-[1.12] mb-5"
            style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
          >
            From intent to action.
          </h2>

          <p className="text-[17px] sm:text-[18px] text-[#5A5A66] leading-relaxed">
            Every command undergoes a verifiable 4-stage pipeline. No hallucinated file moves,
            no broken dependencies—just fast, deterministic local automation.
          </p>
        </div>

        {/* Master Liquid Glass Container enclosing FeatureSteps */}
        <div
          className="rounded-[36px] p-2 sm:p-6 md:p-8 relative overflow-hidden shadow-2xl border border-white/95"
          style={{
            background: 'linear-gradient(155deg, rgba(255, 255, 255, 0.88) 0%, rgba(248, 246, 254, 0.72) 100%)',
            backdropFilter: 'blur(36px) saturate(190%)',
            WebkitBackdropFilter: 'blur(36px) saturate(190%)',
            boxShadow: `
              0 30px 80px -20px rgba(23, 23, 28, 0.08),
              0 8px 24px -6px rgba(123, 92, 240, 0.06),
              inset 0 2px 2px 0 rgba(255, 255, 255, 1)
            `,
          }}
        >
          {/* Specular Edge Highlights */}
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-20" />

          {/* Integrated FeatureSteps component */}
          <FeatureSteps
            features={pipelineFeatures}
            className="p-2 sm:p-4 md:p-6"
            autoPlayInterval={3800}
            imageHeight="h-[340px] sm:h-[400px] md:h-[450px]"
          />
        </div>
      </div>
    </section>
  )
}

export default IntentToActionSection
