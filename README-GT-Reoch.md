# G.T. Reoch author website

[Live website](https://gtreoch-author-website.vercel.app/)

A static author website for *Scripted in Al Qaeda Ink* and *Albatross: A Paul
Banter Story*. Both covers and Amazon links appear in the opening section.
Short introductions lead to expandable full synopses, chapter audio, trailers,
beta-reader quotes and a biography based on the author's interview.

## Files and content

- `index.html`: books, samples, trailers, reader quotes and biography.
- `home-styles.css`: homepage layout and responsive styles.
- `gt-reoch-styles.css`: shared navigation, typography, interview and policy pages.
- `gt-reoch-script.js`: mobile navigation and synchronized podcast controls.
- `behind-the-scenes.html`: author interview and a NotebookLM-generated book discussion.
- `privacy-policy.html`, `cookie-policy.html`, `terms-conditions.html`: site policies.
- `assets/`: current covers, author photo, social preview, favicon and native media.
- `scripts/public-files.mjs`: the explicit list of files allowed into the published build.

Edit short introductions and full `<details>` synopses together when book content
changes. Preserve section IDs because existing links use them. The biography
should reflect the author's own account in the interview. Amazon links lead to
external checkout; the website has no accounts, forms or newsletter signup.

The shared preview at `assets/social-preview.png` uses both current covers.
Regenerate it with `npm run social:preview` after an approved cover change and
visually review the result before committing it.

## Media and accessibility

Both trailers are complete 720p H.264/AAC videos with streaming metadata at the
start of each file. Real trailer frames provide the poster images. Media uses
native browser controls and loads on demand; direct download links remain
available. Historical trailer URLs redirect to their replacements.

See [media preparation and verification](docs/MEDIA.md) for sizes, quality checks
and the repeatable FFmpeg command. Source trailers remain in Git history.

Links, synopses and native media controls work without JavaScript. Mobile
navigation supports keyboard focus and Escape; reduced-motion preferences
turn off smooth scrolling and transitions. The former consent popup is removed:
no browser analytics or advertising tracking is enabled. The policy pages
explain hosting, font requests, email links and external purchases.

## Development and deployment

Use Node.js 24:

```sh
npm ci --ignore-scripts
npm run verify
```

Checks cover public asset paths, cross-page anchors, JavaScript syntax, metadata,
legacy routes and publishing isolation. The production build copies allowlisted
files into `dist/`; private documents, configuration and tooling stay outside it.
No npm dependencies ship to the browser.

Production deploys through Vercel's Git integration after the protected `main`
branch receives a checked pull request. Review the branch preview before merging.
See [Vercel release instructions](docs/VERCEL.md) for required checks and production
commit verification. Historical Netlify configuration is retained for reference.
The Vercel address remains the public origin until a domain change is requested.
