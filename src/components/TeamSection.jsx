import { motion } from 'framer-motion'
import { NorvaBot } from './CactusSVG'
import { BorderBeam } from './BorderBeam'

const TEAM = [
  {
    name: 'Bhumi Chavan',
    role: 'Vision & Planning',
    tag: 'CS Major',
    avatarText: 'BC',
    quote: 'If a repetitive task exists on a desktop, a human shouldn’t have to do it twice.',
    skills: ['Product Strategy', 'Workflow Architecture', 'UX Systems'],
  },
  {
    name: 'Shivam Wadatkar',
    role: 'Engineering & Systems',
    tag: 'CS Major',
    avatarText: 'SW',
    quote: 'Between the two of us — one thinks it, one ships it. Zero cloud compromises.',
    skills: ['Local Models', 'Native macOS APIs', 'System Engine'],
  },
]

export function TeamSection({ theme }) {
  const isDark = theme === 'dark'

  return (
    <section style={{ padding: '90px 24px 0' }}>
      {/* Section header */}
      <motion.div
        className="flex flex-col items-center text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="flex items-center gap-2 rounded-full px-3.5 py-1 mb-4"
          style={{
            background: isDark ? 'rgba(123,92,240,0.08)' : 'rgba(237,233,255,0.8)',
            border: isDark ? '1px solid rgba(123,92,240,0.20)' : '1px solid rgba(196,176,250,0.5)',
          }}
        >
          <NorvaBot size={14} />
          <span
            className="font-mono-jb text-[10px] uppercase tracking-widest"
            style={{ color: 'var(--purple-soft)' }}
          >
            The Team Behind NORVA
          </span>
        </div>

        <h2
          className="font-instrument text-4xl font-normal m-0"
          style={{ color: 'var(--text-primary)' }}
        >
          Two CS majors. One mission.
        </h2>

        <p
          className="font-geist text-base mt-3 m-0"
          style={{ color: 'var(--text-secondary)', maxWidth: 520, lineHeight: 1.6 }}
        >
          We got tired of performing repetitive desktop tasks manually. Neither of us could find a tool that actually worked — so we built NORVA.
        </p>
      </motion.div>

      {/* Cards container */}
      <div
        className="mx-auto"
        style={{
          maxWidth: 920,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 24,
        }}
      >
        {TEAM.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group relative"
            style={{
              borderRadius: '2.25rem',
              padding: 36,
              background: isDark ? 'rgba(18,18,18,0.75)' : 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(123,92,240,0.18)',
              boxShadow: isDark
                ? 'inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.4)'
                : 'inset 0 1px 0 rgba(255,255,255,0.9), 0 12px 40px rgba(123,92,240,0.08)',
              overflow: 'hidden',
            }}
          >
            {/* Border beam on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0 pointer-events-none" style={{ borderRadius: 'inherit' }}>
              <BorderBeam duration={3} colorFrom="#7B5CF0" colorTo="#C4B0FA" />
            </div>

            {/* Header: avatar + title */}
            <div className="flex items-center gap-4 mb-6">
              {/* Avatar circle */}
              <div
                className="flex items-center justify-center font-mono-jb text-sm font-bold rounded-2xl flex-shrink-0"
                style={{
                  width: 52,
                  height: 52,
                  background: 'linear-gradient(135deg, rgba(123,92,240,0.25) 0%, rgba(123,92,240,0.08) 100%)',
                  border: '1px solid rgba(123,92,240,0.3)',
                  color: 'var(--purple-soft)',
                  boxShadow: '0 0 20px rgba(123,92,240,0.2)',
                }}
              >
                {member.avatarText}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-geist font-semibold text-xl m-0" style={{ color: 'var(--text-primary)' }}>
                    {member.name}
                  </h3>
                  <span
                    className="font-mono-jb text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border"
                    style={{
                      background: 'rgba(123,92,240,0.1)',
                      borderColor: 'rgba(123,92,240,0.2)',
                      color: 'var(--purple-soft)',
                    }}
                  >
                    {member.tag}
                  </span>
                </div>
                <p className="font-mono-jb text-[11px] uppercase tracking-wider m-0 mt-1" style={{ color: '#7B5CF0' }}>
                  {member.role}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'linear-gradient(to right, rgba(123,92,240,0.25), transparent)', marginBottom: 18 }} />

            {/* Quote */}
            <p className="font-instrument italic text-base m-0 leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.9 }}>
              "{member.quote}"
            </p>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {member.skills.map(s => (
                <span
                  key={s}
                  className="font-mono-jb text-[10px] rounded-lg px-2.5 py-1"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(123,92,240,0.06)',
                    border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(123,92,240,0.12)',
                    color: 'var(--text-mono)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Motto banner */}
      <motion.div
        className="mx-auto mt-10 p-5 text-center rounded-2xl"
        style={{
          maxWidth: 920,
          background: isDark ? 'rgba(123,92,240,0.05)' : 'rgba(237,233,255,0.4)',
          border: isDark ? '1px solid rgba(123,92,240,0.15)' : '1px solid rgba(196,176,250,0.4)',
        }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <span className="font-mono-jb text-xs tracking-wider" style={{ color: 'var(--purple-soft)' }}>
          ⚡ "Between the two of us — one thinks it, one ships it."
        </span>
      </motion.div>
    </section>
  )
}
