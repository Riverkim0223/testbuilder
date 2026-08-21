import { UserCondition } from '@/types';

export type ChallengePeopleType = '1in' | '2in' | 'group' | 'any';

export interface ChallengeMeta {
  difficulty: 1 | 2 | 3;
  peopleType: ChallengePeopleType;
}

/** 챌린지별 난이도(1=쉬움, 2=보통, 3=매운맛) · 촬영 인원 */
export const CHALLENGE_META: Record<string, ChallengeMeta> = {
  ch_001: { difficulty: 2, peopleType: 'any' },
  ch_002: { difficulty: 3, peopleType: '1in' },
  ch_003: { difficulty: 3, peopleType: '1in' },
  ch_004: { difficulty: 1, peopleType: '1in' },
  ch_005: { difficulty: 3, peopleType: '1in' },
  ch_006: { difficulty: 3, peopleType: 'any' },
  ch_007: { difficulty: 2, peopleType: 'group' },
  ch_008: { difficulty: 3, peopleType: '1in' },
  ch_009: { difficulty: 2, peopleType: 'any' },
  ch_010: { difficulty: 2, peopleType: '1in' },
  ch_011: { difficulty: 1, peopleType: '1in' },
  ch_012: { difficulty: 2, peopleType: '1in' },
  ch_013: { difficulty: 2, peopleType: '2in' },
  ch_014: { difficulty: 2, peopleType: '1in' },
  ch_015: { difficulty: 2, peopleType: '2in' },
  ch_016: { difficulty: 1, peopleType: '1in' },
  ch_017: { difficulty: 2, peopleType: '1in' },
  ch_018: { difficulty: 1, peopleType: '1in' },
  ch_019: { difficulty: 2, peopleType: '1in' },
  ch_020: { difficulty: 1, peopleType: '1in' },
  au_001: { difficulty: 2, peopleType: 'any' },
  au_002: { difficulty: 3, peopleType: '1in' },
  au_003: { difficulty: 3, peopleType: '1in' },
  au_004: { difficulty: 3, peopleType: '1in' },
  au_005: { difficulty: 1, peopleType: '1in' },
  au_006: { difficulty: 1, peopleType: '1in' },
  au_007: { difficulty: 2, peopleType: '1in' },
  au_008: { difficulty: 2, peopleType: '1in' },
  au_009: { difficulty: 2, peopleType: '1in' },
  au_010: { difficulty: 1, peopleType: '1in' },
};

const DEFAULT_META: ChallengeMeta = { difficulty: 2, peopleType: 'any' };

export function getChallengeMeta(challengeId: string): ChallengeMeta {
  return CHALLENGE_META[challengeId] ?? DEFAULT_META;
}

/** 선택한 난이도 이하만 추천 풀에 포함 */
export function isDifficultyEligible(challengeId: string, userDifficulty: number): boolean {
  return getChallengeMeta(challengeId).difficulty <= userDifficulty;
}

/** 촬영 인원 호환 여부 */
export function isPeopleTypeEligible(
  challengeId: string,
  userPeopleType: UserCondition['peopleType'],
): boolean {
  const meta = getChallengeMeta(challengeId);

  if (meta.peopleType === 'any') return true;
  if (meta.peopleType === userPeopleType) return true;

  // 그룹 촬영은 2인 챌린지도 가능
  if (userPeopleType === 'group' && meta.peopleType === '2in') return true;

  // 2인 촬영은 솔로 챌린지도 가능 (혼자 찍기)
  if (userPeopleType === '2in' && meta.peopleType === '1in') return true;

  return false;
}

/** 인원·난이도 불일치 시 정렬 패널티 (작을수록 유리) */
export function getConditionPenalty(
  challengeId: string,
  condition: UserCondition,
): number {
  const meta = getChallengeMeta(challengeId);
  let penalty = 0;

  if (meta.difficulty < condition.difficulty) {
    // 더 쉬운 챌린지 — 선택 난이도보다 낮으면 약한 패널티
    penalty += (condition.difficulty - meta.difficulty) * 6;
  }

  if (meta.peopleType === 'any') return penalty;

  if (meta.peopleType === condition.peopleType) return penalty;

  if (condition.peopleType === 'group' && meta.peopleType === '2in') {
    return penalty + 4;
  }

  if (condition.peopleType === '2in' && meta.peopleType === '1in') {
    return penalty + 8;
  }

  if (condition.peopleType === '1in' && meta.peopleType === '2in') {
    return penalty + 20;
  }

  if (condition.peopleType === '1in' && meta.peopleType === 'group') {
    return penalty + 25;
  }

  return penalty + 15;
}

export function filterChallengesByCondition<T extends { id: string }>(
  items: T[],
  condition: UserCondition,
): T[] {
  const strict = items.filter(
    (item) =>
      isDifficultyEligible(item.id, condition.difficulty) &&
      isPeopleTypeEligible(item.id, condition.peopleType),
  );

  if (strict.length >= 3) return strict;

  const byDifficulty = items.filter((item) =>
    isDifficultyEligible(item.id, condition.difficulty),
  );

  if (byDifficulty.length >= 3) return byDifficulty;

  return items;
}

export function getDifficultyLabel(level: number): string {
  switch (level) {
    case 1:
      return '🌱 쉬움';
    case 2:
      return '🔥 보통';
    case 3:
      return '🌶️ 매운맛';
    default:
      return '🔥 보통';
  }
}
