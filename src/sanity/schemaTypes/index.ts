import { advisoryMember } from "./advisoryMember";
import { advisoryPage } from "./advisoryPage";
import { approachPillar } from "./approachPillar";
import { connectPage } from "./connectPage";
import { event } from "./event";
import { eventsPage } from "./eventsPage";
import { homePage } from "./homePage";
import { partner } from "./partner";
import { partnershipsPage } from "./partnershipsPage";
import { pressItem } from "./pressItem";
import { pressPage } from "./pressPage";
import { publication } from "./publication";
import { publicationsPage } from "./publicationsPage";
import { siteSettings } from "./siteSettings";
import { teamMember } from "./teamMember";
import { teamPage } from "./teamPage";

export const schemaTypes = [
  siteSettings,
  homePage,
  connectPage,
  teamPage,
  advisoryPage,
  partnershipsPage,
  publicationsPage,
  eventsPage,
  pressPage,
  approachPillar,
  teamMember,
  advisoryMember,
  partner,
  publication,
  event,
  pressItem,
];
