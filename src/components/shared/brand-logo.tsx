import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/site-config'

/** Public brand mark; keep in sync with `public/favicon.png`. */
export const BRAND_LOGO_SRC = '/favicon.png?v=20260422'

type BrandLogoProps = {
  className?: string
  /** Default 48px box */
  size?: 'md' | 'lg'
  /** Use on dark backgrounds (e.g. footer) */
  onDarkBackground?: boolean
}

export function BrandLogo({ className, size = 'md', onDarkBackground }: BrandLogoProps) {
  const box = size === 'lg' ? 'h-14 w-14 sm:h-16 sm:w-16' : 'h-12 w-12'
  return (
    <span
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl',
        onDarkBackground ? 'bg-white ring-1 ring-white/30' : 'bg-white ring-1 ring-[#0a1f0a]/12 shadow-sm',
        box,
        className,
      )}
    >
      <img
        src={BRAND_LOGO_SRC}
        alt={`${SITE_CONFIG.name} logo`}
        width={64}
        height={64}
        className="h-[85%] w-[85%] object-contain"
      />
    </span>
  )
}
