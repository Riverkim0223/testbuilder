import matches from '@/data/youtube-matches.json';

export const YOUTUBE_MATCHES: Record<string, string> = matches;

export function getYouTubeMatchUrl(challengeId: string): string | undefined {
  return YOUTUBE_MATCHES[challengeId];
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
