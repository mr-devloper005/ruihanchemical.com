import Link from 'next/link'
import { HeartfeltPageLayout } from '@/components/shared/heartfelt-page-layout'
import { HEARTFELT } from '@/components/shared/heartfelt-constants'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { BookOpen, LifeBuoy, UserCircle, Mail, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

const { green, yellow, orange } = HEARTFELT

const quickTopics = [
  {
    title: 'Reading & articles',
    body: 'How article pages are organized, what metadata means, and how to recommend a story to a colleague.',
    icon: BookOpen,
  },
  {
    title: 'Profiles & identity',
    body: 'Update your public profile, change your headshot, and control what appears in the people directory.',
    icon: UserCircle,
  },
  {
    title: 'Account & sign-in',
    body: 'Sign in on a new device, sign out everywhere, and what we store in your browser for a smoother visit.',
    icon: LifeBuoy,
  },
  {
    title: 'Contacting us',
    body: 'Response times, what to include in a support message, and when to use contact instead of email.',
    icon: MessageCircle,
  },
]

const faqItems: { id: string; q: string; a: string }[] = [
  {
    id: 'faq-1',
    q: 'How do I suggest a topic for a future article?',
    a: 'Use the contact form and pick “Editorial” as the subject. Include a short summary, your angle, and whether you are open to co-authorship. We read every note and usually reply within a few business days.',
  },
  {
    id: 'faq-2',
    q: 'Can I update my public profile after it goes live?',
    a: 'Yes. Sign in, open your profile from the directory, and use the same editing tools you used when the page was first created. Large structural changes may need a quick review from our team.',
  },
  {
    id: 'faq-3',
    q: 'Where is my data stored when I sign in?',
    a: 'Session details that keep you signed in on this site may be kept in your browser (for example, local storage) in line with our privacy and cookie notices. We do not sell personal data.',
  },
  {
    id: 'faq-4',
    q: 'The site looks different — is that intentional?',
    a: 'Yes. We refresh the interface periodically while keeping the same deep green, yellow, and orange red accents so the whole site feels like one product. If something is hard to read, contact us and we will look at it.',
  },
  {
    id: 'faq-5',
    q: 'I need a faster answer. What should I do?',
    a: 'For urgent access issues, mention “urgent” in your subject line. For feature ideas, the community and press pages are better long-term homes than a rush ticket — but we still read everything.',
  },
  {
    id: 'faq-6',
    q: 'How do I report a mistake in an article?',
    a: 'Open the article, note the section or paragraph, and email us with the page URL. We take corrections seriously and will credit you if you would like to be named.',
  },
]

export default function HelpPage() {
  return (
    <HeartfeltPageLayout
      eyebrow="Support"
      title="Help center"
      description={`Get unstuck on ${SITE_CONFIG.name}: reading, profiles, and account basics — without digging through a dozen product menus.`}
      actions={
        <Button
          asChild
          className="h-11 rounded-2xl font-bold"
          style={{ backgroundColor: yellow, color: green }}
        >
          <Link href="/contact">Contact us</Link>
        </Button>
      }
    >
      <div className="space-y-14 sm:space-y-16">
        <section>
          <h2 className="text-xl font-extrabold sm:text-2xl" style={{ color: green }}>
            Browse by topic
          </h2>
          <p className="mt-2 text-sm text-neutral-600 sm:text-base">Pick the area closest to your question, then read the brief FAQ on the right.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {quickTopics.map((topic) => (
              <Card
                key={topic.title}
                className="rounded-2xl border-[#0a1f0a]/10 bg-amber-50/30 shadow-sm transition hover:shadow-md"
              >
                <CardContent className="flex gap-4 p-5 sm:p-6">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: yellow, color: green }}
                  >
                    <topic.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0A1F0A]">{topic.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{topic.body}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div
            className="overflow-hidden rounded-3xl p-6 text-white sm:p-8"
            style={{ backgroundColor: green }}
          >
            <Mail className="h-7 w-7" />
            <h2 className="mt-4 text-xl font-bold sm:text-2xl">Still stuck?</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/90">
              Send us the page you were on, what you expected to happen, and what you saw instead. A screenshot
              is always welcome. We route technical issues and editorial questions to different inboxes, so
              the right people answer you.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/90">
              <li>· Average first reply: 1–2 business days</li>
              <li>· Security reports: we prioritize same-day triage</li>
            </ul>
            <Button
              asChild
              className="mt-6 h-12 rounded-2xl font-bold"
              style={{ backgroundColor: yellow, color: green }}
            >
              <Link href="/contact">Open the contact form</Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-[#0a1f0a]/10 bg-white p-1 shadow-sm">
            <h2 className="px-4 pt-4 text-lg font-extrabold" style={{ color: green }}>
              Common questions
            </h2>
            <p className="px-4 pb-2 text-sm text-neutral-600">Tap to expand. Content is current for this site’s articles &amp; profiles product.</p>
            <Accordion type="single" collapsible className="w-full border-t border-neutral-200/80">
              {faqItems.map((f) => (
                <AccordionItem key={f.id} value={f.id} className="border-b border-neutral-200/80">
                  <AccordionTrigger className="px-4 py-3 text-left text-sm font-semibold text-[#0A1F0A] hover:no-underline sm:px-5 sm:py-4 sm:text-base">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm leading-relaxed text-neutral-600 sm:px-5">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="text-center">
          <p className="text-sm text-neutral-600">Looking for the legal side of things?</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold" style={{ color: orange }}>
            <Link className="hover:underline" href="/privacy">Privacy</Link>
            <span className="text-neutral-300">|</span>
            <Link className="hover:underline" href="/terms">Terms</Link>
            <span className="text-neutral-300">|</span>
            <Link className="hover:underline" href="/cookies">Cookies</Link>
          </div>
        </section>
      </div>
    </HeartfeltPageLayout>
  )
}
