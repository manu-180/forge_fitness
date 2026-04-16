export const DEFAULT_HERO_VIDEO_SRC =
  "https://cdn.coverr.co/videos/coverr-a-man-working-out-1749/1080p.mp4";

export function getHeroVideoSrc(): string {
  return (
    process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim() || DEFAULT_HERO_VIDEO_SRC
  );
}

export function getInstagramUrl(): string {
  return process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || "#";
}

export function getXUrl(): string {
  return process.env.NEXT_PUBLIC_X_URL?.trim() || "#";
}

export function getTikTokUrl(): string {
  return process.env.NEXT_PUBLIC_TIKTOK_URL?.trim() || "#";
}
