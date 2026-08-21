import html2canvas from 'html2canvas';
import { toBlob } from 'html-to-image';

function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

function isMobile(): boolean {
  if (typeof navigator === 'undefined') return false;
  return isIOS() || /Android/i.test(navigator.userAgent);
}

async function waitForRender(): Promise<void> {
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    await document.fonts.ready;
  }
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

/** html2canvas가 깨지기 쉬운 CSS를 캡처용 클론에서 정리 */
function sanitizeCloneForCapture(root: HTMLElement, view: Window) {
  const all = [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))];

  for (const el of all) {
    const computed = view.getComputedStyle(el);

    el.style.backdropFilter = 'none';
    el.style.setProperty('-webkit-backdrop-filter', 'none');
    el.style.transform = 'none';
    el.style.animation = 'none';
    el.style.transition = 'none';

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

async function captureWithHtmlToImage(element: HTMLElement): Promise<Blob> {
  const pixelRatio = isIOS() ? 1 : 2;

  const blob = await toBlob(element, {
    cacheBust: true,
    pixelRatio,
    backgroundColor: '#ffffff',
    skipAutoScale: false,
    skipFonts: isIOS(),
    filter: (node) => {
      if (!(node instanceof HTMLElement)) return true;
      return node.tagName !== 'IFRAME';
    },
  });

  if (!blob) {
    throw new Error('html-to-image capture failed');
  }

  return blob;
}

async function captureWithHtml2Canvas(element: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(element, {
    scale: isIOS() ? 1 : 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    imageTimeout: 15000,
    onclone: (_doc, clonedElement) => {
      const view = clonedElement.ownerDocument.defaultView;
      if (view) {
        sanitizeCloneForCapture(clonedElement, view);
      }
    },
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (value) => {
        if (value) resolve(value);
        else reject(new Error('canvas toBlob failed'));
      },
      'image/png',
      1,
    );
  });
}

export async function captureResultBlob(element: HTMLElement): Promise<Blob> {
  element.scrollIntoView({ block: 'start', behavior: 'auto' });
  await waitForRender();

  const errors: unknown[] = [];

  try {
    return await captureWithHtmlToImage(element);
  } catch (error) {
    errors.push(error);
  }

  try {
    return await captureWithHtml2Canvas(element);
  } catch (error) {
    errors.push(error);
    console.error('이미지 캡처 실패:', errors);
    throw new Error('이미지를 만들 수 없습니다.');
  }
}

async function shareBlobFile(blob: Blob, filename: string, title: string): Promise<boolean> {
  if (typeof navigator.share !== 'function') return false;

  const file = new File([blob], filename, { type: 'image/png' });

  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title });
      return true;
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error;
    }
  }

  return false;
}

export type DownloadResult =
  | { method: 'shared' }
  | { method: 'downloaded' }
  | { method: 'manual'; blobUrl: string; blob: Blob };

/** iOS는 길게-눌러-저장 모달, Android/PC는 공유·다운로드 시도 */
export async function downloadResultImage(
  element: HTMLElement,
  filename = 'reels-type-result.png',
): Promise<DownloadResult> {
  const blob = await captureResultBlob(element);

  if (isIOS()) {
    return {
      method: 'manual',
      blobUrl: URL.createObjectURL(blob),
      blob,
    };
  }

  const shared = await shareBlobFile(blob, filename, '릴스 성향 테스트 결과');
  if (shared) {
    return { method: 'shared' };
  }

  if (isMobile() && typeof navigator.share === 'function') {
    const blobUrl = URL.createObjectURL(blob);
    return { method: 'manual', blobUrl, blob };
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
    return { method: 'downloaded' };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function shareResultBlob(blob: Blob, filename = 'reels-result.png'): Promise<boolean> {
  return shareBlobFile(blob, filename, '릴스 성향 테스트 결과');
}

export { isIOS };
