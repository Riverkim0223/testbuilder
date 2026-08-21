import { Challenge, Scores, ResultType, UserCondition } from '@/types';
import { getResultType as resolveResultType } from './typeMatching';

/**
 * 1. 유저의 4축 점수를 기반으로 대표 결과 유형(ResultType) 결정
 * (8유형 이상 프로필과의 거리 매칭)
 */
export function getResultType(scores: Scores): ResultType {
  return resolveResultType(scores);
}

/**
 * 2. 두 점수(Scores) 간의 유클리드 거리(Euclidean Distance) 계산
 * 값이 작을수록 두 점수의 성향이 유사함
 */
function calculateDistance(scoreA: Scores, scoreB: Scores): number {
  return Math.sqrt(
    Math.pow(scoreA.energy - scoreB.energy, 2) +
    Math.pow(scoreA.presence - scoreB.presence, 2) +
    Math.pow(scoreA.movement - scoreB.movement, 2) +
    Math.pow(scoreA.direction - scoreB.direction, 2)
  );
}

/**
 * 3. 매칭률(%) 환산 함수
 * 거리 최대치(200점) 기준 매칭 퍼센트 계산
 */
export function calculateMatchPercentage(scoreA: Scores, scoreB: Scores): number {
  const distance = calculateDistance(scoreA, scoreB);
  const maxDistance = 200; // 4개 축 (0~100) 차이의 이론상 최대 거리 범위
  const match = Math.max(0, 100 - (distance / maxDistance) * 100);
  return Math.round(match);
}

/**
 * 4. 최종 챌린지 추천 알고리즘 (오늘의 찰떡, 함께 찍기 좋은, 극과 극)
 */
export function getRecommendedChallenges(
  userScores: Scores,
  challenges: Challenge[],
  condition: UserCondition
) {
  // 활성화된 챌린지 필터링
  const activeChallenges = challenges.filter((c) => c.isActive);

  // 거리 계산 후 매칭률이 높은 순(거리 오름차순)으로 정렬
  const sorted = [...activeChallenges].sort((a, b) => {
    const distA = calculateDistance(userScores, a.scores);
    const distB = calculateDistance(userScores, b.scores);
    return distA - distB;
  });

  // 1) 오늘의 찰떡 챌린지 (유저 선택 인원/난이도 조건 우선 반영)
  const matchedCondition = sorted.find(
    (c) => c.peopleType === condition.peopleType && c.difficulty <= condition.difficulty
  );
  const mainChallenge = matchedCondition || sorted[0];

  // 2) 극과 극 챌린지 (거리가 가장 먼 챌린지 = 배열의 맨 마지막 항목)
  const oppositeChallenge = sorted[sorted.length - 1];

  // 3) 함께 찍기 좋은 챌린지 (2인 이상 챌린지 중 상위 매칭 항목)
  const groupChallenge = sorted.find(
    (c) => c.id !== mainChallenge.id && (c.peopleType === '2in' || c.peopleType === 'group')
  ) || sorted[1];

  return {
    mainChallenge: {
      ...mainChallenge,
      matchRate: calculateMatchPercentage(userScores, mainChallenge.scores),
    },
    oppositeChallenge: {
      ...oppositeChallenge,
      matchRate: calculateMatchPercentage(userScores, oppositeChallenge.scores),
    },
    groupChallenge: {
      ...groupChallenge,
      matchRate: calculateMatchPercentage(userScores, groupChallenge.scores),
    },
  };
}