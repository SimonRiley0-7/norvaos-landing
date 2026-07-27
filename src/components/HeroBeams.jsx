/**
 * HeroBeams — full-hero SVG beam lines converging on the prompt box.
 * Absolutely positioned, z-index 1 (behind hero content at z-index 10).
 */
export function HeroBeams({ theme }) {
  // Edge source points (as %) — converge toward center 50%, 52%
  const cx = 50
  const cy = 52

  const points = [
    { x: 0,   y: 0   },
    { x: 25,  y: 0   },
    { x: 50,  y: 0   },
    { x: 75,  y: 0   },
    { x: 100, y: 0   },
    { x: 0,   y: 30  },
    { x: 100, y: 30  },
    { x: 0,   y: 70  },
    { x: 100, y: 70  },
    { x: 0,   y: 100 },
    { x: 50,  y: 100 },
    { x: 100, y: 100 },
  ]

  const strokeColor = theme === 'dark'
    ? 'rgba(123,92,240,0.18)'
    : 'rgba(123,92,240,0.10)'

  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: theme === 'dark' ? 1 : 0.8,
      }}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <defs>
        {points.map((p, i) => (
          <style key={i}>{`
            @keyframes beam${i} {
              from { stroke-dashoffset: 1000; }
              to   { stroke-dashoffset: 0; }
            }
          `}</style>
        ))}
      </defs>

      {points.map((p, i) => {
        const delay = (i * 0.28).toFixed(2)
        return (
          <line
            key={i}
            x1={p.x}
            y1={p.y}
            x2={cx}
            y2={cy}
            stroke={strokeColor}
            strokeWidth="0.15"
            strokeDasharray="6 4"
            style={{
              animation: `beam${i} 3s linear ${delay}s infinite`,
            }}
          />
        )
      })}
    </svg>
  )
}
