import { ResultType, Scores } from '@/types';
import { RESULT_TYPES, ResultTypeDetail } from './resultTypes';

/** 8유형별 4축 이상 프로필 (0~100) */
export const TYPE_IDEAL_SCORES: Record<ResultType, Scores> = {
  SOFT_CUTE: { energy: 30, presence: 42, movement: 28, direction: 22 },
  POWER_PERFORMER: { energy: 92, presence: 78, movement: 95, direction: 38 },
  EYE_CATCHER: { energy: 72, presence: 95, movement: 68, direction: 48 },
  DETAIL_DIRECTOR: { energy: 52, presence: 58, movement: 42, direction: 92 },
  CONCEPT_HOLIC: { energy: 68, presence: 88, movement: 48, direction: 86 },
  GROOVE_MASTER: { energy: 48, presence: 52, movement: 80, direction: 32 },
  VIBE_MAKER: { energy: 88, presence: 90, movement: 72, direction: 42 },
  MINIMAL_MOOD: { energy: 22, presence: 38, movement: 22, direction: 28 },
};

export interface RankedResultType extends ResultTypeDetail {
  matchRate: number;
  distance: number;
}

function getTypeDistance(userScores: Scores, type: ResultType): number {
  const ideal = TYPE_IDEAL_SCORES[type];
  return Math.sqrt(
    (userScores.energy - ideal.energy) ** 2 +
      (userScores.presence - ideal.presence) ** 2 +
      (userScores.movement - ideal.movement) ** 2 +
      (userScores.direction - ideal.direction) ** 2,
  );
}

export function getTypeMatchRate(userScores: Scores, type: ResultType): number {
  const distance = getTypeDistance(userScores, type);
  const maxDistance = 200;
  return Math.max(0, Math.round(100 - (distance / maxDistance) * 100));
}

/** 8유형 전체 매칭 순위 (1등 = primary, 꼴등 = opposite) */
export function getTypeMatches(userScores: Scores) {
  const ranked: RankedResultType[] = (Object.keys(RESULT_TYPES) as ResultType[])
    .map((id) => {
      const distance = getTypeDistance(userScores, id);
      return {
        ...RESULT_TYPES[id],
        matchRate: getTypeMatchRate(userScores, id),
        distance,
      };
    })
    .sort((a, b) => a.distance - b.distance);

  return {
    primaryType: ranked[0],
    similarType: ranked[1],
    oppositeType: ranked[ranked.length - 1],
    allTypes: ranked,
  };
}

export function getResultType(userScores: Scores): ResultType {
  return getTypeMatches(userScores).primaryType.id;
}

/** 8유형 ↔ 챌린지 태그 연결 — 성향·추천 일치도 보정용 */
export const TYPE_TAG_AFFINITY: Record<ResultType, string[]> = {
  SOFT_CUTE: ['#말랑큐티형', '#표정천재형'],
  POWER_PERFORMER: ['#파워퍼포머형', '#칼각완성형'],
  EYE_CATCHER: ['#시선강탈형', '#표정천재형'],
  DETAIL_DIRECTOR: ['#아기자기디테일형', '#무드연출가형'],
  CONCEPT_HOLIC: ['#반전매력형', '#표정천재형', '#컨셉'],
  GROOVE_MASTER: ['#칼각완성형', '#파워퍼포머형'],
  VIBE_MAKER: ['#시선강탈형', '#파워퍼포머형', '#현재확산'],
  MINIMAL_MOOD: ['#무드연출가형', '#아기자기디테일형'],
};

export function getTypeTagAffinityBonus(
  primaryType: ResultType,
  challengeTags: string[],
): number {
  const affinityTags = TYPE_TAG_AFFINITY[primaryType];
  const hasMatch = challengeTags.some((tag) => affinityTags.includes(tag));
  return hasMatch ? -14 : 0;
}
