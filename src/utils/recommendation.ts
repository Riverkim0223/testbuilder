import { Challenge, Scores, ResultType, UserCondition } from '@/types';

/**
 * 1. 유저의 4축 점수를 기반으로 대표 결과 유형(ResultType) 결정
 */
export function getResultType(scores: Scores): ResultType {
  const { energy, presence, movement, direction } = scores;

  // 1. 파워 퍼포머: 에너지와 움직임이 모두 높은 경우
  if (energy >= 65 && movement >= 65) {
    return 'POWER_PERFORMER';
  }
  // 2. 컨셉 과몰입: 존재감과 연출이 모두 높은 경우
  if (presence >= 60 && direction >= 60) {
    return 'CONCEPT_HOLIC';
  }
  // 3. 분위기 메이커: 에너지와 존재감이 높고 텐션이 좋은 경우
  if (energy >= 60 && presence >= 65) {
    return 'VIBE_MAKER';
  }
  // 4. 아기자기 연출: 연출 점수가 가장 높은 경우
  if (direction >= 65) {
    return 'DETAIL_DIRECTOR';
  }
  // 5. 시선 강탈: 존재감 점수가 독보적인 경우
  if (presence >= 65) {
    return 'EYE_CATCHER';
  }
  // 6. 여유로운 그루버: 움직임은 높지만 에너지는 과하지 않은 경우
  if (movement >= 60 && energy < 60) {
    return 'GROOVE_MASTER';
  }
  // 7. 감성 미니멀: 전체적으로 점수가 과하지 않고 얌전한 경우
  if (energy <= 40 && movement <= 40 && direction <= 40) {
    return 'MINIMAL_MOOD';
  }
  // 8. 기본: 말랑 큐티형
  return 'SOFT_CUTE';
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