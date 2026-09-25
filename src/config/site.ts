// Site-wide nav config — structure only (labels/routes). Content comes from Sanity.
export const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Publications",
    href: "/publications",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "People & Partners",
    href: "/team",
    children: [
      { label: "Team", href: "/team" },
      { label: "Advisory Board", href: "/advisory-board" },
      { label: "Partnerships", href: "/partnerships" },
    ],
  },
  {
    label: "Contact Us",
    href: "/connect",
  },
] as const;
