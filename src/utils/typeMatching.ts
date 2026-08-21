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
