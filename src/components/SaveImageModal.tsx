'use client';

interface SaveImageModalProps {
  imageUrl: string;
  onClose: () => void;
  onShare?: () => void;
}

export default function SaveImageModal({ imageUrl, onClose, onShare }: SaveImageModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 px-4 py-6">
      <div className="flex items-center justify-between text-white mb-3">
        <h2 className="text-sm font-bold">결과 이미지 저장</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold"
        >
          닫기
        </button>
      </div>

      <p className="text-center text-xs text-white/80 mb-3 leading-relaxed">
        아래 이미지를 <strong className="text-white">길게 눌러</strong>
        <br />
        「이미지 저장」 또는 「사진 보관함에 추가」를 선택하세요
      </p>

      <div className="flex-1 overflow-y-auto rounded-2xl bg-white p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="릴스 성향 테스트 결과"
          className="w-full h-auto rounded-xl"
          draggable={false}
        />
      </div>

      {onShare && (
        <button
          type="button"
          onClick={onShare}
          className="mt-3 w-full rounded-2xl bg-[#FEE500] py-4 text-sm font-extrabold text-slate-900"
        >
          다른 앱으로 공유하기
        </button>
      )}
    </div>
  );
}
