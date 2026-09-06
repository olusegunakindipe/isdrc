import { defineField, defineType } from "sanity";

export const advisoryPage = defineType({
  name: "advisoryPage",
  title: "Advisory Board Page",
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
      initialValue: "Advisory Board",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Advisory Board Page" }),
  },
});
