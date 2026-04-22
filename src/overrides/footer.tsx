import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { BrandLogo } from '@/components/shared/brand-logo'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { FooterNewsletter } from '@/overrides/footer-newsletter'

export const FOOTER_OVERRIDE_ENABLED = true

const green = '#0A1F0A'
const yellow = '#FFC107'

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
] as const

const infoLinks = [
  { name: 'About us', href: '/about' },
  { name: 'Our articles', href: '/articles' },
  { name: 'Team profiles', href: '/profile' },
  { name: 'Support', href: '/help' },
  { name: 'Contact', href: '/contact' },
] as const

export function FooterOverride() {
  return (
    <footer className="text-white" style={{ backgroundColor: green }}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <BrandLogo onDarkBackground />
              <div>
                <p className="text-lg font-extrabold leading-tight">{SITE_CONFIG.name}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{siteContent.footer.tagline}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/80">{SITE_CONFIG.description}</p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white/90 transition hover:bg-white/15"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">Info</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/90">
              {infoLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:underline">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              <li>Questions welcome anytime.</li>
              <li>
                <a className="hover:underline" href="mailto:hello@example.com">
                  hello@example.com
                </a>
              </li>
              <li>
                <a className="hover:underline" href={`https://${SITE_CONFIG.domain}`} target="_blank" rel="noreferrer">
                  {SITE_CONFIG.domain}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold">Subscribe to updates</h3>
            <p className="mt-2 text-sm text-white/75">Occasional notes on new articles and community profiles.</p>
            <FooterNewsletter />
          </div>
        </div>
        <div className="mt-12 border-t border-white/15 pt-6 text-sm text-white/60">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
