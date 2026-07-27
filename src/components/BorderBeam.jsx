import { useRef, useEffect } from 'react'

/**
 * BorderBeam component — a glowing beam that travels around any container's border.
 * Props:
 *   duration  — animation duration in seconds (default 4)
 *   colorFrom — start color  (default '#7B5CF0')
 *   colorTo   — end color    (default '#C4B0FA')
 *   size      — beam length in px (default 120)
 *   className — extra classes on the wrapper
 */
export function BorderBeam({
  duration = 4,
  colorFrom = '#7B5CF0',
  colorTo = '#C4B0FA',
  size = 120,
  className = '',
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] ${className}`}
      style={{ zIndex: 1 }}
    >
      <span
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: `conic-gradient(from calc(var(--angle, 0deg) - 30deg) at 50% 50%, transparent 0deg, ${colorFrom} 30deg, ${colorTo} 60deg, transparent 90deg)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
          animation: `borderBeamSpin ${duration}s linear infinite`,
        }}
      />
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes borderBeamSpin {
          to { --angle: 360deg; }
        }
      `}</style>
    </span>
  )
}
