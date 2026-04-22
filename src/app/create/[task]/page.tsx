"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Save, Sparkles } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { HeartfeltPageLayout } from "@/components/shared/heartfelt-page-layout";
import { HEARTFELT } from "@/components/shared/heartfelt-constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import { CATEGORY_OPTIONS } from "@/lib/categories";
import { SITE_CONFIG, type TaskKey } from "@/lib/site-config";
import { addLocalPost } from "@/lib/local-posts";

type Field = {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "url"
    | "number"
    | "tags"
    | "images"
    | "highlights"
    | "category"
    | "file";
  placeholder?: string;
  required?: boolean;
};

const FORM_CONFIG: Record<TaskKey, { title: string; description: string; fields: Field[] }> = {
  listing: {
    title: "Create Business Listing",
    description: "Add a local-only listing with business details.",
    fields: [
      { key: "title", label: "Listing title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Full description", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "logo", label: "Logo URL", type: "url" },
      { key: "images", label: "Gallery images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  classified: {
    title: "Create Classified",
    description: "Add a local-only classified ad.",
    fields: [
      { key: "title", label: "Ad title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Ad details", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "images", label: "Images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  article: {
    title: "Publish a new article",
    description:
      "Draft a story for your readers. Content saves locally in your browser until you wire a real backend — same forest green and sunflower palette as the rest of the site.",
    fields: [
      { key: "title", label: "Article title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Article content (HTML allowed)", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  image: {
    title: "Create Image Share",
    description: "Share image-only content locally.",
    fields: [
      { key: "title", label: "Image title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Caption", type: "textarea" },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images", required: true },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  profile: {
    title: "Add a public profile",
    description:
      "Introduce a person or team on the profiles directory. Fields are tuned for clarity and trust — logos and links render on the profile surface after you save.",
    fields: [
      { key: "brandName", label: "Brand name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the brand", type: "textarea" },
      { key: "website", label: "Website URL", type: "url", required: true },
      { key: "logo", label: "Logo URL", type: "url", required: true },
    ],
  },
  social: {
    title: "Create Social Post",
    description: "Publish a local-only social update.",
    fields: [
      { key: "title", label: "Post title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Post content", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  sbm: {
    title: "Create Bookmark",
    description: "Submit a local-only social bookmark.",
    fields: [
      { key: "title", label: "Bookmark title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Why it’s useful", type: "textarea" },
      { key: "website", label: "Target URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  pdf: {
    title: "Create PDF Entry",
    description: "Add a local-only PDF resource.",
    fields: [
      { key: "title", label: "PDF title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "fileUrl", label: "PDF file URL", type: "file", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover image", type: "images" },
    ],
  },
  org: {
    title: "Create Organization",
    description: "Create a local-only organization profile.",
    fields: [
      { key: "brandName", label: "Organization name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the organization", type: "textarea" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "logo", label: "Logo URL", type: "url" },
    ],
  },
  comment: {
    title: "Create Blog Comment",
    description: "Store a local-only blog comment entry.",
    fields: [
      { key: "title", label: "Comment title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Comment body", type: "textarea", required: true },
      { key: "website", label: "Target post URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
    ],
  },
};

export default function CreateTaskPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const taskKey = params?.task as TaskKey;

  const taskConfig = useMemo(
    () => SITE_CONFIG.tasks.find((task) => task.key === taskKey && task.enabled),
    [taskKey]
  );
  const formConfig = FORM_CONFIG[taskKey];

  const [values, setValues] = useState<Record<string, string>>({});
  const [uploadingPdf, setUploadingPdf] = useState(false);

  if (!taskConfig || !formConfig) {
    return (
      <div className="min-h-screen bg-white" style={{ color: HEARTFELT.green }}>
        <NavbarShell />
        <div className="h-1 w-full" style={{ backgroundColor: HEARTFELT.orange }} />
        <main className="mx-auto max-w-lg px-4 py-20 text-center sm:py-24">
          <Sparkles className="mx-auto h-12 w-12" style={{ color: HEARTFELT.orange }} />
          <h1 className="mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl">This create type isn&apos;t available</h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
            The content type in your URL is not enabled on this site. Use{" "}
            <Link className="font-semibold underline" href="/articles">
              Articles
            </Link>{" "}
            or{" "}
            <Link className="font-semibold underline" href="/profile">
              Profiles
            </Link>{" "}
            from the navigation.
          </p>
          <Button
            asChild
            className="mt-10 h-11 rounded-2xl px-8 font-bold"
            style={{ backgroundColor: HEARTFELT.yellow, color: HEARTFELT.green }}
          >
            <Link href="/">Back home</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const updateValue = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in before creating content.",
      });
      router.push("/login");
      return;
    }

    const missing = formConfig.fields.filter((field) => field.required && !values[field.key]);
    if (missing.length) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields before saving.",
      });
      return;
    }

    const title = values.title || values.brandName || "Untitled";
    const summary = values.summary || "";
    const contentType = taskConfig.contentType || taskKey;

    const content: Record<string, unknown> = {
      type: contentType,
    };

    if (values.category) content.category = values.category;
    if (values.description) content.description = values.description;
    if (values.website) content.website = values.website;
    if (values.email) content.email = values.email;
    if (values.phone) content.phone = values.phone;
    if (values.address) content.address = values.address;
    if (values.location) content.location = values.location;
    if (values.logo) content.logo = values.logo;
    if (values.fileUrl) content.fileUrl = values.fileUrl;
    if (values.brandName) content.brandName = values.brandName;

    const highlights = values.highlights
      ? values.highlights.split(",").map((item) => item.trim()).filter(Boolean)
      : [];
    if (highlights.length) content.highlights = highlights;

    const tags = values.tags
      ? values.tags.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const images = values.images
      ? values.images.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const post = addLocalPost({
      task: taskKey,
      title,
      summary,
      authorName: user.name,
      tags,
      content,
      media: images.map((url) => ({ url, type: "IMAGE" })),
      publishedAt: new Date().toISOString(),
    });

    toast({
      title: "Saved locally",
      description: "This post is stored only in your browser.",
    });

    router.push(`/local/${taskKey}/${post.slug}`);
  };

  const { green, yellow, orange } = HEARTFELT;

  return (
    <HeartfeltPageLayout
      compact
      eyebrow={`Create · ${taskConfig.label}`}
      title={formConfig.title}
      description={formConfig.description}
      actions={
        <>
          <Button
            variant="outline"
            asChild
            className="h-11 rounded-2xl border-2 px-4 font-semibold"
            style={{ borderColor: green, color: green }}
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-11 rounded-2xl border border-[#0a1f0a]/15 font-semibold text-neutral-700">
            <Link href={taskConfig.route}>
              Browse {taskConfig.label}
              <Plus className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </>
      }
    >
      <div className="mx-auto max-w-3xl">
        <div
          className="rounded-3xl border border-[#0a1f0a]/10 bg-gradient-to-b from-amber-50/30 to-white p-6 shadow-[0_20px_50px_rgba(10,31,10,0.08)] sm:p-8"
          style={{ color: green }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              className="rounded-lg border-0 px-3 py-1 text-xs font-bold"
              style={{ backgroundColor: yellow, color: green }}
            >
              {taskConfig.label}
            </Badge>
            <Badge variant="outline" className="rounded-lg border-[#0a1f0a]/20 text-xs font-semibold text-neutral-600">
              Saves in this browser only
            </Badge>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            Fill the fields below, then save. You&apos;ll get a preview link under{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-800">/local/{taskKey}/…</code> — perfect
            for demos and drafts.
          </p>

          <div className="mt-8 grid gap-6">
            {formConfig.fields.map((field) => (
              <div key={field.key} className="grid gap-2">
                <Label className="text-sm font-semibold text-[#0A1F0A]">
                  {field.label} {field.required ? <span style={{ color: orange }}>*</span> : null}
                </Label>
                {field.type === "textarea" ? (
                  <Textarea
                    rows={field.key === "description" ? 8 : 4}
                    placeholder={field.placeholder}
                    value={values[field.key] || ""}
                    onChange={(event) => updateValue(field.key, event.target.value)}
                    className="rounded-xl border-2 border-[#0a1f0a]/12 bg-white text-neutral-900 focus-visible:border-[#0a1f0a]/30 focus-visible:ring-2 focus-visible:ring-[#FFC107]/40"
                  />
                ) : field.type === "category" ? (
                  <select
                    value={values[field.key] || ""}
                    onChange={(event) => updateValue(field.key, event.target.value)}
                    className="h-11 rounded-xl border-2 border-[#0a1f0a]/12 bg-white px-3 text-sm text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107]/40"
                  >
                    <option value="">Select category</option>
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option.slug} value={option.slug}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                ) : field.type === "file" ? (
                  <div className="grid gap-3">
                    <Input
                      type="file"
                      accept="application/pdf"
                      className="cursor-pointer rounded-xl border-2 border-[#0a1f0a]/12 bg-white"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        if (file.type !== "application/pdf") {
                          toast({
                            title: "Invalid file",
                            description: "Please upload a PDF file.",
                          });
                          return;
                        }
                        const reader = new FileReader();
                        setUploadingPdf(true);
                        reader.onload = () => {
                          const result = typeof reader.result === "string" ? reader.result : "";
                          updateValue(field.key, result);
                          setUploadingPdf(false);
                          toast({
                            title: "PDF uploaded",
                            description: "File is stored locally.",
                          });
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    <Input
                      type="text"
                      placeholder="Or paste a PDF URL"
                      value={values[field.key] || ""}
                      onChange={(event) => updateValue(field.key, event.target.value)}
                      className="h-11 rounded-xl border-2 border-[#0a1f0a]/12 bg-white"
                    />
                    {uploadingPdf ? <p className="text-xs text-neutral-500">Uploading PDF…</p> : null}
                  </div>
                ) : (
                  <Input
                    type={field.type === "number" ? "number" : "text"}
                    placeholder={
                      field.type === "images" || field.type === "tags" || field.type === "highlights"
                        ? "Separate values with commas"
                        : field.placeholder
                    }
                    value={values[field.key] || ""}
                    onChange={(event) => updateValue(field.key, event.target.value)}
                    className="h-11 rounded-xl border-2 border-[#0a1f0a]/12 bg-white text-neutral-900 focus-visible:ring-2 focus-visible:ring-[#FFC107]/40"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-[#0a1f0a]/10 pt-8">
            <Button
              type="button"
              onClick={handleSubmit}
              className="h-12 rounded-2xl px-8 text-base font-bold"
              style={{ backgroundColor: yellow, color: green }}
            >
              <Save className="mr-2 h-4 w-4" />
              Save draft locally
            </Button>
            <Button variant="outline" asChild className="h-12 rounded-2xl border-2 font-semibold" style={{ borderColor: green, color: green }}>
              <Link href={taskConfig.route}>
                View {taskConfig.label}
                <Plus className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </HeartfeltPageLayout>
  );
}
