import { Fragment } from "react";

import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { TeamMemberCard } from "@/components/team-member-card";
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
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {members.map((member, i) => (
              <Fragment key={member._id}>
                <TeamMemberCard
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  photoUrl={member.photoUrl}
                />
                {i % 2 === 1 && i < members.length - 1 && (
                  <Separator className="col-span-full bg-isdrc-navy/15" />
                )}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
