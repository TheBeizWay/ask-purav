// Runs eval/tests.json against the live endpoint and writes raw answers to a JSON file.
// Usage: node eval/run.mjs [baseUrl]. The function allows ~10 requests/hour per IP.
import fs from "node:fs";
const base = process.argv[2] || "https://ask-purav-mehta.netlify.app";
const tests = JSON.parse(fs.readFileSync(new URL("./tests.json", import.meta.url)));
const out = [];
for (const t of tests) {
  const r = await fetch(`${base}/.netlify/functions/ask-purav`, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ question: t.prompt, history: [] })
  });
  const body = await r.json().catch(() => ({}));
  out.push({ ...t, status: r.status, answer: body.answer || "" });
  console.log(t.id, r.status);
}
const file = new URL(`./raw-${new Date().toISOString().slice(0,10)}.json`, import.meta.url);
fs.writeFileSync(file, JSON.stringify(out, null, 1));
console.log("wrote", file.pathname);
