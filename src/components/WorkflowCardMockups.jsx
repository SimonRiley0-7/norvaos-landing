import React from 'react'
import {
  Sun,
  Mail,
  Calendar,
  FileText,
  Video,
  CheckSquare,
  Table,
  Terminal,
  Kanban,
  MessageSquare,
  Sparkles,
  Check,
  Clock,
  ArrowRight,
  Shield,
  Zap,
} from 'lucide-react'

// Common Liquid Glass Card Frame
function GlassCardFrame({
  app,
  icon: Icon,
  accentColor = '#7B5CF0',
  gradient,
  statusPill,
  meta,
  children,
}) {
  return (
    <div
      className="relative w-full h-full p-4 sm:p-5 flex flex-col justify-between text-left select-none overflow-hidden"
      style={{
        background: gradient,
        backdropFilter: 'blur(30px) saturate(190%)',
        WebkitBackdropFilter: 'blur(30px) saturate(190%)',
      }}
    >
      {/* Specular Diagonal Glass Sheen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 65%)',
        }}
      />
      {/* Top Specular Edge Line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-30" />

      {/* Top macOS App Header with Traffic Lights */}
      <div className="relative z-20 flex items-center justify-between pb-3 border-b border-white/20">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-xs" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-xs" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-xs" />
          </div>
          <div
            className="ml-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-white/40 text-white font-mono text-[10.5px] font-medium shadow-xs"
            style={{
              background: 'rgba(255, 255, 255, 0.22)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <Icon size={11} className="text-white" />
            <span>{app}</span>
          </div>
        </div>

        {meta && (
          <span className="font-mono text-[10.5px] text-white/80 font-medium">
            {meta}
          </span>
        )}
      </div>

      {/* Main Workflow Content Mockup */}
      <div className="relative z-20 my-auto py-2">
        {children}
      </div>

      {/* Bottom Frosted Liquid Glass Pill (Widget Style) */}
      <div className="relative z-20 pt-2 border-t border-white/15 flex items-center justify-between">
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/50 text-white text-[11px] font-medium shadow-md"
          style={{
            background: 'rgba(255, 255, 255, 0.28)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="truncate">{statusPill}</span>
        </div>

        <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider">
          Air-Gapped
        </span>
      </div>
    </div>
  )
}

// 1. Morning Briefing
export function MorningBriefingMockup() {
  return (
    <GlassCardFrame
      app="macOS Daily Brief"
      icon={Sun}
      gradient="linear-gradient(155deg, rgba(14, 165, 233, 0.88) 0%, rgba(99, 102, 241, 0.82) 50%, rgba(15, 23, 42, 0.95) 100%)"
      statusPill="Daily Snapshot · 8:00 AM"
      meta="Nov 19 · 19°C"
    >
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <h4 className="text-white text-[20px] font-medium tracking-tight">
            Good morning, Alex
          </h4>
          <span className="font-mono text-xs text-white/80">8:00 AM</span>
        </div>

        <div className="space-y-1.5">
          <div className="p-2 rounded-xl bg-white/15 border border-white/25 flex items-center justify-between text-xs text-white">
            <span className="flex items-center gap-1.5 font-medium">
              <Mail size={12} className="text-[#38BDF8]" /> 3 VIP emails to review
            </span>
            <span className="font-mono text-[10px] text-white/70">Inbox Zero</span>
          </div>

          <div className="p-2 rounded-xl bg-white/15 border border-white/25 flex items-center justify-between text-xs text-white">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar size={12} className="text-[#A78BFA]" /> 10:30 AM · Design Sync
            </span>
            <span className="font-mono text-[10px] text-[#A7F3D0]">Dossier Ready</span>
          </div>

          <div className="p-2 rounded-xl bg-white/15 border border-white/25 flex items-center justify-between text-xs text-white">
            <span className="flex items-center gap-1.5 font-medium">
              <Zap size={12} className="text-[#FBBF24]" /> 0 System Blockers
            </span>
            <span className="font-mono text-[10px] text-white/70">Apple Silicon</span>
          </div>
        </div>
      </div>
    </GlassCardFrame>
  )
}

// 2. Quick Email Actions
export function QuickEmailMockup() {
  return (
    <GlassCardFrame
      app="Apple Mail"
      icon={Mail}
      gradient="linear-gradient(155deg, rgba(123, 92, 240, 0.90) 0%, rgba(168, 85, 247, 0.85) 50%, rgba(24, 18, 48, 0.95) 100%)"
      statusPill="AI Draft Generated · Press ↵"
      meta="Inbox (1 unread)"
    >
      <div className="space-y-2">
        <div className="p-2.5 rounded-xl bg-white/15 border border-white/25 text-left">
          <div className="flex items-center justify-between text-[11px] text-white/80 mb-0.5">
            <span className="font-semibold text-white">Sarah Chen</span>
            <span className="font-mono text-[10px]">10m ago</span>
          </div>
          <p className="text-[12px] text-white font-medium truncate">
            Subject: Review Metal kernel PR #142
          </p>
          <p className="text-[11px] text-white/70 line-clamp-1 mt-0.5">
            "Hey Alex, can you review the swift accessibility pipeline?"
          </p>
        </div>

        {/* NORVA Reply Box */}
        <div className="p-2.5 rounded-xl bg-white/25 border border-white/40 text-left shadow-xs">
          <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-[#A7F3D0] mb-1 font-semibold">
            <Sparkles size={11} /> NORVA Suggested Reply:
          </div>
          <p className="text-[11.5px] text-white font-normal leading-snug">
            "LGTM! Dispatches via native Swift at 2.4ms with 0.00 bytes cloud egress. Ready to merge."
          </p>
        </div>
      </div>
    </GlassCardFrame>
  )
}

// 3. Calendar & Scheduling
export function CalendarMockup() {
  return (
    <GlassCardFrame
      app="Calendar.app"
      icon={Calendar}
      gradient="linear-gradient(155deg, rgba(14, 165, 233, 0.90) 0%, rgba(56, 189, 248, 0.80) 50%, rgba(12, 32, 54, 0.95) 100%)"
      statusPill="Collision Resolved · Auto-Shifted"
      meta="Thursday, Nov 19"
    >
      <div className="space-y-2">
        <div className="p-2 rounded-xl bg-white/15 border border-red-400/50 flex items-center justify-between text-xs text-white">
          <div className="text-left">
            <span className="font-mono text-[10.5px] text-red-200 block">10:00 - 11:00 AM</span>
            <span className="font-medium line-through text-white/70">Architecture Sync (Overlap)</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-red-500/30 text-red-200">
            Conflict
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-white/25 border border-white/40 text-left">
          <div className="flex items-center justify-between text-xs text-white mb-0.5">
            <span className="font-mono text-[10.5px] text-[#A7F3D0]">02:00 - 03:00 PM (Resolved)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#10B981]/30 text-[#A7F3D0]">
              ✓ Shifted
            </span>
          </div>
          <p className="text-[12.5px] text-white font-medium">Architecture Sync</p>
          <p className="text-[10.5px] text-white/75 mt-0.5">All 4 attendees accepted new slot</p>
        </div>
      </div>
    </GlassCardFrame>
  )
}

// 4. Document Summarization
export function DocumentSummarizationMockup() {
  return (
    <GlassCardFrame
      app="Finder / Preview"
      icon={FileText}
      gradient="linear-gradient(155deg, rgba(139, 92, 246, 0.90) 0%, rgba(99, 102, 241, 0.82) 50%, rgba(26, 18, 54, 0.95) 100%)"
      statusPill="Verifiable Citation Page 14"
      meta="Q3_Audit.pdf · 48 pgs"
    >
      <div className="space-y-2 text-left">
        <div className="p-2 rounded-xl bg-white/15 border border-white/25 flex items-center gap-2 text-white">
          <div className="w-7 h-7 rounded-lg bg-red-500/40 flex items-center justify-center font-bold text-xs text-white">
            PDF
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-medium text-white truncate">Q3_Security_Audit.pdf</p>
            <p className="text-[10.5px] text-white/75">Indexed in 18ms · 48 pages</p>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-white/25 border border-white/40">
          <p className="text-[10.5px] font-mono uppercase text-[#A7F3D0] font-semibold mb-1">
            ✓ Extracted Key Takeaway:
          </p>
          <p className="text-[11.5px] text-white leading-snug">
            "0.00 bytes cloud telemetry observed. Complete air-gapped cryptographic boundary preserved."
          </p>
          <span className="inline-block mt-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/25 text-white/80">
            Citation: Page 14, § 2.4
          </span>
        </div>
      </div>
    </GlassCardFrame>
  )
}

// 5. Meeting Prep Dossier
export function MeetingPrepMockup() {
  return (
    <GlassCardFrame
      app="FaceTime / Zoom"
      icon={Video}
      gradient="linear-gradient(155deg, rgba(6, 182, 212, 0.90) 0%, rgba(14, 165, 233, 0.82) 50%, rgba(8, 28, 48, 0.95) 100%)"
      statusPill="10m Pre-Flight Radar Ready"
      meta="Starts in 8 mins"
    >
      <div className="space-y-2 text-left">
        <div className="flex items-center justify-between text-white">
          <span className="text-[14px] font-medium">Sprint 42 Review</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/20">3 Attendees</span>
        </div>

        <div className="p-2.5 rounded-xl bg-white/20 border border-white/30 space-y-1.5 text-xs text-white">
          <p className="text-[10.5px] font-mono text-cyan-200 font-semibold uppercase">
            Auto-Generated Dossier:
          </p>
          <div className="flex items-center gap-1.5 text-[11.5px]">
            <Check size={12} className="text-[#10B981]" /> Last sync: Metal kernel PR approved
          </div>
          <div className="flex items-center gap-1.5 text-[11.5px]">
            <Check size={12} className="text-[#10B981]" /> Zero blockers logged in Jira
          </div>
          <div className="flex items-center gap-1.5 text-[11.5px]">
            <Clock size={12} className="text-[#FBBF24]" /> 1 pending question on rollback
          </div>
        </div>
      </div>
    </GlassCardFrame>
  )
}

// 6. Task & Reminder Engine
export function TaskReminderMockup() {
  return (
    <GlassCardFrame
      app="Reminders.app"
      icon={CheckSquare}
      gradient="linear-gradient(155deg, rgba(16, 185, 129, 0.90) 0%, rgba(52, 211, 153, 0.80) 50%, rgba(8, 36, 26, 0.95) 100%)"
      statusPill="Synced with macOS EventKit"
      meta="Today's Priorities"
    >
      <div className="space-y-1.5 text-left text-xs text-white">
        <div className="p-2 rounded-xl bg-white/20 border border-white/30 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center text-white text-[10px] font-bold">
            ✓
          </div>
          <span className="line-through text-white/70">File 14 client invoices to ~/Documents</span>
        </div>

        <div className="p-2 rounded-xl bg-white/20 border border-white/30 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center text-white text-[10px] font-bold">
            ✓
          </div>
          <span className="line-through text-white/70">Archive messy desktop screenshots</span>
        </div>

        <div className="p-2 rounded-xl bg-white/30 border border-white/45 flex items-center gap-2 font-medium">
          <div className="w-4 h-4 rounded-full border-2 border-white/80" />
          <span>Send async engineering sync recap</span>
        </div>
      </div>
    </GlassCardFrame>
  )
}

// 7. Excel & Spreadsheet Insights
export function ExcelInsightsMockup() {
  return (
    <GlassCardFrame
      app="Numbers & Excel"
      icon={Table}
      gradient="linear-gradient(155deg, rgba(20, 184, 166, 0.90) 0%, rgba(14, 165, 233, 0.80) 50%, rgba(10, 32, 40, 0.95) 100%)"
      statusPill="Formula DAG · 0 Errors"
      meta="Q3_P&L.xlsx"
    >
      <div className="space-y-2 text-left">
        <div className="rounded-xl overflow-hidden border border-white/30 text-[11px] text-white">
          <div className="grid grid-cols-3 bg-white/25 p-1.5 font-mono text-[10px] text-teal-100 font-semibold border-b border-white/20">
            <span>Category</span>
            <span>Forecast</span>
            <span className="text-right">Actual</span>
          </div>
          <div className="grid grid-cols-3 bg-white/10 p-1.5">
            <span>Compute</span>
            <span>$12,400</span>
            <span className="text-right text-[#A7F3D0]">$8,200</span>
          </div>
          <div className="grid grid-cols-3 bg-white/15 p-1.5">
            <span>Licensing</span>
            <span>$34,000</span>
            <span className="text-right text-[#A7F3D0]">$31,500</span>
          </div>
        </div>

        <div className="p-2 rounded-xl bg-white/25 border border-white/40 flex items-center justify-between text-xs text-white">
          <span className="font-mono text-[10.5px] text-cyan-200">=SUM(B2:B3)</span>
          <span className="font-mono font-bold text-[#A7F3D0]">$39,700</span>
        </div>
      </div>
    </GlassCardFrame>
  )
}

// 8. End-of-Day Recap
export function EndOfDayRecapMockup() {
  return (
    <GlassCardFrame
      app="Terminal / System"
      icon={Terminal}
      gradient="linear-gradient(155deg, rgba(244, 63, 94, 0.88) 0%, rgba(168, 85, 247, 0.80) 50%, rgba(32, 14, 30, 0.95) 100%)"
      statusPill="6:00 PM Wrap Complete"
      meta="Desktop Clean"
    >
      <div className="space-y-1.5 font-mono text-left text-[11px] text-[#E4E4E7]">
        <div className="p-2.5 rounded-xl bg-black/40 border border-white/20 space-y-1">
          <p className="text-[#A7F3D0]">norva --wrap-day --verify</p>
          <p className="text-white/80">✓ 28 files categorized to ~/Clients/</p>
          <p className="text-white/80">✓ 3 follow-ups auto-drafted in Mail</p>
          <p className="text-white/80">✓ 0 uncommitted workspace files</p>
          <p className="text-[#FBBF24]">Egress: 0.00 Bytes sent off-device</p>
        </div>
      </div>
    </GlassCardFrame>
  )
}

// 9. Weekly Digest & Planning
export function WeeklyDigestMockup() {
  return (
    <GlassCardFrame
      app="Linear & Notion"
      icon={Kanban}
      gradient="linear-gradient(155deg, rgba(99, 102, 241, 0.90) 0%, rgba(139, 92, 246, 0.80) 50%, rgba(22, 18, 48, 0.95) 100%)"
      statusPill="Multi-App Workspace Synced"
      meta="Sprint 18"
    >
      <div className="space-y-2 text-left">
        <div className="flex items-center justify-between text-white text-xs">
          <span className="font-medium">Sprint Velocity</span>
          <span className="font-mono text-[#A7F3D0]">88% Complete</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#38BDF8] to-[#A7F3D0] w-[88%]" />
        </div>

        <div className="space-y-1 text-xs">
          <div className="p-1.5 rounded-lg bg-white/15 border border-white/25 flex items-center justify-between text-white">
            <span className="truncate">Metal kernel benchmark</span>
            <span className="font-mono text-[10px] text-[#A7F3D0]">Done</span>
          </div>
          <div className="p-1.5 rounded-lg bg-white/15 border border-white/25 flex items-center justify-between text-white">
            <span className="truncate">Neural tokenization 18ms</span>
            <span className="font-mono text-[10px] text-cyan-200">Review</span>
          </div>
        </div>
      </div>
    </GlassCardFrame>
  )
}

// 10. Async Delegation Updates
export function AsyncDelegationMockup() {
  return (
    <GlassCardFrame
      app="Slack / Teams"
      icon={MessageSquare}
      gradient="linear-gradient(155deg, rgba(168, 85, 247, 0.90) 0%, rgba(56, 189, 248, 0.80) 50%, rgba(24, 18, 46, 0.95) 100%)"
      statusPill="Drafted from Active Commits"
      meta="#engineering-sync"
    >
      <div className="p-2.5 rounded-xl bg-white/20 border border-white/30 text-left space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-white">
          <span className="font-semibold">NORVA Bot · Async Update</span>
          <span className="font-mono text-[10px] text-white/70">Just now</span>
        </div>
        <p className="text-[11.5px] text-white leading-snug">
          "All 4 pipeline stages verified in sandbox. Metal dispatch locked at 2.4ms with 0.00 bytes cloud egress."
        </p>
        <div className="flex items-center gap-1.5 pt-0.5">
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] text-white">
            🚀 6
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] text-white">
            ⚡ 9
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] text-white">
            👏 4
          </span>
        </div>
      </div>
    </GlassCardFrame>
  )
}

