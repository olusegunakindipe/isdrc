import type { StructureResolver } from "sanity/structure";

const SINGLETONS = [
  { id: "siteSettings", title: "Site Settings" },
  { id: "homePage", title: "Home Page" },
  { id: "connectPage", title: "Connect Page" },
  { id: "teamPage", title: "Team Page" },
  { id: "advisoryPage", title: "Advisory Board Page" },
  { id: "partnershipsPage", title: "Partnerships Page" },
  { id: "publicationsPage", title: "Publications Page" },
  { id: "eventsPage", title: "Events Page" },
  { id: "pressPage", title: "Press Page" },
] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site & Pages")
        .child(
          S.list()
            .title("Site & Pages")
            .items(
              SINGLETONS.map((item) =>
                S.listItem()
                  .title(item.title)
                  .id(item.id)
                  .child(S.document().schemaType(item.id).documentId(item.id))
              )
            )
        ),
      S.divider(),
      S.listItem()
        .title("About")
        .child(
          S.list()
            .title("About")
            .items([
              S.documentTypeListItem("approachPillar").title(
                "Approach Pillars"
              ),
              S.documentTypeListItem("teamMember").title("Team Members"),
              S.documentTypeListItem("advisoryMember").title(
                "Advisory Board Members"
              ),
              S.documentTypeListItem("partner").title("Partners"),
            ])
        ),
      S.listItem()
        .title("Research & Updates")
        .child(
          S.list()
            .title("Research & Updates")
            .items([
              S.documentTypeListItem("publication").title("Publications"),
              S.documentTypeListItem("event").title("Events"),
              S.documentTypeListItem("pressItem").title("Press Items"),
            ])
        ),
    ]);
