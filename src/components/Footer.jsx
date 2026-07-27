// Social icons as inline SVGs — Twitter/X and Instagram not reliably in lucide-react

function XIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.258 5.632 5.906-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  )
}

function InstagramIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer
      className="flex items-center justify-between"
      style={{ padding: '32px 48px', borderTop: '1px solid var(--border-subtle)' }}
    >
      {/* Left */}
      <div className="flex flex-col gap-1">
        <span
          className="font-geist text-[13px] tracking-[0.25em]"
          style={{ color: 'var(--text-primary)', opacity: 0.7, fontWeight: 300 }}
        >
          NORVA
        </span>
        <span
          className="font-mono-jb text-[10px] uppercase tracking-widest"
          style={{ color: 'var(--text-mono)' }}
        >
          © 2025 NORVA. ALL RIGHTS RESERVED.
        </span>
      </div>

      {/* Right: social icons */}
      <div className="flex items-center gap-4">
        <a
          href="https://twitter.com/norva_os"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--text-secondary)', transition: 'color 150ms ease' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <XIcon size={16} />
        </a>
        <a
          href="https://instagram.com/norva_os"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--text-secondary)', transition: 'color 150ms ease' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <InstagramIcon size={16} />
        </a>
      </div>
    </footer>
  )
}
