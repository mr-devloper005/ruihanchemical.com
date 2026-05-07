"use client";

import { useState } from "react";
import Link from "next/link";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { User, UserPlus, UserCheck } from "lucide-react";
import type { SitePost } from "@/lib/site-connector";

interface ProfileDetailClientProps {
  post: SitePost;
  suggestedArticles: SitePost[];
}

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
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

export function ProfileDetailClient({ 
  post, 
  suggestedArticles
}: ProfileDetailClientProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const category = content.category || "Profile";

  const handleFollowToggle = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call for follow/unfollow
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsFollowing(!isFollowing);
      
      // Here you would typically make an API call to follow/unfollow
      // For example:
      // await fetch(`/api/profiles/${post.slug}/follow`, {
      //   method: isFollowing ? 'DELETE' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      // });
      
    } catch (error) {
      console.error('Failed to toggle follow status:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-8">
          {/* Header with Follow Button */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1" />
            <button
              onClick={handleFollowToggle}
              disabled={isLoading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isFollowing
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : isFollowing ? (
                <UserCheck className="h-4 w-4" />
              ) : (
                <UserPlus className="h-4 w-4" />
              )}
              {isLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
          
          {/* Profile Info */}
          <div className="text-center">
            {/* Profile Picture */}
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                {logoUrl ? (
                  <ContentImage 
                    src={logoUrl} 
                    alt={`${brandName} profile picture`} 
                    fill 
                    sizes="128px"
                    quality={75}
                    className="object-cover"
                    intrinsicWidth={128}
                    intrinsicHeight={128}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-gray-500 bg-gray-100">
                    {brandName.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            
            {/* Name and Details */}
            <h1 className="mt-6 text-3xl font-bold text-gray-900">{brandName}</h1>
            <p className="mt-2 text-lg text-gray-600">{category}</p>
            
            {/* Description */}
            <div className="mt-6 max-w-2xl mx-auto">
              <article
                className="prose prose-slate text-base leading-relaxed prose-p:my-4 prose-a:text-primary prose-a:underline prose-strong:font-semibold"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            </div>
            
            {/* Website Button */}
            {website ? (
              <div className="mt-8">
                <Button asChild size="lg" className="px-7 text-base">
                  <Link href={website} target="_blank" rel="noopener noreferrer">
                    Visit Official Site
                  </Link>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Suggested Articles Section */}
      {suggestedArticles.length ? (
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Suggested articles</h2>
            <Link href="/articles" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {suggestedArticles.slice(0, 3).map((article) => (
              <TaskPostCard
                key={article.id}
                post={article}
                href={`/articles/${article.slug}`}
                compact
              />
            ))}
          </div>
          <nav className="mt-6 rounded-2xl border border-border bg-card/60 p-4">
            <p className="text-sm font-semibold text-foreground">Related links</p>
            <ul className="mt-2 space-y-2 text-sm">
              {suggestedArticles.slice(0, 3).map((article) => (
                <li key={`related-${article.id}`}>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/profile" className="text-primary underline-offset-4 hover:underline">
                  Browse all profiles
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      ) : null}
    </div>
  );
}
