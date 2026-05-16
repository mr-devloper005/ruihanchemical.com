'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Plus, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { BrandLogo } from '@/components/shared/brand-logo'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'

export const NAVBAR_OVERRIDE_ENABLED = true

const green = '#0A1F0A'
const yellow = '#FFC107'
const orange = '#E64A19'

const pageLinks = [
  { name: 'About the site', href: '/about' },
  { name: 'Help & support', href: '/help' },
  { name: 'Press', href: '/press' },
]

const mainLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
] as const

export function NavbarOverride() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-[#0a1f0a]/10 bg-white/95 shadow-[0_1px_0_rgba(10,31,10,0.04)] backdrop-blur-md"
      style={{ color: green }}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3">
          <BrandLogo />
          <div className="min-w-0">
            <span className="block truncate text-lg font-extrabold leading-tight tracking-tight sm:text-xl">{SITE_CONFIG.name}</span>
            <span className="hidden text-[9px] font-semibold uppercase tracking-[0.28em] text-neutral-500 sm:block">
              {siteContent.navbar.tagline}
            </span>
          </div>
        </Link>

        <div className="hidden items-center justify-center gap-0.5 lg:flex">
          {mainLinks.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors',
                  isActive ? 'text-white' : 'text-neutral-600 hover:text-[#0A1F0A] hover:bg-neutral-100/80'
                )}
                style={isActive ? { backgroundColor: green } : undefined}
              >
                {item.name}
              </Link>
            )
          })}

        
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button
                asChild
                className="hidden h-10 rounded-2xl px-5 text-sm font-bold sm:inline-flex"
                style={{ backgroundColor: yellow, color: green }}
              >
                <Link href="/create/article">
                  <Plus className="mr-1 h-4 w-4" />
                  Create Article
                </Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={logout}
                className="hidden h-10 rounded-2xl border-2 px-4 text-sm font-semibold sm:inline-flex"
                style={{ borderColor: green, color: green }}
              >
                <LogOut className="mr-1 h-4 w-4" />
                Sign out
              </Button>
            </>
          ) : (
            <Button
              asChild
              className="hidden h-10 rounded-2xl px-5 text-sm font-bold sm:inline-flex"
              style={{ backgroundColor: yellow, color: green }}
            >
              <Link href="/login">Sign in</Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 lg:hidden">
          {mainLinks.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn('flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold', isActive ? 'text-white' : 'text-[#0A1F0A]')}
                style={isActive ? { backgroundColor: green } : undefined}
              >
                {item.name}
              </Link>
            )
          })}
          {pageLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-2xl px-4 py-3 text-sm text-neutral-600"
            >
              {l.name}
            </Link>
          ))}
          <div className="mt-2 border-t border-neutral-200 pt-3">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  href="/create/article"
                  onClick={() => setOpen(false)}
                  className="flex items-center rounded-2xl px-4 py-3 text-sm font-semibold"
                  style={{ backgroundColor: yellow, color: green }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Article
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                  className="flex w-full items-center rounded-2xl border border-[#0a1f0a]/20 px-4 py-3 text-left text-sm font-semibold text-[#0A1F0A]"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center rounded-2xl px-4 py-3 text-sm font-semibold"
                style={{ backgroundColor: yellow, color: green }}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
