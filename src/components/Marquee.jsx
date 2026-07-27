const ROW1 = [
  'Get me ready for my day',
  'Build a kanban board with Postgres',
  "Draft a reply to Shivam's email",
  'Clear my downloads folder',
  'Push my project to GitHub',
  'Organize my files by project',
]

const ROW2 = [
  "What's on my calendar today?",
  'Build me a REST API with Express',
  'Summarize my unread emails',
  'Run my dev environment',
  'Archive old screenshots',
  'Who emailed me today?',
]

function MarqueeRow({ items, direction = 'left', speed = 30, theme, onItemClick }) {
  // Triple items for seamless loop
  const tripled = [...items, ...items, ...items]
  const animName = direction === 'left' ? 'marqueeLeft' : 'marqueeRight'

  const pillStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 9999,
    padding: '5px 14px',
    marginRight: 12,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    transition: 'border-color 150ms, color 150ms, background 150ms',
    ...(theme === 'dark'
      ? {
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.40)',
        }
      : {
          background: 'rgba(255,255,255,0.60)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(123,92,246,0.12)',
          color: 'var(--text-secondary)',
        }),
  }

  return (
    <>
      <style>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
      `}</style>
      <div
        style={{
          overflow: 'hidden',
          width: '100%',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            animation: `${animName} ${speed}s linear infinite`,
          }}
        >
          {tripled.map((item, i) => (
            <span
              key={i}
              style={pillStyle}
              onClick={() => onItemClick(item)}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(123,92,240,0.4)'
                e.currentTarget.style.color = theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'var(--purple-primary)'
                e.currentTarget.style.background = theme === 'dark' ? 'rgba(123,92,240,0.1)' : 'rgba(237,233,255,0.7)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(123,92,246,0.12)'
                e.currentTarget.style.color = theme === 'dark' ? 'rgba(255,255,255,0.40)' : 'var(--text-secondary)'
                e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.60)'
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

export function Marquee({ theme, onItemClick }) {
  return (
    <div
      className="w-full flex flex-col gap-2"
      style={{ marginTop: 24, maxWidth: 680 }}
    >
      <MarqueeRow items={ROW1} direction="left"  speed={30} theme={theme} onItemClick={onItemClick} />
      <MarqueeRow items={ROW2} direction="right" speed={28} theme={theme} onItemClick={onItemClick} />
    </div>
  )
}
