import matches from '@/data/youtube-matches.json';

export const YOUTUBE_MATCHES: Record<string, string> = matches;

export function getYouTubeMatchUrl(challengeId: string): string | undefined {
  return YOUTUBE_MATCHES[challengeId];
}

export function resolveChallengeYoutubeUrl(
  challengeId?: string,
  fallback?: string,
): string | undefined {
  if (challengeId) {
    const mapped = getYouTubeMatchUrl(challengeId);
    if (mapped) {
      return mapped;
    }
  }

  if (fallback?.includes('youtube.com') || fallback?.includes('youtu.be')) {
    return fallback;
  }

  return undefined;
}

export function getChallengePreviewImageUrl(challengeId: string): string {
  return `/previews/${challengeId}.jpg`;
}

export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&/?#]+)/i,
    /youtu\.be\/([^&/?#]+)/i,
    /youtube\.com\/shorts\/([^&/?#]+)/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

export function getYouTubeThumbnailUrl(youtubeUrl: string): string {
  const videoId = extractYouTubeVideoId(youtubeUrl);
  if (!videoId) {
    return '';
  }

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
