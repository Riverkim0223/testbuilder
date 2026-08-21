'use client';

import { useMemo, useRef, useState } from 'react';
import { Scores, UserCondition } from '@/types';
import {
  captureResultBlob,
  downloadResultImage,
  shareResultBlob,
} from '@/utils/captureResultImage';
import { getMatches } from '@/utils/matchAlgorithm';
import { getTypeMatches } from '@/utils/typeMatching';
import { buildShareText, buildShareUrl, saveResultState } from '@/utils/shareResult';
import { getDifficultyLabel } from '@/utils/challengeMeta';
import MediaPreview from './MediaPreview';
import SaveImageModal from './SaveImageModal';

interface ResultProps {
  scores: Scores;
  condition: UserCondition;
  onRestart: () => void;
}

export default function Result({ scores, condition = {} as UserCondition, onRestart }: ResultProps) {
  const defaultCondition = { peopleType: '1in' as const, difficulty: 2 };
  const mergedCondition = { ...defaultCondition, ...condition };
  const resultCardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [savePreviewUrl, setSavePreviewUrl] = useState<string | null>(null);
  const [savePreviewBlob, setSavePreviewBlob] = useState<Blob | null>(null);

  const closeSaveModal = () => {
    if (savePreviewUrl) URL.revokeObjectURL(savePreviewUrl);
    setSavePreviewUrl(null);
    setSavePreviewBlob(null);
  };

  const { primaryType, similarType, oppositeType, allTypes } = useMemo(
    () => getTypeMatches(scores),
    [scores],
  );
  const { bestMatch, similarMatch, worstMatch } = useMemo(
    () => getMatches(scores, mergedCondition),
    [scores, mergedCondition],
  );

  const getPeopleText = (type: UserCondition['peopleType']) => {
    switch (type) {
      case '1in':
        return '🙋‍♂️ 혼자서';
      case '2in':
        return '👭 둘이서';
      case 'group':
        return '👨‍👩‍👧‍👦 3인 이상';
      default:
        return '🙋‍♂️ 혼자서';
    }
  };

  const getDifficultyText = (level: number) => {
    switch (level) {
      case 1:
        return '🌱 쉬운 난이도';
      case 2:
        return '🔥 보통 난이도';
      case 3:
        return '🌶️ 매운맛 난이도';
      default:
        return '🔥 보통 난이도';
    }
  };

  const handleDownload = async () => {
    if (!resultCardRef.current) return;
    try {
      setIsDownloading(true);
      const result = await downloadResultImage(resultCardRef.current);

      if (result.method === 'manual') {
        setSavePreviewUrl(result.blobUrl);
        setSavePreviewBlob(result.blob);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      console.error('이미지 저장에 실패했습니다:', error);
      alert('이미지 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareFromModal = async () => {
    if (!savePreviewBlob) return;
    try {
      await shareResultBlob(savePreviewBlob);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      alert('공유에 실패했습니다.');
    }
  };

  const handleShare = async () => {
    const shareUrl = buildShareUrl(scores, mergedCondition);
    const shareText = buildShareText(primaryType.title, primaryType.matchRate, bestMatch.name);

    saveResultState({ scores, condition: mergedCondition });

    try {
      if (resultCardRef.current && typeof navigator.share === 'function') {
        const blob = await captureResultBlob(resultCardRef.current);
        const file = new File([blob], 'reels-result.png', { type: 'image/png' });
        const withImage = { files: [file], title: '나만의 릴스 성향 테스트 🎬', text: shareText, url: shareUrl };

        if (navigator.canShare?.(withImage)) {
          await navigator.share(withImage);
          return;
        }
      }

      if (typeof navigator.share === 'function') {
        await navigator.share({
          title: '나만의 릴스 성향 테스트 🎬',
          text: shareText,
          url: shareUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert('🔗 결과 링크가 클립보드에 복사되었습니다!');
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      console.error('공유 실패:', error);
      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        alert('🔗 공유에 실패해 결과 링크를 복사했습니다.');
      } catch {
        alert('공유에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-3 py-4 bg-slate-50">
      {savePreviewUrl && (
        <SaveImageModal
          imageUrl={savePreviewUrl}
          onClose={closeSaveModal}
          onShare={handleShareFromModal}
        />
      )}
      <div
        ref={resultCardRef}
        data-result-card
        className="w-full bg-white rounded-2xl shadow-xl overflow-hidden mt-2 border border-slate-100"
      >
        {/* 8유형 매칭 — 메인 히어로 */}
        <div
          className="px-4 py-8 flex flex-col items-center text-center text-white"
          style={{
            background: `linear-gradient(135deg, ${primaryType.themeColor} 0%, #1e1b4b 100%)`,
          }}
        >
          <span className="text-xs font-bold bg-white/30 px-3 py-1 rounded-full mb-3">
            나의 릴스 성향 유형 · {primaryType.matchRate}% 매칭
          </span>
          <div className="text-7xl mb-3 drop-shadow-lg">{primaryType.emoji}</div>
          <h1 className="text-2xl font-extrabold break-keep">{primaryType.title}</h1>
          <p className="text-sm font-semibold text-white/90 mt-1">{primaryType.subtitle}</p>
        </div>

        <div className="px-4 py-5 space-y-5">
          <p className="text-slate-700 text-sm leading-relaxed text-center font-medium">
            {primaryType.description}
          </p>

          {/* 8유형 전체 보드 */}
          <div>
            <h3 className="text-[11px] font-bold text-slate-400 mb-3 text-center">
              8가지 릴스 성향 유형
            </h3>
            <div className="grid grid-cols-4 gap-1.5">
              {allTypes.map((type) => {
                const isPrimary = type.id === primaryType.id;
                return (
                  <div
                    key={type.id}
                    className={`relative flex flex-col items-center rounded-xl px-1 py-2 text-center border transition ${
                      isPrimary
                        ? 'border-2 shadow-md scale-[1.03] z-10'
                        : 'border-slate-100 bg-slate-50 opacity-75'
                    } ${!isPrimary ? type.bgColor : ''}`}
                    style={
                      isPrimary
                        ? {
                            borderColor: type.themeColor,
                            backgroundColor: `${type.themeColor}18`,
                          }
                        : undefined
                    }
                  >
                    {isPrimary && (
                      <span
                        className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[8px] font-black text-white px-1.5 py-0.5 rounded-full whitespace-nowrap"
                        style={{ backgroundColor: type.themeColor }}
                      >
                        YOU
                      </span>
                    )}
                    <span className="text-xl leading-none">{type.emoji}</span>
                    <span className="text-[9px] font-bold text-slate-700 mt-1 leading-tight break-keep">
                      {type.title.replace('형', '')}
                    </span>
                    <span className="text-[8px] text-slate-400 mt-0.5">{type.matchRate}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* 유사 / 반대 유형 */}
          <div className="grid grid-cols-2 gap-2">
            <div
              className={`${similarType.bgColor} px-2 py-3 rounded-xl flex flex-col items-center text-center border border-slate-100`}
            >
              <span className="text-[10px] font-bold text-slate-500 mb-2">👯 비슷한 유형</span>
              <span className="text-3xl mb-1">{similarType.emoji}</span>
              <h4 className="text-xs font-bold text-slate-800 break-keep">{similarType.title}</h4>
              <span className="text-[10px] text-slate-500 mt-1">{similarType.matchRate}%</span>
            </div>
            <div className="bg-slate-50 px-2 py-3 rounded-xl flex flex-col items-center text-center border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 mb-2">🌓 반대 유형</span>
              <span className="text-3xl mb-1">{oppositeType.emoji}</span>
              <h4 className="text-xs font-bold text-slate-800 break-keep">{oppositeType.title}</h4>
              <span className="text-[10px] text-slate-500 mt-1">{oppositeType.matchRate}%</span>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* 이 유형 추천 챌린지 */}
          <div className="rounded-xl border border-pink-100 bg-gradient-to-br from-pink-50 to-purple-50 p-4">
            <span className="text-[10px] font-bold text-pink-500 block text-center mb-2">
              🎯 {primaryType.title} · {getDifficultyText(mergedCondition.difficulty).replace(' 난이도', '')} 맞춤
            </span>
            <div className="flex items-center gap-3">
              <span className="text-4xl flex-shrink-0">{bestMatch.imageUrl}</span>
              <div className="min-w-0 text-left">
                <h4 className="text-sm font-extrabold text-slate-900 break-keep leading-snug">
                  {bestMatch.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{bestMatch.description}</p>
                <span className="inline-block mt-2 text-[10px] font-bold text-pink-600 bg-white px-2 py-0.5 rounded-full border border-pink-100">
                  챌린지 매칭 {bestMatch.matchRate}% · {getDifficultyLabel(bestMatch.difficulty)}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
              {bestMatch.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold text-pink-600 bg-white/80 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-3 text-xs font-bold text-slate-500">
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg">
              {getPeopleText(mergedCondition.peopleType)}
            </span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg">
              {getDifficultyText(mergedCondition.difficulty)}
            </span>
          </div>

          {/* 4축 차트 */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <h3 className="text-[11px] font-bold text-slate-400 mb-3 text-center">나의 4축 성향 분석</h3>
            <div className="space-y-3">
              {[
                { label: '에너지', score: scores.energy, color: 'bg-rose-400' },
                { label: '존재감', score: scores.presence, color: 'bg-orange-400' },
                { label: '움직임', score: scores.movement, color: 'bg-blue-400' },
                { label: '연출력', score: scores.direction, color: 'bg-purple-400' },
              ].map((item) => (
                <div key={item.label} className="flex items-center text-xs font-bold text-slate-600">
                  <span className="w-12">{item.label}</span>
                  <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden mx-3">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.score}%` }} />
                  </div>
                  <span className="w-8 text-right">{item.score}점</span>
                </div>
              ))}
            </div>
          </div>

          {/* 챌린지 서브 매치 */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50/50 px-2 py-3 rounded-xl flex flex-col items-center text-center border border-blue-100">
              <span className="text-[10px] font-bold text-blue-500 mb-2">👍 이런 챌린지도!</span>
              <span className="text-3xl mb-2">{similarMatch.imageUrl}</span>
              <h4 className="text-xs font-bold text-slate-800 break-keep leading-tight">{similarMatch.name}</h4>
              <span className="text-[10px] text-slate-500 mt-1">{similarMatch.matchRate}%</span>
            </div>
            <div className="bg-red-50/50 px-2 py-3 rounded-xl flex flex-col items-center text-center border border-red-100">
              <span className="text-[10px] font-bold text-red-500 mb-2">🙅‍♀️ 이건 어려워요</span>
              <span className="text-3xl mb-2">{worstMatch.imageUrl}</span>
              <h4 className="text-xs font-bold text-slate-800 break-keep leading-tight">{worstMatch.name}</h4>
              <span className="text-[10px] text-slate-500 mt-1">{worstMatch.matchRate}%</span>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 italic">{primaryType.shareText}</p>
        </div>
      </div>

      {(bestMatch.videoUrl || bestMatch.youtubeUrl) && (
        <div className="w-full mt-4 flex flex-col items-center">
          <span className="text-xs font-bold text-slate-500 mb-3">👇 추천 챌린지 미리보기</span>
          <MediaPreview
            url={bestMatch.videoUrl}
            youtubeUrl={bestMatch.youtubeUrl}
            challengeId={bestMatch.id}
            title={bestMatch.name}
            emoji={bestMatch.imageUrl}
            previewImageUrl={bestMatch.previewImageUrl}
            previewVideoUrl={bestMatch.previewVideoUrl}
          />
        </div>
      )}

      <div className="w-full mt-4 space-y-3 pb-4">
        <button
          onClick={handleShare}
          className="w-full py-4 flex items-center justify-center bg-[#FEE500] text-slate-900 font-extrabold rounded-2xl hover:bg-[#F4DC00] transition active:scale-95 shadow-md"
        >
          🚀 {primaryType.title} 결과 공유하기
        </button>
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full py-4 flex items-center justify-center bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition active:scale-95 shadow-md disabled:bg-slate-400"
        >
          {isDownloading ? '이미지 만드는 중...' : '📸 결과 이미지로 저장하기'}
        </button>
        <button
          onClick={onRestart}
          className="w-full py-4 bg-white text-slate-700 border border-slate-200 font-bold rounded-2xl hover:bg-slate-50 transition active:scale-95"
        >
          🔄 테스트 다시하기
        </button>
      </div>
    </div>
  );
}
