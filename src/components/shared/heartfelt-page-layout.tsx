import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { HEARTFELT } from '@/components/shared/heartfelt-constants'
import { cn } from '@/lib/utils'

type HeartfeltPageLayoutProps = {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
  /** Slightly smaller hero (e.g. inner pages) */
  compact?: boolean
}

export function HeartfeltPageLayout({ eyebrow, title, description, actions, children, compact }: HeartfeltPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white" style={{ color: HEARTFELT.green }}>
      <NavbarShell />
      <div
        className={cn(
          'border-b border-[#0a1f0a]/10',
          'bg-gradient-to-b from-amber-50/40 to-white',
          compact ? 'py-10 sm:py-12' : 'py-12 sm:py-16',
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              {eyebrow ? (
                <p
                  className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500"
                >
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">{title}</h1>
              {description ? (
                <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">{description}</p>
              ) : null}
            </div>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </div>
      </div>
      <div className="h-1 w-full" style={{ backgroundColor: HEARTFELT.orange }} />
      <div
        className="w-full py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white sm:text-[11px]"
        style={{ backgroundColor: HEARTFELT.orange }}
      >
        Articles &middot; Profiles &middot; Community &middot; 2026
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">{children}</div>
      <Footer />
    </div>
  )
}
