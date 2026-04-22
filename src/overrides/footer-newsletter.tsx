'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

const green = '#0A1F0A'
const yellow = '#FFC107'

export function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    try {
      const raw = window.localStorage.getItem('nexus-newsletter-subscribers') || '[]'
      const list = JSON.parse(raw) as string[]
      if (!list.includes(email)) list.push(email)
      window.localStorage.setItem('nexus-newsletter-subscribers', JSON.stringify(list))
      toast({ title: 'You are subscribed', description: 'We saved your email on this device.' })
      setEmail('')
    } catch {
      toast({ title: 'Could not save', description: 'Please try again.', variant: 'destructive' })
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 flex max-w-sm flex-col gap-2 sm:flex-row">
      <Input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="h-11 rounded-xl border-0 bg-white pl-3 text-sm text-slate-900"
      />
      <Button
        type="submit"
        className="h-11 shrink-0 rounded-xl font-bold"
        style={{ backgroundColor: yellow, color: green }}
      >
        Submit
      </Button>
    </form>
  )
}
