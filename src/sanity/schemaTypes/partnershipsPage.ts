import { defineField, defineType } from "sanity";

export const partnershipsPage = defineType({
  name: "partnershipsPage",
  title: "Partnerships Page",
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
      initialValue: "Partnerships",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Partnerships Page" }),
  },
});
