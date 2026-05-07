import { ContentImage } from '@/components/shared/content-image'
import Link from 'next/link'
import { User, Users, MessageCircle, Tag, UserPlus, LogIn, UserCheck } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const stripHtml = (value?: string | null) =>
  (value || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

const getContent = (post: SitePost) => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as Record<string, unknown>
}

const getImageUrl = (post: SitePost, content: Record<string, unknown>) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media[0]?.url
  if (mediaUrl) return mediaUrl

  const contentImage = typeof content.image === 'string' ? content.image : null
  if (contentImage) return contentImage

  const contentImages = Array.isArray(content.images) ? content.images : []
  const firstImage = contentImages.find((value) => typeof value === 'string')
  if (firstImage) return firstImage as string

  const contentLogo = typeof content.logo === 'string' ? content.logo : null
  if (contentLogo) return contentLogo

  return '/placeholder.svg?height=640&width=960'
}

interface ProfileDetailCardProps {
  post: SitePost
  href: string
}

export function ProfileDetailCard({ post, href }: ProfileDetailCardProps) {
  const content = getContent(post)
  const image = getImageUrl(post, content)
  const rawCategory = content.category || post.tags?.[0] || 'Profile'
  const normalizedCategory = normalizeCategory(rawCategory)
  const category = CATEGORY_OPTIONS.find((item) => item.slug === normalizedCategory)?.name || rawCategory
  
  // Mock data for demonstration - in real implementation, this would come from the post content or API
  const profileStats = {
    postsPublished: 0,
    commentsWritten: 1,
    tagsFollowed: 0
  }
  
  const joinDate = typeof content.joinDate === 'string' ? content.joinDate : 'Jan 31, 2025'
  const hasBadge = typeof content.hasBadge === 'boolean' ? content.hasBadge : true

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_280px] gap-6 items-start">
        
        {/* Left Section - Badges and Stats */}
        <div className="space-y-6">
          {/* Badges Section */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 border-4 border-green-200">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-700">Badges</p>
          </div>
          
          {/* Statistics Section */}
          <div className="space-y-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{profileStats.postsPublished}</p>
              <p className="text-sm text-gray-600">posts published</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{profileStats.commentsWritten}</p>
              <p className="text-sm text-gray-600">comment written</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{profileStats.tagsFollowed}</p>
              <p className="text-sm text-gray-600">tags followed</p>
            </div>
          </div>
        </div>

        {/* Center Section - Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-8">
            {/* Header with Follow Button */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1" />
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <UserPlus className="h-4 w-4" />
                Follow
              </button>
            </div>
            
            {/* Profile Info */}
            <div className="text-center">
              {/* Profile Picture with Name Overlay */}
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <ContentImage 
                    src={image || ''} 
                    alt={`${post.title} profile picture`} 
                    fill 
                    sizes="128px"
                    quality={75}
                    className="object-cover"
                    intrinsicWidth={128}
                    intrinsicHeight={128}
                  />
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.title.toLowerCase()}
                </div>
              </div>
              
              {/* Name and Details */}
              <h1 className="mt-6 text-3xl font-bold text-gray-900">{post.title}</h1>
              <p className="mt-2 text-lg text-gray-600">{category}</p>
              <p className="mt-1 text-sm text-gray-500">Joined on {joinDate}</p>
            </div>
          </div>
        </div>

        {/* Right Section - Connect Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            
            {/* Message */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Want to connect with {post.title}?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Create Account or Sign in if you already have an account
            </p>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <Link 
                href="/signup" 
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <UserCheck className="h-4 w-4" />
                Create Account
              </Link>
              <Link 
                href="/signin" 
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
