'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { BrandLogo } from '@/components/shared/brand-logo'
import { cn } from '@/lib/utils'

export const LOGIN_PAGE_OVERRIDE_ENABLED = true

const green = '#0A1F0A'
const yellow = '#FFC107'
const orange = '#E64A19'

const SESSION_KEY = 'nexus-auth-session'

export function LoginPageOverride() {
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast({ title: 'Missing fields', description: 'Please enter your email and password.', variant: 'destructive' })
      return
    }
    try {
      await login(email, password)
      if (typeof window !== 'undefined') {
        const session = { at: Date.now(), email: email.trim() }
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      }
      toast({ title: 'Signed in', description: 'Your session is saved on this device.' })
      router.push('/')
    } catch {
      toast({ title: 'Sign in failed', description: 'Please check your details and try again.', variant: 'destructive' })
    }
  }

  return (
    <div className="min-h-screen bg-white" style={{ color: green }}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div
            className={cn(
              'flex flex-col justify-center rounded-3xl border border-[#0a1f0a]/10 p-8 shadow-[0_20px_60px_rgba(10,31,10,0.08)]',
              'bg-gradient-to-br from-amber-50/80 to-white'
            )}
          >
            <div className="mb-5">
              <BrandLogo size="lg" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Welcome back</h1>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              Access your {SITE_CONFIG.name} workspace. Reading lists, article tools, and profile settings stay in sync
              when you are signed in.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-neutral-600">
              {['Save favorite articles and profiles', 'Contribute or edit when your role allows', 'One account for the whole site'].map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: orange }} />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-[0_16px_48px_rgba(0,0,0,0.06)] sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Account</p>
            <h2 className="mt-2 text-2xl font-bold">Sign in to continue</h2>
            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-neutral-200"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border-neutral-200"
                  placeholder="••••••••"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-2xl text-base font-bold"
                style={{ backgroundColor: yellow, color: green }}
              >
                {isLoading ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-sm text-neutral-600">
              <Link href="/forgot-password" className="font-medium hover:underline">
                Forgot password?
              </Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-bold hover:underline" style={{ color: orange }}>
                <Sparkles className="h-4 w-4" />
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
