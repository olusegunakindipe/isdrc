// Site-wide nav config — structure only (labels/routes). Content comes from Sanity.
export const NAV_ITEMS = [
  {
    label: "Approach",
    href: "/#approach",
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
    label: "Press",
    href: "/press",
  },
  {
    label: "About Us",
    href: "/team",
    children: [
      { label: "Team", href: "/team" },
      { label: "Advisory Board", href: "/advisory-board" },
      { label: "Partnerships", href: "/partnerships" },
    ],
  },
  {
    label: "Get Connected",
    href: "/connect",
  },
] as const;
