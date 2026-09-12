import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "shortName",
      title: "Short Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "e.g. Evidence | Policy | Engagement",
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "physicalAddress",
      title: "Physical address",
      type: "text",
      rows: 3,
      description: "Shown in the footer under the email",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      description: "Only links you add here will show in the footer",
      of: [
        {
          type: "object",
          name: "socialLink",
          title: "Social link",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "X (Twitter)", value: "twitter" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "TikTok", value: "tiktok" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
            prepare({ title, subtitle }) {
              const labels: Record<string, string> = {
                twitter: "X (Twitter)",
                linkedin: "LinkedIn",
                tiktok: "TikTok",
              };
              return {
                title: labels[title] || title || "Social link",
                subtitle,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer labels",
      type: "object",
      fields: [
        defineField({
          name: "linksHeading",
          title: "Links heading",
          type: "string",
          initialValue: "Quick Links",
          description: 'Heading above the nav links list (e.g. "Quick Links")',
        }),
        defineField({
          name: "contactHeading",
          title: "Contact heading",
          type: "string",
          initialValue: "Contact Us",
          description: "Heading above email / address",
        }),
        defineField({
          name: "contactButtonLabel",
          title: "Contact button label",
          type: "string",
          initialValue: "Contact Us",
          description: "Text on the footer contact button",
        }),
      ],
      options: { collapsible: true, collapsed: false },
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
