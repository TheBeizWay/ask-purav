# Ask Purav

A career Q&A assistant for recruiters and selection panels. Instead of reading a CV, they ask questions and get short, factual answers drawn only from my career history.

**Live:** [ask-purav-mehta.netlify.app](https://ask-purav-mehta.netlify.app)

## Why it exists

Recruiters ask the same dozen questions about every candidate: current role, leadership, tools, qualifications, availability. This answers them consistently, at any hour, and links back to me for anything it shouldn't handle.

## How it works

```
Browser (index.html)  ──POST question + last 2 exchanges──▶  Netlify Function (ask-purav.js)
                                                                 │  system prompt: career facts,
                                                                 │  prepared answers, strict rules
                                                                 ▼
                                                           Claude API (Haiku)
```

- **One static page, one serverless function.** The API key lives in Netlify environment variables, never in the browser or the repo.
- **Grounded answers.** The model answers only from the facts and prepared answers in the system prompt. Anything outside them gets "I don't have that detail" and a pointer to email or LinkedIn.
- **Prepared answers** for the common questions (leadership, tools, certifications, availability), so the important answers are consistent rather than freshly generated each time.

## Guardrails

The point of the build is what it won't do as much as what it will:

- Won't state or estimate salary, day rate or age.
- Won't discuss security clearance, citizenship or visa history, and says so plainly.
- Won't name internal government tools or systems, or the specific agency.
- Won't give a phone number, address or personal details.
- Refers to its own limits instead of inventing an answer, including when a question claims to be "a test".

Cost and abuse controls: a per-IP rate limit (10 questions an hour), a 2,000-character question cap, only the last two exchanges sent as context, and short answers. A monthly spend cap in the Anthropic Console is the backstop.

## Run it yourself

1. Fork the repo and connect it to Netlify (no build step: `publish = "."`, functions in `netlify/functions`).
2. Add `ANTHROPIC_API_KEY` under Site settings → Environment variables.
3. Set a monthly spend limit in the Anthropic Console before going live.
4. Replace the career facts and prepared answers in `netlify/functions/ask-purav.js` with your own.

## Caveats

- Answers are generated. They're constrained to the facts provided, but anything important should be confirmed directly.
- The rate limit is per serverless instance, so it slows bursts rather than guaranteeing a hard cap. The spend limit is the real backstop.

Built by [Purav Mehta](https://thebeizway.com.au), CA · GAICD.
