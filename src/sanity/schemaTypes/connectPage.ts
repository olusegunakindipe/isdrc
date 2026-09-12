import { defineField, defineType } from "sanity";

export const connectPage = defineType({
  name: "connectPage",
  title: "Contact Page",
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
      initialValue: "Contact Us",
    }),
    defineField({
      name: "intro",
      title: "Intro Copy",
      type: "text",
      rows: 5,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Page" }),
  },
});
