import { readFileSync } from "node:fs";

const query = process.argv.slice(2).join(" ").trim();

if (!query) {
  console.error("Usage: npm run search -- <word>");
  process.exitCode = 1;
} else {
  const { highlights } = JSON.parse(
    readFileSync(new URL("./notes/keynote-highlights.json", import.meta.url), "utf8"),
  );
  const term = query.toLocaleLowerCase();
  const matches = highlights.filter(({ title, summary }) =>
    `${title} ${summary}`.toLocaleLowerCase().includes(term),
  );

  for (const { topic, title, summary } of matches) {
    console.log(`${topic}: ${title} — ${summary}`);
  }
}
