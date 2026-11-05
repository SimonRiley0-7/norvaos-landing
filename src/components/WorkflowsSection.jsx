import { Zap } from 'lucide-react'
import { CoverflowCarousel } from '@/components/ui/coverflow-carousel'

const WORKFLOW_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80',
    alt: 'The Morning Briefing',
    app: 'System Dashboard',
    tag: '8:00 AM Snapshot',
    badge: 'Daily Digest Ready',
    title: 'The Morning Briefing',
    subtitle: 'Email triage, calendar snapshot & pending actions at startup without opening five tabs.',
  },
  {
    src: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=900&q=80',
    alt: 'Quick Email Actions',
    app: 'Apple Mail',
    tag: 'Deterministic Compose',
    badge: 'Zero-Latency Triage',
    title: 'Quick Email Actions',
    subtitle: 'Draft replies, summarize long threads & dictate natural responses directly in native Mail.',
  },
  {
    src: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=900&q=80',
    alt: 'Calendar & Meeting Management',
    app: 'Calendar.app',
    tag: 'Conflict Resolver',
    badge: 'Zero Conflicts Found',
    title: 'Calendar & Scheduling',
    subtitle: 'Schedule meetings, resolve calendar conflicts & reschedule via conversational voice or prompt.',
  },
  {
    src: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=80',
    alt: 'Document Summarization & Insights',
    app: 'Finder / Preview',
    tag: 'Verifiable Citations',
    badge: 'Exact Page Citations',
    title: 'Document Summarization',
    subtitle: 'Summarize threads, PDFs, Word & Google Docs with verifiable page citations and action items.',
  },
  {
    src: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=900&q=80',
    alt: 'Meeting Prep Dossier',
    app: 'FaceTime / Zoom',
    tag: '10m Pre-Flight Radar',
    badge: 'Pre-Flight Radar',
    title: 'Meeting Prep Dossier',
    subtitle: 'Automatically pull relevant emails, files, calendar context & past decisions 10 minutes prior related to the topic .',
  },
  {
    src: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=900&q=80',
    alt: 'Task & Reminder Management',
    app: 'Reminders.app',
    tag: 'Contextual To-Dos',
    badge: 'Synced Reminders',
    title: 'Task & Reminder Engine',
    subtitle: 'Create contextual tasks & reminders tied to events and daily brief action items seamlessly.',
  },
  {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    alt: 'Excel Insights & Quick Analysis',
    app: 'Numbers & Excel',
    tag: 'Semantic Formula DAG',
    badge: '0 Hallucinations',
    title: 'Excel & Spreadsheet Insights',
    subtitle: 'Read spreadsheets, summarize datasets, extract metrics & generate formulas instantly.',
  },
  {
    src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
    alt: 'End-of-Day Recap & Tomorrow Prep',
    app: 'Terminal / System',
    tag: '6:00 PM Day Wrap',
    badge: '6:00 PM Wrap Done',
    title: 'End-of-Day Recap',
    subtitle: 'Summarize completed events, flag pending items & preview tomorrow’s high-priority deadlines.',
  },
  {
    src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=900&q=80',
    alt: 'Weekly Digest & Planning',
    app: 'Linear & Notion',
    tag: 'Sprint Architecture',
    badge: 'Multi-App Sync',
    title: 'Weekly Digest & Planning',
    subtitle: 'Panoramic weekly summary of emails, key architectural decisions, meetings & open tasks.',
  },
  {
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    alt: 'Async Delegation & Status Updates',
    app: 'Slack / Teams',
    tag: 'Cross-Thread Synthesis',
    badge: 'Synthesis Complete',
    title: 'Async Delegation Updates',
    subtitle: 'Pull status across threads, identify blockers & draft comprehensive async team updates.',
  },
]

export function WorkflowsSection() {
  return (
    <section id="workflows" className="py-24 md:py-32 bg-[#FAF9F7] border-t border-[#E8E6E1]/80 relative overflow-hidden">
      {/* Subtle radial ambient background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full blur-3xl opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(123, 92, 240, 0.14) 0%, rgba(250, 249, 247, 0) 70%)',
        }}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E6E1] text-[#7B5CF0] text-[12px] font-mono tracking-wider uppercase mb-4 shadow-xs">
            <Zap size={13} />
            <span>Current Workflows NORVA Can Do</span>
          </div>

          <h2
            className="text-[34px] sm:text-[44px] md:text-[50px] font-medium text-[#17171C] tracking-tight leading-[1.12] mb-5"
            style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
          >
            Real workflows NORVA can do today.
          </h2>

          <p className="text-[17px] text-[#5A5A66] leading-relaxed max-w-[660px] mx-auto">
            NORVA isn't a conversational novelty in a browser tab. Here are 10 production-ready desktop workflows NORVA executes directly across your desktop apps without cloud relays.
          </p>
        </div>

        {/* 3D Coverflow Carousel — Pure, expansive unboxed slider with continuous autoplay */}
        <div className="w-full relative py-4">
          <CoverflowCarousel
            slides={WORKFLOW_SLIDES}
            autoPlay={true}
            autoPlayInterval={3000}
            rotate={36}
            depth={0.58}
            perspective={3.2}
            falloff={0.56}
            cardWidth="clamp(300px, 28vw, 420px)"
            gap={0.07}
            loop={true}
            showCaption={true}
            showPagination={true}
            showNavigation={true}
            className="w-full"
            cardClassName="shadow-2xl border border-white/80 ring-1 ring-black/5"
          />
        </div>
      </div>
    </section>
  )
}

export default WorkflowsSection
