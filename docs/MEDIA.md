# Trailer assets

The website serves 1280 by 720 H.264 High Profile video at the original 24 frames
per second, with stereo AAC audio and MP4 faststart metadata. Both trailers retain
their complete picture and audio content. Only compression and resolution changed.

| Trailer | Original size | Web size | Reduction | Duration |
| --- | --- | --- | --- | --- |
| Scripted in Al Qaeda Ink | 102.86 MB | 22.80 MB | 77.8% | 82.73 seconds |
| Albatross | 61.66 MB | 12.28 MB | 80.1% | 66.09 seconds |

Sizes use decimal megabytes. Both outputs retain the original video frame counts:
1,984 for Scripted and 1,585 for Albatross. Their 1280 by 720 JPEG posters come
directly from the original trailers: the rope bridge at 54 seconds in Scripted,
and the burning boat at 52 seconds in Albatross. No cover art is composited into
the posters.

## Regeneration

Install FFmpeg with the `libx264` and AAC encoders, then run:

```sh
node scripts/optimize-media.mjs
```

This manual maintenance command restores the original inputs into a temporary
directory from Git commit `436596b13358a6c65c6743e2eb176d9644303983`, transcodes
both trailers, extracts the posters, verifies that each complete video decodes,
and replaces the public assets. It requires local Git history containing that
commit; it is not part of the website build or Vercel deployment. Outputs were
generated and reviewed with FFmpeg 8.0.

The published files are:

- `assets/scripted-in-al-qaeda-ink-trailer.mp4`
- `assets/scripted-in-al-qaeda-ink-poster.jpg`
- `assets/albatross-trailer.mp4`
- `assets/albatross-poster.jpg`

The original `assets/scripted-in-al-qaeda-ink.mp4` and `assets/Albatross.mp4` remain
recoverable in Git history and are excluded from the current deployment. After
regenerating, visually review the posters and representative video frames, check
playback and seeking, then commit the assets through the normal checked release.
