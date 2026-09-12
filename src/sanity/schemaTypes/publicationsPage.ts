import { defineField, defineType } from "sanity";

export const publicationsPage = defineType({
  name: "publicationsPage",
  title: "Publications Page",
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
      initialValue: "Publications",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "listHeading",
      title: "List heading",
      type: "string",
      initialValue: "List of Publications",
      description: "Heading above the publications list on the page",
    }),
    defineField({
      name: "items",
      title: "Publications",
      type: "array",
      description:
        "Each item is a title plus either a PDF/Word upload or an external link",
      of: [
        {
          type: "object",
          name: "publicationItem",
          title: "Publication",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "file",
              title: "File (PDF or Word)",
              type: "file",
              options: {
                accept:
                  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              },
            }),
            defineField({
              name: "externalUrl",
              title: "External URL",
              type: "url",
              description: "Used if no file is uploaded",
            }),
          ],
          validation: (Rule) =>
            Rule.custom((item) => {
              if (!item) return true;
              const row = item as {
                file?: { asset?: unknown };
                externalUrl?: string;
              };
              const hasFile = Boolean(row.file?.asset);
              const hasUrl = Boolean(row.externalUrl?.trim());
              if (!hasFile && !hasUrl) {
                return "Add a PDF/Word file or an external URL";
              }
              return true;
            }),
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Publications Page" }),
  },
});
