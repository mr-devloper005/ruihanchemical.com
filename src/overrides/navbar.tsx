'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, FileText, Menu, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { BrandLogo } from '@/components/shared/brand-logo'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const NavbarAuthControls = dynamic(
  () => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls),
  { ssr: false, loading: () => null }
)

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
  { name: 'Articles', href: '/articles' },
  { name: 'Contact', href: '/contact' },
] as const

export function NavbarOverride() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 gap-1 rounded-xl px-3.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-100/80 data-[state=open]:bg-neutral-100/80"
              >
                Resources
                <ChevronDown className="h-4 w-4 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={8}
              className="z-[100] min-w-[220px] border border-[#0a1f0a]/12 bg-white p-1 text-[#0A1F0A] shadow-lg"
            >
              {pageLinks.map((l) => (
                <DropdownMenuItem key={l.href} asChild className="cursor-pointer text-sm font-medium text-[#0A1F0A] focus:bg-neutral-100 focus:text-[#0A1F0A]">
                  <Link href={l.href}>{l.name}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild className="cursor-pointer text-sm font-medium text-[#0A1F0A] focus:bg-neutral-100 focus:text-[#0A1F0A]">
                <Link href="/articles">All articles</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <Button
              asChild
              className="hidden h-10 rounded-2xl px-5 text-sm font-bold text-white shadow-md sm:inline-flex"
              style={{ backgroundColor: orange }}
            >
              <Link href="/register">Get started</Link>
            </Button>
          ) : null}
          {isAuthenticated ? (
            <NavbarAuthControls />
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
                {item.name === 'Articles' ? <FileText className="h-4 w-4" /> : null}
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
        </div>
      )}
    </header>
  )
}
