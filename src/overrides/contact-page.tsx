import Link from 'next/link'
import { Clock, Mail, MapPin, Phone, Sparkles, FileText, User } from 'lucide-react'
import { HeartfeltPageLayout } from '@/components/shared/heartfelt-page-layout'
import { HEARTFELT } from '@/components/shared/heartfelt-constants'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { HeartfeltContactForm } from '@/components/shared/heartfelt-contact-form'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const { green, yellow, orange } = HEARTFELT

const routes = [
  {
    title: 'Editorial & stories',
    body: 'Pitch an article, request a correction, or ask about our review calendar for long-form work.',
    icon: FileText,
  },
  {
    title: 'Profiles & people',
    body: 'Request a new profile, update a headshot, or flag outdated information in the directory.',
    icon: User,
  },
  {
    title: 'Partners & press',
    body: 'Licensing, speaking, and co-marketing for organizations that work with our community.',
    icon: Sparkles,
  },
] as const

export function ContactPageOverride() {
  return (
    <HeartfeltPageLayout
      eyebrow="Contact"
      title="Let’s start a clear conversation"
      description={`Whether you are a reader, a contributor, or a partner, this page routes your note to the right people at ${SITE_CONFIG.name} — with the same warm palette and typography as the rest of the site.`}
      actions={
        <Button
          asChild
          className="h-11 rounded-2xl font-bold"
          style={{ backgroundColor: yellow, color: green }}
        >
          <Link href="/help">Help center</Link>
        </Button>
      }
    >
      <div className="space-y-12 sm:space-y-16">
        <div className="grid gap-5 sm:grid-cols-3">
          {routes.map((r) => (
            <Card
              key={r.title}
              className="rounded-2xl border-[#0a1f0a]/10 bg-white shadow-[0_8px_28px_rgba(10,31,10,0.07)]"
            >
              <CardContent className="p-5 sm:p-6">
                <div
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: yellow, color: green }}
                >
                  <r.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-base font-bold text-[#0A1F0A] sm:text-lg">{r.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{r.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold sm:text-2xl" style={{ color: green }}>
              Direct lines
            </h2>
            <p className="text-sm text-neutral-600 sm:text-base">
              We are a small team — if you are not sure who to message, use the form and we will triage for you.
            </p>
            <ul className="space-y-3 text-sm text-neutral-700">
              <li className="flex items-start gap-3 rounded-2xl border border-[#0a1f0a]/8 bg-amber-50/40 p-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0" style={{ color: orange }} />
                <div>
                  <p className="font-semibold text-[#0A1F0A]">Editorial</p>
                  <a className="text-sm hover:underline" href="mailto:editorial@example.com" style={{ color: green }}>
                    editorial@example.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-[#0a1f0a]/8 bg-amber-50/40 p-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0" style={{ color: orange }} />
                <div>
                  <p className="font-semibold text-[#0A1F0A]">Phone</p>
                  <a className="text-sm tabular-nums hover:underline" href="tel:+1-000-000-0000" style={{ color: green }}>
                    +1 (000) 000-0000
                  </a>
                  <p className="mt-1 text-xs text-neutral-500">Weekdays, 9:00 – 18:00 local</p>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-[#0a1f0a]/8 bg-amber-50/40 p-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0" style={{ color: orange }} />
                <div>
                  <p className="font-semibold text-[#0A1F0A]">Studio</p>
                  <p className="text-sm">Remote-first team · in-person visits by appointment</p>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-[#0a1f0a]/8 p-4" style={{ backgroundColor: `${green}08` }}>
                <Clock className="mt-0.5 h-5 w-5 shrink-0" style={{ color: orange }} />
                <div>
                  <p className="font-semibold text-[#0A1F0A]">Replies</p>
                  <p className="text-sm text-neutral-600">We aim to acknowledge every message within two business days.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-[#0a1f0a]/10 bg-white p-6 shadow-[0_24px_64px_rgba(10,31,10,0.08)] sm:p-8">
            <h2 className="text-lg font-extrabold sm:text-xl" style={{ color: green }}>
              Send a message
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Include the URL of the article or profile you are talking about — it saves us a round of questions.
            </p>
            <div className="mt-6">
              <HeartfeltContactForm />
            </div>
          </div>
        </div>
      </div>
    </HeartfeltPageLayout>
  )
}
