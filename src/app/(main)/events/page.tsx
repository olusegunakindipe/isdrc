import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Calendar, ExternalLink } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDateShort } from "@/lib/format-date";
import { getEvents, getEventsPage } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getEventsPage();
  return {
    title: page?.title || "Events",
    description: page?.intro || undefined,
  };
}

export default async function EventsPage() {
  const [page, events] = await Promise.all([getEventsPage(), getEvents()]);

  return (
    <>
      <PageHero
        src={page?.heroImageUrl || "/images/hero-events.jpg"}
        alt=""
        title={page?.title || "Events"}
        subtitle={page?.intro || undefined}
      />

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-16">
        {events.length === 0 ? (
          <div className="rounded-sm border border-dashed border-border bg-muted/40 px-6 py-14 text-center">
            <p className="font-heading text-lg font-bold tracking-tight text-isdrc-navy md:text-xl">
              No upcoming events
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Check back soon for conferences, workshops, and stakeholder
              convenings. You can also{" "}
              <Link
                href="/connect"
                className="font-semibold text-isdrc-navy underline-offset-2 hover:underline"
              >
                contact us
              </Link>{" "}
              to learn about future programmes.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const href = event.externalUrl || undefined;
              const dateLabel = formatDateShort(event.startDate);

              return (
                <Card
                  key={event._id}
                  className="group flex flex-col overflow-hidden rounded-sm border border-border shadow-none transition-shadow hover:shadow-sm"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-isdrc-navy/10">
                    {event.imageUrl ? (
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : null}
                  </div>

                  <CardHeader className="pb-2">
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
                    <h2 className="font-heading text-base leading-snug font-bold tracking-tight text-isdrc-navy transition-colors group-hover:text-isdrc-green">
                      {href ? (
                        <Link
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {event.title}
                        </Link>
                      ) : (
                        event.title
                      )}
                    </h2>
                    {event.location && (
                      <p className="text-xs text-muted-foreground">
                        {event.location}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="flex-1 pb-2">
                    {event.summary && (
                      <p className="line-clamp-3 text-sm leading-relaxed text-slate-700">
                        {event.summary}
                      </p>
                    )}
                  </CardContent>

                  {href && (
                    <CardFooter>
                      <Button
                        asChild
                        size="sm"
                        className="rounded-sm bg-isdrc-green px-5 font-semibold text-white hover:bg-[#245628]"
                      >
                        <Link
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Learn more
                          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
