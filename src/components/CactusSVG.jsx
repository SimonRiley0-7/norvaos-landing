/**
 * NorvaBot — NORVA's pixel-art cactus mascot.
 * Renders cleanly at any size. Uses `currentColor` so it inherits
 * the purple brand color from parent, or override with `color` prop.
 *
 * Sizes used across the app:
 *   16px  — tiny inline indicators
 *   20px  — conversation avatars, widget labels
 *   24px  — navbar logo mark
 *   32px  — canvas corner, default
 *   48px  — CTA section bounce
 *   64px+ — hero / splash usage
 */
export function NorvaBot({
  size = 32,
  className = '',
  style = {},
  glow = false,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ color: 'var(--purple-primary)', ...style }}
      aria-label="NORVA mascot"
      role="img"
    >
      {/* Glow filter */}
      {glow && (
        <defs>
          <filter id="norva-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}

      <g filter={glow ? 'url(#norva-glow)' : undefined} fill="currentColor">
        {/* ── BASE / POT ── */}
        <rect x="14" y="50" width="20" height="4" rx="1" />
        <rect x="12" y="47" width="24" height="4" rx="1" />

        {/* ── MAIN STEM / BODY ── */}
        {/* rounded top cap */}
        <rect x="18" y="6"  width="12" height="2" />
        <rect x="16" y="8"  width="16" height="2" />
        <rect x="14" y="10" width="20" height="28" />
        <rect x="16" y="8"  width="16" height="2" />

        {/* ── LEFT ARM ── */}
        {/* arm going out */}
        <rect x="6"  y="18" width="8"  height="4" />
        {/* arm tip curving up */}
        <rect x="6"  y="14" width="4"  height="4" />
        {/* knuckle */}
        <rect x="4"  y="16" width="2"  height="4" />

        {/* ── RIGHT ARM ── */}
        <rect x="34" y="22" width="8"  height="4" />
        <rect x="38" y="18" width="4"  height="4" />
        <rect x="42" y="20" width="2"  height="4" />

        {/* ── FACE — eyes (2×2 pixel each) ── */}
        {/* left eye */}
        <rect x="19" y="15" width="3" height="3" fill="rgba(0,0,0,0.35)" />
        {/* right eye */}
        <rect x="26" y="15" width="3" height="3" fill="rgba(0,0,0,0.35)" />

        {/* eye shine (1px white) */}
        <rect x="20" y="15" width="1" height="1" fill="rgba(255,255,255,0.7)" />
        <rect x="27" y="15" width="1" height="1" fill="rgba(255,255,255,0.7)" />

        {/* ── MOUTH — tiny neutral-friendly line ── */}
        <rect x="21" y="22" width="6" height="1" fill="rgba(0,0,0,0.25)" />

        {/* ── BODY RIDGES (pixel cactus detail) ── */}
        <rect x="23" y="10" width="2" height="26" fill="rgba(0,0,0,0.12)" />
      </g>
    </svg>
  )
}

/**
 * NorvaLogo — wordmark + mascot lockup, like Claude's sidebar logo.
 * Use in Navbar and any branded placement.
 */
export function NorvaLogo({ size = 20, showName = true, className = '' }) {
  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      style={{ userSelect: 'none' }}
    >
      <NorvaBot size={size} />
      {showName && (
        <span
          style={{
            fontFamily: "'Geist', system-ui, sans-serif",
            fontSize: 13,
            letterSpacing: '0.25em',
            fontWeight: 300,
            color: 'var(--text-primary)',
            opacity: 0.85,
          }}
        >
          NORVA
        </span>
      )}
    </div>
  )
}
