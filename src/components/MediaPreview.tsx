'use client';

import { useMemo, useState } from 'react';
import { YouTubeEmbed } from 'react-social-media-embed';
import { getYouTubeMatchUrl, getYouTubeThumbnailUrl } from '@/utils/youtubeMatches';

interface MediaPreviewProps {
  url?: string;
  youtubeUrl?: string;
  challengeId?: string;
  title?: string;
  emoji?: string;
  previewImageUrl?: string;
  previewVideoUrl?: string;
}

export default function MediaPreview({
  url,
  youtubeUrl,
  challengeId,
  title,
  emoji = '🎬',
  previewImageUrl,
  previewVideoUrl,
}: MediaPreviewProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const resolvedYoutubeUrl =
    youtubeUrl ?? (challengeId ? getYouTubeMatchUrl(challengeId) : undefined);

  const videoSrc = previewVideoUrl ?? (challengeId ? `/previews/${challengeId}.mp4` : undefined);
  const imageSrc =
    previewImageUrl ??
    (resolvedYoutubeUrl ? getYouTubeThumbnailUrl(resolvedYoutubeUrl) : undefined) ??
    (challengeId ? `/previews/${challengeId}.jpg` : undefined);

  const isInstagramAudio = url?.includes('/audio/') || url?.includes('/popular/');
  const isInstagram = url?.includes('instagram.com') && !isInstagramAudio;

  const externalLabel = useMemo(() => {
    if (isInstagram) return 'Instagram에서 릴스 보기 ↗';
    return '원본 영상 보기 ↗';
  }, [isInstagram]);

  if (!url && !resolvedYoutubeUrl) {
    return (
      <div className="w-full h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center border border-slate-200">
        <span className="text-slate-400 font-bold text-sm">등록된 영상이 없습니다</span>
      </div>
    );
  }

  if (resolvedYoutubeUrl) {
    return (
      <div className="w-full flex flex-col items-center gap-3">
        <div className="w-full flex justify-center bg-white rounded-2xl overflow-hidden border border-slate-100">
          <YouTubeEmbed url={resolvedYoutubeUrl} width="100%" />
        </div>
        <div className="flex w-full flex-col gap-2">
          {url && url.includes('instagram.com') && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              {isInstagramAudio ? 'Instagram에서 열기 ↗' : externalLabel}
            </a>
          )}
          <a
            href={resolvedYoutubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-xs font-bold text-pink-600 hover:text-pink-700"
          >
            YouTube에서 보기 ↗
          </a>
        </div>
      </div>
    );
  }

  const showVideo = Boolean(videoSrc) && !videoFailed;
  const showImage = Boolean(imageSrc) && !imageFailed && !showVideo;

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm">
      {showVideo ? (
        <div className="relative aspect-[9/16] max-h-[420px] w-full bg-black">
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
            onError={() => setVideoFailed(true)}
          />
          {url && <PreviewOverlay url={url} label={externalLabel} />}
        </div>
      ) : showImage ? (
        <div className="relative aspect-[9/16] max-h-[420px] w-full bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={title ? `${title} 미리보기` : '챌린지 미리보기'}
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
          />
          {url && <PreviewOverlay url={url} label={externalLabel} />}
        </div>
      ) : (
        <FallbackPoster url={url} title={title} emoji={emoji} label={externalLabel} />
      )}

      {(showVideo || showImage) && title && (
        <div className="border-t border-slate-100 px-3 py-2">
          <p className="text-sm font-bold text-slate-800 line-clamp-2">{title}</p>
          <p className="mt-1 text-[11px] text-slate-400">미리보기 · 탭하면 원본으로 이동</p>
        </div>
      )}
    </div>
  );
}

function PreviewOverlay({ url, label }: { url: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4"
    >
      <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm text-xl text-white">
        ▶
      </span>
      <span className="rounded-xl bg-white/95 px-4 py-2 text-xs font-bold text-slate-900">
        {label}
      </span>
    </a>
  );
}

function FallbackPoster({
  url,
  title,
  emoji,
  label,
}: {
  url?: string;
  title?: string;
  emoji: string;
  label: string;
}) {
  return (
    <div className="px-3 py-4">
      <div className="rounded-xl bg-gradient-to-br from-pink-500 to-orange-400 px-4 py-6 text-center text-white">
        <div className="text-6xl mb-4">{emoji}</div>
        {title && <p className="text-sm font-bold mb-2">{title}</p>}
        <p className="text-xs text-white/85 mb-4 leading-relaxed">
          YouTube 매칭 영상이 아직 없습니다.
        </p>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-bold text-pink-600"
          >
            {label}
          </a>
        )}
      </div>
    </div>
  );
}
