import { motion } from 'framer-motion'
import { Terminal, Database, Box } from 'lucide-react'

export function TechStackRequirements({ theme }) {
  const isDark = theme === 'dark'

  const stack = [
    {
      id: 'antigravity',
      title: 'Antigravity IDE',
      icon: Terminal,
      desc: 'Required for our AI to autonomously write, edit, and execute code with deep background permissions.',
      color: '#7b5cf0'
    },
    {
      id: 'docker',
      title: 'Docker Desktop',
      icon: Box,
      desc: 'Required to seamlessly spin up a local instance of your database and backend environment.',
      color: '#2496ED'
    },
    {
      id: 'supabase',
      title: 'Supabase',
      icon: Database,
      desc: 'Our enforced cloud provider. Required for one-click production deployments and instant schemas.',
      color: '#3ECF8E'
    }
  ]

  return (
    <section
      className="relative flex flex-col items-center justify-center w-full"
      style={{
        padding: '80px 24px',
        background: isDark ? 'linear-gradient(180deg, transparent, rgba(123,92,240,0.03) 100%)' : 'linear-gradient(180deg, transparent, rgba(123,92,240,0.05) 100%)'
      }}
    >
      <div className="max-w-5xl w-full flex flex-col items-center gap-12">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: isDark ? 'rgba(123,92,240,0.1)' : 'rgba(123,92,240,0.1)',
              border: `1px solid ${isDark ? 'rgba(123,92,240,0.2)' : 'rgba(123,92,240,0.3)'}`
            }}
          >
            <span className="font-mono-jb text-[11px] uppercase tracking-widest" style={{ color: 'var(--purple-primary)' }}>
              Opinionated by Design
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-instrument text-4xl md:text-5xl"
            style={{ color: isDark ? '#FFF' : '#000' }}
          >
            The NORVA Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-geist text-lg"
            style={{ color: 'var(--text-secondary)' }}
          >
            We strictly enforce a standardized tech stack. This completely eliminates configuration fatigue and guarantees a 100% success rate when scaffolding and deploying your app.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {stack.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="flex flex-col gap-4 rounded-3xl p-8 relative overflow-hidden group"
              style={{
                background: isDark ? 'rgba(255,255,255,0.03)' : '#FFF',
                border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
                boxShadow: isDark ? 'none' : '0 10px 40px -10px rgba(0,0,0,0.05)'
              }}
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at top left, ${item.color}15, transparent 70%)`
                }}
              />

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)'
                }}
              >
                <item.icon size={24} style={{ color: item.color }} />
              </div>

              <h3 className="font-geist font-medium text-xl m-0" style={{ color: isDark ? '#FFF' : '#000' }}>
                {item.title}
              </h3>
              <p className="font-geist text-[15px] m-0 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
