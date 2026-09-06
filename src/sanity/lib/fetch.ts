import { isSanityConfigured } from "../env";
import { client } from "./client";
import {
  advisoryMembersQuery,
  advisoryPageQuery,
  approachPillarsQuery,
  connectPageQuery,
  eventsPageQuery,
  eventsQuery,
  homePageQuery,
  partnersQuery,
  partnershipsPageQuery,
  pressItemsQuery,
  pressPageQuery,
  publicationsPageQuery,
  publicationsQuery,
  siteSettingsQuery,
  teamMembersQuery,
  teamPageQuery,
} from "./queries";

async function fetchOrNull<T>(query: string): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<T | null>(query);
  } catch {
    return null;
  }
}

async function fetchList<T>(query: string): Promise<T[]> {
  if (!isSanityConfigured) return [];
  try {
    return (await client.fetch<T[] | null>(query)) ?? [];
  } catch {
    return [];
  }
}

export type SiteSettings = {
  shortName?: string | null;
  fullName?: string | null;
  tagline?: string | null;
  description?: string | null;
  contactEmail?: string | null;
  twitterUrl?: string | null;
  linkedinUrl?: string | null;
  logoUrl?: string | null;
};

export type HomePage = {
  heroLead?: string | null;
  aboutEyebrow?: string | null;
  aboutHeading?: string | null;
  missionParagraphs?: string[] | null;
  missionHighlight?: string | null;
  approachEyebrow?: string | null;
  approachHeading?: string | null;
  ctaHeading?: string | null;
  ctaBody?: string | null;
  heroImageUrl?: string | null;
};

export type PageMeta = {
  title?: string | null;
  intro?: string | null;
  heroImageUrl?: string | null;
};

export async function getSiteSettings() {
  return fetchOrNull<SiteSettings>(siteSettingsQuery);
}

export async function getHomePage() {
  return fetchOrNull<HomePage>(homePageQuery);
}

export async function getApproachPillars() {
  return fetchList<{
    _id: string;
    title: string;
    body: string;
    order?: number;
  }>(approachPillarsQuery);
}

export async function getTeamMembers() {
  return fetchList<{
    _id: string;
    name: string;
    role: string;
    bio?: string;
    photoUrl?: string | null;
    order?: number;
  }>(teamMembersQuery);
}

export async function getAdvisoryMembers() {
  return fetchList<{
    _id: string;
    name: string;
    affiliation: string;
    bio?: string;
    photoUrl?: string | null;
    order?: number;
  }>(advisoryMembersQuery);
}

export async function getPartners() {
  return fetchList<{
    _id: string;
    name: string;
    description?: string;
    url?: string;
    logoUrl?: string | null;
    order?: number;
  }>(partnersQuery);
}

export async function getPublications() {
  return fetchList<{
    _id: string;
    title: string;
    slug?: string;
    summary?: string;
    publishedAt?: string;
    externalUrl?: string;
    imageUrl?: string | null;
  }>(publicationsQuery);
}

export async function getEvents() {
  return fetchList<{
    _id: string;
    title: string;
    slug?: string;
    summary?: string;
    startDate?: string;
    location?: string;
    externalUrl?: string;
    imageUrl?: string | null;
  }>(eventsQuery);
}

export async function getPressItems() {
  return fetchList<{
    _id: string;
    title: string;
    outlet?: string;
    publishedAt?: string;
    url?: string;
    summary?: string;
  }>(pressItemsQuery);
}

export async function getConnectPage() {
  return fetchOrNull<PageMeta>(connectPageQuery);
}

export async function getTeamPage() {
  return fetchOrNull<PageMeta>(teamPageQuery);
}

export async function getAdvisoryPage() {
  return fetchOrNull<PageMeta>(advisoryPageQuery);
}

export async function getPartnershipsPage() {
  return fetchOrNull<PageMeta>(partnershipsPageQuery);
}

export async function getPublicationsPage() {
  return fetchOrNull<PageMeta>(publicationsPageQuery);
}

export async function getEventsPage() {
  return fetchOrNull<PageMeta>(eventsPageQuery);
}

export async function getPressPage() {
  return fetchOrNull<PageMeta>(pressPageQuery);
}
