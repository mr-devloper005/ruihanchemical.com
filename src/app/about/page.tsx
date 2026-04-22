import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeartfeltPageLayout } from "@/components/shared/heartfelt-page-layout";
import { HEARTFELT } from "@/components/shared/heartfelt-constants";
import { SITE_CONFIG } from "@/lib/site-config";
import { CheckCircle2, Lightbulb, Target } from "lucide-react";
import { ContentImage } from "@/components/shared/content-image";

const { green, yellow, orange } = HEARTFELT;

const stats = [
  { value: "120+", label: "Published stories & updates" },
  { value: "45", label: "Active public profiles" },
  { value: "12", label: "Partner organizations" },
];

const pillars = [
  {
    title: "Rigorous, readable science",
    body: "We publish for specialists without hiding behind jargon. Every article is edited for clarity, attribution, and honesty about limits.",
    icon: Target,
  },
  {
    title: "People in the open",
    body: "Profiles are not résumé walls — they are invitations to collaborate. We highlight real roles, real work, and how to get in touch.",
    icon: Lightbulb,
  },
  {
    title: "Shared standards",
    body: "The same color system, typography, and section rhythm you see on the home page runs through About, so the brand always feels like one place.",
    icon: CheckCircle2,
  },
];

const milestones = [
  { year: "2019", text: "Launched a focused reading space for our research network." },
  { year: "2021", text: "Introduced public profiles to credit contributors and partners." },
  { year: "2024", text: "Unify articles and people under a single, calmer product surface." },
  { year: "Today", text: "Ongoing: grow the library, welcome guest authors, and keep the site easy to read." },
];

const leadership = [
  {
    name: "Dr. Elena Mora",
    role: "Editorial lead",
    blurb: "Oversees tone, review, and scientific accuracy for long-form work.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "James Park",
    role: "Head of community profiles",
    blurb: "Helps research teams and partners present themselves with clarity and warmth.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Amira Nasser",
    role: "Product & accessibility",
    blurb: "Keeps navigation, contrast, and mobile reading smooth for every visitor.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  },
];

export default function AboutPage() {
  return (
    <HeartfeltPageLayout
      eyebrow="Our story"
      title={`Why ${SITE_CONFIG.name} exists`}
      description="We are an articles-first platform with a people-first heart. The goal is simple: make serious work easier to read, share, and connect with the humans behind it."
      actions={
        <>
          <Button
            asChild
            className="h-11 rounded-2xl font-bold"
            style={{ backgroundColor: yellow, color: green }}
          >
            <Link href="/articles">Read articles</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-2xl border-2 font-semibold"
            style={{ borderColor: green, color: green }}
          >
            <Link href="/profile">See profiles</Link>
          </Button>
        </>
      }
    >
      <div className="space-y-16 sm:space-y-20">
        <section className="grid items-start gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-5 text-neutral-600">
            <h2 className="text-2xl font-bold text-[#0A1F0A] sm:text-3xl">Built for the long arc of a research brand</h2>
            <p>
              {SITE_CONFIG.name} lives at the corner of <strong>structured publishing</strong> and <strong>human
              connection</strong>. We do not run a generic social feed, a business directory, or a file library here —
              only articles that deserve attention, and profiles that make teams approachable.
            </p>
            <p>
              Whether you are a first-time reader or a returning partner, the experience should feel calm, confident,
              and a little more human than a typical corporate site. That is the bar we set when we design each section.
            </p>
            <ul className="space-y-3 text-sm sm:text-base">
              {["Plain-language summaries alongside technical depth.", "Credit lines and author profiles you can follow.", "Support channels when something breaks or is unclear."].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: yellow }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: green }} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-3xl shadow-xl lg:min-h-[320px]">
            <ContentImage
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80"
              alt="Colleagues collaborating in a light office"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A1F0A]/80 to-transparent p-6 text-white">
              <p className="text-sm font-bold uppercase tracking-wider">Inside our workflow</p>
              <p className="mt-1 text-sm text-white/90">Editorial review, then publication — the same process for news and for guest features.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[#0a1f0a]/10 bg-amber-50/40 p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-extrabold tabular-nums" style={{ color: green }}>
                {s.value}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-neutral-600">{s.label}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-extrabold" style={{ color: green }}>
            How we work
          </h2>
          <p className="mt-2 max-w-2xl text-neutral-600">
            Three ideas shape every feature we ship. They are also the lens we use when we add new content types later.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {pillars.map((p) => (
              <Card
                key={p.title}
                className="overflow-hidden rounded-2xl border-[#0a1f0a]/10 bg-white shadow-[0_12px_32px_rgba(10,31,10,0.06)]"
              >
                <CardContent className="p-6">
                  <div
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: yellow, color: green }}
                  >
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#0A1F0A]">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{p.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold" style={{ color: green }}>
              Milestones
            </h2>
            <ul className="mt-6 space-y-6 border-l-2 pl-6" style={{ borderColor: `${orange}55` }}>
              {milestones.map((m) => (
                <li key={m.text} className="relative">
                  <span
                    className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: yellow }}
                  />
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: orange }}>
                    {m.year}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{m.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-3xl p-8 text-white"
            style={{ backgroundColor: green }}
          >
            <h2 className="text-xl font-bold">Want to work with us?</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/90">
              We are always open to guest essays, research collaborations, and profile updates from verified partners.
              Tell us a bit about your idea — we will respond with next steps, not a ticket number.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-10 rounded-xl font-bold"
                style={{ backgroundColor: yellow, color: green }}
              >
                <Link href="/contact">Contact the team</Link>
              </Button>
              <Button
                asChild
                className="h-10 border border-white/30 bg-transparent text-white hover:bg-white/10"
                variant="outline"
              >
                <Link href="/help">View support</Link>
              </Button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-center text-2xl font-extrabold sm:text-3xl" style={{ color: green }}>
            A few faces behind the work
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-neutral-600">
            These roles keep our editorial and community standards high. The full list of public profiles is on the
            directory.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="overflow-hidden rounded-2xl border border-[#0a1f0a]/10 bg-white shadow-md transition hover:-translate-y-0.5"
              >
                <div className="relative aspect-[4/3] w-full">
                  <ContentImage src={person.image} alt={person.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="font-bold text-[#0A1F0A]">{person.name}</p>
                  <p className="text-sm font-medium" style={{ color: orange }}>{person.role}</p>
                  <p className="mt-2 text-sm text-neutral-600">{person.blurb}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button
              asChild
              className="h-12 rounded-2xl px-8 font-bold"
              style={{ backgroundColor: yellow, color: green }}
            >
              <Link href="/profile">Open team profiles</Link>
            </Button>
          </div>
        </section>
      </div>
    </HeartfeltPageLayout>
  );
}
