'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { HEARTFELT } from '@/components/shared/heartfelt-constants'

const { green, yellow, orange } = HEARTFELT

const STORAGE_KEY = 'nexus-contact-messages'

export function HeartfeltContactForm() {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: 'Missing information', description: 'Please add your name, email, and a message.', variant: 'destructive' })
      return
    }
    try {
      const entry = { at: new Date().toISOString(), name, email, subject, message }
      const raw = window.localStorage.getItem(STORAGE_KEY) || '[]'
      const list = JSON.parse(raw) as typeof entry[]
      list.push(entry)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
      toast({
        title: 'Message saved locally',
        description: 'In production this would go to your team. On this device we store a copy in the browser for demo.',
      })
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch {
      toast({ title: 'Could not save', description: 'Please try again.', variant: 'destructive' })
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="c-name" className="text-[#0A1F0A]">Name</Label>
        <Input
          id="c-name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 rounded-xl border-[#0a1f0a]/15"
          placeholder="Your full name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="c-email" className="text-[#0A1F0A]">Email</Label>
        <Input
          id="c-email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 rounded-xl border-[#0a1f0a]/15"
          placeholder="you@organization.org"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="c-subj" className="text-[#0A1F0A]">Topic</Label>
        <Input
          id="c-subj"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="h-12 rounded-xl border-[#0a1f0a]/15"
          placeholder="Editorial, profile, access, other…"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="c-msg" className="text-[#0A1F0A]">Message</Label>
        <Textarea
          id="c-msg"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[160px] rounded-xl border-[#0a1f0a]/15"
          placeholder="Share the page you were on, what you need, and any deadlines."
        />
      </div>
      <Button
        type="submit"
        className="h-12 w-full rounded-2xl text-base font-bold"
        style={{ backgroundColor: yellow, color: green }}
      >
        Send message
      </Button>
      <p className="text-center text-xs text-neutral-500">
        Prefer email? You can also reach the team at{' '}
        <a className="font-semibold hover:underline" href="mailto:hello@example.com" style={{ color: orange }}>
          hello@example.com
        </a>
        .
      </p>
    </form>
  )
}
