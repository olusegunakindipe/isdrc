import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Calendar, ExternalLink } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/format-date";
import { getPublications, getPublicationsPage } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPublicationsPage();
  return {
    title: page?.title || "Publications",
    description: page?.intro || undefined,
  };
}

export default async function PublicationsPage() {
  const [page, publications] = await Promise.all([
    getPublicationsPage(),
    getPublications(),
  ]);

  return (
    <>
      <PageHero
        src={page?.heroImageUrl || "/images/hero-publications.jpg"}
        alt=""
        title={page?.title || "Publications"}
        subtitle={page?.intro || undefined}
      />

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-16">
        {publications.length === 0 ? (
          <p className="rounded-sm border border-dashed border-border bg-muted/40 px-6 py-12 text-center text-sm text-muted-foreground">
            No publications yet.
          </p>
        ) : (
          <div className="flex flex-col gap-12">
            {publications.map((pub, i) => {
              const href = pub.externalUrl || undefined;
              const dateLabel = formatDate(pub.publishedAt);

              return (
                <article key={pub._id} aria-labelledby={`pub-title-${pub._id}`}>
                  <div className="flex flex-col gap-6 md:flex-row">
                    {pub.imageUrl && (
                      <div className="relative h-52 w-full flex-shrink-0 overflow-hidden rounded-sm md:h-auto md:w-64">
                        <Image
                          src={pub.imageUrl}
                          alt={pub.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 256px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col gap-3">
                      <h2
                        id={`pub-title-${pub._id}`}
                        className="font-heading text-lg leading-snug font-bold tracking-tight text-isdrc-navy md:text-xl"
                      >
                        {href ? (
                          <Link
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-isdrc-green"
                          >
                            {pub.title}
                          </Link>
                        ) : (
                          pub.title
                        )}
                      </h2>

                      {dateLabel && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-isdrc-green" />
                          <Badge
                            variant="outline"
                            className="border-0 p-0 text-xs font-semibold text-isdrc-green"
                          >
                            {dateLabel}
                          </Badge>
                        </div>
                      )}

                      {pub.summary && (
                        <p className="max-w-3xl text-sm leading-relaxed text-slate-700">
                          {pub.summary}
                        </p>
                      )}

                      {href && (
                        <Button
                          asChild
                          size="sm"
                          className="mt-1 w-fit rounded-sm bg-isdrc-green px-5 font-semibold text-white hover:bg-[#245628]"
                        >
                          <Link
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read more
                            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                  {i < publications.length - 1 && (
                    <Separator className="mt-12" />
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
