import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getPublicationsPage } from "@/sanity/lib/fetch";

function getFileKind(
  fileUrl?: string | null,
  fileName?: string | null
): "pdf" | "word" | null {
  if (!fileUrl) return null;
  const name = (fileName || fileUrl).toLowerCase();
  if (name.endsWith(".pdf") || name.includes("application/pdf")) return "pdf";
  if (
    name.endsWith(".doc") ||
    name.endsWith(".docx") ||
    name.includes("msword") ||
    name.includes("wordprocessingml")
  ) {
    return "word";
  }
  return null;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPublicationsPage();
  return {
    title: page?.title || "Publications",
    description: page?.intro || undefined,
  };
}

export default async function PublicationsPage() {
  const page = await getPublicationsPage();
  const items = page?.items?.filter((item) => item?.title) ?? [];

  return (
    <>
      <PageHero
        src={page?.heroImageUrl || "/images/hero-publications.jpg"}
        alt=""
        title={page?.title || "Publications"}
        subtitle={page?.intro || undefined}
      />

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-16">
        <h2 className="font-heading mb-10 text-2xl font-bold tracking-tight text-isdrc-navy md:text-3xl">
          {page?.listHeading || "List of Publications"}
        </h2>

        {items.length === 0 ? (
          <p className="rounded-sm border border-dashed border-border bg-muted/40 px-6 py-12 text-center text-sm text-muted-foreground">
            No publications yet.
          </p>
        ) : (
          <ul className="flex flex-col" role="list">
            {items.map((item, i) => {
              const fileKind = getFileKind(item.fileUrl, item.fileName);
              const isFile = Boolean(item.fileUrl);
              const href = item.fileUrl || item.externalUrl || undefined;
              const fileLabel =
                fileKind === "pdf"
                  ? "PDF"
                  : fileKind === "word"
                    ? "Word"
                    : null;

              return (
                <li key={`${item.title}-${i}`}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                    <h3 className="font-heading text-lg leading-snug font-bold tracking-tight text-isdrc-navy md:text-xl">
                      {href ? (
                        <Link
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline-offset-4 transition-colors hover:text-isdrc-green hover:underline"
                          {...(isFile ? { download: true } : {})}
                        >
                          {item.title}
                        </Link>
                      ) : (
                        item.title
                      )}
                    </h3>
                    {fileLabel && (
                      <Badge
                        variant="outline"
                        className="rounded-sm border-isdrc-navy/20 text-xs font-semibold tracking-wide text-isdrc-navy uppercase"
                      >
                        {fileLabel}
                      </Badge>
                    )}
                  </div>
                  {i < items.length - 1 && <Separator className="my-8" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
