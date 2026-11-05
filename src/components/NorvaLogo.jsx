export function NorvaRibbonGlyph({ size = 36, className = '', glow = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      style={{
        filter: glow
          ? 'drop-shadow(0 4px 18px rgba(123, 92, 240, 0.45)) drop-shadow(0 1px 4px rgba(123, 92, 240, 0.25))'
          : 'drop-shadow(0 2px 8px rgba(123, 92, 240, 0.30))',
      }}
    >
      <defs>
        {/* Main Ribbon Arch Gradient (Violet to Rich Purple) */}
        <linearGradient id="norva-ribbon-main" x1="16" y1="56" x2="56" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6C4BE8" />
          <stop offset="30%" stopColor="#7B5CF0" />
          <stop offset="65%" stopColor="#8E6BF8" />
          <stop offset="100%" stopColor="#B397FF" />
        </linearGradient>

        {/* Secondary strand gradient for 3D twist */}
        <linearGradient id="norva-ribbon-fold" x1="26" y1="26" x2="58" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9C78FF" />
          <stop offset="45%" stopColor="#7B5CF0" />
          <stop offset="100%" stopColor="#5530D8" />
        </linearGradient>

        {/* Tubular Specular Highlight */}
        <linearGradient id="norva-specular" x1="22" y1="20" x2="42" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Background shadow strand for depth */}
      <path
        d="M 33 33 L 48 46 C 53 50 59 47 60 41 C 61 35 56 28 50 26"
        stroke="#4B2BB8"
        strokeWidth="9.5"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Main looping arch strand (Left bulb up through apex) */}
      <path
        d="M 18 52
           C 12 45 14 31 22 22
           C 28 15 36 17 41 23
           L 54 40
           C 58 45 57 52 51 55
           C 45 58 38 55 34 49
           L 24 35"
        stroke="url(#norva-ribbon-main)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Overlapping foreground fold creating the authentic 3D ribbon twist */}
      <path
        d="M 28 32
           C 32 20 42 16 48 22
           C 54 28 53 36 47 43
           L 38 53"
        stroke="url(#norva-ribbon-fold)"
        strokeWidth="9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Specular apex highlight */}
      <path
        d="M 26 21 C 30 17 36 17 40 21"
        stroke="url(#norva-specular)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function NorvaBrandLockup({ size = 28, showWordmark = true, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <img
        src="/logo.png"
        alt="NORVA logo"
        width={size}
        height={size}
        className="rounded-md object-contain flex-shrink-0"
        style={{
          width: size,
          height: size,
        }}
      />
      {showWordmark && (
        <span
          className="font-semibold tracking-[0.08em] text-[17px] text-[#17171C]"
          style={{ letterSpacing: '0.08em' }}
        >
          NORVA
        </span>
      )}
    </div>
  )
}
