import { defineField, defineType } from "sanity";

export const teamPage = defineType({
  name: "teamPage",
  title: "Team Page",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Team",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Team Page" }),
  },
});
