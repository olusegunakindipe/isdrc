import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    shortName,
    fullName,
    tagline,
    description,
    contactEmail,
    physicalAddress,
    socialLinks[]{
      platform,
      url
    },
    footer{
      linksHeading,
      contactHeading,
      contactButtonLabel
    },
    "logoUrl": logo.asset->url
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    heroLead,
    heroCtas[]{
      label,
      url
    },
    aboutEyebrow,
    aboutHeading,
    missionParagraphs,
    missionHighlight,
    approachEyebrow,
    approachHeading,
    ctaHeading,
    ctaBody,
    "heroImageUrl": heroImage.asset->url
  }
`;

export const approachPillarsQuery = groq`
  *[_type == "approachPillar"] | order(order asc) {
    _id,
    title,
    body,
    order
  }
`;

export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    order,
    "photoUrl": photo.asset->url
  }
`;

export const advisoryMembersQuery = groq`
  *[_type == "advisoryMember"] | order(order asc) {
    _id,
    name,
    affiliation,
    bio,
    order,
    "photoUrl": photo.asset->url
  }
`;

export const partnersQuery = groq`
  *[_type == "partner"] | order(order asc) {
    _id,
    name,
    description,
    url,
    order,
    "logoUrl": logo.asset->url
  }
`;

export const eventsQuery = groq`
  *[_type == "event"] | order(startDate desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    startDate,
    location,
    externalUrl,
    "imageUrl": image.asset->url
  }
`;

export const connectPageQuery = groq`
  *[_type == "connectPage"][0]{
    title,
    intro,
    "heroImageUrl": heroImage.asset->url
  }
`;

export const teamPageQuery = groq`
  *[_type == "teamPage"][0]{
    title,
    intro,
    "heroImageUrl": heroImage.asset->url
  }
`;

export const advisoryPageQuery = groq`
  *[_type == "advisoryPage"][0]{
    title,
    intro,
    "heroImageUrl": heroImage.asset->url
  }
`;

export const partnershipsPageQuery = groq`
  *[_type == "partnershipsPage"][0]{
    title,
    intro,
    "heroImageUrl": heroImage.asset->url
  }
`;

export const publicationsPageQuery = groq`
  *[_type == "publicationsPage"][0]{
    title,
    intro,
    listHeading,
    "heroImageUrl": heroImage.asset->url,
    items[]{
      title,
      externalUrl,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename
    }
  }
`;

export const eventsPageQuery = groq`
  *[_type == "eventsPage"][0]{
    title,
    intro,
    "heroImageUrl": heroImage.asset->url
  }
`;
