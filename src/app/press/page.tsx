'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Download, Eye, Mail, Newspaper } from 'lucide-react'
import { HeartfeltPageLayout } from '@/components/shared/heartfelt-page-layout'
import { HEARTFELT } from '@/components/shared/heartfelt-constants'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'

const { green, yellow, orange } = HEARTFELT

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <HeartfeltPageLayout
      eyebrow="Media"
      title="Press & brand resources"
      description={`Journalists, partners, and event organizers use this page for approved ${SITE_CONFIG.name} assets and recent coverage. Everything matches our public site: forest green, sunflower yellow, and clear typography.`}
      actions={
        <>
          <Button
            asChild
            className="h-11 rounded-2xl font-bold"
            style={{ backgroundColor: yellow, color: green }}
          >
            <Link href="/contact">Contact communications</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-2xl border-2 font-semibold"
            style={{ borderColor: green, color: green }}
          >
            <Link href="/articles">Read our stories</Link>
          </Button>
        </>
      }
    >
      <div className="space-y-12 sm:space-y-16">
        <section
          className="flex flex-col gap-4 rounded-3xl border border-[#0a1f0a]/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          style={{ backgroundColor: `${green}08` }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: yellow, color: green }}
            >
              <Newspaper className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold sm:text-xl" style={{ color: green }}>
                Quick facts for editors
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
                {SITE_CONFIG.name} focuses on <strong>articles</strong> and <strong>public profiles</strong>. We do not
                pitch unrelated product categories in press materials — what you see here is what we stand behind.
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="outline"
            className="h-11 shrink-0 self-start rounded-2xl border-2 sm:self-center"
            style={{ borderColor: orange, color: orange }}
          >
            <Link href="mailto:press@example.com" className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" />
              press@example.com
            </Link>
          </Button>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Card className="overflow-hidden rounded-3xl border-[#0a1f0a]/10 bg-gradient-to-b from-amber-50/40 to-white shadow-[0_16px_48px_rgba(10,31,10,0.07)]">
            <CardContent className="space-y-5 p-6 sm:p-8">
              <div>
                <h2 className="text-xl font-extrabold sm:text-2xl" style={{ color: green }}>
                  Press kit
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
                  Logos, screenshots, and guideline PDFs for print and web. Preview before download; all files are
                  representative of the current brand system.
                </p>
              </div>
              <ul className="space-y-3">
                {mockPressAssets.map((asset) => (
                  <li
                    key={asset.id}
                    className="rounded-2xl border border-[#0a1f0a]/10 bg-white p-4 shadow-sm transition hover:border-[#0a1f0a]/20 sm:p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="min-w-0">
                        <p className="font-semibold text-[#0A1F0A]">{asset.title}</p>
                        <p className="mt-1 text-sm text-neutral-600">{asset.description}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          className="rounded-md border-0 font-bold"
                          style={{ backgroundColor: `${green}14`, color: green }}
                        >
                          {asset.fileType}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl border-2 font-semibold"
                          style={{ borderColor: green, color: green }}
                          onClick={() => setActiveAssetId(asset.id)}
                        >
                          <Eye className="mr-1.5 h-4 w-4" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          className="rounded-xl font-bold"
                          style={{ backgroundColor: yellow, color: green }}
                          onClick={() =>
                            toast({
                              title: 'Download started',
                              description: `${asset.title} is downloading.`,
                            })
                          }
                        >
                          <Download className="mr-1.5 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-extrabold sm:text-2xl" style={{ color: green }}>
              Recent coverage
            </h2>
            <p className="text-sm text-neutral-600">
              Highlights from outlets that have featured our work. Dates are illustrative for this demo build.
            </p>
            {mockPressCoverage.map((item) => (
              <Card
                key={item.id}
                className="rounded-2xl border-[#0a1f0a]/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardContent className="p-5 sm:p-6">
                  <div
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: orange }}
                  >
                    {item.outlet}
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-snug text-[#0A1F0A] sm:text-base">{item.headline}</p>
                  <p className="mt-3 text-xs font-medium text-neutral-500">{item.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl border-[#0a1f0a]/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold" style={{ color: green }}>
              {activeAsset?.title}
            </DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[#0a1f0a]/10 bg-neutral-100">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm leading-relaxed text-neutral-600">{activeAsset?.description}</p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" className="rounded-xl border-2 font-semibold" style={{ borderColor: green, color: green }} onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="rounded-xl font-bold"
              style={{ backgroundColor: yellow, color: green }}
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              <Download className="mr-2 h-4 w-4" />
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </HeartfeltPageLayout>
  )
}
