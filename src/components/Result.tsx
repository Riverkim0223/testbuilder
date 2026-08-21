'use client';

import { useMemo, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Scores, UserCondition } from '@/types';
import { getBestMatch } from '@/utils/matchAlgorithm';
import { InstagramEmbed, YouTubeEmbed } from 'react-social-media-embed';

interface ResultProps {
  scores: Scores;
  condition: UserCondition; // 넘겨받은 조건 데이터
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

  // 유저 점수를 기반으로 가장 잘 맞는 챌린지 계산
  const bestMatch = useMemo(() => getBestMatch(scores), [scores]);

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
      setIsDownloading(true); // 다운로드 중 버튼 상태 변경
      
      // html2canvas를 사용하여 특정 DOM 영역을 캔버스로 변환
      const canvas = await html2canvas(resultCardRef.current, {
        scale: 2, // 고해상도 캡처를 위해 스케일 업
        useCORS: true, // 외부 이미지가 있을 경우 CORS 이슈 방지
        backgroundColor: '#ffffff', // 배경색 지정 (투명 방지)
      });

      // 캔버스를 이미지 URL(base64)로 변환
      const image = canvas.toDataURL('image/png');

      // 가상의 a 태그를 만들어 다운로드 트리거
      const link = document.createElement('a');
      link.href = image;
      link.download = `reels-challenge-result.png`; // 저장될 파일명
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 bg-slate-50">
      
      {/* 캡처될 결과 카드 영역 (ref 연결) */}
      <div 
        ref={resultCardRef}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden mt-8 border border-slate-100"
      >
        {/* 상단 비주얼 영역 */}
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-10 flex flex-col items-center justify-center text-white">
          <div className="text-7xl mb-4">
            {bestMatch.imageUrl}
          </div>
          <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm mb-2">
            알고리즘이 선택한 찰떡 챌린지
          </span>
          <h1 className="text-2xl font-extrabold text-center break-keep">
            {bestMatch.name}
          </h1>
        </div>

        {/* 상세 설명 영역 */}
        <div className="p-8 space-y-6">
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

          {/* 유저의 실제 점수 데이터 방사형 또는 바 차트로 표현하기 좋은 영역 */}
          <div className="bg-slate-50 p-4 rounded-xl mt-4 border border-slate-100">
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
        </div>
      </div>
{/* 🎬 릴스 영상 재생 영역 (캡처 영역 밖으로 분리) */}
      {bestMatch.videoUrl && bestMatch.videoUrl.includes('instagram.com') && (
        <div className="w-full max-w-md mt-6 rounded-2xl overflow-hidden shadow-sm flex flex-col items-center bg-white p-4">
          <span className="text-xs font-bold text-slate-500 mb-4">👇 추천 챌린지 미리보기</span>
          <InstagramEmbed url={bestMatch.videoUrl} width={328} />
        </div>
      )}
      {/* 📺 유튜브 영상 재생 영역 (캡처 영역 밖으로 분리) */}
      {bestMatch.videoUrl?.includes('youtube.com') && (
  <YouTubeEmbed url={bestMatch.videoUrl} width={328} />
)}
      {/* 하단 하단 버튼 영역 (이미지 캡처 시 이 부분은 제외됨) */}
      <div className="w-full max-w-md mt-6 space-y-3 pb-8">
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