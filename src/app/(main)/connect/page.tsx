import type { Metadata } from "next";

import { ConnectForm } from "@/components/connect-form";
import { PageHero } from "@/components/layout/page-hero";
import { getConnectPage, getSiteSettings } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getConnectPage();
  return {
    title: page?.title || "Get Connected",
    description: page?.intro || undefined,
  };
}

export default async function ConnectPage() {
  const [page, settings] = await Promise.all([
    getConnectPage(),
    getSiteSettings(),
  ]);
  const email = settings?.contactEmail;

  return (
    <>
      <PageHero
        src={page?.heroImageUrl || "/images/hero-connect.jpg"}
        alt=""
        title={page?.title || "Get Connected"}
        subtitle={page?.intro || undefined}
      />

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-16">
        <div className="flex flex-col gap-12 md:flex-row md:gap-16">
          <div className="max-w-sm flex-shrink-0">
            {page?.intro && (
              <p className="mb-4 text-sm leading-relaxed text-slate-700 md:text-base">
                {page.intro}
              </p>
            )}
            {email && (
              <p className="text-sm leading-relaxed text-slate-700">
                Email{" "}
                <a
                  href={`mailto:${email}`}
                  className="font-semibold text-isdrc-navy underline-offset-2 hover:underline"
                >
                  {email}
                </a>{" "}
                or fill out the form.
              </p>
            )}
          </div>

          <div className="flex-1">
            <ConnectForm />
          </div>
        </div>
      </div>
    </>
  );
}
