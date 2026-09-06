"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const configuredProjectId = projectId || "placeholder";

export default defineConfig({
  name: "isdrc",
  title: "ISDRC Studio",
  basePath: "/studio",
  projectId: configuredProjectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool({ structure })],
});
