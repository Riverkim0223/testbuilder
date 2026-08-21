import { ResultType, Scores, UserCondition } from '@/types';

const STORAGE_KEY = 'reels-test-result';

export interface SavedResultState {
  scores: Scores;
  condition: UserCondition;
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function parseShareParams(searchParams: URLSearchParams): SavedResultState | null {
  const e = searchParams.get('e');
  const pr = searchParams.get('pr');
  const m = searchParams.get('m');
  const d = searchParams.get('d');

  if (!e || !pr || !m || !d) {
    return null;
  }

  const peopleType = searchParams.get('pp');
  const difficulty = searchParams.get('df');

  const validPeople = peopleType === '1in' || peopleType === '2in' || peopleType === 'group';

  return {
    scores: {
      energy: clampScore(Number(e)),
      presence: clampScore(Number(pr)),
      movement: clampScore(Number(m)),
      direction: clampScore(Number(d)),
    },
    condition: {
      peopleType: validPeople ? peopleType : '1in',
      difficulty: difficulty ? Math.max(1, Math.min(3, Number(difficulty) || 2)) : 2,
    },
  };
}

export function buildShareUrl(
  scores: Scores,
  condition: UserCondition,
  baseUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '',
): string {
  const params = new URLSearchParams({
    e: String(scores.energy),
    pr: String(scores.presence),
    m: String(scores.movement),
    d: String(scores.direction),
    pp: condition.peopleType,
    df: String(condition.difficulty),
  });

  return `${baseUrl}?${params.toString()}`;
}

export function saveResultState(state: SavedResultState): void {
  if (typeof window === 'undefined') return;
  persistResultSession(state);
  window.history.replaceState(null, '', buildShareUrl(state.scores, state.condition));
}

export function loadResultState(): SavedResultState | null {
  if (typeof window === 'undefined') return null;

  const fromUrl = parseShareParams(new URLSearchParams(window.location.search));
  if (fromUrl) {
    return fromUrl;
  }

  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SavedResultState;
  } catch {
    return null;
  }
}

export function clearResultState(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(STORAGE_KEY);
  const cleanUrl = window.location.pathname;
  window.history.replaceState(null, '', cleanUrl);
}

/** 세션에만 저장 (URL은 결과 화면 useEffect에서 갱신) */
export function persistResultSession(state: SavedResultState): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/** 공유 미리보기용 OG는 홈 URL 기준이라, 유형 ID를 optional로 붙일 수 있음 */
export function buildShareText(
  typeTitle: string,
  typeMatchRate: number,
  challengeName: string,
): string {
  return `나는 [${typeTitle}]! (${typeMatchRate}% 매칭) 찰떡 챌린지는 [${challengeName}] — 너도 해볼래?`;
}

export type { ResultType };
