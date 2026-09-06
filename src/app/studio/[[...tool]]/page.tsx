import type { Metadata } from "next";

import { Studio } from "./studio";

export const metadata: Metadata = {
  title: "ISDRC Studio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-static";

export default function StudioPage() {
  return <Studio />;
}
