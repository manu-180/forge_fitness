export const DEFAULT_HERO_VIDEO_SRC =
  "https://cdn.coverr.co/videos/coverr-a-man-working-out-1749/1080p.mp4";

export function getHeroVideoSrc(): string {
  return (
    process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim() || DEFAULT_HERO_VIDEO_SRC
  );
}
