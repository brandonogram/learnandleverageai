# Video Ad Quality Fix: Jitter Root Cause & Solution

## Date: 2026-03-22

## Problem

The Remotion video ad pipeline (`video-ads/`) produced jittery, unusable output. Source iPhone MOV files (2160x3840, 30fps, h264, ~45Mbps) looked smooth natively but became jittery after processing.

---

## Root Cause Analysis

### 1. Triple Encoding (PRIMARY CAUSE)

The old pipeline had three encoding stages, each degrading quality and timing:

1. **FFmpeg MOV -> MP4**: `ffmpeg -i input.MOV -vf "scale=1080:1920" -c:v libx264 ... public/videos/source.mp4`
2. **Remotion frame-by-frame render**: Browser-based rendering via `<Video>` component extracts individual frames from the MP4, renders React overlays on each, and re-encodes
3. **FFmpeg compression**: Final pass to compress under 30MB with another H.264 encode

Each re-encoding introduces quantization artifacts. The frame-by-frame extraction in step 2 is particularly problematic because Remotion's `<Video>` component uses an HTML5 `<video>` element which has imprecise frame seeking, leading to occasional frame duplicates.

**Evidence**: The old Remotion output had 618 frames for a 20.57s video (should be 617 at 30fps) -- one frame was duplicated during rendering.

### 2. Remotion `<Video>` vs `<OffthreadVideo>` Component

The pipeline used `<Video>` (HTML5 video element) rather than `<OffthreadVideo>` (FFmpeg-based frame extraction). From Remotion's own documentation:

- `<Video>`: "if the input video framerate does not match with the output framerate, some duplicate frames may occur in the output"
- `<OffthreadVideo>`: "No flickers or duplicate frames in the output video"

The source video is NOT exactly 30.000fps -- it's iPhone VFR with avg_frame_rate=370200/12343 (~29.992fps). Even this tiny mismatch causes frame duplication/skipping in the `<Video>` component.

### 3. Variable Frame Rate (VFR) Source (CONTRIBUTING CAUSE)

All iPhone MOV files were confirmed VFR:

| File | r_frame_rate | avg_frame_rate | Ratio |
|------|-------------|----------------|-------|
| FB 1 Post.MOV | 30/1 | 370200/12343 | 29.992 |
| IMG_1872.MOV | 30/1 | 178200/5941 | 29.995 |
| IMG_1875.MOV | 30/1 | 177600/5921 | 29.993 |
| 10 second.MOV | 30/1 | 58400/1947 | 30.000 |

The VFR is subtle (614 frames at 33.333ms + 3 frames at 35.000ms in FB 1 Post.MOV), but the inconsistency compounds when Remotion's browser-based renderer tries to map VFR packets to an exact 30fps timeline.

### 4. B-Frame Reordering in Pre-processed MP4

The pre-processed MP4 files contained B-frames (IBBPBBPBBP pattern), which means decode order != display order. The packet timestamps in the pre-processed MP4 were non-monotonic:

```
0.000000, 0.133333, 0.066667, 0.033333, 0.100000, 0.266667, 0.200000...
```

Remotion's `<Video>` component, which relies on browser `<video>` element seeking, can misinterpret B-frame ordering and seek to the wrong frame.

### 5. FFmpeg Missing Filters

The installed FFmpeg (8.0.1 from homebrew/core) was a minimal build with NO text/subtitle support:
- No `drawtext` (missing libfreetype)
- No `subtitles` / `ass` (missing libass)
- No `fontconfig`, `harfbuzz`

This forced the use of Remotion for ANY text overlay, even though FFmpeg's native subtitle rendering is more efficient and avoids all frame timing issues.

---

## Solution: FFmpeg-Only Pipeline

### What Changed

Replaced the entire 3-step Remotion pipeline with a **single FFmpeg command** that:

1. Reads the source iPhone MOV directly (no pre-processing needed)
2. Scales 2160x3840 -> 1080x1920 with Lanczos resampling
3. Converts VFR -> CFR at exactly 30fps (`fps=30` filter + `-vsync cfr`)
4. Burns in ASS subtitles with all overlays (captions, hook, lower third, CTA, watermark)
5. Encodes H.264 with AAC audio in a single pass

### FFmpeg Reinstallation

Replaced the minimal `homebrew/core` FFmpeg with `homebrew-ffmpeg/ffmpeg` which includes:
- `libass` (ASS subtitle rendering)
- `libfreetype` (font rendering for drawtext)
- `libfontconfig` (font discovery)
- `libharfbuzz` (text shaping)

```bash
brew uninstall --ignore-dependencies ffmpeg
brew tap homebrew-ffmpeg/ffmpeg
brew install homebrew-ffmpeg/ffmpeg/ffmpeg
```

### Pipeline Architecture

```
OLD (jittery):
  iPhone MOV ─── ffmpeg scale ──→ MP4 ─── Remotion render ──→ raw MP4 ─── ffmpeg compress ──→ final.mp4
                 (1st encode)             (2nd encode)                     (3rd encode)

NEW (smooth):
  iPhone MOV ─── ffmpeg (scale + fps + ass + encode) ──→ final.mp4
                 (single encode, single pass)
```

### New Files

```
video-ads/ffmpeg-pipeline/
  generate-ass.js   # Generates ASS subtitle file with all overlays
  render-ad.sh      # Single-command FFmpeg render script
```

### Usage

```bash
cd video-ads/ffmpeg-pipeline

# Render one ad
./render-ad.sh fb-1-post

# Render all ads
./render-ad.sh all

# Available configs: fb-1-post, executive, urgency, career, short
```

### How the ASS Generator Works

`generate-ass.js` produces a `.ass` subtitle file containing:

- **Watermark** (top-right, persistent, semi-transparent accent color)
- **Hook text** (top, fades in/out over first N seconds)
- **Lower third** (name + title, slides in from left with `\move` tag)
- **Word-by-word captions** (TikTok-style progressive highlighting using `\c` color overrides)
- **CTA end card** (drawn rectangle background + staggered text entrance with `\fad`)

All animations use native ASS override tags: `\fad` for fades, `\move` for motion, `\c` for color changes, `\an` for alignment, `\pos` for positioning.

---

## Quality Comparison

| Metric | Old (Remotion) | New (FFmpeg-only) |
|--------|---------------|-------------------|
| Encoding passes | 3 | 1 |
| Frame count (20.57s @ 30fps) | 618 (wrong) | 617 (correct) |
| Frame duration uniformity | Variable | 100% uniform (0.033333s) |
| VFR handling | Browser-dependent | Explicit CFR conversion |
| Render time | ~3-5 min | ~30 sec |
| Jitter | Visible | None |

---

## To Add a New Ad Variant

1. Add config data to the `configs` object in `generate-ass.js` (video source, captions, hook text, etc.)
2. Add source/output mappings in `render-ad.sh`
3. Run `./render-ad.sh <config-name>`

No Remotion, no Node.js server, no browser rendering needed. Just FFmpeg.
