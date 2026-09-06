import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/layout/page-hero";
import { Separator } from "@/components/ui/separator";
import { getTeamMembers, getTeamPage } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getTeamPage();
  return {
    title: page?.title || "Team",
    description: page?.intro || undefined,
  };
}

export default async function TeamPage() {
  const [page, members] = await Promise.all([getTeamPage(), getTeamMembers()]);

  return (
    <>
      <PageHero
        src={page?.heroImageUrl || "/images/hero-team.jpg"}
        alt=""
        title={page?.title || "Team"}
        subtitle={page?.intro || undefined}
      />

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-16">
        {members.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Team profiles will appear here once published in Studio.
          </p>
        ) : (
          <div className="flex flex-col gap-12">
            {members.map((member, i) => (
              <div key={member._id}>
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="flex-shrink-0">
                    <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-isdrc-navy/15 bg-isdrc-light shadow-sm">
                      {member.photoUrl ? (
                        <Image
                          src={member.photoUrl}
                          alt={`${member.name} — ${member.role}`}
                          fill
                          sizes="144px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-isdrc-navy">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 pt-1">
                    <h2 className="font-heading text-xl font-bold tracking-tight text-isdrc-navy">
                      {member.name}
                    </h2>
                    <p className="mb-3 text-sm font-semibold text-isdrc-green">
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>
                {i < members.length - 1 && <Separator className="mt-12" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
