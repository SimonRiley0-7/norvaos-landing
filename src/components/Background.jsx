import { motion } from 'framer-motion'

export function Background({ theme }) {
  if (theme === 'dark') {
    return (
      <>
        {/* Layer 1: Dot grid */}
        <div
          className="fixed inset-0 dot-grid pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* Layer 2: Purple orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 600,
              height: 600,
              background: '#7B5CF0',
              filter: 'blur(180px)',
              opacity: 0.12,
              top: '-10%',
              left: '20%',
              willChange: 'transform',
            }}
            animate={{ scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 600,
              height: 600,
              background: '#7B5CF0',
              filter: 'blur(180px)',
              opacity: 0.12,
              bottom: '-10%',
              right: '15%',
              willChange: 'transform',
            }}
            animate={{ scale: [1, 1.15, 1], rotate: [0, -45, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Layer 3: Vignette */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 0,
            background: 'radial-gradient(ellipse at center, transparent 45%, #080808 100%)',
          }}
        />
      </>
    )
  }

  // Light theme
  return (
    <>
      {/* Layer 1: Lavender orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            background: '#C4B0FA',
            filter: 'blur(150px)',
            opacity: 0.25,
            top: '-5%',
            left: '15%',
            willChange: 'transform',
          }}
          animate={{ scale: [1, 1.12, 1], rotate: [0, 35, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            background: '#C4B0FA',
            filter: 'blur(150px)',
            opacity: 0.25,
            bottom: '-5%',
            right: '10%',
            willChange: 'transform',
          }}
          animate={{ scale: [1, 1.12, 1], rotate: [0, -35, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Layer 2: Dot grid */}
      <div
        className="fixed inset-0 dot-grid pointer-events-none"
        style={{ zIndex: 0 }}
      />
    </>
  )
}
