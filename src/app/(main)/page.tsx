import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getApproachPillars,
  getHomePage,
  getSiteSettings,
} from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.fullName
    ? `${settings.shortName || "ISDRC"} — ${settings.fullName}`
    : "ISDRC";
  return {
    title,
    description: settings?.description || undefined,
    openGraph: {
      title,
      description: settings?.description || undefined,
      images: [{ url: "/images/hero-home.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function HomePage() {
  const [settings, home, pillars] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
    getApproachPillars(),
  ]);

  const fullName = settings?.fullName;
  const tagline = settings?.tagline;
  const heroImage = home?.heroImageUrl || "/images/hero-home.jpg";
  const paragraphs = home?.missionParagraphs?.filter(Boolean) || [];

  return (
    <>
      <section
        className="relative flex min-h-[78vh] w-full items-center overflow-hidden md:min-h-[min(88vh,820px)]"
        aria-label="Home overview"
      >
        <Image
          src={heroImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="hero-overlay absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 md:px-16 md:py-24">
          {tagline && (
            <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-isdrc-gold uppercase">
              {tagline}
            </p>
          )}
          {fullName && (
            <h1 className="font-heading max-w-4xl text-3xl leading-tight font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {fullName}
            </h1>
          )}
          {home?.heroLead && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/95 md:text-xl">
              {home.heroLead}
            </p>
          )}
          {(() => {
            const heroCtas =
              home?.heroCtas?.filter(
                (cta) => cta?.label?.trim() && cta?.url?.trim()
              ) ?? [];
            const buttons =
              heroCtas.length > 0
                ? heroCtas
                : [
                    { label: "Our approach", url: "/#who-we-are" },
                    { label: "Contact us", url: "/connect" },
                  ];

            return (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {buttons.map((cta, index) => (
                  <Button
                    key={`${cta.label}-${index}`}
                    asChild
                    variant={index === 0 ? "default" : "outline"}
                    className={cn(
                      "h-12 w-full justify-center rounded-sm px-8 font-semibold tracking-wide sm:w-auto",
                      index === 0
                        ? "bg-isdrc-green text-white hover:bg-[#245628]"
                        : "border-white/70 bg-transparent text-white hover:bg-white hover:text-isdrc-navy"
                    )}
                  >
                    <Link href={cta.url!.trim()}>
                      {cta.label!.trim()}
                      {index === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Link>
                  </Button>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {(home?.aboutHeading ||
        paragraphs.length > 0 ||
        home?.missionHighlight) && (
        <section
          className="bg-white py-16 md:py-20"
          aria-labelledby="mission-heading"
        >
          <div className="mx-auto max-w-7xl px-6 md:px-16">
            <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
              <div>
                {home?.aboutEyebrow && (
                  <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-isdrc-green uppercase">
                    {home.aboutEyebrow}
                  </p>
                )}
                {home?.aboutHeading && (
                  <h2
                    id="mission-heading"
                    className="font-heading text-3xl font-bold tracking-tight text-isdrc-navy md:text-4xl"
                  >
                    {home.aboutHeading}
                  </h2>
                )}
              </div>
              <div className="space-y-5 text-base leading-relaxed text-slate-700 md:text-lg">
                {paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                {home?.missionHighlight && (
                  <p className="border-l-4 border-isdrc-gold pl-4 font-semibold text-isdrc-navy">
                    {home.missionHighlight}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section
        id="who-we-are"
        className="scroll-mt-24 bg-isdrc-light py-16 md:py-20"
        aria-labelledby="who-we-are-heading"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          {(home?.approachEyebrow || home?.approachHeading) && (
            <div className="mb-12 max-w-2xl">
              {home?.approachEyebrow && (
                <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-isdrc-green uppercase">
                  {home.approachEyebrow}
                </p>
              )}
              {home?.approachHeading && (
                <h2
                  id="who-we-are-heading"
                  className="font-heading text-3xl font-bold tracking-tight text-isdrc-navy md:text-4xl"
                >
                  {home.approachHeading}
                </h2>
              )}
            </div>
          )}

          {!home?.approachHeading && (
            <h2 id="who-we-are-heading" className="sr-only">
              Who we are
            </h2>
          )}

          {pillars.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Approach pillars will appear here once published in Studio.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <article
                  key={pillar._id}
                  className="border-t-2 border-isdrc-navy/15 pt-6"
                >
                  <h3 className="font-heading mb-3 text-xl font-bold text-isdrc-navy">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-700 md:text-base">
                    {pillar.body}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {(home?.ctaHeading || home?.ctaBody) && (
        <section
          className="border-t border-border bg-white py-16"
          aria-labelledby="latest-heading"
        >
          <div className="mx-auto max-w-7xl px-6 text-center md:px-16">
            {home?.ctaHeading && (
              <h2
                id="latest-heading"
                className="font-heading mb-4 text-2xl font-bold tracking-tight text-isdrc-navy md:text-3xl"
              >
                {home.ctaHeading}
              </h2>
            )}
            {home?.ctaBody && (
              <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
                {home.ctaBody}
              </p>
            )}
            <div className="mx-auto flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
              <Button
                asChild
                className="h-12 w-full justify-center rounded-sm bg-isdrc-green px-8 font-semibold tracking-wide text-white hover:bg-[#245628] sm:w-auto"
              >
                <Link href="/publications">
                  Publications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 w-full justify-center rounded-sm border-isdrc-navy px-8 font-semibold tracking-wide text-isdrc-navy hover:bg-isdrc-navy hover:text-white sm:w-auto"
              >
                <Link href="/events">Events</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
