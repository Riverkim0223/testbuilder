'use client';

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-screen flex flex-col justify-between px-3 py-5 bg-gradient-to-b from-pink-50 via-white to-purple-50 text-center">
      {/* 상단 헤더 & 비주얼 */}
      <div className="pt-12 space-y-6">
        <span className="inline-block bg-pink-100 text-pink-600 font-bold text-xs px-3 py-1.5 rounded-full animate-bounce">
          ✨ 릴스 / 쇼츠 챌린지 추천
        </span>
        
        <h1 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">
          나한테 딱 맞는<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            오늘의 릴스는?
          </span>
        </h1>

        <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
          12개 질문으로 나의 숏폼 성향 분석하고<br />
          알고리즘 떡상할 찰떡 챌린지 추천받기 🎬
        </p>

        {/* 히어로 그래픽 이모지 아이콘 */}
        <div className="py-8 relative">
          <div className="w-32 h-32 mx-auto bg-white rounded-3xl shadow-xl border border-pink-100 flex items-center justify-center text-6xl transform rotate-3">
            💃
          </div>
          <div className="absolute top-4 right-16 text-3xl animate-pulse">🔥</div>
          <div className="absolute bottom-4 left-16 text-3xl animate-pulse">🎵</div>
        </div>
      </div>

      {/* 하단 안내 및 시작 버튼 */}
      <div className="space-y-4 pb-8">
        <div className="flex items-center justify-center space-x-4 text-xs text-slate-400">
          <span>⏱️ 소요시간 2분</span>
          <span>•</span>
          <span>🔒 회원가입 없음</span>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-slate-900 text-white font-bold text-base py-4 rounded-2xl shadow-lg hover:bg-slate-800 transition transform active:scale-95"
        >
          내 릴스 성향 테스트하기 🚀
        </button>
      </div>
    </div>
  );
}
