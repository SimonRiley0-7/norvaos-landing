"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface NotificationItem {
  id: string | number
  app: string
  title: string
  message: string
  time: string
  icon: React.ReactNode
  color?: string
  unread?: boolean
  actionBadge?: string
}

interface NotificationStackProps {
  notifications: NotificationItem[]
  title?: string
  initialExpanded?: boolean
  className?: string
  onNotificationClick?: (item: NotificationItem) => void
}

export function NotificationStack({
  notifications: initialNotifications,
  title = "Notifications",
  initialExpanded = false,
  className = "",
  onNotificationClick,
}: NotificationStackProps) {
  const [isExpanded, setIsExpanded] = React.useState(initialExpanded)
  const [items, setItems] = React.useState(initialNotifications)

  React.useEffect(() => {
    setItems(initialNotifications)
  }, [initialNotifications])

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(false)
  }

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <div className={cn("w-full max-w-md mx-auto select-none", className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-2 px-1">
        <div className="flex items-center gap-2.5">
          <h3
            className="text-[15px] font-medium text-white tracking-tight"
            style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
          >
            {title}
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-white text-[11px] font-mono">
            {items.length} total
          </span>
        </div>

        <button
          type="button"
          onClick={toggleExpand}
          className="text-[12px] font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          {isExpanded ? "Collapse" : "Expand all"}
        </button>
      </div>

      {/* Notifications Area */}
      <div className="relative">
        <AnimatePresence initial={false} mode="wait">
          {isExpanded ? (
            /* EXPANDED LIST */
            <motion.div
              key="expanded-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2.5"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 28,
                    delay: index * 0.04,
                  }}
                  onClick={() => onNotificationClick?.(item)}
                  className="group relative cursor-pointer p-3.5 sm:p-4 rounded-2xl bg-[#161822]/90 hover:bg-[#1C1E2B]/95 backdrop-blur-2xl border border-white/15 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.35)] transition-all duration-200 hover:scale-[1.01]"
                >
                  <div className="flex items-start gap-3.5">
                    {/* App Icon Container */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white shadow-sm"
                      style={{ backgroundColor: item.color || "#3B82F6" }}
                    >
                      {item.icon}
                    </div>

                    {/* Notification Body */}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="font-mono text-[10.5px] uppercase tracking-wider text-white/60">
                          {item.app}
                        </span>
                        <span className="text-[11px] text-white/50 font-mono">
                          {item.time}
                        </span>
                      </div>

                      <h4
                        className="text-[14.5px] font-medium text-white tracking-tight truncate leading-snug"
                        style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                      >
                        {item.title}
                      </h4>

                      <p className="text-[12.5px] text-white/80 line-clamp-1 leading-snug mt-0.5 font-normal">
                        {item.message}
                      </p>

                      {item.actionBadge && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-[10.5px] font-mono text-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{item.actionBadge}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* COLLAPSED STACKED PILE */
            <motion.div
              key="collapsed-stack"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              onClick={toggleExpand}
              className="relative cursor-pointer group"
            >
              {/* Stacked Tier 3 (Bottom Peek) */}
              {items.length > 2 && (
                <div
                  className="absolute inset-x-4 h-full rounded-2xl bg-[#12141C]/80 border border-white/10 shadow-lg pointer-events-none transition-transform duration-300 group-hover:translate-y-3.5"
                  style={{
                    top: "12px",
                    transform: "scale(0.92)",
                    zIndex: 1,
                  }}
                />
              )}

              {/* Stacked Tier 2 (Middle Peek) */}
              {items.length > 1 && (
                <div
                  className="absolute inset-x-2 h-full rounded-2xl bg-[#161822]/85 border border-white/12 shadow-lg pointer-events-none transition-transform duration-300 group-hover:translate-y-2"
                  style={{
                    top: "6px",
                    transform: "scale(0.96)",
                    zIndex: 2,
                  }}
                />
              )}

              {/* Top Visible Card */}
              {items[0] && (
                <div
                  className="relative p-3.5 sm:p-4 rounded-2xl bg-[#1C1E2B]/95 backdrop-blur-2xl border border-white/20 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 group-hover:border-white/30"
                  style={{ zIndex: 3 }}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white shadow-sm"
                      style={{ backgroundColor: items[0].color || "#059669" }}
                    >
                      {items[0].icon}
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="font-mono text-[10.5px] uppercase tracking-wider text-white/60">
                          {items[0].app}
                        </span>
                        <span className="text-[11px] text-white/50 font-mono">
                          {items[0].time}
                        </span>
                      </div>

                      <h4
                        className="text-[14.5px] font-medium text-white tracking-tight truncate leading-snug"
                        style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                      >
                        {items[0].title}
                      </h4>

                      <p className="text-[12.5px] text-white/80 line-clamp-1 leading-snug mt-0.5 font-normal">
                        {items[0].message}
                      </p>

                      {items[0].actionBadge && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-[10.5px] font-mono text-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{items[0].actionBadge}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
export default NotificationStack

