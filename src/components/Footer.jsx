import { NorvaBrandLockup } from './NorvaLogo'

export function Footer({ onOpenModal, onNavigate }) {
  const handleOpen = (e, modalType) => {
    e.preventDefault()
    if (modalType === 'team') {
      if (onNavigate) {
        onNavigate('/team')
      } else {
        window.history.pushState(null, '', '/team')
      }
      return
    }
    if (onOpenModal) {
      onOpenModal(modalType)
    }
  }

  return (
    <footer className="py-16 bg-[#FAF9F7] border-t border-[#E8E6E1]/90">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-[#E8E6E1]/70 text-left">
          {/* Brand Col */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <NorvaBrandLockup size={24} showWordmark={true} />
              <span className="text-xs text-[#8E8E98] border-l border-[#E8E6E1] pl-3">
                OS-Native Intelligence
              </span>
            </div>
            <p className="text-[13.5px] text-[#5A5A66] max-w-[340px] leading-relaxed">
              NORVA is your personal desktop employee — quietly working alongside you to handle repetitive workflows, manage tasks, and get real work done directly on your machine.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <p className="text-[11.5px] font-mono text-[#8E8E98] uppercase tracking-wider font-semibold">
              Product
            </p>
            <ul className="space-y-2 text-[13.5px] text-[#5A5A66]">
              <li><a href="#product" className="hover:text-[#111116] transition-colors">Overview</a></li>
              <li><a href="#capabilities" className="hover:text-[#111116] transition-colors">Core Capabilities</a></li>
              <li><a href="#privacy" className="hover:text-[#111116] transition-colors">Privacy by Design</a></li>
              <li><a href="#audiences" className="hover:text-[#111116] transition-colors">Who It's For</a></li>
            </ul>
          </div>

          {/* Architecture Links */}
          <div className="space-y-3">
            <p className="text-[11.5px] font-mono text-[#8E8E98] uppercase tracking-wider font-semibold">
              Architecture
            </p>
            <ul className="space-y-2 text-[13.5px] text-[#5A5A66]">
              <li><a href="#workflows" className="hover:text-[#111116] transition-colors">Everyday Workflows</a></li>
              <li><a href="#faq" className="hover:text-[#111116] transition-colors">FAQ</a></li>
              <li>
                <a
                  href="/team"
                  onClick={(e) => handleOpen(e, 'team')}
                  className="hover:text-[#7B5CF0] transition-colors font-medium cursor-pointer"
                >
                  The Team
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <p className="text-[11.5px] font-mono text-[#8E8E98] uppercase tracking-wider font-semibold">
              Legal &amp; Contact
            </p>
            <ul className="space-y-2 text-[13.5px] text-[#5A5A66]">
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => handleOpen(e, 'privacy')}
                  className="hover:text-[#111116] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleOpen(e, 'terms')}
                  className="hover:text-[#111116] transition-colors cursor-pointer"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleOpen(e, 'contact')}
                  className="hover:text-[#7B5CF0] transition-colors font-medium cursor-pointer"
                >
                  Contact Team
                </a>
              </li>
              <li>
                <a
                  href="mailto:act@norvaos.co.in"
                  className="font-mono text-[#7B5CF0] hover:underline text-[12.5px] font-medium"
                >
                  act@norvaos.co.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8E98]">
          <p>© 2026 Norva OS. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[#8E8E98]">
            <span>macOS &amp; Windows</span>
            <span>·</span>
            <span>Air-Gapped Capable</span>
            <span>·</span>
            <span>Privacy First</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
