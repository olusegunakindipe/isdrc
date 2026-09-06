import { defineField, defineType } from "sanity";

export const pressItem = defineType({
  name: "pressItem",
  title: "Press Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "outlet",
      title: "Outlet",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "date",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "outlet" },
  },
});
