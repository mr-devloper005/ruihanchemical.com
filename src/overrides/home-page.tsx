"use client";

import Link from 'next/link'
import { ArrowRight, Play, Star } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { Footer } from '@/components/shared/footer'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { SITE_CONFIG } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { Button } from '@/components/ui/button'

export const HOME_PAGE_OVERRIDE_ENABLED = true

export type HomePageOverrideProps = {
  articlePosts: SitePost[]
}

const green = '#0A1F0A'
const yellow = '#FFC107'
const orange = '#E64A19'

const heroBg = '/hero-bg.jpg'

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' && post?.content && Array.isArray((post.content as { images?: string[] }).images)
      ? (post.content as { images: string[] }).images.find((url) => typeof url === 'string' && url)
      : null
  const logo =
    typeof post?.content === 'object' && post?.content && typeof (post.content as { logo?: string }).logo === 'string'
      ? (post.content as { logo: string }).logo
      : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getProfileRole(post: SitePost) {
  const c = post.content as Record<string, unknown> | undefined
  if (c && typeof c === 'object') {
    if (typeof c.title === 'string' && c.title) return c.title
    if (typeof c.role === 'string' && c.role) return c.role
    if (typeof c.headline === 'string' && c.headline) return c.headline
  }
  return post.summary ? post.summary.slice(0, 64) : 'Contributor'
}

function getCategory(post: SitePost) {
  const c = post.content as Record<string, unknown> | undefined
  if (c && typeof c === 'object' && typeof c.category === 'string') return c.category
  if (Array.isArray(post.tags) && post.tags[0]) return String(post.tags[0])
  return 'Article'
}

export function HomePageOverride({ articlePosts }: HomePageOverrideProps) {
  const featuredArticles = articlePosts.slice(0, 3)
  const activityItems = articlePosts.slice(0, 4)
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
    },
  ]

  return (
    <div className="min-h-screen bg-white" style={{ color: green }}>
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      <main>
        <section
          className="relative min-h-[min(88vh,720px)] overflow-hidden"
          style={{ backgroundColor: green }}
        >
          <div className="absolute inset-0">
            <ContentImage
              src={heroBg}
              alt="Community hands together"
              fill
              className="object-cover opacity-45"
              priority
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(10,31,10,0.75) 0%, rgba(10,31,10,0.5) 100%)' }}
            />
          </div>
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:py-32">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Ideas &amp; people shaping {SITE_CONFIG.name}
            </h1>
            <p className="mt-4 text-2xl font-bold sm:text-3xl" style={{ color: yellow }}>
              Read stories.
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                className="h-12 rounded-2xl px-8 text-base font-semibold shadow-lg"
                style={{ backgroundColor: yellow, color: green }}
              >
                <Link href="/articles">Browse articles</Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="h-1 w-full" style={{ backgroundColor: orange }} />
        <div className="w-full py-2 text-center text-xs font-semibold uppercase tracking-[0.35em] text-white" style={{ backgroundColor: orange }}>
          Clarity &middot; Trust &middot; Community &middot; Research &middot; Connection
        </div>


        
        {articlePosts[0] ? (
          <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
              <ContentImage
                src={getPostImage(articlePosts[0])}
                alt={articlePosts[0].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-6">
                <Play className="h-10 w-10 text-white" />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">In their words</p>
              <h3 className="mt-2 text-2xl font-bold" style={{ color: green }}>
                {articlePosts[0].title}
              </h3>
              <p className="mt-2 text-sm text-neutral-500">Featured reader note</p>
              <p className="mt-4 text-base leading-8 text-neutral-600 line-clamp-4">
                {articlePosts[0].summary || 'A thoughtful take from our community — explore the full article to go deeper.'}
              </p>
              <div className="mt-4 flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {activityItems.length > 0 ? (
          <section className="border-t border-neutral-200 bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center text-3xl font-bold tracking-tight" style={{ color: green }}>
                Be the reason someone learns something new
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-center text-neutral-600">
                Quick picks from our latest articles.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {activityItems.map((post) => (
                  <div
                    key={post.id}
                    className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="relative aspect-video w-full">
                      <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="line-clamp-2 font-bold" style={{ color: green }}>
                        {post.title}
                      </h3>
                      <Button
                        asChild
                        className="mt-3 w-full rounded-xl text-xs font-bold"
                        style={{ backgroundColor: yellow, color: green }}
                      >
                        <Link href={`/articles/${post.slug}`}>
                          View more
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="border-t border-neutral-200 bg-neutral-50/50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-tight" style={{ color: green }}>
                  Explore our latest news and articles
                </h2>
                <p className="mt-2 max-w-2xl text-neutral-600">
                  Stories from the lab, the field, and our community — written for professionals and curious readers
                  alike.
                </p>
              </div>
              <Button
                asChild
                className="rounded-2xl px-6 font-semibold text-white shadow"
                style={{ backgroundColor: orange }}
              >
                <Link href="/articles">View all</Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featuredArticles.length
                ? featuredArticles.map((post) => {
                    const cat = getCategory(post)
                    return (
                      <Link
                        key={post.id}
                        href={`/articles/${post.slug}`}
                        className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_12px_32px_rgba(10,31,10,0.06)] transition hover:-translate-y-0.5"
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <ContentImage
                            src={getPostImage(post)}
                            alt={post.title}
                            fill
                            className="object-cover transition group-hover:scale-105"
                          />
                          <span
                            className="absolute left-3 top-3 rounded-lg px-3 py-1 text-xs font-bold shadow"
                            style={{ backgroundColor: yellow, color: green }}
                          >
                            {cat}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="text-lg font-bold leading-snug" style={{ color: green }}>
                            {post.title}
                          </h3>
                          <p className="mt-2 line-clamp-3 flex-1 text-sm text-neutral-600">
                            {post.summary || 'Open to read the full story on ' + SITE_CONFIG.name + '.'}
                          </p>
                          <span className="mt-4 text-sm font-bold" style={{ color: orange }}>
                            Read more
                          </span>
                        </div>
                      </Link>
                    )
                  })
                : [0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex min-h-[280px] flex-col justify-center rounded-3xl border border-dashed border-neutral-300 bg-white p-8 text-center text-sm text-neutral-500"
                    >
                      New articles from your organization will be listed here.
                    </div>
                  ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
