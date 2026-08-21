'use client';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-900 text-white text-center">
      <div className="space-y-6">
        {/* 아스키/이모지 로딩 애니메이션 */}
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
          <div className="absolute text-4xl animate-bounce">🎬</div>
        </div>

        <div className="space-y-2 pt-4">
          <h2 className="text-xl font-bold tracking-tight text-pink-400">
            알고리즘 데이터 분석 중...
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            나의 4대 성향 축과 유행하는 챌린지 30개를<br />
            유클리드 거리 알고리즘으로 매칭하고 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}