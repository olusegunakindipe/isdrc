/**
 * Seeds ISDRC content into Sanity.
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN.
 */
import { createClient } from "@sanity/client";

import { seedDocuments } from "../src/sanity/seed";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  process.exit(1);
}

if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN — create a write token in sanity.io/manage"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  token,
  useCdn: false,
});

async function main() {
  console.log(
    `Seeding ${seedDocuments.length} documents into ${projectId}/${dataset}...`
  );
  const tx = client.transaction();
  for (const doc of seedDocuments) {
    tx.createOrReplace(doc as { _id: string; _type: string });
  }
  await tx.commit();
  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
