# Vercel deployment

The author website remains a static HTML, CSS and JavaScript site. Vercel builds a
dedicated `dist/` directory from the explicit publishing list in
`scripts/public-files.mjs`. Source documents, Netlify configuration, development
tools and credentials are never copied into that directory. The historical
`netlify.toml` and `_redirects` files are retained for reference only.

## Local checks

Use Node.js 24, then run:

```sh
npm ci --ignore-scripts
npm run verify
```

This checks local asset paths (including filename case), cross-page anchors,
JavaScript syntax and formatting in deployment tooling; runs focused migration
tests; and builds the public output. The pinned `parse5` development dependency
parses HTML for build-time checks. The pinned `@vercel/og` development dependency
renders the social-preview image and favicon when `npm run social:preview` is
run manually; commit those generated PNG files after visual review. The images
are served as static assets, with no image-generation function or runtime
rendering cost. No npm dependencies ship to the browser.
Add new public files to `scripts/public-files.mjs` when adding website content.

## Git-connected release

Import `Mreoch1/GTReoch-Author-Website` into Vercel with the repository root as its
root directory and the **Other** framework preset. The version-controlled
configuration supplies the install command, build command and `dist` output.
Use `main` as the production branch. Keep Vercel's automatic system environment
variables enabled so `VERCEL_GIT_COMMIT_SHA` identifies the deployed commit.

Protect `main` with a pull request requirement and require these checks before
merging, where repository permissions and the GitHub plan permit it:

- `Website quality`
- `CodeQL JavaScript`
- `CodeQL`
- `Vercel`

Review a Vercel branch preview before merging. Merging the checked pull request
triggers the production deployment through the Git integration. No deployment
token or manual production upload is required.

## Routes, caching and verification

Existing `.html` links remain valid. `/behind-the-scenes` still serves the
interview page, while `/launch.html` permanently redirects to `/`. Unknown paths
return a proper 404. Security headers deny framing, prevent content sniffing and
limit referrer information. Pages, CSS and JavaScript revalidate on each use;
media caches for one hour because its existing filenames are not fingerprinted.

After deployment, compare the `commit` value at `/version.json` (also available at
`/version`, `/health.json` and `/health`) with the full `main` Git commit SHA. These
responses disable caching. Check the home page, interview page, legal pages,
mobile navigation, book links, audio playback, trailer playback and HTTP range
requests for media. This public static site has no authenticated workflows.

The current public origin is `https://gtreoch-author-website.vercel.app` while
`gtreoch.com` is unavailable. Search metadata, social previews and crawler files
use that working origin. The shared preview image is the committed 1200 by 630
PNG at `assets/social-preview.png`; it must remain in the publishing list.

After registering and attaching `gtreoch.com` and `www.gtreoch.com`, apply the
exact DNS records requested by Vercel at the current DNS provider, preserve
unrelated email and verification records, and verify both HTTPS hostnames. Then
change the public origin to `https://gtreoch.com` in these files together:

- `index.html`: canonical, Open Graph, Twitter and structured-data URLs.
- `behind-the-scenes.html`: canonical, Open Graph and Twitter URLs.
- `privacy-policy.html`, `terms-conditions.html`, `cookie-policy.html` and
  `launch.html`: canonical URL.
- `sitemap.xml` and `robots.txt`: crawler URLs.
- `tests/metadata.test.mjs`: expected public origin.
- `README-GT-Reoch.md` and this deployment guide: published-site address.

Run `npm run verify`, release through the checked pull request, and confirm the
preview PNG and page metadata are publicly accessible on the new domain. Keep
`gtreoch.com` as the canonical hostname once that cutover is verified.

Official references: [Vercel project configuration](https://vercel.com/docs/project-configuration/vercel-json)
and [GitHub CodeQL workflow configuration](https://docs.github.com/en/code-security/reference/code-scanning/workflow-configuration-options).

The current `scripted-in-al-qaeda-ink-cover.jpg` is the cover displayed on the
[Amazon Kindle listing](https://www.amazon.com/dp/B0F4G1J2Q8), verified September 28, 2026.
The original cover remains available in Git history. The site and sharing card
use the current cover consistently.
