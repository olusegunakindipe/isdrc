import type { Metadata } from "next";
import Link from "next/link";

import { ExternalLink } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { getPartners, getPartnershipsPage } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPartnershipsPage();
  return {
    title: page?.title || "Partnerships",
    description: page?.intro || undefined,
  };
}

export default async function PartnershipsPage() {
  const [page, partners] = await Promise.all([
    getPartnershipsPage(),
    getPartners(),
  ]);

  return (
    <>
      <PageHero
        src={page?.heroImageUrl || "/images/hero-approach.jpg"}
        alt=""
        title={page?.title || "Partnerships"}
        subtitle={page?.intro || undefined}
      />

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-16">
        {partners.length === 0 ? (
          <p className="rounded-sm border border-dashed border-border bg-muted/40 px-6 py-12 text-center text-sm text-muted-foreground">
            Partnerships will appear here once added in Studio.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {partners.map((partner) => (
              <Card
                key={partner._id}
                className="rounded-sm border border-border shadow-none transition-shadow hover:shadow-sm"
              >
                <CardContent className="flex flex-col gap-3 p-6">
                  <h2 className="font-heading text-base font-bold tracking-tight text-isdrc-navy">
                    {partner.name}
                  </h2>
                  {partner.description && (
                    <p className="text-sm leading-relaxed text-slate-700">
                      {partner.description}
                    </p>
                  )}
                  {partner.url && (
                    <Link
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-isdrc-green uppercase transition-colors hover:text-[#245628]"
                    >
                      Visit website
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
