import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroLead",
      title: "Hero Lead",
      type: "text",
      rows: 3,
      description: "Short sentence under the organisation name in the hero",
    }),
    defineField({
      name: "heroCtas",
      title: "Hero buttons",
      type: "array",
      description: "Buttons under the hero lead — each needs a label and URL",
      of: [
        {
          type: "object",
          name: "heroCta",
          title: "Button",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              description: "Internal path (e.g. /#who-we-are) or full URL",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        },
      ],
      initialValue: [
        { label: "Our approach", url: "/#who-we-are" },
        { label: "Contact us", url: "/connect" },
      ],
    }),
    defineField({
      name: "aboutEyebrow",
      title: "About Eyebrow",
      type: "string",
      description:
        'Small label above the about heading, e.g. "About the centre"',
    }),
    defineField({
      name: "aboutHeading",
      title: "About Heading",
      type: "string",
    }),
    defineField({
      name: "missionParagraphs",
      title: "Mission Paragraphs",
      type: "array",
      of: [{ type: "text" }],
      description: "Body paragraphs in the About section",
    }),
    defineField({
      name: "missionHighlight",
      title: "Mission Highlight",
      type: "text",
      description: "Emphasized closing line with a left border",
    }),
    defineField({
      name: "approachEyebrow",
      title: "Approach Eyebrow",
      type: "string",
    }),
    defineField({
      name: "approachHeading",
      title: "Approach Heading",
      type: "string",
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA Heading",
      type: "string",
    }),
    defineField({
      name: "ctaBody",
      title: "CTA Body",
      type: "text",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
