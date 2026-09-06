import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/config/site";

export function Footer({
  shortName,
  fullName,
  tagline,
  description,
  contactEmail,
  logoUrl,
}: {
  shortName: string;
  fullName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  logoUrl: string;
}) {
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
          </div>

          <div>
            <h3 className="mb-6 text-xs font-bold tracking-widest text-isdrc-green uppercase">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-6" role="list">
              {NAV_ITEMS.map((item) => (
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
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold tracking-widest text-isdrc-green uppercase">
              Get Connected
            </h3>
            {contactEmail ? (
              <p className="mb-4 text-sm text-slate-700">
                Email us at{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-bold text-isdrc-navy underline-offset-2 hover:underline"
                >
                  {contactEmail}
                </a>{" "}
                or click below.
              </p>
            ) : (
              <p className="mb-4 text-sm text-slate-700">
                Reach out to learn more about our work.
              </p>
            )}
            <Button
              asChild
              className="rounded-sm bg-isdrc-green px-6 font-bold tracking-widest text-white uppercase hover:bg-[#245628]"
            >
              <Link href="/connect">Connect</Link>
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
