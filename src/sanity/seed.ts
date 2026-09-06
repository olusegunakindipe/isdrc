/**
 * Seeds ISDRC content into Sanity.
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN.
 */
import {
  SEED_ADVISORY,
  SEED_ADVISORY_PAGE,
  SEED_APPROACH_PILLARS,
  SEED_CONNECT,
  SEED_EVENTS_PAGE,
  SEED_HOME,
  SEED_PARTNERSHIPS_PAGE,
  SEED_PRESS_PAGE,
  SEED_PUBLICATIONS_PAGE,
  SEED_SITE_SETTINGS,
  SEED_TEAM,
  SEED_TEAM_PAGE,
} from "./content-seed";

export const seedDocuments = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    ...SEED_SITE_SETTINGS,
  },
  {
    _id: "homePage",
    _type: "homePage",
    ...SEED_HOME,
  },
  {
    _id: "connectPage",
    _type: "connectPage",
    ...SEED_CONNECT,
  },
  {
    _id: "teamPage",
    _type: "teamPage",
    ...SEED_TEAM_PAGE,
  },
  {
    _id: "advisoryPage",
    _type: "advisoryPage",
    ...SEED_ADVISORY_PAGE,
  },
  {
    _id: "partnershipsPage",
    _type: "partnershipsPage",
    ...SEED_PARTNERSHIPS_PAGE,
  },
  {
    _id: "publicationsPage",
    _type: "publicationsPage",
    ...SEED_PUBLICATIONS_PAGE,
  },
  {
    _id: "eventsPage",
    _type: "eventsPage",
    ...SEED_EVENTS_PAGE,
  },
  {
    _id: "pressPage",
    _type: "pressPage",
    ...SEED_PRESS_PAGE,
  },
  ...SEED_APPROACH_PILLARS.map((p) => ({
    _id: p._id,
    _type: "approachPillar" as const,
    title: p.title,
    body: p.body,
    order: p.order,
  })),
  ...SEED_TEAM.map((m) => ({
    _id: m._id,
    _type: "teamMember" as const,
    name: m.name,
    role: m.role,
    bio: m.bio,
    order: m.order,
  })),
  ...SEED_ADVISORY.map((m) => ({
    _id: m._id,
    _type: "advisoryMember" as const,
    name: m.name,
    affiliation: m.affiliation,
    bio: m.bio,
    order: m.order,
  })),
];
