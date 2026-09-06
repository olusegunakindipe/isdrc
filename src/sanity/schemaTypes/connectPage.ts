import { defineField, defineType } from "sanity";

export const connectPage = defineType({
  name: "connectPage",
  title: "Connect Page",
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
      initialValue: "Get Connected",
    }),
    defineField({
      name: "intro",
      title: "Intro Copy",
      type: "text",
      rows: 5,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Connect Page" }),
  },
});
