# Sketchbook entries

Each daily design exercise is one `.mdx` file in this folder. See
`CONTENT_GUIDE.md` (section 4) for the full guide — quick reference below.

## Frontmatter

```yaml
---
title: "Contrast pass on a card component"
date: "2026-09-10"
discipline: "UI/UX"
image: "/sketchbook/2026-09-10-card-contrast.png"
takeaway: "Bumping border weight instead of adding shadow kept it inside the neo-brutalist system."
---
```

| Field        | Required | Description                                                        |
|--------------|----------|----------------------------------------------------------------------|
| `title`      | Yes      | Short label for the entry.                                          |
| `date`       | Yes      | ISO date (`YYYY-MM-DD`). Controls sort order (newest first).        |
| `discipline` | Yes      | Tag shown on the card. Also used for filtering — reuse existing tags. |
| `image`      | Yes      | Path to the exported image/screenshot, placed in `public/sketchbook/`. |
| `takeaway`   | Yes      | One sentence — what you tried or learned. Shown on the card.        |

Anything written below the frontmatter (plain text or MDX) is optional and
shows as an expanded note when someone opens the entry in the lightbox —
use it if a sketch needs a bit more context than the one-line takeaway.

This file (`README.md`) is not picked up as an entry — only `.mdx` files
in this folder are.
