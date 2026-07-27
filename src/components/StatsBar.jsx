import { motion } from 'framer-motion'

const ITEMS = [
  '1.5B LOCAL MODEL',
  'ZERO CLOUD',
  '5-AGENT PIPELINE',
  'APPLE SILICON NATIVE',
]

export function StatsBar({ theme }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.7 }}
      className="flex flex-wrap justify-center items-center gap-6 md:gap-12 px-6 py-6 md:px-12 md:py-7"
      style={{
        width: '100%',
        borderTop: theme === 'dark' ? '1px solid var(--border-subtle)' : '1px solid rgba(123,92,240,0.08)',
        borderBottom: theme === 'dark' ? '1px solid var(--border-subtle)' : '1px solid rgba(123,92,240,0.08)',
      }}
    >
      {ITEMS.map((item, i) => (
        <div key={item} className="flex items-center gap-4">
          <span
            className="font-mono-jb text-[10px] font-bold tracking-widest uppercase"
            style={{
              color: theme === 'dark' ? 'var(--text-mono)' : 'rgba(91,63,208,0.55)',
            }}
          >
            {item}
          </span>
          {i < ITEMS.length - 1 && (
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'rgba(123,92,240,0.35)',
              }}
            />
          )}
        </div>
      ))}
    </motion.div>
  )
}
