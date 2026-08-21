import { Scores } from '@/types';
import { challenges, Challenge } from './challenges';
import { getYouTubeMatchUrl } from './youtubeMatches';

function attachMedia(challenge: Challenge): Challenge {
  const youtubeUrl = getYouTubeMatchUrl(challenge.id) ?? challenge.youtubeUrl;

  return {
    ...challenge,
    youtubeUrl,
    previewImageUrl: `/previews/${challenge.id}.jpg`,
  };
}

// 1. 점수 간의 유클리드 거리 계산 (작성하신 코드 유지)
export function getMatchDistance(userScores: Scores, challenge: Challenge): number {
  return Math.sqrt(
    Math.pow(userScores.energy - challenge.idealScores.energy, 2) +
      Math.pow(userScores.presence - challenge.idealScores.presence, 2) +
      Math.pow(userScores.movement - challenge.idealScores.movement, 2) +
      Math.pow(userScores.direction - challenge.idealScores.direction, 2)
  );
}

// 2. 100점 만점 기준 매칭률(%) 계산 (작성하신 코드 유지)
export function getMatchRate(userScores: Scores, challenge: Challenge): number {
  const distance = getMatchDistance(userScores, challenge);
  const maxDistance = 200;
  return Math.max(0, Math.round(100 - (distance / maxDistance) * 100));
}

// 3. 베스트, 시밀러, 워스트 매치를 한 번에 찾아 반환하는 함수
export function getMatches(userScores: Scores) {
  // 모든 챌린지에 대해 거리(distance)와 매칭률(matchRate)을 계산
  const calculated = challenges.map((challenge) => {
    const enriched = attachMedia(challenge);
    const distance = getMatchDistance(userScores, enriched);
    const matchRate = getMatchRate(userScores, enriched);
    return { ...enriched, distance, matchRate };
  });

  // 거리가 가까운 순(오름차순)으로 정렬 (1등부터 꼴등까지)
  calculated.sort((a, b) => a.distance - b.distance);

  return {
    bestMatch: calculated[0],
    similarMatch: calculated[1], // 2등
    worstMatch: calculated[calculated.length - 1], // 오차가 가장 큰 마지막 요소
  };
}