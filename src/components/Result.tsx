'use client';

import { useMemo, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Scores, UserCondition } from '@/types';
// 💡 수정됨: getMatches 함수를 가져옵니다.
import { getMatches } from '@/utils/matchAlgorithm'; 
import MediaPreview from './MediaPreview';
    
interface ResultProps {
  scores: Scores;
  condition: UserCondition; 
  onRestart: () => void;
}

export default function Result({ scores, condition = {} as UserCondition, onRestart }: ResultProps) {
  const defaultCondition = {
    peopleType: '1in',
    difficulty: 2,
  };
  const mergedCondition = { ...defaultCondition, ...condition };
  const resultCardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // 💡 수정됨: 유저 점수를 기반으로 베스트, 시밀러, 워스트 챌린지를 모두 계산
  const { bestMatch, similarMatch, worstMatch } = useMemo(() => getMatches(scores), [scores]);
  // getMatches에서 반환된 matchRate(매칭률)을 바로 사용
  const matchRate = bestMatch.matchRate;

  // condition 데이터를 텍스트로 변환하기 위한 헬퍼 함수
  const getPeopleText = (type: UserCondition['peopleType']) => {
    switch (type) {
      case '1in': return '🙋‍♂️ 혼자서';
      case '2in': return '👭 둘이서';
      case 'group': return '👨‍👩‍👧‍👦 3인 이상';
      default: return '🙋‍♂️ 혼자서';
    }
  };

  const getDifficultyText = (level: number) => {
    switch (level) {
      case 1: return '🌱 쉬운 난이도';
      case 2: return '🔥 보통 난이도';
      case 3: return '🌶️ 매운맛 난이도';
      default: return '🔥 보통 난이도';
    }
  };

  // 이미지 캡처 및 다운로드 함수
  const handleDownload = async () => {
    if (!resultCardRef.current) return;
    
    try {
      setIsDownloading(true); 
      
      const canvas = await html2canvas(resultCardRef.current, {
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#ffffff', 
      });

      const image = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = image;
      link.download = `reels-challenge-result.png`; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('이미지 저장에 실패했습니다:', error);
      alert('이미지를 저장하는 중 오류가 발생했습니다.');
    } finally {
      setIsDownloading(false);
    }
  };
// 💡 새롭게 추가하는 SNS 공유하기 함수
  const handleShare = async () => {
    // 공유할 데이터 설정
    const shareData = {
      title: '나만의 릴스 성향 테스트 🎬',
      text: `나의 찰떡 릴스 챌린지는 [${bestMatch.name}]! 너도 한번 해볼래?`,
      url: window.location.origin, // 현재 사이트 주소 (배포된 도메인)
    };

    // 브라우저가 Web Share API를 지원하는지 확인 (대부분의 모바일 기기는 지원)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('공유가 취소되었거나 실패했습니다.', error);
      }
    } else {
      // 미지원 브라우저(PC 등)일 경우 클립보드에 링크 복사
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('🔗 링크가 클립보드에 복사되었습니다! 친구들에게 공유해보세요.');
      } catch (error) {
        console.error('링크 복사 실패:', error);
        alert('링크 복사에 실패했습니다.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-3 py-4 bg-slate-50">
      
      {/* 📸 캡처될 결과 카드 영역 */}
      <div 
        ref={resultCardRef}
        className="w-full bg-white rounded-2xl shadow-xl overflow-hidden mt-2 border border-slate-100"
      >
        {/* 상단 비주얼 영역 */}
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 px-4 py-7 flex flex-col items-center justify-center text-white">
          <div className="text-7xl mb-4">
            {bestMatch.imageUrl}
          </div>
          <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm mb-2">
            알고리즘이 선택한 찰떡 챌린지 · 매칭 {matchRate}%
          </span>
          <h1 className="text-2xl font-extrabold text-center break-keep">
            {bestMatch.name}
          </h1>
        </div>

        {/* 상세 설명 영역 */}
        <div className="px-4 py-5 space-y-5">
          <p className="text-slate-700 text-sm leading-relaxed text-center font-medium">
            {bestMatch.description}
          </p>

          {/* 태그 */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {bestMatch.tags.map((tag) => (
              <span key={tag} className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                {tag}
              </span>
            ))}
          </div>

          <hr className="border-slate-100" />

          {/* 선택한 조건 데이터 표시 */}
          <div className="flex justify-center space-x-4 text-xs font-bold text-slate-500">
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg">
              {getPeopleText(mergedCondition.peopleType)}
            </span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg">
              {getDifficultyText(mergedCondition.difficulty)}
            </span>
          </div>

          {/* 나의 4축 성향 분석 차트 */}
          <div className="bg-slate-50 p-3 rounded-xl mt-2 border border-slate-100">
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
                    <div 
                      className={`h-full ${item.color}`} 
                      style={{ width: `${item.score}%` }} 
                    />
                  </div>
                  <span className="w-8 text-right">{item.score}점</span>
                </div>
              ))}
            </div>
          </div>

          {/* 💡 새로 추가된 영역: 서브 매치 & 워스트 매치 */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* 비슷한 릴스 (2등) */}
            <div className="bg-blue-50/50 px-2 py-3 rounded-xl flex flex-col items-center text-center border border-blue-100">
              <span className="text-[10px] font-bold text-blue-500 mb-2 tracking-tight">👍 이런 릴스도 딱!</span>
              <span className="text-3xl mb-2">{similarMatch.imageUrl}</span>
              <h4 className="text-xs font-bold text-slate-800 break-keep leading-tight">{similarMatch.name}</h4>
              <span className="text-[10px] text-slate-500 mt-1">{similarMatch.matchRate}% 매칭</span>
            </div>
            
            {/* 워스트 릴스 (꼴등) */}
            <div className="bg-red-50/50 px-2 py-3 rounded-xl flex flex-col items-center text-center border border-red-100">
              <span className="text-[10px] font-bold text-red-500 mb-2 tracking-tight">🙅‍♀️ 이건 피하세요!</span>
              <span className="text-3xl mb-2">{worstMatch.imageUrl}</span>
              <h4 className="text-xs font-bold text-slate-800 break-keep leading-tight">{worstMatch.name}</h4>
              <span className="text-[10px] text-slate-500 mt-1">{worstMatch.matchRate}% 매칭</span>
            </div>
          </div>
          
        </div>
      </div>

      {/* 🎬 스마트 미디어 미리보기 영역 (캡처 시 제외됨) */}
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

      {/* 하단 버튼 영역 */}
      <div className="w-full mt-4 space-y-3 pb-4">
        {/* 💡 새로 추가된 공유하기 버튼 */}
        <button 
          onClick={handleShare}
          className="w-full py-4 flex items-center justify-center space-x-2 bg-[#FEE500] text-slate-900 font-extrabold rounded-2xl hover:bg-[#F4DC00] transition active:scale-95 shadow-md"
        >
          <span>🚀 친구에게 결과 공유하기</span>
        </button>
        
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full py-4 flex items-center justify-center space-x-2 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition active:scale-95 shadow-md disabled:bg-slate-400"
        >
          <span>{isDownloading ? '저장 중...' : '📸 결과 이미지로 저장하기'}</span>
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