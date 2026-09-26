import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/config/site";
import type { SocialLink } from "@/sanity/lib/fetch";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

const SOCIAL_META: Record<string, { label: string; Icon: typeof XIcon }> = {
  twitter: { label: "X (Twitter)", Icon: XIcon },
  linkedin: { label: "LinkedIn", Icon: LinkedInIcon },
  tiktok: { label: "TikTok", Icon: TikTokIcon },
};

export function Footer({
  shortName,
  fullName,
  tagline,
  description,
  contactEmail,
  physicalAddress,
  logoUrl,
  linksHeading,
  contactHeading,
  contactButtonLabel,
  socialLinks = [],
}: {
  shortName: string;
  fullName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  physicalAddress: string;
  logoUrl: string;
  linksHeading: string;
  contactHeading: string;
  contactButtonLabel: string;
  socialLinks?: SocialLink[];
}) {
  const links = socialLinks
    .map((link) => {
      const platform = link.platform?.trim();
      const href = link.url?.trim();
      if (!platform || !href) return null;
      const meta = SOCIAL_META[platform];
      if (!meta) return null;
      return { href, ...meta, key: `${platform}-${href}` };
    })
    .filter(
      (
        link
      ): link is {
        href: string;
        label: string;
        Icon: typeof XIcon;
        key: string;
      } => link !== null
    );

  return (
    <footer
      className="border-t border-border bg-isdrc-light text-isdrc-navy"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              aria-label={`${shortName} home`}
              className="inline-block"
            >
              <Image
                src={logoUrl}
                alt={fullName ? `${shortName} — ${fullName}` : shortName}
                width={720}
                height={280}
                className="h-28 w-auto max-w-[min(100%,360px)] object-contain transition-opacity hover:opacity-90 sm:h-32 sm:max-w-[420px] md:h-36 md:max-w-[480px]"
              />
            </Link>
            {tagline && (
              <p className="text-xs font-semibold tracking-wider text-isdrc-gold uppercase">
                {tagline}
              </p>
            )}
            {description && (
              <p className="max-w-xs text-sm leading-relaxed text-slate-700">
                {description}
              </p>
            )}
            {links.length > 0 && (
              <ul className="mt-2 flex items-center gap-3" role="list">
                {links.map(({ href, label, Icon, key }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-isdrc-navy/15 text-isdrc-navy transition-colors hover:border-isdrc-navy/40 hover:bg-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="mb-6 text-xs font-bold tracking-widest text-isdrc-green uppercase">
              {linksHeading}
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-6" role="list">
              {NAV_ITEMS.filter((item) => item.href !== "/connect").map(
                (item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium tracking-wide text-slate-700 uppercase transition-colors hover:text-isdrc-navy"
                    >
                      {item.label}
                    </Link>
                    {"children" in item && item.children && (
                      <ul className="mt-1 ml-3 flex flex-col gap-1" role="list">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="text-xs text-slate-600 transition-colors hover:text-isdrc-navy"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold tracking-widest text-isdrc-green uppercase">
              {contactHeading}
            </h3>
            {contactEmail && (
              <p className="mb-3 text-sm text-slate-700">
                <span className="font-semibold text-isdrc-navy">Email:</span>{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-isdrc-navy underline-offset-2 hover:underline"
                >
                  {contactEmail}
                </a>
              </p>
            )}
            {physicalAddress && (
              <p className="mb-4 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                <span className="font-semibold text-isdrc-navy">Address:</span>{" "}
                {physicalAddress}
              </p>
            )}
            {!contactEmail && !physicalAddress && (
              <p className="mb-4 text-sm text-slate-700">
                Reach out to learn more about our work.
              </p>
            )}
            <Button
              asChild
              className="h-12 justify-center rounded-sm bg-isdrc-green px-8 font-bold tracking-widest text-white uppercase hover:bg-[#245628]"
            >
              <Link href="/connect">{contactButtonLabel}</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-300/50 py-4 text-center">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()}
          {fullName ? ` ${fullName}` : shortName ? ` ${shortName}` : ""}. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
