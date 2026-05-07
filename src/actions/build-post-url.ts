"use server";

import { buildPostUrl } from "@/lib/task-data";

export async function getPostUrl(task: string, slug: string): Promise<string> {
  return buildPostUrl(task as any, slug);
}
