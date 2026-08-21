import html2canvas from 'html2canvas';

const CAPTURE_OPTIONS: Partial<Parameters<typeof html2canvas>[1]> = {
  scale: 2,
  useCORS: true,
  allowTaint: true,
  backgroundColor: '#ffffff',
  logging: false,
  imageTimeout: 15000,
};

/** html2canvas가 깨지기 쉬운 CSS를 캡처용 클론에서 정리 */
function sanitizeCloneForCapture(root: HTMLElement, view: Window) {
  const all = [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))];

  for (const el of all) {
    const computed = view.getComputedStyle(el);

    el.style.backdropFilter = 'none';
    el.style.setProperty('-webkit-backdrop-filter', 'none');
    el.style.transform = 'none';

    el.style.backgroundColor = computed.backgroundColor;
    el.style.color = computed.color;
    el.style.borderTopColor = computed.borderTopColor;
    el.style.borderRightColor = computed.borderRightColor;
    el.style.borderBottomColor = computed.borderBottomColor;
    el.style.borderLeftColor = computed.borderLeftColor;
    el.style.borderTopWidth = computed.borderTopWidth;
    el.style.borderRightWidth = computed.borderRightWidth;
    el.style.borderBottomWidth = computed.borderBottomWidth;
    el.style.borderLeftWidth = computed.borderLeftWidth;
    el.style.borderStyle = computed.borderStyle;
    el.style.borderRadius = computed.borderRadius;
    el.style.boxShadow = computed.boxShadow;
    el.style.opacity = computed.opacity;

    if (computed.backgroundImage && computed.backgroundImage !== 'none') {
      el.style.backgroundImage = computed.backgroundImage;
      el.style.backgroundSize = computed.backgroundSize;
      el.style.backgroundPosition = computed.backgroundPosition;
    }
  }
}

export async function captureResultImage(element: HTMLElement): Promise<HTMLCanvasElement> {
  return html2canvas(element, {
    ...CAPTURE_OPTIONS,
    onclone: (_doc, clonedElement) => {
      const view = clonedElement.ownerDocument.defaultView;
      if (view) {
        sanitizeCloneForCapture(clonedElement, view);
      }
    },
  });
}

async function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('이미지 변환에 실패했습니다.'));
      },
      'image/png',
      1,
    );
  });
}

/** 데스크톱 다운로드 + iOS 등 모바일은 공유 시트로 저장 유도 */
export async function downloadResultImage(
  element: HTMLElement,
  filename = 'reels-type-result.png',
): Promise<void> {
  const canvas = await captureResultImage(element);
  const blob = await canvasToBlob(canvas);
  const file = new File([blob], filename, { type: 'image/png' });

  if (typeof navigator.share === 'function' && navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: '릴스 성향 테스트 결과',
    });
    return;
  }

  const url = URL.createObjectURL(blob);
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function captureResultBlob(element: HTMLElement): Promise<Blob> {
  const canvas = await captureResultImage(element);
  return canvasToBlob(canvas);
}
