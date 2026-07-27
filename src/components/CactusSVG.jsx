/**
 * NorvaBot — NORVA's official mascot image (/Norva-bot.png).
 * Replaces old SVG placeholder with official mascot asset.
 */
export function NorvaBot({
  size = 32,
  className = '',
  style = {},
  glow = false,
}) {
  return (
    <img
      src="/Norva-bot.png"
      alt="NorvaBot mascot"
      width={size}
      height={size}
      className={`object-contain inline-block ${className}`}
      style={{
        width: size,
        height: size,
        filter: glow ? 'drop-shadow(0 0 12px rgba(123,92,240,0.6))' : undefined,
        userSelect: 'none',
        ...style,
      }}
    />
  )
}

/**
 * NorvaLogo — official logo image (/logo-norva.jpg) + NORVA wordmark lockup.
 */
export function NorvaLogo({ size = 22, showName = true, className = '', theme = 'dark' }) {
  return (
    <div
      className={`flex items-center gap-2.5 ${className}`}
      style={{ userSelect: 'none' }}
    >
      <img
        src="/favicon-zoomed.png"
        alt="NORVA logo"
        className="rounded-lg object-cover flex-shrink-0"
        style={{
          width: size + 4,
          height: size + 4,
        }}
      />
      {showName && (
        <span
          style={{
            fontFamily: "'Geist', system-ui, sans-serif",
            fontSize: 13,
            letterSpacing: '0.25em',
            fontWeight: 400,
            color: theme === 'dark' ? 'var(--text-primary)' : '#1A1033',
            opacity: theme === 'dark' ? 0.9 : 0.7,
          }}
        >
          NORVA
        </span>
      )}
    </div>
  )
}
