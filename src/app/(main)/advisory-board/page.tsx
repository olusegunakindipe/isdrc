import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { Separator } from "@/components/ui/separator";
import { getAdvisoryMembers, getAdvisoryPage } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAdvisoryPage();
  return {
    title: page?.title || "Advisory Board",
    description: page?.intro || undefined,
  };
}

export default async function AdvisoryBoardPage() {
  const [page, members] = await Promise.all([
    getAdvisoryPage(),
    getAdvisoryMembers(),
  ]);

  return (
    <>
      <PageHero
        src={page?.heroImageUrl || "/images/hero-connect.jpg"}
        alt=""
        title={page?.title || "Advisory Board"}
        subtitle={page?.intro || undefined}
      />

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-16">
        {members.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Advisory board members will appear here once published in Studio.
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {members.map((member, i) => (
              <div key={member._id}>
                <div className="flex flex-col gap-1">
                  <h2 className="font-heading text-lg font-bold tracking-tight text-isdrc-navy md:text-xl">
                    {member.name}
                  </h2>
                  <p className="whitespace-pre-line text-sm font-medium text-isdrc-green">
                    {member.affiliation}
                  </p>
                  {member.bio && (
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700">
                      {member.bio}
                    </p>
                  )}
                </div>
                {i < members.length - 1 && <Separator className="mt-8" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
