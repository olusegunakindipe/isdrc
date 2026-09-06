import type { Metadata } from "next";
import Link from "next/link";

import { Calendar, ExternalLink, Plus } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/format-date";
import { getPressItems, getPressPage } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPressPage();
  return {
    title: page?.title || "Press",
    description: page?.intro || undefined,
  };
}

export default async function PressPage() {
  const [page, items] = await Promise.all([getPressPage(), getPressItems()]);

  return (
    <>
      <PageHero
        src={page?.heroImageUrl || "/images/hero-publications.jpg"}
        alt=""
        title={page?.title || "Press"}
        subtitle={page?.intro || undefined}
      />

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-16">
        {items.length === 0 ? (
          <p className="rounded-sm border border-dashed border-border bg-muted/40 px-6 py-12 text-center text-sm text-muted-foreground">
            No press items yet.
          </p>
        ) : (
          <div className="flex flex-col gap-10">
            {items.map((item, i) => {
              const href = item.url || undefined;
              const dateLabel = formatDate(item.publishedAt);

              return (
                <article key={item._id} aria-labelledby={`press-${item._id}`}>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-3">
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
                      {item.outlet && (
                        <>
                          <span className="text-xs text-muted-foreground">
                            ·
                          </span>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {item.outlet}
                          </span>
                        </>
                      )}
                    </div>

                    <h2
                      id={`press-${item._id}`}
                      className="font-heading text-lg leading-snug font-bold tracking-tight text-isdrc-navy md:text-xl"
                    >
                      {href ? (
                        <Link
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-start gap-2 transition-colors hover:text-isdrc-green"
                        >
                          {item.title}
                          <ExternalLink className="mt-1 h-4 w-4 flex-shrink-0" />
                        </Link>
                      ) : (
                        item.title
                      )}
                    </h2>

                    {item.summary && (
                      <p className="max-w-3xl text-sm leading-relaxed text-slate-700">
                        {item.summary}
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
                          Read article
                          <Plus className="ml-1.5 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    )}
                  </div>
                  {i < items.length - 1 && <Separator className="mt-10" />}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
