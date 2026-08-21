'use client';

import { useState } from 'react';
import { UserCondition } from '@/types';

interface ConditionSelectProps {
  onSubmit: (condition: UserCondition) => void;
}

export default function ConditionSelect({ onSubmit }: ConditionSelectProps) {
  const [peopleType, setPeopleType] = useState<UserCondition['peopleType']>('1in');
  const [difficulty, setDifficulty] = useState<number>(2); // 기본값: 보통(2)

  const handleSubmit = () => {
    onSubmit({ peopleType, difficulty });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-3 py-5 bg-white">
      <div className="pt-8 space-y-8">
        {/* 타이틀 */}
        <div>
          <span className="text-xs font-bold text-pink-500">STEP 01</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            어떤 환경에서 촬영할까요?
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            원하시는 인원과 난이도를 고르시면 더 딱 맞는 챌린지를 찾을 수 있어요.
          </p>
        </div>

        {/* 1. 촬영 인원 선택 */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">촬영 인원</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { type: '1in', label: '🙋‍♂️ 혼자서', sub: '솔로 릴스' },
              { type: '2in', label: '👭 둘이서', sub: '친구/연인' },
              { type: 'group', label: '👨‍👩‍👧‍👦 3인 이상', sub: '그룹/동아리' },
            ].map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() => setPeopleType(item.type as UserCondition['peopleType'])}
                className={`px-2.5 py-3 rounded-xl border text-center transition ${
                  peopleType === item.type
                    ? 'border-pink-500 bg-pink-50/50 text-pink-600 font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                <div className="text-sm">{item.label}</div>
                <div className="text-[10px] text-slate-400 mt-1">{item.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. 원하는 난이도 선택 */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">선호 난이도</label>
          <div className="space-y-2">
            {[
              { level: 1, label: '🌱 쉬움 (10초 습득)', desc: '손동작, 표정 중심의 가벼운 챌린지' },
              { level: 2, label: '🔥 보통 (약간의 연습)', desc: '간단한 스텝과 대중적인 유행 댄스' },
              { level: 3, label: '🌶️ 매운맛 (빡센 칼군무)', desc: '동선과 박자 감각이 필요한 고난도 안무' },
            ].map((item) => (
              <button
                key={item.level}
                type="button"
                onClick={() => setDifficulty(item.level)}
                className={`w-full px-3 py-3 rounded-xl border text-left flex items-center justify-between transition ${
                  difficulty === item.level
                    ? 'border-pink-500 bg-pink-50/50 text-pink-600'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                <div>
                  <div className="text-sm font-bold">{item.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    difficulty === item.level ? 'border-pink-500 bg-pink-500' : 'border-slate-300'
                  }`}
                >
                  {difficulty === item.level && <span className="text-white text-xs">✓</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 다음 진행 버튼 */}
      <div className="pb-8">
        <button
          onClick={handleSubmit}
          className="w-full bg-slate-900 text-white font-bold text-base py-4 rounded-2xl shadow-lg hover:bg-slate-800 transition active:scale-95"
        >
          다음 질문으로 이동하기 ➔
        </button>
      </div>
    </div>
  );
}