"use client";

import { ContentImage } from "@/components/shared/content-image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { ArticleComments } from "@/components/tasks/article-comments";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Clock, User, Tag, Share2, ArrowRight, BookOpen, TrendingUp, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SitePost } from "@/lib/site-connector";
import { useState } from "react";

interface ArticleDetailCardProps {
  post: SitePost;
  articleHtml: string;
  articleSummary: string;
  articleAuthor: string;
  articleDate: string;
  category: string;
  images: string[];
  postTags: string[];
  related: SitePost[];
  taskRoute: string;
}

export function ArticleDetailCard({
  post,
  articleHtml,
  articleSummary,
  articleAuthor,
  articleDate,
  category,
  images,
  postTags,
  related,
  taskRoute,
}: ArticleDetailCardProps) {
  const [copied, setCopied] = useState(false);

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = articleHtml.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  // Get current URL for sharing
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Share functions
  const handleTwitterShare = () => {
    const text = encodeURIComponent(post.title);
    const url = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href={taskRoute}
            className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to Articles
          </Link>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
            <Badge variant="secondary" className="inline-flex items-center gap-1.5 px-3 py-1">
              <Tag className="h-3.5 w-3.5" />
              {category}
            </Badge>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl tracking-tight">
            {post.title}
          </h1>

          {/* Author Info */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{articleAuthor}</p>
              <p className="text-sm text-muted-foreground">Author</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* Featured Image */}
            {images[0] && (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-lg">
                <ContentImage
                  src={images[0]}
                  alt={`${post.title} featured image`}
                  fill
                  className="object-cover"
                  intrinsicWidth={1600}
                  intrinsicHeight={900}
                />
              </div>
            )}

            {/* Summary */}
            {articleSummary && (
              <div className="rounded-2xl border border-border bg-muted/30 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Summary</h3>
                </div>
                <p className="text-base leading-7 text-muted-foreground">{articleSummary}</p>
              </div>
            )}

            {/* Tags */}
            {postTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {postTags.map((tag) => (
                  <Badge key={tag} variant="outline" className="px-3 py-1">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-slate max-w-none">
              <RichContent 
                html={articleHtml} 
                className="leading-8 prose-p:my-6 prose-h2:my-8 prose-h3:my-6 prose-ul:my-6 prose-ol:my-6 prose-blockquote:my-6 prose-pre:my-6"
              />
            </div>

            {/* Share Section */}
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Share this article</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleTwitterShare}>
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleLinkedInShare}>
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCopyLink}>
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Share2 className="mr-2 h-4 w-4" />
                          Copy Link
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <ArticleComments slug={post.slug} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Table of Contents Card */}
            <Card className="border-border sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Quick Navigation</h3>
                </div>
                <nav className="space-y-2 text-sm">
                  <Link href="#summary" className="block text-muted-foreground hover:text-foreground transition-colors">
                    Summary
                  </Link>
                  <Link href="#content" className="block text-muted-foreground hover:text-foreground transition-colors">
                    Full Article
                  </Link>
                  <Link href="#comments" className="block text-muted-foreground hover:text-foreground transition-colors">
                    Comments
                  </Link>
                </nav>
              </CardContent>
            </Card>

            {/* Author Card */}
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">About the Author</h3>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{articleAuthor}</p>
                    <p className="text-sm text-muted-foreground">Contributor</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Expert insights and analysis on topics related to {category.toLowerCase()}.
                </p>
              </CardContent>
            </Card>

            {/* Trending Articles */}
            {related.length > 0 && (
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Related Articles</h3>
                  </div>
                  <div className="space-y-4">
                    {related.slice(0, 3).map((item) => (
                      <Link
                        key={item.id}
                        href={`${taskRoute}/${item.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          {item.media && item.media[0]?.url && (
                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border">
                              <ContentImage
                                src={item.media[0].url}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="line-clamp-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                              {item.title}
                            </h4>
                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                              {item.summary}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {related.length > 3 && (
                    <Button variant="outline" className="w-full mt-4" asChild>
                      <Link href={taskRoute}>
                        View All Related
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Related Articles Section */}
        {related.length > 0 && (
          <section className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">More in {category}</h2>
                <p className="text-muted-foreground mt-1">Explore similar articles</p>
              </div>
              <Button variant="outline" asChild>
                <Link href={taskRoute}>
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard
                  key={item.id}
                  post={item}
                  href={`${taskRoute}/${item.slug}`}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
