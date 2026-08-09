import type { BlogPostMeta } from "../blog/types";
import { fieldNotesMetadata, profile, siteMetadata } from "../data/profile";

const INDEX_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const NOINDEX_ROBOTS = "noindex, nofollow";
const SITE_NAME = "ATRX07";
const LOCALE = "en_IN";

const MANAGED_NAME_KEYS = [
  "description",
  "robots",
  "googlebot",
  "twitter:card",
  "twitter:title",
  "twitter:description",
  "twitter:image",
  "twitter:image:alt",
] as const;

const MANAGED_PROPERTY_KEYS = [
  "og:title",
  "og:description",
  "og:type",
  "og:url",
  "og:site_name",
  "og:locale",
  "og:image",
  "og:image:type",
  "og:image:width",
  "og:image:height",
  "og:image:alt",
  "profile:first_name",
  "profile:last_name",
  "profile:username",
  "article:published_time",
  "article:modified_time",
  "article:tag",
] as const;

export type RouteMetaTag = {
  attribute: "name" | "property";
  key: string;
  content: string;
};

export type RouteMetadata = {
  title: string;
  canonicalUrl?: string;
  tags: RouteMetaTag[];
  structuredData?: Record<string, unknown>;
};

type ArticleMetadataOptions = {
  previewingDraft?: boolean;
};

function nameTag(key: string, content: string): RouteMetaTag {
  return { attribute: "name", key, content };
}

function propertyTag(key: string, content: string): RouteMetaTag {
  return { attribute: "property", key, content };
}

export function canonicalUrl(pathname: string) {
  return new URL(pathname.replace(/^\/+/, ""), siteMetadata.canonicalUrl).toString();
}

function assetUrl(path: string) {
  try {
    return new URL(path, siteMetadata.canonicalUrl).toString();
  } catch {
    return canonicalUrl(siteMetadata.socialImagePath);
  }
}

const socialImageUrl = assetUrl(siteMetadata.socialImagePath);

function indexableTags({
  description,
  title,
  type,
  url,
}: {
  description: string;
  title: string;
  type: "article" | "profile" | "website";
  url: string;
}) {
  return [
    nameTag("description", description),
    nameTag("robots", INDEX_ROBOTS),
    nameTag("googlebot", INDEX_ROBOTS),
    propertyTag("og:title", title),
    propertyTag("og:description", description),
    propertyTag("og:type", type),
    propertyTag("og:url", url),
    propertyTag("og:site_name", SITE_NAME),
    propertyTag("og:locale", LOCALE),
    propertyTag("og:image", socialImageUrl),
    propertyTag("og:image:type", "image/jpeg"),
    propertyTag("og:image:width", "1672"),
    propertyTag("og:image:height", "941"),
    propertyTag("og:image:alt", siteMetadata.socialImageAlt),
    nameTag("twitter:card", "summary_large_image"),
    nameTag("twitter:title", title),
    nameTag("twitter:description", description),
    nameTag("twitter:image", socialImageUrl),
    nameTag("twitter:image:alt", siteMetadata.socialImageAlt),
  ];
}

function identityGraph() {
  return [
    {
      "@type": "Person",
      "@id": `${siteMetadata.canonicalUrl}#person`,
      name: profile.name,
      givenName: "Arppith",
      familyName: "Andrews",
      alternateName: [profile.handle, profile.brand],
      url: siteMetadata.canonicalUrl,
      image: {
        "@type": "ImageObject",
        url: canonicalUrl("/atrx-portrait.jpg"),
        width: 1080,
        height: 1080,
      },
      description:
        "Engineering student, AI and automation builder, software developer, and web developer based in Kerala, India.",
      jobTitle: "Engineering Student and AI Automation Builder",
      homeLocation: { "@type": "Place", name: profile.location },
      sameAs: [profile.github, profile.instagram],
      knowsAbout: [
        "Artificial intelligence",
        "AI automation",
        "Local AI",
        "Software engineering",
        "Web development",
        "Real-time web applications",
        "Flutter",
        "Kotlin",
        "Android development",
        "Driving telemetry",
        "Rust",
        "Tauri",
        "React",
        "TypeScript",
        "Bots with persistent memory",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteMetadata.canonicalUrl}#website`,
      url: siteMetadata.canonicalUrl,
      name: "Arppith Andrews (atrx07) Portfolio",
      alternateName: SITE_NAME,
      description:
        "Portfolio of Arppith Andrews, an engineering student and AI automation builder focused on software engineering, web development, local AI, and real-time systems.",
      inLanguage: "en-IN",
      publisher: { "@id": `${siteMetadata.canonicalUrl}#person` },
    },
  ];
}

export const homePageMetadata: RouteMetadata = {
  title: siteMetadata.title,
  canonicalUrl: siteMetadata.canonicalUrl,
  tags: [
    ...indexableTags({
      title: siteMetadata.title,
      description: siteMetadata.description,
      type: "profile",
      url: siteMetadata.canonicalUrl,
    }),
    propertyTag("profile:first_name", "Arppith"),
    propertyTag("profile:last_name", "Andrews"),
    propertyTag("profile:username", profile.handle),
  ],
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      ...identityGraph(),
      {
        "@type": "ProfilePage",
        "@id": `${siteMetadata.canonicalUrl}#profile-page`,
        url: siteMetadata.canonicalUrl,
        name: siteMetadata.title,
        description: "The official portfolio and project profile of Arppith Andrews (atrx07).",
        dateModified: siteMetadata.lastModified,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${siteMetadata.canonicalUrl}#website` },
        mainEntity: { "@id": `${siteMetadata.canonicalUrl}#person` },
        about: { "@id": `${siteMetadata.canonicalUrl}#person` },
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${siteMetadata.canonicalUrl}#software-traelyx`,
        name: "Traelyx",
        description:
          "An open-source, local-first Android driving telemetry and driver intelligence platform with an M0-validated Flutter, Drift, and Kotlin foundation.",
        codeRepository: "https://github.com/atrx07/Traelyx",
        programmingLanguage: ["Dart", "Kotlin"],
        runtimePlatform: "Android",
        creativeWorkStatus: "Active development",
        author: { "@id": `${siteMetadata.canonicalUrl}#person` },
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${siteMetadata.canonicalUrl}#software-neuraloc`,
        name: "NeuraLoc-Core",
        description:
          "Privacy-first Windows software for discovering, managing, and running local GGUF models through verified native inference engines.",
        codeRepository: "https://github.com/atrx07/NeuraLoc-Core",
        programmingLanguage: ["TypeScript", "Rust"],
        runtimePlatform: "Windows",
        creativeWorkStatus: "Active development",
        author: { "@id": `${siteMetadata.canonicalUrl}#person` },
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${siteMetadata.canonicalUrl}#software-void-chat`,
        name: "void.chat",
        description:
          "A real-time global chatroom using Cloudflare Workers, Durable Objects, D1, WebSockets, and Firebase authentication.",
        codeRepository: "https://github.com/atrx07/void-chat",
        programmingLanguage: ["TypeScript", "JavaScript"],
        creativeWorkStatus: "Shipped",
        author: { "@id": `${siteMetadata.canonicalUrl}#person` },
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${siteMetadata.canonicalUrl}#software-styleforge`,
        name: "StyleForge Lite",
        description:
          "A mobile-first Yamaha arranger style sketchpad combining browser audio, MIDI, binary formats, and real-hardware testing.",
        codeRepository: "https://github.com/atrx07/styforge",
        programmingLanguage: ["TypeScript", "JavaScript"],
        creativeWorkStatus: "Experimental",
        author: { "@id": `${siteMetadata.canonicalUrl}#person` },
      },
    ],
  },
};

export const blogIndexMetadata: RouteMetadata = {
  title: fieldNotesMetadata.title,
  canonicalUrl: canonicalUrl("/blog"),
  tags: indexableTags({
    title: fieldNotesMetadata.title,
    description: fieldNotesMetadata.description,
    type: "website",
    url: canonicalUrl("/blog"),
  }),
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      ...identityGraph(),
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl("/blog")}#collection-page`,
        url: canonicalUrl("/blog"),
        name: fieldNotesMetadata.title,
        description: fieldNotesMetadata.description,
        dateModified: fieldNotesMetadata.launchedAt,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${siteMetadata.canonicalUrl}#website` },
        about: { "@id": `${siteMetadata.canonicalUrl}#person` },
        author: { "@id": `${siteMetadata.canonicalUrl}#person` },
      },
    ],
  },
};

export function articlePageMetadata(meta: BlogPostMeta, options: ArticleMetadataOptions = {}): RouteMetadata {
  if (options.previewingDraft || meta.status === "draft") {
    return noindexPageMetadata({
      title: `Draft preview: ${meta.title} | ATRX Field Notes`,
      description: meta.description,
    });
  }

  const url = meta.canonicalUrl ?? canonicalUrl(`/blog/${meta.slug}`);
  const imageUrl = meta.cover ? assetUrl(meta.cover.src) : socialImageUrl;
  const imageAlt = meta.cover?.alt ?? siteMetadata.socialImageAlt;
  const tags = indexableTags({ title: `${meta.title} | ATRX Field Notes`, description: meta.description, type: "article", url })
    .map((tag) => {
      if ((tag.key === "og:image" || tag.key === "twitter:image") && imageUrl) return { ...tag, content: imageUrl };
      if ((tag.key === "og:image:alt" || tag.key === "twitter:image:alt") && imageAlt) return { ...tag, content: imageAlt };
      return tag;
    });

  tags.push(propertyTag("article:published_time", meta.publishedAt));
  if (meta.updatedAt) tags.push(propertyTag("article:modified_time", meta.updatedAt));
  tags.push(...meta.tags.map((tag) => propertyTag("article:tag", tag)));

  return {
    title: `${meta.title} | ATRX Field Notes`,
    canonicalUrl: url,
    tags,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "@id": `${url}#article`,
      url,
      headline: meta.title,
      description: meta.description,
      datePublished: meta.publishedAt,
      ...(meta.updatedAt ? { dateModified: meta.updatedAt } : {}),
      image: imageUrl,
      keywords: meta.tags,
      inLanguage: "en-IN",
      mainEntityOfPage: url,
      author: { "@id": `${siteMetadata.canonicalUrl}#person`, name: profile.name },
      isPartOf: { "@id": `${siteMetadata.canonicalUrl}#website` },
      ...(meta.repositoryUrl ? { sameAs: meta.repositoryUrl } : {}),
    },
  };
}

export function noindexPageMetadata({ title, description }: { title: string; description: string }): RouteMetadata {
  return {
    title,
    tags: [
      nameTag("description", description),
      nameTag("robots", NOINDEX_ROBOTS),
      nameTag("googlebot", NOINDEX_ROBOTS),
    ],
  };
}

function syncMetaTags(attribute: "name" | "property", key: string, values: string[]) {
  const existing = [...document.head.querySelectorAll<HTMLMetaElement>(`meta[${attribute}="${key}"]`)];

  values.forEach((content, index) => {
    const element = existing[index] ?? document.createElement("meta");
    element.setAttribute(attribute, key);
    element.content = content;
    if (!element.isConnected) document.head.append(element);
  });

  existing.slice(values.length).forEach((element) => element.remove());
}

export function serializeStructuredData(value: Record<string, unknown>) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function applyPageMetadata(metadata: RouteMetadata) {
  document.title = metadata.title;

  for (const key of MANAGED_NAME_KEYS) {
    syncMetaTags(
      "name",
      key,
      metadata.tags.filter((tag) => tag.attribute === "name" && tag.key === key).map((tag) => tag.content),
    );
  }
  for (const key of MANAGED_PROPERTY_KEYS) {
    syncMetaTags(
      "property",
      key,
      metadata.tags.filter((tag) => tag.attribute === "property" && tag.key === key).map((tag) => tag.content),
    );
  }

  const canonicals = [...document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]')];
  if (metadata.canonicalUrl) {
    const canonical = canonicals[0] ?? document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = metadata.canonicalUrl;
    if (!canonical.isConnected) document.head.append(canonical);
    canonicals.slice(1).forEach((element) => element.remove());
  } else {
    canonicals.forEach((element) => element.remove());
  }

  const structuredScripts = [
    ...document.head.querySelectorAll<HTMLScriptElement>('script[data-route-structured-data]'),
  ];
  if (metadata.structuredData) {
    const script = structuredScripts[0] ?? document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.routeStructuredData = "";
    script.textContent = serializeStructuredData(metadata.structuredData);
    if (!script.isConnected) document.head.append(script);
    structuredScripts.slice(1).forEach((element) => element.remove());
  } else {
    structuredScripts.forEach((element) => element.remove());
  }
}
