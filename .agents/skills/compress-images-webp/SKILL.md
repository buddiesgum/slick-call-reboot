---
name: compress-images-webp
description: Compress raster images (PNG/JPEG) to web-optimized WebP using
  cwebp at quality 85 with a 2048px max dimension, preserving aspect ratio
  and only downscaling when needed. Use this skill whenever the user asks
  to compress, optimize, shrink, or convert images to webp, mentions that
  images are too large or slow to load, wants assets to match a CMS's
  webp transformation profile (Sveltia, Decap, Netlify CMS, etc.), or is
  about to commit large PNG/JPEG files to a repo. Also handles reference
  updates (.png/.jpg to .webp) in content JSON, Markdown, and hard-coded
  CSS/Tailwind url() strings. Do NOT suggest @squoosh/cli -- it is archived
  and broken on Node 17+.
---

# Compress Images to WebP

A recipe for converting raster images to web-optimized WebP and updating
references, matching the quality/size profile used by most modern CMSs
and static-site tooling.

## When to use

- "compress these images", "optimize png", "convert to webp"
- "images are too big", "slow page load", "shrink these files"
- User wants seed/asset images to match a CMS's webp profile
  (Sveltia CMS default: quality 85, max 2048×2048 — this skill matches it)
- User is about to commit or deploy large PNG/JPEG files to a Git repo

## Default profile

| Setting | Value       | Rationale                                                   |
| ------- | ----------- | ----------------------------------------------------------- |
| Quality | 85          | Sweet spot: below 80 photos show blocking artifacts;        |
|         |             | above 90, file-size gains are poor.                         |
| Max dim | 2048px      | Covers retina desktop (1024pt × 2) without wasting bytes.   |
|         |             | Applied to the longer axis only.                            |
| Resize  | Conditional | Only when a dimension exceeds max. Never upscales.          |
| Threads | -mt         | Multi-core encode, faster on modern hardware.               |
| Alpha   | default     | cwebp preserves transparency automatically; no flag needed. |

## Why cwebp, not Squoosh or Sharp

- `@squoosh/cli` is archived by Google (2022), broken on Node 17+, and a
  supply-chain liability. Do not suggest it.
- `cwebp` is the reference encoder from the libwebp team: native binary,
  fast, actively maintained, zero npm dependency.
- `sharp` is a good programmatic alternative when building a JS/TS pipeline.
  For a one-shot compression task, cwebp is simpler and more reliable.

Install cwebp: `brew install webp` (ships `cwebp`, `dwebp`, `gif2webp`).

## Workflow

### 1. Preflight

```bash
command -v cwebp || brew install webp
```

### 2. Identify inputs

Confirm scope with the user if ambiguous — a single file, one folder, or
recursive across the whole repo. For content images, the target is usually
one directory.

### 3. Compress

Use the bundled script:

```bash
.agents/skills/compress-images-webp/scripts/compress.sh <path-or-glob> [quality] [max-dim]
```

Defaults: quality 85, max-dim 2048. The script:

- Detects dimensions via `sips` (macOS) — only resizes when a dimension
  exceeds the max, and resizes the _longer_ axis so both landscape and
  portrait are handled correctly
- Writes sibling `.webp` files alongside the originals (does NOT delete them)
- Validates each output is non-empty before reporting success
- Exits non-zero if any file fails, so the caller knows before deleting

### 4. Delete originals

Only after the script exits 0 (all files written successfully):

```bash
find <dir> \( -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' \) -delete
```

### 5. Update references

Content files, Markdown, CSS/Tailwind `bg-[url(...)]`, JSX imports, and
JSON config can all hold old filenames. Find them:

```bash
rg '\.(png|jpe?g)' <content-dirs> <src-dirs>
```

Use precise edit tools (Read + Edit) rather than a global sed — you risk
clobbering unrelated strings (e.g. test fixtures, external URLs, comments).

### 6. Verify

```bash
rg '\.(png|jpe?g)' <scope>      # expect zero matches
pnpm check                       # or your project's typecheck command
pnpm build                       # confirm SSG/build still passes
```

Spot-check size reduction: expect 5–10× for photos, 2–5× for screenshots
and UI mocks.

## Common pitfalls

- **Animated images**: cwebp does NOT handle APNG or GIF. Use `gif2webp`
  (also in the webp Homebrew package) for GIFs; handle APNGs case-by-case.
- **Tailwind arbitrary values**: `bg-[url('/path/to/img.png')]` strings are
  a frequent blind spot for file-rename search-replace — grep them explicitly.
- **Portrait images**: naive `-resize 2048 0` is width-only and can produce
  wrong results for portraits. The bundled script picks the longer axis.
- **SVGs**: out of scope for this skill; use `svgo` separately.
- **Lossless mode**: if the user explicitly needs lossless (logos with flat
  color, technical diagrams), use `cwebp -lossless` directly; skip quality.
- **Linux**: `sips` is macOS-only. On Linux, replace `sips` in compress.sh
  with `identify -format '%w %h'` from ImageMagick.

## Customizing the profile

When the user asks for a different target:

| Use case             | Quality | Max dim |
| -------------------- | ------- | ------- |
| Hero banners / print | 90      | 4096    |
| Standard web content | 85      | 2048    |
| Mobile-first assets  | 82      | 1024    |
| Thumbnails           | 80      | 512     |

Pass as args: `compress.sh <dir> 90 4096`
