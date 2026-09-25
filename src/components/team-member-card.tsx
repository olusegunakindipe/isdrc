"use client";

import { useState } from "react";

import Image from "next/image";

import { ChevronDown, ChevronUp } from "lucide-react";

export function TeamMemberCard({
  name,
  role,
  bio,
  photoUrl,
}: {
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string | null;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-5">
        <div className="relative h-36 w-36 flex-shrink-0 overflow-hidden rounded-full border-4 border-isdrc-navy/15 bg-isdrc-light shadow-sm">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={`${name} — ${role}`}
              fill
              sizes="144px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-isdrc-navy">
              {name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold tracking-tight text-isdrc-navy">
            {name}
          </h2>
          <p className="text-sm font-semibold text-isdrc-green">{role}</p>
        </div>
      </div>

      {bio && (
        <div>
          <p
            className={`mb-2 text-justify text-sm leading-relaxed text-slate-700 ${expanded ? "" : "line-clamp-2"}`}
          >
            {bio}
          </p>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1 text-sm font-semibold text-isdrc-navy underline underline-offset-2 hover:text-isdrc-green"
          >
            {expanded ? "Show Less" : "Show More"}
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
