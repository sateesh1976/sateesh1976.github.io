import { Helmet } from "react-helmet-async";

const SITE = "https://sateeshsingh.lovable.app";
const DEFAULT_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fd46a50d-c947-4828-845e-dad1f666bc5b/id-preview-0dc503b3--2b82243b-b748-4001-a7ea-55cc3ab7bd6b.lovable.app-1781526040540.png";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  image?: string;
}

const SEO = ({ title, description, path, type = "website", jsonLd, image }: SEOProps) => {
  const url = `${SITE}${path}`;
  const img = image ?? DEFAULT_IMAGE;
  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {ldArray.map((schema, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  );
};

export default SEO;
