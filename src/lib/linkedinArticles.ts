// Fetch LinkedIn articles from a public Google Sheet via the gviz endpoint.
// Read-only. No auth required as long as the sheet is shared "Anyone with link: Viewer".

const SHEET_ID = "1eydHrnr_cl-ochHfk22czk9d-rB883TBq9FJi2CUBbI";
const GID = "345596464";

export type LinkedInArticle = {
  date: Date | null;
  dateLabel: string;
  topic: string;
  articleId: string;
  url: string | null;
};

type GvizCell = { v: unknown; f?: string } | null;
type GvizRow = { c: GvizCell[] };
type GvizCol = { id: string; label: string; type: string };
type GvizResponse = {
  status: string;
  table: { cols: GvizCol[]; rows: GvizRow[] };
};

/** Parse the "Date(yyyy,m,d)" string Google returns for date cells (month is 0-indexed). */
const parseGvizDate = (raw: unknown): Date | null => {
  if (raw instanceof Date) return raw;
  if (typeof raw !== "string") return null;
  const m = raw.match(/^Date\((\d+),(\d+),(\d+)(?:,(\d+),(\d+),(\d+))?\)$/);
  if (!m) {
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const [, y, mo, d, hh, mm, ss] = m;
  return new Date(
    Number(y),
    Number(mo),
    Number(d),
    Number(hh ?? 0),
    Number(mm ?? 0),
    Number(ss ?? 0),
  );
};

/** Convert a LinkedIn URN (urn:li:share:1234 / urn:li:activity:1234) to a feed URL. */
const urnToUrl = (articleId: string): string | null => {
  const trimmed = articleId?.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^urn:li:(share|activity|ugcPost):/i.test(trimmed)) {
    return `https://www.linkedin.com/feed/update/${trimmed}/`;
  }
  if (/^\d{10,}$/.test(trimmed)) {
    return `https://www.linkedin.com/feed/update/urn:li:share:${trimmed}/`;
  }
  return null;
};

export async function fetchLinkedInArticles(signal?: AbortSignal): Promise<LinkedInArticle[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;
  const res = await fetch(url, { signal, cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load articles (${res.status})`);
  const text = await res.text();

  // Response is wrapped: google.visualization.Query.setResponse({...});
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Unexpected sheet response format");
  const json = JSON.parse(text.slice(start, end + 1)) as GvizResponse;
  if (json.status !== "ok") throw new Error("Sheet returned non-ok status");

  const colIndex = (label: string) =>
    json.table.cols.findIndex((c) => (c.label || c.id).toLowerCase() === label.toLowerCase());

  const dateIdx = colIndex("Date");
  const topicIdx = colIndex("Topic");
  const articleIdx = colIndex("ArticleId");

  if (dateIdx === -1 || topicIdx === -1 || articleIdx === -1) {
    throw new Error("Sheet is missing required columns (Date, Topic, ArticleId)");
  }

  const articles: LinkedInArticle[] = json.table.rows
    .map((row) => {
      const dateCell = row.c[dateIdx];
      const topicCell = row.c[topicIdx];
      const articleCell = row.c[articleIdx];

      const date = parseGvizDate(dateCell?.v);
      const topic = String(topicCell?.v ?? "").trim();
      const articleId = String(articleCell?.v ?? "").trim();

      return {
        date,
        dateLabel: dateCell?.f || (date ? date.toISOString().slice(0, 10) : ""),
        topic,
        articleId,
        url: urnToUrl(articleId),
      };
    })
    .filter((a) => a.topic.length > 0);

  articles.sort((a, b) => {
    const ta = a.date?.getTime() ?? 0;
    const tb = b.date?.getTime() ?? 0;
    return tb - ta;
  });

  return articles;
}
