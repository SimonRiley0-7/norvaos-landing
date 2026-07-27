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

function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function RedditIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.062 12.001c0-1.282-1.04-2.321-2.322-2.321-.861 0-1.606.471-2.001 1.155-1.46-.97-3.411-1.6-5.59-1.691l1.196-5.632 3.904.832c.032.96 .832 1.722 1.8 1.722 1.002 0 1.821-.82 1.821-1.822 0-1.001-.819-1.82-1.821-1.82-.711 0-1.332.41-1.632 1.01l-4.32-.921c-.2-.04-.401.07-.461.27l-1.32 6.223c-2.27.061-4.301.711-5.811 1.712-.39-.681-1.141-1.162-2.001-1.162-1.281 0-2.32.1-2.32 2.322 0 .931.551 1.722 1.341 2.091-.041.24-.061.471-.061.712 0 3.522 4.453 6.383 9.945 6.383s9.945-2.861 9.945-6.383c0-.241-.02-.471-.06-.712.791-.36 1.34-1.15 1.34-2.091zm-14.773 1.251c0-.85.69-1.541 1.54-1.541.851 0 1.541.691 1.541 1.541 0 .85-.69 1.54-1.541 1.54-.85 0-1.54-.69-1.54-1.54zm7.394 4.382c-1.441 1.442-4.012 1.442-5.453 0-.17-.17-.17-.46 0-.64.17-.17.46-.17.64 0 1.09 1.091 2.871 1.091 3.962 0 .17-.17.46-.17.64 0 .17.18.17.47.21.64zM16.713 14.8c-.85 0-1.54-.69-1.54-1.54 0-.85.69-1.541 1.54-1.541.85 0 1.54.691 1.54 1.541 0 .85-.69 1.54-1.54 1.54z"/>
    </svg>
  )
}

export function Footer() {
  return (
    <footer
      className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 px-6 py-8 md:px-12"
      style={{ borderTop: '1px solid var(--border-subtle)' }}
    >
      {/* Left */}
      <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
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
          © 2026 NORVA. ALL RIGHTS RESERVED.
        </span>
      </div>

      {/* Right: social icons */}
      <div className="flex items-center gap-4">
        <a
          href="https://x.com/norvaos"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--text-secondary)', transition: 'color 150ms ease' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <XIcon size={16} />
        </a>
        <a
          href="https://www.instagram.com/norva.os/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--text-secondary)', transition: 'color 150ms ease' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <InstagramIcon size={16} />
        </a>
        <a
          href="https://www.linkedin.com/company/norva-os/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--text-secondary)', transition: 'color 150ms ease' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <LinkedinIcon size={16} />
        </a>
        <a
          href="https://www.reddit.com/r/Norva_OS/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--text-secondary)', transition: 'color 150ms ease' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <RedditIcon size={16} />
        </a>
      </div>
    </footer>
  )
}
