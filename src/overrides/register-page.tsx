'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LogIn } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'
import { BrandLogo } from '@/components/shared/brand-logo'
import { cn } from '@/lib/utils'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

const green = '#0A1F0A'
const yellow = '#FFC107'
const orange = '#E64A19'

const SESSION_KEY = 'nexus-auth-session'

export function RegisterPageOverride() {
  const { signup, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agreed, setAgreed] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password) {
      toast({ title: 'Missing fields', description: 'Please add your name, email, and password.', variant: 'destructive' })
      return
    }
    if (password !== confirm) {
      toast({ title: 'Passwords do not match', description: 'Check the password fields and try again.', variant: 'destructive' })
      return
    }
    if (password.length < 8) {
      toast({ title: 'Password too short', description: 'Use at least 8 characters.', variant: 'destructive' })
      return
    }
    if (!agreed) {
      toast({ title: 'Terms', description: 'Please confirm you agree to the terms to continue.', variant: 'destructive' })
      return
    }
    try {
      await signup(name.trim(), email.trim(), password)
      if (typeof window !== 'undefined') {
        const session = { at: Date.now(), email: email.trim(), newAccount: true }
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      }
      toast({ title: 'Account created', description: 'You are signed in and your session is saved on this device.' })
      router.push('/')
    } catch {
      toast({ title: 'Sign up failed', description: 'Please try again in a moment.', variant: 'destructive' })
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
              'bg-gradient-to-br from-amber-50/80 to-white',
            )}
          >
            <div className="mb-5">
              <BrandLogo size="lg" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Create your account</h1>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              Join {SITE_CONFIG.name} to follow articles, build a public profile, and keep one login for the whole
              experience — same look and colors as the home page.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-neutral-600">
              {[
                'Save articles and revisit profiles in one place',
                'Get updates when we publish new stories that match your interests',
                'Optional public profile to show your work to partners',
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: orange }} />
                  {line}
                </li>
              ))}
            </ul>
            <div
              className="mt-8 rounded-2xl border border-[#0a1f0a]/10 p-4 text-sm text-neutral-600"
              style={{ backgroundColor: `${green}06` }}
            >
              <p className="font-semibold text-[#0A1F0A]">Tip</p>
              <p className="mt-1">Use a work email if your organization partners with us — it makes profile verification easier later.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-[0_16px_48px_rgba(0,0,0,0.06)] sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">New account</p>
            <h2 className="mt-2 text-2xl font-bold">Sign up in a minute</h2>
            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="reg-name">Full name</Label>
                <Input
                  id="reg-name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-xl border-neutral-200"
                  placeholder="Your name as it should appear"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input
                  id="reg-email"
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
                <Label htmlFor="reg-password">Password</Label>
                <Input
                  id="reg-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border-neutral-200"
                  placeholder="At least 8 characters"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-confirm">Confirm password</Label>
                <Input
                  id="reg-confirm"
                  name="confirm"
                  type="password"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="h-12 rounded-xl border-neutral-200"
                  placeholder="Repeat your password"
                />
              </div>
              <div className="flex items-start gap-3 pt-1">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(v) => setAgreed(!!v)}
                  className="mt-0.5 border-[#0a1f0a]/30"
                />
                <label htmlFor="terms" className="text-sm leading-snug text-neutral-600">
                  I agree to the{' '}
                  <Link href="/terms" className="font-semibold hover:underline" style={{ color: orange }}>
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="font-semibold hover:underline" style={{ color: orange }}>
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-2xl text-base font-bold"
                style={{ backgroundColor: yellow, color: green }}
              >
                {isLoading ? 'Creating account…' : 'Create account'}
              </Button>
            </form>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200/80 pt-6 text-sm text-neutral-600">
              <span>Already registered?</span>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 font-bold hover:underline"
                style={{ color: orange }}
              >
                <LogIn className="h-4 w-4" />
                Sign in
              </Link>
            </div>
            <p className="mt-4 text-center text-xs text-neutral-500">
              Need help?{' '}
              <Link className="font-medium hover:underline" href="/help" style={{ color: green }}>
                Visit the help center
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
