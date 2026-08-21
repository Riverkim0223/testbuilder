import { Scores } from '@/types';
import { challenges, Challenge } from './challenges';

export function getBestMatch(userScores: Scores): Challenge {
  let bestMatch = challenges[0];
  let minDistance = Infinity;

  for (const challenge of challenges) {
    // 4개 축의 점수 차이를 각각 제곱하여 더함 (유클리드 거리 공식)
    const distance = Math.sqrt(
      Math.pow(userScores.energy - challenge.idealScores.energy, 2) +
      Math.pow(userScores.presence - challenge.idealScores.presence, 2) +
      Math.pow(userScores.movement - challenge.idealScores.movement, 2) +
      Math.pow(userScores.direction - challenge.idealScores.direction, 2)
    );

    // 거리가 가장 짧은(가장 성향이 비슷한) 챌린지 업데이트
    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = challenge;
    }
  }

  return bestMatch;
} 