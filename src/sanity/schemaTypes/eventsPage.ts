import { defineField, defineType } from "sanity";

export const eventsPage = defineType({
  name: "eventsPage",
  title: "Events Page",
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
      initialValue: "Events",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Events Page" }),
  },
});
