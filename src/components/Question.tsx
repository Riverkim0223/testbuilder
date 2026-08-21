'use client';

import { useState } from 'react';
import { Scores } from '@/types';
import { calculateScoresFromAnswers, questions } from '@/utils/questions';

interface QuestionProps {
  onComplete: (scores: Scores) => void;
}

export default function Question({ onComplete }: QuestionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  // 답변 선택 시 실행
  const handleSelectOption = (score: number) => {
    const nextAnswers = [...answers, score];
    setAnswers(nextAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete(calculateScoresFromAnswers(nextAnswers));
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-3 py-5 bg-white">
      {/* 상단 프로그레스 바 & 카운터 */}
      <div className="pt-6 space-y-4">
        <div className="flex justify-between items-center text-xs font-bold text-slate-400">
          <span>Q{currentIndex + 1}.</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>

        {/* 게이지 바 */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-pink-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 질문 텍스트 */}
        <div className="pt-6">
          <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">
            {currentQ.axisLabel}
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-2 leading-snug">
            {currentQ.question}
          </h2>
        </div>
      </div>

     {/* 선택지 버튼 영역 (5지선다 자동 렌더링) */}
      <div className="space-y-3 my-auto py-8">
        {currentQ.options.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSelectOption(option.score)}
            className="w-full px-3 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-pink-50 hover:border-pink-300 text-left transition transform active:scale-98 group flex items-center"
          >
            {/* 💡 A, B, C, D, E 뱃지가 순서대로 들어갑니다 */}
            <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 text-xs font-bold mr-3 group-hover:bg-pink-200 group-hover:text-pink-600 transition">
              {['A', 'B', 'C', 'D', 'E'][index]}
            </span>
            
            <div className="text-sm font-semibold text-slate-800 group-hover:text-pink-600 leading-relaxed">
              {option.text}
            </div>
          </button>
        ))}
      </div>

      {/* 하단 팁 */}
      <div className="pb-6 text-center">
        <p className="text-[11px] text-slate-400">
          너무 고민하지 말고 직관적으로 느껴지는 답을 골라주세요!
        </p>
      </div>
    </div>
  );
}