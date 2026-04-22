import Link from 'next/link'
import { ArrowRight, FileText, User } from 'lucide-react'
import { Footer } from '@/components/shared/footer'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { fetchTaskPosts } from '@/lib/task-data'
import { HEARTFELT } from '@/components/shared/heartfelt-constants'
import { getTaskConfig, type TaskKey, SITE_CONFIG } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { Button } from '@/components/ui/button'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

const { green, yellow, orange } = HEARTFELT

export async function TaskListPageOverride({ task, category }: { task: TaskKey; category?: string }) {
  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))

  const isArticle = task === 'article'
  const isProfile = task === 'profile'
  const Icon = isArticle ? FileText : User
  const heading =
    isArticle
      ? 'Articles & long-form stories'
      : isProfile
        ? 'People & public profiles'
        : taskConfig?.label || 'Latest posts'
  const sub = isArticle
    ? 'Research notes, updates, and explainers from our community — same calm layout as the home page, built for reading.'
    : isProfile
      ? 'Discover the researchers, communicators, and partners behind the work. Each profile is a front door to collaboration.'
      : taskConfig?.description || 'Browse the latest on this site.'

  return (
    <div className="min-h-screen bg-white" style={{ color: green }}>
      <NavbarShell />
      <div className="border-b border-[#0a1f0a]/8 bg-gradient-to-b from-amber-50/50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-neutral-500">
                {taskConfig?.label || task}
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {heading}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">{sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="h-11 rounded-2xl px-6 text-sm font-bold"
                  style={{ backgroundColor: yellow, color: green }}
                >
                  <Link href={isProfile ? '/about' : isArticle ? '/about' : '/help'}>Learn more</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-2xl border-2 border-[#0a1f0a]/20 bg-white px-6 text-sm font-semibold"
                >
                  <Link
                    href={
                      isProfile ? '/articles' : isArticle ? '/profile' : taskConfig?.route || '/'
                    }
                  >
                    {isProfile ? 'Read articles' : isArticle ? 'View profiles' : 'Browse'}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div
              className="relative overflow-hidden rounded-3xl p-6 shadow-[0_20px_50px_rgba(10,31,10,0.1)] sm:p-8"
              style={{ backgroundColor: green, color: 'white' }}
            >
              <Icon className="h-8 w-8 opacity-90" />
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Filter by topic</p>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                Narrow the list with categories. Your selection updates the feed below.
              </p>
              <form className="mt-6 space-y-3" action={taskConfig?.route || '#'}>
                <label className="sr-only" htmlFor="cat">
                  Category
                </label>
                <select
                  id="cat"
                  name="category"
                  defaultValue={normalizedCategory}
                  className="h-12 w-full rounded-2xl border-0 bg-white/95 px-4 text-sm text-[#0A1F0A] shadow-inner"
                >
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <Button
                  type="submit"
                  className="h-12 w-full rounded-2xl text-sm font-bold"
                  style={{ backgroundColor: yellow, color: green }}
                >
                  Apply filters
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full" style={{ backgroundColor: orange }} />
      <SchemaJsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${taskConfig?.label || 'Posts'} | ${SITE_CONFIG.name}`,
          url: `${baseUrl}${taskConfig?.route || ''}`,
          hasPart: schemaItems,
        }}
      />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section
          className="mb-10 flex flex-col gap-4 border-b border-neutral-200/80 pb-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="text-lg font-bold sm:text-xl" style={{ color: green }}>
              {isArticle ? 'Latest from the newsroom' : isProfile ? 'Featured people' : (taskConfig?.label ?? 'All posts')}
            </h2>
            <p className="mt-1 text-sm text-neutral-600">Updated as new posts are published to the site.</p>
          </div>
        </section>
        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}
