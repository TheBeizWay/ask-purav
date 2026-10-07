# ask-purav

Live: **[ask-purav-mehta.netlify.app](https://ask-purav-mehta.netlify.app)**

A career Q&A assistant for recruiters and hiring managers — interview an AI about my experience instead of reading my CV. It answers only from my career history, says when it doesn't know, and hands off to direct contact for anything important.

## How it's built

- Static front end (`index.html`) — chat UI, suggested questions, contact links. No client-side tracking.
- Netlify Function (`netlify/functions/ask-purav.js`) — calls the Claude API with my career facts and a strict ruleset, both held server-side.
- The API key stays in Netlify environment variables — never in this repo.

## Guardrails (the point of the demo)

- Answers only from the provided career history — nothing else.
- Won't share clearance status, compensation or internal tool names.
- Refers to employers generically; understated, factual tone — states what I've done, not how impressive it is.
- On-page disclaimer: answers are generated — verify anything important directly.

## Testing

The guardrails are tested against a fixed set of rule-breaking prompts, run against the live endpoint and graded against expected behaviour written beforehand. Latest run: 9 pass, 1 partial, 0 fail. Method, results and limits are in [EVALUATION.md](EVALUATION.md).

## Try it

- "What's his current role?"
- "What has he actually built with AI and automation?"
- "Why does he combine finance, audit and ICT governance?"

Everything public here is my own career history. No employer data or work products.
